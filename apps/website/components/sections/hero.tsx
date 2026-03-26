'use client'

import Link from 'next/link'
import { Container } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative flex min-h-[100vh] w-full flex-col items-center justify-start overflow-hidden bg-black pt-20 lg:pt-28">

      {/* Cinematic Background — grayscale + contrast filters */}
      <div className="absolute inset-0 z-0 bg-black">
        {/* Fallback/Placeholder Image behind video */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: "url('/Gemini_Generated_Image_xi4mwxxi4mwxxi4m.png')",
            opacity: 0.6,
          }}
        />
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

        {/* Advanced Multi-layered Overlays for depth and contrast */}
        {/* 1. Base dark vignette targeting edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] mix-blend-multiply" />

        {/* 2. Top gradient for invisible header protection (Navbar contrast) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/20 to-transparent h-48" />

        {/* 3. Bottom gradient for CTA buttons contrast */}
        <div className="absolute inset-0 top-auto bg-gradient-to-t from-black/95 via-black/50 to-transparent h-1/2" />

        {/* 4. Center glow behind the main text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[300px] bg-black/40 blur-3xl rounded-[100%]" />
        </div>
      </div>

      {/* Content — z-index 20, sharp above overlay */}
      <div className="relative z-20 flex w-full max-w-4xl flex-col items-center px-6 text-center mt-0">
        <FadeIn direction="up" className="mb-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold">
            Mokotowska 71 | Warszawa
          </span>
        </FadeIn>

        <FadeIn delay={0.1} direction="up">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl drop-shadow-xl text-balance">
            Luksusowe Zegarki
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} direction="up" className="mt-8">
          <p className="max-w-2xl font-sans text-xs md:text-sm font-extralight tracking-[0.2em] uppercase text-white/90 text-balance leading-loose drop-shadow-sm">
            Butik luksusowych zegarków i biżuterii. Profesjonalny serwis, skup oraz komis unikatowych egzemplarzy w sercu Warszawy.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} direction="up" className="mt-12 flex items-center justify-center gap-6 relative">
          {/* Invisible soft glow protecting CTA contrast */}
          <div className="absolute -inset-8 bg-black/40 blur-2xl z-0 rounded-full pointer-events-none" />

          <Link href="/produkty" className="btn-sharp relative z-10">
            Odkryj kolekcję
          </Link>
          <Link
            href="/butik"
            className="relative z-10 inline-block border border-white/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur-md transition-all duration-[350ms] ease-out hover:border-accent-gold hover:text-accent-gold"
          >
            O butiku
          </Link>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2">
        <div className="scroll-indicator-group flex flex-col items-center gap-2 cursor-default">
          <span className="scroll-indicator-label">Przewiń</span>
          <ChevronDown
            className="scroll-indicator-icon scroll-indicator-bounce h-4 w-4 transition-colors"
            style={{ color: 'rgba(245, 243, 239, 0.4)' }}
          />
        </div>
      </div>
    </section>
  )
}
