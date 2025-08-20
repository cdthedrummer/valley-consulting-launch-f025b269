import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Phone, Building, User, ChevronDown, LogOut, CreditCard, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
interface MobileNavigationProps {
  isOpen: boolean;
}
const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen
}) => {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const toggleIndustries = () => setIndustriesOpen(!industriesOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  
  const handleSignOut = async () => {
    await signOut();
  };

  const handleManageAccount = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (error) throw error;
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error accessing customer portal:', error);
    }
  };
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
  return <div id="mobile-navigation" className={`lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-200 shadow-md transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"}`}>
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
        
        
        <Link to="/approach" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${isActive("/approach") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>Approach</Link>
        <Link to="/resources" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md ${isActive("/resources") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>Resources</Link>
        
        {/* AI & Authentication Section */}
        {user ? (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/ai/dashboard" className={`font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md flex items-center ${isActive("/ai/dashboard") ? "text-hvcg-blue bg-gray-100" : "text-gray-600"}`}>
              <Monitor className="mr-2 h-4 w-4" /> AI Dashboard
            </Link>
            <button onClick={handleManageAccount} className="font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center text-gray-600">
              <CreditCard className="mr-2 h-4 w-4" /> Manage Account
            </button>
            <button onClick={handleSignOut} className="font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md w-full text-left flex items-center text-gray-600">
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </button>
          </>
        ) : (
          <>
            <div className="border-t border-gray-200 my-2"></div>
            <Link to="/auth" className="font-medium p-2 transition-colors hover:text-hvcg-blue hover:bg-gray-100 rounded-md flex items-center text-gray-600">
              <User className="mr-2 h-4 w-4" /> Sign In
            </Link>
          </>
        )}
        
        {/* Book Now Button */}
        <div className="pt-2">
          <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking" className="flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Book Now
            </Link>
          </Button>
        </div>
        
      </div>
    </div>;
};
export default MobileNavigation;