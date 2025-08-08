
import React from "react";
import { Helmet } from "react-helmet-async";

interface SchemaOrganizationProps {
  name?: string;
  url?: string;
}

const SchemaOrganization: React.FC<SchemaOrganizationProps> = ({
  name = "Hudson Valley Consulting",
  url = "https://hudsonvalleycg.com",
}) => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SchemaOrganization;
