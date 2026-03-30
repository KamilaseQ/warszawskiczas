# 📋 Checklista Wdrożeniowa Homepage — Warszawski Czas

> Dokument wygenerowany na podstawie `homepage_checklist.md` z komentarzami właściciela.
> Każdy punkt zawiera dokładny opis zmiany, kontekst decyzji i ewentualne uwagi.
> Podział: **WDRAŻAMY TERAZ** vs **BACKLOG (na później)**.

---

## 🏠 1. HERO SECTION

### ✅ WDRAŻAMY TERAZ

- [ ] **1.1 Scroll indicator — podpięcie jako link**
  - Element "PRZEWIŃ" + ikona ChevronDown musi być klikalny
  - Po kliknięciu: smooth scroll do sekcji `ProductShowcase`
  - Obecnie element nie jest aktywny — wymaga dodania `onClick` z `scrollIntoView({ behavior: 'smooth' })` lub anchor linka
  - Ref: `H1`

- [ ] **1.2 Scroll indicator — zmiana kursora**
  - Na elemencie "PRZEWIŃ" + ChevronDown zmienić `cursor: default` na `cursor: pointer`
  - Użytkownik musi widzieć, że to klikalne
  - Ref: `H2`

- [ ] **1.3 Tekst H1 — zachować bezpośredniość**
  - H1 **musi pozostać bardzo klarowne i bezpośrednie** — użytkownik od razu ma wiedzieć, że to strona z zegarkami
  - Obecne "Luksusowe Zegarki" jest OK jako kierunek, ale można delikatnie urozmaicić — pod warunkiem że przekaz pozostaje natychmiastowy i jednoznaczny
  - **NIE** zmieniać na abstrakcyjne hasła typu "Czas, który definiuje"
  - **Podtytuł** (pod H1) — tu już może być bardziej urozmaicony, poetycki, dobry pod SEO
  - Ref: `H3`

- [ ] **1.4 Podtytuł — usunąć duplikację adresu**
  - Adres "Mokotowska 71" zostaje **wyłącznie w eyebrow** (złoty kapitalik nad H1)
  - Z podtytułu **usunąć ulicę** — zostawić wzmiankę o Warszawie i inne informacje, ale bez "Mokotowska 71"
  - Cel: zero duplikacji informacji między eyebrow a podtytułem
  - Ref: `H4`

- [ ] **1.5 H1 — responsywność na małych ekranach**
  - Na ekranach 375px i węższych H1 łamie się nieelegancko
  - Dodać dodatkowy breakpoint: np. `text-4xl` na najwęższych ekranach, by łamienie tekstu było czytelne
  - Sprawdzić na iPhone SE, iPhone 12 mini
  - Ref: `H5`

- [ ] **1.6 Pozycja pionowa contentu na desktop**
  - Tekst Hero na desktop jest w górnej 1/3 strony zamiast w centrum viewportu
  - **Wycentrować** blok tekstowy pionowo w viewporcie
  - Ref: `H7` — właściciel: "OK Wdrażamy"

- [ ] **1.7 Hierarchia przycisków CTA**
  - Obecnie oba przyciski wyglądają podobnie
  - Zmienić na: jeden przycisk **PRIMARY** (biały filled) + drugi **TERTIARY** (tylko tekst + strzałka)
  - Buduje jasną hierarchię: główne CTA vs. drugie wezwanie
  - Ref: `H8` — właściciel: "OK Wdrażamy"

- [ ] **1.8 Parallax na tytule przy scrollu**
  - Dodać lekki efekt parallax — tytuł (H1 + podtytuł) przesuwa się wolniej niż tło/video
  - Delikatny, elegancki ruch — nie agresywny
  - Implementacja: nasłuchiwanie `scroll` event + `transform: translateY()` z mniejszym współczynnikiem na tekście
  - Ref: `H9` — właściciel: "OK Wdrażamy"

### 📌 BACKLOG

- [ ] **1.9 Video w Hero — zbyt niebieski/chłodny ton**
  - Właściciel: "To może być kwestia nagrania. Na razie nie ruszamy"
  - **ZAPAMIĘTAJ:** W przyszłości sprawdzić `mix-blend-mode` lub `hue-rotate` na warstwie video, albo wymienić nagranie
  - Ref: `H6`

---

## 📺 2. PRODUCT SHOWCASE (Karuzela Kolekcji)

### ✅ WDRAŻAMY TERAZ

- [ ] **2.1 Usunięcie labeli "EKSKLUZYWNY" z kart**
  - Labele z animacją `animate-pulse` wyglądają nieprofesjonalnie dla luxury brand
  - **Usunąć je całkowicie** z obecnych kart
  - **ZAPAMIĘTAJ:** Labele jako koncept mogą wrócić w przyszłości w eleganckiej, statycznej formie (np. ozdobny znaczek, bez pulsowania)
  - Ref: `PS2`

