import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Phone, Mail } from 'lucide-react'
import { Container, Section, FaqAccordion, type FaqItem, ImagePlaceholder } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { ContactForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Skontaktuj się z butikiem Warszawski Czas. Telefon, email, formularz. Mokotowska 71, Warszawa.',
}

const faqs: FaqItem[] = [
  {
    q: 'Czy wizyta w butiku wymaga wcześniejszego umówienia?',
    a: 'Nie wymagamy wcześniejszego kontaktu — zapraszamy w godzinach otwarcia. Jeśli chcesz mieć pewność, że nasz specjalista będzie dostępny dla Ciebie wyłącznie, warto umówić wizytę telefonicznie lub przez formularz.',
  },
  {
    q: 'Jak przebiega bezpłatna wycena zegarka?',
    a: 'Wycena zajmuje zwykle 15–30 minut. Oglądamy zegarek, dokumentację, mechanizm i porównujemy z aktualnym rynkiem. Dajemy rzetelną informację o wartości — bez presji sprzedaży.',
  },
  {
    q: 'Jakie dokumenty są potrzebne przy skupie?',
    a: 'Dowód tożsamości. Pudełko i karty gwarancyjne są mile widziane — wpływają na wycenę, ale nie są konieczne. W przypadku zegarków zabytkowych pomocna bywa dokumentacja pochodzenia.',
  },
  {
    q: 'Czy realizujecie transakcje poza Warszawą?',
    a: 'Tak — współpracujemy z klientami z całej Polski. W przypadku cenniejszych egzemplarzy organizujemy bezpieczną kurierską logistykę z ubezpieczeniem lub spotkanie w dogodnej lokalizacji.',
  },
  {
    q: 'Ile trwa typowy serwis zegarka?',
    a: 'Standardowy serwis (smarowanie, regulacja, czyszczenie) to 3–6 tygodni. Przy bardziej złożonych naprawach czas liczymy indywidualnie po diagnozie.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function KontaktPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Header editorial */}
      <Section spacing="lg">
        <Container>
          <FadeIn>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-accent-gold/60" />
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
                Kontakt
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-6xl lg:text-[5rem] leading-[1.02] text-balance max-w-3xl">
              Zacznijmy<br />
              <span className="italic font-normal">rozmowę.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty lg:text-lg">
              Masz pytanie o zegarek, chcesz poznać kolekcję lub dowiedzieć się więcej
              o naszych usługach? Odpowiemy w ciągu 24 godzin.
            </p>
          </FadeIn>
        </Container>
      </Section>

      {/* Formularz + boczny panel kontaktowy */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Formularz */}
            <FadeIn className="lg:col-span-7">
              <div className="bg-background p-8 lg:p-12">
                <h2 className="font-serif text-2xl font-medium text-foreground sm:text-3xl">
                  Napisz do nas
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  Jedno miejsce, wszystkie potrzebne pola. Odpowiadamy w ciągu 24 godzin.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </FadeIn>

            {/* Kanały kontaktu */}
            <FadeIn delay={0.1} className="lg:col-span-5">
              <div className="space-y-10">
                {/* Placeholder zdjęcia/video wnętrza butiku */}
                <ImagePlaceholder
                  className="aspect-[4/3] w-full"
                  variant="dark"
                  label="Wnętrze butiku — zdjęcie / video"
                />

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                    Bezpośrednio
                  </p>

                  <a
                    href="tel:+48604501000"
                    className="group mt-4 flex items-center justify-between gap-4 border-b border-border py-5 transition-colors duration-300 hover:border-accent-gold"
                  >
                    <div className="flex items-center gap-4">
                      <Phone className="h-4 w-4 text-accent-gold" strokeWidth={1.5} />
                      <span className="font-serif text-xl font-medium text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                        +48 604 501 000
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-gold" />
                  </a>

                  <a
                    href="mailto:biuro@warszawskiczas.pl"
                    className="group mt-0 flex items-center justify-between gap-4 border-b border-border py-5 transition-colors duration-300 hover:border-accent-gold"
                  >
                    <div className="flex items-center gap-4">
                      <Mail className="h-4 w-4 text-accent-gold" strokeWidth={1.5} />
                      <span className="font-sans text-base text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                        biuro@warszawskiczas.pl
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-gold" />
                  </a>

                  <a
                    href="https://wa.me/48604501000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-0 flex items-center justify-between gap-4 border-b border-border py-5 transition-colors duration-300 hover:border-accent-gold"
                  >
                    <div className="flex items-center gap-4">
                      <svg className="h-4 w-4 text-accent-gold" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0Z" />
                      </svg>
                      <span className="font-sans text-base text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                        WhatsApp
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-gold" />
                  </a>
                </div>

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                    Godziny otwarcia
                  </p>
                  <div className="mt-4 space-y-2 font-sans text-sm text-foreground">
                    <div className="flex justify-between gap-6">
                      <span>Pon – Pt</span>
                      <span className="tabular-nums">10:00 – 18:00</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Sobota</span>
                      <span className="tabular-nums">10:00 – 15:00</span>
                    </div>
                    <div className="flex justify-between gap-6 text-muted-foreground">
                      <span>Niedziela</span>
                      <span>Zamknięte</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/60">
                    Adres
                  </p>
                  <p className="mt-3 font-serif text-xl font-medium text-foreground">
                    Mokotowska 71
                  </p>
                  <p className="font-serif italic text-base text-muted-foreground">
                    Warszawa, 00-530
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Mapa */}
      <Section spacing="md">
        <Container>
          <FadeIn>
            <div className="relative">
              <div className="relative aspect-[21/9] overflow-hidden bg-[#0f0f0e]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.3!2d21.017!3d52.222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc7b27a7a8c3%3A0x0!2sMokotowska+71%2C+Warszawa!5e0!3m2!1spl!2spl!4v1"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(0.85) contrast(1.05) brightness(0.75) sepia(0.25)',
                    position: 'absolute',
                    inset: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Warszawski Czas — Mokotowska 71, Warszawa"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0a0a0a]/30 via-transparent to-[#c9a962]/[0.04]" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                  <span className="absolute h-2 w-2 bg-accent-gold" />
                  <span className="absolute h-5 w-5 animate-ping bg-accent-gold/40" />
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-accent-gold/30" />
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="muted" spacing="lg">
        <Container size="narrow">
          <FadeIn>
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px w-12 bg-accent-gold/60" />
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
                FAQ
              </p>
            </div>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance">
              Zanim napiszesz —<br />
              <span className="italic font-normal">może to już tu jest.</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-12">
              <FaqAccordion items={faqs} />
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-12 text-center text-sm text-muted-foreground">
              Nie znalazłeś odpowiedzi?{' '}
              <Link href="#top" className="text-accent-gold hover:underline">
                Napisz do nas
              </Link>{' '}
              lub zadzwoń — chętnie pomożemy.
            </p>
          </FadeIn>
        </Container>
      </Section>
    </>
  )
}
