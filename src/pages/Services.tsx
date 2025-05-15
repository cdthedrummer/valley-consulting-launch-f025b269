import React from "react";
import { Link } from "react-router-dom";
import { Check, Calendar, Building, Search, Users, Code, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Services: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Expert advertising consulting services tailored specifically for contractors who want to attract better leads and grow their business.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="bg-hvcg-gray py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16">
            {/* Google Ads Section */}
            <section id="google-ads" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
                    <Building className="text-hvcg-blue-dark w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Google Ads</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Targeted Google Ads campaigns that bring qualified leads directly to your business. We specialize in local service ads and search campaigns that reach homeowners when they're actively looking for your services.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Local service ads setup and management</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Keyword research and selection</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Ad copy optimization</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Landing page conversion optimization</span>
                      </div>
                    </div>
                    <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                      <Link to="/booking">Book a Google Ads Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* SEO Section */}
            <section id="seo" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
                    <Search className="text-hvcg-blue-dark w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Search Engine Optimization</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Local SEO strategies that help your contracting business appear in search results when homeowners in your area are looking for your services, generating organic leads month after month.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Local SEO optimization</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Google Business Profile optimization</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>On-page SEO implementation</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Content strategy for contractors</span>
                      </div>
                    </div>
                    <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                      <Link to="/booking">Book an SEO Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Social Media Marketing Section */}
            <section id="social-media" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
                    <Share2 className="text-hvcg-blue-dark w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Social Media Marketing</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Strategic social media campaigns that showcase your work, build trust with potential customers, and create a strong online presence for your contracting business.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Platform selection and strategy</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Content calendar development</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Social ad campaign management</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Review management strategies</span>
                      </div>
                    </div>
                    <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                      <Link to="/booking">Book a Social Media Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Website Development Section */}
            <section id="website" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
                    <Code className="text-hvcg-blue-dark w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Website Development</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      High-converting websites designed specifically for contractors that showcase your work, generate leads, and build trust with potential customers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Contractor-focused web design</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Mobile-responsive implementation</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Lead generation optimization</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Portfolio and testimonial showcase</span>
                      </div>
                    </div>
                    <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                      <Link to="/booking">Book a Website Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Business Consulting Section */}
            <section id="consulting" className="scroll-mt-24">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
                    <Users className="text-hvcg-blue-dark w-16 h-16" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Business Consulting</h2>
                    <p className="text-lg text-gray-700 mb-6">
                      Strategic business consulting that helps contracting businesses improve operations, increase profitability, and scale effectively in the competitive Hudson Valley market.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Business process optimization</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Growth strategy development</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Customer experience enhancement</span>
                      </div>
                      <div className="flex items-start">
                        <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                        <span>Pricing strategy optimization</span>
                      </div>
                    </div>
                    <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                      <Link to="/booking">Book a Business Consultation</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Services Packages Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-700">
              Select the package that fits your needs and budget. Not sure which one is right for you?<br />
              Book a free 15-minute call to get matched with the best option.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="bg-white border-t-4 border-hvcg-blue-dark shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-hvcg-blue-dark">
                  Quick Fix Audit
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$1,150</div>
                <div className="text-sm text-gray-600">One-time flat fee</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  A fast, practical checkup to show you what's working and what needs fixing.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ad and website audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Competitor review</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>2-hour consultation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Simple action plan</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Written findings report</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                  <Link to="/booking" className="flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5" /> Book This Service
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Service 2 */}
            <Card className="bg-white border-t-4 border-hvcg-green shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="bg-hvcg-green text-white inline-block px-3 py-1 rounded-full text-sm font-bold mb-2">
                  MOST POPULAR
                </div>
                <CardTitle className="text-2xl text-hvcg-blue-dark">
                  Growth Plan
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$2,250</div>
                <div className="text-sm text-gray-600">Flat fee – includes strategy + support</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  A complete advertising roadmap to help you grow and stand out locally.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Everything in the Quick Fix Audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom marketing strategy</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Local + competitor insights</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Channel-specific recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Target audience + messaging guidance</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>4 follow-up support sessions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hvcg-green hover:bg-hvcg-green-light">
                  <Link to="/booking" className="flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5" /> Book This Service
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            {/* Service 3 */}
            <Card className="bg-white border-t-4 border-hvcg-blue shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-hvcg-blue-dark">
                  Full-Service Management
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$3,000</div>
                <div className="text-sm text-gray-600">Ongoing monthly support</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  We handle your advertising from start to finish so you can stay focused on the work.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Weekly ad management (Google, Meta, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Campaign copy + creative included</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly reporting + optimizations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Competitor trend monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly strategy session</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Unlimited email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                  <Link to="/booking" className="flex items-center justify-center">
                    <Calendar className="mr-2 h-5 w-5" /> Book This Service
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Advertising?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Take the first step toward more effective advertising and higher ROI.
          </p>
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
