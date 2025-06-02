
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DonationRequest {
  userId: string;
  charityId: string;
  campaignId?: string;
  amount: number;
  message?: string;
  anonymous?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, charityId, campaignId, amount, message, anonymous }: DonationRequest = await req.json();

    // Calculate rewards
    const jannahPoints = Math.floor(amount * 10); // 10 points per £1
    const sadaqahCoins = Math.floor(amount * 5); // 5 coins per £1

    // Create donation record
    const { data: donation, error: donationError } = await supabase
      .from('donations')
      .insert({
        user_id: userId,
        charity_id: charityId,
        campaign_id: campaignId,
        amount: amount,
        jannah_points_earned: jannahPoints,
        sadaqah_coins_earned: sadaqahCoins,
        status: 'completed',
        message: message,
        anonymous: anonymous || false,
      })
      .select()
      .single();

    if (donationError) throw donationError;

    // Get current user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) throw profileError;

    // Update user profile with new points and stats
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        jannah_points: (profile.jannah_points || 0) + jannahPoints,
        sadaqah_coins: (profile.sadaqah_coins || 0) + sadaqahCoins,
        total_donated: (profile.total_donated || 0) + amount,
        donation_count: (profile.donation_count || 0) + 1,
        last_donation_date: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    // Update charity total raised
    const { error: charityUpdateError } = await supabase
      .from('charities')
      .update({
        total_raised: supabase.rpc('increment_charity_total', { charity_id: charityId, amount: amount })
      })
      .eq('id', charityId);

    // Add to matching pool
    const { error: poolError } = await supabase
      .from('matching_pool')
      .insert({
        user_id: userId,
        donation_id: donation.id,
        sadaqah_coins_amount: sadaqahCoins,
        matched: false,
      });

    // Check for achievements
    await checkAndAwardAchievements(userId, profile, amount);

    // Send confirmation email
    if (Deno.env.get('RESEND_API_KEY')) {
      const { data: charity } = await supabase
        .from('charities')
        .select('name')
        .eq('id', charityId)
        .single();

      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/send-donation-confirmation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
        },
        body: JSON.stringify({
          recipientEmail: profile.email,
          donorName: profile.full_name || 'Anonymous Donor',
          amount: amount,
          charityName: charity?.name || 'Unknown Charity',
          donationId: donation.id,
          jannahPoints: jannahPoints,
          sadaqahCoins: sadaqahCoins,
        }),
      });
    }

    return new Response(JSON.stringify({ 
      success: true, 
      donation,
      rewards: {
        jannahPoints,
        sadaqahCoins
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error processing donation:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function checkAndAwardAchievements(userId: string, profile: any, donationAmount: number) {
  const newStats = {
    donation_count: (profile.donation_count || 0) + 1,
    total_donated: (profile.total_donated || 0) + donationAmount,
  };

  // Get all achievements
  const { data: achievements } = await supabase
    .from('achievements')
    .select('*');

  if (!achievements) return;

  // Get user's current achievements
  const { data: userAchievements } = await supabase
    .from('user_achievements')
    .select('achievement_id')
    .eq('user_id', userId);

  const earnedAchievementIds = userAchievements?.map(ua => ua.achievement_id) || [];

  // Check each achievement
  for (const achievement of achievements) {
    if (earnedAchievementIds.includes(achievement.id)) continue;

    let earned = false;

    switch (achievement.requirement_type) {
      case 'donation_count':
        earned = newStats.donation_count >= achievement.requirement_value;
        break;
      case 'total_donated':
        earned = newStats.total_donated >= achievement.requirement_value;
        break;
      case 'single_donation':
        earned = donationAmount >= achievement.requirement_value;
        break;
    }

    if (earned) {
      // Award achievement
      await supabase
        .from('user_achievements')
        .insert({
          user_id: userId,
          achievement_id: achievement.id,
        });

      // Update user points
      await supabase
        .from('profiles')
        .update({
          jannah_points: supabase.rpc('increment_points', { 
            user_id: userId, 
            points: achievement.points_reward 
          })
        })
        .eq('id', userId);
    }
  }
}

serve(handler);
