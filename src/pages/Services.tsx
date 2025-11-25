import React from "react";
import { Building, Search, Users, Code, Share2, Bot, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import ServiceContent from "@/components/ServiceContent";
import ServicesCTA from "@/components/ServicesCTA";
import ServicePlansSection from "@/components/ServicePlansSection";
import WhyChooseSection from "@/components/WhyChooseSection";

const Services: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Services | Hudson Valley Consulting"
        description="Marketing, SEO, ads, websites, and consulting for contractors in the Hudson Valley."
        canonicalUrl="/services"
      />
      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">HOW WE HELP</h1>
          <p className="text-xl text-warm-cream/80 max-w-3xl mx-auto">
            Simple, effective services that help contractors get more local customers.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="bg-warm-cream py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16">
            {/* AI Solutions Section */}
            <ServiceContent
              id="ai-solutions"
              icon={<Bot className="text-action-yellow w-16 h-16" />}
              title="AI Solutions"
              description="AI that turns searches into customers: chatbots that qualify leads, automate follow‑ups, and surface insights to lower cost per lead."
              features={[
                "7‑day free trial (code: tryai)",
                "AI chatbots for lead capture and routing",
                "Automated follow-ups and outreach",
                "Analytics and performance insights"
              ]}
              ctaTo="/resources/ai-copilot"
              ctaLabel="Start Free Trial"
            />

            {/* Digital Advertising Section */}
            <ServiceContent
              id="digital-advertising"
              icon={<Zap className="text-action-yellow w-16 h-16" />}
              title="Digital Advertising"
              description="Targeted advertising campaigns across Google, Facebook, and Instagram that bring qualified leads directly to your business. We specialize in local service ads and search campaigns that reach homeowners when they're actively looking for your services."
              features={[
                "Google Ads and Local Service Ads",
                "Facebook and Instagram advertising",
                "Geotargeted campaigns",
                "Performance tracking and optimization"
              ]}
              ctaTo="/services/advertising"
              ctaLabel="Learn More"
            />

            {/* GEO Section */}
            <ServiceContent
              id="geo"
              icon={<Bot className="text-action-yellow w-16 h-16" />}
              title="GEO (AI Search Optimization)"
              description="Optimize your website for AI-powered search engines like ChatGPT, Claude, and Gemini. Get recommended when potential customers ask AI tools for contractor recommendations in your area."
              features={[
                "Structured data and schema implementation",
                "Natural language content optimization",
                "FAQ and Q&A section development",
                "Authority building for AI citations"
              ]}
              ctaTo="/services/geo"
              ctaLabel="Learn More"
            />

            {/* SEO Section */}
            <ServiceContent
              id="seo"
              icon={<Search className="text-action-yellow w-16 h-16" />}
              title="Search Engine Optimization"
              description="Local SEO strategies that help your contracting business appear in search results when homeowners in your area are looking for your services, generating organic leads month after month."
              features={[
                "Local SEO optimization",
                "Google Business Profile optimization",
                "On-page SEO implementation",
                "Content strategy for contractors"
              ]}
            />

            {/* Social Media Marketing Section */}
            <ServiceContent
              id="social-media"
              icon={<Share2 className="text-action-yellow w-16 h-16" />}
              title="Social Media Marketing"
              description="Strategic social media campaigns that showcase your work, build trust with potential customers, and create a strong online presence for your contracting business."
              features={[
                "Platform selection and strategy",
                "Content calendar development",
                "Social ad campaign management",
                "Review management strategies"
              ]}
            />

            {/* Website Development Section */}
            <ServiceContent
              id="website"
              icon={<Code className="text-action-yellow w-16 h-16" />}
              title="Website Development"
              description="High-converting websites designed specifically for contractors that showcase your work, generate leads, and build trust with potential customers."
              features={[
                "Contractor-focused web design",
                "Mobile-responsive implementation",
                "Lead generation optimization",
                "Portfolio and testimonial showcase"
              ]}
            />

            {/* Business Consulting Section */}
            <ServiceContent
              id="consulting"
              icon={<Users className="text-action-yellow w-16 h-16" />}
              title="Business Consulting"
              description="Strategic business consulting that helps contracting businesses improve operations, increase profitability, and scale effectively in the competitive Hudson Valley market."
              features={[
                "Business process optimization",
                "Growth strategy development",
                "Customer experience enhancement",
                "Pricing strategy optimization"
              ]}
            />
          </div>
        </div>
      </div>

      {/* Services Packages Section */}
      <ServicePlansSection />
      
      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
};

export default Services;