- [ ] **2.2 Strzałki nawigacji karuzeli — lepszy hover**
  - Obecne przyciski strzałek są kwadratowe i mało wyraźne
  - Dodać wyraźniejszy hover state: np. tło złote (`accent-gold`) przy najechaniu
  - Hover powinien być gładki z transition
  - Ref: `PS3`

- [ ] **2.3 Progress dots — widoczny progres**
  - Progress dots NIE służą do klikania — to forma wizualnej animacji pokazującej ruch karuzeli
  - Zostawić je jako wskaźnik progresu, ale upewnić się, że progres jest **wyraźnie widoczny** (np. zmiana koloru aktywnego elementu)
  - Nie trzeba zwiększać hit area (bo nie są klikalne)
  - Ref: `PS4`

- [ ] **2.4 Link "ZAPYTAJ" — zwiększyć widoczność**
  - Tekst prawie niewidoczny bo ma `text-muted-foreground/60`
  - Zwiększyć opacity/kontrast, by był czytelnym CTA
  - Ref: `PS5`

- [ ] **2.5 Animacja "oddychania" aktywnej karty**
  - Karta centralna delikatnie pulsuje skalą: `scale(1.0)` → `scale(1.02)` i z powrotem
  - **WAŻNE:** Napis marki pod/nad kartą MUSI się skalować razem z kartą, żeby karta nie nachodziła na napis i go nie zasłaniała
  - Synchronizacja animacji tekstu z kartą
  - Ref: `PS7` — właściciel: "Wdrażamy"

### 📌 BACKLOG

- [ ] **2.6 Placeholder kart — zamiana na prawdziwe zdjęcia**
  - Obecne SVG placeholdery to tymczasowe rozwiązanie
  - Właściciel dostarczy własne zdjęcia zegarków
  - **ZAPAMIĘTAJ:** Gdy zdjęcia będą gotowe — zamienić SVG na realne fotografie
  - Ref: `PS1`, `PS6`

- [ ] **2.7 Numeracja edytorska sekcji (I, II, III...)**
  - Fajna opcja, ale **nie robimy tego teraz**
  - **ZAPAMIĘTAJ** na przyszłość jako element spójności narracyjnej
  - Ref: `PS8`

- [ ] **2.8 Dodatkowe info na hover — NIE WDRAŻAMY**
  - Właściciel: "Nie. Dodatkowe informacje mają być jak ktoś wejdzie w ten zegarek (przejdzie do oferty)"
  - Karty na homepage pokazują tylko podstawowe info — szczegóły na podstronie produktu
  - Ref: `PS9`

---

## 🏛️ 3. BRAND POSITIONING (Butik z charakterem)

### ✅ WDRAŻAMY TERAZ

- [ ] **3.1 Ikony w kółkach — zamiana z green na gold/numery**
  - Obecne zielone kółeczka wyglądają jak SaaS/tech startup
  - Zamienić na: **duże numery ozdobne** (01, 02, 03) w kolorze gold, lub złote ikony bez kółek
  - Ref: `BP1`

- [ ] **3.2 Heading "Butik z charakterem" — ładna kompozycja**
  - Obecny wycentrowany H2 wygląda jak template
  - Właściciel: "Zrób tak aby było ładnie i komponowało się z resztą strony"
  - Ocenić czy left-aligned z editorial label lepiej pasuje do reszty, czy centered — decyzja na podstawie kontekstu otaczających sekcji
  - Ref: `BP2`

- [ ] **3.3 Tekst "więcej niż sklep z zegarkami" — lepsza kopia**
  - Obecny tekst jest zbyt generyczny
  - Napisać coś bardziej charakterystycznego, z osobowością marki
  - Ref: `BP3`

- [ ] **3.4 Grid 3 kolumn — wizualne separatory i spójność**
  - Na mobile brak rytmu wizualnego
  - Dodać duże numery (01, 02, 03) z linią gold **LUB** zaprojektować inny układ spójny z całością strony
  - Nie może być zimna, nudna lista — musi mieć charakter
  - Ref: `BP4`

- [ ] **3.5 Wariant split layout**
  - Zmienić układ na: **lewa strona** = editorial quote / tekst marki, **prawa strona** = 3 wartości/karty
  - Premium asymetria zamiast symetrycznego gridu
  - **Wdrażamy od razu** mimo że był w sekcji "Docelowe"
  - Ref: `BP5`

- [ ] **3.6 Separator na dole sekcji — cienka złota linia**
  - Obecny `<Separator />` zastąpić cienką, elegancką złotą linią (`accent-gold`)
  - **Wdrażamy od razu**
  - Ref: `BP6`

---

## 🔒 4. UKRYTA KOLEKCJA (Teaser „Dostępne na zapytanie")

