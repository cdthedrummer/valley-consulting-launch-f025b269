import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const MarketingChecklist: React.FC = () => {
  return (
    <div className="bg-club-green min-h-screen">
      <SEOHead
        title="SEO + GEO Checklist for Contractors | Hudson Valley Consulting"
        description="Complete checklist for optimizing your contractor website for traditional and AI-powered search engines."
        canonicalUrl="/resources/marketing-checklist"
      />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/resources" 
              className="inline-flex items-center font-dm text-action-yellow hover:text-action-yellow/80 mb-6 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
            </Link>
            <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
              SEO + GEO CHECKLIST
            </h1>
            <p className="font-dm text-xl md:text-2xl text-warm-cream/90 mb-8">
              Your complete guide to ranking on Google and being recommended by AI search engines like ChatGPT, Claude, and Gemini.
            </p>
            <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Traditional SEO Checklist */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom max-w-5xl">
          <div className="mb-16">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4 text-center">
              Traditional SEO Checklist
            </h2>
            <p className="font-dm text-lg text-club-green/80 text-center mb-12">
              Get found on Google when homeowners search for your services
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Google Business Profile",
                  items: [
                    "Claim and verify your profile",
                    "Add complete business information",
                    "Upload high-quality photos",
                    "Post regular updates",
                    "Respond to all reviews"
                  ]
                },
                {
                  title: "On-Page SEO",
                  items: [
                    "Title tags with target keywords",
                    "Meta descriptions under 160 characters",
                    "H1 tags on every page",
                    "Alt text on all images",
                    "Internal linking structure"
                  ]
                },
                {
                  title: "Local Keywords",
                  items: [
                    "Target \"[service] + [city]\" keywords",
                    "Create location-specific pages",
                    "Include service area in content",
                    "Use local landmarks in copy",
                    "Optimize for \"near me\" searches"
                  ]
                },
                {
                  title: "Technical SEO",
                  items: [
                    "Mobile-responsive design",
                    "Fast page load speed (under 3 seconds)",
                    "SSL certificate (HTTPS)",
                    "XML sitemap submitted",
                    "Fix all broken links"
                  ]
                },
                {
                  title: "Content Strategy",
                  items: [
                    "Blog posts answering common questions",
                    "Project galleries with descriptions",
                    "Customer testimonials",
                    "Service area pages",
                    "FAQ sections"
                  ]
                },
                {
                  title: "Citations & Backlinks",
                  items: [
                    "Consistent NAP (Name, Address, Phone)",
                    "Listed on Yelp, Angi, HomeAdvisor",
                    "Local chamber of commerce listing",
                    "Industry association memberships",
                    "Local news mentions or features"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-action-yellow">
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-action-yellow mt-0.5 flex-shrink-0" />
                        <span className="font-dm text-club-green/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GEO (AI Search) Checklist */}
          <div className="mb-16">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-4 text-center">
              GEO (AI Search) Checklist
            </h2>
            <p className="font-dm text-lg text-club-green/80 text-center mb-12">
              Get recommended by ChatGPT, Claude, Gemini, and other AI search tools
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Structured Data",
                  items: [
                    "LocalBusiness schema markup",
                    "Service schema for each offering",
                    "Review schema (aggregate ratings)",
                    "FAQ schema on relevant pages",
                    "Breadcrumb schema"
                  ]
                },
                {
                  title: "Natural Language Content",
                  items: [
                    "Answer questions conversationally",
                    "Write in first person when appropriate",
                    "Use complete sentences",
                    "Avoid keyword stuffing",
                    "Focus on user intent"
                  ]
                },
                {
                  title: "Entity Optimization",
                  items: [
                    "Clear business identity",
                    "Defined service offerings",
                    "Explicit location coverage",
                    "Years in business mentioned",
                    "Certifications and licenses listed"
                  ]
                },
                {
                  title: "Comprehensive FAQs",
                  items: [
                    "Common customer questions",
                    "Pricing guidance",
                    "Timeline expectations",
                    "Service area questions",
                    "Process explanations"
                  ]
                },
                {
                  title: "Authority Signals",
                  items: [
                    "Customer reviews (200+)",
                    "Industry certifications",
                    "Awards and recognition",
                    "Media mentions",
                    "Case studies with results"
                  ]
                },
                {
                  title: "Semantic HTML",
                  items: [
                    "Proper heading hierarchy (H1-H6)",
                    "Semantic elements (<article>, <section>)",
                    "Descriptive link text",
                    "Table captions and headers",
                    "Figure captions"
                  ]
                }
              ].map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-club-green">
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-club-green mt-0.5 flex-shrink-0" />
                        <span className="font-dm text-club-green/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Wins Section */}
          <div className="bg-action-yellow/10 rounded-lg p-8 md:p-12 mb-16">
            <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-6 text-center">
              Quick Wins (Start Here)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-action-yellow text-club-green font-archivo font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                  1
                </div>
                <h4 className="font-archivo text-lg uppercase text-club-green mb-2">Claim Your Google Profile</h4>
                <p className="font-dm text-club-green/80 text-sm">
                  Single biggest impact for local visibility. Takes 10 minutes.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-action-yellow text-club-green font-archivo font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                  2
                </div>
                <h4 className="font-archivo text-lg uppercase text-club-green mb-2">Add FAQ Section</h4>
                <p className="font-dm text-club-green/80 text-sm">
                  Helps both Google and AI engines understand your services.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <div className="bg-action-yellow text-club-green font-archivo font-bold text-2xl w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4">
                  3
                </div>
                <h4 className="font-archivo text-lg uppercase text-club-green mb-2">Get 10 Reviews</h4>
                <p className="font-dm text-club-green/80 text-sm">
                  Critical trust signal for both traditional and AI search.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="bg-club-green rounded-lg p-8 md:p-12 text-center">
            <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-action-yellow mb-4">
              Need Help Implementing?
            </h3>
            <p className="font-dm text-xl text-warm-cream/90 mb-6 max-w-2xl mx-auto">
              We handle all SEO and GEO optimization so you can focus on running your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold">
                <Link to="/booking">
                  <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green font-bold">
                <Link to="/services">
                  View Our Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketingChecklist;
