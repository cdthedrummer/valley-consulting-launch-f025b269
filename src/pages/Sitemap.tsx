import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { FileText, Home, Briefcase, Building2, BookOpen, FileCheck, Cpu } from "lucide-react";

const Sitemap: React.FC = () => {
  const sitemapSections = [
    {
      title: "Main Pages",
      icon: <Home className="h-5 w-5" />,
      pages: [
        { path: "/", label: "Home", description: "Hudson Valley Consulting - Marketing for contractors" },
        { path: "/approach", label: "Our Approach", description: "Enterprise-grade marketing methodology for local businesses" },
        { path: "/booking", label: "Book Consultation", description: "Schedule your free growth planning session" },
        { path: "/testimonials", label: "Testimonials", description: "Client success stories and reviews" },
        { path: "/case-studies", label: "Case Studies", description: "Detailed contractor marketing case studies" },
      ]
    },
    {
      title: "Services",
      icon: <Briefcase className="h-5 w-5" />,
      pages: [
        { path: "/services", label: "All Services", description: "Complete marketing services overview" },
        { path: "/services/advertising", label: "Advertising", description: "Google Ads and paid advertising management" },
        { path: "/services/seo", label: "SEO", description: "Local search engine optimization services" },
        { path: "/services/consulting", label: "Consulting", description: "Strategic marketing and business consulting" },
      ]
    },
    {
      title: "Industries We Serve",
      icon: <Building2 className="h-5 w-5" />,
      pages: [
        { path: "/industries", label: "All Industries", description: "Industries and trades we specialize in" },
        { path: "/industries/hvac", label: "HVAC", description: "Marketing for HVAC contractors" },
        { path: "/industries/plumbing", label: "Plumbing", description: "Marketing for plumbing companies" },
        { path: "/industries/fencing", label: "Fencing", description: "Marketing for fencing contractors" },
        { path: "/industries/deck-patio", label: "Deck & Patio", description: "Marketing for deck and patio builders" },
        { path: "/industries/flooring", label: "Flooring", description: "Marketing for flooring contractors" },
      ]
    },
    {
      title: "Resources & Tools",
      icon: <BookOpen className="h-5 w-5" />,
      pages: [
        { path: "/resources", label: "Resources Hub", description: "Marketing guides and tools for contractors" },
        { path: "/resources/marketing-checklist", label: "Marketing Checklist", description: "Essential contractor marketing checklist" },
        { path: "/resources/ai-copilot", label: "AI Copilot", description: "AI-powered marketing assistant overview" },
        { path: "/resources/ai-dashboard-sell-in", label: "AI Dashboard Features", description: "Explore AI dashboard capabilities" },
      ]
    },
    {
      title: "AI-Powered Platform",
      icon: <Cpu className="h-5 w-5" />,
      pages: [
        { path: "/ai/dashboard", label: "AI Dashboard", description: "Your personalized marketing intelligence dashboard (requires login)" },
        { path: "/auth", label: "Sign In", description: "Access your AI dashboard account" },
      ]
    },
    {
      title: "Legal & Policies",
      icon: <FileCheck className="h-5 w-5" />,
      pages: [
        { path: "/privacy", label: "Privacy Policy", description: "How we protect your data" },
        { path: "/terms", label: "Terms of Service", description: "Terms and conditions" },
        { path: "/refunds", label: "Refund Policy", description: "Subscription and refund information" },
      ]
    }
  ];

  // Schema.org structured data for sitemap
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Hudson Valley Consulting Sitemap",
    "description": "Complete site navigation and page directory",
    "itemListElement": sitemapSections.flatMap((section, sectionIndex) =>
      section.pages.map((page, pageIndex) => ({
        "@type": "ListItem",
        "position": sectionIndex * 10 + pageIndex + 1,
        "name": page.label,
        "url": `https://hudsonvalleycg.com${page.path}`,
        "description": page.description
      }))
    )
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Sitemap | Hudson Valley Consulting"
        description="Complete site navigation for Hudson Valley Consulting. Find all our services, industries, resources, and tools for contractor marketing."
        canonicalUrl="/sitemap"
        keywords="sitemap, site navigation, contractor marketing services, HVAC marketing, plumbing marketing"
      />
      
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Header */}
      <header className="bg-hvcg-blue-dark text-white py-16 md:py-20">
        <div className="container-custom text-center">
          <FileText className="h-16 w-16 mx-auto mb-4 text-hvcg-green" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
          <p className="text-white/90 max-w-2xl mx-auto text-lg">
            Complete navigation and directory of all pages, services, and resources
          </p>
        </div>
      </header>

      {/* Sitemap Content */}
      <main className="container-custom py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {sitemapSections.map((section, index) => (
            <section key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-hvcg-blue-dark">{section.icon}</div>
                <h2 className="text-2xl font-bold text-hvcg-blue-dark">{section.title}</h2>
              </div>
              
              <ul className="space-y-4">
                {section.pages.map((page, pageIndex) => (
                  <li key={pageIndex} className="border-l-2 border-hvcg-green pl-4 hover:border-hvcg-green-dark transition-colors">
                    <Link 
                      to={page.path} 
                      className="block group"
                      itemProp="url"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-hvcg-blue-dark group-hover:text-hvcg-green transition-colors text-lg">
                            {page.label}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1">
                            {page.description}
                          </p>
                        </div>
                        <code className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded font-mono whitespace-nowrap">
                          {page.path}
                        </code>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* XML Sitemap Reference */}
        <div className="max-w-5xl mx-auto mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-hvcg-blue-dark mb-2">For Search Engines</h2>
          <p className="text-gray-600 mb-3">
            Our XML sitemap is available for automated crawling and indexing:
          </p>
          <a 
            href="/sitemap.xml" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-hvcg-green hover:text-hvcg-green-dark font-medium"
          >
            <FileText className="h-4 w-4 mr-2" />
            View XML Sitemap (sitemap.xml)
          </a>
        </div>

        {/* Bot Information */}
        <div className="max-w-5xl mx-auto mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-lg font-semibold text-hvcg-blue-dark mb-2">Bot & Crawler Information</h2>
          <div className="text-gray-700 space-y-2 text-sm">
            <p><strong>Total Pages:</strong> {sitemapSections.reduce((acc, section) => acc + section.pages.length, 0)}</p>
            <p><strong>Last Updated:</strong> {new Date().toISOString().split('T')[0]}</p>
            <p><strong>Update Frequency:</strong> Weekly for main pages, monthly for legal pages</p>
            <p><strong>Primary Domain:</strong> https://hudsonvalleycg.com</p>
            <p><strong>Content Type:</strong> Contractor marketing services, resources, and AI-powered tools</p>
            <p><strong>Target Audience:</strong> HVAC, plumbing, fencing, flooring, deck/patio contractors in Hudson Valley, NY</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sitemap;