> **UWAGA GLOBALNA:** Nazwa sekcji/linku w nawigacji zmienia się z "Kolekcja na zapytanie" na **"Ukryta Kolekcja"** (patrz punkt 9.2 — Nawigacja). Nazwa musi być spójna wszędzie.

### ✅ WDRAŻAMY TERAZ

- [ ] **4.1 Badge "Kolekcja ekskluzywna" — usunąć obramowanie**
  - Obecny badge wygląda jak outlined button
  - Zamienić na: **sam tekst uppercase w kolorze złotym**, bez jakiegokolwiek border/outline
  - Subtelny, elegancki
  - Ref: `HC1`

- [ ] **4.2 Tekst "(Zabezpieczone)" — zmiana copy**
  - Słowo "Zabezpieczone" brzmi technicznie
  - Zamienić na: `Tylko dla naszych klientów` lub `Na indywidualne zapytanie`
  - Ref: `HC2`

- [ ] **4.3 Overlay tła — ziemna zieleń**
  - Obecne czarne `rgba(10,10,10,0.8)` jest zbyt dosłowne i ciężkie
  - Zmienić na **ciemną ziemną zieleń** — cieplejsza, bardziej naturalna, pasuje do brandu
  - Ref: `HC3`

- [ ] **4.4 Całkowita zmiana układu sekcji — usunięcie karuzeli i blurów**
  - **Ta sekcja to jest TEASER** — jej jedynym celem jest zachęcenie do wejścia na dedykowaną podstronę "Ukryta Kolekcja"
  - **USUNĄĆ:** placeholder karuzelę w tle, blurred SVG zegarków, wszystkie nadmiarowe elementy
  - **Blur będzie dopiero na podstronie** Ukrytej Kolekcji, NIE tutaj na homepage
  - **ZAMIAST TEGO:** Jedno eleganckie zdjęcie z podpisem w stylu magazynowym, albo inny czysty, minimalistyczny układ, który dobrze komponuje się z resztą strony
  - Sekcja ma wyglądać jak editorial teaser, nie jak kopia pełnej podstrony
  - Ref: `HC4`

- [ ] **4.5 Split layout — obraz po prawej na desktop**
  - Na desktop: obraz/foto po prawej stronie, treść + CTA po lewej
  - Dzięki temu CTA button jest naturalniej dostępny (bliżej lewej krawędzi, gdzie zaczyna się czytanie)
  - Na mobile: treść nad obrazem
  - **Wdrażamy od razu**
  - Ref: `HC5`

- [ ] **4.6 Animacja kłódki — przemyśleć w kontekście nowego designu**
  - Skoro sekcja zmienia układ (punkt 4.4), trzeba zdecydować **gdzie i czy** kłódka ma w ogóle sens w nowym designie
  - Jeśli tak — animacja zatrzaskiwania przy scroll-into-view
  - Jeśli nie pasuje do nowego magazynowego layoutu — pominąć
  - Ref: `HC6`

- [ ] **4.7 CTA button — wariant premium gold**
  - Przycisk CTA w tej sekcji zmienić na styl `.btn-premium-gold`
  - Mocniejszy kontrast, lepiej widoczny na tle sekcji
  - **Wdrażamy od razu**
  - Ref: `HC7`

---

## 🔧 5. SERVICES OVERVIEW (Usługi eksperckie)

### ✅ WDRAŻAMY TERAZ

- [ ] **5.1 Ikony usług — zamiana accent-green na gold/numery**
  - Ten sam problem co w Brand Positioning (punkt 3.1)
  - Zielone kwadraty z ikonami wyglądają jak SaaS
  - Zamienić na: złote ikony lub numerację ozdobną (01, 02, 03, 04)
  - Ref: `SO1`

- [ ] **5.2 Heading "Usługi eksperckie" — spójny system nagłówków**
  - Dodać editorial label (spójny z resztą sekcji)
  - Wyrównanie H2 — dopasować do kompozycji strony
  - Ref: `SO2`

- [ ] **5.3 Hover na kartach usług — zmiana z green na gold**
  - Obecny `hover:border-accent-green/30` zmienić na złoty: `hover:border-accent-gold/30`
  - Spójność kolorystyczna z resztą
  - Ref: `SO3`

- [ ] **5.4 Link "Dowiedz się więcej →" — zmiana koloru**
  - Obecny zielony kolor linku zmienić na `accent-gold` lub zwykły foreground
  - Ref: `SO4`

- [ ] **5.5 Wizualny oddech przed następną sekcją**
  - Dodać separator lub dodatkowy padding/margin przed sekcją Boutique Preview
  - Brak wizualnego oddechu sprawia, że sekcje zlewają się
  - Ref: `SO5`

