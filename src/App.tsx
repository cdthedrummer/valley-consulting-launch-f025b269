import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/contexts/AuthContext";

import ClubhouseNavbar from "./components/ClubhouseNavbar";
import Footer from "./components/Footer";
import ClubhouseHome from "./pages/ClubhouseHome";
import ScrollToTop from "./components/ScrollToTop";
import BackToTopButton from "./components/BackToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";

// Core pages
const Work = lazy(() => import("./pages/Work"));
const Services = lazy(() => import("./pages/Services"));
const Approach = lazy(() => import("./pages/Approach"));
const Booking = lazy(() => import("./pages/Booking"));

// Legal & utility pages
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refunds = lazy(() => import("./pages/Refunds"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth (hidden from nav but accessible)
const Auth = lazy(() => import("./pages/Auth"));

// AI Dashboard (protected, hidden from main nav)
const AIDashboard = lazy(() => import("./pages/AIDashboard"));

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
                    {/* Core pages */}
                    <Route path="/" element={<ClubhouseHome />} />
                    <Route path="/work" element={<Work />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/approach" element={<Approach />} />
                    <Route path="/booking" element={<Booking />} />
                    
                    {/* Redirects for old routes */}
                    <Route path="/about" element={<Navigate to="/approach" replace />} />
                    <Route path="/case-studies" element={<Navigate to="/work" replace />} />
                    <Route path="/resources" element={<Navigate to="/services" replace />} />
                    <Route path="/resources/ai-copilot" element={<Navigate to="/services" replace />} />
                    <Route path="/resources/marketing-checklist" element={<Navigate to="/services" replace />} />
                    <Route path="/industries" element={<Navigate to="/work" replace />} />
                    <Route path="/industries/*" element={<Navigate to="/work" replace />} />
                    <Route path="/services/*" element={<Navigate to="/services" replace />} />
                    <Route path="/classic" element={<Navigate to="/" replace />} />
                    
                    {/* AI Dashboard - hidden from nav but accessible for existing users */}
                    <Route
                      path="/ai/dashboard" 
                      element={
                        <ProtectedRoute>
                          <AIDashboard />
                        </ProtectedRoute>
                      } 
                    />
                    
                    {/* Auth */}
                    <Route path="/auth" element={<Auth />} />
                    
                    {/* Legal & utility pages */}
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/refunds" element={<Refunds />} />
                    <Route path="/sitemap" element={<Sitemap />} />
                    
                    {/* 404 */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <BackToTopButton />
            </div>
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
