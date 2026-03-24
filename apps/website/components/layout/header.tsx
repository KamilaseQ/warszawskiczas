'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
            Warszawski Czas
          </span>
        </Link>

        {/* Desktop Navigation */}
        <Navigation className="hidden lg:flex" />

        {/* Desktop CTA */}
        <Link
          href="/butik"
          className="hidden rounded bg-accent-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-green/90 lg:inline-flex"
        >
          Odwiedź butik
        </Link>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-foreground lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Otwórz menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </header>
  )
}
