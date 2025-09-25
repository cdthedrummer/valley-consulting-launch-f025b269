
import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  image?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({ 
  title, 
  description, 
  canonicalUrl, 
  keywords,
  image = "https://lovable.app/lovable-uploads/da252d5c-59e9-44e2-a866-09f08e917fa9.jpg"
}) => {
  const siteUrl = "https://hudsonvalleycg.com";
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  // Enhanced SEO for dashboard-first strategy
  const isDashboardPage = canonicalUrl?.includes('/ai/dashboard') || canonicalUrl?.includes('/dashboard');
  const defaultTitle = isDashboardPage 
    ? "AI-Powered Marketing Dashboard | Hudson Valley Consulting"
    : title;
  const defaultDescription = isDashboardPage
    ? "Real-time market intelligence and AI-driven insights for contractors. Launch your dashboard to access local data, competitor analysis, and personalized marketing strategies."
    : description;
  
  return (
    <Helmet>
      <title>{defaultTitle}</title>
      <meta name="description" content={defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullUrl} />
      
      {/* Enhanced meta tags for dashboard focus */}
      {isDashboardPage && (
        <>
          <meta name="robots" content="index, follow" />
          <meta name="application-name" content="Hudson Valley Marketing Dashboard" />
          <meta name="apple-mobile-web-app-title" content="Marketing Dashboard" />
          <meta name="theme-color" content="#0066cc" />
        </>
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={defaultDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
