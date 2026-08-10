import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HH Goa 2026 | Official Builder ID Card Generator',
  description: 'Generate your official Hacker House Goa 2026 builder identity card instantly. Upload photo, enter details, and download high-res PNG for #FrameInGoa.',
  openGraph: {
    title: 'Hacker House Goa 2026 - Builder ID Card Generator',
    description: 'Create your branded downloadable builder card for #FrameInGoa',
    images: ['/assets/og-preview.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#0A0F1D',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Noto+Sans+Devanagari:wght@700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-goa-bg text-white min-h-screen font-sans selection:bg-goa-accent selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
