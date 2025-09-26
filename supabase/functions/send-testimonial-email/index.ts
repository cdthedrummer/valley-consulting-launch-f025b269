
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

// Initialize Resend with the API key  
const resendApiKey = Deno.env.get("RESEND_API_KEY");
if (!resendApiKey) {
  console.error("Missing RESEND_API_KEY environment variable");
}
const resend = new Resend(resendApiKey);

// Set up CORS headers for cross-origin requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Input validation and sanitization functions
const sanitizeInput = (input: string): string => {
  return input?.toString()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/[<>]/g, '') // Remove angle brackets
    .trim()
    .substring(0, 1000) // Limit length
}

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const getClientIP = (req: Request): string => {
  return req.headers.get('x-forwarded-for') || 
         req.headers.get('x-real-ip') || 
         'unknown'
}

interface TestimonialData {
  name: string;
  email?: string; // This is the field from the database
  company: string;
  service: string;
  rating: number;
  testimonial: string;
  is_human_verified?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Edge function received testimonial request");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

  try {
    const clientIP = getClientIP(req)
    
    // Check rate limiting (5 testimonials per hour per IP)
    const { data: rateLimitCheck } = await supabase.rpc('check_rate_limit', {
      _ip_address: clientIP,
      _endpoint: 'testimonial-form',
      _max_requests: 5,
      _window_minutes: 60
    })

    if (!rateLimitCheck) {
      console.warn(`Rate limit exceeded for testimonial submission from IP: ${clientIP}`)
      return new Response(
        JSON.stringify({ error: 'Too many submissions. Please try again later.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        },
      )
    }

    console.log("Parsing testimonial request body");
    const rawData: TestimonialData = await req.json();
    console.log("Testimonial data received (sanitized)");
    
    // Sanitize and validate input
    const name = sanitizeInput(rawData.name);
    const company = sanitizeInput(rawData.company);
    const service = sanitizeInput(rawData.service);
    const rating = parseInt(rawData.rating.toString());
    const testimonial = sanitizeInput(rawData.testimonial);
    const emailToUse = rawData.email ? sanitizeInput(rawData.email) : undefined;

    // Enhanced validation
    if (!name || name.length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Name must be at least 2 characters" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    if (!company || company.length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Company must be at least 2 characters" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    if (!service || service.length < 2) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Service must be at least 2 characters" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Rating must be between 1 and 5" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    if (!testimonial || testimonial.length < 20) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Testimonial must be at least 20 characters" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    if (emailToUse && !validateEmail(emailToUse)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Valid email address is required if provided" 
        }),
        {
          status: 400,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }

    // Log audit trail
    await supabase.from('audit_logs').insert({
      table_name: 'testimonials',
      operation: 'INSERT',
      new_data: { name, company, service, rating, has_email: !!emailToUse },
      ip_address: clientIP,
      user_agent: req.headers.get('user-agent')
    })

    console.log("Sending testimonial notification to business owner");
    // Send email to business owner about the new testimonial (with sanitized content)
    const ownerEmailResponse = await resend.emails.send({
      from: "Hudson Valley Consulting <no-reply@hvcg.us>",
      to: ["contact@hvcg.us"],
      subject: `New Testimonial Submission from ${name}`,
      html: `
        <h1>New Testimonial Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Rating:</strong> ${rating} stars</p>
        <p><strong>Testimonial:</strong></p>
        <p>"${testimonial}"</p>
        <p>Please review this testimonial in your dashboard and approve it if appropriate.</p>
        <p><small>IP: ${clientIP}</small></p>
      `,
    });
    console.log("Owner testimonial notification email response:", ownerEmailResponse);

    // If email is provided, send a thank you email to the customer
    if (emailToUse) {
      console.log("Sending thank you email to customer");
      const customerEmailResponse = await resend.emails.send({
        from: "Hudson Valley Consulting <no-reply@hvcg.us>",
        to: [emailToUse],
        subject: "Thank you for your testimonial!",
        html: `
          <h1>Thank you for your feedback!</h1>
          <p>Hello ${name},</p>
          <p>We greatly appreciate you taking the time to share your experience with Hudson Valley Consulting.</p>
          <p>Your testimonial helps other contractors understand the value we provide and will be reviewed for publication on our website.</p>
          <p>Here's what you shared with us:</p>
          <blockquote style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0;">
            "${testimonial}"
          </blockquote>
          <p>Thank you again for your valuable feedback!</p>
          <p>Best regards,<br />The Hudson Valley Consulting Team</p>
        `,
      });
      console.log("Customer thank you email response:", customerEmailResponse);
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Emails sent successfully",
          ownerEmailId: ownerEmailResponse.id,
          customerEmailId: customerEmailResponse.id
        }),
        {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    } else {
      // Only owner notification was sent (no customer email provided)
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Owner notification sent",
          ownerEmailId: ownerEmailResponse.id
        }),
        {
          status: 200,
          headers: { 
            "Content-Type": "application/json",
            ...corsHeaders 
          },
        }
      );
    }
  } catch (error) {
    console.error("Error in send-testimonial-email function:", error);
    
    // Log security incident
    await supabase.from('audit_logs').insert({
      table_name: 'testimonials',
      operation: 'INSERT',
      new_data: { error: 'Processing failed', ip_address: getClientIP(req) },
      ip_address: getClientIP(req),
      user_agent: req.headers.get('user-agent')
    }).catch(console.error)

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to process testimonial submission" 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
