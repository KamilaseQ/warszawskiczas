import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Container, Section, Heading, Text, Card } from '@/components/ui'
import { ContactForm } from '@/components/forms'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Skontaktuj się z butikiem Warszawski Czas. Telefon, email, formularz kontaktowy. Mokotowska 71, Warszawa.',
}

const contactMethods = [
  {
    icon: MapPin,
    title: 'Adres',
    content: 'ul. Mokotowska 71\n00-530 Warszawa',
    link: 'https://maps.google.com',
    linkText: 'Pokaż na mapie',
  },
  {
    icon: Phone,
    title: 'Telefon',
    content: '+48 123 456 789',
    link: 'tel:+48123456789',
    linkText: 'Zadzwoń',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'kontakt@warszawskiczas.pl',
    link: 'mailto:kontakt@warszawskiczas.pl',
    linkText: 'Napisz',
  },
  {
    icon: Clock,
    title: 'Godziny otwarcia',
    content: 'Pon-Pt: 10:00-18:00\nSob: 10:00-14:00',
  },
]

export default function KontaktPage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Kontakt
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Masz pytanie o zegarek, chcesz umówić wizytę lub dowiedzieć się 
              więcej o naszych usługach? Skontaktuj się z nami — chętnie 
              pomożemy.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Contact Methods */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <Card key={index} variant="outlined" padding="md" className="bg-background">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-green/10">
                  <method.icon className="h-5 w-5 text-accent-green" />
                </div>
                <h3 className="mt-4 font-semibold">{method.title}</h3>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">
                  {method.content}
                </p>
                {method.link && (
                  <a
                    href={method.link}
                    className="mt-4 inline-block text-sm font-medium text-accent-green transition-colors hover:text-accent-green/80"
                  >
                    {method.linkText}
                  </a>
                )}
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Form */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Heading as="h2" size="md">
                Napisz do nas
              </Heading>
              <Text muted className="mt-4">
                Wypełnij formularz, a odpowiemy najszybciej jak to możliwe — 
                zwykle w ciągu 24 godzin w dni robocze.
              </Text>
              <div className="mt-8">
                <h3 className="font-semibold">Często zadawane pytania</h3>
                <ul className="mt-4 space-y-3">
                  {[
                    'Jak mogę umówić wizytę w butiku?',
                    'Czy oferujecie wycenę zegarków?',
                    'Jak długo trwa serwis zegarka?',
                    'Czy skupujecie zegarki bez dokumentów?',
                  ].map((question, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm text-muted-foreground"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent-green" />
                      {question}
                    </li>
                  ))}
                </ul>
                <Text variant="small" muted className="mt-6">
                  Możesz zapytać o wszystko — na każde pytanie odpowiemy z 
                  przyjemnością.
                </Text>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Placeholder */}
      <Section variant="muted" spacing="sm">
        <Container>
          <div className="aspect-[21/9] overflow-hidden rounded-md bg-background">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Mapa lokalizacji — Mokotowska 71, Warszawa
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
