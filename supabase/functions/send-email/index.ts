
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

    const { template_key, to_email, variables } = await req.json()

    // Get email template
    const { data: template, error: templateError } = await supabaseClient
      .from('email_templates')
      .select('*')
      .eq('template_key', template_key)
      .eq('is_active', true)
      .single()

    if (templateError || !template) {
      throw new Error('Email template not found')
    }

    // Get SMTP configuration
    const { data: smtpConfigs } = await supabaseClient
      .from('site_config')
      .select('config_key, config_value')
      .in('config_key', ['smtp_host', 'smtp_port', 'smtp_username', 'smtp_password'])

    const smtpConfig = smtpConfigs.reduce((acc, config) => {
      acc[config.config_key] = JSON.parse(config.config_value)
      return acc
    }, {} as Record<string, any>)

    if (!smtpConfig.smtp_host || !smtpConfig.smtp_username || !smtpConfig.smtp_password) {
      throw new Error('SMTP configuration incomplete')
    }

    // Replace variables in template
    let subject = template.subject
    let htmlContent = template.html_content
    let textContent = template.text_content

    Object.entries(variables || {}).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`
      subject = subject.replace(new RegExp(placeholder, 'g'), String(value))
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), String(value))
      if (textContent) {
        textContent = textContent.replace(new RegExp(placeholder, 'g'), String(value))
      }
    })

    // Send email using SMTP
    const nodemailer = await import('npm:nodemailer@6.9.7')
    
    const transporter = nodemailer.default.createTransporter({
      host: smtpConfig.smtp_host,
      port: smtpConfig.smtp_port,
      secure: smtpConfig.smtp_port === 465,
      auth: {
        user: smtpConfig.smtp_username,
        pass: smtpConfig.smtp_password,
      },
    })

    const mailOptions = {
      from: smtpConfig.smtp_username,
      to: to_email,
      subject: subject,
      html: htmlContent,
      text: textContent,
    }

    await transporter.sendMail(mailOptions)

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Email sent successfully',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Email sending error:', error)
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
