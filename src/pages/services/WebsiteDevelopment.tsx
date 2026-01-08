import React from "react";
import { Globe, Calendar, Monitor, Search, Phone, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

const WebsiteDevelopment: React.FC = () => {
  const whatYouGet = [
    {
      image: "/images/website-showcase/website-preview-multi-device.png",
      icon: <Monitor className="w-8 h-8" />,
      title: "Complete Website Build",
      features: [
        "Homepage with your brand",
        "Services page for each offering",
        "About page with your story",
        "Contact page with forms",
        "Gallery of your work",
        "Mobile-friendly design",
        "Fast loading speeds"
      ]
    },
    {
      image: "/images/website-showcase/search-maps-results.png",
      icon: <Search className="w-8 h-8" />,
      title: "Search & Maps Visibility",
      features: [
        "Google Business Profile setup",
        "Google Search Console connected",
        "Local SEO optimization",
        "Maps integration",
        "Search ranking tracking",
        "Monthly performance reports"
      ]
    },
    {
      image: "/images/website-showcase/mobile-search-experience.png",
      icon: <Phone className="w-8 h-8" />,
      title: "Lead Generation Tools",
      badge: "FREE",
      features: [
        "Click-to-call button",
        "Quote request form",
        "Clear call-to-actions",
        "Contact information displayed",
        "Service area highlighted",
        "Trust signals & reviews"
      ]
    },
    {
      image: "/images/website-showcase/ai-self-service-tools.png",
      icon: <Sparkles className="w-8 h-8" />,
      title: "Self-Service AI Portal",
      features: [
        "AI-powered updates",
        "Easy content changes",
        "Step-by-step tutorials",
        "30-day launch support",
        "Training session included",
        "Ongoing guidance"
      ]
    }
  ];

  const timeline = [
    {
      week: "Week 1",
      title: "We Gather Information",
      description: "You provide photos, services, and business details. We handle the rest."
    },
    {
      week: "Week 2",
      title: "We Build Your Website",
      description: "Our team designs and develops your complete website."
    },
    {
      week: "Week 3",
      title: "You Review & Request Changes",
      description: "See your site, give feedback, and we make adjustments."
    },
    {
      week: "Week 4",
      title: "Launch & Training",
      description: "Final tweaks, training session, and your site goes live."
    }
  ];

  const whatWeNeed = [
    "Phone number & business hours",
    "List of service areas (cities/towns)",
    "5-10 photos of completed jobs",
    "Customer reviews or testimonials",
    "Licensing & insurance info",
    "Services you offer",
    "What makes you different"
  ];

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-action-yellow/20 p-3 rounded-2xl">
                    <Globe className="text-action-yellow w-8 h-8" />
                  </div>
                  <span className="font-dm text-action-yellow uppercase tracking-widest text-sm">
                    Website Development
                  </span>
                </div>
                <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
                  Professional Websites for Contractors
                </h1>
                <p className="font-dm text-xl text-warm-cream/90 mb-8">
                  We build you a website that helps more people find your business when they search online. 
                  You focus on the work—we handle the tech.
                </p>
                <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold rounded-pill">
                  <Link to="/booking" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-lift">
                  <img 
                    src="/images/website-showcase/hvcg-site-mockup.png"
                    alt="Professional contractor website displayed across devices"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You're Getting Section */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                What You're Getting
              </h2>
              <p className="font-dm text-lg text-club-green/80 max-w-2xl mx-auto">
                Everything you need to get found online—all included.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whatYouGet.map((item, index) => (
                <div 
                  key={index}
                  className="bg-club-green rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {item.badge && (
                      <div className="absolute top-4 right-4 bg-action-yellow text-club-green px-3 py-1 rounded-pill text-xs font-dm font-bold uppercase tracking-wide">
                        {item.badge}
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-action-yellow/20 p-3 rounded-2xl text-action-yellow">
                        {item.icon}
                      </div>
                      <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream">
                        {item.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3 font-dm text-warm-cream/80">
                          <CheckCircle2 className="w-4 h-4 text-action-yellow flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Timeline */}
        <section className="py-16 md:py-24 bg-varsity-maroon">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                How It Works
              </h2>
              <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto">
                From start to launch in just 4 weeks
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {timeline.map((step, index) => (
                <div 
                  key={index}
                  className="relative bg-warm-cream rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="bg-action-yellow text-club-green font-archivo text-sm uppercase tracking-wide px-4 py-2 rounded-pill inline-block mb-4">
                    {step.week}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {step.title}
                  </h3>
                  <p className="font-dm text-club-green/80">
                    {step.description}
                  </p>
                  
                  {/* Arrow connector (hidden on last item) */}
                  {index < timeline.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-action-yellow" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What We Need From You */}
        <section className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
                  What We Need From You
                </h2>
                <p className="font-dm text-lg text-warm-cream/80 mb-8">
                  We handle all the technical stuff. Just provide these basics and we'll build your site.
                </p>
                
                <ul className="space-y-4">
                  {whatWeNeed.map((item, index) => (
                    <li key={index} className="flex items-center gap-4">
                      <div className="bg-action-yellow/20 w-8 h-8 rounded-lg flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-action-yellow" />
                      </div>
                      <span className="font-dm text-warm-cream text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-lift">
                  <img 
                    src="/images/website-showcase/mobile-search-experience.png"
                    alt="Woman reviewing contractor website on mobile device"
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-6">
              Ready to Get Started?
            </h2>
            <p className="font-dm text-lg text-club-green/80 max-w-2xl mx-auto mb-8">
              Book a free strategy call to discuss your website needs. No pressure, just a conversation about how we can help.
            </p>
            <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold rounded-pill">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
              </Link>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 pb-16 bg-club-green">
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
