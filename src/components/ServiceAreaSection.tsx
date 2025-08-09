
import React from "react";
import { MapPin } from "lucide-react";

const ServiceAreaSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-3">Serving the Hudson Valley — fully remote</h2>
          <p className="text-gray-700">
            We work with businesses across the Hudson Valley and beyond. Most work happens online—strategy, execution, and reporting—so it's easy to collaborate without onsite visits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
