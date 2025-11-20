import React from "react";
import { BarChart3, Target, PhoneCall, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const items = [
  {
    title: "Home services (HVAC)",
    summary: "Fixed tracking and tightened keywords",
    points: ["+28% qualified calls in 60 days", "-22% cost per lead"],
    Icon: Wrench,
  },
  {
    title: "Dental practice",
    summary: "Local SEO + reviews ops",
    points: ["+35% booked appointments", "+50 positions across core terms"],
    Icon: BarChart3,
  },
  {
    title: "Multi‑location contractor",
    summary: "Creative refresh + landing pages",
    points: ["1.8x higher CTR", "+32% conversion rate"],
    Icon: Target,
  },
];

const CaseSnapshotsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-hvcg-blue-dark mb-6 tracking-heading uppercase">Example outcomes from our playbooks</h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Aggregated, anonymized snapshots from past work. Every business is different—your results may vary.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, summary, points, Icon }, idx) => (
            <article 
              key={title} 
              className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-${(idx % 3) + 1}`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-hvcg-blue/10 rounded-lg p-3 group-hover:bg-hvcg-blue/20 transition-colors">
                  <Icon className="h-6 w-6 text-hvcg-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-hvcg-blue-dark tracking-subheading">{title}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{summary}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 leading-relaxed">
                {points.map((p) => (
                  <li key={p} className="font-medium">{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className={`text-sm text-gray-500 mt-10 text-center fade-in-up ${isVisible ? 'visible' : ''}`}>
          Illustrative examples based on prior campaigns; not endorsements of specific clients.
        </p>
      </div>
    </section>
  );
};

export default CaseSnapshotsSection;
