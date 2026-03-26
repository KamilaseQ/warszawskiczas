'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/produkty', label: 'Produkty' },
  { href: '/kolekcja-na-zapytanie', label: 'Kolekcja na zapytanie' },
  {
    href: '/uslugi',
    label: 'Usługi',
    children: [
      { href: '/uslugi/naprawa-i-serwis', label: 'Naprawa i serwis' },
      { href: '/uslugi/skup', label: 'Skup' },
      { href: '/uslugi/komis', label: 'Komis' },
    ],
  },
  { href: '/butik', label: 'Butik' },
  { href: '/kontakt', label: 'Kontakt' },
]

interface NavigationProps {
  className?: string
  isTransparent?: boolean
}

export function Navigation({ className, isTransparent = false }: NavigationProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('items-center gap-1', className)}>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

        if (item.children) {
          return (
            <div key={item.href} className="group relative">
              <Link
                href={item.href}
                className={cn(
                  'nav-link inline-flex items-center px-4 py-2 font-medium transition-colors duration-500 ease-in-out',
                  isActive ? 'active' : '',
                  isActive
                    ? (isTransparent ? 'text-accent-gold' : 'text-accent-green')
                    : isTransparent ? 'text-white hover:text-white/80' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {item.label}
              </Link>
              <div className="invisible absolute left-0 top-full min-w-[200px] pt-2 opacity-0 transition-all duration-500 group-hover:visible group-hover:opacity-100">
                <div className="rounded border border-border bg-background p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className={cn(
                        'block rounded px-4 py-2 text-sm transition-colors duration-500',
                        pathname === child.href
                          ? 'bg-muted text-accent-green'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'nav-link inline-flex items-center px-4 py-2 font-medium transition-colors duration-500 ease-in-out',
              isActive ? 'active' : '',
              isActive
                ? (isTransparent ? 'text-accent-gold' : 'text-accent-green')
                : isTransparent ? 'text-white hover:text-white/80' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
