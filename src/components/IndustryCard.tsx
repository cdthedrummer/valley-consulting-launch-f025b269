
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

interface IndustryCardProps {
  title: string;
  icon: ReactNode;
  link: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({ title, icon, link }) => {
  return (
    <Link to={link} className="group block">
      <div className="bg-club-green rounded-3xl border border-warm-cream/10 p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift flex flex-col items-center">
        <div className="bg-action-yellow/20 w-20 h-20 rounded-3xl flex items-center justify-center mb-4 group-hover:bg-action-yellow/30 transition-colors">
          <div className="text-action-yellow">
            {icon}
          </div>
        </div>
        <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream group-hover:text-action-yellow transition-colors">{title}</h3>
      </div>
    </Link>
  );
};

export default IndustryCard;
