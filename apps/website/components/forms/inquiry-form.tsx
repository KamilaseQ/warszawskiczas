'use client'

import { useState } from 'react'
import { FormField } from './form-field'
import { Button } from '@/components/ui'

interface InquiryFormProps {
  subject?: string
  submitLabel?: string
  successMessage?: string
}

export function InquiryForm({
  subject,
  submitLabel = 'Wyślij zapytanie',
  successMessage = 'Dziękujemy za zapytanie. Skontaktujemy się wkrótce.',
}: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded border border-accent-gold/20 bg-accent-gold/5 p-8 text-center">
        <h3 className="font-serif text-xl font-semibold text-foreground">
          Zapytanie wysłane
        </h3>
        <p className="mt-2 text-muted-foreground">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Imię i nazwisko"
          name="name"
          type="text"
          placeholder="Jan Kowalski"
          required
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          placeholder="jan@example.com"
          required
        />
      </div>
      <FormField
        label="Telefon"
        name="phone"
        type="tel"
        placeholder="+48 604 50 1000"
        required
      />
      {subject && <input type="hidden" name="subject" value={subject} />}
      <FormField
        as="textarea"
        label="Szczegóły zapytania"
        name="details"
        placeholder="Opisz czego szukasz lub jakie masz pytanie..."
        required
      />
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Wysyłanie...' : submitLabel}
      </Button>
    </form>
  )
}
