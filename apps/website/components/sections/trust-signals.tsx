'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Shield, Lock, Star, Users, Handshake, ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

// 15.3 Animowany licznik przy scroll
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const duration = 1800
          const start = Date.now()
          const animate = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, started])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function TrustSignals() {
  return (
    <Section spacing="lg" className="relative">
      {/* Grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <Container className="relative">
        <FadeIn>
          <div className="mb-12">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
              II &nbsp;——&nbsp; Zaufanie
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance max-w-2xl">
              Budujemy relacje,<br />
              <span className="italic font-normal">nie transakcje.</span>
            </h2>
          </div>
        </FadeIn>

        {/* RZĄD 1 — Opinia klientki (full-width) */}
        <FadeIn delay={0.05}>
          <div className="trust-card relative bg-background px-8 py-12 lg:px-16 lg:py-16">
            {/* Złote obramowanie lewej krawędzi */}
            <div className="absolute left-0 top-0 h-full w-[3px] bg-accent-gold" />

            <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              {/* Avatar / inicjały */}
              <div className="flex items-center gap-5 lg:col-span-3">
                <div className="relative flex h-20 w-20 items-center justify-center bg-accent-gold/15 border border-accent-gold/30">
                  <span className="font-serif italic text-2xl text-accent-gold">IB</span>
                </div>
                <div className="lg:hidden">
                  <p className="font-serif text-base font-medium text-foreground">
                    Izabella Budryn
                  </p>
                  <p className="mt-1 text-[10px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
                    Projektantka biżuterii
                  </p>
                </div>
              </div>

              {/* Cytat */}
              <div className="lg:col-span-9">
                {/* Gwiazdki */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>

                {/* Cudzysłów + cytat */}
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -top-10 -left-2 select-none font-serif text-7xl leading-none text-accent-gold/30"
                  >
                    "
                  </span>
                  <blockquote className="font-serif text-xl italic font-normal text-foreground leading-relaxed lg:text-2xl text-pretty">
                    Korzystam z usług Jarosława od wielu lat i zawsze mogę liczyć na pełen
                    profesjonalizm oraz realną pomoc. Ogromna wiedza, rzetelne podejście i
                    uczciwe doradztwo — zarówno przy serwisie, jak i bardziej wymagających
                    tematach związanych z zegarkami. Dodatkowym atutem jest świetna lokalizacja
                    w samym centrum Warszawy, przy Mokotowskiej, co jest bardzo wygodne.
                    Zdecydowanie polecam.
                  </blockquote>
                </div>

                <div className="mt-6 hidden lg:flex items-center gap-3">
                  <div className="h-px w-12 bg-accent-gold/60" />
                  <p className="font-serif text-base font-medium text-foreground">
                    Izabella Budryn
                  </p>
                  <span className="text-muted-foreground/40">·</span>
                  <p className="text-[10px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
                    Projektantka biżuterii
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* RZĄD 2 — 3 kafelki */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3 lg:gap-8">
          <FadeIn delay={0.05}>
            <div className="trust-card group relative h-full bg-background p-8 lg:p-10">
              <div className="flex h-10 w-10 items-center justify-center bg-accent-gold/10">
                <Shield className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                Gwarancja autentyczności
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                Każdy zegarek przechodzi wieloetapową weryfikację. Certyfikat w komplecie,
                pełna dokumentacja oryginalności.
              </p>
              <Link
                href="/uslugi"
                className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70 transition-colors duration-300 group-hover:text-accent-gold"
              >
                Jak weryfikujemy
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="trust-card group relative h-full bg-background p-8 lg:p-10">
              <div className="flex h-10 w-10 items-center justify-center bg-accent-gold/10">
                <Lock className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                Pełna dyskrecja
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                Kupno, sprzedaż i wycena w zaufanym środowisku. Twoje dane nigdy nie
                trafiają do osób trzecich.
              </p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
                <span className="h-1 w-1 bg-accent-gold/60" />
                Bez pośredników
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="trust-card group relative h-full bg-background p-8 lg:p-10 flex flex-col">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">
                  Ocena w Google
                </p>
                <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#c9a962" d="M21.35 11.1h-9.17v2.97h5.26c-.23 1.48-1.66 4.34-5.26 4.34-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.01.77 3.7 1.43l2.52-2.42C16.91 4.14 14.8 3.25 12.18 3.25c-4.96 0-9 4.04-9 9s4.04 9 9 9c5.2 0 8.65-3.65 8.65-8.79 0-.59-.06-1.04-.14-1.36z" />
                </svg>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-6xl font-medium text-accent-gold leading-none">
                  5.0
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent-gold text-accent-gold" />
                    ))}
                  </div>
                  <span className="mt-1 text-[10px] font-sans uppercase tracking-[0.2em] text-muted-foreground">
                    na podstawie opinii
                  </span>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/v3iC97EKPkc3BtkU8"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/70 transition-colors duration-300 hover:text-accent-gold"
              >
                Zobacz opinie
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </FadeIn>
        </div>

        {/* RZĄD 3 — 2 kafelki */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <FadeIn delay={0.05}>
            <div className="trust-card group relative h-full bg-background p-8 lg:p-12">
              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent-gold/10">
                  <Handshake className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-medium text-foreground">
                    Ekspert przy każdej decyzji
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                    Nie zostawiamy Cię samego z wyborem. Pomagamy dopasować zegarek do
                    stylu, budżetu i historii — a jeśli nie mamy tego, czego szukasz,
                    pomożemy znaleźć.
                  </p>
                  <Link
                    href="/kontakt"
                    prefetch
                    className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/80 transition-colors duration-300 hover:text-accent-gold"
                  >
                    Umów konsultację
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="trust-card group relative h-full bg-background p-8 lg:p-12">
              <div className="flex items-start gap-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-accent-gold/10">
                  <Users className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl font-medium text-foreground">
                    Zaufali nam kolekcjonerzy
                  </h3>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    <div>
                      <p className="font-serif text-4xl font-medium text-foreground sm:text-5xl">
                        <AnimatedCounter value={400} suffix="+" />
                      </p>
                      <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
                        Zrealizowanych<br />transakcji
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-4xl font-medium text-accent-gold/80 sm:text-5xl">
                        od <AnimatedCounter value={2009} />
                      </p>
                      <p className="mt-2 text-[10px] font-sans uppercase tracking-[0.3em] text-muted-foreground">
                        Ponad dekada<br />doświadczenia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
