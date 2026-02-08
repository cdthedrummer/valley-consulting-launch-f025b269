import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Monitor, Search, Zap, Clock, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Services: React.FC = () => {
  const packages = [
    {
      name: "Website Package",
      price: "$1,399",
      icon: <Monitor className="w-10 h-10" />,
      description: "A complete, professional website for your contracting business.",
      features: [
        "Custom homepage with your brand",
        "Services page with descriptions",
        "About page with your story",
        "Contact page with forms",
        "Photo gallery for your work",
        "Mobile-friendly design",
        "Fast loading speeds",
        "Basic SEO setup"
      ],
      highlight: true
    },
    {
      name: "Google Visibility",
      price: "$449",
      icon: <Search className="w-10 h-10" />,
      description: "Get found when customers search for your services.",
      features: [
        "Google Business Profile setup",
        "Google Search Console",
        "Local SEO optimization",
        "Google Maps integration",
        "Review request strategy",
        "Keyword targeting"
      ],
      highlight: false
    },
    {
      name: "AI Updates Portal",
      price: "$200",
      priceNote: "+ $25/month",
      icon: <Zap className="w-10 h-10" />,
      description: "Update your website yourself using simple AI tools.",
      features: [
        "Self-service content editor",
        "AI-powered updates",
        "Video tutorial included",
        "30-day email support",
        "No coding required"
      ],
      highlight: false
    }
  ];

  return (
    <div>
      <SEOHead
        title="Services & Pricing | HVCG"
        description="Professional contractor websites starting at $1,399. Clear pricing, 4-week delivery. Google visibility add-on for $449."
        canonicalUrl="/services"
      />
      
      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">
            SIMPLE PRICING
          </h1>
          <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto mb-4">
            Everything you need to get your business online. No hidden fees.
          </p>
          <div className="flex items-center justify-center gap-4 text-action-yellow font-dm">
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              4-week delivery
            </span>
            <span className="text-warm-cream/40">|</span>
            <span className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Free consultation
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {packages.map((pkg, index) => (
              <div 
                key={index}
                className={`rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  pkg.highlight 
                    ? 'bg-club-green text-warm-cream shadow-2xl scale-105' 
                    : 'bg-white text-club-green shadow-lg'
                }`}
              >
                {pkg.highlight && (
                  <div className="bg-action-yellow text-club-green px-4 py-1 rounded-pill text-xs font-dm font-bold uppercase tracking-wide inline-block mb-4">
                    Most Popular
                  </div>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  pkg.highlight ? 'bg-action-yellow/20 text-action-yellow' : 'bg-action-yellow/20 text-action-yellow'
                }`}>
                  {pkg.icon}
                </div>
                <h2 className="font-archivo text-2xl uppercase tracking-wide mb-2">
                  {pkg.name}
                </h2>
                <div className="mb-4">
                  <span className="font-archivo text-4xl">{pkg.price}</span>
                  {pkg.priceNote && (
                    <span className={`font-dm text-sm ml-2 ${pkg.highlight ? 'text-warm-cream/60' : 'text-club-green/60'}`}>
                      {pkg.priceNote}
                    </span>
                  )}
                </div>
                <p className={`font-dm mb-6 ${pkg.highlight ? 'text-warm-cream/80' : 'text-club-green/70'}`}>
                  {pkg.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 font-dm">
                      <Check className={`h-5 w-5 flex-shrink-0 mt-0.5 ${pkg.highlight ? 'text-action-yellow' : 'text-action-yellow'}`} />
                      <span className={pkg.highlight ? 'text-warm-cream/90' : 'text-club-green/80'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Total Package */}
          <div className="bg-varsity-maroon rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-action-yellow mb-4">
              COMPLETE PACKAGE
            </h3>
            <div className="font-archivo text-5xl md:text-6xl text-warm-cream mb-4">
              ~$2,000
            </div>
            <p className="font-dm text-warm-cream/80 mb-6">
              Website + Google Visibility + AI Portal = Everything you need to get found online.
            </p>
            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                BOOK A FREE CALL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-club-green py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-4">
              HOW IT WORKS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: "01", title: "Call", desc: "15-minute free consultation" },
              { step: "02", title: "Plan", desc: "We agree on scope and timeline" },
              { step: "03", title: "Build", desc: "You get updates weekly" },
              { step: "04", title: "Launch", desc: "Your site goes live in 4 weeks" }
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
                q: "How long does it take?",
                a: "4 weeks from kickoff to launch. You'll see progress every week."
              },
              {
                q: "What do I need to provide?",
                a: "Photos of your work, your logo (if you have one), and basic business info. We'll guide you through everything else."
              },
              {
                q: "Can I update the site myself?",
                a: "Yes! With the AI Portal add-on, you can make text and image updates yourself. For bigger changes, just reach out."
              },
              {
                q: "What if I need changes after launch?",
                a: "Small tweaks are included for 30 days. After that, updates are billed hourly or you can use the AI Portal."
              },
              {
                q: "Do you require a contract?",
                a: "Yes, a simple one-page agreement that outlines what you get and the timeline. No surprises."
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
            LET'S GET STARTED
          </h2>
          <p className="font-dm text-lg text-warm-cream/80 max-w-xl mx-auto mb-8">
            Book a free 15-minute call. No pressure, just an honest conversation about what you need.
          </p>
          <Button 
            asChild 
            className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <Link to="/booking">
              SCHEDULE YOUR CALL
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
