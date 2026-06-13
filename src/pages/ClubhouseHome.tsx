import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, Ruler, BarChart3, Workflow, Bot, LayoutDashboard, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClubhouseHero from '@/components/ClubhouseHero';

const ClubhouseHome: React.FC = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Hudson Valley Consulting Group",
    "description": "HVCG helps mid-market and enterprise organizations turn AI into operating reality — building prioritization frameworks, custom tools, agents, and transformation roadmaps.",
    "url": "https://hudsonvalleycg.com",
    "email": "contact@hvcg.us"
  };

  const differentiators = [
    {
      icon: <Hammer className="w-8 h-8" />,
      title: "Builds, Doesn't Just Advise",
      description: "We ship working tools, dashboards, and agents into production — not slide decks."
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Methodology-First",
      description: "Proprietary scoring and prioritization frameworks bring rigor to every AI investment decision."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Rooted in Marketing Operations",
      description: "Deep fluency in campaigns, measurement, media data, and agency operating models — not generic IT consulting."
    }
  ];

  const stats = [
    { value: "Days → 20 min", label: "Reporting cycle, via agentic systems" },
    { value: "25–35%", label: "Efficiency potential vs. a 15% ask" },
    { value: "~60%", label: "Of effort recoverable from low-value work" },
    { value: "880+", label: "Tasks mapped in a single enterprise audit" },
    { value: "700+", label: "Use cases scored and prioritized" },
    { value: "3,700 / 193K", label: "Users and prompts at adoption scale" }
  ];

  const capabilities = [
    {
      icon: <Workflow className="w-8 h-8" />,
      title: "AI & Operating-Model Transformation",
      description: "Reshape how the work gets done — a staged roadmap from foundational quick wins to intelligent automation to agent orchestration."
    },
    {
      icon: <Ruler className="w-8 h-8" />,
      title: "Use-Case Prioritization & Intake",
      description: "Stop guessing which AI ideas are worth building. Intake-and-scoring systems that grade by impact, complexity, and fit."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Workflow Automation & Capacity",
      description: "See exactly where the hours go — then win them back. Interactive tools that calculate time savings and reallocation."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "Custom Tooling & Agentic Systems",
      description: "Prototype to production-grade in weeks. Multi-agent systems that collapse days of work into minutes."
    },
    {
      icon: <LayoutDashboard className="w-8 h-8" />,
      title: "Dashboards, Measurement & Governance",
      description: "One source of truth, queryable in plain English — with measurement and data governance built for regulated sectors."
    }
  ];

  return (
    <>
      <Helmet>
        <title>HVCG | AI Transformation, Built — Not Bolted On</title>
        <meta
          name="description"
          content="HVCG helps mid-market and enterprise organizations turn AI into operating reality — building prioritization frameworks, custom tools, agents, and transformation roadmaps that move work, cost, and capacity."
        />
        <meta
          name="keywords"
          content="AI transformation, operating model, AI prioritization, workflow automation, agentic AI, executive dashboards, measurement"
        />
        <link rel="canonical" href="https://hudsonvalleycg.com/" />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseHero />

        {/* Credibility Strip — Sectors */}
        <section className="py-6 bg-club-green border-t border-warm-cream/10">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-warm-cream/50 font-dm text-sm uppercase tracking-widest">
              <span>Pharma</span>
              <span className="hidden sm:inline">•</span>
              <span>Telecom</span>
              <span className="hidden sm:inline">•</span>
              <span>CPG</span>
              <span className="hidden sm:inline">•</span>
              <span>Entertainment</span>
              <span className="hidden sm:inline">•</span>
              <span>Retail</span>
              <span className="hidden sm:inline">•</span>
              <span>Financial Services</span>
            </div>
          </div>
        </section>

        {/* Differentiators */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                WHY HVCG
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                A builder-strategist, not a slide-deck consultancy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                    {item.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {item.title}
                  </h3>
                  <p className="font-dm text-club-green/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Outcome Stat Tiles */}
        <section className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                THE OUTCOMES
              </h2>
              <p className="font-dm text-lg text-warm-cream/70 max-w-2xl mx-auto">
                What the work actually produces — measurable, repeatable, anonymized.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-warm-cream/5 border border-warm-cream/10 rounded-3xl p-8 text-center hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="font-archivo text-3xl md:text-4xl text-action-yellow mb-3">
                    {stat.value}
                  </div>
                  <p className="font-dm text-warm-cream/70 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Do — Capability Cards */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                WHAT WE DO
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                Five capabilities that turn AI pressure into operating capacity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {capabilities.map((service, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                    {service.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {service.title}
                  </h3>
                  <p className="font-dm text-club-green/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                className="bg-club-green hover:bg-club-green/90 text-warm-cream rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/services">
                  EXPLORE WHAT WE DO <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* How We Work Teaser — Three-Stage Roadmap */}
        <section className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                HOW WE WORK
              </h2>
              <p className="font-dm text-lg text-warm-cream/70 max-w-2xl mx-auto">
                A staged framework — foundational infrastructure before advanced agentic workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
              {[
                { stage: "STAGE 1", title: "Foundational Quick Wins", desc: "Table-stakes automation, basic-task integration, repetitive work at scale." },
                { stage: "STAGE 2", title: "Intelligent Automation", desc: "Custom dashboards, enhanced collaboration, and capacity reclaimed from low-value work." },
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

            <div className="text-center">
              <Button
                asChild
                variant="outline"
                className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all"
              >
                <Link to="/approach">
                  SEE THE METHODOLOGY <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Proof by Sector */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                PROOF BY SECTOR
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                Prioritization, automation, dashboard, and measurement systems delivered across enterprise sectors.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
              {[
                "Global Pharma & Healthcare",
                "Telecommunications",
                "Beauty & CPG",
                "Streaming & Entertainment",
                "QSR & Food Delivery",
                "Sportswear & Retail",
                "Ridesharing & Mobility",
                "Spirits & Beverage",
                "Financial Services"
              ].map((sector, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm flex items-center justify-center"
                >
                  <span className="font-archivo text-sm uppercase tracking-wide text-club-green">
                    {sector}
                  </span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                className="bg-club-green hover:bg-club-green/90 text-warm-cream rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/work">
                  SEE THE OUTCOMES <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Also: Websites & Digital Builds */}
        <section className="py-12 md:py-16 bg-club-green border-t border-warm-cream/10">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto bg-warm-cream/5 border border-warm-cream/10 rounded-3xl p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-[64px,1fr,auto] gap-6 items-center">
                <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center text-action-yellow">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream mb-2">
                    Also: Websites & Digital Builds
                  </h3>
                  <p className="font-dm text-warm-cream/70 text-sm leading-relaxed">
                    The same builder discipline, scaled down. We also design and ship professional websites and digital presence for local businesses.
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green rounded-pill px-6 py-5 font-dm font-bold uppercase tracking-wide text-sm transition-all whitespace-nowrap"
                >
                  <Link to="/services">
                    LEARN MORE
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-varsity-maroon">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              START AN INTAKE
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto mb-8">
              Tell us where the pressure is. We'll map the work, score the opportunities, and show you what's worth building.
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
    </>
  );
};

export default ClubhouseHome;
