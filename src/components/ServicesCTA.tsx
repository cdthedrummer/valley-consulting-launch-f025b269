
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ServicesCTA: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-blue-dark text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Advertising?</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
          Take the first step toward more effective advertising and higher ROI.
        </p>
        <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
          <Link to="/booking" className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default ServicesCTA;
