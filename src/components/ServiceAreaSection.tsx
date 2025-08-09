
import React from "react";
import { MapPin } from "lucide-react";

const ServiceAreaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-3">Proudly serving the Hudson Valley</h2>
          <p className="text-gray-700">
            We partner with local businesses across the Hudson Valley—fully remote and on your schedule. Strategy calls, reporting, and execution are handled online for speed and convenience.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {["Dutchess", "Ulster", "Orange", "Putnam", "Rockland", "Westchester", "Columbia"].map((county) => (
            <span key={county} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-hvcg-blue-dark/5 border border-gray-200 text-hvcg-blue-dark">
              <MapPin className="h-3 w-3 mr-1 text-hvcg-blue" /> {county} County
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
