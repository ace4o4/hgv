import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | HackGyanVerse',
  description: 'Get in touch with HackGyanVerse Community. Reach out for collaborations, sponsorships, or general inquiries.',
  openGraph: {
    title: 'Contact Us | HackGyanVerse',
    description: 'Get in touch with HackGyanVerse Community.',
    url: 'https://hackgyanverse.co.in/contact',
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