- [ ] **5.6 Alternatywny layout poziomy — editorial**
  - Przerobić grid kart na bardziej editorial: listy horyzontalne z numerami, ewentualnie accordion
  - Ref: `SO6`

- [ ] **5.7 Dodanie kategorii "Biżuteria"**
  - Butik głównie sprzedaje biżuterię — musi to być **smooth zawarte w usługach**, nie oddzielna obca karta
  - Zintegrować naturalnie (np. jako jedna z usług/kategorii)
  - **WAŻNE:** Biżuteria musi też pojawić się w **nawigacji (Navbar)** — patrz punkt 9.x
  - Ref: `SO7`

---

## 🏙️ 6. BOUTIQUE PREVIEW + MOKOTOWSKA 71 (Połączona sekcja)

> **DECYZJA WŁAŚCICIELA:** Sekcja "Odwiedź nasz butik" (Boutique Preview) i sekcja "Mokotowska 71" mają być **POŁĄCZONE w jedną wspólną sekcję**. Nie dwie oddzielne — jedna spójna sekcja o butiku.

### ✅ WDRAŻAMY TERAZ

- [ ] **6.1 Połączenie sekcji Boutique Preview i Mokotowska 71**
  - Obecnie to dwie oddzielne sekcje na stronie
  - **Scalić** w jedną spójną sekcję: "Odwiedź nasz butik" + informacje o lokalizacji, godzinach, kontakcie
  - Jeden wspólny blok z eleganckim layoutem
  - Ref: Komentarz do całej sekcji Boutique Preview

- [ ] **6.2 Dekoracyjna ramka — zmiana z green na gold**
  - Obecna zielona ramka `border-accent-green/20` jest ledwo widoczna
  - Zmienić na: `border-accent-gold/30`
  - Ref: `BV2`

- [ ] **6.3 Wymiana numeru telefonu**
  - Zamienić placeholder `+48 123 456 789` na prawdziwy numer: **+48 604 501 000**
  - Dotyczy wszystkich wystąpień na stronie (Boutique, Footer, itp.)
  - Ref: `BV3`

- [ ] **6.4 Button "Więcej o butiku" — unifikacja stylu**
  - Przycisk musi respektować globalne style: `.btn-sharp` / `.btn-premium-white`
  - Zunifikować z resztą przycisków na stronie
  - Ref: `BV4`

- [ ] **6.5 Godziny otwarcia — na oddzielne linie**
  - Obecny format z pipe separatorami (`|`) jest nieelegancki
  - **NIE** zamieniać na separator `·` — zamiast tego dać **każdy dzień/zakres na osobnej linii**
  - Np.:
    ```
    Pon – Pt: 10:00 – 18:00
    Sob: 10:00 – 15:00
    Nd: Zamknięte
    ```
  - Ref: `BV5`

- [ ] **6.6 Google Maps embed — dark/sepia theme**
  - Dodać embed mapy Google ze stylizowanym ciemnym/sepia motywem
  - Mapa musi pasować wizualnie do premium designu (nie standardowa jasna mapa Google)
  - Ref: `BV6` — właściciel: "Tak zrobimy"

### 📌 BACKLOG

- [ ] **6.7 Zdjęcie butiku — placeholder do wymiany**
  - Obecny szary prostokąt to największe puste miejsce na stronie
  - Właściciel dostarczy zdjęcie — **ZAPAMIĘTAJ** do zamiany
  - Ref: `BV1`

- [ ] **6.8 Wideo z butiku — 10s autoplay loop**
  - Krótkie nagranie butiku, autoplay, bez dźwięku, w pętli
  - Właściciel: "W przyszłości tak zrobimy"
  - Ref: `BV7`

---

## 📊 7. TRUST SIGNALS + PROCES ZAKUPU (Połączona sekcja)

> **DECYZJA WŁAŚCICIELA:** Ta sekcja ma być rozszerzona o **proces zakupu/obsługi** (albo jakieś wartości marki). Ma łączyć trust + proces w jedno i dawać wrażenie: "ludzie ufają naszemu procesowi". Dobrze sprzedażowo, rozwiewać obiekcje. **Jedna sekcja, nie rozbijać na dwie.**

### ✅ WDRAŻAMY TERAZ

- [ ] **7.1 Dane liczbowe — weryfikacja**
  - `15+ lat`, `500+ klientów`, `100% weryfikacja` — to prawdopodobnie placeholdery
  - Wymagają weryfikacji z właścicielem — na razie zostawić, ale oznaczyć do potwierdzenia
  - Ref: `TS1` — właściciel nie skomentował

- [ ] **7.2 Cytaty dekoracyjne w trust-cards**
  - Ozdobne cudzysłowy mają opacity 0.10 — ledwo widoczne
  - Albo zwiększyć widoczność, albo usunąć
  - Ref: `TS2` — właściciel nie skomentował

