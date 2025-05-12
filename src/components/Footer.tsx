
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hvcg-blue-dark text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Hudson Valley Consulting</h3>
            <p className="mb-4 text-gray-200">
              Premium advertising consulting and training tailored specifically to local contractors.
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-hvcg-green" />
                <a href="mailto:contact@hvcg.com" className="text-gray-200 hover:text-white">
                  contact@hvcg.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-hvcg-green" />
                <a href="tel:+18455551234" className="text-gray-200 hover:text-white">
                  (845) 555-1234
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-hvcg-green" />
                <span className="text-gray-200">Hudson Valley, NY</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-200 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-200 hover:text-white">Services</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-200 hover:text-white">Testimonials</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-200 hover:text-white">About</Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-200 hover:text-white">Book an Appointment</Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-gray-200">
              Join our newsletter to stay updated with industry insights and new services.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-white/10 text-white placeholder-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-hvcg-green"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-hvcg-green text-white rounded-r-md hover:bg-hvcg-green-light transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-6 border-t border-white/20 text-center text-gray-300">
          <p>© {currentYear} Hudson Valley Consulting. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            {" | "}
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
