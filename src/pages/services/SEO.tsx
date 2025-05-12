
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const SEO: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/services" className="inline-flex items-center text-hvcg-blue mb-8 hover:text-hvcg-blue-dark transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="text-hvcg-blue-dark w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-hvcg-blue-dark mb-4">SEO Services</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Help local customers find your business when they search online for contractors in Hudson Valley.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Our SEO Approach</h2>
          <p className="mb-4">
            Our search engine optimization services are designed to help your contracting business rank higher in local search results. When homeowners in the Hudson Valley search for the services you offer, we make sure your business appears at the top of their search results.
          </p>
          <p className="mb-4">
            We implement proven SEO techniques specifically tailored for contractors, focusing on local search optimization, content marketing, and technical improvements to your website that boost your visibility and attract more potential customers.
          </p>
          <h3 className="text-xl font-semibold text-hvcg-blue-dark mt-6 mb-2">Our SEO Services Include:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Local SEO optimization to rank in the Google Map Pack</li>
            <li>Keyword research tailored to contractor services</li>
            <li>Website content optimization for search engines</li>
            <li>Google Business Profile setup and optimization</li>
            <li>Citation building and local directory submissions</li>
            <li>Competitor analysis and strategy development</li>
            <li>Monthly performance reporting</li>
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
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Why Choose Our SEO Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Long-Term Results</h3>
              <p>Unlike paid advertising, SEO provides sustainable, long-term results that continue to work for your business over time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Local Expertise</h3>
              <p>We understand the Hudson Valley market and optimize your online presence to target customers in specific towns and communities.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Contractor-Specific Strategy</h3>
              <p>Our SEO approaches are tailored specifically for contractors and the unique challenges of marketing construction services online.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Transparent Process</h3>
              <p>We clearly explain our SEO strategies and provide regular reports showing your improvement in search rankings over time.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEO;
