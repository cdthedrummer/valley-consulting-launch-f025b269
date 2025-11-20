
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-background to-muted border-t border-primary/10">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-primary">Hudson Valley Consulting</h3>
            <p className="mb-4 text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">
              Marketing and consulting services designed specifically for contractors in the Hudson Valley region.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Services</Link>
              </li>
              <li>
                <Link to="/industries" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Industries</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Testimonials</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">About Us</Link>
              </li>
              <li>
                <Link to="/resources" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Resources</Link>
              </li>
              <li>
                <Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Book a Consultation</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Sitemap</Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services#google-ads" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Google Ads</Link>
              </li>
              <li>
                <Link to="/services#seo" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Search Engine Optimization</Link>
              </li>
              <li>
                <Link to="/services#social-media" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Social Media Marketing</Link>
              </li>
              <li>
                <Link to="/services#website" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Website Development</Link>
              </li>
              <li>
                <Link to="/services#consulting" className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm uppercase tracking-wider font-semibold">Business Consulting</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground">(845) 675-8378</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground">contact@hvcg.us</span>
              </li>
              <li className="flex items-start">
                <a
                  href="https://share.google/LTKY4PPSzk6va0vVB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors duration-300 text-sm uppercase tracking-wider font-semibold underline"
                  aria-label="View our Google Business Profile"
                >
                  Find us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="border-t border-primary/10">
        <div className="container-custom py-6">
          <p className="text-center text-muted-foreground text-sm normal-case tracking-normal">
            © {currentYear} Hudson Valley Consulting Group. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
