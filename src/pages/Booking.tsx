
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, Calendar, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Booking: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16">
        <div className="container-custom text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book a Consultation</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Take the first step towards transforming your advertising strategy. Schedule a consultation or reach out with any questions.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly Integration Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-6">Schedule a Consultation</h2>
              <p className="text-gray-700 mb-6">
                Use our online calendar to find a time that works for you. Consultations are conducted via Zoom.
              </p>
              
              {/* Placeholder for Calendly - would be replaced with actual Calendly embed */}
              <div className="bg-hvcg-gray rounded-lg p-8 text-center mb-8">
                <Calendar className="w-16 h-16 text-hvcg-blue-dark mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Calendar Integration</h3>
                <p className="text-gray-700 mb-4">
                  This is where the Calendly booking widget will appear.
                </p>
                <p className="text-sm text-gray-500">
                  (This will be connected via Calendly integration)
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hvcg-blue-dark">What to Expect:</h3>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">1</span>
                  </div>
                  <p className="text-gray-700">
                    Select your preferred service and consultation time from the calendar.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">2</span>
                  </div>
                  <p className="text-gray-700">
                    Complete a brief questionnaire about your business and advertising goals.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">3</span>
                  </div>
                  <p className="text-gray-700">
                    Receive a confirmation email with meeting details and preparation tips.
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="bg-hvcg-blue/10 w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="font-bold text-hvcg-blue-dark">4</span>
                  </div>
                  <p className="text-gray-700">
                    Meet virtually to discuss your advertising needs and explore how we can help.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-6">Get in Touch</h2>
              <p className="text-gray-700 mb-6">
                Have questions or need more information? Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                    Interested In
                  </label>
                  <select
                    id="service"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                  >
                    <option value="">Select a service</option>
                    <option value="Introductory Audit & Consultation">Introductory Audit & Consultation</option>
                    <option value="Strategy Package">Strategy Package</option>
                    <option value="Premium Retainer">Premium Retainer</option>
                    <option value="Other">Other/Not Sure</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-hvcg-blue focus:border-hvcg-blue"
                    required
                    placeholder="Tell us a bit about your business and what you're looking to achieve with your advertising."
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full bg-hvcg-blue-dark hover:bg-hvcg-blue flex items-center justify-center">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Direct Contact Section */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Email */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Mail className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Email</h3>
                <a href="mailto:contact@hvcg.com" className="text-hvcg-blue hover:underline">
                  contact@hvcg.com
                </a>
              </CardContent>
            </Card>
            
            {/* Phone */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Phone className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Phone</h3>
                <a href="tel:+18455551234" className="text-hvcg-blue hover:underline">
                  (845) 555-1234
                </a>
              </CardContent>
            </Card>
            
            {/* Location */}
            <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mx-auto bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-hvcg-blue-dark">Location</h3>
                <p className="text-gray-700">
                  Serving contractors throughout the Hudson Valley, NY
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">How much does it cost to work with you?</h3>
              <p className="text-gray-700">
                We offer transparent, fixed pricing for our services: $500 for an Introductory Audit, $2,000 for our Strategy Package, and $1,500/month for our Premium Retainer service.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">What happens after I book a consultation?</h3>
              <p className="text-gray-700">
                You'll receive a confirmation email with meeting details and a brief questionnaire to help us prepare. During the consultation, we'll discuss your business, advertising goals, and how our services can help you achieve them.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">Do you have a refund policy?</h3>
              <p className="text-gray-700">
                Yes, we stand behind our services. If you're not satisfied with the quality of our work, we'll either redo it or provide a refund, depending on the circumstances.
              </p>
            </div>
            
            {/* FAQ Item */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-hvcg-blue-dark">How quickly can we get started?</h3>
              <p className="text-gray-700">
                Typically, we can schedule an initial consultation within 1-2 weeks. For project work, we generally get started within 1-3 weeks of contract signing, depending on our current client load.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 text-white/90">
            Book your consultation today and take the first step toward transforming your contracting business with expert advertising strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <a href="#" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Consultation
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              <Link to="/services" className="flex items-center">
                Learn About Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
