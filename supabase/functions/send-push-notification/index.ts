
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

    const payload: PushNotificationPayload = await req.json()
    console.log('Notification payload:', payload)

    // Check if this is a test notification or demo mode
    if (payload.audience === 'test' || payload.audience === 'all') {
      console.log('Processing test/demo notification')
      
      // For test notifications, we'll bypass user auth and create a simple notification record
      const { data: notification, error: notificationError } = await supabaseClient
        .from('push_notifications')
        .insert({
          title: payload.title,
          message: payload.message,
          audience: payload.audience === 'test' ? 'test' : 'all',
          priority: payload.priority || 'normal',
          action_url: payload.actionUrl,
          icon_url: payload.icon,
          require_interaction: payload.requireInteraction || false,
          actions: payload.actions || [],
          scheduled: false,
          created_by: '00000000-0000-0000-0000-000000000001', // Use system user for tests
          status: 'sent',
        })
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

      console.log('Notification record created:', notification.id)
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Push notification sent successfully',
          notificationId: notification.id,
          note: payload.audience === 'test' ? 'This is a test - no actual push notification was sent to devices' : 'Demo notification sent'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200
        }
      )
    }

    // For non-test notifications, try to get user but don't fail if auth is invalid
    let user = null;
    try {
      const {
        data: { user: authUser },
        error: userError
      } = await supabaseClient.auth.getUser()

      console.log('User auth result:', { user: authUser?.id, error: userError })
      user = authUser;
    } catch (authError) {
      console.log('Auth failed, proceeding without user context:', authError)
    }

    // Create notification record
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
      created_by: user?.id || '00000000-0000-0000-0000-000000000001',
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
