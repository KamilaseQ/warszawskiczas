import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container, Section, Heading, Text, Button } from '@/components/ui'
import { ProductGrid } from '@/components/products'
import { featuredProducts } from '@/data/mock-products'

export function ProductShowcase() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Heading as="h2" size="lg">
              Wybrane egzemplarze
            </Heading>
            <Text muted className="mt-3 max-w-xl">
              Każdy zegarek w naszej kolekcji został starannie wyselekcjonowany 
              pod kątem jakości, stanu i historii.
            </Text>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link href="/produkty">
              Zobacz wszystkie
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="mt-12">
          <ProductGrid products={featuredProducts} columns={4} />
        </div>
      </Container>
    </Section>
  )
}
