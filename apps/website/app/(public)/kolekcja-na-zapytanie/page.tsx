import type { Metadata } from 'next'
import { Lock, Watch, Eye, MessageCircle } from 'lucide-react'
import { Container, Section, Heading, Text, Badge, Card } from '@/components/ui'
import { InquiryForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Kolekcja na zapytanie',
  description:
    'Ekskluzywna kolekcja zegarków dostępna wyłącznie na zapytanie. Rzadkie modele, wyjątkowe egzemplarze, indywidualne podejście.',
}

const reasons = [
  {
    icon: Eye,
    title: 'Dyskrecja',
    description:
      'Niektórzy kolekcjonerzy cenią prywatność. Nie publikujemy wszystkich pozycji, aby chronić interesy naszych klientów.',
  },
  {
    icon: Lock,
    title: 'Ekskluzywność',
    description:
      'Najrzadsze egzemplarze trafiają do poważnych kolekcjonerów zanim pojawią się publicznie.',
  },
  {
    icon: MessageCircle,
    title: 'Indywidualne podejście',
    description:
      'Każde zapytanie traktujemy indywidualnie. Możemy też poszukać konkretnego modelu na Twoje zlecenie.',
  },
]

export default function KolekcjaNaZapytaniePage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Badge variant="premium" className="mb-4">
              Kolekcja ekskluzywna
            </Badge>
            <Heading as="h1" size="xl">
              Dostępne na zapytanie
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Nie wszystkie zegarki w naszej ofercie są prezentowane publicznie. 
              Część kolekcji udostępniamy wyłącznie w bezpośrednim kontakcie z 
              poważnymi kolekcjonerami.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Teaser Gallery */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="relative overflow-hidden rounded-md bg-foreground/5 p-8 lg:p-12">
            <div className="absolute inset-0 backdrop-blur-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6 opacity-20 md:grid-cols-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex h-40 w-40 items-center justify-center rounded bg-border"
                    >
                      <Watch className="h-16 w-16 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative z-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-background shadow-lg">
                <Lock className="h-8 w-8 text-accent-gold" />
              </div>
              <Heading as="h2" size="md" className="mt-8">
                Zegarki dla koneserów
              </Heading>
              <Text muted className="mx-auto mt-4 max-w-lg">
                Patek Philippe, Audemars Piguet, rzadkie Rolexy, vintage Omegi — 
                zapytaj o dostępność interesujących Cię modeli.
              </Text>
            </div>
          </div>
        </Container>
      </Section>

      {/* Why */}
      <Section spacing="lg">
        <Container>
          <div className="text-center">
            <Heading as="h2" size="lg">
              Dlaczego nie wszystko pokazujemy?
            </Heading>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {reasons.map((reason, index) => (
              <Card key={index} variant="outlined" padding="lg">
                <div className="flex h-12 w-12 items-center justify-center rounded bg-accent-green/10">
                  <reason.icon className="h-6 w-6 text-accent-green" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold">
                  {reason.title}
                </h3>
                <p className="mt-3 text-muted-foreground">
                  {reason.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section variant="muted" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <Heading as="h2" size="md">
              Zapytaj o dostępność
            </Heading>
            <Text muted className="mx-auto mt-4 max-w-lg">
              Opisz jaki zegarek Cię interesuje — marka, model, rocznik, stan. 
              Sprawdzimy dostępność i skontaktujemy się z Tobą.
            </Text>
          </div>
          <div className="mt-12">
            <InquiryForm
              subject="Zapytanie o kolekcję ekskluzywną"
              submitLabel="Wyślij zapytanie"
              successMessage="Dziękujemy za zapytanie. Sprawdzimy dostępność i skontaktujemy się w ciągu 24 godzin."
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
