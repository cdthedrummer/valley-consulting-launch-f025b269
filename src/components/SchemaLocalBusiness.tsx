import React from "react";
import { Helmet } from "react-helmet-async";

interface SchemaLocalBusinessProps {
  name?: string;
  url?: string;
  sameAs?: string[];
}

const SchemaLocalBusiness: React.FC<SchemaLocalBusinessProps> = ({
  name = "Hudson Valley Consulting",
  url = "https://hudsonvalleycg.com",
  sameAs = [
    "https://www.linkedin.com/in/charliemarketing",
    "https://share.google/LTKY4PPSzk6va0vVB",
  ],
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name,
    url,
    sameAs,
    areaServed: ["Hudson Valley, NY"],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SchemaLocalBusiness;
