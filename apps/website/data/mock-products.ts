export interface Product {
  id: string
  name: string
  brand: string
  category: 'zegarki' | 'bizuteria' | 'akcesoria'
  price?: number
  priceOnRequest?: boolean
  isNew?: boolean
  isExclusive?: boolean
  description: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Datejust 41',
    brand: 'Rolex',
    category: 'zegarki',
    priceOnRequest: true,
    isNew: true,
    description: 'Klasyczna elegancja w nowoczesnym wydaniu. Stal Oystersteel, tarcza srebrna.',
  },
  {
    id: '2',
    name: 'Speedmaster Professional',
    brand: 'Omega',
    category: 'zegarki',
    price: 42000,
    description: 'Legendarny zegarek księżycowy. Mechanizm ręczny, tarcza czarna.',
  },
  {
    id: '3',
    name: 'Portugieser Chronograph',
    brand: 'IWC',
    category: 'zegarki',
    price: 38000,
    description: 'Ponadczasowy design portugalskiej linii. Stal szlachetna, tarcza biała.',
  },
  {
    id: '4',
    name: 'Tank Française',
    brand: 'Cartier',
    category: 'zegarki',
    priceOnRequest: true,
    isExclusive: true,
    description: 'Ikona Art Deco. Stal szlachetna, bransoleta zintegrowana.',
  },
  {
    id: '5',
    name: 'Reverso Classic',
    brand: 'Jaeger-LeCoultre',
    category: 'zegarki',
    price: 52000,
    description: 'Obracana koperta w stylu Art Deco. Mechanizm ręczny.',
  },
  {
    id: '6',
    name: 'Nautilus',
    brand: 'Patek Philippe',
    category: 'zegarki',
    priceOnRequest: true,
    isExclusive: true,
    description: 'Legenda sportowej elegancji. Dostępny wyłącznie na zapytanie.',
  },
]

export const featuredProducts = mockProducts.slice(0, 4)
