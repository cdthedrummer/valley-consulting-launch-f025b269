import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Calendar } from "lucide-react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${scrolled ? "scale-95" : "scale-100"}`}>
      <div className="bg-club-green/90 backdrop-blur-xl rounded-full shadow-2xl border border-warm-cream/10 px-8 py-4 flex items-center gap-8">
        {/* Logo */}
        <Link to="/" className="text-warm-cream font-heading text-xl tracking-tight hover:text-gold-accent transition-colors">
          HVC
        </Link>
        
        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#vision" className="text-warm-cream/80 hover:text-warm-cream text-sm font-medium transition-colors">
            The Vision
          </a>
          <a href="#services" className="text-warm-cream/80 hover:text-warm-cream text-sm font-medium transition-colors">
            Services
          </a>
          <a href="#results" className="text-warm-cream/80 hover:text-warm-cream text-sm font-medium transition-colors">
            Results
          </a>
          <a href="#platform" className="text-warm-cream/80 hover:text-warm-cream text-sm font-medium transition-colors">
            Platform
          </a>
        </div>
        
        {/* CTA Button */}
        <Button
          asChild
          className="bg-gold-accent hover:bg-gold-accent/90 text-foreground font-semibold rounded-full px-6 py-2 transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
        >
          <Link to="/booking" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Strategy
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
