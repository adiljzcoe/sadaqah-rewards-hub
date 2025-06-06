
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

    // Get platform settings to determine which Stripe keys to use
    const { data: platformSettings } = await supabaseClient
      .from('site_config')
      .select('config_key, config_value')
      .in('config_key', [
        'sandbox_mode',
        'stripe_publishable_key', 
        'stripe_secret_key',
        'stripe_webhook_secret'
      ])

    if (!platformSettings || platformSettings.length === 0) {
      throw new Error('Platform settings not found. Please configure Stripe keys in admin settings.')
    }

    // Parse platform settings
    const settings = platformSettings.reduce((acc, setting) => {
      acc[setting.config_key] = JSON.parse(setting.config_value)
      return acc
    }, {} as Record<string, any>)

    const sandboxMode = settings.sandbox_mode || false
    console.log('Sandbox mode:', sandboxMode)

    // Determine which Stripe keys to use based on sandbox mode
    let stripeSecretKey = settings.stripe_secret_key
    
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured in platform settings')
    }

    // Validate key format based on sandbox mode
    if (sandboxMode) {
      if (!stripeSecretKey.startsWith('sk_test_')) {
        throw new Error('Sandbox mode is enabled but test secret key (sk_test_) is not configured')
      }
      console.log('Using Stripe test mode keys')
    } else {
      if (!stripeSecretKey.startsWith('sk_live_')) {
        throw new Error('Live mode is enabled but live secret key (sk_live_) is not configured')
      }
      console.log('Using Stripe live mode keys')
    }

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
        sandbox_mode: sandboxMode.toString(),
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
        metadata: {
          ...paymentIntent.metadata,
          environment: sandboxMode ? 'test' : 'live'
        },
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
        environment: sandboxMode ? 'test' : 'live',
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
