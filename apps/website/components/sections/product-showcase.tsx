'use client'

import Link from 'next/link'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { Container, Section, Heading } from '@/components/ui'
import { featuredProducts } from '@/data/mock-products'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FadeIn } from '@/components/ui/fade-in'
import { cn } from '@/lib/utils'

const AUTO_INTERVAL = 4500

export function ProductShowcase() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    skipSnaps: false,
    duration: 65,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi || isPaused) return
    autoplayRef.current = setInterval(() => emblaApi.scrollNext(), AUTO_INTERVAL)
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current) }
  }, [emblaApi, isPaused])

  const formatPrice = (price?: number) =>
    price
      ? new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0 }).format(price)
      : 'Cena na zapytanie'

  return (
    <Section id="product-showcase" spacing="lg" className="overflow-hidden">
      <Container>
        {/* Editorial Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
              I &nbsp;——&nbsp; Kolekcja
            </p>
            <Heading as="h2" size="lg" className="font-serif font-medium tracking-tight">
              Wyselekcjonowane<br />
              <span className="font-serif italic font-normal">dzieła sztuki</span>
            </Heading>
          </div>
          <Link
            href="/produkty"
            className="group mb-1 inline-flex items-center gap-2 text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            Pełna kolekcja
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </Container>

      {/* Embla Carousel */}
      <FadeIn delay={0.15} direction="up">
        <div className="relative mx-auto max-w-[1400px] overflow-hidden">
          <div ref={emblaRef}>
            <div className="flex touch-pan-y">
              {featuredProducts.map((product, index) => {
                const isActive = index === selectedIndex

                return (
                  <div
                    key={product.id}
                    className="relative min-w-0 flex-[0_0_75%] sm:flex-[0_0_45%] lg:flex-[0_0_33.333%]"
                    style={{ paddingLeft: 'clamp(0.5rem, 1.2vw, 1.25rem)', paddingRight: 'clamp(0.5rem, 1.2vw, 1.25rem)' }}
                  >
                    <div
                      className={cn(
                        'h-full transition-all duration-1000 ease-out',
                        isActive ? 'showcase-card--active' : 'showcase-card--side'
                      )}
                    >
                      <article
                        className="group relative flex flex-col h-full cursor-pointer"
                        onClick={() => !isActive && emblaApi?.scrollTo(index)}
                        onMouseEnter={() => isActive && setIsPaused(true)}
                        onMouseLeave={() => isActive && setIsPaused(false)}
                      >
                        {/* Index + brand strip */}
                        <div className={cn(
                          'flex items-center gap-3 mb-3 whitespace-nowrap transition-opacity duration-700',
                          isActive ? 'opacity-100' : 'opacity-40'
                        )}>
                          <span className="text-[9px] font-sans font-bold tracking-[0.5em] text-muted-foreground/50 tabular-nums">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <div className="h-px w-6 bg-border flex-shrink-0" />
                          <span className="text-[9px] font-sans font-bold tracking-[0.35em] text-accent-gold uppercase">
                            {product.brand}
                          </span>
                        </div>

                        {/* Image area */}
                        {/* 13.2 Mniejsza wysokość karty na mobile */}
                        <div className="relative overflow-hidden bg-muted aspect-[4/5] sm:aspect-[3/4]">
                          <div className={cn(
                            'absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]',
                            isActive ? 'scale-[1.04] animate-[showcase-float_6s_ease-in-out_infinite]' : 'scale-100'
                          )}>
                            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(40,15%,92%)] via-[hsl(40,10%,88%)] to-[hsl(40,8%,82%)]" />

                            {/* Watch dial SVG */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                viewBox="0 0 80 80"
                                className={cn(
                                  'transition-all duration-700 ease-out',
                                  isActive ? 'h-24 w-24 opacity-[0.14]' : 'h-14 w-14 opacity-[0.07]'
                                )}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="0.8"
                              >
                                <circle cx="40" cy="40" r="36" />
                                <circle cx="40" cy="40" r="30" />
                                <line x1="40" y1="12" x2="40" y2="18" strokeWidth="1.2" />
                                <line x1="40" y1="62" x2="40" y2="68" strokeWidth="1.2" />
                                <line x1="12" y1="40" x2="18" y2="40" strokeWidth="1.2" />
                                <line x1="62" y1="40" x2="68" y2="40" strokeWidth="1.2" />
                                <line x1="40" y1="40" x2="40" y2="24" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="40" y1="40" x2="54" y2="34" strokeWidth="1" strokeLinecap="round" />
                                <circle cx="40" cy="40" r="1.5" fill="currentColor" />
                              </svg>
                            </div>

                            {/* 2.1 USUNIĘTE labele animate-pulse — BRAK */}

                            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/[0.03] transition-colors duration-500" />
                          </div>
                        </div>

                        {/* Text content */}
                        <div className={cn(
                          'pt-5 transition-all duration-700',
                          isActive ? 'opacity-100' : 'opacity-30'
                        )}>
                          <h3 className={cn(
                            'font-serif font-medium tracking-tight text-foreground transition-all duration-500',
                            isActive ? 'text-xl' : 'text-base'
                          )}>
                            {product.name}
                          </h3>
                          {isActive && (
                            <>
                              <p className="mt-2 text-[13px] font-sans text-muted-foreground leading-relaxed line-clamp-2 showcase-fade-in">
                                {product.description}
                              </p>
                              <div className="mt-4 flex items-center justify-between showcase-fade-in" style={{ animationDelay: '80ms' }}>
                                <span className={cn(
                                  'text-[11px] font-sans font-semibold tracking-[0.12em] uppercase',
                                  product.price ? 'text-foreground' : 'text-muted-foreground'
                                )}>
                                  {formatPrice(product.price)}
                                </span>
                                {/* 2.4 ZAPYTAJ — pełna widoczność */}
                                <Link
                                  href="/kontakt"
                                  className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/80 hover:text-accent-gold transition-colors duration-300 border-b border-foreground/30 hover:border-accent-gold pb-px"
                                >
                                  Zapytaj
                                </Link>
                              </div>
                            </>
                          )}
                        </div>

                        {isActive && (
                          <div className="mt-3 h-px w-0 bg-accent-gold transition-all duration-1000 ease-out group-hover:w-full" />
                        )}
                      </article>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 px-4 sm:px-8 lg:px-12">
            {/* 2.3 Progress dots — wyraźny progres */}
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'relative h-0.5 overflow-hidden transition-all duration-500',
                    i === selectedIndex ? 'w-10 bg-border' : 'w-4 bg-border/40'
                  )}
                  aria-hidden="true"
                >
                  {i === selectedIndex && (
                    <div
                      className="absolute inset-0 bg-accent-gold"
                      style={{
                        transformOrigin: 'left',
                        animation: isPaused ? 'none' : `showcase-progress ${AUTO_INTERVAL}ms linear both`,
                      }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* 2.2 Strzałki — hover gold */}
            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
                aria-label="Poprzedni"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollNext}
                className="flex h-10 w-10 items-center justify-center border border-border text-foreground hover:border-accent-gold hover:text-accent-gold transition-all duration-300"
                aria-label="Następny"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Section>
  )
}
