'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { ProductCard } from './product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/data/mock-products'

interface ProductCatalogProps {
  products: Product[]
}

const CATEGORIES = [
  { value: 'zegarki', label: 'Zegarki' },
  { value: 'bizuteria', label: 'Biżuteria' },
] as const

const STATUSES = ['Wszystkie', 'Dostępny', 'Zarezerwowany', 'Sprzedany'] as const

const SORTS = [
  { value: 'featured', label: 'Polecane' },
  { value: 'newest', label: 'Najnowsze (rok)' },
  { value: 'oldest', label: 'Najstarsze (rok)' },
  { value: 'price-asc', label: 'Cena rosnąco' },
  { value: 'price-desc', label: 'Cena malejąco' },
  { value: 'brand-asc', label: 'Marka A–Z' },
] as const

const PRICE_MIN = 0
const PRICE_MAX = 500000

const yearNum = (y: Product['year']) =>
  typeof y === 'number' ? y : Number(String(y ?? '').replace(/^#/, '')) || 0

export function ProductCatalog({ products }: ProductCatalogProps) {
  const reducedMotion = useReducedMotion()
  const [category, setCategory] = useState<'zegarki' | 'bizuteria'>('zegarki')
  const [brand, setBrand] = useState<string>('Wszystkie')
  const [status, setStatus] = useState<string>('Wszystkie')
  const [sort, setSort] = useState<string>('featured')
  const [priceMax, setPriceMax] = useState<number>(PRICE_MAX)
  const [onlyOnRequest, setOnlyOnRequest] = useState<boolean>(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Marki z aktualnych danych — skaluje się automatycznie wraz z rozbudową katalogu
  const brandsForCategory = useMemo(() => {
    const set = new Set<string>()
    products.filter((p) => p.category === category).forEach((p) => set.add(p.brand))
    return ['Wszystkie', ...Array.from(set).sort((a, b) => a.localeCompare(b, 'pl'))]
  }, [products, category])

  const filtered = useMemo(() => {
    let out = products.filter((p) => p.category === category)
    if (brand !== 'Wszystkie') out = out.filter((p) => p.brand === brand)
    if (status !== 'Wszystkie') out = out.filter((p) => p.status === status)
    if (onlyOnRequest) out = out.filter((p) => p.priceOnRequest)
    out = out.filter((p) => (p.price ? p.price <= priceMax : true))

    if (sort === 'price-asc') {
      out = [...out].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
    } else if (sort === 'price-desc') {
      out = [...out].sort((a, b) => (b.price ?? -Infinity) - (a.price ?? -Infinity))
    } else if (sort === 'newest') {
      out = [...out].sort((a, b) => yearNum(b.year) - yearNum(a.year))
    } else if (sort === 'oldest') {
      out = [...out].sort((a, b) => yearNum(a.year) - yearNum(b.year))
    } else if (sort === 'brand-asc') {
      out = [...out].sort((a, b) => a.brand.localeCompare(b.brand, 'pl'))
    } else if (sort === 'featured') {
      out = [...out].sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    }

    return out
  }, [products, category, brand, status, sort, priceMax, onlyOnRequest])

  const activeFilterCount =
    (brand !== 'Wszystkie' ? 1 : 0) +
    (status !== 'Wszystkie' ? 1 : 0) +
    (priceMax !== PRICE_MAX ? 1 : 0) +
    (onlyOnRequest ? 1 : 0)

  const clearFilters = () => {
    setBrand('Wszystkie')
    setStatus('Wszystkie')
    setPriceMax(PRICE_MAX)
    setOnlyOnRequest(false)
  }

  const fmt = (v: number) =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0 }).format(v)

  // Lock scroll gdy drawer otwarty
  useEffect(() => {
    if (drawerOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [drawerOpen])

  // Esc zamyka drawer
  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawerOpen])

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4 lg:mb-8">
        {/* Tabs kategorii */}
        <div className="flex gap-6 sm:gap-8">
          {CATEGORIES.map((c) => {
            const isActive = c.value === category
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => {
                  setCategory(c.value as 'zegarki' | 'bizuteria')
                  setBrand('Wszystkie')
                }}
                className={cn(
                  'relative pb-3 font-serif text-xs uppercase tracking-[0.3em] transition-colors duration-300 sm:text-sm',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {c.label}
                <span
                  className={cn(
                    'absolute -bottom-px left-0 right-0 h-px transition-all duration-500',
                    isActive ? 'bg-accent-gold' : 'bg-transparent'
                  )}
                />
              </button>
            )
          })}
        </div>

        {/* Akcje */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Otwórz filtry"
            aria-expanded={drawerOpen}
            className="group inline-flex items-center gap-2 border border-foreground/15 bg-transparent px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:border-accent-gold hover:text-accent-gold sm:px-4"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filtry</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 inline-flex h-4 min-w-4 items-center justify-center bg-accent-gold px-1 font-sans text-[9px] font-bold tracking-normal text-[#0a0a0a]">
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sortuj"
              className="appearance-none border border-foreground/15 bg-transparent py-2 pl-3 pr-8 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors duration-300 hover:border-accent-gold focus:outline-none focus:ring-0 sm:pl-4 sm:pr-9"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-background">
                  {s.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-foreground/60 sm:right-3" />
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      <AnimatePresence initial={false}>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-muted-foreground/70">
                Aktywne:
              </span>
              {brand !== 'Wszystkie' && (
                <FilterChip label={brand} onClear={() => setBrand('Wszystkie')} />
              )}
              {status !== 'Wszystkie' && (
                <FilterChip label={status} onClear={() => setStatus('Wszystkie')} />
              )}
              {priceMax !== PRICE_MAX && (
                <FilterChip label={`do ${fmt(priceMax)}`} onClear={() => setPriceMax(PRICE_MAX)} />
              )}
              {onlyOnRequest && (
                <FilterChip label="Cena na zapytanie" onClear={() => setOnlyOnRequest(false)} />
              )}
              <button
                type="button"
                onClick={clearFilters}
                className="ml-1 font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-accent-gold"
              >
                Wyczyść wszystkie
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mb-6 font-sans text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? 'pozycja' : filtered.length < 5 ? 'pozycje' : 'pozycji'}
      </p>

      {filtered.length > 0 ? (
        <motion.div
          key={`${category}-${brand}-${status}-${priceMax}-${onlyOnRequest}-${sort}`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.07, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-3 lg:gap-y-16 xl:grid-cols-4"
        >
          {filtered.map((p) => (
            <motion.div
              key={p.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
                },
              }}
            >
              <ProductCard product={p} aspect="portrait" />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="border border-dashed border-border py-24 text-center">
          <p className="font-serif italic text-lg text-muted-foreground">
            {category === 'bizuteria'
              ? 'Kolekcja biżuterii pojawi się wkrótce.'
              : 'Brak pozycji spełniających wybrane filtry.'}
          </p>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-accent-gold"
            >
              Wyczyść filtry
            </button>
          )}
        </div>
      )}

      {/* DRAWER FILTRÓW */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[300] bg-[#0a0a0a]/40 backdrop-blur-[2px]"
              aria-hidden="true"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Filtry"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 right-0 z-[301] flex w-full max-w-md flex-col bg-background shadow-[-20px_0_60px_-20px_rgba(0,0,0,0.25)]"
            >
              <header className="flex items-center justify-between border-b border-border px-6 py-5 lg:px-8">
                <div>
                  <p className="font-sans text-[9px] font-bold uppercase tracking-[0.4em] text-accent-gold">
                    Selekcja
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-medium tracking-tight text-foreground">
                    Filtry
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Zamknij filtry"
                  className="flex h-9 w-9 items-center justify-center text-foreground transition-colors hover:text-accent-gold"
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-8">
                <div className="space-y-8">
                  {/* Marka — chips, generowane z aktualnych danych */}
                  <FilterSection label={`Marka · ${brandsForCategory.length - 1}`}>
                    <div className="flex flex-wrap gap-2">
                      {brandsForCategory.map((b) => {
                        const isActive = b === brand
                        return (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setBrand(b)}
                            className={cn(
                              'border px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300',
                              isActive
                                ? 'border-accent-gold bg-accent-gold text-[#0a0a0a]'
                                : 'border-foreground/15 text-foreground hover:border-accent-gold hover:text-accent-gold'
                            )}
                          >
                            {b}
                          </button>
                        )
                      })}
                    </div>
                  </FilterSection>

                  {/* Status / dostępność */}
                  <FilterSection label="Dostępność">
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => {
                        const isActive = s === status
                        return (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setStatus(s)}
                            className={cn(
                              'border px-3 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.25em] transition-all duration-300',
                              isActive
                                ? 'border-accent-gold bg-accent-gold text-[#0a0a0a]'
                                : 'border-foreground/15 text-foreground hover:border-accent-gold hover:text-accent-gold'
                            )}
                          >
                            {s}
                          </button>
                        )
                      })}
                    </div>
                  </FilterSection>

                  {/* Cena */}
                  <FilterSection label={`Cena maks. ${fmt(priceMax)}`}>
                    <input
                      type="range"
                      min={PRICE_MIN}
                      max={PRICE_MAX}
                      step={1000}
                      value={priceMax}
                      onChange={(e) => setPriceMax(Number(e.target.value))}
                      className="price-slider"
                      aria-label="Maksymalna cena"
                    />
                    <div className="mt-3 flex justify-between font-sans text-[9px] uppercase tracking-[0.25em] text-muted-foreground/70">
                      <span>{fmt(PRICE_MIN)}</span>
                      <span>{fmt(PRICE_MAX)}+</span>
                    </div>
                    <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                      Pozycje &ldquo;Cena na zapytanie&rdquo; nie są filtrowane wg ceny.
                    </p>
                  </FilterSection>

                  {/* Toggle: tylko cena na zapytanie */}
                  <FilterSection label="Wyróżnienia">
                    <label className="flex cursor-pointer items-center gap-3 select-none">
                      <input
                        type="checkbox"
                        checked={onlyOnRequest}
                        onChange={(e) => setOnlyOnRequest(e.target.checked)}
                        className="sr-only peer"
                      />
                      <span
                        className={cn(
                          'relative h-5 w-9 border transition-colors duration-300',
                          onlyOnRequest
                            ? 'border-accent-gold bg-accent-gold/20'
                            : 'border-foreground/25 bg-transparent'
                        )}
                      >
                        <span
                          className={cn(
                            'absolute top-1/2 h-3 w-3 -translate-y-1/2 transition-all duration-300',
                            onlyOnRequest
                              ? 'left-[calc(100%-0.875rem)] bg-accent-gold'
                              : 'left-1 bg-foreground/40'
                          )}
                        />
                      </span>
                      <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-foreground">
                        Tylko cena na zapytanie
                      </span>
                    </label>
                  </FilterSection>
                </div>
              </div>

              <footer className="flex items-center gap-3 border-t border-border px-6 py-5 lg:px-8">
                <button
                  type="button"
                  onClick={clearFilters}
                  disabled={activeFilterCount === 0}
                  className="flex-1 border border-foreground/15 px-4 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-foreground transition-colors hover:border-accent-gold hover:text-accent-gold disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-foreground/15 disabled:hover:text-foreground"
                >
                  Wyczyść
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="btn-sharp flex-[2] text-center"
                >
                  Pokaż {filtered.length}
                </button>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style jsx>{`
        .price-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 1px;
          background: rgba(24, 24, 22, 0.2);
          outline: none;
          cursor: pointer;
        }
        .price-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: #c9a962;
          border: 2px solid #0a0a0a;
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .price-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .price-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #c9a962;
          border: 2px solid #0a0a0a;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground/80">
        {label}
      </p>
      {children}
    </div>
  )
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 border border-foreground/15 bg-background px-2.5 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-foreground">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Usuń filtr ${label}`}
        className="text-muted-foreground transition-colors hover:text-accent-gold"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  )
}
