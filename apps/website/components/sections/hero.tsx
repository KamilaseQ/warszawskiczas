'use client'

import Link from 'next/link'
import { Container, Button } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full flex-col items-center justify-start overflow-hidden bg-background pt-20 lg:pt-28">
      
      {/* Full Background Video Placeholder - Much Darker */}
      <div className="absolute inset-0 z-0 bg-black">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="h-full w-full object-cover object-center opacity-60 transition-opacity duration-1000"
          poster="https://images.unsplash.com/photo-1542496658-e326770f1ce4?q=80&w=2000&auto=format&fit=crop"
        >
          <source src="https://player.vimeo.com/external/530182643.hd.mp4?s=bc6dcb06ea29eeaf4c084cf7df6abfa59baffc64&profile_id=175&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        {/* Deep darkening for maximum contrast and removing top 'fogs' */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Top Centered - Pushed Higher */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center mt-0">
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

        <FadeIn delay={0.4} direction="up" className="mt-12 flex items-center justify-center gap-4 relative">
          {/* Invisible soft glow/shadow protecting CTA contrast */}
          <div className="absolute -inset-8 bg-black/40 blur-2xl z-0 rounded-full pointer-events-none" />
          
          <Button asChild className="relative z-10 h-12 px-8 bg-foreground text-background shadow-lg hover:bg-white hover:text-black transition-all">
            <Link href="/produkty">Odkryj kolekcję</Link>
          </Button>
          <Button variant="outline" asChild className="relative z-10 h-12 px-8 border-white/30 text-white bg-black/10 backdrop-blur-md shadow-lg hover:bg-white hover:text-black transition-all">
            <Link href="/butik">O butiku</Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  )
}
