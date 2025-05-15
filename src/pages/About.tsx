import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Check, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
const About: React.FC = () => {
  return <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Hudson Valley Consulting</h1>
              <p className="text-xl mb-6 text-white/90">Bringing enterprise advertising expertise to local contractors since 2023</p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg">
              <p className="italic text-lg">
                "My mission is to help local contractors access the same level of advertising expertise that I provided to major brands, but at a price point that makes sense for small businesses."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">CD</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Charlie Dickerson</h4>
                  <p className="text-sm text-white/80">Founder, Hudson Valley Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">After 20+ years working in advertising for major brands like Michelin, AT&T, Moen, AAMCO, & Toyota, I noticed local contractors were not getting access to the sophisticated advertising strategies that larger companies benefit from.</p>
              <p className="text-lg text-gray-700 mb-4">I've worked with 100s of small businesses throughout my career, so I understand the unique challenges when it comes to advertising effectively, attracting the right customers, and generating real leads.</p>
              <p className="text-lg text-gray-700 mb-4">I founded Hudson Valley Consulting in 2025 with a clear mission: to bring enterprise-level advertising expertise to local contractors at an accessible price point, helping them grow their businesses through targeted, effective advertising strategies.</p>
              <p className="text-lg text-gray-700 mb-6">
                Today, we exclusively serve contractors throughout the Hudson Valley region, providing tailored strategies that deliver real results and help local businesses thrive.
              </p>
              
              {/* Certifications - Moved from Professional Experience section */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <div className="flex items-center mb-4">
                  <Award className="text-hvcg-blue-dark w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-hvcg-blue-dark">Certifications</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google Ads Certified Professional</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Meta Blueprint Certified Media Planner</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>HubSpot Inbound Marketing Certified</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Digital Marketing Institute Expert</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img alt="Consulting session" src="/lovable-uploads/da252d5c-59e9-44e2-a866-09f08e917fa9.jpg" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Excellence</h3>
              <p className="text-gray-700">
                We bring the same level of expertise and excellence to local contractors that we provided to major national brands.
              </p>
            </div>
            
            {/* Value */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Integrity</h3>
              <p className="text-gray-700">
                We provide transparent, honest guidance focused on what will truly benefit your business, not just what makes us look good.
              </p>
            </div>
            
            {/* Value */}
            <div className="text-center md:col-span-2 lg:col-span-1">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Results-Focused</h3>
              <p className="text-gray-700">
                We measure our success by your results—increased leads, improved conversion rates, and business growth.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Us?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Let's discuss how our experience and expertise can help your contracting business grow.
          </p>
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Schedule a Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default About;