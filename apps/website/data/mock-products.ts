export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: 'zegarki' | 'bizuteria' | 'akcesoria'
  type?: 'Sportowy' | 'Dresowy' | 'Vintage' | 'Komplikacje'
  reference?: string
  year?: number
  condition?: string
  price?: number
  priceOnRequest?: boolean
  isNew?: boolean
  isExclusive?: boolean
  featured?: boolean
  status?: 'Dostępny' | 'Zarezerwowany' | 'Sprzedany'
  description: string
  editorial?: string
  story?: string
}

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'rolex-datejust-41',
    name: 'Datejust 41',
    brand: 'Rolex',
    category: 'zegarki',
    type: 'Dresowy',
    reference: '126300',
    year: 2022,
    condition: 'Stan kolekcjonerski',
    priceOnRequest: true,
    isNew: true,
    featured: true,
    status: 'Dostępny',
    description: 'Klasyczna elegancja w nowoczesnym wydaniu. Stal Oystersteel, tarcza srebrna.',
    editorial:
      'Punkt odniesienia wśród zegarków codziennych. Datejust 41 w referencji 126300 łączy klasyczną, wyważoną kopertę 41 mm z kalibrem 3235 — sercem nowej generacji. Tarcza srebrna z indeksami 18k oddaje spokojną elegancję, która nie nudzi się po latach.',
    story:
      'Referencja 126300 to pierwszy Datejust, który otrzymał kaliber 3235 z rezerwą 70 godzin i nowym mechanizmem Chronergy. Egzemplarz w zestawie — pudełko, karta, gwarancja. Pełna historia serwisowa.',
  },
  {
    id: '2',
    slug: 'omega-speedmaster-professional',
    name: 'Speedmaster Professional',
    brand: 'Omega',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '310.30.42.50.01.001',
    year: 2021,
    condition: 'Bardzo dobry',
    price: 42000,
    status: 'Dostępny',
    description: 'Legendarny zegarek księżycowy. Mechanizm ręczny, tarcza czarna.',
    editorial:
      'Jedyny zegarek, który towarzyszył astronautom NASA podczas misji Apollo. Moonwatch Professional z kalibrem 3861 — pierwszym ręcznym mechanizmem Omegi certyfikowanym Master Chronometer.',
    story:
      'Nowa generacja Moonwatcha (2021) z mechanizmem 3861 zachowuje DNA legendarnego kalibru 861, dodając nowoczesną precyzję antymagnetyczną do 15 000 gauss.',
  },
  {
    id: '3',
    slug: 'iwc-portugieser-chronograph',
    name: 'Portugieser Chronograph',
    brand: 'IWC',
    category: 'zegarki',
    type: 'Dresowy',
    reference: 'IW3716',
    year: 2023,
    condition: 'Jak nowy',
    price: 38000,
    status: 'Dostępny',
    description: 'Ponadczasowy design portugalskiej linii. Stal szlachetna, tarcza biała.',
    editorial:
      'Czysta, pozbawiona zbędnych detali tarcza i subtelne subtarcze chronografu. Portugieser to jeden z najpiękniejszych zegarków dresowych ostatniej dekady.',
    story:
      'Linia Portugieser wywodzi się z 1939 roku, gdy portugalscy importerzy zamówili zegarek naręczny z precyzją chronometrów morskich.',
  },
  {
    id: '4',
    slug: 'cartier-tank-francaise',
    name: 'Tank Française',
    brand: 'Cartier',
    category: 'zegarki',
    type: 'Dresowy',
    reference: 'WSTA0067',
    year: 2020,
    condition: 'Bardzo dobry',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Zarezerwowany',
    description: 'Ikona Art Deco. Stal szlachetna, bransoleta zintegrowana.',
    editorial:
      'Tank Française to architektura na nadgarstku. Zintegrowana bransoleta, geometryczne proporcje koperty i dyskretna korona — ikona Cartiera od 1996 roku.',
  },
  {
    id: '5',
    slug: 'jlc-reverso-classic',
    name: 'Reverso Classic',
    brand: 'Jaeger-LeCoultre',
    category: 'zegarki',
    type: 'Dresowy',
    reference: 'Q2548520',
    year: 2019,
    condition: 'Stan kolekcjonerski',
    price: 52000,
    status: 'Dostępny',
    description: 'Obracana koperta w stylu Art Deco. Mechanizm ręczny.',
    editorial:
      'Stworzony w 1931 roku dla brytyjskich oficerów grających w polo. Obracana koperta chroni tarczę — mechaniczna odpowiedź na praktyczny problem, która stała się dziełem sztuki.',
  },
  {
    id: '6',
    slug: 'patek-philippe-nautilus',
    name: 'Nautilus',
    brand: 'Patek Philippe',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '5711/1A',
    year: 2018,
    condition: 'Stan muzealny',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    description: 'Legenda sportowej elegancji. Dostępny wyłącznie na zapytanie.',
    editorial:
      'Zaprojektowany w 1976 roku przez Geralda Gentę na serwecie barowej w Bazylei. Sportowa elegancja, która zmieniła zasady gry w wysokim zegarmistrzostwie.',
  },
  {
    id: '7',
    slug: 'ap-royal-oak',
    name: 'Royal Oak 15500ST',
    brand: 'Audemars Piguet',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '15500ST',
    year: 2021,
    condition: 'Bardzo dobry',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    description: 'Ikona sportowego luksusu. Tarcza Grande Tapisserie.',
  },
  {
    id: '8',
    slug: 'rolex-submariner-date',
    name: 'Submariner Date',
    brand: 'Rolex',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '126610LN',
    year: 2022,
    condition: 'Jak nowy',
    priceOnRequest: true,
    status: 'Dostępny',
    description: 'Archetyp zegarka nurkowego. Koperta 41 mm.',
  },
  {
    id: '9',
    slug: 'omega-seamaster-300',
    name: 'Seamaster 300',
    brand: 'Omega',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '234.30.41.21.01.001',
    year: 2023,
    condition: 'Jak nowy',
    price: 29500,
    status: 'Dostępny',
    description: 'Powrót do korzeni. Tarcza z sand-blasted wykończeniem.',
  },
  {
    id: '10',
    slug: 'rolex-gmt-master-ii',
    name: 'GMT-Master II "Pepsi"',
    brand: 'Rolex',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '126710BLRO',
    year: 2021,
    condition: 'Stan kolekcjonerski',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Zarezerwowany',
    description: 'Ikona podróżników. Bezel ceramiczny czerwono-niebieski.',
  },
  {
    id: '11',
    slug: 'rolex-daytona-116500',
    name: 'Cosmograph Daytona',
    brand: 'Rolex',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '116500LN',
    year: 2020,
    condition: 'Stan muzealny',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Sprzedany',
    description: 'Legenda chronografów wyścigowych. Bezel ceramiczny.',
  },
  {
    id: '12',
    slug: 'vacheron-overseas',
    name: 'Overseas',
    brand: 'Vacheron Constantin',
    category: 'zegarki',
    type: 'Sportowy',
    reference: '4500V/110A',
    year: 2022,
    condition: 'Jak nowy',
    priceOnRequest: true,
    status: 'Dostępny',
    description: 'Sportowa elegancja z najwyższej półki. Trzy bransolety w komplecie.',
  },
  {
    id: '13',
    slug: 'cartier-trinity-ring',
    name: 'Trinity Ring',
    brand: 'Cartier',
    category: 'bizuteria',
    reference: 'B4086100',
    year: 2024,
    condition: 'Nowy',
    priceOnRequest: true,
    status: 'Dostępny',
    description: 'Trzy splecione obrączki — żółte, białe i różowe złoto. Ikona Cartiera od 1924 roku.',
  },
  {
    id: '14',
    slug: 'bulgari-serpenti-bracelet',
    name: 'Serpenti Viper Bracelet',
    brand: 'Bulgari',
    category: 'bizuteria',
    reference: 'BR858419',
    year: 2023,
    condition: 'Stan idealny',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    description: 'Bransoletka z różowego złota z motywem węża. Symbol Bulgari.',
  },
]

export const featuredProduct = mockProducts.find((p) => p.featured) ?? mockProducts[0]
export const otherFeaturedProducts = mockProducts.filter((p) => !p.featured && p.category === 'zegarki').slice(0, 6)
export const featuredProducts = mockProducts.slice(0, 4)
