import React from "react";
import { BarChart3, Target, PhoneCall, Wrench } from "lucide-react";

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
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-3">Example outcomes from our playbooks</h2>
          <p className="text-gray-700">
            Aggregated, anonymized snapshots from past work. Every business is different—your results may vary.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, summary, points, Icon }) => (
            <article key={title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-hvcg-blue/10 rounded-md p-2">
                  <Icon className="h-5 w-5 text-hvcg-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-hvcg-blue-dark">{title}</h3>
                  <p className="text-sm text-gray-700 mt-0.5">{summary}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Illustrative examples based on prior campaigns; not endorsements of specific clients.
        </p>
      </div>
    </section>
  );
};

export default CaseSnapshotsSection;
