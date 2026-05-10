import { MetadataRoute } from 'next'
import { mockProducts, productUrlSlug } from '@/data/mock-products'

// Statyczna data ostatniej znaczącej aktualizacji treści — nie używamy `new Date()`,
// żeby Google nie traktował każdego buildu jako zmiany treści.
const LAST_CONTENT_UPDATE = '2026-05-10'

const baseUrl = 'https://warszawskiczas.pl'

const seoLandingSlugs = [
  // Poziom 1 — szybki obrót zegarkami w Warszawie
  'skup-zegarkow-warszawa',
  'skup-rolex-warszawa',
  'wycena-zegarka-warszawa',
  'komis-zegarkow-warszawa',
  'skup-zegarkow-centrum-warszawy',
  // Poziom 2 — sprzedaż zegarków w Warszawie
  'zegarki-luksusowe-warszawa',
  'zegarki-uzywane-warszawa',
  'zegarki-rolex-warszawa',
  'zegarki-omega-warszawa',
  'zegarki-cartier-warszawa',
  'zegarki-damskie-warszawa',
  'zegarki-ze-zlota-warszawa',
  'zegarki-z-diamentami-warszawa',
  'chronografy-warszawa',
  // Poziom 3 — Polska, zegarki na zamówienie
  'zegarki-na-zamowienie',
  'rolex-na-zamowienie',
  'patek-philippe-na-zamowienie',
  'audemars-piguet-na-zamowienie',
  'zegarki-kolekcjonerskie',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = LAST_CONTENT_UPDATE

  const core: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/produkty`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/butik`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/uslugi/skup`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/komis`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/uslugi/naprawa-i-serwis`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/kontakt`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/kolekcja-na-zapytanie`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const products: MetadataRoute.Sitemap = mockProducts
    .filter((p) => p.status !== 'Niedostępny')
    .map((p) => {
      const firstImage = p.images?.[0]
      return {
        url: `${baseUrl}/produkty/${productUrlSlug(p)}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        ...(firstImage ? { images: [`${baseUrl}${firstImage}`] } : {}),
      }
    })

  const seoLandings: MetadataRoute.Sitemap = seoLandingSlugs.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  return [...core, ...seoLandings, ...products]
}
