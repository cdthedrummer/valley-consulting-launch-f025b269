
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-hvcg-blue-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hudson Valley Consulting</h3>
            <p className="mb-4 text-white/80">
              Marketing and consulting services designed specifically for contractors in the Hudson Valley region.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-hvcg-green transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-hvcg-green transition-colors">Industries</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-hvcg-green transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-hvcg-green transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-hvcg-green transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-hvcg-green transition-colors">Book a Consultation</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-hvcg-green transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#google-ads" className="hover:text-hvcg-green transition-colors">Google Ads</Link>
              </li>
              <li>
                <Link to="/services#seo" className="hover:text-hvcg-green transition-colors">Search Engine Optimization</Link>
              </li>
              <li>
                <Link to="/services#social-media" className="hover:text-hvcg-green transition-colors">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/services#website" className="hover:text-hvcg-green transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services#consulting" className="hover:text-hvcg-green transition-colors">Business Consulting</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-hvcg-green" />
                <span>(845) 675-8378</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-hvcg-green" />
                <span>contact@hvcg.us</span>
              </li>
              <li className="flex items-start">
                <a
                  href="https://share.google/LTKY4PPSzk6va0vVB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-hvcg-green transition-colors"
                  aria-label="View our Google Business Profile"
                >
                  Find us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-white/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} Hudson Valley Consulting. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-white/70 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2 text-white/50">|</span>
            <Link to="/terms" className="text-sm text-white/70 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
