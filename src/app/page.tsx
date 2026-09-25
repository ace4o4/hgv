import HeroSection from '@/components/home/HeroSection';
import FeaturedEvent from '@/components/home/FeaturedEvent';
import CommunityIntro from '@/components/home/CommunityIntro';
import WhatWeDo from '@/components/home/WhatWeDo';
import CommunityJourney from '@/components/home/CommunityJourney';
import CommunityImpact from '@/components/home/CommunityImpact';
import PastEvents from '@/components/home/PastEvents';
import Partners from '@/components/home/Partners';
import FinalCTA from '@/components/home/FinalCTA';
import '@/components/home/home.css';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CommunityIntro />
      <FeaturedEvent />
      <WhatWeDo />
      <CommunityJourney />
      <CommunityImpact />
      <PastEvents />
      <Partners />
      <FinalCTA />
    </>
  );
}
