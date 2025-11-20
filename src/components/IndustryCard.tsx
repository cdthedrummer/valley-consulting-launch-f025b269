
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IndustryCardProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, icon, link }) => {
  return (
    <Link to={link} className="group">
      <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
        <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
          {icon}
        </div>
        <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">{title}</h3>
      </div>
    </Link>
  );
};

export default IndustryCard;
