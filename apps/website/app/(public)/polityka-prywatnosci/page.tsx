import type { Metadata } from 'next'
import Link from 'next/link'
import { Container, Section, Heading, Text } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Polityka prywatności',
  description: 'Polityka prywatności butiku Warszawski Czas.',
}

export default function PolitykaPrywatnosciPage() {
  return (
    <Section spacing="lg" className="pt-32 lg:pt-40">
      <Container size="narrow">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-accent-gold">
          Dokument prawny
        </p>
        <Heading as="h1" size="xl" className="mt-4">
          Polityka prywatności
        </Heading>

        <div className="mt-12 space-y-6 border-l border-accent-gold/40 pl-8">
          <Text muted className="text-base leading-relaxed">
            Treść polityki prywatności zostanie uzupełniona przez właściciela
            serwisu. Dokument będzie zawierał informacje o administratorze danych,
            zakresie i celu przetwarzania, podstawach prawnych, okresie
            przechowywania, prawach osób, których dane dotyczą, oraz informacje
            o cookies i odbiorcach danych.
          </Text>

          <Text muted className="text-base leading-relaxed">
            W razie pytań dotyczących przetwarzania Twoich danych osobowych
            zapraszamy do kontaktu — odpowiadamy w ciągu 24 godzin.
          </Text>
        </div>

        <div className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/kontakt?source=polityka"
            className="inline-flex items-center justify-center bg-foreground px-8 py-3 font-serif text-xs uppercase tracking-[0.25em] text-background transition-colors hover:bg-accent-gold hover:text-foreground"
          >
            Skontaktuj się z nami
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground hover:text-accent-gold transition-colors"
          >
            <span aria-hidden>←</span> Powrót na stronę główną
          </Link>
        </div>
      </Container>
    </Section>
  )
}
