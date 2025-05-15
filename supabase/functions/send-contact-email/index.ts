
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

  try {
    console.log("Parsing request body");
    const formData: ContactFormData = await req.json();
    console.log("Form data received:", formData);
    
    const { name, email, message, company, phone, service_interest } = formData;

    // Validate the necessary fields
    if (!name || !email || !message) {
      console.error("Missing required fields");
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

    console.log("Sending email to business owner");
    // Send email to business owner
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
      `,
    });
    console.log("Owner email response:", ownerEmailResponse);

    console.log("Sending confirmation email to customer");
    // Send confirmation email to the customer
    const customerEmailResponse = await resend.emails.send({
      from: "Hudson Valley Consulting <no-reply@hvcg.us>",
      to: [email],
      subject: "Thank you for contacting Hudson Valley Consulting",
      html: `
        <h1>Thank you for reaching out!</h1>
        <p>Hello ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p>${message}</p>
        <p>Best regards,<br />Hudson Valley Consulting Team</p>
      `,
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
