
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { hostname, subdomain, customDomain } = await req.json()

    console.log('Checking domain:', { hostname, subdomain, customDomain })

    // Check if this is a masjid subdomain or custom domain
    const { data: masjidWebsite, error } = await supabaseClient
      .from('masjid_websites')
      .select(`
        *,
        masjids (
          id,
          name,
          location,
          address,
          verified,
          contact_info
        )
      `)
      .or(`subdomain_slug.eq.${subdomain || ''},custom_domain.eq.${hostname}`)
      .eq('is_active', true)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    if (masjidWebsite) {
      // Fetch additional data for the masjid
      const [prayerTimes, events, announcements] = await Promise.all([
        // Get today's prayer times
        supabaseClient
          .from('masjid_prayer_times')
          .select('*')
          .eq('masjid_id', masjidWebsite.masjid_id)
          .eq('prayer_date', new Date().toISOString().split('T')[0])
          .single(),

        // Get upcoming events
        supabaseClient
          .from('masjid_events')
          .select('*')
          .eq('masjid_id', masjidWebsite.masjid_id)
          .eq('is_published', true)
          .gte('start_date', new Date().toISOString())
          .order('start_date')
          .limit(5),

        // Get active announcements
        supabaseClient
          .from('masjid_announcements')
          .select('*')
          .eq('masjid_id', masjidWebsite.masjid_id)
          .eq('is_published', true)
          .or('expire_date.is.null,expire_date.gt.' + new Date().toISOString())
          .order('priority', { ascending: false })
          .order('created_at', { ascending: false })
          .limit(10)
      ])

      return new Response(
        JSON.stringify({
          success: true,
          type: 'masjid',
          data: {
            website: masjidWebsite,
            prayerTimes: prayerTimes.data || null,
            events: events.data || [],
            announcements: announcements.data || []
          }
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

    // If no masjid website found, return null
    return new Response(
      JSON.stringify({
        success: true,
        type: 'none',
        data: null
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in subdomain routing:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
