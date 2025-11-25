import React from "react";
import { Globe, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

const WebsiteDevelopment: React.FC = () => {
  return (
    <>
      <SEOHead
        title="Website Development for Contractors | Hudson Valley Consulting"
        description="Professional websites built for contractors. We handle everything—design, Google setup, and making sure you show up when customers search."
        canonicalUrl="/services/website-development"
      />
      <div className="bg-club-green min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-action-yellow/20 p-6 rounded-full">
                  <Globe className="text-action-yellow w-16 h-16" />
                </div>
              </div>
              <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
                WEBSITE DEVELOPMENT
              </h1>
              <p className="font-dm text-xl md:text-2xl text-warm-cream/90 mb-8">
                Professional websites built for contractors. We handle everything—design, Google setup, and making sure you show up when customers search.
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
              Our Website Development Approach
            </h2>
            <div className="font-dm text-lg text-club-green/80 space-y-4 mb-12">
              <p>
                We build modern, professional websites specifically designed for contractors in the Hudson Valley. Our websites aren't just pretty—they're built to convert visitors into customers and rank well in local search results.
              </p>
              <p>
                From initial design to launch and ongoing optimization, we handle every aspect of your online presence. You focus on the work you do best, and we'll make sure potential customers can find you online.
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                "Custom website design tailored to your brand",
                "Mobile-responsive layouts that work on all devices",
                "Google Business Profile setup and optimization",
                "Local SEO optimization for Hudson Valley searches",
                "Contact forms and lead capture integration",
                "Fast loading speeds and modern performance",
                "Gallery showcasing your best work",
                "Easy content updates and maintenance"
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
                Why Choose Our Website Development Services?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Built for Contractors",
                    description: "We understand contractor businesses and know exactly what features and content your site needs to convert visitors into customers."
                  },
                  {
                    title: "Local Search Optimized",
                    description: "Every site we build is optimized from day one to rank in local Google searches for your services in the Hudson Valley."
                  },
                  {
                    title: "No Technical Skills Needed",
                    description: "We handle all the technical aspects—hosting, security, updates, and maintenance. You won't need to touch a line of code."
                  },
                  {
                    title: "Fast Turnaround",
                    description: "Most contractor websites are live within 2-4 weeks, complete with all content, images, and optimization in place."
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
            title="Website development: frequently asked questions"
            faqs={[
              {
                question: "How long does it take to build a website?",
                answer: "Most contractor websites are completed in 2-4 weeks from start to launch. This includes design, content creation, optimization, and testing."
              },
              {
                question: "Do I need to provide content and photos?",
                answer: "We can work with what you have or help create new content. Most contractors provide project photos, and we handle writing, organizing, and optimizing all the content."
              },
              {
                question: "Will my website work on mobile phones?",
                answer: "Yes. Every website we build is fully responsive, meaning it looks great and works perfectly on phones, tablets, and desktop computers."
              },
              {
                question: "Can I update the website myself?",
                answer: "Yes. We build sites on easy-to-use platforms and provide training. However, most clients prefer our maintenance service where we handle updates for you."
              },
              {
                question: "What about hosting and domain registration?",
                answer: "We handle everything—domain registration, hosting setup, security certificates, and ongoing maintenance. One simple monthly fee covers it all."
              },
              {
                question: "Will my website show up on Google?",
                answer: "Yes. We optimize every site for local search and set up your Google Business Profile. Most clients see their site ranking for local searches within 4-8 weeks."
              }
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default WebsiteDevelopment;
