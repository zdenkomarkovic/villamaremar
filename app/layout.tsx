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

export const metadata: Metadata = {
  metadataBase: new URL('https://villamaremar.com'),
  title: {
    default: 'Villa Mare Mar – Privatna plaža, Sutomore',
    template: '%s | Villa Mare Mar',
  },
  description:
    'Villa Mare Mar u Sutomoru nudi privatnu plažu, pogled na more, klima-uređaj, besplatan WiFi i privatni parking. Ocena 9.5 na Booking.com.',
  keywords: ['Villa Mare Mar', 'Sutomore', 'Crna Gora', 'privatna plaža', 'apartman', 'odmor'],
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: 'https://villamaremar.com',
    siteName: 'Villa Mare Mar',
    title: 'Villa Mare Mar – Privatna plaža, Sutomore, Crna Gora',
    description: 'Apartman uz privatnu plažu u Sutomoru. Ocena 9.5 na Booking.com.',
    images: [{ url: '/images/491527617.jpg', width: 1200, height: 630, alt: 'Villa Mare Mar' }],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
