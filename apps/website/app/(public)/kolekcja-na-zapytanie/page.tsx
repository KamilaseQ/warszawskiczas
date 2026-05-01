import type { Metadata } from 'next'
import {
  PrivateCollectionHero,
  PrivateCollectionFeatured,
  PrivateCollectionValue,
  PrivateCollectionProcess,
  PrivateCollectionFAQ,
  PrivateCollectionRegistration,
} from '@/components/sections'

export const metadata: Metadata = {
  title: 'Kolekcja Prywatna',
  description:
    'Ekskluzywna kolekcja zegarków dostępna po weryfikacji. Rzadkie modele, prywatne kolekcje, indywidualne podejście.',
}

export default function KolekcjaNaZapytaniePage() {
  return (
    <>
      {/* 1. Pattern interrupt — kłódka, mistery */}
      <PrivateCollectionHero />

      {/* 2. PEAK DESIRE — pod hasłem, 3 najważniejsze egzemplarze w karuzeli */}
      <PrivateCollectionFeatured />

      {/* 3. Wartość kolekcji — dlaczego ona w ogóle istnieje */}
      <PrivateCollectionValue />

      {/* 4. Redukcja tarcia — 3 kroki do zegarka */}
      <PrivateCollectionProcess />

      {/* 5. Obsługa zastrzeżeń */}
      <PrivateCollectionFAQ />

      {/* 6. Konwersja */}
      <PrivateCollectionRegistration />
    </>
  )
}
