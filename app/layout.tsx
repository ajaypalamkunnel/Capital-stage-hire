import type { Metadata } from 'next'
import { Montserrat, Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import './globals.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.capitalstagehire.com'),
  title: {
    default: 'Capital Stage Hire | Event Furniture & Equipment Hire Canberra Australia ACT',
    template: '%s | Capital Stage Hire Canberra Australia ACT',
  },
  description: "Canberra Australia ACT's premier event hire company. Rent chairs, tables, lighting, staging, curtains and decorations for weddings, parties and corporate events across Canberra Australia ACT.",
  keywords: ['event hire Canberra Australia ACT', 'chair hire Canberra Australia ACT', 'table hire Canberra Australia ACT',
             'wedding furniture hire', 'stage hire Canberra Australia ACT', 'event rental Canberra Australia ACT',
             'Capital Stage Hire'],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://www.capitalstagehire.com',
    siteName: 'Capital Stage Hire',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://www.capitalstagehire.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-sans`}>
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #2a2a2a',
          }
        }} />
      </body>
    </html>
  )
}
