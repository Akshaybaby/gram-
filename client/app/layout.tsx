import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChristConnect - Christian Social Community',
  description: 'Connect with fellow believers, share faith, read the Bible, and grow together in Christ',
  keywords: ['Christian', 'social media', 'community', 'faith', 'Bible', 'prayer', 'fellowship'],
  authors: [{ name: 'ChristConnect Team' }],
  creator: 'ChristConnect',
  publisher: 'ChristConnect',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://christconnect.app'),
  openGraph: {
    title: 'ChristConnect - Christian Social Community',
    description: 'Connect with fellow believers, share faith, read the Bible, and grow together in Christ',
    url: 'https://christconnect.app',
    siteName: 'ChristConnect',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChristConnect - Christian Social Community',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChristConnect - Christian Social Community',
    description: 'Connect with fellow believers, share faith, read the Bible, and grow together in Christ',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6B46C1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ChristConnect" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#6B46C1" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-peaceful',
              success: {
                iconTheme: {
                  primary: '#32CD32',
                  secondary: '#FFFFFF',
                },
              },
              error: {
                iconTheme: {
                  primary: '#DC143C',
                  secondary: '#FFFFFF',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}