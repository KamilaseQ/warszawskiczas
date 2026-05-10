import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Header, Footer, ScrollProgress, LoadingScreen, WhatsAppButton, PageTransition } from '@/components/layout'
import { alternateLanguages, canonicalPath, localeFromPathname } from '@/lib/i18n'

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers()
  const pathname = requestHeaders.get('x-wc-pathname') ?? '/'
  const locale = localeFromPathname(pathname)
  const canonical = canonicalPath(pathname, locale)

  return {
    alternates: {
      languages: alternateLanguages(canonical, 'pl'),
    },
  }
}

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
