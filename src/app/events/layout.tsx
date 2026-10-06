import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events | HackGyanVerse',
  description: 'Explore upcoming and past events hosted by HackGyanVerse Community, including hackathons, workshops, talks, and community sessions.',
  openGraph: {
    title: 'Events | HackGyanVerse',
    description: 'Explore upcoming and past events hosted by HackGyanVerse Community.',
    url: 'https://hackgyanverse.co.in/events',
  }
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
