
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Approach from "./pages/Approach";
import Resources from "./pages/Resources";
import MarketingChecklist from "./pages/MarketingChecklist";
import AICopilot from "./pages/AICopilot";
import AIDashboard from "./pages/AIDashboard";
import Privacy from "./pages/Privacy";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CaseStudies from "./pages/CaseStudies";
import IndustriesIndex from "./pages/industries/index";
import HVAC from "./pages/industries/HVAC";
import Plumbing from "./pages/industries/Plumbing";
import Fencing from "./pages/industries/Fencing";
import DeckPatio from "./pages/industries/DeckPatio";
import Flooring from "./pages/industries/Flooring";

import Advertising from "./pages/services/Advertising";
import SEO from "./pages/services/SEO";
import Consulting from "./pages/services/Consulting";
import Testimonials from "./pages/Testimonials";
import Terms from "./pages/Terms";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="h-16 md:h-20" aria-hidden="true" />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/approach" element={<Approach />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/advertising" element={<Advertising />} />
                  <Route path="/services/seo" element={<SEO />} />
                  <Route path="/services/consulting" element={<Consulting />} />
                  <Route path="/booking" element={<Booking />} />
                  
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/marketing-checklist" element={<MarketingChecklist />} />
                  <Route path="/resources/ai-copilot" element={<AICopilot />} />
                  <Route 
                    path="/ai/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AIDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/terms" element={<Terms />} />
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
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
