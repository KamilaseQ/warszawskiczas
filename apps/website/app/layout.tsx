import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google'
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

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
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
  themeColor: '#faf9f7',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans">
        {children}
        {/* 16.3 Schema.org LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Warszawski Czas',
              description: 'Butik zegarków premium w sercu Warszawy. Ekskluzywna kolekcja zegarków, profesjonalny serwis zegarmistrzowski, skup i komis.',
              url: 'https://warszawskiczas.pl',
              telephone: '+48604501000',
              email: 'biuro@warszawskiczas.pl',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'ul. Mokotowska 71',
                addressLocality: 'Warszawa',
                postalCode: '00-530',
                addressCountry: 'PL',
              },
              openingHoursSpecification: [
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '10:00', closes: '18:00' },
                { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '15:00' },
              ],
              priceRange: '$$$$',
              currenciesAccepted: 'PLN',
              paymentAccepted: 'Cash, Credit Card',
            })
          }}
        />
      </body>
    </html>
  )
}
