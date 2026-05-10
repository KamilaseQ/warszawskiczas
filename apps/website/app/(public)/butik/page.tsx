import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, MapPin, Train } from 'lucide-react'
import { ContactLink } from '@/components/contact-link'
import { Container, Section, LocationMap } from '@/components/ui'
import { CONTACT_PHONE, CONTACT_PHONE_RAW } from '@/lib/config'

const PHONE_RAW = CONTACT_PHONE_RAW

export const metadata: Metadata = {
  title: 'Butik Warszawski Czas — Mokotowska 71, Warszawa',
  description:
    'Odwiedź butik Warszawski Czas na Mokotowskiej 71 w Warszawie. Editorialna przestrzeń dla kolekcjonerów zegarków premium — godziny, dojazd, kontakt.',
  alternates: { canonical: '/butik' },
  openGraph: {
    type: 'website',
    url: 'https://warszawskiczas.pl/butik',
    title: 'Butik Warszawski Czas — Mokotowska 71, Warszawa',
    description: 'Editorialna przestrzeń dla kolekcjonerów zegarków premium w sercu Warszawy.',
    siteName: 'Warszawski Czas',
    locale: 'pl_PL',
  },
}

const JAREK_PHONE = '+48 604 312 411'
const JAREK_PHONE_RAW = '+48604312411'
const JAREK_EMAIL = 'jarexzegarex@gmail.com'

const socials = [
  {
    label: 'Instagram',
    handle: '@jarekjarosz_',
    href: 'https://instagram.com/jarekjarosz_',
  },
  {
    label: 'Telefon',
    handle: JAREK_PHONE,
    href: `tel:${JAREK_PHONE_RAW}`,
  },
  {
    label: 'Email',
    handle: JAREK_EMAIL,
    href: `mailto:${JAREK_EMAIL}`,
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
    case 'Email':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3 7l9 6 9-6" />
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
      {/* ───── HERO ───── proste, czyste */}
      <section className="relative isolate min-h-screen w-full overflow-hidden bg-[#050403] text-white">
        <div className="absolute inset-0">
          <Image
            src="/butikmain.jpg"
            alt="Butik Warszawski Czas — Mokotowska 71"
            fill
            priority
            sizes="100vw"
            className="object-cover [filter:brightness(0.85)_contrast(1.06)_saturate(0.88)_sepia(0.1)]"
            style={{ objectPosition: '50% 45%' }}
          />
          {/* Subtelny film nadający spójny ton */}
          <div className="absolute inset-0 bg-[#050403]/15" />
          {/* Złoty refleks z prawej-góry — łapie się z resztą strony */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(201,169,98,0.14)_0%,transparent_55%)] mix-blend-screen" />
          {/* Łagodny gradient pod typografię — głównie dół */}
          <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#050403]/85 via-[#050403]/35 to-transparent" />
        </div>

        {/* Treść — eyebrow + tytuł + jeden lead */}
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[88rem] flex-col justify-end px-6 pb-20 pt-40 lg:px-12 lg:pb-28 lg:pt-44">
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
          <div className="mt-10 font-sans text-[10px] uppercase tracking-[0.4em] text-white/55">
            ul. Mokotowska 71 · 00-530 Warszawa
          </div>
        </div>
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
                <ContactLink
                  source="butik"
                  className="group inline-flex items-center gap-3 border-b border-foreground/20 pb-2 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold"
                >
                  Umów wizytę
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ContactLink>
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
                <ul className="mt-5 flex flex-col gap-3">
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
                      Pon – Pt &nbsp;·&nbsp; 11:00 – 18:00
                      <br />
                      <span className="text-muted-foreground">Sobota · 11:00 – 14:00</span>
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
