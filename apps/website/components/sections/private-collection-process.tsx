import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const steps = [
  {
    numeral: 'I',
    meta: 'Pierwszy kontakt',
    title: 'Telefon lub formularz',
    body:
      'Zadzwoń albo wypełnij krótki formularz na dole strony. Specjalista skontaktuje się z Tobą w odpowiedzi.',
  },
  {
    numeral: 'II',
    meta: 'Krótka rozmowa',
    title: 'Wstępna weryfikacja',
    body:
      'Krótka rozmowa o Twoich preferencjach i oczekiwaniach — bez zobowiązań, w spokojnej atmosferze.',
  },
  {
    numeral: 'III',
    meta: 'Od ręki',
    title: 'Kod dostępu',
    body:
      'Po wstępnej weryfikacji od razu otrzymujesz kod dostępu do prezentacji egzemplarzy.',
  },
]

export function PrivateCollectionProcess() {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-[#fbf6ec]">
      {/* Parchment grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(122,76,38,0.08)_0%,transparent_55%)]" />

      <Container>
        {/* Centered header — krótki, instruction-like */}
        <FadeIn>
          <div className="text-center">
            <p className="inline-flex items-center justify-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              <span className="h-px w-8 bg-accent-gold/60" />
              Jak uzyskać dostęp
              <span className="h-px w-8 bg-accent-gold/60" />
            </p>
            <h2 className="mx-auto mt-8 max-w-3xl font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[3.5rem] text-balance leading-[1.05]">
              Trzy kroki<br />
              <span className="italic font-normal">do własnego zegarka.</span>
            </h2>
          </div>
        </FadeIn>

        {/* Horizontal chronograph timeline */}
        <div className="relative mt-20 lg:mt-28">
          {/* Horizontal connector — desktop only */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[2.75rem] hidden h-px bg-gradient-to-r from-accent-gold/0 via-accent-gold/45 to-accent-gold/0 lg:block"
          />
          {/* Vertical connector — mobile only. Linia biegnie przez środek
              kółek (left = 2.75rem = połowa 5.5rem), a tekst jest po prawej
              stronie kółka, dzięki czemu nigdy nie wchodzi w treść. */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[2.75rem] top-12 bottom-12 w-px bg-gradient-to-b from-accent-gold/40 via-accent-gold/30 to-accent-gold/0 lg:hidden"
          />

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-10">
            {steps.map((s, i) => (
              <FadeIn key={s.numeral} delay={i * 0.15}>
                <article className="relative flex flex-row items-start gap-6 lg:flex-col lg:items-center lg:gap-5 lg:text-center">
                  {/* Subdial — gold circle, like a chronograph minute counter */}
                  <div className="relative flex-shrink-0">
                    {/* Outer ring */}
                    <div
                      className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full border border-accent-gold/45 bg-[#fbf6ec]"
                      style={{
                        boxShadow:
                          '0 0 0 1px rgba(201,169,98,0.12), 0 8px 24px -10px rgba(122,76,38,0.35), inset 0 0 0 1px rgba(255,255,255,0.4)',
                      }}
                    >
                      {/* Inner ring */}
                      <div className="absolute inset-2 rounded-full border border-accent-gold/25" />
                      {/* Tick marks at 12/3/6/9 — chronograph dial detail */}
                      <span aria-hidden className="absolute left-1/2 top-1 h-1.5 w-px -translate-x-1/2 bg-accent-gold/55" />
                      <span aria-hidden className="absolute left-1/2 bottom-1 h-1.5 w-px -translate-x-1/2 bg-accent-gold/35" />
                      <span aria-hidden className="absolute top-1/2 left-1 h-px w-1.5 -translate-y-1/2 bg-accent-gold/35" />
                      <span aria-hidden className="absolute top-1/2 right-1 h-px w-1.5 -translate-y-1/2 bg-accent-gold/35" />
                      {/* Roman numeral */}
                      <span className="font-serif text-3xl font-medium italic text-foreground">
                        {s.numeral}
                      </span>
                    </div>
                  </div>

                  {/* Treść kroku — na mobile po prawej kółka, na desktopie pod nim */}
                  <div className="flex flex-1 flex-col gap-3 pt-1 lg:flex-none lg:items-center lg:gap-5 lg:pt-0">
                    {/* Meta — time stamp / chronograph context */}
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.45em] text-accent-gold">
                      {s.meta}
                    </p>

                    {/* Title */}
                    <h3 className="font-serif text-xl font-medium leading-snug text-foreground sm:text-[1.375rem] lg:max-w-[16rem]">
                      {s.title}
                    </h3>

                    {/* Body */}
                    <p className="font-sans text-sm leading-relaxed text-muted-foreground text-pretty lg:max-w-[18rem]">
                      {s.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Outro meta */}
        <FadeIn delay={0.3}>
          <p className="mx-auto mt-20 max-w-2xl text-center font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/45">
            Indywidualne podejście &nbsp;·&nbsp; Pełna poufność
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}
