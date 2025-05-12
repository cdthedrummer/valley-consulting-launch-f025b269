import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Mail, Check } from "lucide-react";

const Resources: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this to your backend or email service
    console.log("Lead magnet requested by:", name, email);
    // Show success message
    setSubmitted(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Free Contractor Resources</h1>
            <p className="text-xl text-white/90">
              Access our collection of free guides, checklists, and tools designed specifically for contractors in Hudson Valley.
            </p>
          </div>
        </div>
      </section>
      
      {/* Lead Magnet Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">
                Download Our FREE Contractor Marketing Checklist
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                This comprehensive checklist will help you assess your current marketing efforts and identify opportunities for improvement. Perfect for busy contractors who want to attract more local customers.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">20-point advertising checklist specifically for contractors</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Local SEO quick-start guide to rank higher in Hudson Valley</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">3 ready-to-use templates for responding to customer inquiries</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">Budget planning worksheet for local advertising</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
                <p className="font-medium text-yellow-800">
                  Over 200 local contractors have already downloaded this valuable resource!
                </p>
              </div>
            </div>
            
            <div>
              <Card className="border-none shadow-lg">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2">Thank You!</h3>
                      <p className="text-gray-700 mb-4">
                        Check your email inbox for the Marketing Checklist PDF.
                      </p>
                      <p className="text-sm text-gray-600">
                        If you don't see it, please check your spam folder.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-6 text-center">
                        Get Your Free Checklist
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full bg-hvcg-green hover:bg-hvcg-green-light">
                          <Download className="mr-2 h-4 w-4" /> Download Now
                        </Button>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          We respect your privacy. We'll never share your information.
                        </p>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Other Resources */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">More Resources Coming Soon</h2>
            <p className="text-lg text-gray-700">
              We're constantly developing new resources to help contractors like you succeed.
              Sign up for our newsletter to be notified when new resources are available.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1"
                required
              />
              <Button className="bg-hvcg-blue-dark hover:bg-hvcg-blue whitespace-nowrap">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;
