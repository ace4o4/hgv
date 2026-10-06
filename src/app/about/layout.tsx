import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | HackGyanVerse',
  description: 'Learn about HackGyanVerse Community, our vision, mission, and the ecosystem we are building for students to bridge the gap between classroom and career.',
  openGraph: {
    title: 'About | HackGyanVerse',
    description: 'Learn about HackGyanVerse Community, our vision, mission, and the ecosystem we are building for students.',
    url: 'https://hackgyanverse.co.in/about',
  }
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
