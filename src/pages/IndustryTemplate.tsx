import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";

interface ImageProps {
  src: string;
  alt: string;
}

interface IndustryTemplateProps {
  industryName: string;
  region?: string;
  heroImage: string;
  challenges: string[];
  solutions: string[];
  images?: ImageProps[];
  faqs?: { question: string; answer: string }[];
}

const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
  industryName,
  region = "Hudson Valley",
  heroImage,
  challenges,
  solutions,
  images = [],
  faqs = [],
}) => {
  const location = useLocation();
  const siteUrl = "https://hudsonvalleycg.com";
  const pageUrl = `${siteUrl}${location.pathname}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` },
      { "@type": "ListItem", position: 3, name: industryName, item: pageUrl },
    ],
  };
  return (
    <div className="pt-20">
      <SEOHead
        title={`${industryName} Marketing in ${region} | Hudson Valley Consulting`}
        description={`Marketing for ${industryName} contractors in ${region}: local SEO, ads, and consulting to grow leads.`}
        canonicalUrl={location.pathname}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      {/* Breadcrumbs */}
      <div className="container-custom">
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li><Link to="/">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/industries">Industries</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-800" aria-current="page">{industryName}</li>
          </ol>
        </nav>
      </div>
      {/* Hero Section */}
      <section className="relative bg-hvcg-blue-dark py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={heroImage}
            alt={`${industryName} Contractor in ${region}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `/images/industries/${industryName.toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-')}/${industryName.toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-')}-hero.jpg`;
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              {industryName} Marketing & Consulting in {region}
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Get more local leads, stand out from competitors, and grow your {industryName.toLowerCase()} business with our specialized marketing expertise.
            </p>
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Grow My {industryName} Business – Get Help
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Challenges and Solutions */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Challenges Section */}
            <div>
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-6">
                Challenges {industryName} Contractors Face
              </h2>
              <div className="space-y-6">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-2">Challenge {index + 1}</h3>
                    <p className="text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Solutions Section */}
            <div>
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-6">
                How We Help {industryName} Contractors
              </h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-hvcg-green rounded-full p-1 mt-1 mr-4 flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-700">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-hvcg-gray rounded-lg">
                <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-3">Our Approach for {industryName} Contractors</h3>
                <p className="text-gray-700 mb-4">
                  We understand the unique challenges that {industryName.toLowerCase()} contractors face in the {region} market. Our tailored marketing and advertising strategies are designed to help you:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Reach homeowners when they're actively looking for {industryName.toLowerCase()} services</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Showcase your expertise and quality work to potential customers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Convert more leads into booked jobs and loyal customers</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
                    <span>Build a strong local reputation that drives referrals</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Gallery Section - New section */}
      {images && images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-8 text-center">
              {industryName} Projects in {region}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={image.src} 
                    alt={image.alt || `${industryName} project example ${index + 1} in ${region}`} 
                    className="w-full h-64 object-cover transition-transform hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      const slug = `${industryName.toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-')}`;
                      e.currentTarget.src = `/images/industries/${slug}/${slug}-${index + 1}.jpg`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Case Study Highlight */}
      <section className="py-16 bg-hvcg-gray">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">
              Success Story: {region} {industryName} Contractor
            </h2>
            <p className="text-lg text-gray-700">
              See how we helped a local {industryName.toLowerCase()} contractor grow their business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4 flex items-center">
                <span className="bg-hvcg-blue/10 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hvcg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8.43 12h.01M12.43 12h.01M16.43 12h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8Z" />
                  </svg>
                </span>
                Challenge
              </h3>
              <p className="text-gray-700">
                A local {industryName.toLowerCase()} contractor was struggling to get consistent leads and relied too much on word-of-mouth. They were spending money on generic advertising with poor results.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4 flex items-center">
                <span className="bg-hvcg-blue/10 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hvcg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v3M18.5 8.5l-2.5 2.5M21 12h-3M18.5 15.5l-2.5-2.5M12 21v-3M7.5 15.5l2.5-2.5M3 12h3M7.5 8.5l2.5 2.5M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  </svg>
                </span>
                Solution
              </h3>
              <p className="text-gray-700">
                We created a targeted digital advertising strategy focused on local homeowners searching for {industryName.toLowerCase()} services, optimized their Google Business Profile, and improved their online reputation.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-4 flex items-center">
                <span className="bg-hvcg-blue/10 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-hvcg-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m16 6 4 14M12 6v14M8 8v12M4 4v16" />
                  </svg>
                </span>
                Results
              </h3>
              <p className="text-gray-700">
                Within 3 months, the contractor saw a 170% increase in qualified leads, a 40% higher conversion rate, and was able to be more selective with the jobs they took, focusing on higher-value projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {faqs && faqs.length > 0 && (
        <div className="container mx-auto px-4">
          <FAQSection title={`${industryName} marketing: frequently asked questions`} faqs={faqs} />
        </div>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your {industryName} Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Schedule your free consultation today and discover how we can help your {industryName.toLowerCase()} contracting business thrive in {region}.
          </p>
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
            <Link to="/booking" className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> Book Your Free Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndustryTemplate;
