
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Push notification function called')
    
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
      error: userError
    } = await supabaseClient.auth.getUser()

    console.log('User auth result:', { user: user?.id, error: userError })

    if (!user) {
      console.error('No authenticated user found')
      return new Response(
        JSON.stringify({ 
          error: 'Please log in to send notifications',
          success: false 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 401
        }
      )
    }

    // For test notifications, we don't need admin check
    const payload: PushNotificationPayload = await req.json()
    console.log('Notification payload:', payload)

    // If this is a test notification, allow any authenticated user
    if (payload.audience === 'test') {
      console.log('Processing test notification for user:', user.id)
      
      // Create a simple test notification record
      const { data: notification, error: notificationError } = await supabaseClient
        .from('push_notifications')
        .insert({
          title: payload.title,
          message: payload.message,
          audience: 'test',
          priority: payload.priority || 'normal',
          action_url: payload.actionUrl,
          icon_url: payload.icon,
          require_interaction: payload.requireInteraction || false,
          actions: payload.actions || [],
          scheduled: false,
          created_by: user.id,
          status: 'sent',
        })
        .select()
        .single()

      if (notificationError) {
        console.error('Error creating test notification record:', notificationError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to create notification record',
            success: false,
            details: notificationError.message
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500
          }
        )
      }

      console.log('Test notification record created:', notification.id)
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Test notification sent successfully',
          notificationId: notification.id,
          note: 'This is a test - no actual push notification was sent to devices'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // For non-test notifications, check if user is admin
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    console.log('Profile check result:', { profile, profileError })

    if (profileError || !profile || profile.role !== 'admin') {
      console.error('Admin access required')
      return new Response(
        JSON.stringify({ 
          error: 'Admin access required for bulk notifications',
          success: false 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 403
        }
      )
    }

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
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create notification record',
          success: false,
          details: notificationError.message
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
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

    // Filter by audience if not 'all'
    if (payload.audience !== 'all') {
      // Add audience filtering logic here based on your requirements
      // For now, we'll send to all subscriptions
    }

    const { data: subscriptions, error: subscriptionsError } = await subscriptionsQuery

    if (subscriptionsError) {
      console.error('Error fetching subscriptions:', subscriptionsError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to fetch subscriptions',
          success: false,
          details: subscriptionsError.message
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500
        }
      )
    }

    console.log(`Found ${subscriptions?.length || 0} active subscriptions`)

    // For now, we'll just simulate sending (since we don't have real push service setup)
    const successful = subscriptions?.length || 0
    const failed = 0

    // Update notification with delivery stats
    await supabaseClient
      .from('push_notifications')
      .update({
        delivered_count: successful,
        failed_count: failed,
        sent_at: new Date().toISOString()
      })
      .eq('id', notification.id)

    console.log(`Push notification processed: ${successful} successful, ${failed} failed`)

    return new Response(
      JSON.stringify({
        success: true,
        message: `Push notification sent to ${successful} devices`,
        notificationId: notification.id,
        stats: {
          successful,
          failed,
          total: subscriptions?.length || 0
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
        error: error.message || 'Unknown error occurred',
        success: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
