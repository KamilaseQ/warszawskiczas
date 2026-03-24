import Link from 'next/link'
import { Lock, Watch } from 'lucide-react'
import { Container, Section, Heading, Text, Button, Badge } from '@/components/ui'

export function HiddenCollectionTeaser() {
  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-foreground/5">
              {/* Blurred/mysterious overlay */}
              <div className="absolute inset-0 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 opacity-30">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex h-32 w-32 items-center justify-center rounded bg-border"
                      >
                        <Watch className="h-12 w-12 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Lock icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-background/90 p-6 shadow-lg">
                  <Lock className="h-8 w-8 text-accent-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <Badge variant="premium" className="mb-4">
              Kolekcja ekskluzywna
            </Badge>
            <Heading as="h2" size="lg">
              Dostępne na zapytanie
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Niektóre egzemplarze z naszej kolekcji nie są prezentowane 
              publicznie. To zegarki o wyjątkowej historii, rzadkości lub 
              wartości, dostępne wyłącznie dla poważnych kolekcjonerów.
            </Text>
            <Text muted className="mt-4">
              Jeśli szukasz czegoś szczególnego — konkretnego modelu, rocznika 
              lub komplikacji — skontaktuj się z nami. Być może mamy to, czego 
              szukasz, lub możemy to dla Ciebie znaleźć.
            </Text>
            <Button asChild className="mt-8">
              <Link href="/kolekcja-na-zapytanie">Dowiedz się więcej</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
