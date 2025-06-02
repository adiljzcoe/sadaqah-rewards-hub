
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationConfirmationRequest {
  recipientEmail: string;
  donorName: string;
  amount: number;
  charityName: string;
  donationId: string;
  jannahPoints: number;
  sadaqahCoins: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      recipientEmail, 
      donorName, 
      amount, 
      charityName, 
      donationId,
      jannahPoints,
      sadaqahCoins 
    }: DonationConfirmationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "YourJannah <donations@yourjannah.org>",
      to: [recipientEmail],
      subject: `Thank you for your donation to ${charityName}! 🌟`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">Thank you for your donation!</h1>
            <p style="color: #6B7280; font-size: 16px;">Your generosity makes a real difference</p>
          </div>
          
          <div style="background: linear-gradient(135deg, #10B981, #059669); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
            <h2 style="margin: 0 0 15px 0; font-size: 24px;">Donation Confirmed</h2>
            <div style="font-size: 32px; font-weight: bold; margin: 10px 0;">£${amount}</div>
            <p style="margin: 0; opacity: 0.9;">to ${charityName}</p>
          </div>
          
          <div style="background: #F9FAFB; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <h3 style="color: #374151; margin-top: 0;">Donation Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Donation ID:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">${donationId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Donor:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">${donorName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Charity:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">${charityName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #6B7280;">Date:</td>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">${new Date().toLocaleDateString()}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: linear-gradient(135deg, #8B5CF6, #7C3AED); padding: 25px; border-radius: 8px; color: white; margin-bottom: 25px;">
            <h3 style="margin-top: 0; text-align: center;">🎉 Rewards Earned!</h3>
            <div style="display: flex; justify-content: space-around; text-align: center;">
              <div>
                <div style="font-size: 24px; font-weight: bold;">${jannahPoints}</div>
                <div style="opacity: 0.9; font-size: 14px;">Jannah Points</div>
              </div>
              <div>
                <div style="font-size: 24px; font-weight: bold;">${sadaqahCoins}</div>
                <div style="opacity: 0.9; font-size: 14px;">Sadaqah Coins</div>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${Deno.env.get('SITE_URL')}/profile" style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Your Profile</a>
          </div>
          
          <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center; color: #6B7280; font-size: 14px;">
            <p>May Allah reward you for your generosity and multiply your rewards.</p>
            <p style="margin-top: 15px;">
              <a href="${Deno.env.get('SITE_URL')}" style="color: #059669;">Visit YourJannah</a> |
              <a href="${Deno.env.get('SITE_URL')}/profile" style="color: #059669;">Manage Donations</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Donation confirmation email sent:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending donation confirmation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
