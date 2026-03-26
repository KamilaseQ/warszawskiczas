import {
  Hero,
  BrandPositioning,
  ProductShowcase,
  HiddenCollectionTeaser,
  ServicesOverview,
  BoutiquePreview,
  TrustSignals,
  FinalCTA,
} from '@/components/sections'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductShowcase />
      <BrandPositioning />
      <HiddenCollectionTeaser />
      <ServicesOverview />
      <BoutiquePreview />
      <TrustSignals />
      <FinalCTA />
    </>
  )
}
