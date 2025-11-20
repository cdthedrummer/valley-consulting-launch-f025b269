
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, LogOut, User, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
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
    }
  };

  return (
    <div className="hidden lg:flex items-center space-x-8">
      <Link
        to="/"
        className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
          isActive("/") ? "text-primary" : "text-foreground/80 hover:text-primary"
        }`}
      >
        Home
      </Link>
      
      <ServicesMenu location={location} />
      <IndustriesMenu location={location} />
      <Link
        to="/approach"
        className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive("/approach") ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
      >
        Approach
      </Link>
      <ResourcesMenu location={location} />
      
      
      
      {user ? (
        <div className="flex items-center space-x-4">
          <Button asChild variant="premium" size="sm">
            <Link to="/ai/dashboard" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> AI Dashboard
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="glass" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover/95 backdrop-blur-lg border-primary/20">
              <DropdownMenuItem asChild>
                <Link to="/ai/dashboard" className="w-full">
                  AI Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleManageAccount}>
                <CreditCard className="mr-2 h-4 w-4" />
                Manage Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center space-x-3">
          <Button asChild variant="premium" size="sm">
            <Link to="/ai/dashboard" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" /> AI Dashboard
            </Link>
          </Button>
          
          <Button asChild variant="outline" size="sm">
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
