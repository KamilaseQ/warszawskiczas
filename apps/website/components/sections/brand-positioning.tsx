import { Container, Section, Heading, Text, Separator } from '@/components/ui'
import { MapPin, Award, Clock } from 'lucide-react'

const values = [
  {
    icon: MapPin,
    title: 'Mokotowska 71',
    description:
      'W sercu Warszawy, w historycznej kamienicy, tworzymy przestrzeń dla miłośników zegarmistrzostwa.',
  },
  {
    icon: Award,
    title: 'Ekspertyza',
    description:
      'Wieloletnie doświadczenie i głęboka wiedza pozwalają nam oferować tylko wyjątkowe egzemplarze.',
  },
  {
    icon: Clock,
    title: 'Tradycja',
    description:
      'Łączymy szacunek dla zegarmistrzowskiej tradycji z wymaganiami współczesnego kolekcjonera.',
  },
]

export function BrandPositioning() {
  return (
    <Section variant="muted" spacing="lg">
      <Container size="narrow" className="text-center">
        <Heading as="h2" size="lg">
          Butik z charakterem
        </Heading>
        <Text variant="lead" muted className="mx-auto mt-6 max-w-2xl">
          Warszawski Czas to więcej niż sklep z zegarkami. To miejsce, gdzie 
          pasja do mechanicznej precyzji spotyka się z kulturą i historią 
          stolicy.
        </Text>
      </Container>

      <Container className="mt-16">
        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-green/10">
                <value.icon className="h-6 w-6 text-accent-green" />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold">
                {value.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-16">
        <Separator />
      </Container>
    </Section>
  )
}
