import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | HackGyanVerse',
  description: 'Meet the team behind HackGyanVerse Community. The student founders and leaders who are driving the community forward.',
  openGraph: {
    title: 'Team | HackGyanVerse',
    description: 'Meet the student founders and leaders of HackGyanVerse Community.',
    url: 'https://hackgyanverse.co.in/team',
  }
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
