import Link from 'next/link'
import { MapPin, Clock, Phone } from 'lucide-react'
import { Container, Section, Heading, Text, Button } from '@/components/ui'

export function BoutiquePreview() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div>
            <Heading as="h2" size="lg">
              Odwiedź nasz butik
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Zapraszamy do naszej przestrzeni na Mokotowskiej, gdzie w spokojnej 
              atmosferze możesz poznać naszą kolekcję i porozmawiać z ekspertami.
            </Text>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                <div>
                  <p className="font-medium">Adres</p>
                  <p className="text-muted-foreground">
                    ul. Mokotowska 71, 00-530 Warszawa
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                <div>
                  <p className="font-medium">Godziny otwarcia</p>
                  <p className="text-muted-foreground">
                    Pon-Pt: 10:00-18:00 | Sob: 10:00-14:00
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-green" />
                <div>
                  <p className="font-medium">Kontakt</p>
                  <p className="text-muted-foreground">+48 123 456 789</p>
                </div>
              </div>
            </div>

            <Button asChild className="mt-8">
              <Link href="/butik">Więcej o butiku</Link>
            </Button>
          </div>

          {/* Visual Placeholder */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-md bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  Wnętrze butiku Warszawski Czas
                </p>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="absolute -bottom-4 -left-4 h-full w-full rounded-md border border-accent-green/20 lg:-bottom-6 lg:-left-6" />
          </div>
        </div>
      </Container>
    </Section>
  )
}
