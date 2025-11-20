
import React from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
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
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="section bg-gradient-to-b from-background to-muted relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Problems we solve</h2>
          <p className="text-xl text-muted-foreground normal-case font-normal tracking-normal">If any of these sound familiar, we can help—fast.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map(({ Icon, title, desc }, idx) => (
            <article 
              key={title} 
              className={`glass-card p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary/20 transition-colors duration-300"><Icon className="h-7 w-7" /></div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">{desc}</p>
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
