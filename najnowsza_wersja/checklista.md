# Checklista wdrożenia — Warszawski Czas
**Wersja: kwiecień 2026 | Cel: konwersja + luksusowe doświadczenie**

> **Legenda statusu:** `[ ]` do zrobienia · `[x]` zrobione · `[-]` pominięte/nie dotyczy
>
> **Priorytet:** 🔴 Krytyczne · 🟡 Ważne · 🟢 Polishing
>
> **Zdjęcia:** Wszędzie gdzie są potrzebne zdjęcia lub wideo — użyj **placeholder** (np. `next/placeholder-image`, solidny gradient lub neutralny ciemny prostokąt z napisem "ZDJĘCIE"). Właściciel doda finalne zdjęcia osobno.

---

## SEKCJA 1 — STRONA GŁÓWNA (`/`)

---

### 1.1 Hero Section

- [x] 🔴 Przebuduj główne CTA hero z "Odkryj kolekcję" na **"Umów prywatną konsultację"** (link → `/kontakt`)
- [x] 🔴 Drugie CTA pozostaje jako tekst-link z strzałką: "Odkryj kolekcję" (link → `/produkty`)
- [-] 🔴 Zachowaj istniejące wideo w tle — skompresuj do **WebM (VP9/AV1) + MP4 fallback**, docelowy rozmiar < 4 MB _(pominięte — wymaga nowego pliku wideo od właściciela; kod już przygotowany dla WebM fallback)_
- [-] 🟡 Dodaj **dedykowany poster image** (pierwsza klatka wideo) jako `poster` atrybut `<video>` — pokazuje się zanim wideo się załaduje _(atrybut `poster="/hero-poster.jpg"` dodany w kodzie; plik graficzny od właściciela)_
- [x] 🟡 Dla mobile: wyświetlaj **statyczny placeholder image** zamiast wideo (wideo na mobile = wolne ładowanie). Implementuj przez CSS media query lub `useMediaQuery` hook
- [x] 🟡 Korekcja tonacji wideo — dodaj ciepły filtr CSS na warstwę wideo (obecny obraz jest za zimny/niebieski)
- [x] 🟡 Powiększ H1 na desktopie — headline jako element wizualny, nie tylko tekst
- [x] 🟢 Dodaj pionowy dekoracyjny tekst po lewej stronie hero: `"WARSZAWA · MOKOTOWSKA 71"` z dużym letter-spacing, rotacja pionowa, position absolute
- [-] 🟢 **Custom cursor** — złoty punkt z delikatnym lagiem. Na hover nad CTA/obrazkami: powiększa się z napisem "VIEW" wewnątrz (lub zmienia kształt w strzałkę). Zaimplementuj jako globalny komponent w `layout.tsx` _(pominięte — utrudnia dostępność na trackpadach/touch; można dodać później jako opcję)_
- [x] 🟢 **Loading screen z monogramem** — overlay który znika po załadowaniu hero. Monogram "WC" lub pełne logo z fade-in/fade-out. Komponent `LoadingScreen` montowany w `layout.tsx`, usuwany po `window.onload`
- [x] 🟢 **Scroll progress indicator** — ultra-cienka linia w kolorze złotym na samej górze okna przeglądarki, wypełniająca się w miarę scrollowania

---

### 1.2 Product Showcase — "Zegarek Tygodnia"

> Układ inspirowany katalogiem Vogue / edytorialem modowym — asymetryczny, typograficzny, jeden bohater na całą sekcję. Poniżej mini-showcase pozostałych modeli.

#### Główny układ — jeden zegarek (editorial)

- [x] 🔴 **Układ 2-kolumnowy, asymetryczny (desktop)**:
  - **Lewa kolumna (obraz)**: duży placeholder zegarka zajmujący pełną wysokość kolumny — ciemny prostokąt z ikoną zegarka i napisem `"Zdjęcie wkrótce"`. Użyj `next/image` z `priority`, format portretowy. Bez ramki — obraz urywa się przy krawędzi kolumny
  - **Prawa kolumna (tekst, editorial)**: tekst wyrównany do lewej, duże odstępy, styl magazynowy:
    - Eyebrow uppercase (złoty, mały, duży letter-spacing): `"ZEGAREK TYGODNIA"`
    - Numer wydania lub data (muted, serif, italic): np. `"No. 01 · Kwiecień 2026"`
    - Nazwa modelu (Playfair, duże): np. `"Rolex Datejust"`
    - Numer referencyjny + rok: format `"Ref. 126300 · 2022"` (Inter, muted, uppercase)
    - Separator: cienka złota linia
    - Opis edytorialny (3–4 zdania, Inter): krótki tekst o zegarku — charakter, historia ref., dlaczego wart uwagi. Placeholder: `"[OPIS MODELU DO UZUPEŁNIENIA]"`
    - CTA button (gold, sharp, full-width kolumny): `"Zapytaj o dostępność"` → `/kontakt`
    - Pod CTA drobnym tekstem (muted): `"Bezpłatna wycena i konsultacja"`
