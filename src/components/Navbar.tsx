
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import MobileNavigation from "./navbar/MobileNavigation";
import MobileMenuButton from "./navbar/MobileMenuButton";

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-lg shadow-lg shadow-black/20" : "bg-black/50 backdrop-blur-md"} h-16 md:h-20 flex items-center border-b ${scrolled ? "border-primary/20" : "border-white/5"}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <NavbarLogo />
        
        {/* Desktop Navigation */}
        <DesktopNavigation />
        
        {/* Mobile Menu Button */}
        <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNavigation isOpen={isOpen} />
    </nav>
  );
};

export default Navbar;
