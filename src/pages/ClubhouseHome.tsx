import React from 'react';
import { Helmet } from 'react-helmet-async';
import ClubhouseHero from '@/components/ClubhouseHero';
import ProShopSection from '@/components/ProShopSection';
import TechStackSection from '@/components/TechStackSection';
import ScorecardSection from '@/components/ScorecardSection';

const ClubhouseHome: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>HVCG | Get More Local Customers</title>
        <meta
          name="description"
          content="Smart marketing for contractors. We build websites, handle your Google presence, and help you show up when customers search."
        />
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseHero />
        <ProShopSection />
        <TechStackSection />
        <ScorecardSection />
      </div>
    </>
  );
};

export default ClubhouseHome;
