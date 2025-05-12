
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/booking" },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-white/90 py-4"}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-hvcg-blue-dark">
            <span className="text-hvcg-blue">Hudson Valley</span> Consulting
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium transition-colors hover:text-hvcg-blue ${
                isActive(item.path)
                  ? "text-hvcg-blue"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-custom py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${
                isActive(item.path)
                  ? "text-hvcg-blue bg-gray-100"
                  : "text-gray-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
