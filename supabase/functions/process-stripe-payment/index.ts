
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { amount, currency, charity_id, product_id, user_id, payment_method_id } = await req.json()

    // Get Stripe secret key from site config
    const { data: stripeConfig } = await supabaseClient
      .from('site_config')
      .select('config_value')
      .eq('config_key', 'stripe_secret_key')
      .single()

    if (!stripeConfig?.config_value) {
      throw new Error('Stripe secret key not configured')
    }

    const stripeSecretKey = JSON.parse(stripeConfig.config_value)

    // Create Stripe payment intent
    const stripe = await import('https://esm.sh/stripe@14.21.0')
    const stripeClient = new stripe.default(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount,
      currency: currency || 'gbp',
      payment_method: payment_method_id,
      confirm: true,
      return_url: `${req.headers.get('origin')}/donation-success`,
      metadata: {
        charity_id: charity_id || '',
        product_id: product_id || '',
        user_id: user_id || '',
      },
    })

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabaseClient
      .from('payment_transactions')
      .insert({
        transaction_id: paymentIntent.id,
        payment_provider: 'stripe',
        payment_method: 'card',
        amount: amount,
        currency: currency || 'GBP',
        status: paymentIntent.status === 'succeeded' ? 'completed' : 'pending',
        user_id: user_id,
        charity_id: charity_id,
        product_id: product_id,
        stripe_payment_intent_id: paymentIntent.id,
        metadata: paymentIntent.metadata,
        processed_at: paymentIntent.status === 'succeeded' ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (transactionError) {
      console.error('Error creating transaction:', transactionError)
      throw transactionError
    }

    // If payment succeeded, create donation record
    if (paymentIntent.status === 'succeeded') {
      const { error: donationError } = await supabaseClient
        .from('donations')
        .insert({
          user_id: user_id,
          charity_id: charity_id,
          amount: amount / 100, // Convert from cents to pounds
          status: 'completed',
          payment_intent_id: paymentIntent.id,
          jannah_points_earned: Math.floor(amount / 100), // 1 point per pound
          sadaqah_coins_earned: Math.floor(amount / 10), // 1 coin per 10 pence
        })

      if (donationError) {
        console.error('Error creating donation:', donationError)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        payment_intent: paymentIntent,
        transaction_id: transaction.id,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Payment processing error:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
