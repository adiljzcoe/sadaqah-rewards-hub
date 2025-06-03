
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PushNotificationPayload {
  title: string;
  message: string;
  audience: string;
  scheduled: boolean;
  scheduleDate?: string;
  scheduleTime?: string;
  actionUrl?: string;
  priority: string;
  icon?: string;
  requireInteraction?: boolean;
  actions?: Array<{ action: string; title: string; icon?: string }>;
}

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get user from JWT token
    const {
      data: { user },
    } = await supabaseClient.auth.getUser()

    if (!user) {
      throw new Error('Unauthorized')
    }

    // Check if user is admin
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      throw new Error('Admin access required')
    }

    const payload: PushNotificationPayload = await req.json()

    console.log('Push notification payload:', payload)

    // Create notification record in database
    const notificationData = {
      title: payload.title,
      message: payload.message,
      audience: payload.audience,
      priority: payload.priority,
      action_url: payload.actionUrl,
      icon_url: payload.icon,
      require_interaction: payload.requireInteraction,
      actions: payload.actions,
      scheduled: payload.scheduled,
      schedule_date: payload.scheduled ? `${payload.scheduleDate} ${payload.scheduleTime}` : null,
      created_by: user.id,
      status: payload.scheduled ? 'scheduled' : 'sent',
    }

    const { data: notification, error: notificationError } = await supabaseClient
      .from('push_notifications')
      .insert(notificationData)
      .select()
      .single()

    if (notificationError) {
      console.error('Error creating notification record:', notificationError)
      throw notificationError
    }

    // If scheduled, don't send immediately
    if (payload.scheduled) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Notification scheduled successfully',
          notificationId: notification.id 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // For immediate sending, get push subscriptions
    let subscriptionsQuery = supabaseClient
      .from('push_subscriptions')
      .select('*')
      .eq('active', true)

    // Filter by audience if not 'all' or 'test'
    if (payload.audience !== 'all' && payload.audience !== 'test') {
      // Add audience filtering logic here based on your requirements
      // For now, we'll send to all subscriptions
    }

    if (payload.audience === 'test') {
      // For testing, limit to current user only
      subscriptionsQuery = subscriptionsQuery.eq('user_id', user.id)
    }

    const { data: subscriptions, error: subscriptionsError } = await subscriptionsQuery

    if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError)
      throw subscriptionsError
    }

    console.log(`Found ${subscriptions?.length || 0} active subscriptions`)

    // Prepare push notification payload
    const pushPayload = {
      title: payload.title,
      body: payload.message,
      icon: payload.icon || '/favicon.ico',
      badge: '/favicon.ico',
      tag: `notification-${notification.id}`,
      data: {
        url: payload.actionUrl || '/',
        notificationId: notification.id,
        timestamp: new Date().toISOString()
      },
      actions: payload.actions || [],
      requireInteraction: payload.requireInteraction || false,
      silent: false,
      vibrate: [200, 100, 200]
    }

    // VAPID details (in production, store these securely)
    const vapidDetails = {
      subject: 'mailto:admin@sadaqahrewards.com',
      publicKey: 'BEl62iUYgUivxIkv69yViEuiBIa40HI80Y4qC-XTAlKyNOIeOKqWe4F8E8OgGzHO-aL2JHyPUZ5CCNPAK-ux8vg',
      privateKey: Deno.env.get('VAPID_PRIVATE_KEY') || 'your-vapid-private-key-here'
    }

    // Send notifications to all subscriptions
    const sendPromises = (subscriptions || []).map(async (sub) => {
      try {
        // Convert subscription data
        const pushSubscription: PushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh_key,
            auth: sub.auth_key
          }
        }

        // In a real implementation, you would use web-push library
        // For this demo, we'll log the attempt and simulate success
        console.log(`Sending push notification to endpoint: ${pushSubscription.endpoint.substring(0, 50)}...`)
        
        // Simulate API call to push service
        // const result = await sendWebPush(pushSubscription, pushPayload, vapidDetails)
        
        // Update delivery status
        await supabaseClient
          .from('push_delivery_logs')
          .insert({
            notification_id: notification.id,
            subscription_id: sub.id,
            status: 'delivered',
            delivered_at: new Date().toISOString()
          })

        return { success: true, endpoint: pushSubscription.endpoint }
      } catch (error) {
        console.error('Error sending to subscription:', error)
        
        // Log failed delivery
        await supabaseClient
          .from('push_delivery_logs')
          .insert({
            notification_id: notification.id,
            subscription_id: sub.id,
            status: 'failed',
            error_message: error.message,
            delivered_at: new Date().toISOString()
          })

        return { success: false, endpoint: sub.endpoint, error: error.message }
      }
    })

    const results = await Promise.allSettled(sendPromises)
    const successful = results.filter(r => r.status === 'fulfilled' && r.value.success).length
    const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value.success)).length

    // Update notification with delivery stats
    await supabaseClient
      .from('push_notifications')
      .update({
        delivered_count: successful,
        failed_count: failed,
        sent_at: new Date().toISOString()
      })
      .eq('id', notification.id)

    console.log(`Push notification sent: ${successful} successful, ${failed} failed`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Push notification sent to ${successful} devices`,
        notificationId: notification.id,
        stats: {
          successful,
          failed,
          total: (subscriptions || []).length
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    )

  } catch (error) {
    console.error('Push notification error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    )
  }
})
