'use client'

import { Container, Section } from '@/components/ui'
import { Shield, Eye, Handshake, Award } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { FadeIn } from '@/components/ui/fade-in'

const signals = [
  {
    icon: Shield,
    value: 15,
    suffix: '+',
    label: 'Lat doświadczenia',
  },
  {
    icon: Eye,
    value: 100,
    suffix: '%',
    label: 'Weryfikacja autentyczności',
  },
  {
    icon: Handshake,
    value: 500,
    suffix: '+',
    label: 'Zadowolonych klientów',
  },
  {
    icon: Award,
    value: 0,
    suffix: '',
    label: 'Certyfikowani eksperci',
    display: 'Cert.',
  },
]

// 15.3 Animowany licznik przy scroll
function AnimatedNumber({ value, suffix, display }: { value: number; suffix: string; display?: string }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (display) return
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
  }, [value, started, display])

  if (display) return <span ref={ref}>{display}</span>
  return <span ref={ref}>{count}{suffix}</span>
}

export function TrustSignals() {
  return (
    <Section spacing="lg">
      <Container>
        {/* 7.3 Lepiej oddychający układ + editorial label */}
        <FadeIn>
          <div className="mb-12">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
              II &nbsp;——&nbsp; Zaufanie
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 gap-px bg-border/30 lg:grid-cols-4">
          {signals.map((signal, index) => (
            <FadeIn key={index} delay={index * 0.08}>
              {/* 7.3 Inny układ bez rozrzuconych kart — siatka z liniami */}
              <div className="trust-card group text-center bg-background py-12 px-6">
                {/* Ikona gold */}
                <signal.icon className="mx-auto h-6 w-6 text-accent-gold/60 mb-6" />

                {/* 7.5 Liczby — większy kontrast typograficzny */}
                <p className="font-serif text-4xl lg:text-5xl font-medium text-foreground tabular-nums">
                  <AnimatedNumber
                    value={signal.value}
                    suffix={signal.suffix}
                    display={signal.display}
                  />
                </p>
                <p className="mt-3 text-[11px] font-sans uppercase tracking-[0.25em] text-muted-foreground">
                  {signal.label}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 7.4 Element procesu zakupu — zintegrowany */}
        <FadeIn delay={0.2}>
          <div className="mt-20 grid gap-10 lg:grid-cols-3 lg:gap-16">
            <div className="lg:col-span-1">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
                Nasz proces
              </p>
              <h3 className="font-serif text-2xl font-medium text-foreground text-balance">
                Transparentność na każdym etapie
              </h3>
            </div>
            <div className="lg:col-span-2 grid gap-8 sm:grid-cols-3">
              {[
                { step: '01', title: 'Konsultacja', desc: 'Bezpłatna wycena i doradztwo — online lub w butiku.' },
                { step: '02', title: 'Weryfikacja', desc: 'Każdy zegarek przechodzi przez naszych ekspertów przed sprzedażą.' },
                { step: '03', title: 'Transakcja', desc: 'Bezpieczna, prosta, na Twoich warunkach. Natychmiastowa płatność.' },
              ].map((item) => (
                <div key={item.step} className="border-t border-border/50 pt-6">
                  <p className="font-serif text-2xl font-medium text-accent-gold/30 mb-3">{item.step}</p>
                  <p className="font-serif text-base font-medium text-foreground mb-2">{item.title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
