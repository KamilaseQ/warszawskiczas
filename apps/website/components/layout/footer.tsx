import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const footerLinks = {
  oferta: [
    { href: '/produkty', label: 'Produkty' },
    { href: '/kolekcja-na-zapytanie', label: 'Kolekcja na zapytanie' },
  ],
  uslugi: [
    { href: '/uslugi/naprawa-i-serwis', label: 'Naprawa i serwis' },
    { href: '/uslugi/skup', label: 'Skup zegarków' },
    { href: '/uslugi/komis', label: 'Komis' },
  ],
  informacje: [
    { href: '/butik', label: 'O butiku' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-semibold tracking-tight">
                Warszawski Czas
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Butik zegarków premium w sercu Warszawy. Eksperci zegarmistrzowscy 
              z pasją do mechanicznej precyzji.
            </p>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Oferta
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.oferta.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Usługi
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.uslugi.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Informacje
              </h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.informacje.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-accent-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Kontakt
            </h3>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
                <span className="text-sm text-muted-foreground">
                  ul. Mokotowska 71<br />
                  00-530 Warszawa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-accent-green" />
                <a
                  href="tel:+48123456789"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-green"
                >
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-accent-green" />
                <a
                  href="mailto:kontakt@warszawskiczas.pl"
                  className="text-sm text-muted-foreground transition-colors hover:text-accent-green"
                >
                  kontakt@warszawskiczas.pl
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-green" />
                <span className="text-sm text-muted-foreground">
                  Pon-Pt: 10:00 - 18:00<br />
                  Sob: 10:00 - 14:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Warszawski Czas. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
