
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Quote } from "lucide-react";
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
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApprovedTestimonials, submitTestimonial } from "@/lib/supabase";
import { Testimonial } from "@/types/supabase";
import { useQuery } from "@tanstack/react-query";

const testimonialFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(2, { message: "Company name is required." }),
  service: z.string().min(1, { message: "Please select a service." }),
  rating: z.number().min(1).max(5),
  testimonial: z.string().min(10, { message: "Testimonial must be at least 10 characters." }),
});

type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;

const Testimonials: React.FC = () => {
  const [selectedRating, setSelectedRating] = useState<number>(5);
  
  // Fetch testimonials from Supabase
  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data } = await fetchApprovedTestimonials();
      return data || [];
    }
  });
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      company: "",
      service: "",
      rating: 5,
      testimonial: "",
    },
  });
  
  const onSubmit = async (data: TestimonialFormValues) => {
    // Ensure all required fields are present to match Testimonial type
    const testimonialData = {
      name: data.name,
      company: data.company,
      service: data.service,
      rating: selectedRating,
      testimonial: data.testimonial
    };
    
    await submitTestimonial(testimonialData);
    form.reset();
    setSelectedRating(5);
  };
  
  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    form.setValue('rating', rating);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Client Testimonials</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Don't just take our word for it. Hear from contractors who've transformed their businesses through our advertising consulting services.
          </p>
        </div>
      </section>
      
      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container-custom">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-hvcg-blue border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No testimonials available yet.</p>
              <p className="text-gray-600 mt-2">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial.id} className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-center text-yellow-400 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="fill-current" size={20} />
                      ))}
                    </div>
                    
                    <div className="mb-6 relative">
                      <Quote className="absolute -left-2 -top-2 text-hvcg-blue/10 w-12 h-12" />
                      <p className="text-gray-700 relative z-10">
                        "{testimonial.testimonial}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl">
                          {testimonial.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">{testimonial.name}</h4>
                          <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                      </div>
                      <div>
                        <span className="inline-block bg-hvcg-gray px-3 py-1 rounded-full text-xs font-medium text-hvcg-blue-dark">
                          {testimonial.service}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {/* Submit Your Testimonial Section */}
          <div className="mt-16 bg-hvcg-gray p-8 rounded-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-2">Are You a Client?</h2>
              <p className="text-lg text-gray-700">
                We'd love to hear about your experience working with Hudson Valley Consulting.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-hvcg-blue-dark">Submit Your Testimonial</h3>
              <p className="text-gray-700 mb-4">
                Your feedback helps us improve and lets other contractors know about your experience.
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
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Used</FormLabel>
                        <FormControl>
                          <select
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                            {...field}
                          >
                            <option value="">Select a service</option>
                            <option value="Introductory Audit & Consultation">Introductory Audit & Consultation</option>
                            <option value="Strategy Package">Strategy Package</option>
                            <option value="Premium Retainer">Premium Retainer</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <FormControl>
                          <div className="flex space-x-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                onClick={() => handleRatingClick(star)}
                                className="focus:outline-none"
                              >
                                <Star 
                                  className={`w-8 h-8 ${
                                    star <= selectedRating 
                                      ? "text-yellow-400 fill-current" 
                                      : "text-gray-300"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="testimonial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Testimonial</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={4}
                            placeholder="Share your experience working with us..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                    Submit Testimonial
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Take the first step toward transforming your advertising strategy and growing your contracting business.
          </p>
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
