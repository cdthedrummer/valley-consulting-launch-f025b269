import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Search, Hammer } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Approach: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="How We Work | HVCG Methodology"
        description="HVCG's transformation methodology: a three-stage roadmap, a defensible use-case prioritization formula, and the mine/make/manage workflow model that turns AI pressure into operating capacity."
        canonicalUrl="/approach"
      />

      {/* Hero Section */}
      <header className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">HOW WE WORK</h1>
          <p className="text-warm-cream/80 text-xl max-w-2xl mx-auto">
            A builder-strategist's methodology — foundational infrastructure before advanced agentic workflows.
          </p>
        </div>
      </header>

      <main>
        {/* The Narrative — three beats */}
        <section className="bg-warm-cream py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4">
                THE STORY IN THREE BEATS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: <AlertTriangle className="w-8 h-8" />,
                  title: "The Pressure",
                  desc: "Organizations are being compressed from the outside and need to reshape from the inside. This is fundamental business transformation — not just an AI project. Late movers inherit structural disadvantages."
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  title: "The Hidden Problem",
                  desc: "Most organizations don't know where their effort goes. One enterprise audit mapped 880+ tasks — the majority in 'manage' work: QA, compliance, remediation, and data stitching across disconnected systems."
                },
                {
                  icon: <Hammer className="w-8 h-8" />,
                  title: "The Answer",
                  desc: "HVCG builds the prioritization, automation, and measurement systems that turn that pressure into measurable capacity and outcomes — not slideware."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                    {item.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm text-club-green/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three-Stage Framework */}
        <section className="bg-club-green py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-4">
                THE THREE-STAGE ROADMAP
              </h2>
              <p className="font-dm text-lg text-warm-cream/70 max-w-2xl mx-auto">
                Foundational and stage-two solutions alone drive roughly 30% potential gain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { stage: "STAGE 1", title: "Foundational Quick Wins", desc: "Table-stakes automation, basic-task integration, and repetitive work delivered at scale." },
                { stage: "STAGE 2", title: "Intelligent Automation", desc: "Custom dashboard development and enhanced client collaboration that reclaim capacity." },
                { stage: "STAGE 3", title: "Agent Orchestration", desc: "Centrally governed multi-agent systems that collapse days of work into minutes." }
              ].map((item, index) => (
                <div key={index} className="bg-warm-cream/5 border border-warm-cream/10 rounded-3xl p-8">
                  <div className="font-archivo text-sm uppercase tracking-widest text-action-yellow/70 mb-3">
                    {item.stage}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm text-warm-cream/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Prioritization Methodology */}
        <section className="bg-warm-cream py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4">
                THE PRIORITIZATION METHODOLOGY
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                A defensible, repeatable way to decide what's actually worth building.
              </p>
            </div>

            {/* Scoring formula */}
            <div className="bg-club-green rounded-3xl p-8 md:p-12 max-w-4xl mx-auto mb-10 text-center">
              <div className="font-dm text-action-yellow text-sm uppercase tracking-widest mb-6">
                Priority Score
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 font-archivo uppercase text-warm-cream">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl">Reach × Multiplier</div>
                  <div className="border-t-2 border-action-yellow mt-3 pt-3 text-2xl md:text-3xl text-action-yellow">
                    Complexity
                  </div>
                </div>
              </div>
              <p className="font-dm text-warm-cream/70 text-sm mt-6 max-w-xl mx-auto">
                The strategic multiplier is adjustable for business priorities like at-risk or high-value accounts.
              </p>
            </div>

            {/* Mine / Make / Manage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { title: "Mine", desc: "Gathering, querying, and surfacing the data work depends on." },
                { title: "Make", desc: "Producing the deliverables — analysis, creative, and reporting." },
                { title: "Manage", desc: "QA, compliance, and remediation — where ~60% of effort hides." }
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg text-center">
                  <h3 className="font-archivo text-2xl uppercase tracking-wide text-action-yellow mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm text-club-green/70 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
            <p className="font-dm text-club-green/60 text-sm text-center mt-8 max-w-2xl mx-auto">
              We cross-reference this model with survey data on time spent per task across 30+ clients — so prioritization reflects reality, not guesswork.
            </p>
          </div>
        </section>

        {/* Builder-strategist philosophy */}
        <section className="bg-club-green py-16 md:py-24">
          <div className="container-custom max-w-3xl text-center">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-6">
              BUILDER-STRATEGIST, NOT SLIDE-DECK
            </h2>
            <p className="font-dm text-warm-cream/80 text-lg leading-relaxed">
              HVCG doesn't just advise on AI — we build the systems that make adoption measurable and repeatable. We bring methodology-first rigor and deep marketing-operations fluency, and we ship working tools, dashboards, and agents into production. That's the difference between a strategy and a result.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-varsity-maroon py-16 md:py-24">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              START AN INTAKE
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 max-w-xl mx-auto mb-8">
              We'll map where the work goes, score what's worth building, and show you the path.
            </p>
            <Button
              asChild
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                START AN INTAKE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Approach;
