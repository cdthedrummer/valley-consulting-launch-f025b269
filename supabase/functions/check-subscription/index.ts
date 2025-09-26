
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
    
    // Try multiple customer search methods
    let customers = await stripe.customers.list({ email: user.email, limit: 10 });
    logStep("Initial customer search", { email: user.email, foundCount: customers.data.length });
    
    // If no exact email match, try searching for customers with similar emails
    if (customers.data.length === 0) {
      // Try searching without case sensitivity
      const allCustomers = await stripe.customers.list({ limit: 100 });
      const matchingCustomers = allCustomers.data.filter((c: any) => 
        c.email?.toLowerCase() === (user.email || '').toLowerCase()
      );
      logStep("Case-insensitive search", { foundCount: matchingCustomers.length });
      customers.data = matchingCustomers;
    }
    
    if (customers.data.length === 0) {
      logStep("No customer found, checking for very recent signups");
      // For users who just signed up, grant temporary access and create a basic customer record
      const userCreatedAt = new Date(user.created_at);
      const now = new Date();
      const minutesSinceCreation = (now.getTime() - userCreatedAt.getTime()) / (1000 * 60);
      
      if (minutesSinceCreation < 30) { // User created within last 30 minutes
        logStep("Recent user detected, granting temporary trial access", { minutesSinceCreation });
        
        await supabaseClient.from("subscribers").upsert({
          email: user.email,
          user_id: user.id,
          stripe_customer_id: null,
          subscribed: true, // Grant temporary access
          subscription_tier: "ai_copilot",
          subscription_status: "trialing",
          subscription_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
          trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          is_canceled: false,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'email' });
        
        return new Response(JSON.stringify({ 
          subscribed: true,
          subscription_tier: "ai_copilot",
          subscription_status: "trialing",
          subscription_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          trial_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          is_canceled: false,
          is_trial_active: true,
          days_remaining: 7
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
      
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

    // Get ALL subscriptions (including trial, incomplete, etc.) to check status
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      limit: 10,
      // Remove status filter to get ALL subscriptions
      expand: ['data.default_payment_method'],
    });
    
    // Also check for any Checkout sessions that might be pending/completed
    const checkoutSessions = await stripe.checkout.sessions.list({
      customer: customerId,
      limit: 10,
    });
    
    logStep("Found checkout sessions", { 
      count: checkoutSessions.data.length,
      sessions: checkoutSessions.data.map((s: any) => ({ 
        id: s.id, 
        status: s.status, 
        payment_status: s.payment_status,
        mode: s.mode,
        created: s.created 
      }))
    });
    
    logStep("Found subscriptions", { 
      count: subscriptions.data.length, 
      statuses: subscriptions.data.map((s: any) => ({ id: s.id, status: s.status, created: s.created }))
    });
    
    // Check for subscriptions that give access (active, trialing, incomplete, past_due, or canceled but still valid)
    let hasValidAccess = false;
    let subscriptionEnd = null;
    let subscriptionStatus = null;
    let isCanceled = false;
    let trialEnd = null;
    let validSubscription = null;
    let isTrialActive = false;

    // Sort subscriptions by creation date (newest first) to prioritize recent subscriptions
    const sortedSubscriptions = subscriptions.data.sort((a: any, b: any) => b.created - a.created);

    for (const subscription of sortedSubscriptions) {
      const now = new Date();
      const currentPeriodEnd = new Date(subscription.current_period_end * 1000);
      const trialEndDate = subscription.trial_end ? new Date(subscription.trial_end * 1000) : null;
      const createdDate = new Date(subscription.created * 1000);
      const isRecentSubscription = (now.getTime() - createdDate.getTime()) < (24 * 60 * 60 * 1000); // Created within 24 hours
      
      logStep("Processing subscription", { 
        id: subscription.id, 
        status: subscription.status, 
        created: createdDate.toISOString(),
        isRecent: isRecentSubscription,
        trialEnd: trialEndDate?.toISOString(),
        currentPeriodEnd: currentPeriodEnd.toISOString()
      });
      
      // Active subscriptions (paid)
      if (subscription.status === "active") {
        hasValidAccess = true;
        validSubscription = subscription;
        subscriptionStatus = subscription.status;
        subscriptionEnd = currentPeriodEnd.toISOString();
        if (trialEndDate) trialEnd = trialEndDate.toISOString();
        logStep("Found active subscription", { id: subscription.id, status: subscription.status });
        break;
      }
      // Trial subscriptions (should have full access during trial period)
      else if (subscription.status === "trialing") {
        const trialStillActive = trialEndDate && trialEndDate > now;
        if (trialStillActive) {
          hasValidAccess = true;
          validSubscription = subscription;
          subscriptionStatus = subscription.status;
          isTrialActive = true;
          subscriptionEnd = trialEndDate.toISOString();
          trialEnd = trialEndDate.toISOString();
          logStep("Found active trial subscription", { id: subscription.id, status: subscription.status, trialEnd: trialEndDate.toISOString() });
          break;
        } else {
          logStep("Found expired trial subscription", { id: subscription.id, status: subscription.status, trialEnd: trialEndDate?.toISOString() });
        }
      }
      // Check for incomplete_expired subscriptions that were recently created (payment processing)
      else if (subscription.status === "incomplete_expired" && isRecentSubscription) {
        hasValidAccess = true;
        validSubscription = subscription;
        subscriptionStatus = "incomplete_expired";
        subscriptionEnd = currentPeriodEnd.toISOString();
        if (trialEndDate) trialEnd = trialEndDate.toISOString();
        logStep("Found recent incomplete_expired subscription, granting temporary access", { id: subscription.id, status: subscription.status });
        break;
      }
      // Incomplete subscriptions that are recent (payment might still be processing)
      else if ((subscription.status === "incomplete" || subscription.status === "past_due") && isRecentSubscription) {
        hasValidAccess = true;
        validSubscription = subscription;
        subscriptionStatus = subscription.status;
        subscriptionEnd = currentPeriodEnd.toISOString();
        if (trialEndDate) trialEnd = trialEndDate.toISOString();
        logStep("Found recent incomplete/past_due subscription, granting access", { id: subscription.id, status: subscription.status });
        break;
      }
      // Canceled subscriptions with remaining access
      else if (subscription.status === "canceled") {
        const accessUntil = trialEndDate && trialEndDate > now ? trialEndDate : 
                           currentPeriodEnd > now ? currentPeriodEnd : null;
        
        if (accessUntil) {
          hasValidAccess = true;
          validSubscription = subscription;
          subscriptionStatus = "canceled";
          isCanceled = true;
          subscriptionEnd = accessUntil.toISOString();
          if (trialEndDate) trialEnd = trialEndDate.toISOString();
          logStep("Found canceled subscription with remaining access", { id: subscription.id, accessUntil: accessUntil.toISOString() });
          break;
        }
      }
    }

    // If no subscription found but there are recent completed checkout sessions, grant temporary access
    if (!hasValidAccess && checkoutSessions.data.length > 0) {
      const recentCompletedSession = checkoutSessions.data.find((session: any) => {
        const sessionAge = Date.now() - (session.created * 1000);
        const isRecent = sessionAge < (60 * 60 * 1000); // Within last hour
        const isCompleted = session.status === 'complete' && session.payment_status === 'paid';
        const isSubscription = session.mode === 'subscription';
        return isRecent && isCompleted && isSubscription;
      });
      
      if (recentCompletedSession) {
        logStep("Found recent completed checkout session, granting temporary access", { 
          sessionId: recentCompletedSession.id,
          created: recentCompletedSession.created,
          mode: recentCompletedSession.mode 
        });
        
        hasValidAccess = true;
        subscriptionStatus = "trialing";
        isTrialActive = true;
        subscriptionEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days from now
        trialEnd = subscriptionEnd;
      }
    }

    logStep("Subscription check completed", { 
      hasValidAccess, 
      subscriptionStatus, 
      isCanceled, 
      subscriptionEnd,
      trialEnd,
      isTrialActive
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
      is_trial_active: isTrialActive,
      days_remaining: subscriptionEnd ? Math.ceil((new Date(subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
