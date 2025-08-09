
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhyChooseSection from "./WhyChooseSection";

interface ServiceDetailLayoutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  approachTitle: string;
  approachDescription: React.ReactNode;
  servicesList: string[];
  whyChooseTitle: string;
  whyChooseFeatures: Array<{
    title: string;
    description: string;
  }>;
}

const ServiceDetailLayout: React.FC<ServiceDetailLayoutProps> = ({
  icon,
  title,
  description,
  approachTitle,
  approachDescription,
  servicesList,
  whyChooseTitle,
  whyChooseFeatures,
}) => {
  const location = useLocation();
  const siteUrl = "https://hudsonvalleycg.com";
  const pageUrl = `${siteUrl}${location.pathname}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: title, item: pageUrl },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: {
      "@type": "Organization",
      name: "Hudson Valley Consulting",
      url: siteUrl,
    },
    areaServed: "Hudson Valley, NY",
    url: pageUrl,
  };

  return (
    <div className="container mx-auto py-12 px-4">
<nav className="mb-6 text-sm" aria-label="Breadcrumb">
  <ol className="flex items-center space-x-2 text-gray-600">
    <li>
      <Link to="/" className="hover:text-hvcg-blue">Home</Link>
    </li>
    <li aria-hidden="true">/</li>
    <li>
      <Link to="/services" className="hover:text-hvcg-blue">Services</Link>
    </li>
    <li aria-hidden="true">/</li>
    <li className="text-gray-800" aria-current="page">{title}</li>
  </ol>
</nav>
<Helmet>
  <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
  <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
</Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-hvcg-blue-dark mb-4">{title}</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">{approachTitle}</h2>
          {approachDescription}
          <h3 className="text-xl font-semibold text-hvcg-blue-dark mt-6 mb-2">Our {title} Services Include:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            {servicesList.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
        
        <WhyChooseSection 
          title={whyChooseTitle} 
          features={whyChooseFeatures} 
        />
      </div>
    </div>
  );
};

export default ServiceDetailLayout;
