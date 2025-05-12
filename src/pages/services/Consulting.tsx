
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Consulting: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/services" className="inline-flex items-center text-hvcg-blue mb-8 hover:text-hvcg-blue-dark transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="text-hvcg-blue-dark w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-hvcg-blue-dark mb-4">Consulting Services</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Expert advice tailored to your contracting business, helping you make smart marketing decisions.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Our Consulting Approach</h2>
          <p className="mb-4">
            Our consulting services provide contractor businesses with expert guidance on marketing strategy, business development, and customer acquisition. We work closely with you to understand your unique challenges and develop customized solutions to help you grow.
          </p>
          <p className="mb-4">
            With experience working with contractors across the Hudson Valley, we bring industry-specific knowledge and proven strategies that have helped similar businesses succeed in this competitive market.
          </p>
          <h3 className="text-xl font-semibold text-hvcg-blue-dark mt-6 mb-2">Our Consulting Services Include:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Comprehensive marketing audits</li>
            <li>Competitor analysis and market positioning</li>
            <li>Customer acquisition strategy development</li>
            <li>Lead generation and conversion optimization</li>
            <li>Brand development and messaging</li>
            <li>Marketing budget planning and allocation</li>
            <li>Business growth consulting</li>
          </ul>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-hvcg-gray rounded-lg p-8">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Why Choose Our Consulting Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Industry Expertise</h3>
              <p>We specialize in working with contractors and understand the unique challenges and opportunities in your industry.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Customized Solutions</h3>
              <p>We don't offer one-size-fits-all advice. Our recommendations are tailored specifically to your business goals and market situation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Actionable Strategies</h3>
              <p>We provide clear, practical guidance that you can implement immediately to start seeing results in your business.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Ongoing Support</h3>
              <p>Our consulting relationships don't end after the initial engagement. We're available for follow-up support to ensure successful implementation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consulting;
