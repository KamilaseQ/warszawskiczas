'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const benefits = [
  'Dostęp do zegarków niedostępnych publicznie',
  'Indywidualna konsultacja ze specjalistą',
  'Dyskretna, bezpieczna transakcja',
]

export function PrivateCollectionRegistration() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Frontend-only demo: brak backendu, pokazujemy success state
    setSubmitted(true)
  }

  return (
    <Section
      id="registration"
      spacing="lg"
      className="relative overflow-hidden bg-[#0b1410] text-white"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(201,169,98,0.08)_0%,transparent_55%)]" />

      <Container size="narrow" className="relative">
        <FadeIn>
          <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-4">
            Rejestracja
          </p>
          <h2 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl text-balance">
            Uzyskaj dostęp<br />
            <span className="italic font-normal">do Kolekcji Prywatnej</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 text-pretty">
            Wypełnij formularz. Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin
            i przekaże indywidualny kod dostępu.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="mt-10 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center border border-accent-gold/50">
                  <Check className="h-3 w-3 text-accent-gold" />
                </span>
                <span className="font-sans text-sm text-white/80">{b}</span>
              </li>
            ))}
          </ul>
        </FadeIn>

        {/* Formularz w dekoracyjnej ramce offset */}
        <FadeIn delay={0.15}>
          <div className="relative mt-12">
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-full w-full border border-accent-gold/30" />
            <div className="relative bg-[#0a0a0a] p-8 lg:p-12">
              {submitted ? (
                <SuccessState />
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Imię i nazwisko *" name="name" required />
                    <Field label="E-mail *" name="email" type="email" required />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field label="Numer telefonu *" name="phone" type="tel" required />

                    <div>
                      <label className="mb-2 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
                        Co Cię interesuje? *
                      </label>
                      <select
                        required
                        name="interest"
                        defaultValue=""
                        className="block w-full appearance-none border border-white/20 bg-transparent px-4 py-3 font-sans text-sm text-white focus:border-accent-gold focus:outline-none focus:ring-0"
                      >
                        <option value="" disabled className="bg-[#0a0a0a]">Wybierz...</option>
                        <option value="zakup" className="bg-[#0a0a0a]">Zakup zegarka z kolekcji prywatnej</option>
                        <option value="wycena" className="bg-[#0a0a0a]">Wycena posiadanego zegarka</option>
                        <option value="komis" className="bg-[#0a0a0a]">Komis</option>
                        <option value="inne" className="bg-[#0a0a0a]">Inne</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
                      Powiedz nam coś o sobie
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Np. jaki typ zegarków Cię interesuje, jaki mniej więcej budżet..."
                      className="block w-full resize-none border border-white/20 bg-transparent px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 focus:border-accent-gold focus:outline-none focus:ring-0"
                    />
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      name="rodo"
                      className="mt-1 h-4 w-4 flex-shrink-0 accent-accent-gold"
                    />
                    <span className="font-sans text-xs leading-relaxed text-white/50 text-pretty">
                      Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi
                      na zapytanie. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    className="btn-premium-white w-full"
                    style={{ display: 'block' }}
                  >
                    Wyślij zapytanie i uzyskaj kod dostępu
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="block w-full border border-white/20 bg-transparent px-4 py-3 font-sans text-sm text-white placeholder:text-white/30 focus:border-accent-gold focus:outline-none focus:ring-0"
      />
    </div>
  )
}

function SuccessState() {
  return (
    <div className="text-center py-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center border border-accent-gold/50 bg-accent-gold/10">
        <Check className="h-6 w-6 text-accent-gold" strokeWidth={1.5} />
      </div>
      <h3 className="mt-8 font-serif text-2xl font-medium italic text-white sm:text-3xl">
        Dziękujemy — jesteś o krok od kolekcji
      </h3>
      <div className="mx-auto mt-4 h-px w-12 bg-accent-gold/60" />
      <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/60 text-pretty">
        Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin na podany numer lub e-mail.
        Kod dostępu zostanie przekazany po krótkiej rozmowie.
      </p>
    </div>
  )
}
