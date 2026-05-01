'use client'

import { Container, Section, ImagePlaceholder, KenBurns } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const values = [
  {
    num: '01',
    title: 'Weryfikacja i autentyczność',
    description:
      'Każdy egzemplarz przechodzi wieloetapową kontrolę ekspercką. Certyfikat i pełna dokumentacja.',
  },
  {
    num: '02',
    title: 'Zegarki z historią',
    description:
      'Nie handlujemy anonimową masą. Znamy pochodzenie każdego modelu i opowiadamy jego historię.',
  },
  {
    num: '03',
    title: 'Relacja, nie transakcja',
    description:
      'Po zakupie jesteśmy dostępni — serwis, doradztwo, ewentualna odsprzedaż po latach.',
  },
]

export function BrandPositioning() {
  return (
    <Section variant="muted" spacing="lg" className="relative overflow-hidden">
      <Container>
        <FadeIn>
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              III &nbsp;——&nbsp; Filozofia butiku
            </p>
          </div>
        </FadeIn>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEWA — duży cytat editorialny */}
          <FadeIn direction="right" className="lg:col-span-7">
            <div className="relative">
              {/* Duża dekoracyjna cyfra w tle */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-10 -left-4 select-none font-serif italic text-[14rem] font-medium leading-none text-accent-gold/[0.05] lg:text-[18rem]"
              >
                "
              </span>

              <h2 className="relative font-serif text-4xl font-medium tracking-tight text-foreground text-balance leading-[1.1] sm:text-5xl lg:text-6xl">
                Zegarek to nie przedmiot.<br />
                To <span className="font-serif italic font-normal text-accent-gold">wybór</span>,
                który mówi, kim <span className="font-serif italic font-normal">jesteś</span>.
              </h2>

              <p className="mt-10 max-w-lg font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                Warszawski Czas to butik, w którym mechaniczna precyzja spotyka się
                z kulturą i historią. Każdy zegarek to rozmowa — o stylu, o czasie,
                o człowieku, który go wybiera.
              </p>

              {/* Placeholder zdjęcia makro tarczy — wystaje poza kontener */}
              <div className="relative mt-12 hidden lg:block">
                <KenBurns
                  intensity={1.18}
                  drift
                  className="aspect-[16/10] w-[90%] translate-x-8"
                >
                  <ImagePlaceholder
                    className="h-full w-full"
                    variant="light"
                    label="Zdjęcie: makro tarczy / dłonie zegarmistrza"
                  />
                </KenBurns>
                {/* Offset border dekoracyjna */}
                <div className="pointer-events-none absolute -bottom-4 left-8 h-full w-[90%] border border-accent-gold/20" />
              </div>
            </div>
          </FadeIn>

          {/* PRAWA — 3 punkty z numerami */}
          <div className="flex flex-col gap-10 lg:col-span-5 lg:pt-12">
            {values.map((v, index) => (
              <FadeIn key={v.num} direction="left" delay={index * 0.1}>
                <div className="group relative border-t border-border pt-6">
                  <div className="flex items-baseline gap-6">
                    <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold/70">
                      {v.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                        {v.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn delay={0.35}>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-16 bg-accent-gold/60" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                  Mokotowska 71 · Warszawa
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  )
}