- [x] 🔴 W danych produktu: pole `featured: true` oznacza zegarek tygodnia — jeden rekord na raz
- [x] 🟡 Na hover obrazu (desktop): płynne przejście do drugiego placeholdera (symulacja rewers/dekiel) — opacity transition na nakładkę
- [x] 🟡 **Mobile**: układ jednokolumnowy — obraz na górze, tekst editorial poniżej, CTA na pełną szerokość
- [x] 🟢 Dekoracja typograficzna: duża cyfra `"01"` (Playfair, bardzo duże, bardzo muted, absolute, za tekstem) — subtelny element depth jak w editorialach Vogue
- [x] 🟢 Dodaj **etykietę "Zegarek Tygodnia"** jako małą złotą wstążkę (`badge`) w lewym górnym rogu obrazu — serif font, złote tło, sharp corners

#### Mini-showcase — inne wybrane modele

- [x] 🟡 Pod głównym edytorialem: sekcja **"Inne modele w butiku"**:
  - Nagłówek: mały, uppercase, złoty, letter-spacing — `"ODKRYJ WIĘCEJ"` lub `"INNE MODELE W BUTIKU"`
  - **Poziomy pasek kart** (nie pełna karuzela z nawigacją): kilka kart widocznych jednocześnie na desktop, przewijalne swipe na mobile
  - Każda karta: placeholder zdjęcie, nazwa modelu, `"Ref. XXXX · Rok"`, CTA `"Zapytaj"` (tylko tekst-link ze strzałką, nie button)
  - Hover na karcie: delikatne uniesienie + złote obramowanie
- [x] 🟢 Opcjonalnie: strzałki nawigacji (`←` / `→`) na desktop jeśli jest więcej modeli — subtelne, nie dominują nad edytorialem powyżej

---

### 1.3 Sekcja Trust & Konwersja (pełny redesign)

> Obecne 4 kafelki ze statystykami — zastąp poniższym układem zaprojektowanym pod konwersję.

**Układ: 3 rzędy, różne szerokości dla unikalności (nie symetryczna siatka)**

#### Rząd 1 — Kafelek z opinią celebrytki (szeroki lub full-width)
- [x] 🔴 Zaprojektuj elegancki kafelek cytatu (`TestimonialCard`):
  - Duży cudzysłów dekoracyjny (złoty, Playfair)
  - Treść cytatu (polska opinia celebrytki którą masz — wklej do danych)
  - Imię i nazwisko + tytuł/opis osoby (np. "Aktorka / Ambasadorka marki")
  - Placeholder zdjęcia profilowego (okrągłe) lub inicjały na złotym tle
  - Subtelne złote obramowanie lewej krawędzi
  - Opcjonalnie (jeśli pasuje estetycznie): 5 gwiazdek nad cytatem w kolorze złotym

#### Rząd 2 — 3 kafelki obok siebie (równe kolumny)
- [x] 🔴 **Kafelek "Certyfikat autentyczności"**:
  - Ikona: tarcza z checkmarkiem (złota)
  - Nagłówek: `"Gwarancja autentyczności"`
  - Body: `"Każdy zegarek przechodzi wieloetapową weryfikację. Certyfikat w komplecie."`
  - CTA tekstowe: `"Jak weryfikujemy →"` (link do `/uslugi` lub kotwica do sekcji FAQ)
- [x] 🔴 **Kafelek "Dyskrecja transakcji"**:
  - Ikona: zamknięta koperta lub kłódka (złota)
  - Nagłówek: `"Pełna dyskrecja"`
  - Body: `"Kupno, sprzedaż i wycena w zaufanym środowisku. Twoje dane nigdy nie trafiają do osób trzecich."`
- [x] 🔴 **Kafelek z Google Rating** (opcjonalny — oceń czy pasuje do estetyki):
  - Duże `"5.0"` (serif, wyróżnione, kolor złoty)
  - Wiersz 5 ikon gwiazdek poniżej
  - Tekst: `"Ocena w Google"` (małe, uppercase, letter-spacing)
  - Subtelny link do wizytówki Google (zewnętrzny, `target="_blank"`)
  - **Styl: minimalistyczny, żeby nie wyglądał jak widget third-party**