- [ ] **7.3 Układ trust cards na desktop**
  - 4 kolumny tworzą za dużo pustej przestrzeni
  - Zaprojektować układ, który lepiej oddycha i nie wygląda na rozrzucony
  - Ref: `TS3` — właściciel nie skomentował

- [ ] **7.4 Dodanie elementu procesu zakupu/obsługi**
  - Nowy element w tej sekcji: opis procesu zakupu/obsługi klienta
  - Cel: budować zaufanie przez transparentność procesu
  - Łączyć z trust signals — nie jako oddzielny blok, ale zintegrowany w jedną narrację
  - Ref: Komentarz do całej sekcji Trust Signals

- [ ] **7.5 Liczby — większy kontrast typograficzny**
  - Obecne liczby za małe
  - Zwiększyć do `text-4xl lg:text-5xl`
  - Ref: `TS5` — właściciel nie skomentował

### 📌 BACKLOG

- [ ] **7.6 Opinie klientów (testimonials)**
  - 2-3 prawdziwe cytaty od klientów — kluczowy element lejka sprzedażowego
  - Wymaga dostarczenia treści przez właściciela
  - Ref: `TS4` — właściciel nie skomentował

---

## ✉️ 8. FINAL CTA (Zamykające wezwanie do akcji)

### ✅ WDRAŻAMY TERAZ

- [ ] **8.1 Heading — zwiększyć rozmiar**
  - Obecny `size="md"` jest za mały dla sekcji CTA
  - Zmienić na `size="lg"` lub custom większy rozmiar
  - Sekcja CTA musi dominować wizualnie
  - Ref: `FC1`

- [ ] **8.2 Przyciski — hierarchia i unifikacja stylu**
  - Oba przyciski nie używają `.btn-sharp` / `.btn-premium-white`
  - Zunifikować ze stylem globalnym
  - Budować hierarchię: PRIMARY vs. SECONDARY
  - Ref: `FC2`

- [ ] **8.3 Tło sekcji — dark/ciemne z białym tekstem i złotem**
  - Obecny `variant="muted"` nie buduje nacisku
  - Zmienić na ciemne/czarne tło z białym tekstem i akcentami gold
  - To sekcja zamykająca sprzedaż — musi mieć moc
  - Ref: `FC4`

- [ ] **8.4 Element pilności/ekskluzywności — ale ELEGANCKI**
  - Właściciel: propozycje typu "Twój zegarek czeka" są **za chamskie** dla tej sekcji
  - Potrzeba subtelnego elementu pilności, który nie jest nachalny ani tanio sprzedażowy
  - Takie bardziej agresywne copy ("Twój zegarek czeka", "Kolekcja zmienia się") mogłoby pasować do sekcji **Ukrytej Kolekcji**, nie tutaj
  - Znaleźć elegancki balans między pilnością a klasą
  - Ref: `FC5`

- [ ] **8.5 Tekstura tła — grain/linen overlay**
  - Na ciemnym tle dodać subtelną teksturę (grain, linen) dla premium feelu
  - Nie agresywna — delikatna, ledwo widoczna
  - Ref: `FC6`

### 📌 BACKLOG

- [ ] **8.6 Editorial label / numery rzymskie**
  - Właściciel: "Nie wiem czy to wdrożymy. Na razie bez."
  - **ZAPAMIĘTAJ** na przyszłość — może być dodane jako element spójności narracyjnej
  - Ref: `FC3`

---

## 🧭 9. HEADER & NAWIGACJA

### ✅ WDRAŻAMY TERAZ

- [ ] **9.1 Nazwa linku nawigacyjnego — "Ukryta Kolekcja"**
  - Obecne "Kolekcja na zapytanie" jest za długie
  - Właściciel rozważa: "Ukryta Kolekcja" lub "Prywatna Kolekcja"
  - "Prywatna" brzmi elegancko, ale może mylic (ludzie mogą myśleć o prywatnej kolekcji właściciela)
  - **DECYZJA:** Wybrać **"Ukryta Kolekcja"** — mniej myląca, bardziej intrygująca
  - **Zastosować WSZĘDZIE** na stronie dla spójności (nav, sekcja teasera, linki, breadcrumbs)
  - Ref: `HN2`

- [ ] **9.2 Active state nawigacji — zmiana z green na gold**
  - Obecne zielone podkreślenie active linku wygląda przypadkowo
  - Zmienić na złote (`accent-gold`) — spójne z brand systemem
  - Ref: `HN3`

- [ ] **9.3 Wysokość headera — zwiększenie**
  - Obecne `h-16` (64px) jest za ciasne
  - Zmienić na 72–80px — standardowa wysokość premium butików
  - Ref: `HN4`

