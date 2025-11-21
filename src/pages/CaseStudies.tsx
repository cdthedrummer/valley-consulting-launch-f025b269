import React from "react";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";

const CaseStudies: React.FC = () => {
  const caseStudies = [
    {
      id: 1,
      title: "HVAC Contractor Increases Leads by 170% in 3 Months",
      industry: "HVAC",
      location: "Poughkeepsie, NY",
      image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Local HVAC contractor was struggling with inconsistent lead flow and high customer acquisition costs. They were spending $3,000/month on generic advertising with poor results and low-quality leads.",
      solution: "We implemented a targeted digital advertising strategy focusing on local homeowners searching for HVAC services, optimized their Google Business Profile, and created seasonal maintenance campaigns.",
      results: [
        { metric: "Lead Increase", value: "+170%", icon: TrendingUp },
        { metric: "Cost Per Lead", value: "-45%", icon: DollarSign },
        { metric: "Conversion Rate", value: "+60%", icon: Users },
      ],
      testimonial: "Hudson Valley Consulting completely transformed our business. We went from struggling to find customers to being booked out 3 weeks in advance.",
      clientName: "Mike T., Thompson HVAC"
    },
    {
      id: 2,
      title: "Plumbing Company Doubles Revenue in 6 Months",
      industry: "Plumbing",
      location: "Kingston, NY",
      image: "https://images.unsplash.com/photo-1558618666-5b6e429302bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      challenge: "Family-owned plumbing business relied heavily on word-of-mouth referrals and struggled during slow seasons. They had no online presence and were losing customers to competitors.",
      solution: "Created a comprehensive digital marketing strategy including local SEO, Google Ads campaigns, and reputation management. Built a professional website showcasing their services and customer reviews.",
      results: [
        { metric: "Revenue Growth", value: "+100%", icon: DollarSign },
        { metric: "Online Visibility", value: "+300%", icon: TrendingUp },
        { metric: "Customer Reviews", value: "4.9★", icon: Users },
      ],
      testimonial: "We never thought digital marketing would work for our traditional plumbing business. We were completely wrong - it's been a game changer.",
      clientName: "Sarah M., Miller's Plumbing"
    },
    {
      id: 3,
      title: "Deck Builder Becomes #1 in Local Market",
      industry: "Deck & Patio",
      location: "New Paltz, NY",
      image: "/lovable-uploads/b9af1e8c-7b4a-4b4b-87b3-9cf9bd4e3bcd.png",
      challenge: "Seasonal deck building business struggled with feast-or-famine cycles. They had great craftsmanship but poor online visibility and no strategy for off-season marketing.",
      solution: "Developed year-round marketing strategy with seasonal campaign adjustments. Created visual portfolio showcasing their work and implemented strategic bidding for high-intent keywords.",
      results: [
        { metric: "Market Position", value: "#1", icon: TrendingUp },
        { metric: "Off-Season Revenue", value: "+85%", icon: DollarSign },
        { metric: "Project Value", value: "+40%", icon: Users },
      ],
      testimonial: "They helped us think beyond just the busy season. Now we have customers planning projects year-round, and we're charging premium prices.",
      clientName: "Tom R., Custom Decks HV"
    }
  ];

  const siteUrl = "https://hudsonvalleycg.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Case Studies", item: `${siteUrl}/case-studies` }
    ],
  };

  return (
    <div className="min-h-screen bg-club-green">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <SEOHead 
        title="Case Studies | Hudson Valley Consulting Success Stories"
        description="See how Hudson Valley contractors have grown their businesses with our marketing strategies. Real results from HVAC, plumbing, and deck building companies."
        canonicalUrl="/case-studies"
        keywords="contractor case studies, hvac marketing success, plumbing advertising results, deck builder marketing, hudson valley contractor growth"
      />

      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-custom">
          <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-wide text-warm-cream mb-6">
            THE SCORECARD
          </h1>
          <p className="text-xl md:text-2xl text-warm-cream/80 max-w-3xl mx-auto font-dm">
            Real results from Hudson Valley contractors who partnered with us.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <div
                key={study.id}
                className="bg-warm-cream rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={study.image} 
                      alt={`${study.industry} contractor case study`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-action-yellow text-club-green px-4 py-2 rounded-full font-dm font-bold uppercase tracking-wide text-sm">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-12">
                    <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-2">
                      {study.title}
                    </h2>
                    <p className="text-club-green/60 mb-8 font-dm">{study.location}</p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                      {study.results.map((result, idx) => {
                        const IconComponent = result.icon;
                        return (
                          <div key={idx} className="text-center">
                            <div className="bg-action-yellow/20 rounded-3xl p-4 mb-3 mx-auto w-fit">
                              <IconComponent className="h-6 w-6 text-action-yellow" />
                            </div>
                            <div className="font-archivo text-2xl uppercase text-club-green">{result.value}</div>
                            <div className="text-sm text-club-green/60 font-dm">{result.metric}</div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Challenge & Solution */}
                    <div className="space-y-6 mb-8">
                      <div className="bg-club-green/5 rounded-3xl p-6 border border-club-green/10">
                        <h3 className="font-dm font-bold text-club-green mb-2">The Challenge</h3>
                        <p className="text-club-green/80 font-dm text-sm">{study.challenge}</p>
                      </div>
                      <div className="bg-club-green/5 rounded-3xl p-6 border border-club-green/10">
                        <h3 className="font-dm font-bold text-club-green mb-2">Our Solution</h3>
                        <p className="text-club-green/80 font-dm text-sm">{study.solution}</p>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-club-green rounded-3xl p-6">
                      <p className="text-warm-cream/90 italic mb-3 font-dm">"{study.testimonial}"</p>
                      <p className="text-sm font-dm font-bold text-action-yellow">— {study.clientName}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-varsity-maroon">
        <div className="container-custom text-center">
          <h2 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide text-warm-cream mb-6">
            READY FOR YOUR WIN?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-warm-cream/80 font-dm">
            Book a free consultation and let's talk about growing your contracting business.
          </p>
          <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95">
            <Link to="/booking" className="inline-flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> BOOK A CALL
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;