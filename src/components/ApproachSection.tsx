
import React from "react";
import { BarChart3, Cog, ShieldCheck, Workflow, Gauge } from "lucide-react";

const pillars = [
  {
    title: "Measurement-first",
    description: "Forecasts, lift tests, and clear ROI math before we scale spend.",
    Icon: BarChart3,
  },
  {
    title: "Systems over hacks",
    description: "Playbooks, QA, and automation that compound—no random acts of marketing.",
    Icon: Workflow,
  },
  {
    title: "AI where it helps",
    description: "Content, routing, and ops automation that saves time—not gimmicks.",
    Icon: Cog,
  },
  {
    title: "Privacy & trust",
    description: "Consent, clean data, and compliance practices baked in from day one.",
    Icon: ShieldCheck,
  },
  {
    title: "Speed to value",
    description: "90‑day roadmaps with weekly wins and no long-term contracts.",
    Icon: Gauge,
  },
];

const ApproachSection: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-blue-dark/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-3">
            Enterprise-grade approach, built for local growth
          </h2>
          <p className="text-gray-700">
            We bring big-company discipline to small business outcomes—simple plans, clean execution, and measurable results.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map(({ title, description, Icon }) => (
            <article key={title} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-hvcg-blue/10 rounded-md p-2">
                  <Icon className="h-5 w-5 text-hvcg-blue" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-semibold text-hvcg-blue-dark">{title}</h3>
                  <p className="text-sm text-gray-700 mt-1">{description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
