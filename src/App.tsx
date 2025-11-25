
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

import ClubhouseNavbar from "./components/ClubhouseNavbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ClubhouseHome from "./pages/ClubhouseHome";
import About from "./pages/About";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Approach from "./pages/Approach";
import Resources from "./pages/Resources";
import MarketingChecklist from "./pages/MarketingChecklist";
import AICopilot from "./pages/AICopilot";
import AIDashboard from "./pages/AIDashboard";
import TrialExpired from "./pages/TrialExpired";
import PaymentSuccess from "./pages/PaymentSuccess";
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
import GEO from "./pages/services/GEO";
import Terms from "./pages/Terms";
import Refunds from "./pages/Refunds";
import Sitemap from "./pages/Sitemap";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import ElevenLabsConvaiWidget from "./components/ElevenLabsConvaiWidget";

// Render the Convai widget on all routes except the AI Dashboard
const ConvaiWidgetGate: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith("/ai/dashboard")) return null;
  return <ElevenLabsConvaiWidget />;
};

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-action-yellow focus:text-club-green focus:rounded-full focus:font-bold focus:shadow-lg"
              aria-label="Skip to main content"
            >
              Skip to main content
            </a>
            <div className="flex flex-col min-h-screen bg-club-green">
              <ClubhouseNavbar />
              <div className="h-24" aria-hidden="true" />
              <main id="main-content" className="flex-grow">
      <Routes>
        <Route path="/" element={<ClubhouseHome />} />
        <Route path="/classic" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/approach" element={<Approach />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/advertising" element={<Advertising />} />
                  <Route path="/services/seo" element={<SEO />} />
                  <Route path="/services/consulting" element={<Consulting />} />
                  <Route path="/services/geo" element={<GEO />} />
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
                  <Route path="/ai/trial-expired" element={<TrialExpired />} />
                  <Route 
                    path="/payment-success" 
                    element={
                      <ProtectedRoute>
                        <PaymentSuccess />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/refunds" element={<Refunds />} />
                  <Route path="/sitemap" element={<Sitemap />} />
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
              <BackToTopButton />
            </div>
            <Toaster />
            <ConvaiWidgetGate />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
