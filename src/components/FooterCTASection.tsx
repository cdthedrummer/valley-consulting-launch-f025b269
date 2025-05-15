
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterCTASection: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-blue-dark text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get More Customers?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Take the first step toward transforming your contracting business with expert advertising and marketing support.
        </p>
        <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
          <Link to="/booking" className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> Let's Chat
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FooterCTASection;
