import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function FinalCTA() {
  return (
    // 8.3 Ciemne tło z białym tekstem i złotem
    <Section spacing="lg" className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* 8.5 Tekstura grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Subtelny złoty gradient w tle */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(160,120,60,0.08)_0%,transparent_60%)] pointer-events-none" />

      <Container size="narrow" className="relative z-10 text-center">
        <FadeIn direction="up">
          {/* 8.4 Subttelny element pilności — elegancki */}
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-8">
            VII &nbsp;——&nbsp; Zacznij rozmowę
          </p>

          {/* 8.1 Heading — większy */}
          <h2 className="font-serif text-4xl lg:text-5xl font-medium tracking-tight text-white text-balance">
            Szukasz czegoś<br />
            <span className="italic font-normal text-accent-gold">wyjątkowego?</span>
          </h2>

          <p className="mx-auto mt-8 max-w-xl text-base lg:text-lg leading-relaxed text-white/50">
            Skontaktuj się z nami lub odwiedź butik na Mokotowskiej 71.
            Każda wizyta to konsultacja z ekspertem — bez zobowiązań.
          </p>

          {/* Subtelny separator */}
          <div className="mx-auto mt-8 h-px w-16 bg-accent-gold/30" />
        </FadeIn>

        {/* 8.2 Hierarchia przycisków */}
        <FadeIn delay={0.15} direction="up">
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* PRIMARY */}
            <Link href="/kontakt" className="btn-premium-white">
              Skontaktuj się
            </Link>
            {/* SECONDARY — tertiary style */}
            <Link
              href="/butik"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/50 hover:text-accent-gold transition-colors duration-300 group py-4"
            >
              Odwiedź butik
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
