
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Testimonials from "./pages/Testimonials";
import Resources from "./pages/Resources";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import IndustriesIndex from "./pages/industries/index";
import HVAC from "./pages/industries/HVAC";
import Plumbing from "./pages/industries/Plumbing";
import Fencing from "./pages/industries/Fencing";
import DeckPatio from "./pages/industries/DeckPatio";
import Flooring from "./pages/industries/Flooring";

import Advertising from "./pages/services/Advertising";
import SEO from "./pages/services/SEO";
import Consulting from "./pages/services/Consulting";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/advertising" element={<Advertising />} />
              <Route path="/services/seo" element={<SEO />} />
              <Route path="/services/consulting" element={<Consulting />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/industries" element={<IndustriesIndex />} />
              <Route path="/industries/hvac" element={<HVAC />} />
              <Route path="/industries/plumbing" element={<Plumbing />} />
              <Route path="/industries/fencing" element={<Fencing />} />
              <Route path="/industries/deck-patio" element={<DeckPatio />} />
              <Route path="/industries/flooring" element={<Flooring />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
