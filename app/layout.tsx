import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { MobileViewportController } from '@/components/mobile-viewport-controller';
import './globals.css';

const geistSans = Geist({
  preload: false,
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  preload: false,
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/fixedcoin-logo-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fixedcoin-logo-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fixedcoin-logo-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/fixedcoin-logo-64.png', sizes: '64x64', type: 'image/png' },
      { url: '/fixedcoin-logo-128.png', sizes: '128x128', type: 'image/png' },
      { url: '/fixedcoin-logo.png', sizes: '256x256', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '256x256', type: 'image/png' },
    ],
  },
  title: 'FIX Web Wallet',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
  themeColor: '#120f0a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MobileViewportController />
        {children}
      </body>
    </html>
  );
}
