'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Cog,
  Gauge,
  Layers,
  Lock,
  MapPin,
  ShieldCheck,
  Unlock,
} from 'lucide-react'
import { Container, Section, ImagePlaceholder, Magnetic } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'
import { ACCESS_CODE } from '@/lib/config'
import { cn } from '@/lib/utils'

type FeaturedWatch = {
  id: string
  brand: string
  model: string
  reference: string
  year: string
  condition: string
  status: 'Dostępny' | 'Zarezerwowany'
  provenance: string
  editorial: string
  specs: {
    mechanism: string
    diameter: string
    material: string
    boxPapers: string
  }
  origin: string
  priceLabel: string
}

const featured: FeaturedWatch[] = [
  {
    id: 'pp-5711',
    brand: 'Patek Philippe',
    model: 'Nautilus',
    reference: '5711/1A-010',
    year: '2019',
    condition: 'Stan kolekcjonerski',
    status: 'Zarezerwowany',
    provenance: 'Pierwszy właściciel — Genewa',
    editorial:
      'Ostatnia generacja kultowej referencji 5711 w niebieskiej tarczy "Tiffany blue gradient". Zegarek, który w branży zegarmistrzowskiej zmienił definicję sportowej elegancji.',
    specs: {
      mechanism: 'Automat, kal. 26-330 S C',
      diameter: '40 mm',
      material: 'Stal szlachetna',
      boxPapers: 'Pełen komplet, certyfikat Patek',
    },
    origin: 'Prywatna kolekcja, Szwajcaria',
    priceLabel: 'Cena na zapytanie',
  },
  {
    id: 'ap-15500',
    brand: 'Audemars Piguet',
    model: 'Royal Oak',
    reference: '15500ST.OO.1220ST.01',
    year: '2022',
    condition: 'Stan kolekcjonerski',
    status: 'Dostępny',
    provenance: 'Salon AP Mediolan, jeden właściciel',
    editorial:
      'Tarcza Grande Tapisserie w odcieniu kremowym, bransoleta zintegrowana w pełni przeszlifowana. Egzemplarz nienaznaczony — pudełko otwierane wyłącznie do prezentacji.',
    specs: {
      mechanism: 'Automat, kal. 4302 in-house',
      diameter: '41 mm',
      material: 'Stal szlachetna',
      boxPapers: 'Pełen komplet, AP Service Card',
    },
    origin: 'Prywatna kolekcja, Włochy',
    priceLabel: 'Cena na zapytanie',
  },
  {
    id: 'vc-overseas',
    brand: 'Vacheron Constantin',
    model: 'Overseas',
    reference: '4500V/110A-B128',
    year: '2021',
    condition: 'Jak nowy',
    status: 'Dostępny',
    provenance: 'Boutique Vacheron, Paryż',
    editorial:
      'Trzy bransolety w komplecie — stalowa, skórzana i kauczukowa, każda wymieniana w sekundę systemem quick-change. Tarcza niebieska z motywem kompasu, rzadko spotykana w tak nieskazitelnym stanie.',
    specs: {
      mechanism: 'Automat, kal. 5100 (Hallmark of Geneva)',
      diameter: '41 mm',
      material: 'Stal szlachetna',
      boxPapers: 'Pełen komplet, 5 lat gwarancji VC',
    },
    origin: 'Prywatna kolekcja, Francja',
    priceLabel: 'Cena na zapytanie',
  },
]

