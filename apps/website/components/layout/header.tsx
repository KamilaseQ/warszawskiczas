'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Navigation } from './navigation'
import { MobileMenu } from './mobile-menu'
import { Button } from '@/components/ui'

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
              "font-serif text-xl font-semibold tracking-tight lg:text-2xl transition-colors duration-500 ease-in-out",
              isSolid ? "text-foreground" : "text-white"
            )}>
              Warszawski Czas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation className="hidden lg:flex" isTransparent={!isSolid} />

          {/* Desktop CTA & Phone */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="tel:+48123456789" className={cn("group flex items-center gap-2 text-sm font-semibold tracking-wide transition-colors duration-500 ease-in-out", isSolid ? "text-foreground hover:text-accent-gold" : "text-white hover:text-white/80")}>
              <Phone className="h-4 w-4 text-accent-gold transition-colors duration-500 ease-in-out" />
              +48 123 456 789
            </a>
            <Button
              asChild
              className={cn(
                "transition-all duration-500 ease-in-out border-transparent",
                !isSolid
                  ? "bg-white text-black hover:text-accent-gold shadow-xl"
                  : "bg-accent-green text-white hover:bg-white hover:text-black hover:shadow-xl"
              )}
            >
              <Link href="/butik">Odwiedź butik</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded p-2 lg:hidden transition-colors duration-500 ease-in-out relative z-[60]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setMobileMenuOpen((prev) => !prev);
            }}
            aria-label="Otwórz menu"
          >
            <Menu className={cn("h-6 w-6 transition-colors duration-500 ease-in-out", isSolid ? "text-foreground" : "text-white")} />
          </button>
        </div>
      </header>

      {/* Mobile Menu - Outside Header Stacking Context */}
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
