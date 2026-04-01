import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, Phone, Mail, Car, Train } from 'lucide-react'
import { Container, Section, Heading, Text, Button, Card } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Butik',
  description:
    'Odwiedź butik Warszawski Czas na Mokotowskiej 71. Ekskluzywna przestrzeń dla miłośników zegarków w sercu Warszawy.',
}

export default function ButikPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="md">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Heading as="h1" size="xl">
                Nasz butik
              </Heading>
              <Text variant="lead" muted className="mt-6">
                Mokotowska 71 — w historycznej kamienicy, w sercu warszawskiego 
                Śródmieścia, stworzyliśmy przestrzeń dla pasjonatów i kolekcjonerów 
                zegarków.
              </Text>
              <Text muted className="mt-4">
                To miejsce, gdzie mechaniczna precyzja spotyka się z historią 
                i kulturą stolicy. Zapraszamy do odwiedzenia nas osobiście.
              </Text>
            </div>
            {/* Visual Placeholder */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-md bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Fasada butiku Warszawski Czas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section variant="muted" spacing="lg">
        <Container size="narrow">
          <div className="text-center">
            <Heading as="h2" size="lg">
              Historia i filozofia
            </Heading>
          </div>
          <div className="mt-12 space-y-6 text-muted-foreground">
            <Text>
              Warszawski Czas powstał z pasji do zegarmistrzostwa i przekonania, 
              że zakup wyjątkowego zegarka powinien być doświadczeniem, nie 
              transakcją. Tworząc nasz butik, chcieliśmy stworzyć przestrzeń, 
              w której czas płynie wolniej.
            </Text>
            <Text>
              Nasza lokalizacja na Mokotowskiej nie jest przypadkowa. To jedna 
              z najbardziej prestiżowych ulic Warszawy, z bogatą historią i 
              eleganckim charakterem, który idealnie oddaje ducha naszej marki.
            </Text>
            <Text>
              W Warszawskim Czasie nie jesteś klientem — jesteś gościem. 
              Zapraszamy do spokojnej rozmowy przy kawie, bez presji zakupowej. 
              Wierzymy, że właściwy zegarek sam znajdzie swojego właściciela.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Gallery Placeholder */}
      <Section spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Nasza przestrzeń
          </Heading>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {['Witryna', 'Wnętrze', 'Detale'].map((label, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-md bg-muted"
              >
                <div className="flex h-full items-center justify-center">
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <Heading as="h2" size="md">
                Doświadczenie wizyty
              </Heading>
              <Text muted className="mt-6">
                Wizyta w naszym butiku to czas poświęcony Tobie. Nie spieszmy się — 
                opowiemy o historii każdego zegarka, pozwolimy go przymierzyć, 
                odpowiemy na każde pytanie.
              </Text>
              <ul className="mt-8 space-y-4">
                {[
                  'Indywidualna konsultacja z ekspertem',
                  'Prezentacja wybranych egzemplarzy',
                  'Możliwość przymierzenia zegarków',
                  'Profesjonalne doradztwo bez presji',
                  'Kawa lub herbata w spokojnej atmosferze',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card variant="outlined" padding="lg" className="bg-background">
              <h3 className="font-serif text-xl font-semibold">
                Umów wizytę
              </h3>
              <Text variant="small" muted className="mt-4">
                Choć jesteśmy otwarci dla wszystkich gości, rekomendujemy 
                umówienie wizyty, szczególnie jeśli szukasz czegoś konkretnego. 
                Dzięki temu przygotujemy odpowiednie egzemplarze.
              </Text>
              <Button asChild className="mt-6 w-full">
                <Link href="/kontakt">Umów wizytę</Link>
              </Button>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Practical Info */}
      <Section spacing="lg">
        <Container>
          <Heading as="h2" size="lg" className="text-center">
            Informacje praktyczne
          </Heading>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
                <MapPin className="h-5 w-5 text-accent-gold" />
              </div>
              <h3 className="mt-4 font-semibold">Adres</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ul. Mokotowska 71<br />
                00-530 Warszawa
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
                <Clock className="h-5 w-5 text-accent-gold" />
              </div>
              <h3 className="mt-4 font-semibold">Godziny otwarcia</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Pon-Pt: 10:00-18:00<br />
                Sob: 10:00-14:00
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
                <Car className="h-5 w-5 text-accent-gold" />
              </div>
              <h3 className="mt-4 font-semibold">Parking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Strefa płatnego parkowania<br />
                Parking podziemny w pobliżu
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-gold/10">
                <Train className="h-5 w-5 text-accent-gold" />
              </div>
              <h3 className="mt-4 font-semibold">Komunikacja</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Metro Politechnika<br />
                Tramwaje: 10, 14, 15
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Placeholder */}
      <Section variant="muted" spacing="sm">
        <Container>
          <div className="aspect-[21/9] overflow-hidden rounded-md bg-muted">
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
