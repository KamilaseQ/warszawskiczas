import Link from 'next/link'
import { MapPin, Clock, Phone } from 'lucide-react'
import { Container, Section } from '@/components/ui'
import { FadeIn } from '@/components/ui/fade-in'

export function BoutiquePreview() {
  return (
    // 6.1 Połączona sekcja Boutique + Mokotowska 71
    <Section variant="muted" spacing="lg">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Lewa — treść */}
          <FadeIn direction="right">
            <div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.5em] text-accent-gold mb-6">
                VI &nbsp;——&nbsp; Butik
              </p>
              <h2 className="font-serif text-3xl lg:text-4xl font-medium tracking-tight text-foreground text-balance">
                Odwiedź nas<br />
                <span className="italic font-normal">na Mokotowskiej 71</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Zapraszamy do naszej przestrzeni w sercu Warszawy, gdzie w spokojnej
                atmosferze możesz poznać naszą kolekcję i porozmawiać z ekspertami.
              </p>

              {/* Dane kontaktowe */}
              <div className="mt-10 space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
                  <div>
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-1">Adres</p>
                    <p className="text-sm text-foreground font-medium">ul. Mokotowska 71, 00-530 Warszawa</p>
                  </div>
                </div>

                {/* 6.5 Godziny na osobnych liniach */}
                <div className="flex items-start gap-4">
                  <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent-gold" />
                  <div>
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-1">Godziny otwarcia</p>
                    <div className="text-sm text-foreground space-y-0.5">
                      <p>Pon – Pt: 10:00 – 18:00</p>
                      <p>Sob: 10:00 – 15:00</p>
                      <p className="text-muted-foreground">Nd: Zamknięte</p>
                    </div>
                  </div>
                </div>

                {/* 6.3 Prawdziwy numer */}
                <div className="flex items-center gap-4">
                  <Phone className="h-4 w-4 flex-shrink-0 text-accent-gold" />
                  <div>
                    <p className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-muted-foreground/60 mb-1">Telefon</p>
                    <a
                      href="tel:+48604501000"
                      className="text-sm text-foreground font-medium hover:text-accent-gold transition-colors duration-300"
                    >
                      +48 604 501 000
                    </a>
                  </div>
                </div>
              </div>

              {/* 6.4 Button zunifikowany */}
              <Link href="/butik" className="btn-sharp mt-10 inline-block">
                Więcej o butiku
              </Link>
            </div>
          </FadeIn>

          {/* Prawa — mapa lub placeholder + ramka gold */}
          <FadeIn delay={0.15} direction="left">
            <div className="relative">
              {/* 6.6 Google Maps embed — dark/sepia theme */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a18]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.3!2d21.017!3d52.222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc7b27a7a8c3%3A0x0!2sMokotowska+71%2C+Warszawa!5e0!3m2!1spl!2spl!4v1"
                  width="100%"
                  height="100%"
                  style={{
                    border: 0,
                    filter: 'grayscale(1) contrast(1.1) brightness(0.7) sepia(0.3)',
                    position: 'absolute',
                    inset: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Warszawski Czas — Mokotowska 71, Warszawa"
                />
                {/* Gradient overlay dla premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/30 to-transparent pointer-events-none" />
              </div>

              {/* 6.2 Ramka gold zamiast green */}
              <div className="absolute -bottom-4 -right-4 h-full w-full border border-accent-gold/30 pointer-events-none lg:-bottom-5 lg:-right-5" />
            </div>
          </FadeIn>
        </div>
      </Container>
    </Section>
  )
}