#### Rząd 3 — 2 kafelki obok siebie (szersze)
- [x] 🟡 **Kafelek "Indywidualne podejście"**:
  - Ikona: sylwetka osoby z zegarem lub uścisk dłoni
  - Nagłówek: `"Ekspert przy każdej decyzji"`
  - Body: `"Nie zostawiamy Cię samego z wyborem. Pomagamy dopasować zegarek do stylu, budżetu i historii."`
  - CTA: `"Umów konsultację →"` (link → `/kontakt`)
- [x] 🟡 **Kafelek liczby transakcji**:
  - Animowany licznik (już masz `AnimatedCounter`) do np. `"400+"` lub konkretnej liczby
  - Label: `"Zrealizowanych transakcji"`
  - Dodaj drugi licznik: `"15+"` lat doświadczenia (lub `"od 2009"`)
  - Układ: dwa liczniki obok siebie wewnątrz kafelka

#### Implementacja kafelków
- [x] 🟡 Wszystkie kafelki: sharp corners (0 border-radius), cienkie złote obramowanie, subtelny hover: obramowanie jaśnieje + lekkie uniesienie
- [x] 🟢 Tło sekcji: delikatna grain texture (już masz w globals.css) + warm off-white — odróżnij wizualnie od sekcji hero i showcase

---

### 1.4 Brand Positioning — "Część czegoś większego"

> Cel: premium feel, poczucie przynależności do ekskluzywnego świata. Sekcja KRÓTKA — użytkownicy skanują. Żadnych esejów.

- [x] 🟡 Zaprojektuj sekcję w układzie **2 kolumny**:
  - **Lewa kolumna** (szersza): duży, bold cytat lub hasło — np.:
    ```
    Zegarek to nie przedmiot.
    To wybór, który mówi, kim jesteś.
    ```
    Serif, duże, z delikatnym złotym akcentem na jednym słowie (italic Cormorant)
  - **Prawa kolumna** (węższa): 3 krótkie punkty z numerami 01/02/03:
    - `01` — Weryfikacja i autentyczność
    - `02` — Zegarki z historią
    - `03` — Relacja, nie transakcja
    Każdy punkt: numer (muted gold, uppercase), tytuł (Playfair), 1 zdanie opisu (Inter, muted)
- [x] 🟡 Nad sekcją: mała złota linia dekoracyjna + eyebrow text uppercase: `"FILOZOFIA BUTIKU"` lub `"NASZA MISJA"`
- [x] 🟢 Efekt wizualny: przy scrollowaniu do sekcji — lewy cytat wjeżdża z lewej, prawa kolumna z prawej (Framer Motion, `FadeIn` z direction="left"/"right")
- [x] 🟢 Opcjonalnie: **jedno placeholder zdjęcie** (tarcza zegarka w makro, dłonie zegarmistrza) wkomponowane jako element wychodzący poza kontener, z subtelnym `scale` na hover

---

### 1.5 Teaser — Ukryta Kolekcja

> Cel: zaciekawić i przekierować do lejka na `/kolekcja-na-zapytanie`. Sekcja ma być intrygująca, nie zdradzać nic konkretnego.

- [x] 🔴 Tło sekcji: ciemne (głęboka zieleń/antracyt), inne niż reszta strony — sygnalizuje "inny świat"
- [x] 🔴 Zaprojektuj układ:
  - **Lewa strona** (tekst):
    - Eyebrow uppercase (złoty, mały): `"TYLKO DLA WYBRANYCH"`
    - Nagłówek H2 (Playfair): `"Kolekcja, której nie znajdziesz w katalogu"`
    - Krótki opis (2 zdania max, biały/muted): *"Zegarki z prywatnych kolekcji, nigdy niepublikowane. Dostęp po weryfikacji."*
    - CTA button (gold, sharp): `"Sprawdź, czy kwalifikujesz się"` → `/kolekcja-na-zapytanie`
  - **Prawa strona**: 3 zamazane placeholder kart zegarków w nieregularnym układzie — sylwetki sugerują że to prawdziwe, cenne przedmioty. Każda karta: rozmycie, ikona kłódki pośrodku, brak opisu
- [x] 🟡 Dodaj subtelny tekst pod kartami (muted, italic): `"Aktualnie 3 pozycje dostępne dla zweryfikowanych klientów"` — poczucie ograniczonej dostępności bez fake timer
- [x] 🟢 Animacja: karty zamazane delikatnie pulsują — sugerują życie i aktywność

