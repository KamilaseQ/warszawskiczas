import Link from 'next/link'
import { Wrench, ArrowDownToLine, Repeat, ArrowRight } from 'lucide-react'
import { Container, Section, Heading, Text, Card } from '@/components/ui'

const services = [
  {
    icon: Wrench,
    title: 'Naprawa i serwis',
    description:
      'Profesjonalny serwis zegarmistrzowski. Przeglądy, regulacje, naprawy i renowacje zegarków mechanicznych wszystkich marek.',
    href: '/uslugi/naprawa-i-serwis',
  },
  {
    icon: ArrowDownToLine,
    title: 'Skup zegarków',
    description:
      'Uczciwa wycena i natychmiastowa płatność. Skupujemy zegarki premium, vintage oraz biżuterię.',
    href: '/uslugi/skup',
  },
  {
    icon: Repeat,
    title: 'Komis',
    description:
      'Profesjonalna sprzedaż w komisie. Dotrzemy do właściwych kolekcjonerów i uzyskamy najlepszą cenę za Twój zegarek.',
    href: '/uslugi/komis',
  },
]

export function ServicesOverview() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="text-center">
          <Heading as="h2" size="lg">
            Usługi eksperckie
          </Heading>
          <Text muted className="mx-auto mt-4 max-w-2xl">
            Pełen zakres usług dla właścicieli i kolekcjonerów zegarków. 
            Każde zlecenie traktujemy indywidualnie.
          </Text>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={index}
              variant="outlined"
              padding="lg"
              className="group transition-colors hover:border-accent-green/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded bg-accent-green/10">
                <service.icon className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold">
                {service.title}
              </h3>
              <p className="mt-3 text-muted-foreground">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-6 inline-flex items-center text-sm font-medium text-accent-green transition-colors hover:text-accent-green/80"
              >
                Dowiedz się więcej
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
