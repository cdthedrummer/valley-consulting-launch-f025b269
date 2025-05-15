
import React from "react";
import { Link } from "react-router-dom";

const NavbarLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <h1 className="text-2xl font-bold text-hvcg-blue-dark">
        <span className="text-hvcg-blue">Hudson Valley</span> Consulting
      </h1>
    </Link>
  );
};

export default NavbarLogo;