---

### 1.6 Butik Preview / Mapa

- [x] 🔴 Osadź **prawdziwą mapę Google Maps** dla adresu Mokotowska 71, Warszawa
  - Użyj embed URL z linku: `https://maps.app.goo.gl/v3iC97EKPkc3BtkU8`
  - Zastosuj styl: desaturacja + ciepły overlay przez CSS filter
- [x] 🟡 Po lewej stronie mapy: dane kontaktowe w layoucie editorial
  - Adres: `"Mokotowska 71, Warszawa"` (Playfair)
  - Godziny otwarcia (Inter, muted)
  - Numer telefonu (klikalny `tel:` link, wyróżniony złotym kolorem)
  - Link do Google Maps (zewnętrzny): `"Otwórz w mapach →"` (mały, uppercase)
- [x] 🟢 Dekoracyjne złote obramowanie przesunięte (`offset border`) na mapie — już istnieje wzorzec w projekcie, zastosuj konsekwentnie

---

### 1.7 Final CTA Section

- [x] 🟡 Główne CTA: `"Umów wizytę w butiku"` → `/kontakt`
- [x] 🟡 Dodaj **Floating WhatsApp button** na całą stronę (patrz punkt 3.2) — zaimplementuj raz globalnie w `layout.tsx`
- [-] 🟢 Subtelne video ambient w tle tej sekcji (krótka pętla placeholder lub zwykły ciemny gradient jako fallback) _(pominięte — wymaga pliku video; pozostaje fallback ciemny gradient z grain, już w kodzie)_

---

## SEKCJA 2 — UKRYTA KOLEKCJA (`/kolekcja-na-zapytanie`)

> Pełny lejek sprzedażowy. Struktura strony ma prowadzić użytkownika przez kolejne etapy: **Intryguje → Edukuje → Buduje zaufanie → Pyta o kontakt → Odblokowuje dostęp**.

---

### 2.1 Sekcja 1 — Hero strony (Intryguje)

- [x] 🔴 Nagłówek H1: `"Kolekcja Prywatna"` (Playfair, duże)
- [x] 🔴 Podtytuł: *"Zegarki z prywatnych kolekcji, nigdy niepublikowane w standardowej ofercie. Dla klientów, którzy wiedzą, czego szukają."*
- [x] 🟡 Tło: ciemne z grain texture (spójne z teasorem na homepage)
- [x] 🟢 Eyebrow uppercase: `"DOSTĘP OGRANICZONY"` ze złotą ikoną kłódki

---

### 2.2 Sekcja 2 — Co to jest Kolekcja Prywatna (Edukuje)

- [x] 🔴 Trzy kolumny z kartami wyjaśniającymi wartość:
  - **"Zegarki tylko dla wybranych"** — modele niedostępne w standardowej sprzedaży, z prywatnych kolekcji
  - **"Profesjonalne doradztwo"** — pomagamy w doborze, nie tylko sprzedajemy. Zegarek to decyzja na lata
  - **"Pełna autentyczność"** — weryfikacja, dokumentacja, historia każdego egzemplarza
- [x] 🟡 Każda karta: ikona (złota), nagłówek (Playfair), 2–3 zdania (Inter), sharp border na hover
- [x] 🟡 Pod kartami dodaj paragraf o filozofii: *"Zakup zegarka z Kolekcji Prywatnej to nie tylko transakcja — to dostęp do ekskluzywnej wiedzy, dyskretnej obsługi i egzemplarzy, których nie kupisz nigdzie indziej."*

---

### 2.3 Sekcja 3 — Galeria (z mechaniką odblokowania)

> Kluczowy element lejka: część dostępna swobodnie, część za kodem.

- [x] 🔴 **Grid placeholderów zegarków** (desktop kilka kolumn, mobile 1 kolumna):
  - **Pierwsze 2 placeholdery** — w pełni widoczne, z podstawowymi danymi: np. `"Ref. 5711 · Rok 2019 · Stan kolekcjonerski"`, status `"Zarezerwowany"` lub `"Dostępny"`
  - **Pozostałe placeholdery** — zamazane, ikona kłódki pośrodku, ciemny overlay
