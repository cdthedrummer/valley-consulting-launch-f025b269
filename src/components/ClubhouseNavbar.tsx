import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const navSections = [
  { id: 'overview', label: 'OVERVIEW' },
  { id: 'pro-shop', label: 'PRO SHOP' },
  { id: 'vibe', label: 'THE VIBE' },
  { id: 'tech-stack', label: 'TECH STACK' },
  { id: 'scorecard', label: 'SCORECARD' },
];

const ClubhouseNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      if (location.pathname === '/') {
        const sections = navSections.map(s => s.id);
        for (const sectionId of sections.reverse()) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation and DOM update before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-5xl ${
        scrolled ? 'top-2' : 'top-6'
      }`}>
        <div className="bg-club-green/98 backdrop-blur-md rounded-pill shadow-2xl border-2 border-warm-cream/20">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="font-archivo text-warm-cream text-xl uppercase tracking-widest">
                HVCG
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`font-dm text-xs uppercase tracking-widest transition-colors relative ${
                    activeSection === section.id && location.pathname === '/'
                      ? 'text-action-yellow'
                      : 'text-warm-cream/80 hover:text-action-yellow'
                  }`}
                >
                  {section.label}
                  {activeSection === section.id && location.pathname === '/' && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-action-yellow" />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-6 py-2 font-dm font-bold uppercase tracking-wide text-sm transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
              >
                <Link to="/booking">
                  <Calendar className="mr-2 h-4 w-4" />
                  BOOK STRATEGY
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-warm-cream hover:text-action-yellow transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-club-green/98 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`font-dm text-xl uppercase tracking-widest transition-colors ${
                  activeSection === section.id && location.pathname === '/'
                    ? 'text-action-yellow'
                    : 'text-warm-cream hover:text-action-yellow'
                }`}
              >
                {section.label}
              </button>
            ))}
            <Button
              asChild
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide text-lg mt-4"
              onClick={() => setIsOpen(false)}
            >
              <Link to="/booking">
                <Calendar className="mr-2 h-5 w-5" />
                BOOK STRATEGY
              </Link>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClubhouseNavbar;
