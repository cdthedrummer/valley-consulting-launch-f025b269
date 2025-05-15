
import React from "react";
import { Link } from "react-router-dom";
import { Phone, Building } from "lucide-react";

const MobileCallButton: React.FC = () => {
  return (
    <div className="fixed bottom-4 left-4 right-4 md:hidden flex z-30">
      <a href="tel:+18455551234" className="flex-1 bg-hvcg-green text-white py-3 font-medium rounded-l-lg flex items-center justify-center">
        <Phone className="h-5 w-5 mr-2" /> Call Now
      </a>
      <Link to="/services" className="flex-1 bg-hvcg-blue text-white py-3 font-medium rounded-r-lg flex items-center justify-center">
        <Building className="h-5 w-5 mr-2" /> Compare Plans
      </Link>
    </div>
  );
};

export default MobileCallButton;
