import { ArrowRight } from 'lucide-react'
import { Container, Section, FaqAccordion, Magnetic, type FaqItem } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const faqs: FaqItem[] = [
  {
    q: 'Dlaczego ta kolekcja jest poza katalogiem?',
    a: 'Właściciele zegarków z prywatnych kolekcji preferują indywidualne podejście. Część egzemplarzy nie trafia do publicznego katalogu, by zachować spokojną, kameralną formę kontaktu z zainteresowanymi.',
  },
  {
    q: 'Jak zweryfikować autentyczność?',
    a: 'Każdy egzemplarz przechodzi wieloetapowy proces weryfikacji przez zegarmistrzów i ekspertów. Sprawdzamy mechanizm, numer seryjny, stan koperty i tarczy oraz porównujemy z dokumentacją producenta. Certyfikat w komplecie.',
  },
  {
    q: 'Jak przebiega zakup?',
    a: 'Kontakt ze specjalistą, spotkanie w butiku na Mokotowskiej lub w dogodnym miejscu, prezentacja zegarka, omówienie warunków i bezpieczna, poufna transakcja. Pełna dokumentacja i gwarancja.',
  },
  {
    q: 'Czy mogę kupić w imieniu osoby trzeciej lub jako prezent?',
    a: 'Tak — oferujemy pełne wsparcie przy zakupie z dostawą do wybranej osoby, eleganckim pakowaniem oraz indywidualnym podejściem do logistyki.',
  },
  {
    q: 'Jaki jest zakres cenowy kolekcji?',
    a: 'Kolekcja Prywatna obejmuje zegarki z segmentu premium i ultra-premium — od kilkudziesięciu tysięcy do kilku milionów złotych za egzemplarz. Szczegółową wycenę omawiamy indywidualnie.',
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

export function PrivateCollectionFAQ() {
  return (
    <Section spacing="lg" className="relative overflow-hidden bg-[#050403] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,169,98,0.08)_0%,transparent_55%)]" />

      <Container size="narrow" className="relative">
        <FadeIn>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              Najczęstsze pytania
            </p>
          </div>
          <h2 className="mt-8 font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl text-balance leading-[1.02]">
            Najczęstsze pytania<br />
            <span className="italic font-normal">o kolekcję prywatną.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-16">
            <FaqAccordion items={faqs} variant="dark" numbering="roman" />
          </div>
        </FadeIn>

        {/* Outro footer */}
        <FadeIn delay={0.2}>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-accent-gold">
                Nadal masz pytania?
              </p>
              <p className="mt-3 font-serif italic text-lg text-white/70 sm:text-xl">
                Specjalista odpowie indywidualnie, w ciągu 24 godzin.
              </p>
            </div>
            <Magnetic strength={6}>
              <a
                href="#registration"
                className="inline-flex items-center gap-3 border-b border-accent-gold/50 pb-1 text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-accent-gold transition-colors duration-300 hover:text-[#dab97c] hover:border-accent-gold"
              >
                Skontaktuj się ze specjalistą
                <ArrowRight className="h-3 w-3" />
              </a>
            </Magnetic>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
