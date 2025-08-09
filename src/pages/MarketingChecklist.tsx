
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const MarketingChecklist: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-20 pb-16">
      <SEOHead
        title="Contractor Marketing Checklist | Hudson Valley Consulting"
        description="Download our free marketing checklist and resources for contractors."
        canonicalUrl="/resources/marketing-checklist"
      />
      {/* Header */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Contractor Marketing Checklist</h1>
              <p className="text-xl text-white/90">Your Essential Toolkit for Better Local Marketing</p>
            </div>
            <div className="hidden lg:flex gap-4">
              <Button onClick={handlePrint} variant="outline" className="text-white border-white hover:bg-white hover:text-hvcg-blue">
                <Download className="mr-2 h-4 w-4" /> Print PDF
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white hover:text-hvcg-blue">
                <Link to="/resources">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Resources
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 20-Point Advertising Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-hvcg-blue-dark">20-Point Advertising Checklist</CardTitle>
              <p className="text-gray-600">Maximize your marketing effectiveness with this comprehensive audit.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Define clear advertising objectives",
                  "Identify your ideal customer demographic",
                  "Ensure branding is consistent across all platforms",
                  "Set up and regularly update Google Business Profile",
                  "Create a mobile-friendly website",
                  "List your business on local directories",
                  "Regularly request and manage online reviews",
                  "Utilize targeted local ads on Facebook and Instagram",
                  "Develop a content calendar",
                  "Invest in professional photography for your projects",
                  "Implement a referral program",
                  "Monitor competitors' strategies",
                  "Track your ad results and optimize accordingly",
                  "Keep your contact information easily accessible",
                  "Run seasonal promotions",
                  "Stay active and engage your audience on social media",
                  "Leverage customer testimonials and case studies",
                  "Regularly update your portfolio of work",
                  "Set up remarketing ads",
                  "Evaluate your marketing strategy quarterly"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 border-2 border-hvcg-green rounded flex items-center justify-center">
                        <span className="text-xs font-bold text-hvcg-green">{index + 1}</span>
                      </div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Local SEO Quick-Start Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-hvcg-blue-dark">Local SEO Quick-Start Guide</CardTitle>
              <p className="text-gray-600">Get found by local customers in the Hudson Valley.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Claim your Google Business Profile and fill it completely",
                  "Optimize your website with local keywords (e.g., \"Hudson Valley contractor\")",
                  "Create location-specific landing pages",
                  "Publish regular blog posts targeting local events or issues",
                  "Ensure your business name, address, and phone (NAP) are consistent across the web",
                  "Get backlinks from local businesses or organizations",
                  "Encourage and respond to online reviews promptly"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-hvcg-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Response Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-hvcg-blue-dark">Ready-to-Use Customer Response Templates</CardTitle>
              <p className="text-gray-600">Professional templates for common contractor scenarios.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-hvcg-blue-dark mb-2">Initial Inquiry Response</h4>
                  <p className="text-gray-700 italic">
                    "Thanks for reaching out! We'd be happy to discuss your project and see how we can help. When's a convenient time to chat?"
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-hvcg-blue-dark mb-2">Follow-Up Email After a Quote</h4>
                  <p className="text-gray-700 italic">
                    "Just checking in to see if you have any questions about the quote we sent. Looking forward to potentially working together!"
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-hvcg-blue-dark mb-2">Post-Service Satisfaction Check</h4>
                  <p className="text-gray-700 italic">
                    "We hope you're thrilled with the work we did! If you have a moment, we'd greatly appreciate a review. Please let us know if there's anything else we can help with."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget Planning Worksheet */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-hvcg-blue-dark">Budget Planning Worksheet</CardTitle>
              <p className="text-gray-600">Take control of your advertising budget for maximum ROI.</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  "Allocate budget by advertising channel (e.g., online ads, local print, social media)",
                  "Set monthly and quarterly spending limits",
                  "Track actual expenses vs. planned spending monthly",
                  "Evaluate ROI quarterly to adjust future spending"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-hvcg-green mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-hvcg-blue-dark mb-3">Monthly Budget Tracker Template</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Channel</th>
                        <th className="text-left py-2">Planned Budget</th>
                        <th className="text-left py-2">Actual Spend</th>
                        <th className="text-left py-2">ROI</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr className="border-b">
                        <td className="py-2">Google Ads</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">______%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Facebook/Instagram</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">______%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Local Directories</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">$______</td>
                        <td className="py-2">______%</td>
                      </tr>
                      <tr>
                        <td className="py-2 font-semibold">Total</td>
                        <td className="py-2 font-semibold">$______</td>
                        <td className="py-2 font-semibold">$______</td>
                        <td className="py-2 font-semibold">______%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-hvcg-blue text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Take Your Marketing to the Next Level?</h3>
              <p className="text-lg mb-6 text-white/90">
                Download today and start making your advertising work as hard as you do!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-hvcg-blue hover:bg-gray-100">
                  <Link to="/booking">
                    Schedule a Consultation
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-hvcg-blue">
                  <Link to="/resources/ai-copilot">
                    Try AI Copilot
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default MarketingChecklist;
