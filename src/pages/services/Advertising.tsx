
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Building, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const Advertising: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/services" className="inline-flex items-center text-hvcg-blue mb-8 hover:text-hvcg-blue-dark transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Building className="text-hvcg-blue-dark w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-hvcg-blue-dark mb-4">Advertising Services</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Targeted local ads that reach homeowners in need of your services, right when they're searching.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Our Advertising Approach</h2>
          <p className="mb-4">
            We specialize in creating targeted advertising campaigns that connect contractors with potential customers in the Hudson Valley. Our ads are strategically placed to reach homeowners who are actively searching for the services you provide.
          </p>
          <p className="mb-4">
            Using advanced targeting techniques, we ensure your advertising budget is spent efficiently, maximizing your return on investment and generating high-quality leads that are more likely to convert.
          </p>
          <h3 className="text-xl font-semibold text-hvcg-blue-dark mt-6 mb-2">Our Advertising Services Include:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>Google Ads campaign creation and management</li>
            <li>Facebook and Instagram targeted advertising</li>
            <li>Local service ads optimization</li>
            <li>Geotargeted mobile advertising</li>
            <li>Remarketing campaigns to reach previous website visitors</li>
            <li>Detailed performance reporting and analytics</li>
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
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">Why Choose Our Advertising Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Hudson Valley Focus</h3>
              <p>We understand the unique characteristics of the local market and create campaigns specifically tailored to reach homeowners in this region.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Contractor Specialization</h3>
              <p>Our experience with contractor businesses means we know exactly how to position your services to stand out from competitors.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Data-Driven Approach</h3>
              <p>We continuously monitor campaign performance and make adjustments to improve results and maximize your advertising ROI.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Transparent Reporting</h3>
              <p>Regular reports show exactly how your advertising budget is being spent and what results it's generating for your business.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertising;
