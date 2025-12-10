
import React from "react";
import { Link } from "react-router-dom";
import logoWhiteWide from "@/assets/logos/hvcg-logo-white-wide.png";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src={logoWhiteWide} 
        alt="HVCG - Hudson Valley Consulting Group" 
        className="h-8 md:h-10 w-auto"
      />
    </Link>
  );
};

export default NavbarLogo;
