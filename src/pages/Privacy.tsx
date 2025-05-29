
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
            <p className="mb-4">Effective Date: May 29, 2025</p>
            
            <p className="mb-6">Hudson Valley Consulting Group ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">a. Personal Information</h3>
            <p className="mb-4">We may collect personally identifiable information ("Personal Information") that you voluntarily provide to us when you:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Fill out contact forms</li>
              <li>Subscribe to newsletters</li>
              <li>Request information or services</li>
              <li>Communicate with us via email or other channels</li>
            </ul>
            <p className="mb-4">This information may include your name, email address, phone number, company name, and any other details you provide.</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-3">b. Non-Personal Information</h3>
            <p className="mb-4">We may also collect non-personal information automatically when you visit our website, such as:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed and time spent on our site</li>
              <li>Clickstream data</li>
            </ul>
            <p className="mb-4">This information helps us understand how visitors use our website and improve its functionality.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Respond to your inquiries and provide requested services</li>
              <li>Send newsletters and marketing communications (you can opt-out at any time)</li>
              <li>Improve our website and services</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Sharing of Information</h2>
            <p className="mb-4">We do not sell, rent, or lease your Personal Information to third parties. However, we may share your information with:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Service providers who assist in operating our website and conducting our business</li>
              <li>Law enforcement or regulatory agencies if required by law</li>
              <li>Other parties with your consent</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="mb-4">Our website may use cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device that help us understand user behavior and preferences. You can set your browser to refuse cookies or alert you when cookies are being sent. However, some parts of our website may not function properly without cookies.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Data Security</h2>
            <p className="mb-4">We implement appropriate technical and organizational measures to protect your Personal Information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure. Therefore, we cannot guarantee absolute security.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Your Rights and Choices</h2>
            <p className="mb-4">Depending on your location, you may have the following rights regarding your Personal Information:</p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>Access:</strong> Request access to the Personal Information we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your Personal Information.</li>
              <li><strong>Objection:</strong> Object to the processing of your Personal Information.</li>
              <li><strong>Restriction:</strong> Request restriction of processing your Personal Information.</li>
              <li><strong>Data Portability:</strong> Request transfer of your Personal Information to another party.</li>
            </ul>
            <p className="mb-4">To exercise these rights, please contact us using the contact information provided below.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">7. Third-Party Links</h2>
            <p className="mb-4">Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of such websites. We encourage you to read the privacy policies of any linked websites you visit.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>
            <p className="mb-4">Our website is not intended for children under the age of 13. We do not knowingly collect Personal Information from children under 13. If we become aware that we have inadvertently collected such information, we will take steps to delete it.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="mb-4">We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p>Hudson Valley Consulting Group<br/>
            Email: info@hudsonvalleycg.com<br/>
            Phone: (123) 456-7890</p>
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
