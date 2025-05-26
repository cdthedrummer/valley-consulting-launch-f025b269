
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicesMenu } from "./ServicesMenu";
import { IndustriesMenu } from "./IndustriesMenu";
import { ResourcesMenu } from "./ResourcesMenu";

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden lg:flex items-center space-x-6">
      <Link
        to="/"
        className={`font-medium transition-colors hover:text-hvcg-blue ${
          isActive("/") ? "text-hvcg-blue" : "text-gray-600"
        }`}
      >
        Home
      </Link>
      
      <ServicesMenu location={location} />
      <IndustriesMenu location={location} />
      <ResourcesMenu location={location} />
      
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
      
      <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white ml-2">
        <Link to="/booking" className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" /> Book Now
        </Link>
      </Button>
    </div>
  );
};

export default DesktopNavigation;
