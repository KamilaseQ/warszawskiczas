import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, MapPin, Train } from 'lucide-react'
import { Container, Section, LocationMap } from '@/components/ui'
import { CONTACT_PHONE, CONTACT_PHONE_RAW } from '@/lib/config'

const PHONE_RAW = CONTACT_PHONE_RAW

export const metadata: Metadata = {
  title: 'Butik',
  description:
    'Odwiedź butik Warszawski Czas na Mokotowskiej 71. Editorialna przestrzeń dla kolekcjonerów zegarków premium w sercu Warszawy.',
}

const socials = [
  {
    label: 'Instagram',
    handle: '@warszawskiczas',
    href: 'https://instagram.com/warszawskiczas',
  },
  {
    label: 'Facebook',
    handle: '/warszawskiczas',
    href: 'https://facebook.com/warszawskiczas',
  },
  {
    label: 'TikTok',
    handle: '@warszawskiczas',
    href: 'https://www.tiktok.com/@warszawskiczas',
  },
  {
    label: 'Telefon',
    handle: CONTACT_PHONE,
    href: `tel:${PHONE_RAW}`,
  },
] as const

function SocialIcon({ label }: { label: (typeof socials)[number]['label'] }) {
  switch (label) {
    case 'Instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" />
        </svg>
      )
    case 'Facebook':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 9V6.5C14 5.7 14.7 5 15.5 5H17.5" />
          <path d="M11 21V13M11 13V10.5C11 9.1 12.1 8 13.5 8H17M11 13H8M11 13H14" />
        </svg>
      )
    case 'TikTok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4.5V14.5C14 16.4 12.4 18 10.5 18C8.6 18 7 16.4 7 14.5C7 12.6 8.6 11 10.5 11" />
          <path d="M14 4.5C14 6.7 15.8 8.5 18 8.5" />
        </svg>
      )
    case 'Telefon':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4.5H8L9.5 8L7.6 9.4C8.5 11.5 10.5 13.5 12.6 14.4L14 12.5L17.5 14V17C17.5 18.1 16.6 19 15.5 19C9.7 18.7 5.3 14.3 5 8.5C5 7.4 5.9 6.5 5 4.5Z" />
        </svg>
      )
  }
}

