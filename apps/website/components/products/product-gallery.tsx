'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { ImagePlaceholder } from '@/components/ui'
import { cn } from '@/lib/utils'

interface ProductGalleryProps {
  brand: string
  name: string
}

// 4 sloty zdjęć (placeholder do podmiany na realne ścieżki gdy zdjęcia trafią od właściciela).
const SLOTS = [
  { label: 'Tarcza' },
  { label: 'Boczne' },
  { label: 'Dekiel' },
  { label: 'Na nadgarstku' },
] as const

export function ProductGallery({ brand, name }: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    if (!zoom) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoom(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [zoom])

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setZoom(true)}
        className="group relative block w-full cursor-zoom-in overflow-hidden"
        aria-label={`Powiększ zdjęcie ${brand} ${name} — ${SLOTS[active].label}`}
      >
        <ImagePlaceholder
          variant="light"
          className="aspect-[4/5] w-full transition-transform duration-1000 group-hover:scale-[1.02]"
          label={`${brand} ${name} · ${SLOTS[active].label}`}
        />
        <div className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-accent-gold/40" />
        <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 bg-[#0a0a0a]/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Powiększ
          <span aria-hidden>+</span>
        </span>
      </button>

      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        {SLOTS.map((slot, i) => {
          const isActive = i === active
          return (
            <button
              key={slot.label}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                'group relative aspect-square overflow-hidden border transition-colors duration-300',
                isActive
                  ? 'border-accent-gold'
                  : 'border-transparent hover:border-accent-gold/40'
              )}
              aria-label={slot.label}
            >
              <ImagePlaceholder
                variant="light"
                className="absolute inset-0"
                label={slot.label}
                showDial={false}
              />
              <span
                className={cn(
                  'pointer-events-none absolute inset-x-0 bottom-1 px-1 font-sans text-[8px] uppercase tracking-[0.25em] transition-colors duration-300',
                  isActive ? 'text-accent-gold' : 'text-foreground/50'
                )}
              >
                {slot.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[#0a0a0a]/95 p-6"
            onClick={() => setZoom(false)}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setZoom(false)
              }}
              className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-accent-gold hover:text-accent-gold"
              aria-label="Zamknij"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <ImagePlaceholder
                variant="dark"
                className="aspect-[4/5] w-full"
                label={`${brand} ${name} · ${SLOTS[active].label}`}
              />
              <div className="mt-4 flex items-center justify-center gap-3">
                {SLOTS.map((slot, i) => (
                  <button
                    key={slot.label}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'h-1 w-8 transition-colors duration-300',
                      i === active ? 'bg-accent-gold' : 'bg-white/30 hover:bg-white/60'
                    )}
                    aria-label={slot.label}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
