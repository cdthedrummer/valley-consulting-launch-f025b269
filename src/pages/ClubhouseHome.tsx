import React from 'react';
import { Helmet } from 'react-helmet-async';
import ClubhouseNavbar from '@/components/ClubhouseNavbar';
import ClubhouseHero from '@/components/ClubhouseHero';
import ProShopSection from '@/components/ProShopSection';
import ScorecardSection from '@/components/ScorecardSection';
import Footer from '@/components/Footer';

const ClubhouseHome: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>HVCG | Architecting Local Dominance</title>
        <meta
          name="description"
          content="Your Leads. Your Zone. AI-powered marketing precision for contractors who play to win."
        />
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseNavbar />
        <ClubhouseHero />
        <ProShopSection />
        <ScorecardSection />
        <Footer />
      </div>
    </>
  );
};

export default ClubhouseHome;
