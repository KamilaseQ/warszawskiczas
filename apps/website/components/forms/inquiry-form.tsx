'use client'

import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { FormField } from './form-field'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'
import { readSessionPath } from '@/components/session-tracker'

interface InquiryFormProps {
  subject?: string
  submitLabel?: string
  successMessage?: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function InquiryForm({
  subject,
  submitLabel = 'Wyślij zapytanie',
  successMessage = 'Dziękujemy za zapytanie. Skontaktujemy się wkrótce.',
}: InquiryFormProps) {
  const mountedAt = useRef<number>(Date.now())
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')

  useEffect(() => {
    mountedAt.current = Date.now()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return
    setStatus('submitting')
    setErrorMsg('')

    const form = e.currentTarget
    const fd = new FormData(form)
    const details = String(fd.get('details') ?? '')
    const message = subject ? `[${subject}] ${details}` : details

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      message,
      rodo: fd.get('rodo') === 'on',
      company: String(fd.get('company') ?? ''),
      t: mountedAt.current,
      source: subject,
      sessionPath: readSessionPath(),
      referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setStatus('success')
        return
      }

      const data = await res.json().catch(() => ({}))
      setErrorMsg(
        typeof data?.error === 'string'
          ? data.error
          : 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub zadzwoń: +48 604 50 1000.',
      )
      setStatus('error')
    } catch {
      setErrorMsg('Brak połączenia. Sprawdź internet i spróbuj ponownie.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-accent-gold/20 bg-accent-gold/5 p-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-accent-gold/50 bg-accent-gold/10">
          <Check className="h-5 w-5 text-accent-gold" />
        </div>
        <h3 className="mt-6 font-serif text-2xl font-medium italic text-foreground">
          Dziękujemy za wiadomość
        </h3>
        <div className="mx-auto mt-4 h-px w-12 bg-accent-gold/60" />
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
          {successMessage}
          <br />
          W sprawach pilnych dzwoń:{' '}
          <a href="tel:+48604501000" className="whitespace-nowrap text-accent-gold">
            +48 604 50 1000
          </a>
          .
        </p>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Nie wypełniaj
          <input type="text" name="company" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Imię i nazwisko" name="name" type="text" placeholder="Jan Kowalski" required />
        <FormField label="Email" name="email" type="email" placeholder="jan@example.com" required />
      </div>
      <FormField label="Telefon" name="phone" type="tel" placeholder="+48 604 50 1000" required />
      <FormField
        as="textarea"
        label="Szczegóły zapytania"
        name="details"
        placeholder="Opisz czego szukasz lub jakie masz pytanie..."
        required
      />

      <label className="flex items-start gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          required
          name="rodo"
          className="mt-1 h-4 w-4 flex-shrink-0 accent-accent-gold"
        />
        <span className="font-sans text-xs leading-relaxed text-muted-foreground text-pretty">
          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie.{' '}
          Szczegóły w{' '}
          <a href="/polityka-prywatnosci" target="_blank" rel="noopener" className="text-accent-gold underline">
            polityce prywatności
          </a>
          . *
        </span>
      </label>

      {status === 'error' && errorMsg && (
        <div role="alert" className={cn('border-l-2 border-red-500/70 bg-red-50 px-4 py-3 text-sm text-red-800')}>
          {errorMsg}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={submitting}>
        {submitting ? 'Wysyłanie...' : submitLabel}
      </Button>
    </form>
  )
}
