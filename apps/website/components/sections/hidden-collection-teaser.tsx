'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { Lock } from 'lucide-react'
import { Container, Section, ImagePlaceholder, KenBurns, ScrollDrift } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function HiddenCollectionTeaser() {
  const featureRef = useRef<HTMLDivElement>(null)

  return (
    <Section spacing="lg" className="relative overflow-hidden bg-[#0b1410] text-white">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />

      {/* Subtle green/gold ambient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(201,169,98,0.08)_0%,transparent_50%)]" />

      <Container className="relative">
        <div ref={featureRef} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEWA — tekst */}
          <FadeIn direction="right">
            <ScrollDrift targetRef={featureRef} start={-140} end={130} className="lg:-mt-10">
              <p className="mb-6 flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
                <Lock className="h-3 w-3" />
                Tylko dla wybranych
              </p>

              <h2 className="font-serif text-4xl font-medium tracking-tight text-white text-balance sm:text-5xl lg:text-[3.5rem] leading-[1.05]">
                Kolekcja,<br />
                <span className="italic font-normal">której nie znajdziesz</span>
                <br /> w katalogu
              </h2>

              <p className="mt-8 max-w-md text-base leading-relaxed text-white/60 text-pretty">
                Zegarki z prywatnych kolekcji, nigdy niepublikowane. Dostęp po
                indywidualnej weryfikacji.
              </p>

              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/40 text-pretty italic">
                Aktualnie 3 pozycje dostępne dla zweryfikowanych klientów.
              </p>

              <Link
                href="/kolekcja-na-zapytanie"
                prefetch
                className="mt-10 inline-block btn-sharp"
                style={{ backgroundColor: 'hsl(42 50% 45%)', color: '#0a0a0a' }}
              >
                Sprawdź, czy kwalifikujesz się
              </Link>
            </ScrollDrift>
          </FadeIn>

          {/* PRAWA — jedno editorialne zdjęcie z Ken Burns */}
          <FadeIn direction="left" delay={0.15}>
            <div className="relative">
              <div className="relative w-full overflow-hidden">
                <div className="relative aspect-[4/5]">
                  <KenBurns intensity={1.2} drift className="absolute inset-0">
                    <ImagePlaceholder
                      className="absolute inset-0"
                      variant="dark"
                      label=""
                      showDial={true}
                    />
                    <Image
                      src="/Franck Muller Vegas4.jpg"
                      alt="Franck Muller Vegas"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: '50% center' }}
                    />
                  </KenBurns>

                  {/* Editorial overlay — vignette + warm tone */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-black/15 to-accent-gold/[0.05]" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_25%,transparent_0%,rgba(0,0,0,0.45)_100%)] mix-blend-multiply" />

                  {/* Gold corner crop marks (top-left, bottom-right) */}
                  <span aria-hidden className="pointer-events-none absolute left-3 top-3 h-4 w-4">
                    <span className="absolute left-0 top-0 h-px w-4 bg-accent-gold/70" />
                    <span className="absolute left-0 top-0 h-4 w-px bg-accent-gold/70" />
                  </span>
                  <span aria-hidden className="pointer-events-none absolute right-3 bottom-3 h-4 w-4">
                    <span className="absolute right-0 bottom-0 h-px w-4 bg-accent-gold/70" />
                    <span className="absolute right-0 bottom-0 h-4 w-px bg-accent-gold/70" />
                  </span>

                  {/* Top-left meta — "Kolekcja Prywatna" */}
                  <div className="absolute left-6 top-6 flex items-center gap-2.5">
                    <Lock className="h-3 w-3 text-accent-gold" />
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-accent-gold/85">
                      Kolekcja Prywatna
                    </span>
                  </div>

                  {/* Bottom-left — No. 001 */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-white/45">
                      No. 001
                    </p>
                    <p className="mt-1.5 font-serif italic text-sm text-white/70">
                      Egzemplarz dostępny po weryfikacji
                    </p>
                  </div>
                </div>
              </div>

              {/* Offset gold border — dekoracyjne, jak w boutique-preview */}
              <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full border border-accent-gold/25 lg:block" />

              {/* Animated gold pin — bottom left of image */}
              <div
                aria-hidden
                className="pointer-events-none absolute -left-2 bottom-10 flex h-2 w-2 items-center justify-center"
              >
                <span className="absolute h-2 w-2 bg-accent-gold/80" />
                <span className="absolute h-4 w-4 animate-ping bg-accent-gold/30" />
              </div>

              {/* Caption editorial */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px w-8 bg-accent-gold/60" />
                <span className="font-serif italic text-sm text-white/55">
                  Pojedyncza sztuka — szczegóły wyłącznie po weryfikacji.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
