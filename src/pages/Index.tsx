
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Check, User, Calendar, Phone, Mail, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section with improved messaging and contractor image */}
      <section className="relative bg-hvcg-blue-dark py-20 lg:py-28">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Contractors at work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
                Grow Your Contracting Business in Hudson Valley
              </h1>
              <p className="text-xl mb-6 text-white/90">
                Marketing and consulting services designed specifically for local contractors like you.
              </p>
              
              {/* Benefit bullet points */}
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-white text-lg">Get more local leads that convert to jobs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-white text-lg">Stand out from competitors on Google</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-white text-lg">Save time & money on marketing that works</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white font-medium">
                  <Link to="/booking">Book Your Free Consultation</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/50">
                  <Link to="/services">See How We Help</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block lg:rounded-xl lg:overflow-hidden lg:shadow-2xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1581094794329-c8112a89f47e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Contractor success" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Our Services</h2>
            <p className="text-lg text-gray-700">
              We help contractors like you get more customers and grow your business with proven strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-3">Advertising</h3>
                <p className="text-gray-600 mb-4">
                  Targeted local ads that reach homeowners in need of your services, right when they're searching.
                </p>
                <Link 
                  to="/services" 
                  className="text-hvcg-blue font-medium inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            {/* Service 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-3">SEO</h3>
                <p className="text-gray-600 mb-4">
                  Help local customers find your business when they search online for contractors in Hudson Valley.
                </p>
                <Link 
                  to="/services" 
                  className="text-hvcg-blue font-medium inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            
            {/* Service 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-3">Consulting</h3>
                <p className="text-gray-600 mb-4">
                  Expert advice tailored to your contracting business, helping you make smart marketing decisions.
                </p>
                <Link 
                  to="/services" 
                  className="text-hvcg-blue font-medium inline-flex items-center"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-hvcg-blue-dark hover:bg-hvcg-blue text-white">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Service Packages Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Choose Your Plan</h2>
            <p className="text-lg text-gray-700">
              Select the package that fits your needs and budget. Not sure which one is right for you? Book a free consultation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Package */}
            <Card className="bg-white border-none shadow-lg relative">
              <CardContent className="pt-8 pb-8 px-6">
                <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2 text-center">Basic</h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">$500</span>
                  <span className="text-gray-600"> flat</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Comprehensive advertising audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Actionable improvement plan</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>30-min implementation guidance</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Standard Package (Highlighted) */}
            <Card className="bg-white border-none shadow-xl relative transform scale-105 z-10">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-hvcg-green text-white px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </span>
              </div>
              <CardContent className="pt-8 pb-8 px-6">
                <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2 text-center">Standard</h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">$2,000</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Everything in Basic</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Full advertising strategy development</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Implementation plans</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Audience targeting</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Messaging frameworks</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-hvcg-green hover:bg-hvcg-green-light">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
            
            {/* Premium Package */}
            <Card className="bg-white border-none shadow-lg relative">
              <CardContent className="pt-8 pb-8 px-6">
                <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2 text-center">Premium</h3>
                <div className="text-center mb-6">
                  <span className="text-3xl font-bold">$1,500</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Ongoing advertising support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Campaign management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Monthly strategy sessions</span>
                  </li>
                </ul>
                <Button asChild className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue">
                  <Link to="/booking">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg mb-4">Not sure which plan is right for your business?</p>
            <Button asChild variant="outline" size="lg" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
              <Link to="/booking">Contact Us for Help</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">We Help Contractors Like You</h2>
            <p className="text-lg text-gray-700">
              Specialized marketing strategies for different contracting trades in the Hudson Valley area.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
            {/* HVAC */}
            <Link to="/industries/hvac" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 17h20M2 7h20M16 12H8M12 2v20"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">HVAC</h3>
              </div>
            </Link>
            
            {/* Plumbing */}
            <Link to="/industries/plumbing" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M2 6h4a2 2 0 0 1 2 2v12M2 6V2h20v4M22 6H18a2 2 0 0 0-2 2v12M18 18h4"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">Plumbing</h3>
              </div>
            </Link>
            
            {/* Fencing */}
            <Link to="/industries/fencing" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4v16M9 4v16M14 4v16M19 4v16M1 9h22M1 14h22"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">Fencing</h3>
              </div>
            </Link>
            
            {/* Deck/Patio */}
            <Link to="/industries/deck-patio" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                    <path d="M6 12h12M8 18v2M16 18v2"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">Deck/Patio</h3>
              </div>
            </Link>
            
            {/* Flooring */}
            <Link to="/industries/flooring" className="group">
              <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:border-hvcg-blue flex flex-col items-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-3 group-hover:bg-hvcg-blue/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="2"></rect>
                    <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"></path>
                  </svg>
                </div>
                <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-blue">Flooring</h3>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
              <Link to="/industries">View All Industries</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial Highlight */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">What Our Clients Say</h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto relative">
            <div className="absolute -top-5 left-10 text-hvcg-blue text-6xl opacity-20">"</div>
            <div className="relative z-10">
              <p className="text-xl text-gray-700 italic mb-6">
                "Hudson Valley Consulting transformed our advertising strategy. Within 3 months, our leads increased by 200% and our close rate improved dramatically. Their knowledge of the local market made all the difference."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl mr-4">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold">John Doe</h4>
                  <p className="text-sm text-gray-600">ABC Contractors, Hudson Valley</p>
                </div>
                <div className="ml-auto flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
              <Link to="/testimonials">Read More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* About Us Preview */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Charlie Dickerson, Founder" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Why Choose Hudson Valley CG?</h2>
              <p className="text-lg text-gray-700 mb-4">
                With over 20 years of advertising experience and leadership roles at major brands like Roku and HBO Max, I bring enterprise-level strategies to local contractors.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                I exclusively serve contractors with tailored strategies that understand your unique business challenges in the Hudson Valley area.
              </p>
              <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get More Customers?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Take the first step toward transforming your contracting business with expert advertising and marketing support.
          </p>
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Let's Chat
            </Link>
          </Button>
        </div>
      </section>

      {/* Mobile Call Now Button (visible on mobile only) */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden flex z-30">
        <a 
          href="tel:+18455551234" 
          className="flex-1 bg-hvcg-green text-white py-3 font-medium rounded-l-lg flex items-center justify-center"
        >
          <Phone className="h-5 w-5 mr-2" /> Call Now
        </a>
        <Link 
          to="/booking" 
          className="flex-1 bg-hvcg-blue text-white py-3 font-medium rounded-r-lg flex items-center justify-center"
        >
          <Mail className="h-5 w-5 mr-2" /> Contact
        </Link>
      </div>
    </div>
  );
};

export default Index;
