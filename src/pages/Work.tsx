import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface OutcomeTile {
  value: string;
  label: string;
}

interface WebBuild {
  name: string;
  industry: string;
  description: string;
  url?: string;
}

const Work: React.FC = () => {
  const sectors = [
    "Global Pharma & Healthcare",
    "Telecommunications",
    "Beauty & CPG",
    "Streaming & Entertainment",
    "QSR & Food Delivery",
    "Sportswear & Retail",
    "Ridesharing & Mobility",
    "Spirits & Beverage",
    "Financial Services"
  ];

  const outcomes: OutcomeTile[] = [
    { value: "Days → 20 min", label: "Reporting cycle compressed by a seven-agent system" },
    { value: "25–35%", label: "Efficiency potential identified vs. a 15% ask" },
    { value: "~60%", label: "Of team effort recoverable from low-value 'manage' work" },
    { value: "880+", label: "Tasks mapped in a single enterprise audit" },
    { value: "700+", label: "Use cases scored and prioritized" },
    { value: "3,700 / 193K", label: "Users and prompts reached at adoption scale" }
  ];

  const webBuilds: WebBuild[] = [
    {
      name: "McNulty's Junk Removal",
      industry: "Junk Removal",
      description: "Complete website build with online booking, service-area maps, and before/after gallery.",
      url: "https://mcnultyjunk.com"
    },
    {
      name: "Reroll IRL",
      industry: "Interactive Experience",
      description: "Brand platform and website build for an immersive real-life RPG experience.",
      url: "https://rerollirl.com"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Outcomes | HVCG Enterprise AI Transformation</title>
        <meta
          name="description"
          content="Anonymized outcomes from HVCG's AI prioritization, automation, dashboard, and measurement work across pharma, telecom, CPG, entertainment, retail, and financial services."
        />
        <link rel="canonical" href="https://hudsonvalleycg.com/work" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">
            OUTCOMES
          </h1>
          <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto">
            Prioritization, automation, dashboard, and measurement systems delivered across enterprise sectors. Anonymized — sectors only, never client names.
          </p>
        </div>
      </section>

      {/* Outcome Tiles */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4">
              WHAT THE WORK PRODUCES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {outcomes.map((tile, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 text-center shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="font-archivo text-3xl md:text-4xl text-action-yellow mb-3">
                  {tile.value}
                </div>
                <p className="font-dm text-club-green/70 text-sm">
                  {tile.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-club-green py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-4">
              SECTOR EXPERIENCE
            </h2>
            <p className="font-dm text-lg text-warm-cream/70 max-w-2xl mx-auto">
              HVCG has delivered transformation, automation, and measurement work across enterprise sectors.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className="bg-warm-cream/5 border border-warm-cream/10 rounded-2xl p-6 text-center flex items-center justify-center"
              >
                <span className="font-archivo text-sm uppercase tracking-wide text-warm-cream">
                  {sector}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Web Builds */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4">
              SELECTED WEB BUILDS
            </h2>
            <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
              The same builder discipline, scaled down — websites and digital presence for local businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {webBuilds.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-action-yellow/20 text-club-green px-3 py-1 rounded-pill text-xs font-dm font-bold uppercase tracking-wide">
                    {item.industry}
                  </span>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-club-green/60 hover:text-action-yellow transition-colors"
                      aria-label={`Visit ${item.name} website`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">
                  {item.name}
                </h3>
                <p className="font-dm text-club-green/70">
                  {item.description}
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
          <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto mb-8">
            Tell us where the pressure is. We'll map the work and show you what's worth building.
          </p>
          <Button
            asChild
            className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Link to="/booking">
              START AN INTAKE
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Work;
