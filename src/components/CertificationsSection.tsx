
import React from "react";
import { BadgeCheck, Shield, Award } from "lucide-react";

const badges = [
  { label: "Google Ads Certified", Icon: BadgeCheck },
  { label: "Meta Blueprint Certified", Icon: BadgeCheck },
  { label: "TikTok Marketing Certified", Icon: BadgeCheck },
  { label: "Data & Privacy First", Icon: Shield },
  { label: "Measurement & QA", Icon: Award },
];

const CertificationsSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-3">
            Certifications and standards
          </h2>
          <p className="text-gray-700">
            Enterprise-grade rigor applied to local growth. No fluff—just operators with the right credentials.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {badges.map(({ label, Icon }) => (
            <div
              key={label}
              className="flex items-center gap-2 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover-scale"
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-hvcg-blue" aria-hidden="true" />
              <span className="text-sm font-medium text-hvcg-blue-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
