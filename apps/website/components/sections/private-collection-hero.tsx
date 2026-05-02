import { Lock } from 'lucide-react'
import { Container, Section, WaxSeal } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function PrivateCollectionHero() {
  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden bg-[#050403] text-white"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      {/* Atmospheric depth — two radial gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_30%,rgba(201,169,98,0.12)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_90%,rgba(201,169,98,0.06)_0%,transparent_55%)]" />

      {/* Hairline edge accents */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden h-[40%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent-gold/30 to-transparent lg:block" />
      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-[40%] w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-accent-gold/30 to-transparent lg:block" />

      {/* Vertical decorative typography — sides */}
      <div className="pointer-events-none absolute left-10 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] [transform:rotate(180deg)_translateX(50%)] origin-center xl:block">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.5em] text-accent-gold/45">
          Kolekcja na zapytanie
        </span>
      </div>
      <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] origin-center xl:block">
        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.5em] text-white/40">
          Warszawa &nbsp;·&nbsp; Mokotowska
        </span>
      </div>

      <Container className="relative pt-20 pb-12 sm:pt-24">
        <FadeIn>
          <p className="flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
            <Lock className="h-3 w-3 lock-pulse" />
            Dostęp ograniczony
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="mt-8 font-serif text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-[7rem] leading-[0.98] text-balance">
            Kolekcja<br />
            <span className="italic font-normal shimmer-gold">Prywatna</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="mt-10 max-w-xl font-sans text-base leading-relaxed text-white/55 text-pretty lg:text-lg">
            Zegarki z prywatnych kolekcji, nigdy niepublikowane w standardowej ofercie.
            Dla klientów, którzy wiedzą, czego szukają.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-14 flex items-end justify-between gap-6 border-t border-accent-gold/20 pt-6">
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-accent-gold/60" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-white/45">
                Weryfikacja wymagana
              </span>
            </div>
            <span className="hidden font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-white/35 sm:inline">
              Warszawski Czas &nbsp;·&nbsp; od 2009
            </span>
          </div>
        </FadeIn>

        {/* Wax seal — bottom right anchor */}
        <FadeIn delay={0.4}>
          <div className="pointer-events-none absolute right-6 bottom-10 hidden sm:block lg:right-12 lg:bottom-14">
            <WaxSeal size={92} rotate={-8} />
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
