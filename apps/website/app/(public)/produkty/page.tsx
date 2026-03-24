import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, Heading, Text, Button } from '@/components/ui'
import { ProductGrid } from '@/components/products'
import { mockProducts } from '@/data/mock-products'

export const metadata: Metadata = {
  title: 'Produkty',
  description:
    'Odkryj naszą starannie wyselekcjonowaną kolekcję zegarków premium. Każdy egzemplarz zweryfikowany pod kątem autentyczności i stanu.',
}

export default function ProduktyPage() {
  return (
    <>
      {/* Header */}
      <Section spacing="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" size="xl">
              Nasza kolekcja
            </Heading>
            <Text variant="lead" muted className="mt-6">
              Każdy zegarek w naszym butiku został starannie wyselekcjonowany. 
              Weryfikujemy autentyczność, stan techniczny i historię każdego 
              egzemplarza, aby oferować tylko wyjątkowe pozycje.
            </Text>
          </div>
        </Container>
      </Section>

      {/* Products */}
      <Section variant="muted" spacing="lg">
        <Container>
          <ProductGrid products={mockProducts} columns={3} />
        </Container>
      </Section>

      {/* CTA */}
      <Section spacing="lg">
        <Container size="narrow" className="text-center">
          <Heading as="h2" size="md">
            Nie znalazłeś tego, czego szukasz?
          </Heading>
          <Text muted className="mx-auto mt-4 max-w-xl">
            Część naszej kolekcji nie jest prezentowana publicznie. 
            Skontaktuj się z nami — być może mamy to, czego szukasz.
          </Text>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/kolekcja-na-zapytanie">Kolekcja na zapytanie</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/kontakt">Skontaktuj się</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}
