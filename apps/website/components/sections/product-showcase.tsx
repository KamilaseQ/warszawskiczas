'use client'

import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container, Section, Heading, Text } from '@/components/ui'
import { ProductCard } from '@/components/products/product-card'
import { featuredProducts } from '@/data/mock-products'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback } from 'react'
import { FadeIn } from '@/components/ui/fade-in'

export function ProductShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
  })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <Section spacing="lg" className="overflow-hidden">
      <Container>
        <FadeIn className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end mb-12">
          <div>
            <Heading as="h2" size="lg" className="font-serif italic tracking-wide">
              Wyselekcjonowane dzieła sztuki
            </Heading>
            <Text muted className="mt-3 max-w-xl">
              Poznaj unikalne zegarki premium, które wybraliśmy ze względu na ich bezkompromisową jakość i wyjątkową historię.
            </Text>
          </div>
          <Link
            href="/produkty"
            className="group inline-flex items-center text-sm font-serif italic tracking-widest text-foreground transition-colors hover:text-accent-gold"
          >
            Zobacz wszystkie
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </Container>

      {/* Embla Carousel */}
      <FadeIn delay={0.2} direction="up" className="relative mx-auto max-w-7xl px-8 md:px-16 lg:px-24">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y -ml-4 lg:-ml-16">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="min-w-0 flex-[0_0_85%] pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.33%] lg:pl-16 py-8 transition-transform duration-500 ease-in-out"
              >
                <ProductCard product={product} className="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={scrollPrev}
            className="flex h-12 w-12 items-center justify-center border border-border text-foreground transition-all hover:bg-foreground hover:text-background"
            aria-label="Poprzedni"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollNext}
            className="flex h-12 w-12 items-center justify-center border border-border text-foreground transition-all hover:bg-foreground hover:text-background"
            aria-label="Następny"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </FadeIn>
    </Section>
  )
}
