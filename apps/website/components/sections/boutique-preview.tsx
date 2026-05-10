import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { ContactLink } from '@/components/contact-link'
import { Container, LocationMap, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function BoutiquePreview() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <FadeIn>
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              VI &nbsp;——&nbsp; Butik
            </p>
          </div>
        </FadeIn>

        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEWA — editorial contact info */}
          <FadeIn direction="right" className="lg:col-span-4">
            <div className="space-y-10">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                  Adres
                </p>
                <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-foreground leading-tight lg:text-4xl">
                  Mokotowska 71
                </h2>
                <p className="mt-2 font-serif italic text-lg text-muted-foreground">
                  Warszawa, 00-530
                </p>
              </div>

              <div className="h-px w-12 bg-accent-gold/60" />

              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                  Godziny otwarcia
                </p>
                <div className="mt-4 space-y-2 font-sans text-sm text-foreground">
                  <div className="flex justify-between gap-6">
                    <span>Poniedziałek – Piątek</span>
                    <span className="tabular-nums">11:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between gap-6">
                    <span>Sobota</span>
                    <span className="tabular-nums">11:00 – 15:00</span>
                  </div>
                  <div className="flex justify-between gap-6 text-muted-foreground">
                    <span>Niedziela</span>
                    <span>Zamknięte</span>
                  </div>
                </div>
              </div>

              <div className="h-px w-12 bg-accent-gold/60" />

              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                  Telefon
                </p>
                <a
                  href="tel:+48604501000"
                  className="mt-3 block font-serif text-2xl font-medium text-accent-gold transition-colors duration-300 hover:text-accent-gold/80"
                >
                  +48 604 50 1000
                </a>
              </div>

              <div className="flex flex-col gap-3">
                <ContactLink
                  source="boutique-preview"
                  prefetch
                  className="btn-sharp inline-block w-full text-center"
                >
                  Umów wizytę w butiku
                </ContactLink>

                <a
                  href="https://maps.app.goo.gl/v3iC97EKPkc3BtkU8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/60 transition-colors duration-300 hover:text-accent-gold"
                >
                  Otwórz w mapach
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* PRAWA — mapa Google z offset border */}
          <FadeIn direction="left" delay={0.15} className="lg:col-span-8">
            <div className="relative">
              <LocationMap className="aspect-[4/3] lg:aspect-[16/11]" />

              {/* Offset gold border */}
              <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full border border-accent-gold/30 lg:block" />

              {/* Caption editorial */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px w-8 bg-accent-gold/60" />
                <span className="font-serif italic text-sm text-muted-foreground">
                  W sercu Śródmieścia, między Placem Trzech Krzyży a Placem Zbawiciela.
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
