'use client'

import { useState } from 'react'
import { Container, Section, WaxSeal } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

const benefits = [
  { numeral: 'I', text: 'Dostęp do zegarków niedostępnych publicznie' },
  { numeral: 'II', text: 'Indywidualna konsultacja ze specjalistą' },
  { numeral: 'III', text: 'Dyskretna, bezpieczna transakcja' },
]

export function PrivateCollectionRegistration() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Section
      id="registration"
      spacing="xl"
      className="relative overflow-hidden bg-[#050403] text-white"
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_25%_25%,rgba(201,169,98,0.1)_0%,transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_90%,rgba(201,169,98,0.06)_0%,transparent_55%)]" />

      <Container className="relative">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* LEFT — editorial side */}
          <div className="relative lg:col-span-5">
            <FadeIn>
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-accent-gold/60" />
                <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold">
                  Poproś o dostęp
                </p>
              </div>
              <h2 className="mt-8 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] text-balance leading-[1.05]">
                Uzyskaj dostęp<br />
                <span className="italic font-normal">do Kolekcji Prywatnej</span>
              </h2>
              <p className="mt-8 max-w-md font-sans text-[15px] leading-relaxed text-white/55 text-pretty">
                Wypełnij formularz. Specjalista skontaktuje się z Tobą w ciągu 24 godzin
                i przekaże indywidualny kod dostępu.
              </p>
              <div className="mt-8 font-serif text-2xl text-accent-gold/55 leading-none">· · ·</div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <ul className="mt-10 space-y-5">
                {benefits.map((b) => (
                  <li key={b.numeral} className="flex items-baseline gap-5">
                    <span className="font-serif italic text-base text-accent-gold/70" style={{ minWidth: '2ch', letterSpacing: '0.05em' }}>
                      {b.numeral}
                    </span>
                    <span className="font-sans text-sm leading-relaxed text-white/75">
                      {b.text}
                    </span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-16 flex items-center gap-5">
                <WaxSeal size={88} rotate={-12} />
                <div>
                  <p className="font-serif italic text-sm text-white/45">
                    Sygnatura
                  </p>
                  <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-white/70">
                    Warszawski Czas
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.15}>
              <div className="relative">
                {/* Decorative offset frames — magazine plate */}
                <div className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-accent-gold/30 sm:block" />
                <div className="pointer-events-none absolute -top-4 -left-4 hidden h-full w-full border border-accent-gold/15 sm:block" />

                <div className="relative bg-[#0a0a0a] p-8 lg:p-12">
                  {/* Top gold accent */}
                  <div className="mb-10 h-px w-full bg-gradient-to-r from-transparent via-accent-gold/60 to-transparent" />

                  {submitted ? (
                    <SuccessState />
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-7">
                      <div className="grid gap-7 sm:grid-cols-2">
                        <Field label="Imię i nazwisko *" name="name" required />
                        <Field label="E-mail *" name="email" type="email" required />
                      </div>

                      <div className="grid gap-7 sm:grid-cols-2">
                        <Field label="Numer telefonu *" name="phone" type="tel" required />

                        <div>
                          <label className="mb-3 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
                            Co Cię interesuje? *
                          </label>
                          <select
                            required
                            name="interest"
                            defaultValue=""
                            className="block w-full appearance-none border-b border-white/25 bg-transparent px-0 py-2 font-sans text-sm text-white focus:border-accent-gold focus:outline-none focus:ring-0"
                          >
                            <option value="" disabled className="bg-[#0a0a0a]">
                              Wybierz...
                            </option>
                            <option value="zakup" className="bg-[#0a0a0a]">
                              Zakup zegarka z kolekcji prywatnej
                            </option>
                            <option value="wycena" className="bg-[#0a0a0a]">
                              Wycena posiadanego zegarka
                            </option>
                            <option value="komis" className="bg-[#0a0a0a]">
                              Komis
                            </option>
                            <option value="inne" className="bg-[#0a0a0a]">
                              Inne
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="mb-3 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
                          Powiedz nam coś o sobie
                        </label>
                        <textarea
                          name="message"
                          rows={4}
                          placeholder="Np. jaki typ zegarków Cię interesuje, jaki mniej więcej budżet..."
                          className="block w-full resize-none border-b border-white/25 bg-transparent px-0 py-2 font-sans text-sm italic text-white placeholder:italic placeholder:text-white/30 focus:border-accent-gold focus:outline-none focus:ring-0"
                        />
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer select-none pt-2">
                        <input
                          type="checkbox"
                          required
                          name="rodo"
                          className="mt-1 h-4 w-4 flex-shrink-0 accent-accent-gold"
                        />
                        <span className="font-sans text-xs leading-relaxed text-white/45 text-pretty">
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

                      <p className="text-center font-sans text-[10px] uppercase tracking-[0.4em] text-white/35">
                        Odpowiedź w ciągu 24 godzin
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
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
      <label className="mb-3 block text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-white/60">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="block w-full border-b border-white/25 bg-transparent px-0 py-2 font-sans text-sm text-white placeholder:text-white/30 focus:border-accent-gold focus:outline-none focus:ring-0"
      />
    </div>
  )
}

function SuccessState() {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex justify-center wax-seal-stamp">
        <WaxSeal size={110} rotate={-12} />
      </div>
      <h3 className="mt-10 font-serif text-2xl font-medium italic text-white sm:text-3xl">
        Twoja korespondencja została odebrana
      </h3>
      <div className="mx-auto mt-5 h-px w-12 bg-accent-gold/60" />
      <p className="mx-auto mt-7 max-w-md text-sm leading-relaxed text-white/55 text-pretty">
        Specjalista skontaktuje się z Tobą w ciągu 24 godzin na podany numer lub e-mail.
        Kod dostępu zostanie przekazany po krótkiej rozmowie.
      </p>
      <p className="mt-10 font-sans text-[10px] font-bold uppercase tracking-[0.5em] text-accent-gold/70">
        Warszawski Czas &nbsp;·&nbsp; od 2009
      </p>
    </div>
  )
}
