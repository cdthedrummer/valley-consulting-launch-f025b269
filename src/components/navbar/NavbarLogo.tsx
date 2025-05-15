
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/a2bc17d4-98af-42a7-8864-830b57682732.png" 
        alt="Hudson Valley Consulting Group" 
        className="h-12"
      />
    </Link>
  );
};

export default NavbarLogo;