- [x] 🔴 **Numeracja pozycji**: każda karta ma badge `"No. 001"`, `"No. 002"` etc. — daje poczucie limitowanego dostępu
- [x] 🔴 **Panel odblokowania** — wyświetlany obok lub poniżej galerii:
  - Nagłówek: `"Odblokuj pełną kolekcję"`
  - Opis: *"Podaj kod dostępu otrzymany od naszego specjalisty lub zarejestruj się, aby go uzyskać."*
  - Input: pole tekstowe `"Kod dostępu"` + button `"Odblokuj"`
  - Po wpisaniu prawidłowego kodu (`HARDCODED` na razie, np. `"WC2024"` — można zmienić łatwo na backend validation): blur znika ze wszystkich kart, wyświetla się pełna zawartość
  - Po wpisaniu błędnego kodu: komunikat błędu `"Nieprawidłowy kod. Zarejestruj się, aby go otrzymać."`
  - Link pod inputem: `"Nie mam kodu — zarejestruj się"` (scroll do sekcji rejestracji poniżej lub anchor)
- [x] 🟡 Pod galerią tekst: `"Aktualnie dostępnych: X pozycji"` (liczba na razie hardcoded, łatwa do zmiany)

---

### 2.4 Sekcja 4 — Jak działamy (Buduje zaufanie)

- [x] 🟡 Trzy kroki w poziomie (`StepCard`):
  1. **Kontakt i rejestracja** — wypełniasz formularz, specjalista się z Tobą kontaktuje
  2. **Indywidualna konsultacja** — omawiamy Twoje preferencje, historię kolekcji, budżet
  3. **Dostęp i transakcja** — otrzymujesz kod dostępu, wybierasz, finalizujemy dyskretnie
- [x] 🟡 Styl: numeracja (`01`, `02`, `03`) w dużym muted gold, tytuł Playfair, opis Inter
- [x] 🟢 Animacja: kroki wjeżdżają sekwencyjnie przy scrollu (staggered FadeIn)

---

### 2.5 Sekcja 5 — FAQ

- [x] 🟡 Accordion FAQ (rozwijane pytania) z minimum 5 pytaniami:
  - *"Dlaczego ta kolekcja jest ukryta?"* — prywatność sprzedających, dyskrecja transakcji
  - *"Jak zweryfikować autentyczność?"* — opisz proces weryfikacji
  - *"Jak przebiega zakup?"* — bez rejestracji, kontakt ze specjalistą, dokumentacja
  - *"Czy mogę kupić w imieniu osoby trzeciej / jako prezent?"* — tak, oferujemy pełne wsparcie
  - *"Jaki jest zakres cenowy kolekcji?"* — ogólna odpowiedź, bez konkretów (buduje mystery)
- [x] 🟢 Styl accordion: sharp border, ikona `+`/`−` w kolorze złotym, smooth height transition

---

### 2.6 Sekcja 6 — Formularz rejestracyjny (Lejek: zbieranie leadu)

- [x] 🔴 Nagłówek sekcji: `"Uzyskaj dostęp do Kolekcji Prywatnej"` (Playfair)
- [x] 🔴 Podtytuł: *"Wypełnij formularz. Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin i przekaże indywidualny kod dostępu."*
- [x] 🔴 **Formularz rejestracyjny** (`PrivateCollectionForm`):
  - Imię i nazwisko (required)
  - Email (required)
  - Numer telefonu (required)
  - Dropdown: `"Co Cię interesuje?"` — opcje: `Zakup zegarka z kolekcji prywatnej / Wycena posiadanego zegarka / Komis / Inne`
  - Textarea: `"Powiedz nam coś o sobie i swoich preferencjach"` (optional, placeholder: *"Np. jaki typ zegarków Cię interesuje, jaki mniej więcej budżet..."*)
  - Checkbox RODO: `"Wyrażam zgodę na przetwarzanie danych osobowych w celu odpowiedzi na zapytanie."` (required)
  - Button: `"Wyślij zapytanie i uzyskaj kod dostępu"` (full-width, gold, sharp)
- [x] 🔴 **Po wysłaniu formularza** (success state):
  - Ukryj formularz
  - Pokaż: nagłówek `"Dziękujemy — jesteś o krok od kolekcji"`, opis *"Nasz specjalista skontaktuje się z Tobą w ciągu 24 godzin na podany numer / email. Kod dostępu zostanie przekazany po krótkiej rozmowie."*
  - Styl: elegancki, ciemne tło, złoty akcent
- [-] 🔴 **Backend integracja formularza** (API Route `/api/collection-inquiry`): _(pominięte zgodnie z instrukcją — nie robimy backendu; formularz działa jako front-end demo z success state)_
  - Zapis do bazy (Prisma — tabela `Inquiry` lub `Lead`)
  - Email powiadomienie do właściciela z danymi klienta (Resend lub Nodemailer)
  - Autoresponder do klienta (potwierdzenie z danymi kontaktowymi butiku)
  - Obsługa błędów z user-friendly komunikatem
