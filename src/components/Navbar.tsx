
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import MobileNavigation from "./navbar/MobileNavigation";
import MobileMenuButton from "./navbar/MobileMenuButton";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-sm" : "bg-white/95 backdrop-blur"} h-16 md:h-20 flex items-center border-b border-gray-200`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <NavbarLogo />
        
        {/* Desktop Navigation + CTA (desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <DesktopNavigation />
          <Button asChild className="bg-brand-red text-white hover:brightness-110 shadow">
            <Link to="/resources/ai-copilot" aria-label="Start free trial — code: tryai">Start Free Trial</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
