import Link from 'next/link'
import { Container, Section, Heading, Text, Button } from '@/components/ui'

export function FinalCTA() {
  return (
    <Section variant="muted" spacing="lg">
      <Container size="narrow" className="text-center">
        <Heading as="h2" size="md">
          Szukasz czegoś wyjątkowego?
        </Heading>
        <Text variant="lead" muted className="mx-auto mt-6 max-w-xl">
          Skontaktuj się z nami lub odwiedź nasz butik. Chętnie pomożemy 
          znaleźć idealny zegarek lub wycenimy Twój egzemplarz.
        </Text>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/kontakt">Skontaktuj się</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/butik">Odwiedź butik</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