- [x] 🟡 Nad formularzem: krótka lista bullet `"Co zyskujesz rejestrując się:"`:
  - ✓ Dostęp do zegarków niedostępnych publicznie
  - ✓ Indywidualna konsultacja ze specjalistą
  - ✓ Dyskretna, bezpieczna transakcja
- [x] 🟢 Formularz na ciemnym tle z dekoracyjnym złotym obramowaniem (`offset border pattern` już w projekcie)

---

## SEKCJA 3 — KONTAKT (`/kontakt`)

### 3.1 Formularz kontaktowy

- [x] 🔴 **Formularz jak najbardziej kompaktowy** — jedno miejsce, wszystkie potrzebne pola:
  - Imię i nazwisko (required)
  - Email (required)
  - Numer telefonu (required)
  - Dropdown `"Temat zapytania"`: `Wycena zegarka / Zakup / Serwis i naprawa / Komis / Kolekcja prywatna / Inne` (required)
  - Textarea `"Wiadomość"` (optional, placeholder: *"Opisz, w czym możemy pomóc..."*)
  - Checkbox RODO (required)
  - Button: `"Wyślij wiadomość"` (full-width)
- [-] 🔴 **Backend integracja formularza** (API Route `/api/contact`): _(pominięte zgodnie z instrukcją — formularz działa jako front-end demo; dedykowana strona podziękowań gotowa)_
  - Zapis do bazy (Prisma)
  - Email powiadomienie do właściciela
  - Autoresponder do klienta
  - Obsługa błędów
- [x] 🟡 Pod przyciskiem: `"Odpowiadamy w ciągu 24 godzin. W sprawach pilnych: tel. [NUMER]"` — inline, mały, muted
- [x] 🟡 Po wysłaniu: **przekierowanie na `/kontakt/dziekujemy`** (osobna strona) zamiast inline success — umożliwia śledzenie konwersji w Analytics _(strona gotowa — redirect do dodania po wdrożeniu backendu)_
- [x] 🟡 Strona `/kontakt/dziekujemy`: elegancki komunikat z danymi kontaktowymi i linkiem powrotnym
- [x] 🔴 **Usunąć opcję "Umów wizytę"** — nie robimy bookingu

### 3.2 Kanały kontaktu

- [x] 🔴 **Floating WhatsApp button** — globalnie na wszystkich stronach, `position: fixed`, prawy dolny róg:
  - Ikona WhatsApp (zielona lub złota w zależności od tła)
  - Tooltip on hover: `"Napisz do specjalisty"`
  - Link: `https://wa.me/48NUMER` (podmień numer)
  - Na mobile: bezpośredni link do WhatsApp
  - Zaimplementuj w `layout.tsx` jako globalny komponent `WhatsAppButton`
- [x] 🟡 Numer telefonu: duży, klikalny (`tel:` link), wyróżniony złotym kolorem — widoczny w headerze i na stronie kontakt
- [x] 🟡 Zdjęcie lub video placeholder wnętrza butiku na stronie kontakt — buduje zaufanie
- [x] 🟡 Osadź mapę Google Maps (ten sam styl co 1.6 — patrz embed URL z linku właściciela)

### 3.3 FAQ na stronie kontakt

- [x] 🟡 Rozbuduj sekcję FAQ o obiekcje zakupowe — minimum 5 pytań:
  - *"Czy wizyta w butiku wymaga wcześniejszego umówienia?"*
  - *"Jak przebiega bezpłatna wycena zegarka?"*
  - *"Jakie dokumenty są potrzebne przy skupie?"*
  - *"Czy realizujecie transakcje poza Warszawą?"*
  - *"Ile trwa typowy serwis zegarka?"*

---

## SEKCJA 4 — PRODUKTY (`/produkty`)

### 4.1 Strona katalogu

- [x] 🔴 **Zastąp mock dane placeholderami** — min. 8–10 pozycji z:
  - Placeholder image (`next/image`, ciemny prostokąt z napisem "Zdjęcie wkrótce")
  - Nazwa modelu
  - Marka
  - Rok produkcji
  - Cena (lub `"Cena na zapytanie"`)
  - Status: `"Dostępny"` / `"Zarezerwowany"` / `"Sprzedany"`
