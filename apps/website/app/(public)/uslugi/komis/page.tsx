import type { Metadata } from 'next'
import { Check, Users, Camera, TrendingUp, Shield } from 'lucide-react'
import { Container, Section, Heading, Text, Card } from '@/components/ui'
import { InquiryForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Komis zegarków',
  description:
    'Profesjonalna sprzedaż komisowa zegarków premium. Dotrzemy do właściwych kolekcjonerów i uzyskamy najlepszą cenę za Twój zegarek.',
}

const benefits = [
  {
    icon: Users,
    title: 'Sieć kontaktów',
    description:
      'Dostęp do szerokiej sieci kolekcjonerów i dealerów w Polsce i za granicą.',
  },
  {
    icon: Camera,
    title: 'Profesjonalna prezentacja',
    description:
      'Wysokiej jakości zdjęcia i opisy, które przyciągają poważnych kupujących.',
  },
  {
    icon: TrendingUp,
    title: 'Optymalna cena',
    description:
      'Znajomość rynku pozwala uzyskać najlepszą możliwą cenę za Twój zegarek.',
  },
  {
    icon: Shield,
    title: 'Bezpieczeństwo',
    description:
      'Zegarek pozostaje ubezpieczony i zabezpieczony przez cały proces sprzedaży.',
  },
]

const process = [
  {
    step: '01',
    title: 'Przyjęcie zegarka',
    description:
      'Oględziny, wycena, ustalenie ceny oczekiwanej i warunków komisowych.',
  },
  {
    step: '02',
    title: 'Dokumentacja',
    description:
      'Profesjonalne zdjęcia, szczegółowy opis, przygotowanie materiałów.',
  },
  {
    step: '03',
    title: 'Promocja',
    description:
      'Aktywna promocja wśród naszej sieci kontaktów i w mediach branżowych.',
  },
  {
    step: '04',
    title: 'Negocjacje',
    description:
      'Prowadzenie rozmów z potencjalnymi kupującymi, negocjacje ceny.',
  },
  {
    step: '05',
    title: 'Finalizacja',
    description:
      'Bezpieczna transakcja i przekazanie środków na Twoje konto.',
  },
]

const whyConsignment = [
  'Uzyskasz wyższą cenę niż przy natychmiastowej sprzedaży',
  'Nie musisz zajmować się sprzedażą i negocjacjami',
  'Dotrzemy do kolekcjonerów, do których sam nie dotrzesz',
  'Twój zegarek jest bezpieczny i ubezpieczony',
  'Profesjonalna prezentacja zwiększa wartość postrzeganą',
  'Transparentne warunki — wiesz dokładnie, ile otrzymasz',
]

export default function KomisPage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Komis zegarków
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Profesjonalna sprzedaż komisowa dla właścicieli zegarków premium. 
              Dotrzemy do właściwych kupujących i uzyskamy najlepszą cenę za 
              Twój egzemplarz.
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

      {/* Why consignment */}
      <Section spacing="lg">
        <Container>
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <Heading as="h2" size="md">
                Dlaczego komis?
              </Heading>
              <Text muted className="mt-4">
                Sprzedaż komisowa to najlepsza opcja, gdy zależy Ci na uzyskaniu 
                najwyższej ceny i nie spieszysz się z transakcją.
              </Text>
              <ul className="mt-8 space-y-4">
                {whyConsignment.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-gold" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card variant="outlined" padding="lg">
              <h3 className="font-serif text-xl font-semibold">
                Warunki komisowe
              </h3>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Prowizja</span>
                  <span className="font-medium">10-15% od ceny sprzedaży</span>
                </li>
                <li className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Minimalny okres</span>
                  <span className="font-medium">30 dni</span>
                </li>
                <li className="flex justify-between border-b border-border pb-4">
                  <span className="text-muted-foreground">Ubezpieczenie</span>
                  <span className="font-medium">W cenie</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-muted-foreground">Wypłata</span>
                  <span className="font-medium">Do 3 dni od sprzedaży</span>
                </li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Szczegółowe warunki ustalamy indywidualnie w zależności od 
                wartości i rodzaju zegarka.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section variant="muted" spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Jak to działa
          </Heading>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-5">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <span className="font-serif text-3xl font-bold text-accent-gold/30">
                  {item.step}
                </span>
                <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <Heading as="h2" size="md">
              Zgłoś zegarek do komisu
            </Heading>
            <Text muted className="mx-auto mt-4 max-w-lg">
              Opisz swój zegarek i oczekiwania cenowe. Skontaktujemy się, 
              aby omówić szczegóły i warunki współpracy.
            </Text>
          </div>
          <div className="mt-12">
            <InquiryForm
              subject="Zgłoszenie do komisu"
              submitLabel="Wyślij zgłoszenie"
              successMessage="Dziękujemy za zgłoszenie. Skontaktujemy się w ciągu 24 godzin."
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
