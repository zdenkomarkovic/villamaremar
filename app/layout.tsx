import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { LanguageProvider } from '@/components/LanguageContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-serif',
  display: 'swap',
})

const SITE_URL = 'https://villamaremar.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Villa Mare Mar – Privatna plaža, Sutomore, Crna Gora',
    template: '%s | Villa Mare Mar',
  },
  description:
    'Villa Mare Mar u Sutomoru – studio apartmani uz privatnu plažu, pogled na more, klima-uređaj, besplatan WiFi i parking. Ocena 9.5 na Booking.com. Aerodrom Podgorica i Tivat 50 km.',
  keywords: [
    'Villa Mare Mar', 'Sutomore', 'Crna Gora', 'Montenegro',
    'privatna plaža', 'studio', 'apartman', 'odmor', 'smeštaj',
    'Sutomore smeštaj', 'Sutomore privatna plaža', 'vila Sutomore',
    'Booking.com Sutomore', 'more Crna Gora odmor',
  ],
  authors: [{ name: 'Villa Mare Mar' }],
  creator: 'Villa Mare Mar',
  publisher: 'Villa Mare Mar',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    alternateLocale: ['en_US', 'ru_RU', 'de_DE'],
    url: SITE_URL,
    siteName: 'Villa Mare Mar',
    title: 'Villa Mare Mar – Privatna plaža, Sutomore, Crna Gora',
    description:
      'Studio apartmani uz privatnu plažu u Sutomoru. Pogled na more, klima, WiFi, parking. Ocena 9.5 na Booking.com.',
    images: [
      {
        url: '/images/491527617.webp',
        width: 1200,
        height: 630,
        alt: 'Villa Mare Mar – privatna plaža Sutomore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Villa Mare Mar – Privatna plaža, Sutomore',
    description: 'Studio apartmani uz privatnu plažu u Sutomoru. Ocena 9.5 na Booking.com.',
    images: ['/images/491527617.webp'],
  },
  verification: {
    // google: 'TVOJ_GOOGLE_VERIFICATION_KOD',  // dodati nakon verifikacije u Google Search Console
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Villa Mare Mar',
  description:
    'Studio apartmani uz privatnu plažu u Sutomoru, Crna Gora. Pogled na more, klima-uređaj, besplatan WiFi, privatni parking.',
  url: SITE_URL,
  telephone: '+381638650691',
  email: 'villa.maremar@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Obala Iva Novakovića 10',
    addressLocality: 'Sutomore',
    postalCode: '85355',
    addressCountry: 'ME',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.0422,
    longitude: 19.1522,
  },
  image: `${SITE_URL}/images/491527617.webp`,
  starRating: {
    '@type': 'Rating',
    ratingValue: '9.5',
    bestRating: '10',
  },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Privatna plaža', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Besplatan WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Klima-uređaj', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Privatni parking', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Pogled na more', value: true },
  ],
  sameAs: [
    'https://www.instagram.com/villamaremar',
    'https://www.facebook.com/villamaremar',
    'https://www.booking.com/hotel/me/mare-mar.html',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
