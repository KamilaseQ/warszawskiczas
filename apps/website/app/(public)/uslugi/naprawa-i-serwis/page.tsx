import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { Container, Section, Heading, Text, Card, Button } from '@/components/ui'
import { InquiryForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Naprawa i serwis zegarków',
  description:
    'Profesjonalny serwis zegarmistrzowski w Warszawie. Przeglądy, naprawy, regulacje, renowacje zegarków mechanicznych wszystkich marek.',
}

const services = [
  {
    title: 'Przegląd okresowy',
    description:
      'Kompleksowy przegląd mechanizmu, czyszczenie, smarowanie, regulacja chodu, test wodoszczelności.',
  },
  {
    title: 'Naprawa mechanizmu',
    description:
      'Diagnoza i naprawa uszkodzeń mechanicznych, wymiana zużytych części, odbudowa komplikacji.',
  },
  {
    title: 'Wymiana części',
    description:
      'Wymiana szkieł, koronek, uszczelek, sprężyn, wskazówek. Oryginalne części lub wysokiej jakości zamienniki.',
  },
  {
    title: 'Renowacja',
    description:
      'Profesjonalne polerowanie koperty i bransolety, renowacja tarcz, odświeżanie wyglądu.',
  },
  {
    title: 'Regulacja chodu',
    description:
      'Precyzyjna regulacja mechanizmu na pozycjomierzu elektronicznym dla optymalnej dokładności.',
  },
  {
    title: 'Test wodoszczelności',
    description:
      'Profesjonalny test szczelności i wymiana uszczelek dla przywrócenia wodoodporności.',
  },
]

const process = [
  {
    step: '01',
    title: 'Przyjęcie zlecenia',
    description: 'Oględziny zegarka, omówienie potrzeb, wstępna wycena.',
  },
  {
    step: '02',
    title: 'Diagnoza',
    description: 'Szczegółowa analiza mechanizmu i stanu technicznego.',
  },
  {
    step: '03',
    title: 'Wycena i akceptacja',
    description: 'Dokładna wycena i uzgodnienie zakresu prac.',
  },
  {
    step: '04',
    title: 'Realizacja',
    description: 'Profesjonalne wykonanie zleconych prac.',
  },
  {
    step: '05',
    title: 'Kontrola jakości',
    description: 'Testy funkcjonalne i wizualna kontrola.',
  },
  {
    step: '06',
    title: 'Odbiór',
    description: 'Przekazanie zegarka z gwarancją na usługę.',
  },
]

export default function NaprawaISerwisPage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Naprawa i serwis
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Profesjonalny serwis zegarmistrzowski z wieloletnim doświadczeniem. 
              Serwisujemy zegarki mechaniczne wszystkich marek — od przeglądu 
              okresowego po skomplikowane naprawy.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section variant="muted" spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Zakres usług
          </Heading>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} variant="outlined" padding="md" className="bg-background">
                <h3 className="font-serif text-lg font-semibold">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {service.description}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Jak pracujemy
          </Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {process.map((item, index) => (
              <div key={index} className="flex gap-4">
                <span className="font-serif text-3xl font-bold text-accent-green/20">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA / Form */}
      <Section variant="muted" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <Heading as="h2" size="md">
              Umów serwis
            </Heading>
            <Text muted className="mx-auto mt-4 max-w-lg">
              Opisz problem lub rodzaj serwisu, którego potrzebujesz. 
              Skontaktujemy się, aby ustalić szczegóły.
            </Text>
          </div>
          <div className="mt-12">
            <InquiryForm
              subject="Zapytanie o serwis"
              submitLabel="Wyślij zapytanie"
              successMessage="Dziękujemy. Skontaktujemy się w ciągu 24 godzin."
            />
          </div>
        </Container>
      </Section>
    </>
  )
}
