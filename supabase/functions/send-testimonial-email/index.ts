
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

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

  try {
    console.log("Parsing testimonial request body");
    const testimonialData: TestimonialData = await req.json();
    console.log("Testimonial data received:", testimonialData);
    
    // Get email from the field
    const emailToUse = testimonialData.email;
    const { name, company, service, rating, testimonial } = testimonialData;

    // Validate the necessary fields
    if (!name || !company || !testimonial) {
      console.error("Missing required testimonial fields");
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Missing required fields" 
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

    console.log("Sending testimonial notification to business owner");
    // Send email to business owner about the new testimonial
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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
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
