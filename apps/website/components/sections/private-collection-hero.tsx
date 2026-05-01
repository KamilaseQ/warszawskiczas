import { Lock } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function PrivateCollectionHero() {
  return (
    <Section spacing="lg" className="relative overflow-hidden bg-[#0b1410] text-white">
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(201,169,98,0.08)_0%,transparent_50%)]" />

      <Container className="relative pt-16">
        <FadeIn>
          <p className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
            <Lock className="h-3 w-3" />
            Dostęp ograniczony
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mt-6 font-serif text-5xl font-medium tracking-tight text-white sm:text-6xl lg:text-[5rem] leading-[1.02] text-balance">
            Kolekcja<br />
            <span className="italic font-normal">Prywatna</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-white/60 text-pretty lg:text-lg">
            Zegarki z prywatnych kolekcji, nigdy niepublikowane w standardowej ofercie.
            Dla klientów, którzy wiedzą, czego szukają.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-10 flex items-center gap-4">
            <div className="h-px w-16 bg-accent-gold/60" />
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
              Weryfikacja wymagana
            </span>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
