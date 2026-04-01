'use client'

import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { MapPin, Award, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

const values = [
  {
    num: '01',
    icon: MapPin,
    title: 'Mokotowska 71',
    description:
      'W sercu Warszawy, w historycznej kamienicy, tworzymy przestrzeń dla miłośników zegarmistrzostwa.',
  },
  {
    num: '02',
    icon: Award,
    title: 'Ekspertyza',
    description:
      'Wieloletnie doświadczenie i głęboka wiedza pozwalają nam oferować tylko wyjątkowe egzemplarze.',
  },
  {
    num: '03',
    icon: Clock,
    title: 'Tradycja',
    description:
      'Łączymy szacunek dla zegarmistrzowskiej tradycji z wymaganiami współczesnego kolekcjonera.',
  },
]

export function BrandPositioning() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        {/* 3.5 Split layout: lewa = editorial quote, prawa = 3 wartości */}
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-start">

          {/* Lewa strona — editorial quote / tekst marki */}
          <FadeIn direction="right">
            <div className="lg:sticky lg:top-32">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-6">
                III &nbsp;——&nbsp; O nas
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight text-foreground text-balance leading-snug">
                Więcej niż kolekcja zegarków.<br />
                <span className="italic font-normal">Miejsce z historią.</span>
              </h2>
              <p className="mt-8 text-base leading-relaxed text-muted-foreground">
                Warszawski Czas to butik, gdzie mechaniczna precyzja spotyka się
                z kulturą i historią stolicy. Każdy zegarek w naszej kolekcji
                przeszedł przez ręce ekspertów — nie sprzedajemy przypadkowych
                egzemplarzy.
              </p>
              {/* 3.6 Złoty separator */}
              <div className="mt-10 h-px w-16 bg-accent-gold/60" />
            </div>
          </FadeIn>

          {/* Prawa strona — 3 wartości z numerami */}
          {/* 13.4 Creative mobile layout — alternating offset cards with gold accents */}
          <div className="flex flex-col gap-10">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 0.1} direction="up">
                {/* 3.1+3.4 Duże numery ozdobne gold zamiast zielonych kółek */}
                <div className={cn(
                  'flex gap-6 items-start group',
                  // 13.4 Mobile offset — alternating indent for visual interest
                  index === 1 ? 'sm:pl-0 pl-6' : '',
                  index === 2 ? 'sm:pl-0 pl-2' : ''
                )}>
                  <div className="flex-shrink-0 font-serif text-4xl font-medium text-accent-gold/30 leading-none select-none w-12 text-right">
                    {value.num}
                  </div>
                  <div className="flex-1 border-t border-border/50 pt-5 relative">
                    {/* Gold accent dot on mobile */}
                    <div className="absolute -top-[3px] left-0 h-[5px] w-[5px] bg-accent-gold/60 sm:hidden" />
                    <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
