'use client'

import Link from 'next/link'
import { Container, Section, Heading, Text } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function HiddenCollectionTeaser() {
  return (
    // 4.3 Ziemna ciemna zieleń zamiast czarnego overlay
    <Section spacing="lg" className="bg-[#0f1a14] text-white">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Lewa — treść + CTA (4.5 split layout: content lewa) */}
          <FadeIn direction="right">
            <div>
              {/* 4.1 Badge bez obramowania — tylko uppercase gold text */}
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-6">
                III &nbsp;——&nbsp; Ukryta Kolekcja
              </p>

              <Heading as="h2" size="lg" className="text-white">
                Dostępne<br />
                <span className="italic font-normal">na indywidualne zapytanie</span>
              </Heading>

              <Text variant="lead" className="mt-6 text-white/60">
                Niektóre egzemplarze z naszej kolekcji nie są prezentowane
                publicznie. To zegarki o wyjątkowej historii, rzadkości lub
                wartości — dostępne wyłącznie dla poważnych kolekcjonerów.
              </Text>

              <Text className="mt-4 text-white/40 text-sm">
                Jeśli szukasz czegoś szczególnego — konkretnego modelu, rocznika
                lub komplikacji — skontaktuj się z nami.
              </Text>

              {/* 4.2 Zmiana copy zabezpieczone */}
              <p className="mt-6 text-[10px] font-sans uppercase tracking-[0.3em] text-accent-gold/50">
                Na indywidualne zapytanie
              </p>

              {/* 4.7 Premium gold CTA */}
              <Link
                href="/kolekcja-na-zapytanie"
                className="mt-8 inline-block btn-sharp bg-accent-gold text-[#0a0a0a] hover:bg-accent-gold/90 border-0"
                style={{ backgroundColor: 'hsl(42 50% 45%)', color: '#0a0a0a' }}
              >
                Odkryj ukrytą kolekcję
              </Link>
            </div>
          </FadeIn>

          {/* Prawa — eleganckie editorial zdjęcie/placeholder (4.4+4.5) */}
          <FadeIn delay={0.15} direction="left">
            <div className="relative">
              {/* Główny panel — czysty editorial zamiast karuzeli z blurami */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1a2a1f]">
                {/* Dekoracyjna tarcza zegarka */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 200 200"
                    className="h-48 w-48 opacity-[0.07]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    color="white"
                  >
                    <circle cx="100" cy="100" r="90" />
                    <circle cx="100" cy="100" r="76" />
                    <circle cx="100" cy="100" r="4" fill="white" />
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => {
                      const rad = (deg * Math.PI) / 180
                      const x1 = 100 + 76 * Math.sin(rad)
                      const y1 = 100 - 76 * Math.cos(rad)
                      const x2 = 100 + (deg % 90 === 0 ? 62 : 70) * Math.sin(rad)
                      const y2 = 100 - (deg % 90 === 0 ? 62 : 70) * Math.cos(rad)
                      return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={deg % 90 === 0 ? "1.5" : "0.8"} />
                    })}
                    <line x1="100" y1="100" x2="100" y2="36" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="100" y1="100" x2="142" y2="82" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a14] via-transparent to-transparent" />

                {/* Caption editorial */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="font-serif italic text-lg text-white/80 leading-snug">
                    „Niektóre zegarki nie szukają właściciela.<br />
                    Czekają na spełnionego kolekcjonera."
                  </p>
                  <div className="mt-4 h-px w-12 bg-accent-gold/60" />
                </div>
              </div>

              {/* Dekoracyjna ramka offsetowa */}
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-accent-gold/20 pointer-events-none" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
