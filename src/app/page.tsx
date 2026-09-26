import HeroSection from '@/components/home/HeroSection';
import FeaturedEvent from '@/components/home/FeaturedEvent';
import CommunityIntro from '@/components/home/CommunityIntro';
import WhatWeDo from '@/components/home/WhatWeDo';
import AboutHackGyanVerse from '@/components/home/AboutHackGyanVerse';
import EventListingSection from '@/components/home/EventListingSection';
import Partners from '@/components/home/Partners';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';
import SectionDivider from '@/components/ui/SectionDivider';
import '@/components/home/home.css';
import SwarmCursor from '@/components/ui/SwarmCursor';

export default function Home() {
  return (
    <>
      <HeroSection />

      <CommunityIntro />

      {/* Wave: dark CommunityIntro (#050505) → white AboutHackGyanVerse */}
      <SectionDivider fromColor="#050505" toColor="#F8FAFC" />

      <AboutHackGyanVerse />

      <SectionDivider fromColor="#F8FAFC" toColor="#F5F5F5" outline={true} />
      <FeaturedEvent />
      <EventListingSection />

      {/* Wave down: white → dark ecosystem */}
      <SectionDivider fromColor="#F5F5F5" toColor="#080A0C" outline={true} />
      <SwarmCursor color="#2F80FF" accentColor="#00F0FF" count={6} size={8} speed={1.5} spread={110} trail={0.5} opacity={0.9}>
        <WhatWeDo />
        <Partners />
      </SwarmCursor>

      <FAQSection />

      {/* Wave down: dark FAQ → white FinalCTA */}
      <SectionDivider fromColor="#050505" toColor="#FFFFFF" ambientGlow={true} />
      <FinalCTA />
    </>
  );
}
