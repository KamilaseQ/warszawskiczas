import { Header, Footer, ScrollProgress, LoadingScreen, WhatsAppButton, PageTransition } from '@/components/layout'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
