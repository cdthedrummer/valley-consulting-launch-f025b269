
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
    <section className="section bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Certifications and standards
          </h2>
          <p className="text-muted-foreground text-lg normal-case font-normal tracking-normal">
            Enterprise-grade rigor applied to local growth. No fluff—just operators with the right credentials.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {certifications.map(({ label, Icon }) => (
            <div
              key={label}
              className="glass-card flex items-center gap-2 p-4 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
              aria-label={label}
            >
              <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-bold text-foreground uppercase tracking-wider">{label}</span>
            </div>
          ))}
        </div>

        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-bold uppercase tracking-wider">Platforms we run</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {platforms.map((p) => (
              <span
                key={p}
                className="inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/20 transition-colors duration-300"
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

