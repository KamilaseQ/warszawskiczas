import type { Metadata } from 'next'
import { Check, Shield, Banknote, Eye, Clock } from 'lucide-react'
import { Container, Section, Heading, Text, Card } from '@/components/ui'
import { InquiryForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Skup zegarków',
  description:
    'Skup zegarków premium w Warszawie. Uczciwa wycena, natychmiastowa płatność, dyskrecja. Rolex, Omega, Patek Philippe i inne marki.',
}

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Skup zegarków premium',
  provider: { '@type': 'LocalBusiness', name: 'Warszawski Czas' },
  areaServed: { '@type': 'City', name: 'Warszawa' },
  description:
    'Skup zegarków premium. Uczciwa wycena, natychmiastowa płatność, dyskrecja. Rolex, Omega, Patek Philippe i inne marki.',
}

const benefits = [
  {
    icon: Banknote,
    title: 'Uczciwa wycena',
    description: 'Realne ceny rynkowe oparte na aktualnych notowaniach i stanie zegarka.',
  },
  {
    icon: Clock,
    title: 'Szybka płatność',
    description: 'Decyzja i płatność w dniu spotkania. Gotówka lub przelew.',
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo',
    description: 'Transakcja w butiku lub w bezpiecznym miejscu według Twojego wyboru.',
  },
  {
    icon: Eye,
    title: 'Dyskrecja',
    description: 'Pełna poufność transakcji. Nie udostępniamy informacji osobom trzecim.',
  },
]

const brands = [
  'Rolex',
  'Patek Philippe',
  'Audemars Piguet',
  'Omega',
  'IWC',
  'Jaeger-LeCoultre',
  'Cartier',
  'Breitling',
  'Tudor',
  'Panerai',
  'TAG Heuer',
  'Inne marki premium',
]

const whatWeBuy = [
  'Zegarki mechaniczne wszystkich marek premium',
  'Zegarki w każdym stanie — sprawne i do naprawy',
  'Zegarki z kompletnymi lub niekompletnymi dokumentami',
  'Zegarki vintage i współczesne',
  'Biżuterię ze złota i platyny',
  'Kosztowności i kamienie szlachetne',
]

export default function SkupPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Skup zegarków
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Skupujemy zegarki premium wszystkich marek. Oferujemy uczciwe 
              wyceny oparte na aktualnych cenach rynkowych i natychmiastową 
              płatność.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Benefits */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-gold/10">
                  <benefit.icon className="h-6 w-6 text-accent-gold" />
                </div>
                <h3 className="mt-6 font-serif text-lg font-semibold">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* What we buy */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Heading as="h2" size="md">
                Co skupujemy
              </Heading>
              <ul className="mt-8 space-y-4">
                {whatWeBuy.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Heading as="h2" size="md">
                Poszukiwane marki
              </Heading>
              <div className="mt-8 flex flex-wrap gap-3">
                {brands.map((brand, index) => (
                  <span
                    key={index}
                    className="rounded border border-border px-4 py-2 text-sm text-muted-foreground"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section variant="muted" spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Jak to działa
          </Heading>
          <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <span className="font-serif text-4xl font-bold text-accent-gold/30">
                01
              </span>
              <h3 className="mt-4 font-semibold">Kontakt</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Wyślij zdjęcia i opis zegarka. Odpowiemy ze wstępną wyceną.
              </p>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl font-bold text-accent-gold/30">
                02
              </span>
              <h3 className="mt-4 font-semibold">Spotkanie</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Umówimy się na oględziny i przedstawimy ostateczną ofertę.
              </p>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl font-bold text-accent-gold/30">
                03
              </span>
              <h3 className="mt-4 font-semibold">Płatność</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Jeśli akceptujesz ofertę — płatność od razu gotówką lub przelewem.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <Heading as="h2" size="md">
              Wyślij zegarek do wyceny
            </Heading>
            <Text muted className="mx-auto mt-4 max-w-lg">
              Opisz swój zegarek — marka, model, stan, czy masz dokumenty. 
              Możesz też dodać zdjęcia. Odpowiemy ze wstępną wyceną.
            </Text>
          </div>
          <div className="mt-12">
            <InquiryForm
              subject="Zapytanie o skup"
              submitLabel="Wyślij do wyceny"
              successMessage="Dziękujemy. Przeanalizujemy Twój zegarek i odpowiemy w ciągu 24 godzin."
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
