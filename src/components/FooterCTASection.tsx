
import React from "react";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const FooterCTASection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container-custom text-center relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Ready to grow smarter?</h2>
        <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-muted-foreground normal-case font-normal tracking-normal">
          Get a simple, actionable plan for marketing, AI, and advertising—tailored to your local business.
        </p>
        <Button asChild size="lg" variant="premium" className="text-lg px-12 py-7">
          <Link to="/booking" className="flex items-center">
            <Calendar className="mr-2 h-6 w-6" /> Get my free growth plan
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FooterCTASection;
