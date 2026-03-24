import type { Metadata } from 'next'
import Link from 'next/link'
import { Wrench, ArrowDownToLine, Repeat, ArrowRight, Award, Shield, Clock } from 'lucide-react'
import { Container, Section, Heading, Text, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Usługi',
  description:
    'Profesjonalne usługi zegarmistrzowskie: serwis i naprawa, skup zegarków, komis. Wieloletnie doświadczenie, uczciwe podejście.',
}

const services = [
  {
    icon: Wrench,
    title: 'Naprawa i serwis',
    description:
      'Profesjonalny serwis zegarmistrzowski. Przeglądy, regulacje, naprawy mechanizmów, wymiana części, renowacje koperty i bransolet.',
    features: ['Przeglądy okresowe', 'Naprawy mechanizmów', 'Renowacje', 'Polerowanie'],
    href: '/uslugi/naprawa-i-serwis',
  },
  {
    icon: ArrowDownToLine,
    title: 'Skup zegarków',
    description:
      'Uczciwa wycena i natychmiastowa płatność. Skupujemy zegarki premium wszystkich marek, także vintage i biżuterię.',
    features: ['Wycena gratis', 'Płatność od ręki', 'Wszystkie marki', 'Dyskrecja'],
    href: '/uslugi/skup',
  },
  {
    icon: Repeat,
    title: 'Komis',
    description:
      'Profesjonalna sprzedaż w komisie. Dotrzemy do właściwych kolekcjonerów, zadbamy o prezentację i uzyskamy najlepszą cenę.',
    features: ['Profesjonalna prezentacja', 'Szeroka sieć kontaktów', 'Transparentne warunki', 'Marketing'],
    href: '/uslugi/komis',
  },
]

const expertise = [
  {
    icon: Award,
    title: '15+ lat doświadczenia',
    description: 'Wieloletnia praktyka w serwisowaniu zegarków premium.',
  },
  {
    icon: Shield,
    title: 'Gwarancja na usługi',
    description: 'Wszystkie naprawy objęte gwarancją jakości.',
  },
  {
    icon: Clock,
    title: 'Indywidualne podejście',
    description: 'Każde zlecenie traktujemy z należytą uwagą.',
  },
]

export default function UslugiPage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Usługi eksperckie
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Pełen zakres usług dla właścicieli i kolekcjonerów zegarków. 
              Każde zlecenie traktujemy indywidualnie, z zachowaniem najwyższych 
              standardów jakości.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card
                key={index}
                variant="outlined"
                padding="lg"
                className="flex flex-col bg-background transition-colors hover:border-accent-green/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded bg-accent-green/10">
                  <service.icon className="h-7 w-7 text-accent-green" />
                </div>
                <h2 className="mt-6 font-serif text-2xl font-semibold">
                  {service.title}
                </h2>
                <p className="mt-4 flex-1 text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent-green" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="mt-8 inline-flex items-center text-sm font-medium text-accent-green transition-colors hover:text-accent-green/80"
                >
                  Dowiedz się więcej
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Expertise */}
      <Section spacing="lg">
        <Container>
          <div className="text-center">
            <Heading as="h2" size="lg">
              Dlaczego my?
            </Heading>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {expertise.map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-green/10">
                  <item.icon className="h-6 w-6 text-accent-green" />
                </div>
                <h3 className="mt-6 font-serif text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-3 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
