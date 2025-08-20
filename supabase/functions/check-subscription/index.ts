
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: false,
        subscription_tier: null,
        subscription_end: null,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ subscribed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    // Get all subscriptions to check status including canceled ones
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 10,
    });
    
    // Check for subscriptions that give access (active, trialing, or canceled but still valid)
    let hasValidAccess = false;
    let subscriptionEnd = null;
    let subscriptionStatus = null;
    let isCanceled = false;
    let trialEnd = null;
    let validSubscription = null;

    for (const subscription of subscriptions.data) {
      const now = new Date();
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      const trialEndDate = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;
      
      if (subscription.status === "active" || subscription.status === "trialing") {
        hasValidAccess = true;
        validSubscription = subscription;
        subscriptionStatus = subscription.status;
        subscriptionEnd = currentPeriodEnd.toISOString();
        if (trialEndDate) trialEnd = trialEndDate.toISOString();
        break;
      } else if (subscription.status === "canceled") {
        // Check if canceled subscription still has valid access
        const accessUntil = trialEndDate && trialEndDate > now ? trialEndDate : 
                           currentPeriodEnd > now ? currentPeriodEnd : null;
        
        if (accessUntil) {
          hasValidAccess = true;
          validSubscription = subscription;
          subscriptionStatus = "canceled";
          isCanceled = true;
          subscriptionEnd = accessUntil.toISOString();
          if (trialEndDate) trialEnd = trialEndDate.toISOString();
          break;
        }
      }
    }

    logStep("Subscription check completed", { 
      hasValidAccess, 
      subscriptionStatus, 
      isCanceled, 
      subscriptionEnd,
      trialEnd 
    });

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      stripe_subscription_id: hasValidAccess && validSubscription ? validSubscription.id : null,
      subscribed: hasValidAccess,
      subscription_tier: hasValidAccess ? "ai_copilot" : null,
      subscription_status: subscriptionStatus,
      subscription_end: subscriptionEnd,
      trial_end: trialEnd,
      is_canceled: isCanceled,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated database with subscription info", { 
      subscribed: hasValidAccess, 
      subscriptionStatus,
      isCanceled 
    });

    return new Response(JSON.stringify({
      subscribed: hasValidAccess,
      subscription_tier: hasValidAccess ? "ai_copilot" : null,
      subscription_status: subscriptionStatus,
      subscription_end: subscriptionEnd,
      trial_end: trialEnd,
      is_canceled: isCanceled,
      days_remaining: subscriptionEnd ? Math.ceil((new Date(subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
