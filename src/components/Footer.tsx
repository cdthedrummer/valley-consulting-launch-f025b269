import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin } from "lucide-react";
import logoWhiteWide from "@/assets/logos/hvcg-logo-white-wide.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-club-green text-warm-cream">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <img src={logoWhiteWide} alt="HVCG" className="h-10 w-auto mb-4" />
            <p className="mb-4 text-warm-cream/80">
              Professional websites for contractors. Clean design, fair pricing, 4-week delivery.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Pages</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/work" className="hover:text-action-yellow transition-colors">Our Work</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-action-yellow transition-colors">Services & Pricing</Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-action-yellow transition-colors">About</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-action-yellow transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 text-action-yellow" />
                <span>(845) 675-8378</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 text-action-yellow" />
                <span>contact@hvcg.us</span>
              </li>
              <li className="flex items-start">
                <a 
                  href="https://www.linkedin.com/in/charliedickerson/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center hover:text-action-yellow transition-colors"
                >
                  <Linkedin className="mr-2 h-5 w-5 flex-shrink-0 text-action-yellow" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="my-8 border-warm-cream/20" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-cream/70 text-sm">
            &copy; {currentYear} Hudson Valley Consulting Group. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/privacy" className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors">
              Privacy Policy
            </Link>
            <span className="mx-2 text-warm-cream/50">|</span>
            <Link to="/terms" className="text-sm text-warm-cream/70 hover:text-warm-cream transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