export default function ButikPage() {
  return (
    <>
      {/* ───── HERO ───── placeholder na widok z lotu ptaka — Plac Trzech Krzyży */}
      <section className="relative isolate min-h-[78vh] w-full overflow-hidden bg-[#0a0a0a] text-white">
        {/* Stylizowany placeholder — ciemny gradient w kierunku centrum, delikatna siatka,
            kompasowy znacznik lokalizacji butiku. Zastąp w przyszłości realnym
            zdjęciem z drona w /public/hero-butik.webp i podmień element <Image>. */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(80,60,30,0.35)_0%,rgba(15,12,8,0.95)_55%,#050403_100%)]" />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,169,98,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,98,0.22) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />
        </div>

        {/* Marker lokalizacji — pulsujący punkt na "mapie" */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[55%] z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-[wc-butik-ping_2400ms_ease-out_infinite] rounded-full bg-accent-gold/40" />
            <span className="absolute inline-flex h-7 w-7 animate-[wc-butik-ping_2400ms_ease-out_infinite] rounded-full bg-accent-gold/15" style={{ animationDelay: '600ms' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-gold shadow-[0_0_18px_rgba(201,169,98,0.85)]" />
          </span>
        </div>

        {/* Crop-marks editorial */}
        <span aria-hidden className="pointer-events-none absolute left-8 top-28 h-5 w-5 lg:left-12">
          <span className="absolute left-0 top-0 h-px w-5 bg-accent-gold/55" />
          <span className="absolute left-0 top-0 h-5 w-px bg-accent-gold/55" />
        </span>
        <span aria-hidden className="pointer-events-none absolute right-8 top-28 h-5 w-5 lg:right-12">
          <span className="absolute right-0 top-0 h-px w-5 bg-accent-gold/55" />
          <span className="absolute right-0 top-0 h-5 w-px bg-accent-gold/55" />
        </span>

        {/* Headline */}
        <div className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-[88rem] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-44">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.55em] text-accent-gold">
            Butik
          </span>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3rem,9vw,8rem)] font-medium leading-[0.92] tracking-[-0.02em] text-white">
            Warszawa
            <br />
            <span className="italic font-normal text-white/85">w detalach</span>
          </h1>
          <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-white/70 sm:text-lg">
            Mokotowska 71 — kameralna przestrzeń dla kolekcjonerów zegarków
            premium w sercu warszawskiego Śródmieścia.
          </p>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6">
            <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/55">
              ul. Mokotowska 71 · 00-530 Warszawa
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.4em] text-white/35">
              Plac Trzech Krzyży · widok z drona [placeholder]
            </div>
          </div>
        </div>

        <style>{`
          @keyframes wc-butik-ping {
            0% { transform: scale(1); opacity: 0.7; }
            80%, 100% { transform: scale(4.5); opacity: 0; }
          }
        `}</style>
      </section>

      {/* ───── ATMOSFERA ───── editorial intro with drop cap */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="sticky top-32 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">
                Atmosfera
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="font-serif text-2xl leading-[1.45] text-foreground sm:text-3xl">
                <span className="float-left mr-3 mt-1 font-serif text-[5.5rem] leading-[0.85] text-accent-gold">
                  W
                </span>
                arszawski Czas powstał z przekonania, że zakup wyjątkowego
                zegarka powinien być doświadczeniem, nie transakcją. Tworzyliśmy
                przestrzeń, w której czas płynie wolniej — od dyskretnej witryny
                po rozmowę przy kawie nad mechanizmem.
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <p className="font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                  Lokalizacja na Mokotowskiej nie jest przypadkiem. Ulica łączy
                  prestiż międzywojennej Warszawy z dyskrecją współczesnych
                  galerii — to ten sam ton, który chcieliśmy dać butikowi.
                </p>
                <p className="font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                  W Warszawskim Czasie nie jesteś klientem — jesteś gościem.
                  Wierzymy, że właściwy zegarek sam znajdzie swojego właściciela,
                  jeżeli tylko damy mu odpowiednią przestrzeń i ciszę.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ───── DOŚWIADCZENIE ───── pull-quote + lista + para zdjęć z wnętrza */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5 lg:col-start-1">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src="/butik1.webp"
                  alt="Witryna i fasada butiku — Mokotowska 71"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">
                Doświadczenie wizyty
              </p>
              <blockquote className="mt-6 font-serif text-3xl italic leading-[1.2] text-foreground/85 sm:text-4xl">
                &ldquo;Wizyta tu nie ma scenariusza. Pijemy kawę,
                rozmawiamy o mechanice, a zegarki same wchodzą
                w&nbsp;światło, kiedy znajdują swój moment.&rdquo;
              </blockquote>

              <ul className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Indywidualna konsultacja z ekspertem',
                  'Prezentacja wybranych egzemplarzy',
                  'Możliwość przymierzenia zegarków',
                  'Profesjonalne doradztwo bez presji',
                  'Kawa lub herbata w spokojnej atmosferze',
                  'Bezpłatna wycena posiadanego zegarka',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 border-t border-border pt-3"
                  >
                    <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent-gold" />
                    <span className="font-sans text-sm text-foreground/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-3 border-b border-foreground/20 pb-2 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
                >
                  Umów wizytę
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Para zdjęć z wnętrza — bez zbędnego komentarza, sama kompozycja */}
          <div className="mt-16 grid gap-6 sm:gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
            <div className="relative aspect-[5/4] w-full overflow-hidden lg:col-span-7">
              <Image
                src="/butik2.webp"
                alt="Wnętrze butiku Warszawski Czas — gabloty"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:col-span-5 lg:aspect-auto">
              <Image
                src="/butik3.webp"
                alt="Witryna butiku — sygnatura miejsca"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ───── ZAŁOŻYCIEL ───── Jarek Jarosz */}
      <Section variant="muted" spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/edek.webp"
                  alt="Jarek Jarosz — założyciel Warszawski Czas"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center lg:col-span-6">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">
                Założyciel
              </p>
              <h2 className="mt-4 font-serif text-4xl font-medium leading-[1] tracking-[-0.01em] text-foreground sm:text-5xl">
                Jarek Jarosz
              </h2>
              <p className="mt-2 font-serif italic text-lg text-muted-foreground">
                Założyciel · Kurator kolekcji
              </p>

              <div className="mt-6 h-px w-12 bg-accent-gold" />

              <p className="mt-6 font-sans text-base leading-relaxed text-foreground/85 text-pretty">
                Pasjonat zegarmistrzostwa od ponad dwóch dekad. Założył butik na
                Mokotowskiej, by stworzyć miejsce, gdzie czas poświęcony klientowi
                liczy się tak samo jak ten odmierzany przez mechanizm.
              </p>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted-foreground text-pretty">
                Każdy egzemplarz w katalogu przechodzi przez jego ręce — od
                pierwszej weryfikacji po rozmowę z nowym właścicielem.
              </p>

              <div className="mt-10">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/70">
                  Kontakt prywatny
                </p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 border border-foreground/10 bg-background px-4 py-3 transition-all duration-300 hover:border-accent-gold/50 hover:bg-background/70"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-accent-gold/40 text-accent-gold transition-colors duration-300 group-hover:bg-accent-gold group-hover:text-[#0a0a0a]">
                          <span className="block h-4 w-4">
                            <SocialIcon label={s.label} />
                          </span>
                        </span>
                        <span className="flex flex-1 flex-col">
                          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.35em] text-muted-foreground/70">
                            {s.label}
                          </span>
                          <span className="font-serif text-sm text-foreground transition-colors duration-300 group-hover:text-accent-gold">
                            {s.handle}
                          </span>
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-gold" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ───── PRAKTYCZNIE ───── adres, godziny, dojazd, kontakt */}
      <Section spacing="lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">
                Praktycznie
              </p>
              <h2 className="mt-4 font-serif text-3xl font-medium leading-[1.05] tracking-[-0.01em] sm:text-4xl">
                Adres<br />
                <span className="italic font-normal">i godziny</span>
              </h2>
              <p className="mt-6 font-sans text-sm leading-relaxed text-muted-foreground text-pretty">
                Zarezerwuj wizytę telefonicznie lub wpadnij w godzinach butiku —
                drzwi są otwarte.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="grid gap-y-8 sm:grid-cols-2 sm:gap-x-12">
                <div className="flex items-start gap-4 border-t border-border pt-6">
                  <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-accent-gold" strokeWidth={1.4} />
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/70">
                      Adres
                    </dt>
                    <dd className="mt-2 font-serif text-lg leading-snug text-foreground">
                      ul. Mokotowska 71<br />
                      <span className="text-muted-foreground">00-530 Warszawa</span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border pt-6">
                  <Clock className="mt-1 h-4 w-4 flex-shrink-0 text-accent-gold" strokeWidth={1.4} />
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/70">
                      Godziny
                    </dt>
                    <dd className="mt-2 font-serif text-base leading-relaxed text-foreground">
                      Pon – Pt &nbsp;·&nbsp; 10:00 – 18:00
                      <br />
                      <span className="text-muted-foreground">Sobota · 10:00 – 14:00</span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border pt-6">
                  <Train className="mt-1 h-4 w-4 flex-shrink-0 text-accent-gold" strokeWidth={1.4} />
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/70">
                      Dojazd
                    </dt>
                    <dd className="mt-2 font-serif text-base leading-relaxed text-foreground">
                      Metro Politechnika
                      <br />
                      <span className="text-muted-foreground">Tramwaje 10 · 14 · 15</span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-border pt-6">
                  <ArrowUpRight className="mt-1 h-4 w-4 flex-shrink-0 text-accent-gold" strokeWidth={1.4} />
                  <div>
                    <dt className="font-sans text-[10px] font-bold uppercase tracking-[0.35em] text-muted-foreground/70">
                      Kontakt
                    </dt>
                    <dd className="mt-2 font-serif text-base leading-relaxed text-foreground">
                      <a
                        href={`tel:${CONTACT_PHONE_RAW}`}
                        className="transition-colors hover:text-accent-gold"
                      >
                        {CONTACT_PHONE}
                      </a>
                      <br />
                      <a
                        href="mailto:biuro@warszawskiczas.pl"
                        className="text-muted-foreground transition-colors hover:text-accent-gold"
                      >
                        biuro@warszawskiczas.pl
                      </a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* ───── MAPA ───── full-bleed */}
      <section className="relative w-full overflow-hidden">
        <LocationMap className="aspect-[3/2] w-full sm:aspect-[21/9]" />
      </section>
    </>
  )
}
