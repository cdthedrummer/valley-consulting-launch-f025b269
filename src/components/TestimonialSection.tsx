
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-gray">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">What Our Clients Say</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto relative">
          <div className="absolute -top-5 left-10 text-hvcg-blue text-6xl opacity-20">"</div>
          <div className="relative z-10">
            <p className="text-xl text-gray-700 italic mb-6">
              "Hudson Valley Consulting transformed our advertising strategy. Within 3 months, our leads increased by 200% and our close rate improved dramatically. Their knowledge of the local market made all the difference."
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl mr-4">
                JD
              </div>
              <div>
                <h4 className="font-semibold">John Doe</h4>
                <p className="text-sm text-gray-600">ABC Contractors, Hudson Valley</p>
              </div>
              <div className="ml-auto flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="fill-current" size={20} />)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
            <Link to="/testimonials">Read More Testimonials</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
