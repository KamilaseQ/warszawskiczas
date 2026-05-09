'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, MapPin, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { CONTACT_PHONE, CONTACT_PHONE_RAW, ADDRESS } from '@/lib/config'
import { useBodyScrollLock } from '@/lib/use-body-scroll-lock'

const primaryNav = [
  { href: '/', label: 'Strona główna' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/kolekcja-na-zapytanie', label: 'Ukryta Kolekcja' },
  { href: '/uslugi/naprawa-i-serwis', label: 'Naprawa i serwis' },
  { href: '/uslugi/skup', label: 'Skup zegarków' },
  { href: '/uslugi/komis', label: 'Komis' },
  { href: '/butik', label: 'Butik' },
  { href: '/kontakt?source=nav-mobile', label: 'Kontakt' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Close on route change
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useBodyScrollLock(open)

  if (!mounted) return null

  const menuContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex flex-col bg-[#0a0a0a] text-white lg:hidden"
        >
          {/* Grain texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }}
          />

          {/* Top bar — logo + close */}
          <div className="relative flex h-20 flex-shrink-0 items-center justify-between border-b border-white/10 px-6">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-xl font-medium tracking-wide text-white"
            >
              Warszawski Czas
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Zamknij menu"
              className="inline-flex h-10 w-10 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-accent-gold hover:text-accent-gold"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="relative flex-1 overflow-y-auto px-8 py-10">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.45em] text-accent-gold">
              Menu
            </p>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
              }}
              className="mt-8 space-y-1"
            >
              {primaryNav.map((item) => {
                const isActive = pathname === item.href
                return (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] } },
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'group flex items-baseline justify-between border-b border-white/10 py-4 transition-colors duration-300',
                        isActive ? 'text-accent-gold' : 'text-white hover:text-accent-gold'
                      )}
                    >
                      <span className="font-serif text-3xl font-normal sm:text-4xl">
                        {item.label}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          'translate-x-0 font-sans text-[10px] uppercase tracking-[0.3em] transition-all duration-300 group-hover:translate-x-1',
                          isActive ? 'text-accent-gold' : 'text-white/30 group-hover:text-accent-gold'
                        )}
                      >
                        →
                      </span>
                    </Link>
                  </motion.li>
                )
              })}
            </motion.ul>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-10"
            >
              <Link
                href="/kontakt?source=mobile-menu-cta"
                onClick={onClose}
                className="block w-full bg-accent-gold py-4 text-center font-serif text-xs uppercase tracking-[0.3em] text-[#0a0a0a] transition-colors hover:bg-white"
              >
                Umów konsultację
              </Link>
            </motion.div>
          </nav>

          {/* Footer w menu — telefon i adres */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="relative border-t border-white/10 px-8 py-6 text-white/60"
          >
            <a
              href={`tel:${CONTACT_PHONE_RAW}`}
              className="flex items-center gap-3 py-2 text-sm transition-colors hover:text-accent-gold"
            >
              <Phone className="h-4 w-4 text-accent-gold" />
              {CONTACT_PHONE}
            </a>
            <p className="flex items-start gap-3 py-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
              <span>
                {ADDRESS.street}, {ADDRESS.postal} {ADDRESS.city}
              </span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return createPortal(menuContent, document.body)
}
