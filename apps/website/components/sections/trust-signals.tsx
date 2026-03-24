import { Container, Section, Separator } from '@/components/ui'
import { Shield, Eye, Handshake, Award } from 'lucide-react'

const signals = [
  {
    icon: Shield,
    value: '15+',
    label: 'Lat doświadczenia',
  },
  {
    icon: Eye,
    value: '100%',
    label: 'Weryfikacja autentyczności',
  },
  {
    icon: Handshake,
    value: '500+',
    label: 'Zadowolonych klientów',
  },
  {
    icon: Award,
    value: 'Certyfikowani',
    label: 'Eksperci zegarmistrzowscy',
  },
]

export function TrustSignals() {
  return (
    <Section spacing="md">
      <Container>
        <Separator className="mb-16" />
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {signals.map((signal, index) => (
            <div key={index} className="text-center">
              <signal.icon className="mx-auto h-8 w-8 text-accent-green" />
              <p className="mt-4 font-serif text-2xl font-semibold lg:text-3xl">
                {signal.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {signal.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
