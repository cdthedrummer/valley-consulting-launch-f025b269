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
    <section ref={ref} className="section bg-gradient-to-b from-muted to-background relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Example outcomes from our playbooks</h2>
          <p className="text-xl text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">
            Aggregated, anonymized snapshots from past work. Every business is different—your results may vary.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, summary, points, Icon }, idx) => (
            <article 
              key={title} 
              className={`glass-card p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">{summary}</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground normal-case font-normal tracking-normal">
                {points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="font-semibold">{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className={`text-sm text-muted-foreground mt-10 text-center transition-all duration-700 delay-300 normal-case font-normal tracking-normal ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Illustrative examples based on prior campaigns; not endorsements of specific clients.
        </p>
      </div>
    </section>
  );
};

export default CaseSnapshotsSection;
