import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoWhiteWide from "@/assets/logos/hvcg-logo-white-wide.png";

const navLinks = [
  { path: '/work', label: 'WORK' },
  { path: '/services', label: 'SERVICES' },
  { path: '/approach', label: 'ABOUT' },
  { path: '/booking', label: 'CONTACT' },
];

const ClubhouseNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-4xl ${
        scrolled ? 'top-2' : 'top-6'
      }`}>
        <div className="bg-club-green/95 backdrop-blur-sm rounded-pill shadow-2xl border border-warm-cream/10">
          <div className="px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src={logoWhiteWide} 
                alt="HVCG" 
                className="h-8 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-dm text-sm uppercase tracking-widest transition-colors relative ${
                    isActive(link.path)
                      ? 'text-action-yellow'
                      : 'text-warm-cream/80 hover:text-action-yellow'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-action-yellow" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-6 py-2 font-dm font-bold uppercase tracking-wide text-sm transition-all hover:-translate-y-0.5 hover:shadow-lift active:scale-95"
              >
                <Link to="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  BOOK A CALL
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-warm-cream hover:text-action-yellow transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-club-green md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            <Link 
              to="/" 
              onClick={() => setIsOpen(false)}
              className="font-dm text-xl uppercase tracking-widest text-warm-cream hover:text-action-yellow transition-colors"
            >
              HOME
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`font-dm text-xl uppercase tracking-widest transition-colors ${
                  isActive(link.path)
                    ? 'text-action-yellow font-bold'
                    : 'text-warm-cream hover:text-action-yellow'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide text-lg mt-4"
            >
              <Link to="/booking" onClick={() => setIsOpen(false)}>
                <Calendar className="mr-2 h-5 w-5" />
                BOOK A CALL
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClubhouseNavbar;
