
import React from "react";
import { Link } from "react-router-dom";
import { Check, Calendar } from "lucide-react";
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

      {/* Services Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <Card className="bg-white border-t-4 border-hvcg-blue-dark shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-hvcg-blue-dark">
                  Introductory Audit & Consultation
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$500</div>
                <div className="text-sm text-gray-600">One-time flat fee</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  A comprehensive review of your current advertising strategy with actionable recommendations for improvement.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete advertising channel audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>2-hour consultation session</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Detailed findings report</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Prioritized action recommendations</span>
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
                <div className="bg-hvcg-green text-white inline-block px-3 py-1 rounded text-sm font-semibold mb-2">
                  Most Popular
                </div>
                <CardTitle className="text-2xl text-hvcg-blue-dark">
                  Strategy Package
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$2,000</div>
                <div className="text-sm text-gray-600">Comprehensive package</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Full advertising strategy development with implementation plans, audience targeting, and messaging frameworks.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Everything in the Introductory Audit</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complete advertising strategy development</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Customer persona development</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Channel-specific implementation plans</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Messaging framework and key differentiators</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>4 implementation support sessions</span>
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
                  Premium Retainer
                </CardTitle>
                <div className="mt-4 text-3xl font-bold text-hvcg-blue">$1,500</div>
                <div className="text-sm text-gray-600">Monthly subscription</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">
                  Ongoing advertising support, campaign management, performance optimization, and monthly strategy sessions.
                </p>
                <h4 className="font-semibold text-lg mb-3 text-hvcg-blue-dark">What's Included:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly advertising performance review</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Campaign optimization recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Competitive landscape monitoring</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Monthly strategy session</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Implementation support</span>
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

      {/* Process Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Our Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="bg-hvcg-blue-dark w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Discovery</h3>
                <p className="text-gray-700">
                  We start by understanding your business, current advertising efforts, and specific goals.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.7071 8.70711C40.0976 8.31658 40.0976 7.68342 39.7071 7.29289L33.3431 0.928932C32.9526 0.538408 32.3195 0.538408 31.9289 0.928932C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM0 9H39V7H0V9Z" fill="#0E3B65"/>
                </svg>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="bg-hvcg-blue-dark w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Analysis</h3>
                <p className="text-gray-700">
                  We analyze your current strategy, identify strengths, weaknesses, and untapped opportunities.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.7071 8.70711C40.0976 8.31658 40.0976 7.68342 39.7071 7.29289L33.3431 0.928932C32.9526 0.538408 32.3195 0.538408 31.9289 0.928932C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM0 9H39V7H0V9Z" fill="#0E3B65"/>
                </svg>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="bg-hvcg-blue-dark w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Strategy</h3>
                <p className="text-gray-700">
                  We develop a customized strategy that targets your ideal customers and aligns with your goals.
                </p>
              </div>
              <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                <svg width="40" height="16" viewBox="0 0 40 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M39.7071 8.70711C40.0976 8.31658 40.0976 7.68342 39.7071 7.29289L33.3431 0.928932C32.9526 0.538408 32.3195 0.538408 31.9289 0.928932C31.5384 1.31946 31.5384 1.95262 31.9289 2.34315L37.5858 8L31.9289 13.6569C31.5384 14.0474 31.5384 14.6805 31.9289 15.0711C32.3195 15.4616 32.9526 15.4616 33.3431 15.0711L39.7071 8.70711ZM0 9H39V7H0V9Z" fill="#0E3B65"/>
                </svg>
              </div>
            </div>
            
            {/* Step 4 */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md h-full">
                <div className="bg-hvcg-blue-dark w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                  4
                </div>
                <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Implementation</h3>
                <p className="text-gray-700">
                  We help you implement the strategy and continuously optimize for maximum results and ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">How long does it take to see results?</h3>
              <p className="text-gray-700">
                While every business is different, most clients begin to see improvements in their advertising metrics within 30 days of implementing our recommendations. More substantial business results typically follow within 60-90 days.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Do you manage the ad campaigns for us?</h3>
              <p className="text-gray-700">
                Our primary focus is strategy and consulting. While we provide detailed implementation guidance, our services do not include day-to-day campaign management. However, we can recommend trusted partners if you need campaign management services.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">What makes you different from other agencies?</h3>
              <p className="text-gray-700">
                We exclusively serve contractors, bringing deep industry expertise and understanding of your specific challenges. We also bring enterprise-level advertising experience from major brands to local businesses, providing sophisticated strategies that are normally inaccessible to smaller companies.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">What if I'm not satisfied with the service?</h3>
              <p className="text-gray-700">
                We stand behind our work. If you're not completely satisfied with our services, we'll work with you to make it right. Our goal is to build long-term relationships based on trust and results.
              </p>
            </div>
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
