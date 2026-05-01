import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const steps = [
  {
    num: '01',
    title: 'Kontakt i rejestracja',
    body: 'Wypełniasz formularz na dole strony. Specjalista kontaktuje się z Tobą w ciągu 24 godzin.',
  },
  {
    num: '02',
    title: 'Indywidualna konsultacja',
    body: 'Omawiamy Twoje preferencje, historię kolekcji, budżet i oczekiwania wobec zegarka.',
  },
  {
    num: '03',
    title: 'Dostęp i transakcja',
    body: 'Otrzymujesz kod dostępu, wybierasz model, finalizujemy dyskretnie i bezpiecznie.',
  },
]

export function PrivateCollectionProcess() {
  return (
    <Section spacing="lg" className="bg-background">
      <Container>
        <FadeIn>
          <div className="mb-12 flex items-center gap-4">
            <div className="h-px w-12 bg-accent-gold/60" />
            <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
              Jak działamy
            </p>
          </div>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-foreground sm:text-4xl text-balance max-w-2xl">
            Trzy kroki<br />
            <span className="italic font-normal">do własnego zegarka.</span>
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-12">
          {steps.map((s, i) => (
            <FadeIn key={s.num} delay={i * 0.12}>
              <div className="relative pt-8 border-t border-accent-gold/30">
                <span className="font-serif text-6xl font-medium text-accent-gold/40 leading-none">
                  {s.num}
                </span>
                <h3 className="mt-6 font-serif text-xl font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {s.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  )
}
