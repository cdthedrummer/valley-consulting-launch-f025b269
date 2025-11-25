import React from "react";
import { Bot, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

const GEO: React.FC = () => {
  return (
    <>
      <SEOHead
        title="GEO (Generative Engine Optimization) | Hudson Valley Consulting"
        description="Optimize your site for AI search engines like ChatGPT, Claude, and Gemini. Get recommended when AI tools answer customer questions."
        canonicalUrl="/services/geo"
      />
      <div className="bg-club-green min-h-screen">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-action-yellow/20 p-6 rounded-full">
                  <Bot className="text-action-yellow w-16 h-16" />
                </div>
              </div>
              <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
                GEO: AI SEARCH OPTIMIZATION
              </h1>
              <p className="font-dm text-xl md:text-2xl text-warm-cream/90 mb-8">
                Get your business recommended by AI search engines like ChatGPT, Claude, and Gemini.
              </p>
              <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold">
                <Link to="/booking" className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* What is GEO Section */}
        <section className="py-16 bg-warm-cream">
          <div className="container-custom max-w-5xl">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-8 text-center">
              What is GEO?
            </h2>
            <div className="font-dm text-lg text-club-green/80 space-y-4 mb-12">
              <p>
                Generative Engine Optimization (GEO) is the practice of optimizing your website and online presence to be discoverable and recommended by AI-powered search engines and chatbots like ChatGPT, Claude, Gemini, and Perplexity.
              </p>
              <p>
                When potential customers ask AI tools for contractor recommendations in the Hudson Valley, you want your business to be at the top of those recommendations. GEO ensures your content is structured, authoritative, and easily understood by AI systems.
              </p>
            </div>

            {/* Core GEO Services */}
            <div className="mb-16">
              <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-8 text-center">
                Our GEO Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Structured Data Implementation",
                    description: "Add schema.org markup to make your services, reviews, and business information easily parseable by AI engines."
                  },
                  {
                    title: "Entity-Based Content Optimization",
                    description: "Optimize content around core entities (your business, services, locations) with clear relationships and context."
                  },
                  {
                    title: "Natural Language Content",
                    description: "Create content that directly answers common questions in natural, conversational language."
                  },
                  {
                    title: "FAQ & Q&A Sections",
                    description: "Develop comprehensive FAQ sections that AI engines can pull from when answering user queries."
                  },
                  {
                    title: "Authority Building",
                    description: "Establish your site as an authoritative source through citations, reviews, and industry recognition."
                  },
                  {
                    title: "Semantic HTML Structure",
                    description: "Implement proper HTML5 semantic elements to help AI understand content hierarchy and relationships."
                  },
                  {
                    title: "Citation-Worthy Content",
                    description: "Create unique, factual content that AI engines are more likely to cite and reference."
                  },
                  {
                    title: "Local Business Optimization",
                    description: "Optimize your local business information across platforms so AI engines know exactly where you serve."
                  }
                ].map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-action-yellow">
                    <h4 className="font-archivo text-lg uppercase tracking-wide text-club-green mb-3">{service.title}</h4>
                    <p className="font-dm text-club-green/80">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Process */}
            <div className="bg-club-green rounded-lg p-8 md:p-12 mb-16">
              <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-action-yellow mb-8 text-center">
                Our GEO Implementation Process
              </h3>
              <div className="space-y-6">
                {[
                  {
                    step: "1",
                    title: "AI Discoverability Audit",
                    description: "We audit your current site to identify gaps in AI readability and optimization opportunities."
                  },
                  {
                    step: "2",
                    title: "Structured Data Integration",
                    description: "Implement comprehensive schema markup for your business, services, reviews, and content."
                  },
                  {
                    step: "3",
                    title: "Content Optimization",
                    description: "Rewrite and restructure key content to be more natural, authoritative, and AI-friendly."
                  },
                  {
                    step: "4",
                    title: "FAQ Development",
                    description: "Create detailed FAQ sections that directly answer common customer questions."
                  },
                  {
                    step: "5",
                    title: "Authority Signals",
                    description: "Build authority signals through reviews, citations, and industry recognition."
                  },
                  {
                    step: "6",
                    title: "Testing & Monitoring",
                    description: "Test how AI engines understand your content and continuously refine based on results."
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-warm-cream p-6 rounded-lg">
                    <div className="bg-action-yellow text-club-green font-archivo font-bold text-xl w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-archivo text-lg uppercase tracking-wide text-club-green mb-2">{item.title}</h4>
                      <p className="font-dm text-club-green/80">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why GEO Matters */}
            <div className="bg-action-yellow/10 rounded-lg p-8 md:p-12">
              <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-6 text-center">
                Why GEO Matters Now
              </h3>
              <div className="font-dm text-lg text-club-green/80 space-y-4">
                <p>
                  <strong>AI search is exploding:</strong> Millions of people now use ChatGPT, Claude, and Gemini to find local services. If your site isn't optimized for AI, you're invisible to these users.
                </p>
                <p>
                  <strong>Get ahead of competitors:</strong> Most contractors haven't even heard of GEO yet. By optimizing now, you gain a massive first-mover advantage.
                </p>
                <p>
                  <strong>Complements SEO:</strong> GEO works alongside traditional SEO—many tactics benefit both traditional search engines and AI systems.
                </p>
                <p>
                  <strong>Future-proof your marketing:</strong> As AI search grows, GEO will become as essential as SEO. Start building authority with AI engines today.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="container-custom px-4 pb-16">
          <FAQSection
            title="GEO: Frequently Asked Questions"
            faqs={[
              {
                question: "How is GEO different from SEO?",
                answer: "SEO optimizes for traditional search engines like Google using keywords and backlinks. GEO optimizes for AI engines like ChatGPT by focusing on structured data, natural language, and entity-based content that AI can understand and cite."
              },
              {
                question: "Will GEO replace traditional SEO?",
                answer: "No—GEO complements SEO. Many tactics benefit both. You still need traditional SEO for Google rankings, but GEO ensures you're also found by the growing number of users relying on AI for recommendations."
              },
              {
                question: "How long does GEO take to show results?",
                answer: "Initial improvements can be seen in 2-4 weeks as AI engines re-crawl your site. Full authority building takes 3-6 months as structured data propagates and AI engines recognize your site as a credible source."
              },
              {
                question: "Can I do GEO myself?",
                answer: "Basic GEO tactics like adding FAQs and improving content clarity are doable. However, proper structured data implementation, entity optimization, and authority building require technical expertise to do correctly."
              },
              {
                question: "What if AI search doesn't take off?",
                answer: "The techniques used in GEO—structured data, clear content, semantic HTML, FAQs—already improve traditional SEO, user experience, and accessibility. You benefit regardless of AI search adoption."
              }
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default GEO;
