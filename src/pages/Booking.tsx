import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/lib/supabase";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CALENDLY_URL } from "@/config/calendly";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters."
  }),
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters."
  }),
  human_verification: z.boolean().refine(val => val === true, {
    message: "Please confirm you are human."
  })
});
type ContactFormValues = z.infer<typeof contactFormSchema>;
const Booking: React.FC = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: "",
      service_interest: "",
      message: "",
      human_verification: false
    }
  });
  const onSubmit = async (data: ContactFormValues) => {
    // Ensure required fields are present to match ContactSubmission type
    const formData = {
      name: data.name,
      email: data.email,
      message: data.message,
      company: data.company,
      phone: data.phone,
      service_interest: data.service_interest
    };
    await submitContactForm(formData);
    form.reset();
  };
  return (
    <div className="min-h-screen bg-club-green">
      <SEOHead
        title="Book Your Strategy Session | Hudson Valley Consulting"
        description="Schedule a free consultation to discuss growing your contractor business in the Hudson Valley."
        canonicalUrl="/booking"
      />
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-custom">
          <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-wide text-warm-cream mb-6">
            LET'S CONNECT
          </h1>
          <p className="text-xl md:text-2xl text-warm-cream/80 max-w-3xl mx-auto font-dm">
            Book a free 15-minute intro. No pressure, just a conversation.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Calendly Card */}
            <div className="bg-warm-cream rounded-3xl p-8 md:p-12 mb-8">
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-6">PICK A TIME</h2>
              <p className="text-club-green/80 mb-8 font-dm text-lg">
                Choose a time that works for you. We'll meet via Zoom to discuss your goals.
              </p>
              
              <CalendlyEmbed url={CALENDLY_URL} className="rounded-3xl overflow-hidden mb-8" />
              
              <div className="space-y-6">
                <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green">WHAT TO EXPECT:</h3>
                <div className="space-y-4">
                  {[
                    "Pick your service and a time that works",
                    "Get a quick questionnaire about your business",
                    "Receive a Zoom link in your email",
                    "Meet with us to talk about your growth"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-action-yellow rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="font-dm font-bold text-club-green">{index + 1}</span>
                      </div>
                      <p className="text-club-green/90 font-dm pt-1">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="bg-warm-cream rounded-3xl p-8 md:p-12">
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-6">OR SEND A MESSAGE</h2>
              <p className="text-club-green/80 mb-8 font-dm text-lg">
                Have questions first? Drop us a note and we'll get back within 24 hours.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-club-green font-dm font-bold">Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="rounded-full border-club-green/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="company" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-club-green font-dm font-bold">Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company" {...field} className="rounded-full border-club-green/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-club-green font-dm font-bold">Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} className="rounded-full border-club-green/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="phone" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-club-green font-dm font-bold">Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} className="rounded-full border-club-green/20" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  
                  <FormField control={form.control} name="service_interest" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-club-green font-dm font-bold">What Are You Interested In?</FormLabel>
                      <FormControl>
                        <select className="w-full p-3 border border-club-green/20 rounded-full focus:ring-action-yellow focus:border-action-yellow font-dm" {...field}>
                         <option value="">What are you looking for?</option>
                          <option value="Website build">Website build</option>
                          <option value="Search & visibility">Search & visibility</option>
                          <option value="Advisory / automation">Advisory / automation</option>
                          <option value="Networking / speaking">Networking / speaking</option>
                          <option value="Other">Other</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-club-green font-dm font-bold">Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Tell us about your business and what you're looking to achieve." {...field} className="rounded-3xl border-club-green/20" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="human_verification" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-3xl border border-club-green/20 p-6">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-club-green font-dm">I am a human</FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )} />
                  
                  <Button type="submit" className="w-full bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 active:scale-95">
                    <Send className="mr-2 h-5 w-5" /> SEND MESSAGE
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Info Section */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green text-center mb-12">REACH US DIRECTLY</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-club-green rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="bg-action-yellow/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Mail className="text-action-yellow w-8 h-8" />
              </div>
              <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-3">EMAIL</h3>
              <a href="mailto:contact@hvcg.us" className="text-action-yellow hover:text-action-yellow/80 font-dm transition-colors">
                contact@hvcg.us
              </a>
            </div>
            
            <div className="bg-club-green rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="bg-action-yellow/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Phone className="text-action-yellow w-8 h-8" />
              </div>
              <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-3">PHONE</h3>
              <a href="tel:+18456758378" className="text-action-yellow hover:text-action-yellow/80 font-dm transition-colors">
                (845) 675-8378
              </a>
            </div>
            
            <div className="bg-club-green rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-300">
              <div className="bg-action-yellow/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-action-yellow w-8 h-8" />
              </div>
              <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-3">LOCATION</h3>
              <p className="text-warm-cream/80 font-dm">
                Serving the Hudson Valley, NY
              </p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
};
export default Booking;