'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { ChevronDown } from 'lucide-react'
import { useEffect, useRef } from 'react'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)

  // 1.8 Parallax na tytule przy scrollu
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return
      const y = window.scrollY
      contentRef.current.style.transform = `translateY(${y * 0.25}px)`
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 1.1 Scroll indicator — smooth scroll do ProductShowcase
  const handleScrollDown = () => {
    const target = document.getElementById('product-showcase')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-center overflow-hidden bg-black">

      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          style={{ filter: 'saturate(1.2) contrast(1.15) brightness(0.9)' }}
        >
          <source src="/rolex.mp4" type="video/mp4" />
        </video>

        {/* Multi-layered Overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/20 to-transparent h-48" />
        <div className="absolute inset-0 top-auto bg-gradient-to-t from-black/95 via-black/50 to-transparent h-1/2" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[300px] bg-black/40 blur-3xl rounded-[100%]" />
        </div>
      </div>

      {/* Content — z-20, wycentrowane pionowo (1.6) */}
      <div
        ref={contentRef}
        className="relative z-20 flex w-full max-w-4xl flex-col items-center px-6 text-center will-change-transform"
      >
        <FadeIn direction="up" className="mb-4">
          {/* 1.3 Eyebrow — Mokotowska 71 tylko tutaj */}
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent-gold">
            Mokotowska 71 &nbsp;·&nbsp; Warszawa
          </span>
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          {/* 1.5 Responsywność H1 */}
          <h1 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl drop-shadow-xl text-balance">
            Luksusowe Zegarki
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} direction="up" className="mt-8">
          {/* 1.4 Podtytuł BEZ adresu — tylko charakter */}
          <p className="max-w-xl font-sans text-xs md:text-sm font-extralight tracking-[0.22em] uppercase text-white/70 text-balance leading-loose drop-shadow-sm">
            Wyselekcjonowana kolekcja dla wymagających kolekcjonerów
          </p>
        </FadeIn>

        {/* 1.7 Hierarchia CTA: PRIMARY (white filled) + TERTIARY (text + strzałka) */}
        {/* 13.1 hero-mobile-breathe — więcej powietrza na mobile */}
        <FadeIn delay={0.4} direction="up" className="mt-12 sm:mt-12 flex items-center justify-center gap-6 sm:gap-8 relative flex-wrap hero-mobile-breathe">
          <div className="absolute -inset-8 bg-black/40 blur-2xl z-0 rounded-full pointer-events-none" />

          {/* PRIMARY */}
          <Link href="/produkty" className="btn-premium-white relative z-10">
            Odkryj kolekcję
          </Link>

          {/* TERTIARY — tylko tekst + strzałka */}
          <Link
            href="/butik"
            className="relative z-10 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 transition-colors duration-300 hover:text-accent-gold group"
          >
            O butiku
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </FadeIn>
      </div>

      {/* 1.1+1.2 Scroll Indicator — klikalny, cursor:pointer */}
      <button
        type="button"
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 cursor-pointer bg-transparent border-none p-0"
        aria-label="Przewiń do kolekcji"
      >
        <div className="scroll-indicator-group flex flex-col items-center gap-2">
          <span className="scroll-indicator-label">Przewiń</span>
          <ChevronDown
            className="scroll-indicator-icon scroll-indicator-bounce h-4 w-4 transition-colors"
            style={{ color: 'rgba(245, 243, 239, 0.4)' }}
          />
        </div>
      </button>
    </section>
  )
}
