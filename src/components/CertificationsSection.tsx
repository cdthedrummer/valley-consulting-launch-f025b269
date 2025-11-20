
import React from "react";
import { BadgeCheck, Globe2 } from "lucide-react";

const certifications = [
  { label: "Google Ads Certified", Icon: BadgeCheck },
  { label: "YouTube Certified", Icon: BadgeCheck },
];

const platforms = [
  "DV360",
  "SA360",
  "Google Ads",
  "Bing Ads",
  "TikTok Ads",
  "Snapchat Ads",
  "Reddit Ads",
  "Pinterest Ads",
  "Hulu Ads",
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {certifications.map(({ label, Icon }) => (
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

        <div className="bg-hvcg-blue-dark/5 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe2 className="h-4 w-4 text-hvcg-blue" />
            <p className="text-sm font-semibold text-hvcg-blue-dark">Platforms we run</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <span
                key={p}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white border border-gray-200 text-hvcg-blue-dark"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;

