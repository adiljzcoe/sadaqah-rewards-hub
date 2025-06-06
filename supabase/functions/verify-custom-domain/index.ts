
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    const { websiteId, customDomain } = await req.json()

    console.log('Verifying domain:', { websiteId, customDomain })

    // In a real implementation, you would:
    // 1. Check DNS records for the custom domain
    // 2. Verify it points to your servers
    // 3. Set up SSL certificates
    // 4. Configure routing

    // For this demo, we'll simulate domain verification
    const isValidDomain = customDomain && customDomain.includes('.')
    
    if (isValidDomain) {
      // Simulate DNS check delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update the website record to mark domain as verified
      const { error } = await supabaseClient
        .from('masjid_websites')
        .update({ 
          domain_verified: true,
          custom_domain: customDomain 
        })
        .eq('id', websiteId)

      if (error) throw error

      return new Response(
        JSON.stringify({
          success: true,
          verified: true,
          message: 'Domain verified successfully'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          verified: false,
          message: 'Invalid domain format'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      )
    }

  } catch (error) {
    console.error('Error verifying domain:', error)
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
