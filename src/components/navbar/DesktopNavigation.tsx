
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ServicesMenu } from "./ServicesMenu";
import { IndustriesMenu } from "./IndustriesMenu";
import { ResourcesMenu } from "./ResourcesMenu";

const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    await signOut();
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
      
      {user ? (
        <div className="flex items-center space-x-4">
          <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Book Now
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/ai/dashboard" className="w-full">
                  AI Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue transition-colors text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> Book Now
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/auth">
              Sign In
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DesktopNavigation;
