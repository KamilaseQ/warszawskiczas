import { Container, Section, FaqAccordion, type FaqItem } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const faqs: FaqItem[] = [
  {
    q: 'Dlaczego ta kolekcja jest ukryta?',
    a: 'Właściciele zegarków z prywatnych kolekcji cenią dyskrecję. Nie publikujemy wszystkich pozycji, aby chronić ich interesy i prywatność transakcji.',
  },
  {
    q: 'Jak zweryfikować autentyczność?',
    a: 'Każdy egzemplarz przechodzi wieloetapowy proces weryfikacji przez zegarmistrzów i ekspertów. Sprawdzamy mechanizm, numer seryjny, stan koperty i tarczy oraz porównujemy z dokumentacją producenta. Certyfikat w komplecie.',
  },
  {
    q: 'Jak przebiega zakup?',
    a: 'Kontakt ze specjalistą, spotkanie w butiku na Mokotowskiej lub w dogodnym miejscu, prezentacja zegarka, negocjacja warunków i dyskretna transakcja. Pełna dokumentacja i gwarancja.',
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
    <Section variant="muted" spacing="lg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Container size="narrow">
        <FadeIn>
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              FAQ
            </p>
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance">
            Najczęstsze pytania<br />
            <span className="italic font-normal">o kolekcję prywatną.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-12">
            <FaqAccordion items={faqs} />
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
