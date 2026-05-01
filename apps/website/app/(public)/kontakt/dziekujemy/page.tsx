import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Phone, Mail, ArrowRight } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export const metadata: Metadata = {
  title: 'Dziękujemy',
  description: 'Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.',
}

export default function DziekujemyPage() {
  return (
    <Section spacing="lg">
      <Container size="narrow" className="text-center">
        <FadeIn>
          <div className="mx-auto flex h-20 w-20 items-center justify-center border border-accent-gold/40 bg-accent-gold/10">
            <Check className="h-8 w-8 text-accent-gold" strokeWidth={1.5} />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-10 text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
            Wiadomość wysłana
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="mt-6 font-serif text-4xl font-medium tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Dziękujemy,<br />
            <span className="italic font-normal">odezwiemy się wkrótce.</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mx-auto mt-8 h-px w-16 bg-accent-gold/60" />
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
            Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin roboczych.
            W sprawach pilnych zapraszamy do kontaktu telefonicznego lub WhatsApp.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="tel:+48604501000"
              className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-[0.3em] text-foreground/80 hover:text-accent-gold transition-colors"
            >
              <Phone className="h-4 w-4" />
              +48 604 501 000
            </a>
            <span className="hidden sm:inline text-muted-foreground/40">·</span>
            <a
              href="mailto:biuro@warszawskiczas.pl"
              className="inline-flex items-center gap-2 text-sm font-sans font-bold uppercase tracking-[0.3em] text-foreground/80 hover:text-accent-gold transition-colors"
            >
              <Mail className="h-4 w-4" />
              biuro@warszawskiczas.pl
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            href="/"
            className="mt-16 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent-gold group"
          >
            Powrót do strony głównej
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
      </Container>
    </Section>
  )
}
