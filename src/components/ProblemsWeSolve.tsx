
import React from "react";
import { Target, Search, Brain, Repeat, MousePointerClick, TrendingUp } from "lucide-react";

const items = [
  {
    Icon: Target,
    title: "Not enough qualified leads",
    desc: "Fix targeting and offers so the right people find you and take action.",
  },
  {
    Icon: Search,
    title: "Website isn't converting",
    desc: "Clarify messaging and smooth the path to booking—mobile‑first.",
  },
  {
    Icon: Brain,
    title: "Unsure how to use AI",
    desc: "Simple ways to save time, improve quality, and personalize follow‑ups.",
  },
  {
    Icon: MousePointerClick,
    title: "Ads aren't profitable",
    desc: "Tight creative + offer testing with clean tracking and clear ROI.",
  },
  {
    Icon: Repeat,
    title: "Low repeat business",
    desc: "Turn one‑time buyers into loyal customers with lifecycle touchpoints.",
  },
  {
    Icon: TrendingUp,
    title: "No clear growth plan",
    desc: "A focused 90‑day roadmap you can execute—without the jargon.",
  },
];

const ProblemsWeSolve: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Problems we solve</h2>
          <p className="text-lg text-gray-700">If any of these sound familiar, we can help—fast.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ Icon, title, desc }) => (
            <article key={title} className="p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover-scale animate-fade-in">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-md bg-hvcg-blue/10 text-hvcg-blue"><Icon className="h-6 w-6" /></div>
                <div>
                  <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-1">{title}</h3>
                  <p className="text-gray-700">{desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