- [ ] **9.4 Telefon w Header — klikalne CTA**
  - Numer telefonu w headere powinien być bardziej prominentny
  - Dodać hover z podkreśleniem/złotem
  - Musi być klikalny (`tel:` link)
  - Ref: `HN5`

- [ ] **9.5 Dropdown "Usługi" — premium styl**
  - Obecny border zastąpić: glassmorphism ALBO delikatna złota linia zamiast standardowego border
  - Ref: `HN6`

- [ ] **9.6 Mobile menu — animowany hamburger**
  - Właściciel: "Oba pomysły są dobre. Wybierz lepszy albo połącz"
  - Opcja A: Editorial hamburger (3 linie o różnych długościach)
  - Opcja B: Animowany morph hamburger → X
  - **Połączyć:** hamburger z liniami o różnych długościach, który płynnie morph-uje do X przy kliknięciu
  - Ref: `HN7`

- [ ] **9.7 Mobile menu — dodać telefon**
  - Numer telefonu musi być bezpośrednio dostępny w rozwiniętym hamburger menu na mobile
  - Klikalny, wyraźny, na górze lub na dole menu
  - Ref: `MB3`

### 📌 BACKLOG

- [ ] **9.8 Logo — wymiana na graficzne**
  - Właściciel dostarczy logo
  - Obecnie: tekst Playfair
  - **ZAPAMIĘTAJ:** Jak logo będzie gotowe — wdrożyć
  - Ref: `HN1`

---

## 🦶 10. FOOTER

### ✅ WDRAŻAMY TERAZ

- [ ] **10.1 Linki — hover z green na gold**
  - Wszystkie linki w footerze: `hover:text-accent-gold` zamiast zielonego
  - Ref: `FT1`

- [ ] **10.2 Nagłówki sekcji — uppercase tracking**
  - Wzmocnić styl: `text-[10px] tracking-[0.4em]` uppercase
  - Drobne, eleganckie, premium
  - Ref: `FT2`

- [ ] **10.3 Mokotowska 71 — wizualne wyróżnienie**
  - Adres "Mokotowska 71" w kolumnie brand nie wyróżnia się
  - Zaprojektować go inaczej — np. większy font, złoty kolor, oddzielona linia
  - Ref: `FT3`

- [ ] **10.4 Copyright — zmiana treści**
  - Obecny tekst zbyt korporacyjny
  - Zmienić na: `Warszawski Czas — Mokotowska 71, Warszawa`
  - Ref: `FT4`

- [ ] **10.5 Dark background footer**
  - Zmienić footer na ciemne tło
  - **WAŻNE:** Przy zmianie na dark — zmienić WSZYSTKIE kolory tekstów, aby były widoczne na ciemnym tle
  - Żaden element nie może zniknąć
  - Ref: `FT5`

- [ ] **10.6 Social media — poprawne linki**
  - Dodać linki do: **Instagram**, **TikTok**, **Facebook**
  - TYLKO te trzy — nie dodawać fikcyjnych sociali
  - Ref: `FT6`

- [ ] **10.7 Dekoracyjne elementy**
  - Dodać: złotą linię na górze footera, ewentualnie monogram, subtelny pattern
  - Elementy powinny podkreślać premium charakter
  - Ref: `FT7`

---

## 📐 11. GLOBALNY SYSTEM TYPOGRAFICZNY

### ✅ WDRAŻAMY TERAZ

- [ ] **11.1 Spójność wyrównania H2 — kompozycja, nie reguła**
  - Właściciel: "Posprawdzaj co lepiej wygląda"
  - **Nie musi być sztywno jednolite** (raz left, raz center) — ALE musi to wyglądać jak świadoma kompozycja
  - Sprawdzić zarówno na desktop jak i mobile
  - Jeśli mieszane wyrównanie wygląda źle → zunifikować
  - Ref: `TY1`

- [ ] **11.2 Rozmiary fontów — ładna kompozycja**
  - Nie narzucam sztywnej skali — fonty muszą tworzyć ładną, spójną kompozycję wizualną
  - Sprawdzić i poprawić proporcje tam, gdzie coś nie gra
  - Ref: `TY2`

- [ ] **11.3 Font weight — kompozycja**
  - `font-semibold` (600) vs `font-medium` (500) — nie musi być jedno
  - Musi to tworzyć czytelną hierarchię i ładną kompozycję
  - Ref: `TY3`

- [ ] **11.4 Trzecia czcionka — ozdobna, premium**
  - Dodać ozdobną czcionkę (np. `Cormorant Garamond` lub inna elegancka serif/display)
  - Użyć do: pull quotes, calloutów, wyróżnień edytorskich
  - **Można też pozmieniać istniejące czcionki** — mają być elementem ciekawej, nietypowej, ale premium kompozycji
  - Zarejestrować w `tailwind.config.ts` i załadować przez Google Fonts / `next/font`
  - Ref: `TY4`