export function PrivateCollectionFeatured() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: false, duration: 35 },
    [Autoplay({ delay: 7500, stopOnInteraction: false, stopOnMouseEnter: true })]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [unlocked, setUnlocked] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  const scrollToRegistration = (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById('registration')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <Section
      spacing="xl"
      className="relative overflow-hidden bg-[#f3ead9] text-[#1f1813]"
    >
      {/* Warm grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      {/* Warm radial — głębia jak światło z lampy w butiku */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_15%,rgba(201,169,98,0.18)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_85%,rgba(122,76,38,0.12)_0%,transparent_50%)]" />

      <Container size="wide" className="relative">
        {/* HASŁO — dominujące, panel jednoznacznie pod nim */}
        <FadeIn>
          <div className="mx-auto max-w-4xl text-center">
            <p className="flex items-center justify-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-[#8a6a2c]">
              <span className="h-px w-8 bg-[#8a6a2c]/60" />
              {unlocked ? 'Trzy egzemplarze' : 'Zaprezentowane po weryfikacji'}
              <span className="h-px w-8 bg-[#8a6a2c]/60" />
            </p>
            <h2 className="mt-10 font-serif text-5xl font-medium leading-[1.02] tracking-tight text-[#1f1813] sm:text-6xl lg:text-[5rem] text-balance">
              Wybrane z kolekcji,<br />
              <span className="italic font-normal text-[#5a3a1f]">które rzadko opuszczają sejf.</span>
            </h2>
            <p className="mx-auto mt-10 max-w-xl font-sans text-base leading-relaxed text-[#3d2f24]/75 text-pretty lg:text-lg">
              {unlocked
                ? 'Każdy egzemplarz przeszedł pełną weryfikację. Pełna dokumentacja, znana prowencja, dyskretny transfer.'
                : 'Trzy egzemplarze. Pełna dokumentacja każdego, znana prowencja, dyskretny transfer. Zaprezentowane wyłącznie po wpisaniu kodu dostępu.'}
            </p>
            <div className="mx-auto mt-10 h-px w-16 bg-[#8a6a2c]/60" />
          </div>
        </FadeIn>

        {/* PANEL KARUZELI — pod hasłem, oddzielony powietrzem */}
        <FadeIn delay={0.15}>
          <div className="relative mt-24 lg:mt-36">
            {/* Dekoracyjna ramka offset */}
            <div className="pointer-events-none absolute -bottom-5 -right-5 hidden h-full w-full border border-[#8a6a2c]/30 lg:block" />
            <div className="pointer-events-none absolute -top-5 -left-5 hidden h-full w-full border border-[#8a6a2c]/15 lg:block" />

            {/* Główny panel */}
            <div className="relative bg-[#fbf6ec] shadow-[0_30px_80px_-30px_rgba(58,30,12,0.35)]">
              {/* Złoty akcent górny */}
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#c9a962] to-transparent" />

              {/* Karuzela — blur kiedy zablokowana */}
              <div
                className={cn(
                  'transition-all duration-1000 ease-out',
                  !unlocked && 'pointer-events-none select-none [filter:blur(14px)_saturate(0.85)] opacity-90'
                )}
                aria-hidden={!unlocked}
              >
                <div className="overflow-hidden" ref={emblaRef}>
                  <div className="flex">
                    {featured.map((w, i) => (
                      <div
                        key={w.id}
                        className="min-w-0 flex-[0_0_100%]"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`${i + 1} z ${featured.length}`}
                      >
                        <FeaturedSlide watch={w} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Kontrolki + dots */}
                <div className="flex items-center justify-between border-t border-[#8a6a2c]/15 bg-[#f7efe0] px-6 py-5 sm:px-10 lg:px-14">
                  <button
                    type="button"
                    onClick={scrollPrev}
                    aria-label="Poprzedni egzemplarz"
                    tabIndex={unlocked ? 0 : -1}
                    className="group flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-[#3d2f24]/70 transition-colors duration-300 hover:text-[#8a6a2c]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center border border-[#8a6a2c]/40 transition-colors duration-300 group-hover:border-[#8a6a2c] group-hover:bg-[#8a6a2c] group-hover:text-[#fbf6ec]">
                      <ArrowLeft className="h-4 w-4" />
                    </span>
                    <span className="hidden sm:inline">Poprzedni</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <span className="font-serif text-xs italic text-[#3d2f24]/60">
                      {String(selectedIndex + 1).padStart(2, '0')}{' '}
                      <span className="text-[#3d2f24]/30">/</span>{' '}
                      {String(featured.length).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-2">
                      {featured.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => scrollTo(i)}
                          tabIndex={unlocked ? 0 : -1}
                          aria-label={`Przejdź do egzemplarza ${i + 1}`}
                          aria-current={i === selectedIndex}
                          className={cn(
                            'h-[2px] transition-all duration-500',
                            i === selectedIndex
                              ? 'w-10 bg-[#8a6a2c]'
                              : 'w-5 bg-[#8a6a2c]/25 hover:bg-[#8a6a2c]/50'
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={scrollNext}
                    aria-label="Następny egzemplarz"
                    tabIndex={unlocked ? 0 : -1}
                    className="group flex items-center gap-3 text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-[#3d2f24]/70 transition-colors duration-300 hover:text-[#8a6a2c]"
                  >
                    <span className="hidden sm:inline">Następny</span>
                    <span className="flex h-10 w-10 items-center justify-center border border-[#8a6a2c]/40 transition-colors duration-300 group-hover:border-[#8a6a2c] group-hover:bg-[#8a6a2c] group-hover:text-[#fbf6ec]">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </button>
                </div>
              </div>

              {/* OVERLAY — KOD DOSTĘPU */}
              {!unlocked && (
                <div
                  className="absolute inset-0 z-10 flex items-center justify-center px-6 py-10 lg:px-12 lg:py-16"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(243,234,217,0.55) 0%, rgba(243,234,217,0.85) 100%)',
                    backdropFilter: 'blur(2px)',
                  }}
                >
                  <div className="w-full max-w-md bg-[#1f1813] p-8 text-white shadow-[0_30px_70px_-20px_rgba(31,24,19,0.6)] sm:p-10">
                    {/* Złoty akcent górny */}
                    <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#c9a962] to-transparent" />

                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center border border-[#c9a962]/50 bg-[#c9a962]/10">
                        <Lock className="h-4 w-4 text-[#c9a962]" />
                      </span>
                      <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-[#c9a962]">
                        Kod dostępu
                      </p>
                    </div>

                    <h3 className="mt-6 font-serif text-2xl font-medium leading-tight text-white sm:text-[1.75rem]">
                      Odblokuj prezentację
                    </h3>

                    <p className="mt-4 text-sm leading-relaxed text-white/55 text-pretty">
                      Trzy egzemplarze ze szczegółami, prowencją i dokumentacją.
                      Wpisz kod od specjalisty albo wypełnij krótki formularz.
                    </p>

                    <form onSubmit={handleUnlock} className="mt-8 space-y-4">
                      <label htmlFor="featured-code" className="sr-only">
                        Kod dostępu
                      </label>
                      <input
                        id="featured-code"
                        type="text"
                        value={code}
                        onChange={(e) => {
                          setCode(e.target.value)
                          if (error) setError(false)
                        }}
                        placeholder="Kod dostępu"
                        className="block w-full border border-white/20 bg-transparent px-4 py-3 font-sans text-sm uppercase tracking-[0.3em] text-white placeholder:text-white/30 focus:border-[#c9a962] focus:outline-none focus:ring-0"
                        autoComplete="off"
                      />

                      <button
                        type="submit"
                        className="btn-premium-white w-full"
                        style={{ display: 'block' }}
                      >
                        Odblokuj
                      </button>

                      {error && (
                        <p className="text-[11px] font-sans text-red-300">
                          Nieprawidłowy kod. Zarejestruj się, aby go otrzymać.
                        </p>
                      )}
                    </form>

                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="font-sans text-[9px] uppercase tracking-[0.4em] text-white/30">
                        lub
                      </span>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>

                    <a
                      href="#registration"
                      onClick={scrollToRegistration}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#c9a962] hover:text-[#dab97c] transition-colors"
                    >
                      Nie mam kodu — zarejestruj się
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* Sygnał odblokowania (cichy) */}
              {unlocked && (
                <div className="absolute right-4 top-4 z-10 flex items-center gap-2 bg-[#1f1813]/85 px-3 py-1.5 backdrop-blur-sm">
                  <Unlock className="h-3 w-3 text-[#c9a962]" />
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-[#c9a962]">
                    Odblokowano
                  </span>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* Stopka panelu — kontekst pełnej kolekcji */}
        <FadeIn delay={0.25}>
          <p className="mx-auto mt-16 max-w-2xl text-center font-serif italic text-base text-[#3d2f24]/65 lg:text-lg">
            Kolekcja prywatna to{' '}
            <span className="text-[#5a3a1f] not-italic font-medium">
              kuracja, nie katalog
            </span>{' '}
            — trzy egzemplarze na ten miesiąc, każdy wybrany osobno.
          </p>
        </FadeIn>
      </Container>
    </Section>
  )
}

function FeaturedSlide({ watch }: { watch: FeaturedWatch }) {
  const isAvailable = watch.status === 'Dostępny'

  return (
    <div className="grid items-stretch gap-0 lg:grid-cols-12">
      {/* LEWA — duże zdjęcie z dekorem */}
      <div className="relative lg:col-span-7">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f1e7d3] sm:aspect-[5/4] lg:aspect-auto lg:h-full">
          <ImagePlaceholder
            className="absolute inset-0"
            variant="light"
            label=""
            showDial
          />
          {/* Warm overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3a2a1c]/15 via-transparent to-[#c9a962]/10" />

          {/* Status badge — góra-lewo */}
          <div className="absolute left-0 top-0 z-10 bg-[#1f1813] px-4 py-2">
            <span
              className={cn(
                'flex items-center gap-2 font-sans text-[9px] font-bold uppercase tracking-[0.4em]',
                isAvailable ? 'text-[#c9a962]' : 'text-white/45'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  isAvailable ? 'bg-[#c9a962]' : 'bg-white/30'
                )}
              />
              {watch.status}
            </span>
          </div>

          {/* Provenance — dół */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 text-[#3d2f24]/70">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#8a6a2c]" strokeWidth={1.5} />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
              {watch.provenance}
            </span>
          </div>

          {/* Wewnętrzna złota ramka */}
          <div className="pointer-events-none absolute inset-6 border border-[#c9a962]/15" />
        </div>
      </div>

      {/* PRAWA — informacje */}
      <div className="relative flex flex-col justify-center bg-[#fbf6ec] px-6 py-12 sm:px-10 sm:py-16 lg:col-span-5 lg:px-14 lg:py-20">
        {/* Eyebrow */}
        <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-[#8a6a2c]">
          {watch.brand}
        </p>

        {/* Model */}
        <h3 className="mt-4 font-serif text-3xl font-medium leading-[1.1] tracking-tight text-[#1f1813] sm:text-4xl lg:text-[2.75rem]">
          {watch.model}
        </h3>

        {/* Ref + rok */}
        <p className="mt-4 font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#3d2f24]/70">
          Ref. {watch.reference}
          <span className="mx-3 text-[#3d2f24]/30">·</span>
          {watch.year}
          <span className="mx-3 text-[#3d2f24]/30">·</span>
          {watch.condition}
        </p>

        {/* Złoty separator */}
        <div className="mt-6 h-px w-12 bg-[#8a6a2c]/60" />

        {/* Editorial */}
        <p className="mt-6 font-sans text-[15px] leading-relaxed text-[#3d2f24]/85 text-pretty">
          {watch.editorial}
        </p>

        {/* Spec strip */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-[#8a6a2c]/15 pt-8">
          <SpecRow icon={Cog} label="Mechanizm" value={watch.specs.mechanism} />
          <SpecRow icon={Gauge} label="Średnica" value={watch.specs.diameter} />
          <SpecRow icon={Layers} label="Materiał" value={watch.specs.material} />
          <SpecRow icon={Box} label="Komplet" value={watch.specs.boxPapers} />
        </dl>

        {/* Trust + cena */}
        <div className="mt-10 flex items-end justify-between gap-6 border-t border-[#8a6a2c]/15 pt-8">
          <div className="flex items-center gap-3 text-[#3d2f24]/70">
            <ShieldCheck className="h-4 w-4 text-[#8a6a2c]" strokeWidth={1.5} />
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">
              Certyfikat &middot; gwarancja WC
            </span>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-sans font-bold uppercase tracking-[0.4em] text-[#3d2f24]/50">
              Cena
            </p>
            <p className="mt-1 font-serif text-base italic text-[#1f1813]">
              {watch.priceLabel}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Magnetic className="mt-8 block w-full" strength={6}>
          <Link
            href="#registration"
            className="btn-sharp w-full text-center"
            style={{ display: 'block' }}
          >
            Zapytaj o ten egzemplarz
          </Link>
        </Magnetic>
        <p className="mt-3 text-center font-sans text-[10px] uppercase tracking-[0.3em] text-[#3d2f24]/50">
          Odpowiedź w ciągu 24 godzin
        </p>
      </div>
    </div>
  )
}

function SpecRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Cog
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-[#8a6a2c]" strokeWidth={1.5} />
      <div>
        <dt className="font-sans text-[9px] font-bold uppercase tracking-[0.35em] text-[#3d2f24]/55">
          {label}
        </dt>
        <dd className="mt-1 font-serif text-sm text-[#1f1813]">{value}</dd>
      </div>
    </div>
  )
}
