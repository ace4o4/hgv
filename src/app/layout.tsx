import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hackgyanverse.co.in'),
  title: "HackGyanVerse Community",
  description: "Classroom to Career — Together. A student-driven community building a bridge from classroom to career through innovation, technology, collaboration and real-world opportunities.",
  icons: {
    icon: [
      { url: '/favicon.ico?v=3' },
      { url: '/logos/hgv-lg.png?v=3', type: 'image/png' },
      { url: '/favicon-32x32.png?v=3', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico?v=3',
    apple: [
      { url: '/apple-touch-icon.png?v=3', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'HackGyanVerse Community',
    description: 'Classroom to Career — Together. A student-driven community building a bridge from classroom to career through innovation, technology, collaboration and real-world opportunities.',
    url: 'https://hackgyanverse.co.in',
    siteName: 'HackGyanVerse',
    images: [
      {
        url: '/logos/hgv.png',
        width: 1200,
        height: 630,
        alt: 'HackGyanVerse Community',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HackGyanVerse Community',
    description: 'Classroom to Career — Together. A student-driven community for students who build, learn & grow.',
    images: ['/logos/hgv.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/logos/hgv-lg.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
        <SmoothScroll />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
