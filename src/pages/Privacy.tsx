
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="py-16 bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-hvcg-blue-dark mb-6">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="mb-4">Last Updated: May 12, 2025</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
            <p>Hudson Valley Consulting ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy describes how we collect, use, and disclose information about visitors to our website.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>We collect information that you provide directly to us, such as when you fill out a contact form, request a consultation, or subscribe to our newsletter. This information may include:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Information about your contracting business</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respond to your inquiries and provide the services you request</li>
              <li>Send you marketing communications about our products and services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to track activity on our website and to hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share your information with service providers who help us operate our website and conduct our business.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at contact@hvcg.us.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p>Hudson Valley Consulting<br/>
            123 Main Street<br/>
            Kingston, NY 12401<br/>
            contact@hvcg.us<br/>
            (845) 675-8378</p>
          </div>
          
          <div className="mt-10">
            <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
