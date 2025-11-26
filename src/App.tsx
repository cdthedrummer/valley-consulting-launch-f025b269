
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

import ClubhouseNavbar from "./components/ClubhouseNavbar";
import Footer from "./components/Footer";
import ClubhouseHome from "./pages/ClubhouseHome";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load heavy pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Booking = lazy(() => import("./pages/Booking"));
const Approach = lazy(() => import("./pages/Approach"));
const Resources = lazy(() => import("./pages/Resources"));
const MarketingChecklist = lazy(() => import("./pages/MarketingChecklist"));
const AICopilot = lazy(() => import("./pages/AICopilot"));
const AIDashboard = lazy(() => import("./pages/AIDashboard"));
const TrialExpired = lazy(() => import("./pages/TrialExpired"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const IndustriesIndex = lazy(() => import("./pages/industries/index"));
const HVAC = lazy(() => import("./pages/industries/HVAC"));
const Plumbing = lazy(() => import("./pages/industries/Plumbing"));
const Fencing = lazy(() => import("./pages/industries/Fencing"));
const DeckPatio = lazy(() => import("./pages/industries/DeckPatio"));
const Flooring = lazy(() => import("./pages/industries/Flooring"));
const Advertising = lazy(() => import("./pages/services/Advertising"));
const SEO = lazy(() => import("./pages/services/SEO"));
const Consulting = lazy(() => import("./pages/services/Consulting"));
const GEO = lazy(() => import("./pages/services/GEO"));
const WebsiteDevelopment = lazy(() => import("./pages/services/WebsiteDevelopment"));
const Terms = lazy(() => import("./pages/Terms"));
const Refunds = lazy(() => import("./pages/Refunds"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const ElevenLabsConvaiWidget = lazy(() => import("./components/ElevenLabsConvaiWidget"));

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
              <main id="main-content" className="flex-grow">
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action-yellow"></div>
                  </div>
                }>
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
                    <Route path="/services/website-development" element={<WebsiteDevelopment />} />
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
                </Suspense>
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
