
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
      <div className="glass-card p-8 transition-all duration-300 flex flex-col items-center hover:shadow-xl hover:shadow-primary/20">
        <div className="bg-primary/10 border border-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
          {icon}
        </div>
        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-300 text-lg uppercase tracking-wider">{title}</h3>
      </div>
    </Link>
  );
};

export default IndustryCard;
