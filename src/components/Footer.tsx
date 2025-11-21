import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-club-green text-warm-cream overflow-hidden">
      {/* Massive Watermark */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
        <div className="font-heading text-[15vw] leading-none text-warm-cream/5 whitespace-nowrap mb-8">
          HUDSON VALLEY
        </div>
      </div>
      
      <div className="container-custom py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-3xl mb-6">HVC</h3>
            <p className="text-warm-cream/80 text-lg leading-relaxed">
              Architecting Local Dominance.
            </p>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="font-bold text-warm-cream mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-warm-cream/70 hover:text-gold-accent transition-colors">About</Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-warm-cream/70 hover:text-gold-accent transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-warm-cream/70 hover:text-gold-accent transition-colors">Legal</Link>
              </li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h4 className="font-bold text-warm-cream mb-6 uppercase tracking-wider text-sm">Solutions</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-warm-cream/70 hover:text-gold-accent transition-colors">Strategy</Link>
              </li>
              <li>
                <Link to="/ai/dashboard" className="text-warm-cream/70 hover:text-gold-accent transition-colors">AI Platform</Link>
              </li>
              <li>
                <Link to="/resources" className="text-warm-cream/70 hover:text-gold-accent transition-colors">Audits</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold text-warm-cream mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-warm-cream/70">
                <Mail className="h-5 w-5 text-gold-accent flex-shrink-0" />
                <span>contact@hvcg.us</span>
              </li>
              <li className="flex items-center gap-3 text-warm-cream/70">
                <Phone className="h-5 w-5 text-gold-accent flex-shrink-0" />
                <span>(845) 675-8378</span>
              </li>
              <li>
                <a
                  href="https://share.google/LTKY4PPSzk6va0vVB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warm-cream/70 hover:text-gold-accent transition-colors inline-flex items-center gap-2"
                >
                  Find us on Google
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-warm-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-cream/50 text-sm">
            &copy; {currentYear} Hudson Valley Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-warm-cream/50 hover:text-warm-cream transition-colors text-sm">
              Privacy
            </Link>
            <Link to="/terms" className="text-warm-cream/50 hover:text-warm-cream transition-colors text-sm">
              Terms
            </Link>
            <Link to="/sitemap" className="text-warm-cream/50 hover:text-warm-cream transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