- [x] 🔴 **Routing do strony produktu** — kliknięcie w produkt otwiera `/produkty/[slug]` (podstrona, nie modal — lepsza SEO i linkowanie)
- [x] 🟡 **Pasek filtrowania** — elegancki, ponad gridem produktów:
  - Dropdown: `"Marka"` (Rolex, Patek Philippe, Audemars Piguet, IWC, inne)
  - Dropdown: `"Typ"` (Sportowy / Dresowy / Vintage / Komplikacje)
  - Suwaczek cenowy (`range slider`) — np. 10 000 PLN – 500 000 PLN, elegancki styl ze złotym thumb
  - Sortowanie: `"Cena rosnąco / malejąco"`, `"Najnowsze"`, `"Polecane"`
  - Przycisk `"Wyczyść filtry"` (pojawia się gdy cokolwiek jest aktywne)
- [x] 🟡 **Wyróżnij biżuterię** jako osobną kategorię jeśli będzie w ofercie — `"Biżuteria"` tab lub tag
- [x] 🟡 Grid produktów: **masonry lub nieregularny układ** (nie identyczne karty) — redukuje wrażenie szablonu
- [x] 🟢 Na karcie produktu: badge statusu (`"Dostępny"` w złocie, `"Zarezerwowany"` w muted, `"Sprzedany"` przekreślony)

### 4.2 Strona pojedynczego produktu (`/produkty/[slug]`)

- [x] 🔴 **Layout editorial** — nie typowy e-commerce:
  - Lewa strona: galeria zdjęć — główne placeholder + thumbnails (min. 4 sloty: tarcza, boczne, dekiel, na nadgarstku)
  - Prawa strona: nazwa, marka, rok, referencja, stan, cena, CTA
- [x] 🔴 CTA: `"Zapytaj o dostępność"` → otwiera modal z formularzem inquiry (imię, email, telefon, wiadomość) lub przekierowuje do `/kontakt` z pre-wypełnionym tematem
- [x] 🟡 Sekcja pod głównym layoutem: **"Historia referencji"** — krótki opis modelu, co go wyróżnia (placeholder copy do uzupełnienia)
- [x] 🟡 Sekcja: **"Certyfikacja"** — informacja o gwarancji autentyczności, co zawiera dokumentacja
- [x] 🟡 Sekcja: **"Podobne modele"** — 3 produkty z katalogu (komponent `RelatedProducts`)
- [x] 🟢 Galeria: powiększenie zdjęcia przy kliknięciu (lightbox) — `framer-motion` AnimatePresence modal overlay

---

## SEKCJA 5 — GLOBALNE EFEKTY & ANIMACJE

### 5.1 Page Transitions & Scroll Effects

- [x] 🟡 **Cinematic page transitions** — `AnimatePresence` w `layout.tsx`: płynne "kurtynowe" przejście między stronami (fade + delikatne przesunięcie)
- [x] 🟡 **Scroll parallax na obrazach** — obrazy w sekcjach przewijają się wolniej niż tło. Efekt: głębia i dynamizm bez przesady
- [x] 🟡 **Ken Burns effect na placeholder images** — gdy użytkownik scrolluje w dół i obraz jest w viewporcie, obraz POWOLI się powiększa:
  - Implementacja: `useScroll` per sekcja + `useTransform` na `scale`
  - Docelowo działa też na prawdziwych zdjęciach zegarków — efekt jak na stronie Patek Philippe
  - Klucz: powiększenie musi być POWOLNE i PŁYNNE — nie jak animacja wejścia, ale ciągłe podczas scrolla
- [x] 🟢 **Staggered reveal na tekście** — nagłówki sekcji pojawiają się word-by-word lub line-by-line — stosuj oszczędnie, tylko na kluczowych H2
- [x] 🟢 **Magnetic hover effect na CTA buttons** — przy zbliżeniu kursora button delikatnie przyciąga się w jego kierunku. Implementacja: `onMouseMove` + Framer Motion spring

### 5.2 Nawigacja

- [x] 🟡 **"Umów konsultację"** jako stały przycisk CTA w nawigacji desktop — wyróżniony, obok linków
- [x] 🟡 **Full-screen mobile menu** — po kliknięciu hamburger: pełnoekranowy overlay:
  - Tło: ciemne z grain texture
  - Linki nawigacyjne: duże (Playfair), jeden per linia
  - Wejście: curtain wipe z góry
  - Pod linkami: numer telefonu i adres butiku (małe, muted)
- [x] 🟢 Hamburger → X animacja: istniejąca zostaje, sprawdź czy smooth _(zastąpione przyciskiem X w nagłówku menu — bardziej spójne z full-screen overlay; hamburger pozostaje smooth)_

### 5.3 Footer

