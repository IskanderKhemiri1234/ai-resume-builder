
import './globals.css';
import type { Metadata, Viewport } from 'next';

const siteName = 'Khemiri AI';

const siteDescription =
  'Khemiri AI is your intelligent workspace for AI automation, content creation, analytics, sales, and career productivity.';

export const metadata: Metadata = {
  title: {
    default: 'Khemiri AI — Your AI Productivity Platform',
    template: '%s | Khemiri AI',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'Khemiri AI',
    'AI productivity platform',
    'AI automation',
    'content repurposing',
    'prompt engineering',
    'business analytics',
    'sales funnel',
    'customer management',
    'AI career tools',
    'AI resume builder',
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Khemiri AI — Turn Ideas Into Results',
    description: siteDescription,
    siteName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Khemiri AI — Your AI Productivity Platform',
    description: siteDescription,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050b19',
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
