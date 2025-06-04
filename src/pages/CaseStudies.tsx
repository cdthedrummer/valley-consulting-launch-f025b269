
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, TrendingUp, Users, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { motion } from "framer-motion";

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
        { metric: "Lead Increase", value: "170%", icon: TrendingUp },
        { metric: "Cost Per Lead", value: "-45%", icon: DollarSign },
        { metric: "Conversion Rate", value: "+60%", icon: Users },
      ],
      testimonial: "Hudson Valley Consulting completely transformed our business. We went from struggling to find customers to being booked out 3 weeks in advance.",
      clientName: "Mike Thompson, Thompson HVAC"
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
        { metric: "Revenue Growth", value: "100%", icon: DollarSign },
        { metric: "Online Visibility", value: "+300%", icon: TrendingUp },
        { metric: "Customer Reviews", value: "4.9★", icon: Users },
      ],
      testimonial: "We never thought digital marketing would work for our traditional plumbing business. We were completely wrong - it's been a game changer.",
      clientName: "Sarah Miller, Miller's Plumbing"
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
        { metric: "Seasonal Revenue", value: "+85%", icon: DollarSign },
        { metric: "Project Value", value: "+40%", icon: Users },
      ],
      testimonial: "They helped us think beyond just the busy season. Now we have customers planning projects year-round, and we're charging premium prices.",
      clientName: "Tom Rodriguez, Custom Decks Hudson Valley"
    }
  ];

  return (
    <div className="pt-20">
      <SEOHead 
        title="Case Studies | Hudson Valley Consulting Success Stories"
        description="See how Hudson Valley contractors have grown their businesses with our marketing strategies. Real results from HVAC, plumbing, and deck building companies."
        canonicalUrl="/case-studies"
        keywords="contractor case studies, hvac marketing success, plumbing advertising results, deck builder marketing, hudson valley contractor growth"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Real Results for Real Contractors
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90">
              Discover how Hudson Valley contractors have transformed their businesses with our proven marketing strategies
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16">
        <div className="container-custom">
          <div className="space-y-16">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image */}
                  <div className="relative h-64 lg:h-auto">
                    <img 
                      src={study.image} 
                      alt={`${study.industry} contractor case study`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-hvcg-blue text-white px-3 py-1 rounded-full text-sm font-medium">
                        {study.industry}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-2">
                      {study.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{study.location}</p>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {study.results.map((result, idx) => (
                        <div key={idx} className="text-center">
                          <div className="bg-hvcg-green/10 rounded-full p-3 mb-2 mx-auto w-fit">
                            <result.icon className="h-6 w-6 text-hvcg-green" />
                          </div>
                          <div className="text-2xl font-bold text-hvcg-blue-dark">{result.value}</div>
                          <div className="text-sm text-gray-600">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    {/* Challenge, Solution, Results */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="font-semibold text-hvcg-blue-dark mb-2">Challenge</h3>
                        <p className="text-gray-700 text-sm">{study.challenge}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-hvcg-blue-dark mb-2">Solution</h3>
                        <p className="text-gray-700 text-sm">{study.solution}</p>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-hvcg-gray p-4 rounded-lg">
                      <p className="text-gray-700 italic mb-2">"{study.testimonial}"</p>
                      <p className="text-sm font-semibold text-hvcg-blue-dark">- {study.clientName}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Be Our Next Success Story?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
              Schedule your free consultation and discover how we can help your contracting business achieve similar results.
            </p>
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book Your Free Consultation
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
