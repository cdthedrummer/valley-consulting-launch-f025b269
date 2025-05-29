import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Phone, Building, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
interface MobileNavigationProps {
  isOpen: boolean;
}
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen
}) => {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const toggleIndustries = () => setIndustriesOpen(!industriesOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const industries = [{
    name: "HVAC",
    path: "/industries/hvac"
  }, {
    name: "Plumbing",
    path: "/industries/plumbing"
  }, {
    name: "Fencing",
    path: "/industries/fencing"
  }, {
    name: "Deck & Patio",
    path: "/industries/deck-patio"
  }, {
    name: "Flooring",
    path: "/industries/flooring"
  }];
  const services = [{
    name: "Advertising",
    path: "/services#advertising"
  }, {
    name: "SEO",
    path: "/services#seo"
  }, {
    name: "Consulting",
    path: "/services#consulting"
  }, {
    name: "All Services",
    path: "/services"
  }];
  return <div className={`lg:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}>
      <div className="container-custom py-4 flex flex-col space-y-2">
        <Link to="/" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md flex items-center ${isActive("/") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
          Home
        </Link>
        
        {/* Services Dropdown (Mobile) */}
        <div>
          <button onClick={toggleServices} className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center justify-between ${location.pathname === "/services" ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4" /> Services
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "transform rotate-180" : ""}`} />
          </button>
          
          {servicesOpen && <div className="pl-4 mt-1 space-y-1">
              {services.map(service => <Link key={service.name} to={service.path} className="block p-2 text-gray-600 hover:text-hvcg-blue hover:bg-gray-100 rounded-md">
                  {service.name}
                </Link>)}
            </div>}
        </div>
        
        {/* Industries Dropdown (Mobile) */}
        <div>
          <button onClick={toggleIndustries} className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center justify-between ${location.pathname.includes("/industries") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" /> Industries
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${industriesOpen ? "transform rotate-180" : ""}`} />
          </button>
          
          {industriesOpen && <div className="pl-4 mt-1 space-y-1">
              {industries.map(industry => <Link key={industry.name} to={industry.path} className="block p-2 text-gray-600 hover:text-hvcg-blue hover:bg-gray-100 rounded-md">
                  {industry.name}
                </Link>)}
            </div>}
        </div>
        
        <Link to="/testimonials" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${isActive("/testimonials") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
          Testimonials
        </Link>
        
        <Link to="/about" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${isActive("/about") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
          About
        </Link>
        
        <Link to="/resources" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${isActive("/resources") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>Resources</Link>
        
        <div className="pt-2">
          <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking" className="flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Book Now
            </Link>
          </Button>
        </div>
        
        <a href="tel:+18455551234" className="flex items-center justify-center font-medium p-2 bg-hvcg-green text-white rounded-md hover:bg-hvcg-green-light transition-colors mt-2">
          <Phone className="mr-2 h-4 w-4" /> Call (845) 555-1234
        </a>
      </div>
    </div>;
};
export default MobileNavigation;