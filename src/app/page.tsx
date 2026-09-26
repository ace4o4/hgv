import HeroSection from '@/components/home/HeroSection';
import FeaturedEvent from '@/components/home/FeaturedEvent';
import CommunityIntro from '@/components/home/CommunityIntro';
import WhatWeDo from '@/components/home/WhatWeDo';
import CommunityJourney from '@/components/home/CommunityJourney';
import CommunityImpact from '@/components/home/CommunityImpact';
import AboutHackGyanVerse from '@/components/home/AboutHackGyanVerse';
import EventListingSection from '@/components/home/EventListingSection';
import Partners from '@/components/home/Partners';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';
import '@/components/home/home.css';

import SwarmCursor from '@/components/ui/SwarmCursor';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CommunityIntro />
      <AboutHackGyanVerse />
      <FeaturedEvent />
      <EventListingSection />
      
      {/* Unified Interactive Cursor Effect for Core Ecosystem Sections */}
      <SwarmCursor color="#2F80FF" accentColor="#00F0FF" count={6} size={8} speed={1.5} spread={110} trail={0.5} opacity={0.9}>
        <WhatWeDo />
        <Partners />
      </SwarmCursor>

      <FAQSection />
      <FinalCTA />
    </>
  );
}