- [ ] **11.5 System labelów sekcji — kompozycja**
  - Właściciel: "Nie jestem jeszcze przekonany"
  - Konsekwentny system `[NUMER RZYMSKI] —— [LABEL UPPERCASE GOLD]` — wdrożyć TYLKO jeśli wygląda to jako ładna kompozycja, a nie na siłę
  - Ref: `TY5`

---

## 🎨 12. PALETA KOLORÓW I BRAND SYSTEM

### ✅ WDRAŻAMY TERAZ

- [ ] **12.1 Klarowny podział: green vs gold**
  - **Green (`accent-green`)**: tła, kotwice wizualne, dark sekcje
  - **Gold (`accent-gold`)**: akcenty, CTA, hover states, podkreślenia, interaktywne elementy
  - Przejść przez CAŁY kod i ujednolicić — żadne przypadkowe green tam gdzie powinien być gold
  - Ref: `CL1`

- [ ] **12.2 Hover states — gold zamiast green**
  - Ikony w Brand Positioning i Services używają green na hover
  - Zamienić na `accent-gold`
  - Dotyczy WSZYSTKICH hover states w tych sekcjach
  - Ref: `CL2`

- [ ] **12.3 Wartość `--accent-gold` — stonować**
  - Obecne `hsl(46, 65%, 52%)` wygląda jak tani żółty ("cheap yellow")
  - Zmienić na: `hsl(42, 50%, 45%)` — cieplejsze, bardziej szlachetne złoto
  - UWAGA: ta zmiana wpłynie na WSZYSTKIE elementy gold na stronie — sprawdzić po zmianie
  - Ref: `CL3`

- [ ] **12.4 Dark mode — Hero, Final CTA, Stopka**
  - Hero — ciemne tło (już ma video, ale overlay/content powinien być dark)
  - Final CTA — ciemne/czarne tło (patrz punkt 8.3)
  - Stopka — ciemne tło (patrz punkt 10.5)
  - Reszta sekcji: jasne
  - Ref: `CL4`

- [ ] **12.5 Tekstura grain/noise na tłach**
  - Na sekcjach z muted tłem dodać subtelny grain overlay
  - Nadaje głębię i premium feel — strona nie wygląda jak "flat design"
  - Ref: `CL5`

---

## 📱 13. MOBILE — SPECYFICZNE PROBLEMY

### ✅ WDRAŻAMY TERAZ

- [ ] **13.1 Hero na mobile — więcej powietrza**
  - Przyciski CTA zbyt ciasno
  - Dodać więcej padding/margin między elementami
  - **OGÓLNA ZASADA:** Na mobile strona NIE MOŻE wyglądać jak jedna długa lista. Musi się coś dziać — wizualne przerwy, elementy graficzne, oddech
  - Ref: `MB1`

- [ ] **13.2 Karuzela na mobile — zmniejszyć wysokość**
  - Karta nie może zajmować prawie całego ekranu telefonu
  - Karuzela może być pojedyncza (jedna karta na raz) ale **musi być mniejsza**
  - Zmniejszyć wysokość karty, rozważyć aspect ratio np. 4:5
  - Ref: `MB2`

- [ ] **13.3 Scroll indicator na mobile — mniejsza waga wizualna**
  - Na mobile elementy scroll indicator powtarzają się z desktop
  - Zmniejszyć visual weight — mniejszy tekst, mniejsza ikona, mniejsze paddingi
  - Ref: `MB4`

- [ ] **13.4 Brand Positioning grid na mobile — ciekawy układ**
  - NIE MOŻE być nudna, pionowa lista
  - Musi być czytelnie, ciekawie, "musi się coś dziać"
  - Np. układ 2+1 z liniami poziomymi, albo inny kreatywny layout
  - Ref: `MB6`

### 📌 BACKLOG (Wysoki priorytet!)

- [ ] **13.5 Mobile sticky CTA bar**
  - Sticky bar na dole ekranu z przyciskami: `Zadzwoń` i `Napisz do nas`
  - Właściciel: "Na razie zapisz ale z WYSOKIM PRIORYTETEM do wdrożenia"
  - Prawdopodobnie wejdzie razem z dodawaniem zdjęć
  - Ref: `MB5`

---

## 🐛 14. BŁĘDY TECHNICZNE

### ✅ WDRAŻAMY TERAZ

- [ ] **14.1 Błąd hydratacji — `antigravity-scroll-lock`**
  - Badge "1 Issue" widoczny na stronie
  - Naprawić błąd hydrationowy Related to `antigravity-scroll-lock`
  - **Musi być naprawiony przed launchem**
  - Ref: `BT1`

- [ ] **14.2 Telefon placeholder — wymiana**
  - Zamienić WSZYSTKIE wystąpienia `+48 123 456 789` na: **+48 604 501 000**
  - Dotyczy: Boutique Preview, Footer, kontakt, hero — wszędzie
  - Ref: `BT3`

