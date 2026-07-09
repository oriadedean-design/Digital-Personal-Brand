import type { Metadata } from 'next';
import { Instrument_Serif } from 'next/font/google';
import './globals.css';
import { ClientLayout } from './ClientLayout';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://deanoriade.ca'),
  title: {
    default: 'Dean Oriade | Filmmaker & Photographer, Toronto',
    template: '%s',
  },
  description: 'Photography and film by Dean Oriade, founder of Lotus Media and ROSSE Creative Collective, based in Toronto.',
  openGraph: {
    siteName: 'Dean Oriade',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${instrumentSerif.variable}`}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
