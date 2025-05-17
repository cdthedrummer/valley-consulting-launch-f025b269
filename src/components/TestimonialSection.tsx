
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Hudson Valley Consulting transformed our advertising strategy. Within 3 months, our leads increased by 200% and our close rate improved dramatically. Their knowledge of the local market made all the difference.",
    name: "John Doe",
    company: "ABC Contractors, Hudson Valley",
    rating: 5,
    initials: "JD",
    service: "Premium Retainer"
  },
  {
    id: 2,
    text: "We were skeptical about digital advertising before working with HVC. They showed us exactly where our money was going and helped us reduce wasted ad spend by 40%. Now we're getting higher quality leads that actually convert.",
    name: "Sarah Miller",
    company: "Miller's Plumbing, Poughkeepsie",
    rating: 5,
    initials: "SM",
    service: "Strategy Package"
  },
  {
    id: 3,
    text: "The introductory audit was eye-opening. They found issues with our Google Business Profile that were causing us to miss out on local searches. After implementing their recommendations, we saw a 65% increase in calls within weeks.",
    name: "Michael Johnson",
    company: "Johnson HVAC Services",
    rating: 5,
    initials: "MJ",
    service: "Introductory Audit"
  }
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentTestimonial = testimonials[currentIndex];
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="py-16 bg-gradient-to-b from-white to-hvcg-gray">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-hvcg-blue-dark mb-4">What Our Clients Say</h2>
          <p className="text-gray-600">Real results from real contractors in the Hudson Valley</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentTestimonial.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8 relative"
          >
            <div className="absolute -top-5 left-10 text-hvcg-blue text-6xl opacity-20">
              <Quote />
            </div>
            <div className="relative z-10">
              <div className="flex items-center text-yellow-400 mb-4">
                {[...Array(currentTestimonial.rating)].map((_, i) => <Star key={i} className="fill-current" size={20} />)}
              </div>
              
              <p className="text-xl text-gray-700 italic mb-6">
                "{currentTestimonial.text}"
              </p>
              
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-hvcg-blue-dark text-white flex items-center justify-center text-xl font-bold mr-4">
                  {currentTestimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{currentTestimonial.name}</h4>
                  <p className="text-sm text-gray-600">{currentTestimonial.company}</p>
                </div>
                <div className="ml-auto">
                  <span className="inline-block bg-hvcg-blue/10 text-hvcg-blue-dark px-3 py-1 rounded-full text-xs font-medium">
                    {currentTestimonial.service}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <button 
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-hvcg-gray hover:bg-hvcg-blue/10 transition-colors mr-2"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={16} />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-hvcg-gray hover:bg-hvcg-blue/10 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? "w-8 bg-hvcg-blue" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white shadow-sm">
            <Link to="/testimonials">Read More Success Stories</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
