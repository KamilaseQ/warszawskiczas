'use client'

import Link from 'next/link'
import { Lock } from 'lucide-react'
import { Container, Section, ImagePlaceholder } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function HiddenCollectionTeaser() {
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
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEWA — tekst */}
          <FadeIn direction="right">
            <div>
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
            </div>
          </FadeIn>

          {/* PRAWA — 3 zamazane karty w nieregularnym układzie */}
          <FadeIn direction="left" delay={0.15}>
            <div className="relative h-[520px] w-full">
              {/* Karta 1 — największa, lewa góra */}
              <div
                className="absolute left-0 top-8 w-[55%] origin-top-left animate-[wc-blur-pulse_6s_ease-in-out_infinite]"
                style={{ transform: 'rotate(-2deg)' }}
              >
                <div className="relative aspect-[3/4]">
                  <ImagePlaceholder
                    className="absolute inset-0"
                    variant="dark"
                    label=""
                    showDial={false}
                  />
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center border border-accent-gold/50 bg-black/40">
                      <Lock className="h-5 w-5 text-accent-gold/80" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30">
                      No. 001
                    </span>
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-accent-gold/50">
                      Zastrzeżone
                    </span>
                  </div>
                </div>
              </div>

              {/* Karta 2 — środkowa, prawa góra */}
              <div
                className="absolute right-0 top-0 w-[45%] animate-[wc-blur-pulse_6s_ease-in-out_infinite]"
                style={{ transform: 'rotate(3deg)', animationDelay: '1.5s' }}
              >
                <div className="relative aspect-[3/4]">
                  <ImagePlaceholder
                    className="absolute inset-0"
                    variant="dark"
                    label=""
                    showDial={false}
                  />
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/35" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center border border-accent-gold/40 bg-black/40">
                      <Lock className="h-4 w-4 text-accent-gold/80" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30">
                      No. 002
                    </span>
                  </div>
                </div>
              </div>

              {/* Karta 3 — dolna prawa */}
              <div
                className="absolute bottom-0 right-[10%] w-[48%] animate-[wc-blur-pulse_6s_ease-in-out_infinite]"
                style={{ transform: 'rotate(-1deg)', animationDelay: '3s' }}
              >
                <div className="relative aspect-[3/4]">
                  <ImagePlaceholder
                    className="absolute inset-0"
                    variant="dark"
                    label=""
                    showDial={false}
                  />
                  <div className="absolute inset-0 backdrop-blur-xl bg-black/35" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center border border-accent-gold/40 bg-black/40">
                      <Lock className="h-4 w-4 text-accent-gold/80" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30">
                      No. 003
                    </span>
                  </div>
                </div>
              </div>

              {/* Ozdobne gold dot pattern */}
              <div
                aria-hidden="true"
                className="absolute bottom-16 left-[40%] flex h-2 w-2 items-center justify-center"
              >
                <span className="absolute h-2 w-2 bg-accent-gold/60" />
                <span className="absolute h-4 w-4 animate-ping bg-accent-gold/30" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <style jsx>{`
        @keyframes wc-blur-pulse {
          0%, 100% { opacity: 0.85; transform-origin: center; }
          50% { opacity: 1; }
        }
      `}</style>
    </Section>
  )
}
