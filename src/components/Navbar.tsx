import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Phone, Calendar, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleIndustries = () => setIndustriesOpen(!industriesOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIndustriesOpen(false);
    setServicesOpen(false);
  }, [location]);

  const industries = [
    { name: "HVAC", path: "/industries/hvac" },
    { name: "Plumbing", path: "/industries/plumbing" },
    { name: "Fencing", path: "/industries/fencing" },
    { name: "Deck & Patio", path: "/industries/deck-patio" },
    { name: "Flooring", path: "/industries/flooring" },
  ];
  
  const services = [
    { name: "Advertising", path: "/services#advertising" },
    { name: "SEO", path: "/services#seo" },
    { name: "Consulting", path: "/services#consulting" },
    { name: "All Services", path: "/services" },
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
        <div className="hidden lg:flex items-center space-x-6">
          <Link
            to="/"
            className={`font-medium transition-colors hover:text-hvcg-blue ${
              isActive("/") ? "text-hvcg-blue" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          
          {/* Services Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`font-medium ${
                  location.pathname === "/services" ? "text-hvcg-blue" : "text-gray-600"
                }`}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {services.map((service) => (
                      <li key={service.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={service.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{service.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Industries Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`font-medium ${
                  location.pathname.includes("/industries") ? "text-hvcg-blue" : "text-gray-600"
                }`}>Industries</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {industries.map((industry) => (
                      <li key={industry.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            to={industry.path}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{industry.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <Link
            to="/testimonials"
            className={`font-medium transition-colors hover:text-hvcg-blue ${
              isActive("/testimonials") ? "text-hvcg-blue" : "text-gray-600"
            }`}
          >
            Testimonials
          </Link>
          
          <Link
            to="/about"
            className={`font-medium transition-colors hover:text-hvcg-blue ${
              isActive("/about") ? "text-hvcg-blue" : "text-gray-600"
            }`}
          >
            About
          </Link>
          
          <Link
            to="/resources"
            className={`font-medium transition-colors hover:text-hvcg-blue ${
              isActive("/resources") ? "text-hvcg-blue" : "text-gray-600"
            }`}
          >
            Free Resources
          </Link>
          
          <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white ml-2">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Book Now
            </Link>
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="lg:hidden">
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
        className={`lg:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
        }`}
      >
        <div className="container-custom py-4 flex flex-col space-y-2">
          <Link
            to="/"
            className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md flex items-center ${
              isActive("/") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          
          {/* Services Dropdown (Mobile) */}
          <div>
            <button 
              onClick={toggleServices}
              className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center justify-between ${
                location.pathname === "/services" ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
              }`}
            >
              <div className="flex items-center">
                <Building className="mr-2 h-4 w-4" /> Services
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "transform rotate-180" : ""}`} />
            </button>
            
            {servicesOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    to={service.path}
                    className="block p-2 text-gray-600 hover:text-hvcg-blue hover:bg-gray-100 rounded-md"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* Industries Dropdown (Mobile) */}
          <div>
            <button 
              onClick={toggleIndustries}
              className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center justify-between ${
                location.pathname.includes("/industries") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
              }`}
            >
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" /> Industries
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${industriesOpen ? "transform rotate-180" : ""}`} />
            </button>
            
            {industriesOpen && (
              <div className="pl-4 mt-1 space-y-1">
                {industries.map((industry) => (
                  <Link
                    key={industry.name}
                    to={industry.path}
                    className="block p-2 text-gray-600 hover:text-hvcg-blue hover:bg-gray-100 rounded-md"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <Link
            to="/testimonials"
            className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${
              isActive("/testimonials") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
            }`}
          >
            Testimonials
          </Link>
          
          <Link
            to="/about"
            className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${
              isActive("/about") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
            }`}
          >
            About
          </Link>
          
          <Link
            to="/resources"
            className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${
              isActive("/resources") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"
            }`}
          >
            Free Resources
          </Link>
          
          <div className="pt-2">
            <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
              <Link to="/booking" className="flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" /> Book Now
              </Link>
            </Button>
          </div>
          
          <a 
            href="tel:+18455551234" 
            className="flex items-center justify-center font-medium p-2 bg-hvcg-green text-white rounded-md hover:bg-hvcg-green-light transition-colors mt-2"
          >
            <Phone className="mr-2 h-4 w-4" /> Call (845) 555-1234
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
