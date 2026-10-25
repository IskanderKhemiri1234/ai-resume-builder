
import './globals.css';
import type { Metadata, Viewport } from 'next';

const siteName = 'ResuMaker AI';
const siteDescription =
  'Create professional resumes, tailored cover letters, and stronger career profiles with ResuMaker AI.';

export const metadata: Metadata = {
  title: {
    default: 'ResuMaker AI — AI Resume & Career Builder',
    template: '%s | ResuMaker AI',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'AI resume builder',
    'resume builder',
    'CV maker',
    'cover letter generator',
    'career tools',
    'professional resume',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'ResuMaker AI — Build Your Career',
    description: siteDescription,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResuMaker AI — AI Resume & Career Builder',
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#030307',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
