import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Check, Star, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
const About: React.FC = () => {
  return <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">About Hudson Valley Consulting</h1>
              <p className="text-xl mb-6 text-white/90">Bringing enterprise advertising expertise to local contractors in the Hudson Valley area</p>
            </div>
            <div className="bg-white/10 p-8 rounded-lg">
              <p className="italic text-lg">"At Hudson Valley Consulting Group, we believe local businesses deserve the same sophisticated marketing strategies that larger brands utilize. Our goal is to empower contractors with the tools to effectively reach and engage their ideal customers."</p>
              <div className="mt-4 flex items-center">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">HV
CG</div>
                <div className="ml-4">
                  <h4 className="font-semibold">Our Mission</h4>
                  <p className="text-sm text-white/80">Hudson Valley Consulting Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-4">Hudson Valley Consulting was founded in 2025 by marketing professionals with over two decades of experience working alongside major brands like Michelin, AT&T, Moen, AAMCO, and Toyota. Throughout our careers, we've partnered with hundreds of small businesses, learning firsthand the unique advertising challenges local contractors face.</p>
              <p className="text-lg text-gray-700 mb-4">Our team understands the importance of cost-effective strategies that generate real, measurable results. We've seen how local contractors often lack access to the sophisticated advertising strategies that larger companies benefit from, and we founded Hudson Valley Consulting to bridge that gap.</p>
              <p className="text-lg text-gray-700 mb-6">
                Today, we exclusively serve contractors throughout the Hudson Valley, delivering tailored strategies designed specifically to help local businesses thrive and grow.
              </p>
              
              {/* Certifications */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <div className="flex items-center mb-4">
                  <Award className="text-hvcg-blue-dark w-6 h-6 mr-3" />
                  <h3 className="text-xl font-semibold text-hvcg-blue-dark">Team Certifications</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google Ads Certified Professionals</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>Meta Blueprint Certified Media Planners</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>HubSpot Inbound Marketing Certified</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mr-2 mt-0.5 flex-shrink-0" />
                    <span>YouTube Certified Marketers</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Excellence</h3>
              <p className="text-gray-700">
                We bring the same level of expertise and excellence to local contractors that we provided to major national brands.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Integrity</h3>
              <p className="text-gray-700">
                We provide transparent, honest guidance focused on what will truly benefit your business, not just what makes us look good.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Results-Focused</h3>
              <p className="text-gray-700">
                We measure our success by your results—increased leads, improved conversion rates, and business growth.
              </p>
            </div>

            {/* Value 4 - New Collaboration Value */}
            <div className="text-center">
              <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-hvcg-blue-dark w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Collaboration</h3>
              <p className="text-gray-700">
                Our team works hand-in-hand with local contractors, ensuring every advertising solution aligns perfectly with their business goals.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in Partnering with Us?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Partner with a local team dedicated to growing your business. Schedule a complimentary consultation today.
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