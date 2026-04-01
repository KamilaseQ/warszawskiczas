'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // If not on the homepage, force the "scrolled" (solid) style so white text 
  // isn't invisible against white page backgrounds.
  const isHome = pathname === '/'
  const isSolid = isScrolled || !isHome

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out border-b",
          isSolid
            ? "border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 text-foreground"
            : "border-transparent bg-transparent text-white"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className={cn(
              "font-serif text-xl font-medium tracking-wide lg:text-xl transition-colors duration-500 ease-in-out",
              isSolid ? "text-foreground" : "text-white"
            )}>
              Warszawski Czas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden lg:flex" isTransparent={!isSolid} />

          {/* Desktop CTA & Phone */}
          <div className="hidden lg:flex items-center gap-6">
            <a href="tel:+48604501000" className={cn("group flex items-center gap-2 text-[11px] font-normal tracking-[0.18em] uppercase transition-colors duration-500 ease-in-out", isSolid ? "text-muted-foreground hover:text-accent-gold" : "text-white/70 hover:text-white")}>
              <Phone className="h-3.5 w-3.5 text-accent-gold transition-colors duration-500 ease-in-out" />
              +48 604 501 000
            </a>
            <Link
              href="/butik"
              className={cn(
                "inline-block border text-[10px] font-bold uppercase tracking-[0.3em] px-5 py-2.5 transition-all duration-500 ease-in-out",
                !isSolid
                  ? "border-white/40 text-white hover:border-accent-gold hover:text-accent-gold"
                  : "border-foreground/25 text-foreground hover:border-accent-gold hover:text-accent-gold"
              )}
            >
              Odwiedź butik
            </Link>
          </div>

          {/* Mobile Menu Button — 9.6 Animowany hamburger→X */}
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden relative z-[60] w-8 h-8"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label="Otwórz menu"
          >
            {/* Linia górna — różna długość (editorial), morph do X */}
            <span
              className={cn(
                'block h-px origin-center transition-all duration-300 ease-in-out',
                mobileMenuOpen
                  ? 'w-5 translate-y-[5px] rotate-45 bg-foreground'
                  : 'w-5 bg-current',
                isSolid ? 'bg-foreground' : 'bg-white'
              )}
            />
            {/* Linia środkowa — krótsza */}
            <span
              className={cn(
                'block h-px transition-all duration-300 ease-in-out',
                mobileMenuOpen ? 'w-0 opacity-0' : 'w-3.5 opacity-100',
                isSolid ? 'bg-foreground' : 'bg-white'
              )}
            />
            {/* Linia dolna */}
            <span
              className={cn(
                'block h-px origin-center transition-all duration-300 ease-in-out',
                mobileMenuOpen
                  ? 'w-5 -translate-y-[5px] -rotate-45 bg-foreground'
                  : 'w-5 bg-current',
                isSolid ? 'bg-foreground' : 'bg-white'
              )}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu - Outside Header Stacking Context */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
