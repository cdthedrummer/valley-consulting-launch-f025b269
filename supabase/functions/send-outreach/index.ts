import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { recipients, template, mode = 'test' } = await req.json();
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const resend = new Resend(RESEND_API_KEY);

    // In test mode, only send to provided test email
    if (mode === 'test') {
      const testRecipient = recipients[0];
      
      const emailResponse = await resend.emails.send({
        from: 'Contractor Marketing <onboarding@resend.dev>',
        to: [testRecipient.email],
        subject: 'Test: Marketing Outreach',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">This is a test email</h2>
            <p>Hello ${testRecipient.name || 'there'},</p>
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              ${template}
            </div>
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">
              This is a test email from your Marketing Action Center. 
              To send real campaigns, verify your sending domain in Resend.
            </p>
          </div>
        `,
      });

      console.log('Test email sent:', emailResponse);

      return new Response(
        JSON.stringify({ 
          success: true, 
          mode: 'test',
          sent: 1,
          messageId: emailResponse.id 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Production mode - would send to all recipients
    // This requires domain verification in Resend
    const results = [];
    for (const recipient of recipients) {
      const emailResponse = await resend.emails.send({
        from: 'Contractor Marketing <noreply@yourdomain.com>', // Update with verified domain
        to: [recipient.email],
        subject: 'Marketing Outreach',
        html: template,
      });
      results.push(emailResponse);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        mode: 'production',
        sent: results.length,
        results 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-outreach function:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to send emails' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