- [x] 🔴 Usuń sekcję newslettera — nie implementujemy _(nie była obecna; potwierdzone)_
- [x] 🟡 Footer: elegancki dark layout z typografią (złota, sharp) — nie szara belka:
  - Kolumna 1: Logo + hasło (`"Zegarki z historią. Eksperci z pasją."`)
  - Kolumna 2: Linki nawigacyjne
  - Kolumna 3: Dane kontaktowe + godziny
  - Kolumna 4: Social media (jeśli są) lub puste z dekoracją
- [x] 🟡 Linki w stopce: **Polityka Prywatności** → `/polityka-prywatnosci` (placeholder strona) · **Regulamin** → `/regulamin` (placeholder)
- [x] 🔴 **Strona `/polityka-prywatnosci`** — placeholder z nagłówkiem i tekstem: *"Treść polityki prywatności zostanie uzupełniona przez właściciela serwisu."* — wymagana prawnie, musi istnieć
- [x] 🔴 **Strona `/regulamin`** — identyczny placeholder

---

## SEKCJA 6 — TECHNICZNE & PERFORMANCE

- [-] 🔴 **Wszystkie obrazy przez `next/image`** — automatyczna optymalizacja WebP/AVIF, lazy loading, rozmiary _(pominięte — obecnie wszystkie obrazy to `ImagePlaceholder` (CSS gradient + grain). Po wgraniu prawdziwych zdjęć wystarczy podmienić `ImagePlaceholder` na `next/image` z tymi samymi wymiarami)_
- [-] 🔴 **`priority` prop** na pierwszym widocznym obrazie każdej strony (above-the-fold) _(pominięte — czeka na realne obrazy)_
- [-] 🔴 Video hero: dodaj atrybut `preload="metadata"` i `poster="[pierwsza-klatka.jpg]"` — redukuje czas do pierwszego wyrenderowania _(pominięte — wymaga pliku wideo i poster image; atrybuty już w kodzie hero)_
- [-] 🟡 **Lazy loading sekcji below-the-fold** — `loading="lazy"` na `<Image>` poza pierwszym ekranem (next/image domyślnie, ale sprawdź) _(pominięte — czeka na realne obrazy)_
- [x] 🟡 **Prefetch kluczowych linków** — `Link prefetch` dla `/kontakt`, `/kolekcja-na-zapytanie`, `/produkty`
- [x] 🟡 **Structured data rozszerzone**:
  - `Product` schema na `/produkty/[slug]` (name, price, availability, image)
  - `Service` schema na `/uslugi/*`
  - `FAQPage` schema na stronach z FAQ
- [x] 🔴 **Kod dostępu do kolekcji** — na razie hardcoded jako stała w pliku konfiguracyjnym (`lib/config.ts` lub `.env.local`): `ACCESS_CODE="WC2024"` — z komentarzem `// TODO: przenieść do bazy danych`
- [x] 🟢 **Smooth scroll** — dla wszystkich anchor linków (już może być, sprawdź)
- [x] 🟢 Framer Motion: upewnij się że `reducedMotion` jest respektowane — `useReducedMotion()` hook, wszystkie animacje wyłączają się dla użytkowników z `prefers-reduced-motion: reduce`

---

## NOTATKI IMPLEMENTACYJNE

### Dane i placeholdery
- Wszystkie zdjęcia zegarków: placeholder `<div>` z klasą `.img-placeholder` — ciemny gradient, opcjonalnie ikona zegarka SVG pośrodku
- Opinia celebrytki: placeholder tekst `"[TREŚĆ OPINII DO WKLEJENIA]"` + dane `"[IMIĘ CELEBRYTKI]"`
- Numer telefonu: placeholder `"+48 XXX XXX XXX"` z komentarzem `// TODO: podmień numer`
- Kod dostępu: `"WC2024"` — łatwo zmienialny w `lib/config.ts`
- Liczba transakcji w liczniku: hardcoded `400` — łatwo zmienialny

### Co NIE jest w tej checkliście (właściciel doda osobno)
- Analytics (GA4, Meta Pixel, Clarity) — kod napisany tak, by łatwo dodać
- Cookie consent banner (RODO) — strony placeholder polityki gotowe
- Prawdziwe zdjęcia zegarków — placeholdery czekają na podmianę
- Numery telefonów i dane kontaktowe — oznaczone `// TODO`
- Treść polityki prywatności i regulaminu — strony placeholder gotowe
- WhatsApp numer — oznaczony `// TODO`

---

*Ostatnia aktualizacja: kwiecień 2026*
