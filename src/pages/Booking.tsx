
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Calendar, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/lib/supabase";
import CalendlyEmbed from "@/components/CalendlyEmbed";
import { CALENDLY_URL } from "@/config/calendly";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  human_verification: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you are human." }),
  }),
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
      human_verification: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Ensure required fields are present to match ContactSubmission type
    const formData = {
      name: data.name,
      email: data.email,
      message: data.message,
      company: data.company,
      phone: data.phone,
      service_interest: data.service_interest,
    };
    
    await submitContactForm(formData);
    form.reset();
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Take the first step towards transforming your advertising strategy. Schedule a consultation or reach out with any questions.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly Integration */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-6">Schedule a Consultation</h2>
              <p className="text-gray-700 mb-6">
                Use our online calendar to find a time that works for you. Consultations are conducted via Zoom.
              </p>
              
              <CalendlyEmbed 
                url={CALENDLY_URL}
                className="bg-white rounded-lg mb-6"
              />
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hvcg-blue-dark">What to Expect:</h3>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">1</span>
                  </div>
                  <p className="text-gray-700">
                    Select your preferred service and consultation time from the calendar.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">2</span>
                  </div>
                  <p className="text-gray-700">
                    Complete a brief questionnaire about your business and advertising goals.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">3</span>
                  </div>
                  <p className="text-gray-700">
                    Receive a confirmation email with meeting details and preparation tips.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">4</span>
                  </div>
                  <p className="text-gray-700">
                    Meet virtually to discuss your advertising needs and explore how we can help.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions or need more information? Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="service_interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interested In</FormLabel>
                        <FormControl>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                            {...field}
                          >
                            <option value="">Select a service</option>
                            <option value="Introductory Audit & Consultation">Introductory Audit & Consultation</option>
                            <option value="Strategy Package">Strategy Package</option>
                            <option value="Premium Retainer">Premium Retainer</option>
                            <option value="Other">Other/Not Sure</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4}
                            placeholder="Tell us a bit about your business and what you're looking to achieve with your advertising."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="human_verification"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I am a human
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" /> Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Direct Contact Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Email</h3>
                <a href="mailto:contact@hvcg.us" className="text-hvcg-blue hover:underline">
                  contact@hvcg.us
                </a>
              </CardContent>
            </Card>
            
            {/* Phone */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Phone className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Phone</h3>
                <a href="tel:+18456758378" className="text-hvcg-blue hover:underline">
                  (845) 675-8378
                </a>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Location</h3>
                <p className="text-gray-700">
                  Serving contractors throughout the Hudson Valley, NY
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">How much does it cost to work with you?</h3>
              <p className="text-gray-700">
                We offer transparent, fixed pricing for our services: $500 for an Introductory Audit, $2,000 for our Strategy Package, and $1,500/month for our Premium Retainer service.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">What happens after I book a consultation?</h3>
              <p className="text-gray-700">
                You'll receive a confirmation email with meeting details and a brief questionnaire to help us prepare. During the consultation, we'll discuss your business, advertising goals, and how our services can help you achieve them.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Do you have a refund policy?</h3>
              <p className="text-gray-700">
                Yes, we stand behind our services. If you're not satisfied with the quality of our work, we'll either redo it or provide a refund, depending on the circumstances.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">How quickly can we get started?</h3>
              <p className="text-gray-700">
                Typically, we can schedule an initial consultation within 1-2 weeks. For project work, we generally get started within 1-3 weeks of contract signing, depending on our current client load.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Book your consultation today and take the first step toward transforming your contracting business with expert advertising strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <a href="#" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Consultation
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/services" className="flex items-center">
                Learn About Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
