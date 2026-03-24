import Link from 'next/link'
import { Watch } from 'lucide-react'
import { Container, Button, Heading, Text } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="max-w-xl">
            <p className="text-sm font-medium uppercase tracking-widest text-accent-green">
              Butik zegarków premium
            </p>
            <Heading as="h1" size="xl" className="mt-4">
              Czas ma swoją wartość
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Odkryj wyjątkową kolekcję zegarków i biżuterii w naszym butiku 
              na Mokotowskiej. Eksperci zegarmistrzowscy z wieloletnim 
              doświadczeniem.
            </Text>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild>
                <Link href="/produkty">Odkryj kolekcję</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/butik">O butiku</Link>
              </Button>
            </div>
          </div>

          {/* Visual Placeholder */}
          <div className="relative aspect-square lg:aspect-[4/5]">
            <div className="absolute inset-0 rounded-md bg-muted">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Watch
                    className="mx-auto h-24 w-24 text-border"
                    strokeWidth={0.75}
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    Wyróżniony zegarek
                  </p>
                </div>
              </div>
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-md border border-accent-green/20 lg:-bottom-6 lg:-right-6 lg:h-48 lg:w-48" />
          </div>
        </div>
      </Container>
    </section>
  )
}