- [ ] **14.3 Email — poprawna wartość**
  - Zamienić `kontakt@warszawskiczas.pl` na: **biuro@warszawskiczas.pl**
  - Dotyczy wszystkich wystąpień
  - Ref: `BT4`

### 📌 BACKLOG

- [ ] **14.4 Favicon**
  - Dodać SVG favicon (tarcza zegarka lub monogram WC)
  - **Priorytet taki sam jak na obrazki** — wejdzie w ramach dostarczania assets graficznych
  - Ref: `BT2`

---

## ✨ 15. MICRO-INTERACTIONS I ANIMACJE

### ✅ WDRAŻAMY TERAZ

- [ ] **15.1 FadeIn — konsekwentność na WSZYSTKICH sekcjach**
  - Właściciel: "Wszędzie tam gdzie jest to możliwe. Nie może być raz jest a raz nie ma. Musi być spójne."
  - Przejść przez KAŻDĄ sekcję homepage i upewnić się, że animacja wejścia (fade in at scroll) jest konsekwentna
  - Jeśli jedna sekcja ma FadeIn — WSZYSTKIE muszą mieć
  - Ref: `MI1`

- [ ] **15.2 Hover na kartach usług — elevation/przesunięcie**
  - Dodać `box-shadow` lub przesunięcie 2px w górę przy hover
  - Subtelny efekt uniesienia karty
  - Ref: `MI2`

- [ ] **15.3 Scroll-triggered number counter**
  - Liczby w trust signals (np. "15+", "500+") animują się jako licznik
  - 0 → docelowa wartość przy wejściu sekcji w viewport
  - Ref: `MI3`

- [ ] **15.4 Gold shimmer effect na hover**
  - Na złotych elementach (przyciski, ikony, akcenty) dodać subtelny shimmer/błysk przy hover
  - Lekki, elegancki efekt świetlny przelatujący po powierzchni
  - Ref: `MI4`

---

## 🔍 16. SEO I STRUKTURA

### ✅ WDRAŻAMY TERAZ

- [ ] **16.1 Meta theme-color**
  - Zmienić z `#1B4332` (zielony) na `#faf9f7` (jasny) dla iOS status bar
  - Ref: `SE1`

- [ ] **16.2 Heading hierarchy**
  - Zweryfikować, że na stronie nie ma zduplikowanych tagów H2
  - Jeden H1 na stronę, logiczna hierarchia H2 → H3
  - Ref: `SE3`

- [ ] **16.3 Schema.org — LocalBusiness**
  - Dodać JSON-LD structured data: typ `LocalBusiness`
  - Zawierać: nazwa, adres (Mokotowska 71), godziny otwarcia, telefon, email
  - Ref: `SE4`

### 📌 BACKLOG

- [ ] **16.4 Open Graph image**
  - Potrzebuje OG image 1200×630
  - Właściciel dostarczy razem z innymi zdjęciami
  - **ZAPAMIĘTAJ**
  - Ref: `SE2`

- [ ] **16.5 Alt texty na zdjęciach**
  - Opisowe alt texty — wdrożyć razem z prawdziwymi zdjęciami
  - Ref: `SE5`

---

## 📝 PODSUMOWANIE: LISTA BACKLOG (Oczekujące na assety)

Zgromadzenie wszystkich punktów czekających na dostarczenie materiałów:

| # | Czego potrzebujemy | Priorytet | Punkty |
|---|---|---|---|
| 1 | Zdjęcia zegarków do karuzeli | 🔴 Wysoki | 2.6 |
| 2 | Zdjęcie butiku | 🔴 Wysoki | 6.7 |
| 3 | Logo graficzne | 🟡 Średni | 9.8 |
| 4 | Favicon (SVG) | 🟡 Średni | 14.4 |
| 5 | OG Image 1200×630 | 🟡 Średni | 16.4 |
| 6 | Wideo butiku (10s loop) | 🔵 Niski | 6.8 |
| 7 | Cytaty klientów (testimonials) | 🟡 Średni | 7.6 |
| 8 | Weryfikacja danych liczbowych | 🟡 Średni | 7.1 |
| 9 | Linki social media (IG, TikTok, FB) | 🟡 Średni | 10.6 |
| 10 | Korekta tonacji video Hero | 🔵 Niski | 1.9 |

---

> **Legenda:**
> - ✅ **WDRAŻAMY TERAZ** — do natychmiastowej implementacji
> - 📌 **BACKLOG** — czeka na assety lub decyzję
> - **ZAPAMIĘTAJ** — punkt do wdrożenia w przyszłości, nie teraz
> - 🔴 Wysoki / 🟡 Średni / 🔵 Niski — priorytet w backlogu
