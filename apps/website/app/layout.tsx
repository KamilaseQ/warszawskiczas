import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Warszawski Czas | Butik Zegarków Premium',
    template: '%s | Warszawski Czas',
  },
  description:
    'Butik zegarków premium w sercu Warszawy. Ekskluzywna kolekcja zegarków, profesjonalny serwis zegarmistrzowski, skup i komis. Mokotowska 71.',
  keywords: [
    'zegarki premium',
    'butik zegarków',
    'Warszawa',
    'Mokotowska',
    'serwis zegarmistrzowski',
    'skup zegarków',
    'zegarki luksusowe',
  ],
  authors: [{ name: 'Warszawski Czas' }],
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Warszawski Czas',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4332',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
