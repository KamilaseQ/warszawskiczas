import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const points = [
  {
    num: '01',
    title: 'Egzemplarze niedostępne publicznie',
    body:
      'Z prywatnych kolekcji, często pojedyncze sztuki. Nie publikujemy tego, co nie ma być publiczne.',
  },
  {
    num: '02',
    title: 'Doradztwo zamiast sprzedaży',
    body:
      'Pomagamy w doborze. Zegarek to decyzja na lata — w ciszy gabinetu, bez presji.',
  },
  {
    num: '03',
    title: 'Pełna dokumentacja i historia',
    body:
      'Weryfikacja, prowencja, certyfikat i gwarancja w komplecie — bez wyjątków.',
  },
]

export function PrivateCollectionValue() {
  return (
    <Section spacing="xl" className="relative overflow-hidden bg-background">
      {/* Subtle grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_15%,rgba(201,169,98,0.08)_0%,transparent_55%)]" />

      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — editorial body (col 1-7) */}
          <div className="lg:col-span-7">
            <FadeIn>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-accent-gold/60" />
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
                  Czym jest Kolekcja Prywatna
                </p>
              </div>
              <h2 className="mt-8 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem] text-balance leading-[1.02]">
                Kolekcja,<br />
                <span className="italic font-normal">która nie żyje publicznie.</span>
              </h2>
              <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-muted-foreground text-pretty lg:text-[17px]">
                Trzon oferty Warszawskiego Czasu, który nigdy nie pojawia się
                w katalogu. Kupujemy z prywatnych depozytów, prezentujemy wyłącznie
                po weryfikacji klienta — i tylko jednemu na raz.
              </p>
            </FadeIn>

            {/* 3 points — compact side-noted list, NOT 3 boxes */}
            <FadeIn delay={0.15}>
              <ul className="mt-14 divide-y divide-accent-gold/15 border-t border-accent-gold/15">
                {points.map((p) => (
                  <li
                    key={p.num}
                    className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 py-6 lg:grid-cols-[3rem_1fr_auto] lg:gap-x-8"
                  >
                    <span className="font-serif italic text-2xl font-normal text-accent-gold/70 leading-none">
                      {p.num}
                    </span>
                    <h3 className="font-serif text-xl font-medium text-foreground lg:text-2xl">
                      {p.title}
                    </h3>
                    <p className="col-start-2 max-w-md font-sans text-sm leading-relaxed text-muted-foreground text-pretty lg:col-start-2 lg:row-span-1">
                      {p.body}
                    </p>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* RIGHT — manifesto pull quote (col 8-12) */}
          <div className="relative lg:col-span-5">
            {/* Vertical gold hairline divider — visible only on desktop */}
            <div
              aria-hidden
              className="pointer-events-none absolute -left-8 top-0 bottom-12 hidden w-px bg-gradient-to-b from-transparent via-accent-gold/40 to-transparent lg:block"
            />

            <FadeIn delay={0.1}>
              <div className="relative lg:sticky lg:top-32 lg:pt-12">
                {/* Big opening quote mark */}
                <span
                  aria-hidden
                  className="font-serif text-[6rem] font-medium leading-none text-accent-gold/35 lg:text-[8rem]"
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-6 font-serif text-[1.625rem] font-normal italic leading-[1.25] text-foreground/90 sm:text-[1.875rem] lg:text-[2rem] text-pretty">
                  Zakup zegarka z Kolekcji Prywatnej to nie transakcja —
                  to dostęp do dyskretnej obsługi i egzemplarzy, których
                  <span className="text-accent-gold/85"> nie kupisz nigdzie indziej</span>.
                </blockquote>

                <div className="mt-10 flex items-center gap-4">
                  <div className="h-px w-10 bg-accent-gold/60" />
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/55">
                    Warszawski Czas &nbsp;·&nbsp; od 2009
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  )
}
