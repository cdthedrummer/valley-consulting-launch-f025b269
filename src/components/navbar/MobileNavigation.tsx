import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Phone, Building, User, ChevronDown, LogOut, CreditCard, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  const { toast } = useToast();
  
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
        window.location.href = data.url;
      }
      } catch (error) {
        console.error('Error accessing customer portal:', error);
        toast({
          title: "Access Error",
          description: "Unable to access account management. Please try again later.",
          variant: "destructive",
        });
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
  return <div id="mobile-navigation" className={`lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-t border-border shadow-lg transition-all duration-300 ease-in-out transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}`}>
      <div className="container-custom py-6 flex flex-col space-y-1">
        <Link to="/" className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg flex items-center touch-target ${isActive("/") ? "text-primary bg-accent" : "text-foreground"}`}>
          Home
        </Link>
        
        {/* Services Dropdown (Mobile) */}
        <div>
          <button onClick={toggleServices} className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg w-full text-left flex items-center justify-between touch-target ${location.pathname === "/services" ? "text-primary bg-accent" : "text-foreground"}`}>
            <div className="flex items-center">
              <Building className="mr-3 h-5 w-5" /> Services
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "transform rotate-180" : ""}`} />
          </button>
          
          {servicesOpen && <div className="pl-6 mt-2 space-y-1 animate-fade-in">
              {services.map(service => <Link key={service.name} to={service.path} className="block p-3 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200 touch-target">
                  {service.name}
                </Link>)}
            </div>}
        </div>
        
        {/* Industries Dropdown (Mobile) */}
        <div>
          <button onClick={toggleIndustries} className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg w-full text-left flex items-center justify-between touch-target ${location.pathname.includes("/industries") ? "text-primary bg-accent" : "text-foreground"}`}>
            <div className="flex items-center">
              <User className="mr-3 h-5 w-5" /> Industries
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${industriesOpen ? "transform rotate-180" : ""}`} />
          </button>
          
          {industriesOpen && <div className="pl-6 mt-2 space-y-1 animate-fade-in">
              {industries.map(industry => <Link key={industry.name} to={industry.path} className="block p-3 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200 touch-target">
                  {industry.name}
                </Link>)}
            </div>}
        </div>
        
        
        <Link to="/approach" className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg touch-target ${isActive("/approach") ? "text-primary bg-accent" : "text-foreground"}`}>Approach</Link>
        <Link to="/resources" className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg touch-target ${isActive("/resources") ? "text-primary bg-accent" : "text-foreground"}`}>Resources</Link>
        
        {/* AI & Authentication Section */}
        {user ? (
          <>
            <div className="border-t border-border my-4"></div>
            <Link to="/ai/dashboard" className={`font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg flex items-center touch-target ${isActive("/ai/dashboard") ? "text-primary bg-accent" : "text-foreground"}`}>
              <Monitor className="mr-3 h-5 w-5" /> AI Dashboard
            </Link>
            <button onClick={handleManageAccount} className="font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg w-full text-left flex items-center text-foreground touch-target">
              <CreditCard className="mr-3 h-5 w-5" /> Manage Account
            </button>
            <button onClick={handleSignOut} className="font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg w-full text-left flex items-center text-foreground touch-target">
              <LogOut className="mr-3 h-5 w-5" /> Sign Out
            </button>
          </>
        ) : (
          <>
            <div className="border-t border-border my-4"></div>
            <Link to="/auth" className="font-medium p-4 transition-all duration-200 hover:text-primary hover:bg-accent rounded-lg flex items-center text-foreground touch-target">
              <User className="mr-3 h-5 w-5" /> Sign In
            </Link>
          </>
        )}
        
        {/* Launch AI Dashboard Button */}
        <div className="pt-4">
          <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90 transition-all duration-200 text-primary-foreground touch-target active:scale-98">
            <Link to="/ai/dashboard" className="flex items-center justify-center gap-3">
              <Calendar className="h-5 w-5" /> Launch AI Dashboard
            </Link>
          </Button>
        </div>
        
      </div>
    </div>;
};
export default MobileNavigation;