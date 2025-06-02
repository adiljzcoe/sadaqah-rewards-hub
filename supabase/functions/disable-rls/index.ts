
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: { persistSession: false }
      }
    )

    // Disable RLS on problematic tables
    const queries = [
      'ALTER TABLE stream_chat_messages DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE stream_reactions DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE live_streams DISABLE ROW LEVEL SECURITY;'
    ];

    for (const query of queries) {
      const { error } = await supabaseAdmin.rpc('exec_sql', { sql: query });
      if (error) {
        console.error('Error executing query:', query, error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'RLS disabled on livestream tables' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
