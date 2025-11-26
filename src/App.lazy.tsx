import { lazy } from 'react';

// Lazy load heavy route components for code splitting
export const AICopilot = lazy(() => import('./pages/AICopilot'));
export const AIDashboard = lazy(() => import('./pages/AIDashboard'));
export const CaseStudies = lazy(() => import('./pages/CaseStudies'));
export const HVAC = lazy(() => import('./pages/industries/HVAC'));
export const Plumbing = lazy(() => import('./pages/industries/Plumbing'));
export const Fencing = lazy(() => import('./pages/industries/Fencing'));
export const DeckPatio = lazy(() => import('./pages/industries/DeckPatio'));
export const Flooring = lazy(() => import('./pages/industries/Flooring'));
export const Advertising = lazy(() => import('./pages/services/Advertising'));
export const SEO = lazy(() => import('./pages/services/SEO'));
export const Consulting = lazy(() => import('./pages/services/Consulting'));
export const GEO = lazy(() => import('./pages/services/GEO'));
export const WebsiteDevelopment = lazy(() => import('./pages/services/WebsiteDevelopment'));
