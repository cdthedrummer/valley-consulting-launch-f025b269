
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Check, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-20 lg:py-28">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                Elevate Your Contracting Business with Expert Advertising
              </h1>
              <p className="text-xl mb-8 text-white/90">
                Premium advertising consulting and training tailored specifically to local contractors.
                Get more leads, better clients, and higher profits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white font-medium">
                  <Link to="/booking">Book Your First Audit</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/20 hover:bg-white/30 text-white border-white/50">
                  <Link to="/services">Explore Services</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block lg:rounded-xl lg:overflow-hidden lg:shadow-2xl animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Consulting session" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Who Am I?</h2>
            <p className="text-lg text-gray-700">
              With over 20 years of advertising experience and leadership roles at major brands,
              I bring enterprise-level strategies to local contractors.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="text-hvcg-blue-dark w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-hvcg-blue-dark">Industry Leader</h3>
                </div>
                <p className="text-gray-600 text-center">
                  Former advertising executive at Roku and HBO Max, bringing enterprise strategies to local businesses.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-hvcg-blue-dark w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-hvcg-blue-dark">Proven Results</h3>
                </div>
                <p className="text-gray-600 text-center">
                  Helped contractors increase leads by 300% and improve conversion rates through tailored strategies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="text-hvcg-blue-dark w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-hvcg-blue-dark">Specialized Focus</h3>
                </div>
                <p className="text-gray-600 text-center">
                  Exclusively serving contractors with tailored strategies that understand your unique business challenges.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Services Overview */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Our Services</h2>
            <p className="text-lg text-gray-700">
              Expert advertising consulting services tailored to help contractors attract more leads,
              convert more clients, and grow their business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-hvcg-blue">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4">
                Introductory Audit & Consultation
              </h3>
              <p className="text-gray-700 mb-4">
                A comprehensive review of your current advertising efforts with actionable recommendations for improvement.
              </p>
              <p className="font-bold text-lg text-hvcg-blue mb-4">$500 flat</p>
              <Button asChild variant="outline" className="w-full border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
                <Link to="/services" className="flex items-center justify-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-hvcg-green">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4">
                Strategy Package
              </h3>
              <p className="text-gray-700 mb-4">
                Full advertising strategy development with implementation plans, audience targeting, and messaging frameworks.
              </p>
              <p className="font-bold text-lg text-hvcg-blue mb-4">$2,000</p>
              <Button asChild variant="outline" className="w-full border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
                <Link to="/services" className="flex items-center justify-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-hvcg-blue">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4">
                Premium Retainer
              </h3>
              <p className="text-gray-700 mb-4">
                Ongoing advertising support, campaign management, performance optimization, and monthly strategy sessions.
              </p>
              <p className="font-bold text-lg text-hvcg-blue mb-4">$1,500/month</p>
              <Button asChild variant="outline" className="w-full border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
                <Link to="/services" className="flex items-center justify-center">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">What Clients Say</h2>
            <p className="text-lg text-gray-700">
              Don't just take our word for it. Hear from contractors who've transformed their businesses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Hudson Valley Consulting transformed our advertising strategy. Within 3 months, our leads increased by 200% and our close rate improved dramatically."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl">
                    JD
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-600">ABC Contractors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 2 */}
            <Card className="bg-white border-none shadow-lg">
              <CardContent className="pt-6">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The strategy package was exactly what our business needed. We now have clear messaging, know exactly who to target, and our ads are performing better than ever."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl">
                    JS
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-gray-600">Smith Home Services</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Testimonial 3 */}
            <Card className="bg-white border-none shadow-lg md:col-span-2 lg:col-span-1">
              <CardContent className="pt-6">
                <div className="flex items-center text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The monthly retainer has been invaluable. Having an expert manage our campaigns while providing strategic guidance has allowed us to focus on what we do best - serving our customers."
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-hvcg-blue/20 flex items-center justify-center text-hvcg-blue font-bold text-xl">
                    RJ
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">Robert Johnson</h4>
                    <p className="text-sm text-gray-600">Johnson Construction</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
              <Link to="/testimonials">Read More Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Advertising?</h2>
              <p className="text-lg mb-6 text-white/90">
                Book your initial consultation today and take the first step toward more effective advertising and more profitable projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
                  <Link to="/booking" className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  <Link to="/services">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Why Choose Hudson Valley Consulting?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span>Enterprise advertising experience applied to local businesses</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span>Specialized focus on the unique needs of contractors</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span>Proven track record of increasing leads and conversions</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span>Customized strategies tailored to your business goals</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span>Transparent pricing with clear ROI focus</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
