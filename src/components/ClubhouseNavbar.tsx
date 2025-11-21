import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const ClubhouseNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Pill Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] max-w-4xl ${
        scrolled ? 'top-2' : 'top-6'
      }`}>
        <div className="bg-club-green/95 backdrop-blur-md rounded-pill shadow-2xl border border-warm-cream/10">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="font-archivo text-warm-cream text-xl uppercase tracking-widest">
                HVCG
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('overview')}
                className="font-dm text-xs uppercase tracking-widest text-warm-cream/80 hover:text-action-yellow transition-colors"
              >
                OVERVIEW
              </button>
              <button
                onClick={() => scrollToSection('vibe')}
                className="font-dm text-xs uppercase tracking-widest text-warm-cream/80 hover:text-action-yellow transition-colors"
              >
                THE VIBE
              </button>
              <button
                onClick={() => scrollToSection('tech-stack')}
                className="font-dm text-xs uppercase tracking-widest text-warm-cream/80 hover:text-action-yellow transition-colors"
              >
                TECH STACK
              </button>
              <button
                onClick={() => scrollToSection('scorecard')}
                className="font-dm text-xs uppercase tracking-widest text-warm-cream/80 hover:text-action-yellow transition-colors"
              >
                SCORECARD
              </button>
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
            <button
              onClick={() => scrollToSection('overview')}
              className="font-dm text-xl uppercase tracking-widest text-warm-cream hover:text-action-yellow transition-colors"
            >
              OVERVIEW
            </button>
            <button
              onClick={() => scrollToSection('vibe')}
              className="font-dm text-xl uppercase tracking-widest text-warm-cream hover:text-action-yellow transition-colors"
            >
              THE VIBE
            </button>
            <button
              onClick={() => scrollToSection('tech-stack')}
              className="font-dm text-xl uppercase tracking-widest text-warm-cream hover:text-action-yellow transition-colors"
            >
              TECH STACK
            </button>
            <button
              onClick={() => scrollToSection('scorecard')}
              className="font-dm text-xl uppercase tracking-widest text-warm-cream hover:text-action-yellow transition-colors"
            >
              SCORECARD
            </button>
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
