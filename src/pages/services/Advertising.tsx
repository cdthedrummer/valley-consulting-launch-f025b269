
import React from "react";
import { Zap, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

const Advertising: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Digital Advertising for Contractors | Hudson Valley Consulting"
        description="Targeted local ads across Google, Facebook, and Instagram to drive qualified leads for Hudson Valley contractors."
        canonicalUrl="/services/advertising"
      />
      <div className="bg-club-green min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-action-yellow/20 p-6 rounded-full">
                  <Zap className="text-action-yellow w-16 h-16" />
                </div>
              </div>
              <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
                DIGITAL ADVERTISING
              </h1>
              <p className="font-dm text-xl md:text-2xl text-warm-cream/90 mb-8">
                Targeted local ads that reach homeowners when they're actively searching for your services.
              </p>
              <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold">
                <Link to="/booking" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-16 bg-warm-cream">
          <div className="container-custom max-w-5xl">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-8 text-center">
              Our Advertising Approach
            </h2>
            <div className="font-dm text-lg text-club-green/80 space-y-4 mb-12">
              <p>
                We specialize in creating targeted advertising campaigns that connect contractors with potential customers in the Hudson Valley. Our ads are strategically placed across Google, Facebook, and Instagram to reach homeowners who are actively searching for the services you provide.
              </p>
              <p>
                Using advanced targeting techniques, we ensure your advertising budget is spent efficiently, maximizing your return on investment and generating high-quality leads that are more likely to convert.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                "Google Ads campaign creation and management",
                "Facebook and Instagram targeted advertising",
                "Local service ads optimization",
                "Geotargeted mobile advertising",
                "Remarketing campaigns to reach previous website visitors",
                "Detailed performance reporting and analytics"
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-6 rounded-lg shadow-sm">
                  <span className="text-action-yellow text-2xl">✓</span>
                  <span className="font-dm text-club-green">{service}</span>
                </div>
              ))}
            </div>

            {/* Why Choose Section */}
            <div className="bg-club-green rounded-lg p-8 md:p-12">
              <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-action-yellow mb-8 text-center">
                Why Choose Our Advertising Services?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Hudson Valley Focus",
                    description: "We understand the unique characteristics of the local market and create campaigns specifically tailored to reach homeowners in this region."
                  },
                  {
                    title: "Contractor Specialization",
                    description: "Our experience with contractor businesses means we know exactly how to position your services to stand out from competitors."
                  },
                  {
                    title: "Data-Driven Approach",
                    description: "We continuously monitor campaign performance and make adjustments to improve results and maximize your advertising ROI."
                  },
                  {
                    title: "Transparent Reporting",
                    description: "Regular reports show exactly how your advertising budget is being spent and what results it's generating for your business."
                  }
                ].map((feature, index) => (
                  <div key={index} className="bg-warm-cream p-6 rounded-lg">
                    <h4 className="font-archivo text-lg uppercase tracking-wide text-club-green mb-3">{feature.title}</h4>
                    <p className="font-dm text-club-green/80">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 pb-16">
          <FAQSection
            title="Advertising services: frequently asked questions"
            faqs={[
            {
              question: "Which platforms do you manage?",
              answer: "Google Search and Performance Max, Local Services Ads (LSAs), Facebook/Instagram, and occasionally YouTube and TikTok depending on fit."
            },
            {
              question: "How big of a budget do I need?",
              answer: "Most local campaigns start effectively around $1,000–$3,000/mo in ad spend. We scale based on results and your lead targets."
            },
            {
              question: "How do you target locally?",
              answer: "We use tight geo‑fencing, location intent, keyword match types, audiences, and negative lists to ensure ads run only where you serve."
            },
            {
              question: "Do you manage Google Local Services Ads?",
              answer: "Yes. We help with onboarding, category selection, bidding, and dispute processes to keep your cost per lead efficient."
            },
            {
              question: "What reporting will I receive?",
              answer: "Clear monthly reports with spend, CPL, calls, form fills, and recommended next steps—plus ongoing optimization notes."
            }
          ]}
          />
        </div>
      </div>
    </>
  );
};

export default Advertising;
