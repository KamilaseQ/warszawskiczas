import { Gem, Eye, ShieldCheck } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const cards = [
  {
    icon: Gem,
    title: 'Zegarki tylko dla wybranych',
    body: 'Modele niedostępne w standardowej sprzedaży — z prywatnych kolekcji, często pojedyncze egzemplarze.',
  },
  {
    icon: Eye,
    title: 'Profesjonalne doradztwo',
    body: 'Pomagamy w doborze, nie tylko sprzedajemy. Zegarek to decyzja na lata — warto ją podjąć świadomie.',
  },
  {
    icon: ShieldCheck,
    title: 'Pełna autentyczność',
    body: 'Weryfikacja, dokumentacja, historia każdego egzemplarza. Certyfikat i gwarancja w komplecie.',
  },
]

export function PrivateCollectionValue() {
  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
              Co to jest
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance">
              Kolekcja,<br />
              <span className="italic font-normal">która nie żyje publicznie.</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {cards.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.08}>
              <div className="trust-card group h-full bg-background p-8 lg:p-10">
                <div className="flex h-10 w-10 items-center justify-center bg-accent-gold/10">
                  <c.icon className="h-5 w-5 text-accent-gold" strokeWidth={1.5} />
                </div>
                <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                  {c.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {c.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-16 max-w-3xl text-center font-serif italic text-xl text-muted-foreground text-pretty lg:text-2xl">
            Zakup zegarka z Kolekcji Prywatnej to nie tylko transakcja — to dostęp do
            ekskluzywnej wiedzy, dyskretnej obsługi i egzemplarzy, których nie kupisz
            nigdzie indziej.
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-accent-gold/60" />
        </FadeIn>
      </Container>
    </Section>
  )
}
