
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Hudson Valley Consulting Group home">
      <img
        src="/lovable-uploads/11ae22f6-8e20-4d14-9a08-5ffa2b198ee5.png"
        alt="HVCG mountain halftone logo"
        className="h-8 w-8 rounded-sm"
        loading="eager"
        decoding="async"
      />
      <h1 className="text-2xl font-bold text-hvcg-blue-dark">
        <span className="text-hvcg-blue">Hudson Valley</span> Consulting
      </h1>
    </Link>
  );
};

export default NavbarLogo;
