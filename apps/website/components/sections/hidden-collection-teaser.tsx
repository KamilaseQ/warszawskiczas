'use client'

import Link from 'next/link'
import { Lock, Watch } from 'lucide-react'
import { Container, Section, Heading, Text, Badge } from '@/components/ui'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

export function HiddenCollectionTeaser() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: 'center', dragFree: true },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: false })]
  )

  return (
    <Section variant="muted" spacing="lg">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-foreground/5">
              
              {/* Blurred gated content - Now a carousel */}
              <div className="lock-blurred absolute inset-0">
                <div className="absolute inset-0 flex items-center justify-center">
                  
                  {/* Embla Carousel */}
                  <div className="overflow-hidden w-full" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-4">
                      {/* Generates 8 items for a smooth infinite loop */}
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <div key={i} className="min-w-0 flex-[0_0_50%] pl-4 sm:flex-[0_0_33%]">
                          <div className="flex h-40 w-full items-center justify-center rounded bg-border">
                            <Watch className="h-16 w-16 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Lock Overlay */}
              <div className="lock-overlay absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-full bg-background/10 p-5">
                    <Lock className="h-8 w-8" style={{ color: '#c9a962' }} />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest text-center"
                    style={{ color: 'rgba(201,169,98,0.7)' }}
                  >
                    Tylko dla kolekcjonerów <br/> (Zabezpieczone)
                  </span>
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
            <Link href="/kolekcja-na-zapytanie" className="btn-sharp mt-8 inline-block">
              Dowiedz się więcej
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
