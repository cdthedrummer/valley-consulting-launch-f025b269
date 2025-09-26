
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { Resend } from 'https://esm.sh/resend@2.0.0'

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

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  service_interest?: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Edge function received request");
  
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
    
    // Check rate limiting (10 requests per hour per IP)
    const { data: rateLimitCheck } = await supabase.rpc('check_rate_limit', {
      _ip_address: clientIP,
      _endpoint: 'contact-form',
      _max_requests: 10,
      _window_minutes: 60
    })

    if (!rateLimitCheck) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`)
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 429,
        },
      )
    }

    console.log("Parsing request body");
    const rawData: ContactFormData = await req.json();
    console.log("Form data received (sanitized)");
    
    // Sanitize and validate input
    const name = sanitizeInput(rawData.name);
    const email = sanitizeInput(rawData.email);
    const message = sanitizeInput(rawData.message);
    const company = rawData.company ? sanitizeInput(rawData.company) : undefined;
    const phone = rawData.phone ? sanitizeInput(rawData.phone) : undefined;
    const service_interest = rawData.service_interest ? sanitizeInput(rawData.service_interest) : undefined;

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

    if (!email || !validateEmail(email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Valid email address is required" 
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

    if (!message || message.length < 10) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Message must be at least 10 characters" 
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
      table_name: 'contact_submissions',
      operation: 'INSERT',
      new_data: { name, email, masked_phone: phone ? '***' : null, company, service_interest },
      ip_address: clientIP,
      user_agent: req.headers.get('user-agent')
    })

    console.log("Sending email to business owner");
    // Send email to business owner (with sanitized content)
    const ownerEmailResponse = await resend.emails.send({
      from: "Hudson Valley Consulting <no-reply@hvcg.us>",
      to: ["contact@hvcg.us"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${service_interest ? `<p><strong>Service Interest:</strong> ${service_interest}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><small>IP: ${clientIP}</small></p>
      `,
    });
    console.log("Owner email response:", ownerEmailResponse);

    console.log("Sending confirmation email to customer");
    
    // Check if this is a marketing checklist request
    const isMarketingChecklistRequest = message.includes("Marketing Checklist") || service_interest === "Marketing Resources";
    
    let customerEmailContent;
    if (isMarketingChecklistRequest) {
      customerEmailContent = `
        <h1>Thanks for downloading our Marketing Checklist!</h1>
        <p>Hello ${name},</p>
        <p>Thank you for your interest in our Contractor Marketing Checklist. You can access your download at:</p>
        <p><a href="https://hudsonvalleycg.com/resources/marketing-checklist" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">View Your Marketing Checklist</a></p>
        <p>Ready to take your marketing to the next level? We'd love to help you implement these strategies for your business.</p>
        <p><a href="https://hudsonvalleycg.com/booking" style="color: #2563eb; text-decoration: underline;">Schedule a free consultation</a> to discuss how we can help grow your contracting business.</p>
        <p>Best regards,<br />Hudson Valley Consulting Team</p>
      `;
    } else {
      customerEmailContent = `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message}</p>
        <p>Best regards,<br />Hudson Valley Consulting Team</p>
      `;
    }

    // Send confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "Hudson Valley Consulting <no-reply@hvcg.us>",
      to: [email],
      subject: isMarketingChecklistRequest ? "Your Marketing Checklist is Ready!" : "Thank you for contacting Hudson Valley Consulting",
      html: customerEmailContent,
    });
    console.log("Customer email response:", customerEmailResponse);

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
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
    
    // Log security incident
    const { error: auditError } = await supabase.from('audit_logs').insert({
      table_name: 'contact_submissions',
      operation: 'INSERT',
      new_data: { error: 'Processing failed', ip_address: getClientIP(req) },
      ip_address: getClientIP(req),
      user_agent: req.headers.get('user-agent')
    });
    if (auditError) console.error(auditError);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Failed to process contact form submission" 
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
