'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const navItems = [
  { href: '/', label: 'Strona główna' },
  { href: '/produkty', label: 'Produkty' },
  { href: '/kolekcja-na-zapytanie', label: 'Kolekcja na zapytanie' },
  { href: '/uslugi', label: 'Usługi', isHeader: true },
  { href: '/uslugi/naprawa-i-serwis', label: 'Naprawa i serwis', indent: true },
  { href: '/uslugi/skup', label: 'Skup', indent: true },
  { href: '/uslugi/komis', label: 'Komis', indent: true },
  { href: '/butik', label: 'Butik' },
  { href: '/kontakt', label: 'Kontakt' },
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

  // Close menu on route change
  useEffect(() => {
    onClose()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!mounted) return null

  const menuContent = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[200] bg-foreground/20 backdrop-blur-sm transition-opacity lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[201] w-full max-w-sm transform bg-background shadow-xl transition-transform duration-300 ease-in-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <span className="font-serif text-xl font-semibold">Menu</span>
          <button
            type="button"
            className="rounded p-2 text-foreground"
            onClick={onClose}
            aria-label="Zamknij menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center justify-between rounded px-4 py-3 text-base transition-colors',
                  item.indent && 'ml-4',
                  item.isHeader && 'mt-4 font-medium',
                  isActive
                    ? 'bg-muted text-accent-green'
                    : 'text-foreground hover:bg-muted'
                )}
                onClick={onClose}
              >
                {item.label}
                {!item.indent && !item.isHeader && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-6">
          <Link
            href="/butik"
            className="flex w-full items-center justify-center rounded bg-accent-green px-6 py-3 text-base font-medium text-white transition-colors hover:bg-accent-green/90"
            onClick={onClose}
          >
            Odwiedź butik
          </Link>
        </div>
      </div>
    </>
  )

  return createPortal(menuContent, document.body)
}
