
import React from "react";
import { Link } from "react-router-dom";
import { Star, Calendar, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials: React.FC = () => {
  // Sample testimonial data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      company: "ABC Contractors",
      image: null,
      rating: 5,
      testimonial: "Hudson Valley Consulting transformed our advertising strategy. Within 3 months, our leads increased by 200% and our close rate improved dramatically. The insights provided during the initial audit alone were worth the investment. Now with the ongoing strategy support, we're consistently growing month over month.",
      service: "Premium Retainer",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Smith Home Services",
      image: null,
      rating: 5,
      testimonial: "The strategy package was exactly what our business needed. We now have clear messaging, know exactly who to target, and our ads are performing better than ever. Our cost per lead has decreased by 40% while our conversion rate has increased. I highly recommend HVCG to any contractor looking to grow.",
      service: "Strategy Package",
    },
    {
      id: 3,
      name: "Robert Johnson",
      company: "Johnson Construction",
      image: null,
      rating: 5,
      testimonial: "The monthly retainer has been invaluable. Having an expert manage our campaigns while providing strategic guidance has allowed us to focus on what we do best - serving our customers. We've seen a 300% ROI on our advertising spend since working with Hudson Valley Consulting.",
      service: "Premium Retainer",
    },
    {
      id: 4,
      name: "Michael Brown",
      company: "Brown Electrical",
      image: null,
      rating: 5,
      testimonial: "The introductory audit opened our eyes to so many missed opportunities in our advertising. The specific, actionable recommendations were clear and effective. Within weeks of implementing the changes, we saw a noticeable increase in quality leads coming through our website.",
      service: "Introductory Audit & Consultation",
    },
    {
      id: 5,
      name: "Sarah Wilson",
      company: "Wilson Plumbing",
      image: null,
      rating: 5,
      testimonial: "We were wasting thousands on ineffective ads before working with HVCG. The strategy they developed helped us narrow our focus, speak directly to our ideal customers, and stand out from competitors. Our business has grown 35% this year, and a big part of that is due to the improved advertising strategy.",
      service: "Strategy Package",
    },
    {
      id: 6,
      name: "David Miller",
      company: "Miller Roofing",
      image: null,
      rating: 5,
      testimonial: "As a small roofing company, we were struggling to compete with bigger names in our area. The customized strategy from Hudson Valley Consulting gave us a unique position in the market and helped us target specific neighborhoods and demographics. Now we're booked months in advance with quality projects.",
      service: "Strategy Package",
    }
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
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
          
          {/* Submit Your Testimonial Section - This would connect with Supabase later */}
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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Service Used
                  </label>
                  <select
                    id="service"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Introductory Audit & Consultation">Introductory Audit & Consultation</option>
                    <option value="Strategy Package">Strategy Package</option>
                    <option value="Premium Retainer">Premium Retainer</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                    Rating
                  </label>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <label key={star} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={star}
                          className="sr-only"
                        />
                        <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Testimonial
                  </label>
                  <textarea
                    id="testimonial"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                  Submit Testimonial
                </Button>
              </form>
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
