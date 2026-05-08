'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  initialTopic?: string
  variant?: 'light' | 'dark'
}

export function ContactForm({ initialTopic = '', variant = 'light' }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [topic, setTopic] = useState(initialTopic)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Front-end demo: symulacja sukcesu (backend do dopięcia później)
    setSubmitted(true)
  }

  const isDark = variant === 'dark'

  if (submitted) {
    return (
      <div
        className={cn(
          'p-10 text-center',
          isDark ? 'bg-[#0a0a0a] text-white' : 'bg-background'
        )}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-accent-gold/50 bg-accent-gold/10">
          <Check className="h-5 w-5 text-accent-gold" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-medium italic">
          Dziękujemy za wiadomość
        </h3>
        <div className="mx-auto mt-4 h-px w-12 bg-accent-gold/60" />
        <p
          className={cn(
            'mx-auto mt-6 max-w-md text-sm leading-relaxed text-pretty',
            isDark ? 'text-white/60' : 'text-muted-foreground'
          )}
        >
          Odpowiadamy w ciągu 24 godzin w dni robocze. W sprawach pilnych dzwoń na{' '}
          <a href="tel:+48604501000" className="text-accent-gold">
            +48 604 50 1000
          </a>
          .
        </p>
      </div>
    )
  }

  const labelClass = cn(
    'mb-2 block text-[10px] font-sans font-bold uppercase tracking-[0.35em]',
    isDark ? 'text-white/60' : 'text-muted-foreground'
  )
  const inputClass = cn(
    'block w-full border px-4 py-3 font-sans text-sm focus:outline-none focus:ring-0',
    isDark
      ? 'border-white/20 bg-transparent text-white placeholder:text-white/30 focus:border-accent-gold'
      : 'border-border bg-background text-foreground placeholder:text-muted-foreground/40 focus:border-accent-gold'
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cf-name">Imię i nazwisko *</label>
          <input id="cf-name" name="name" type="text" required className={inputClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="cf-email">E-mail *</label>
          <input id="cf-email" name="email" type="email" required className={inputClass} />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="cf-phone">Numer telefonu *</label>
          <input id="cf-phone" name="phone" type="tel" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="cf-topic">Temat zapytania *</label>
          <select
            id="cf-topic"
            name="topic"
            required
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={cn(inputClass, 'appearance-none')}
          >
            <option value="" disabled className={isDark ? 'bg-[#0a0a0a]' : ''}>
              Wybierz...
            </option>
            <option value="wycena" className={isDark ? 'bg-[#0a0a0a]' : ''}>Wycena zegarka</option>
            <option value="zakup" className={isDark ? 'bg-[#0a0a0a]' : ''}>Zakup</option>
            <option value="serwis" className={isDark ? 'bg-[#0a0a0a]' : ''}>Serwis i naprawa</option>
            <option value="komis" className={isDark ? 'bg-[#0a0a0a]' : ''}>Komis</option>
            <option value="prywatna" className={isDark ? 'bg-[#0a0a0a]' : ''}>Kolekcja prywatna</option>
            <option value="inne" className={isDark ? 'bg-[#0a0a0a]' : ''}>Inne</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="cf-message">Wiadomość</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="Opisz, w czym możemy pomóc..."
          className={cn(inputClass, 'resize-none')}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          name="rodo"
          className="mt-1 h-4 w-4 flex-shrink-0 accent-accent-gold"
        />
        <span
          className={cn(
            'font-sans text-xs leading-relaxed text-pretty',
            isDark ? 'text-white/50' : 'text-muted-foreground'
          )}
        >
          Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi na zapytanie. *
        </span>
      </label>

      <button
        type="submit"
        className={cn('w-full', isDark ? 'btn-premium-white' : 'btn-sharp')}
        style={{ display: 'block' }}
      >
        Wyślij wiadomość
      </button>

      <p className={cn('text-center text-[10px] uppercase tracking-[0.3em]', isDark ? 'text-white/40' : 'text-muted-foreground/60')}>
        Odpowiadamy w ciągu 24 godzin. W sprawach pilnych:{' '}
        <a href="tel:+48604501000" className="text-accent-gold">+48 604 50 1000</a>
      </p>
    </form>
  )
}
