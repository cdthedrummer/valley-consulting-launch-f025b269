
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ContactSubmission, Appointment, Testimonial } from "@/types/supabase";

export async function submitContactForm(formData: ContactSubmission) {
  try {
    const { error } = await supabase
      .from("contact_submissions")
      .insert([formData]);
    
    if (error) throw error;
    
    toast({
      title: "Message sent!",
      description: "We'll get back to you soon.",
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting form:", error);
    toast({
      title: "Error",
      description: "There was a problem sending your message. Please try again.",
      variant: "destructive",
    });
    
    return { success: false, error };
  }
}

export async function submitAppointment(formData: Appointment) {
  try {
    const { error } = await supabase
      .from("appointments")
      .insert([formData]);
    
    if (error) throw error;
    
    toast({
      title: "Appointment requested!",
      description: "We'll confirm your appointment soon.",
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting appointment:", error);
    toast({
      title: "Error",
      description: "There was a problem booking your appointment. Please try again.",
      variant: "destructive",
    });
    
    return { success: false, error };
  }
}

export async function submitTestimonial(formData: Testimonial) {
  try {
    const { error } = await supabase
      .from("testimonials")
      .insert([formData]);
    
    if (error) throw error;
    
    toast({
      title: "Thank you for your feedback!",
      description: "Your testimonial will be reviewed and published soon.",
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error submitting testimonial:", error);
    toast({
      title: "Error",
      description: "There was a problem submitting your testimonial. Please try again.",
      variant: "destructive",
    });
    
    return { success: false, error };
  }
}

export async function fetchApprovedTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    
    return { data };
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return { data: [] };
  }
}
