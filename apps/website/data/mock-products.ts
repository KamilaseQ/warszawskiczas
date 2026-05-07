export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: 'zegarki' | 'bizuteria' | 'akcesoria'
  /** Materiał koperty / bransolety / paska. */
  material?: string
  reference?: string
  /** Rok egzemplarza. Wartość typu string z prefiksem "#" oznacza placeholder
   *  do potwierdzenia (np. "#2023"). */
  year?: number | string
  condition?: string
  price?: number
  priceOnRequest?: boolean
  isNew?: boolean
  isExclusive?: boolean
  featured?: boolean
  status?: 'Dostępny' | 'Zarezerwowany' | 'Sprzedany'
  /** Lista ścieżek zdjęć produktowych w `/public`. Pierwsze = obraz główny. */
  images?: string[]
  description: string
  editorial?: string
  story?: string
}

const img = (slug: string, files: string[]) => files.map((f) => `/products/${slug}/${f}`)

export const mockProducts: Product[] = [
  {
    id: '1',
    slug: 'breitling-niebieski',
    name: 'Superocean Heritage B20 Automatic 42',
    brand: 'Breitling',
    category: 'zegarki',
    material: 'Stal nierdzewna, niebieski ceramiczny bezel, bransoleta stalowa typu mesh',
    reference: 'AB2010161C1A1',
    year: '#2023',
    condition: 'Bardzo dobry, drobne ślady użytkowania na bezelu i kopercie',
    priceOnRequest: true,
    featured: true,
    status: 'Dostępny',
    images: img('breitling-niebieski', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Breitling Superocean Heritage B20 Automatic 42 z niebieską tarczą — klasyczny styl nurkowy lat 50. w nowoczesnym, manufakturowym wydaniu.',
    editorial:
      'Superocean Heritage B20 Automatic 42 łączy estetykę pierwszych nurkowych Breitlingów z 1957 roku z certyfikowanym kalibrem chronometru i 70-godzinną rezerwą chodu. Niebieska ceramika i stalowa siatka tworzą zegarek, który wygląda naturalnie zarówno przy wodzie, jak i pod mankietem marynarki.',
    story:
      'Superocean Heritage czerpie z pierwszych nurkowych Breitlingów z 1957 roku, ale w wersji B20 Automatic 42 korzysta z nowoczesnego, certyfikowanego chronometru z około 70-godzinną rezerwą chodu. Trójkątne wskazówki, szeroki bezel i bransoleta mesh budują rozpoznawalny most między zegarkiem narzędziowym a eleganckim zegarkiem codziennym.',
  },
  {
    id: '2',
    slug: 'breitling-rozowe-zloto',
    name: 'Chronomat Evolution Chronograph',
    brand: 'Breitling',
    category: 'zegarki',
    material: 'Złoto / stal-złoto, tarcza mother-of-pearl, pasek skórzany',
    reference: '#B13356',
    year: '#2006',
    condition: 'Dobry / bardzo dobry, normalne ślady użytkowania',
    priceOnRequest: true,
    status: 'Dostępny',
    images: img('breitling-rozowe-zloto', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Breitling Chronomat Evolution w złotej tonacji i z tarczą mother-of-pearl — masywny chronograf lotniczy w jubilerskim wydaniu.',
    editorial:
      'To Chronomat z epoki, w której techniczny chronograf Breitlinga nabrał ostentacyjnie luksusowego charakteru. Wersja z masą perłową i złotem przenosi sportowe DNA kolekcji w stronę zegarka statusowego, zachowując mocną kopertę i obrotowy bezel.',
    story:
      'Chronomat Evolution był rozwinięciem flagowej linii Breitlinga stworzonej z myślą o profesjonalnych chronografach. Wersje z kalibrem Breitling 13 łączyły automatyczny chronograf, datę, obrotowy bezel i mocną kopertę, a warianty z masą perłową i złotem przenosiły sportowe DNA kolekcji w stronę zegarka statusowego.',
  },
  {
    id: '3',
    slug: 'bvlgari',
    name: 'Bvlgari Bvlgari Automatic 41',
    brand: 'Bvlgari',
    category: 'zegarki',
    material: 'Stal nierdzewna i 18-karatowe różowe złoto, bransoleta dwukolorowa',
    reference: 'BB41SPG',
    year: '#2018',
    condition: 'Bardzo dobry, z folią ochronną widoczną na deklu',
    priceOnRequest: true,
    isNew: true,
    status: 'Dostępny',
    images: img('bvlgari', ['front.jpg', 'left.jpg', 'right.jpg', 'back.jpg']),
    description:
      'Bvlgari Bvlgari BB41SPG to stalowo-złoty automat 41 mm z charakterystycznym podwójnym logo na bezelu.',
    editorial:
      'Podpis na bezelu jest tu elementem projektu, nie dodatkiem — Bvlgari zrobiło z nazwy marki ornament. Koperta 41 mm, automatyczny mechanizm BVL 191 widoczny przez przeszklony dekiel i dwukolorowa bransoleta utrzymują linię między biżuterią a zegarkiem codziennym.',
    story:
      'Linia Bvlgari Bvlgari wywodzi się z estetyki rzymskich monet, gdzie inskrypcja biegnie po obwodzie. W referencji BB41SPG ten motyw łączy się z nowoczesną kopertą 41 mm, automatycznym mechanizmem BVL 191 widocznym przez przeszklony dekiel oraz dwukolorową bransoletą.',
  },
  {
    id: '4',
    slug: 'bvlgari-diamenty',
    name: 'Bvlgari Bvlgari Diamond Dial',
    brand: 'Bvlgari',
    category: 'zegarki',
    material: 'Stal nierdzewna, masa perłowa, indeksy diamentowe, pasek skórzany',
    reference: '#BB33SLD',
    year: '#2010',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    images: img('bvlgari-diamenty', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Bvlgari Bvlgari z perłową tarczą i diamentowymi indeksami — subtelna, biżuteryjna interpretacja rzymskiego klasyka marki.',
    editorial:
      'Najbardziej rozpoznawalnym detalem nie jest tu koronka ani indeksy, lecz pełny napis BVLGARI BVLGARI na stalowym pierścieniu. Masa perłowa i diamentowe indeksy wzmacniają jubilerski charakter, ale pozostawiają czytelny, oszczędny układ dwóch wskazówek.',
    story:
      'Zegarki Bvlgari Bvlgari są projektowane jak biżuteria użytkowa: prosta tarcza zostaje oprawiona w mocny, graficzny bezel z nazwą marki. Wariant z masą perłową i diamentowymi indeksami wzmacnia jubilerski charakter, ale pozostawia czytelny, oszczędny układ dwóch wskazówek.',
  },
  {
    id: '5',
    slug: 'cartier',
    name: 'Must 21 Chronoscaph',
    brand: 'Cartier',
    category: 'zegarki',
    material: 'Stal nierdzewna i guma, bransoleta stalowo-gumowa',
    reference: '2424',
    year: '#2005',
    condition: 'Dobry / bardzo dobry, widoczne ślady użytkowania na bezelu',
    priceOnRequest: true,
    status: 'Dostępny',
    images: img('cartier', ['front.jpg', 'left.jpg', 'right.jpg', 'back.jpg']),
    description:
      'Cartier Must 21 Chronoscaph ref. 2424 łączy rzymski bezel, stal i gumę z praktycznym kwarcowym chronografem.',
    editorial:
      'Chronoscaph pokazuje mniej formalną stronę Cartiera — nadal z rzymskimi cyframi, ale w rytmie sportowego chronografu. Bezel z cyframi i kaboszonowa koronka pozostają czytelnie cartierowskie, a chronograf, data i mieszana bransoleta dodają codziennego, dynamicznego charakteru.',
    story:
      'Must 21 Chronoscaph należy do okresu, w którym Cartier łączył własny język projektowy z bardziej sportową konstrukcją. Bezel z rzymskimi cyframi i kaboszonowa koronka pozostają czytelnie cartierowskie, a chronograf, data i mieszana bransoleta stalowo-gumowa nadają mu codzienny, dynamiczny charakter.',
  },
  {
    id: '6',
    slug: 'chopard-full-diamenty',
    name: 'Happy Sport Chronograph Diamond',
    brand: 'Chopard',
    category: 'zegarki',
    material: 'Stal, diamenty (oprawa i ruchome), czarny pasek skórzany',
    reference: '288499',
    year: '#2014',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    images: img('chopard-full-diamenty', ['front.jpg', 'left.jpg', 'right.jpg', 'little-right.jpg']),
    description:
      'Chopard Happy Sport Chronograph 288499 — sportowy chronograf z ruchomymi diamentami i mocną oprawą kamieni.',
    editorial:
      'Ruchome diamenty Happy Sport sprawiają, że tarcza nigdy nie wygląda dokładnie tak samo dwa razy. W wersji chronograf 42 mm model nabiera bardziej sportowego charakteru, a rozbudowana oprawa kamieni przenosi go w obszar wysokiej biżuterii.',
    story:
      'Happy Sport to jedna z najbardziej rozpoznawalnych koncepcji Chopard: diamenty poruszają się swobodnie pomiędzy szafirowymi taflami nad tarczą. W wersji chronograf 42 mm model nabiera bardziej sportowego charakteru, a rozbudowana oprawa diamentowa przenosi go w obszar wysokiej biżuterii.',
  },
  {
    id: '7',
    slug: 'chopard-tourbillon',
    name: 'L.U.C Tourbillon 8 Jours',
    brand: 'Chopard',
    category: 'zegarki',
    material: 'Biały metal szlachetny lub stal, pasek aligatorowy',
    reference: '#16/8502',
    year: '#2005',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    priceOnRequest: true,
    isExclusive: true,
    status: 'Dostępny',
    images: img('chopard-tourbillon', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Chopard L.U.C Tourbillon 8 Jours — zegarek wysokiej komplikacji z 8-dniową rezerwą chodu i widocznym tourbillonem na godzinie 6.',
    editorial:
      'Osiem dni rezerwy chodu i tourbillon w jednym zegarku pokazują ambicję Chopard Manufacture z początków linii L.U.C. Wielobębnowa architektura Quattro daje rzadko spotykaną autonomię, a otwarcie tarczy przy godzinie 6 eksponuje jedną z najbardziej prestiżowych komplikacji mechanicznych.',
    story:
      'Kolekcja L.U.C powstała jako manufakturowa odpowiedź Chopard na wielką tradycję zegarmistrzowską. Tourbillony L.U.C wykorzystywały wielobębnową architekturę Quattro, dającą bardzo długą rezerwę chodu, a otwarcie tarczy przy godzinie 6 eksponowało jedną z najbardziej prestiżowych komplikacji mechanicznych.',
  },
  {
    id: '8',
    slug: 'chopard-zielony',
    name: 'Imperiale Chronograph Jewellery',
    brand: 'Chopard',
    category: 'zegarki',
    material: 'Biały metal / stal, diamenty, masa perłowa, zielony pasek skórzany',
    reference: '#IMP-CHRONO',
    year: '#2008',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    priceOnRequest: true,
    status: 'Dostępny',
    images: img('chopard-zielony', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Chopard Imperiale Chronograph z zielonym paskiem i diamentową oprawą — cesarskie inspiracje kolekcji w wydaniu funkcjonalnego stopera.',
    editorial:
      'Imperiale korzysta z detali kojarzonych z insygniami władzy — od kolumnowych uszu po kaboszony na koronce i przyciskach. W chronografie z oprawą diamentową i perłową tarczą sportowa funkcja staje się częścią biżuteryjnej kompozycji.',
    story:
      'Imperiale jest najbardziej ceremonialną z codziennych linii Chopard: geometryczne uszy, kaboszony i rzymskie akcenty odnoszą się do estetyki dawnych insygniów. W chronografie z oprawą diamentową i perłową tarczą sportowa funkcja staje się częścią biżuteryjnej kompozycji.',
  },
  {
    id: '9',
    slug: 'chronoswiss',
    name: 'Régulateur',
    brand: 'Chronoswiss',
    category: 'zegarki',
    material: 'Stal nierdzewna, bransoleta stalowa',
    reference: 'CH 1223',
    year: '#2000',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    priceOnRequest: true,
    status: 'Dostępny',
    images: img('chronoswiss', ['front.jpg', 'left.jpg', 'right.jpg', 'back.jpg']),
    description:
      'Chronoswiss Régulateur CH 1223 z czarną tarczą prezentuje czas w historycznym układzie regulatora — z osobną godziną, minutą i sekundą.',
    editorial:
      'W regulatorze najważniejsza jest minuta — dlatego centralna wskazówka prowadzi odczyt, a godziny i sekundy mają własne subtarcze. Karbowana luneta i cebulkowa koronka podkreślają zegarmistrzowski rodowód formy.',
    story:
      'Chronoswiss zbudował swoją rozpoznawalność na przeniesieniu koncepcji zegara regulatorowego na zegarek naręczny. Model CH 1223 zachowuje karbowaną lunetę, cebulkową koronkę i porządek tarczy, który celowo rozdziela wskazania, aby podkreślić zegarmistrzowski rodowód formy.',
  },
  {
    id: '10',
    slug: 'frederique-constant',
    name: 'Manufacture Slimline Moonphase',
    brand: 'Frederique Constant',
    category: 'zegarki',
    material: 'Stal nierdzewna, niebieski pasek skórzany',
    reference: 'FC-705N4S6',
    year: '#2018',
    condition: 'Bardzo dobry, ocena wstępna ze zdjęć',
    price: 12500,
    status: 'Dostępny',
    images: img('frederique-constant', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Frederique Constant FC-705N4S6 z niebieską tarczą, datownikiem wskazówkowym i fazami księżyca w smukłej kopercie manufacture.',
    editorial:
      'To zegarek, który wygląda klasycznie, ale sercem jest manufakturowy kaliber FC-705 z komplikacją faz księżyca. Granatowa tarcza i zintegrowane wskazanie daty z fazą księżyca na godzinie 6 budują spokojną, garniturową kompozycję.',
    story:
      'Slimline Moonphase Manufacture jest przykładem strategii Frederique Constant: oferować klasyczne komplikacje w przystępniejszym, ale nadal eleganckim wydaniu. Referencja FC-705N4S6 wyróżnia się granatową tarczą oraz zintegrowanym wskazaniem daty i fazy księżyca na godzinie 6.',
  },
  {
    id: '11',
    slug: 'omega-biala-tarcza',
    name: 'Constellation Manhattan Quartz Date',
    brand: 'Omega',
    category: 'zegarki',
    material: 'Stal nierdzewna, zintegrowana bransoleta stalowa',
    reference: '#396.1070',
    year: '#1995',
    condition: 'Dobry, widoczne ślady użytkowania na kopercie i bezelu',
    price: 6800,
    status: 'Dostępny',
    images: img('omega-biala-tarcza', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Omega Constellation Manhattan z jasną tarczą i zintegrowaną bransoletą — elegancki kwarcowy klasyk z charakterystycznymi pazurami koperty.',
    editorial:
      'Cztery pazury Constellation Manhattan zaczęły jako element konstrukcyjny, a stały się jednym z najbardziej rozpoznawalnych znaków Omegi. Jasna tarcza, rzymski bezel i zintegrowana bransoleta tworzą dyskretny, codzienny wariant tej stylistyki.',
    story:
      'Constellation Manhattan zadebiutował w 1982 roku i zmienił elegancką linię Omegi w zegarek o mocnej, architektonicznej kopercie. Jasna tarcza, rzymski bezel i zintegrowana bransoleta tworzą dyskretny, codzienny wariant tej stylistyki.',
  },
  {
    id: '12',
    slug: 'omega-czarna-tarcza',
    name: 'Constellation Manhattan Day-Date Quartz',
    brand: 'Omega',
    category: 'zegarki',
    material: 'Stal nierdzewna, możliwy bezel z elementem złota',
    reference: '#396.1080',
    year: '#1988',
    condition: 'Dobry, widoczne ślady użytkowania na bezelu i kopercie',
    price: 5400,
    status: 'Dostępny',
    images: img('omega-czarna-tarcza', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Omega Constellation Manhattan Day-Date z czarną tarczą — dwie subtarcze kalendarza i smukły kwarcowy profil.',
    editorial:
      'W tej konfiguracji Constellation łączy elegancki profil z funkcjonalnym, niemal instrumentowym układem dnia i daty. Smukła kwarcowa koperta i osobne wskazania nadają tarczy techniczny, kolekcjonerski charakter.',
    story:
      'Wersje Day-Date Constellation Manhattan należą do najbardziej charakterystycznych odmian tej linii z lat 80. i 90. Kwarcowy kaliber pozwalał zachować bardzo smukłą kopertę, a osobne wskazania dnia tygodnia i daty nadały tarczy techniczny, kolekcjonerski charakter.',
  },
  {
    id: '13',
    slug: 'piaget',
    name: 'Possession',
    brand: 'Piaget',
    category: 'zegarki',
    material: 'Biały metal / stal, diament, biały pasek skórzany',
    reference: '#G0A45092',
    year: '#2019',
    condition: 'Dobry / bardzo dobry, drobne ślady na bezelu',
    priceOnRequest: true,
    status: 'Dostępny',
    images: img('piaget', ['front.jpg', 'right.jpg']),
    description:
      'Piaget Possession z białym paskiem i obrotowym pierścieniem — minimalistyczna biżuteria zegarkowa z jednym diamentowym akcentem.',
    editorial:
      'W Possession najważniejszy jest ruch pierścienia — mały, dotykowy gest, który odróżnia zegarek od klasycznej biżuterii. Oszczędna tarcza i miękka koperta budują przedmiot bliższy luksusowej bransolecie niż klasycznemu zegarkowi narzędziowemu.',
    story:
      'Possession przenosi motyw obrotowego pierścienia z biżuterii Piageta do zegarka. Oszczędna tarcza, miękka koperta i ruchomy detal z diamentem tworzą przedmiot bliższy luksusowej bransolecie niż klasycznemu zegarkowi narzędziowemu.',
  },
  {
    id: '14',
    slug: 'tag-heuer',
    name: 'Grand Carrera Calibre 36 RS2 Caliper Chronograph Ti2',
    brand: 'TAG Heuer',
    category: 'zegarki',
    material: 'Tytan PVD, pasek skórzany',
    reference: 'CAV5186.FC6304',
    year: '#2012',
    condition: 'Dobry / bardzo dobry, drobne ślady użytkowania',
    price: 18900,
    status: 'Dostępny',
    images: img('tag-heuer', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'TAG Heuer Grand Carrera CAV5186.FC6304 to tytanowy chronograf Calibre 36 z systemem Caliper do odczytu 1/10 sekundy.',
    editorial:
      'Calibre 36 bazuje na idei wysokiej częstotliwości 36 000 wahnięć na godzinę, dzięki czemu chronograf może mierzyć dziesiąte części sekundy. Skala Caliper i system Rotating System inspirowane są deską rozdzielczą samochodu GT.',
    story:
      'Grand Carrera Calibre 36 RS2 był pokazem technicznej strony TAG Heuera: zamiast klasycznych liczników wykorzystano system Rotating System i skalę Caliper, inspirowane deską rozdzielczą samochodu GT. Mechanizm Calibre 36 pracuje z wysoką częstotliwością, podkreślając sportowy rodowód marki.',
  },
  {
    id: '15',
    slug: 'wyler-geneva',
    name: 'Code-R Chronograph',
    brand: 'Wyler Genève',
    category: 'zegarki',
    material: 'Tytan / stal i materiały kompozytowe, gumowy pasek',
    reference: '#100.1',
    year: '#2008',
    condition: 'Dobry / bardzo dobry, ocena wstępna ze zdjęć',
    price: 14500,
    status: 'Dostępny',
    images: img('wyler-geneva', ['front.jpg', 'left.jpg', 'right.jpg']),
    description:
      'Wyler Genève Code-R Chronograph — masywny, techniczny chronograf z amortyzowaną konstrukcją Incaflex i niebieskim paskiem gumowym.',
    editorial:
      'Code-R wygląda jak zegarek zbudowany wokół koperty — śruby, mostki i amortyzacja są tu częścią języka projektu. Automatyczny chronograf bazujący na ETA 2894-2 dopełnia awangardowej, technicznej kompozycji.',
    story:
      'Wyler Genève wskrzesił system Incaflex w nowoczesnej, bardzo dużej kopercie Code-R. Chronografy tej serii często korzystały z automatycznych kalibrów ETA 2894-2, miały datę, 100 m wodoszczelności i konstrukcję zaprojektowaną tak, by eksponować techniczny charakter zegarka.',
  },
]

export const featuredProduct = mockProducts.find((p) => p.featured) ?? mockProducts[0]
export const otherFeaturedProducts = mockProducts
  .filter((p) => !p.featured && p.category === 'zegarki')
  .slice(0, 6)
export const featuredProducts = mockProducts.slice(0, 4)
