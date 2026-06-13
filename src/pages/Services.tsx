import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Workflow, Ruler, BarChart3, Bot, LayoutDashboard, Globe } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Services: React.FC = () => {
  const pillars = [
    {
      icon: <Workflow className="w-10 h-10" />,
      title: "AI & Operating-Model Transformation",
      angle: "Reshape how the work gets done — not just bolt AI on top.",
      points: [
        "Three-stage roadmap: foundational quick wins → intelligent automation → agent orchestration",
        "Three value paths: efficiencies, outcomes, and output",
        "Asking for 15% efficiencies while expecting 25–35% achievable",
        "Implementation in 90–180 day windows depending on scope"
      ]
    },
    {
      icon: <Ruler className="w-10 h-10" />,
      title: "Use-Case Prioritization & Intake",
      angle: "Stop guessing which AI ideas are worth building.",
      points: [
        "Priority score = (Reach × Strategic Multiplier) ÷ Complexity",
        "Five-component complexity framework with AI-assisted tagging",
        "Mapped to a 'mine, make, manage' workflow model",
        "700+ use cases scored against workflow phases and disciplines"
      ]
    },
    {
      icon: <BarChart3 className="w-10 h-10" />,
      title: "Workflow Automation & Capacity Optimization",
      angle: "See exactly where the hours go — then win them back.",
      points: [
        "Interactive current-vs-optimized workflow dashboards",
        "A common finding: ~60% of time spent on 'manage' work",
        "Time-savings calculations by team and function",
        "Integrated staffing and capacity modeling"
      ]
    },
    {
      icon: <Bot className="w-10 h-10" />,
      title: "Custom AI Tooling, Prototyping & Agentic Systems",
      angle: "From prototype to production-grade in weeks.",
      points: [
        "Prototype-to-production pipelines: Git, CI/CD on Azure & Google Cloud, Okta SSO",
        "React / Node / PostgreSQL stack, LLM text-to-SQL for data at scale",
        "Seven-agent reporting systems that cut cycles from days to ~20 minutes",
        "Governed, central agent models that manage hallucination risk"
      ]
    },
    {
      icon: <LayoutDashboard className="w-10 h-10" />,
      title: "Dashboards, Measurement & Data Governance",
      angle: "One source of truth, queryable in plain English.",
      points: [
        "Executive dashboards with client health scoring and risk monitoring",
        "Five-factor weighted health score and natural-language querying",
        "Causal lift and synthetic control measurement methodologies",
        "Clean-room, identity-resolution, and licensing fluency for regulated sectors"
      ]
    }
  ];

  return (
    <div>
      <SEOHead
        title="What We Do | HVCG AI Transformation"
        description="HVCG builds AI transformation roadmaps, use-case prioritization, workflow automation, custom tooling, agentic systems, and executive dashboards for enterprise organizations."
        canonicalUrl="/services"
      />

      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">
            WHAT WE DO
          </h1>
          <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto">
            Nine capabilities, organized into five ways we turn AI pressure into operating capacity.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {pillars.map((pillar, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                  {pillar.icon}
                </div>
                <h2 className="font-archivo text-2xl uppercase tracking-wide text-club-green mb-3">
                  {pillar.title}
                </h2>
                <p className="font-dm text-action-yellow font-bold mb-6">
                  {pillar.angle}
                </p>
                <ul className="space-y-3">
                  {pillar.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 font-dm text-club-green/80">
                      <ArrowRight className="h-5 w-5 flex-shrink-0 mt-0.5 text-action-yellow" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Websites & Digital Builds — secondary offering */}
          <div className="bg-club-green rounded-3xl p-8 md:p-10 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[64px,1fr] gap-6 items-start">
              <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center text-action-yellow">
                <Globe className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream mb-2">
                  Websites & Digital Builds
                </h3>
                <p className="font-dm text-warm-cream/80 leading-relaxed">
                  The same builder discipline, scaled down. We also design and ship professional, fast, mobile-ready websites and digital presence for local businesses that need to get found online. Start an intake and we'll scope it together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work strip */}
      <section className="bg-club-green py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-4">
              HOW WE WORK
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Intake", desc: "We map where the effort and pressure actually go" },
              { step: "02", title: "Prioritize", desc: "We score the opportunities worth building" },
              { step: "03", title: "Build", desc: "We ship tools, dashboards, and agents into production" },
              { step: "04", title: "Measure", desc: "We prove the impact on work, cost, and capacity" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-archivo text-5xl text-action-yellow/30 mb-2">
                  {item.step}
                </div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream mb-2">
                  {item.title}
                </h3>
                <p className="font-dm text-warm-cream/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom max-w-3xl">
          <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-12 text-center">
            COMMON QUESTIONS
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "How do engagements start?",
                a: "With an intake. We map where the work and effort go, score the highest-impact opportunities, and scope a build — before anyone commits to a long roadmap."
              },
              {
                q: "Do you only advise, or do you build?",
                a: "We build. Working tools, dashboards, and agents shipped into production — with the strategy and prioritization that make them worth shipping."
              },
              {
                q: "How long does implementation take?",
                a: "It depends on scope. Smaller teams often see foundational changes in roughly 90 days; larger transformations with multiple role changes run closer to 180 days."
              },
              {
                q: "How do you handle data security and governance?",
                a: "Governance is built in. We work within clean-room constraints, identity-resolution limits, and licensing realities — and we manage hallucination risk with centrally governed agent models."
              },
              {
                q: "Do you work in messy, real-world data?",
                a: "Yes. We routinely harmonize across unreliable source systems and flat files — delivering despite data-quality issues, not in spite of them."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-archivo text-lg uppercase tracking-wide text-club-green mb-2">
                  {faq.q}
                </h3>
                <p className="font-dm text-club-green/70">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-varsity-maroon py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
            START AN INTAKE
          </h2>
          <p className="font-dm text-lg text-warm-cream/80 max-w-xl mx-auto mb-8">
            Tell us where the pressure is. We'll show you what's worth building.
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
    </div>
  );
};

export default Services;
