import { Container, Section, Separator } from '@/components/ui'
import { Shield, Eye, Handshake, Award } from 'lucide-react'

const signals = [
  {
    icon: Shield,
    value: '15+',
    label: 'Lat doświadczenia',
    quote: '"',
  },
  {
    icon: Eye,
    value: '100%',
    label: 'Weryfikacja autentyczności',
    quote: '"',
  },
  {
    icon: Handshake,
    value: '500+',
    label: 'Zadowolonych klientów',
    quote: '"',
  },
  {
    icon: Award,
    value: 'Certyfikowani',
    label: 'Eksperci zegarmistrzowscy',
    quote: '"',
  },
]

export function TrustSignals() {
  return (
    <Section spacing="md">
      <Container>
        <Separator className="mb-16" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((signal, index) => (
            <div key={index} className="trust-card text-center">
              {/* Decorative gold quote */}
              <span
                className="absolute right-5 top-5 select-none font-serif text-4xl leading-none"
                style={{ color: 'rgba(201, 169, 98, 0.10)', fontSize: '32px' }}
                aria-hidden="true"
              >
                {signal.quote}
              </span>

              <signal.icon className="mx-auto h-8 w-8" style={{ color: '#c9a962' }} />
              <p className="mt-4 font-serif text-2xl font-semibold lg:text-3xl">
                {signal.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{signal.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
