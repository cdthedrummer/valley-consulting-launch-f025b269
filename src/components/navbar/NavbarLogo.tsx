
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <h1 className="text-xl md:text-2xl font-bold font-archivo uppercase tracking-wide text-warm-cream">
        HVCG
      </h1>
    </Link>
  );
};

export default NavbarLogo;
