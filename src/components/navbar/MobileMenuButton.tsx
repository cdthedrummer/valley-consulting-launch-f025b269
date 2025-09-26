
import React from "react";
import { Menu, X } from "lucide-react";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <div className="lg:hidden">
      <button
        onClick={toggleMenu}
        className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 touch-target active:scale-95"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <div className="relative">
          <Menu 
            size={24} 
            className={`transition-all duration-300 ${isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'} absolute`} 
          />
          <X 
            size={24} 
            className={`transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'} absolute`} 
          />
        </div>
      </button>
    </div>
  );
};

export default MobileMenuButton;
