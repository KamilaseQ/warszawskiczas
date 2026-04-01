import Link from 'next/link'
import { Wrench, ArrowDownToLine, Repeat, ArrowRight, Gem } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const services = [
  {
    num: '01',
    icon: Wrench,
    title: 'Naprawa i serwis',
    description:
      'Profesjonalny serwis zegarmistrzowski. Przeglądy, regulacje, naprawy i renowacje zegarków mechanicznych wszystkich marek.',
    href: '/uslugi/naprawa-i-serwis',
  },
  {
    num: '02',
    icon: ArrowDownToLine,
    title: 'Skup zegarków',
    description:
      'Uczciwa wycena i natychmiastowa płatność. Skupujemy zegarki premium, vintage oraz biżuterię.',
    href: '/uslugi/skup',
  },
  {
    num: '03',
    icon: Repeat,
    title: 'Komis',
    description:
      'Profesjonalna sprzedaż w komisie. Dotrzemy do właściwych kolekcjonerów i uzyskamy najlepszą cenę za Twój zegarek.',
    href: '/uslugi/komis',
  },
  {
    num: '04',
    // 5.7 Biżuteria jako naturalna usługa
    icon: Gem,
    title: 'Biżuteria',
    description:
      'Wyselekcjonowana biżuteria z historią. Pierścionki, naszyjniki i bransolety od uznanych marek — skup, komis i sprzedaż.',
    href: '/uslugi',
  },
]

export function ServicesOverview() {
  return (
    <Section spacing="lg">
      <Container>
        {/* 5.2 Editorial header spójny z resztą strony */}
        <FadeIn>
          <div className="mb-16">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
              IV &nbsp;——&nbsp; Usługi
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight text-foreground">
              Ekspercka obsługa<br />
              <span className="italic font-normal">na każdym etapie</span>
            </h2>
          </div>
        </FadeIn>

        {/* 5.6 Editorial horizontal layout z numerami */}
        <div className="divide-y divide-border/50">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.08}>
              <Link
                href={service.href}
                className="group flex items-start gap-8 py-10 transition-all duration-300 hover:pl-2"
              >
                {/* Numer ozdobny */}
                <div className="flex-shrink-0 font-serif text-3xl font-medium text-accent-gold/25 leading-none w-10 text-right select-none mt-1">
                  {service.num}
                </div>

                {/* Ikona — gold (5.1) */}
                <div className="flex-shrink-0 mt-1">
                  <service.icon className="h-5 w-5 text-accent-gold/70 transition-colors duration-300 group-hover:text-accent-gold" />
                </div>

                {/* Treść */}
                <div className="flex-1">
                  <h3 className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-accent-gold transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-lg">
                    {service.description}
                  </p>
                </div>

                {/* Strzałka — 5.4 gold kolor */}
                <div className="flex-shrink-0 mt-1 hidden sm:block">
                  <ArrowRight className="h-4 w-4 text-accent-gold/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-gold" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* 5.5 Oddech przed następną sekcją */}
        <div className="mt-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
      </Container>
    </Section>
  )
}
