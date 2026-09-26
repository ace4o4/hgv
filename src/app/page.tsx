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

export default function Home() {
  return (
    <>
      <HeroSection />
      <CommunityIntro />
      <AboutHackGyanVerse />
      <FeaturedEvent />
      <EventListingSection />
      <WhatWeDo />
      <Partners />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
