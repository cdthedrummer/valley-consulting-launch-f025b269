
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import logoWhiteWide from "@/assets/logos/hvcg-logo-white-wide.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-club-green text-warm-cream">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img src={logoWhiteWide} alt="HVCG - Hudson Valley Consulting Group" className="h-10 w-auto mb-4" />
            <p className="mb-4 text-warm-cream/80">
              Website development and Google search optimization for contractors in the Hudson Valley.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="hover:text-action-yellow transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-action-yellow transition-colors">Industries</Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-action-yellow transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-action-yellow transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-action-yellow transition-colors">Book a Call</Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-action-yellow transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/sitemap" className="hover:text-action-yellow transition-colors">Sitemap</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">What We Do</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#website" className="hover:text-action-yellow transition-colors">Website Development</Link>
              </li>
              <li>
                <Link to="/services#seo" className="hover:text-action-yellow transition-colors">Google Search Setup</Link>
              </li>
              <li>
                <Link to="/services#google-ads" className="hover:text-action-yellow transition-colors">Google Ads</Link>
              </li>
              <li>
                <Link to="/services#social-media" className="hover:text-action-yellow transition-colors">Social Media</Link>
              </li>
              <li>
                <Link to="/services#consulting" className="hover:text-action-yellow transition-colors">Marketing Consulting</Link>
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
                  href="https://share.google/LTKY4PPSzk6va0vVB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-action-yellow transition-colors"
                  aria-label="View our Google Business Profile"
                >
                  Find us on Google
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
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
