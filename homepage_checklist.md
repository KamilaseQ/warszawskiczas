# Checklista Ulepszeń Homepage — Warszawski Czas

> **Instrukcja:** Pod każdym punktem jest linia `> 💬` — wpisz tam swój komentarz (np. "OK", "usunąć", "zmienić na X", "na potem").
> Po zakończeniu zapisz plik (Ctrl+S), a potem wróć do czatu.

---

## 🏠 HERO

### 🟢 Na już

**H1.** `[ ]` **Scroll indicator = link** — Kliknięcie w "PRZEWIŃ" + ChevronDown powinno płynnie przewijać do sekcji ProductShowcase, nie jest to teraz aktywne
> 💬 OK

**H2.** `[ ]` **Kursor na scroll indicator** — zmienić `cursor-default` na `cursor-pointer`
> 💬 OK

**H3.** `[ ]` **Tekst H1 — głębszy przekaz** — Zmiana `Luksusowe Zegarki` na coś bardziej markowo unikalnego, np. `Czas, który definiuje` lub `Zegarki. Warszawa. Elegancja.`
> 💬 H1 musi pozostać bardzo klarowne. Urzytkownik ma od razu wiedzieć co to za strona. Nie upieram się że musi być dokładnie takimi słowami ale ma być bardzo bezpośrednio. Podtytuł może być bardziej urozmaicony (dobry pod SEO)

**H4.** `[ ]` **Podtytuł w Hero — duplikacja** — Adres "Mokotowska 71" pojawia się zarówno w złotym kaptexcie nad H1, jak i w podtytule poniżej — jedno z tych miejsc powinno pełnić inną rolę
> 💬 Niech zostanie w eyebrow Mokotowska 71. W podtytule zostańmy przy Warszawie i innych rzeczach (ale już ebz ulicy aby nie było dublowania).

**H5.** `[ ]` **H1 — wyrównanie na mobile** — Na 375px H1 łamie się nieelegancko; warto dodać mniejszy breakpoint np. `text-4xl` na najwęższych ekranach
> 💬 OK

### 🔵 Docelowe

**H6.** `[ ]` ⭐ **Hero — video zbyt niebieski/chłodny** — Kolor tła video wydaje się filtrowany niebieskawym tłem; sprawdzić `mix-blend-mode` lub `hue-rotate`
> 💬 To może być kwestia nagrania. Na razie nie ruszamy ale zapamiętaj że w przyszłości warto by było to poprawić.

**H7.** `[ ]` **Hero — pozycja pionowa contentu** — Tekst Hero na desktop w górnej trzeciej strony zamiast w centrum viewportu; sprawdzić czy zamierzone
> 💬 OK Wdrażamy

**H8.** `[ ]` **Hero — hierarchia CTA** — Rozważyć wariant gdzie jeden przycisk PRIMARY (biały filled) a drugi TERTIARY (tylko tekst + strzałka)
> 💬 OK Wdrażamy

**H9.** `[ ]` **Hero — animacja parallax na title przy scroll** — Lekki efekt parallax (tytuł przesuwa się wolniej niż tło)
> 💬 OK Wdrażamy

---

## 📺 PRODUCT SHOWCASE (Kolekcja)

### 🟢 Na już

**PS1.** `[ ]` ⭐ **Placeholder cards — SVG zegarka zbyt mały** — Placeholder powinien być bardziej elegancki — np. duże logo marki jako tekst, lub subtelny wzór tekstury
> 💬 To tylko placeholder. Potem dodam tam zdjęcia

**PS2.** `[ ]` **Label "EKSKLUZYWNY" — animacja pulse** — `animate-pulse` jest nieprofesjonalne dla luxury brand; zastąpić statycznym ozdobnym znaczkiem
> 💬 Usuwamy te labele chyba mi się nie podobają. Zapamiętaj że to jest ciekawa opcja aby potem dodać

**PS3.** `[ ]` **Nawigacja karuzeli — strzałki** — Przyciski strzałek kwadratowe i mało wyraźne; dodać wyraźniejszy hover state (np. tło złote)
> 💬 OK

**PS4.** `[ ]` **Progress dots na mobile zbyt małe** — Kreski nawigacyjne `h-0.5` — zwiększyć hit area do minimum 44px
> 💬 W progress dots chyba i tak się nie klika to ma być forma animacji i pokazania że jest to ruchome. Niech będzie widoczny progres.

**PS5.** `[ ]` **"ZAPYTAJ" link — za mało wyraźny CTA** — Tekst prawie niewidoczny w `text-muted-foreground/60`
> 💬 OK

### 🔵 Docelowe

**PS6.** `[ ]` ⭐ **Zdjęcia produktów — najwyższy priorytet** — SVG placeholder psuje premium feel; tymczasowo użyć stockowych zdjęć zegarków
> 💬 Potem wstawie swoje zdjęcia. Pamietaj tylko o tym że mam to potem dodać.

**PS7.** `[ ]` **Animacja karuzeli — wejście aktywnej karty** — Karta centralna mogłaby delikatnie "oddychać" (scale 1.0 → 1.02)
> 💬 Dobry pomysł tylko pamiętaj że napis marki też musi oddychać aby karta nie nachodziła na napis i go nie zasłaniała. Wdrażamy

**PS8.** `[ ]` **Header sekcji — numeracja edytorska** — Konsekwentne `I, II, III, IV...` dla spójnego rytmu narracyjnego
> 💬 Zapamiętaj że to jest fajna opcja nie róbmy tego teraz.

**PS9.** `[ ]` **Karty — więcej info przy hover na desktop** — Pokazać rok produkcji, materiał koperty itp.
> 💬 Nie. Dodatkowe informacje mają być jak ktoś wejdzie w ten zegarek. (Przejdzie do oferty).

---

## 🏛️ BRAND POSITIONING (Butik z charakterem)

### 🟢 Na już

**BP1.** `[ ]` ⭐ **Ikony w kółkach — styl `accent-green`** — Zielone kółeczka wyglądają jak SaaS; zastąpić złotymi lub dużymi numerami (01, 02, 03)
> 💬 OK

**BP2.** `[ ]` **Heading "Butik z charakterem"** — Wycentrowany H2 wygląda jak template; rozważyć left-aligned z editorial label
> 💬 Zrób tak aby było ładnie i komponowało się z resztą strony.

**BP3.** `[ ]` **Tekst "więcej niż sklep z zegarkami"** — Generyczny copy; zastąpić czymś bardziej charakterystycznym
> 💬 OK

**BP4.** `[ ]` **Grid 3 kolumn — brak wizualnego separatora** — Na mobile brak rytmu; użyć dużych liczb (01, 02, 03) z linią gold
> 💬 OK albo inny układ tak aby był spójny z całością.

### 🔵 Docelowe

**BP5.** `[ ]` **Wariant split layout** — Lewa strona editorial quote, prawa 3 wartości — bardziej premium asymetria
> 💬 OK Wdrażamy od razu

**BP6.** `[ ]` **Separator na dole sekcji** — Zastąpić `<Separator />` cienką złotą linią
> 💬 OK Wdrażamy od razu

---

## 🔒 HIDDEN COLLECTION TEASER (Dostępne na zapytanie)

### 🟢 Na już

**HC1.** `[ ]` **Badge "Kolekcja ekskluzywna"** — Wygląda jak outlined button; powinien być subtelniejszy — sam tekst uppercase złoty, bez obramowania
> 💬 OK

**HC2.** `[ ]` **Tekst "(Zabezpieczone)"** — Brzmi technicznie; zastąpić np. `Tylko dla naszych klientów` lub `Na indywidualne zapytanie`
> 💬 OK

**HC3.** `[ ]` **Lock overlay — kolor tła** — Czarne `rgba(10,10,10,0.8)` zbyt dosłowne; użyć ciemnej zieleni lub charcoal
> 💬 ziemna zieleń

**HC4.** `[ ]` **Placeholder karuzela w tle** — Watch icons SVG za duże i zbyt czytelne przez blur
> 💬 Blur będzie dopiero w podstronie ukryta kolekcja. Tutaj wszystkie karuzele i inne rzeczy są zbędne. Ta sekcja to jest teaser aby ktoś wszedł na dedykowaną podstronę. Może być zdjęcie z jakimś podpisem (zamiast placeholdera) lekko magazynowy styl, albo jakiś inny układ który będzie dobrze komponował się z resztą strony. 

### 🔵 Docelowe

**HC5.** `[ ]` ⭐ **Layout split — kolejność mobilna** — Rozważyć obraz prawostronny na desktop żeby CTA button był naturalniej dostępny
> 💬 OK Wdrażamy od razu

**HC6.** `[ ]` **Animacja lock — przy scroll-into-view** — Kłódka zatrzaskuje się lub miga przy scroll
> 💬 Zobacz tylko gdzie teraz miałaby być ta kłódka skoro zmieniamy design (to co napisałem wyzej)

**HC7.** `[ ]` **CTA button — wariant gold** — Rozważyć `.btn-premium-gold` dla lepszego kontrastu
> 💬 OK Wdrażamy od razu

---

## 🔧 SERVICES OVERVIEW (Usługi eksperckie)

### 🟢 Na już

**SO1.** `[ ]` ⭐ **Ikony usług — styl `accent-green` w kwadratach** — Identyczny problem jak w Brand Positioning; zmienić na złote lub numeryczne
> 💬 OK

**SO2.** `[ ]` **Heading "Usługi eksperckie" — wycentrowany** — Brak editorial label; spójny system nagłówków
> 💬 OK

**SO3.** `[ ]` **Card hover — `hover:border-accent-green/30`** — Powinien być złoty (`accent-gold`)
> 💬 OK

**SO4.** `[ ]` **Link "Dowiedz się więcej →"** — Zielony kolor; zmienić na gold lub foreground
> 💬 OK

**SO5.** `[ ]` **Odstęp po sekcji** — Brak wizualnego oddechu/separatora przed BoutiquePreview
> 💬 OK

### 🔵 Docelowe

**SO6.** `[ ]` **Alternatywny layout poziomy** — Horyzontalne listy z numerami i accordion — bardziej editorial
> 💬 OK

**SO7.** `[ ]` **Dodać kategorię "Biżuteria"** — Jeśli boutique zajmuje się biżuterią, powinna być odrębna karta
> 💬 OK ale my biżuterie głównie sprzedajemy więc to musiałoby być jakoś smooth zawarte w usługach. Pamiętaj że wtedy też w navbarze musi być.

---

## 🏙️ BOUTIQUE PREVIEW (Odwiedź nasz butik)

Komentarz do całej sekcji: To ma być sekcja połączona z Mokotowska 71. Odwiedź nasz butik trochę o nim itp. Tamtą sekcję przenieś tutaj i je połącz razem. (Robimy jedną wspólną sekcję a nie dwie oddzielne)

### 🟢 Na już

**BV1.** `[ ]` ⭐ **Visual placeholder — szary prostokąt** — Największe puste miejsce na stronie; potrzebuje zdjęcia butiku
> 💬 Będzie zdjęcie spokojnie

**BV2.** `[ ]` **Dekoracyjna ramka** — Zielona ramka `border-accent-green/20` ledwo widoczna; zmienić na `accent-gold/30`
> 💬 OK

**BV3.** `[ ]` **Telefon placeholder "+48 123 456 789"** — Wymaga prawdziwego numeru
> 💬 + 48 604 501 000

**BV4.** `[ ]` **Button "Więcej o butiku"** — Nie respektuje `.btn-sharp`/`.btn-premium-white`; zunifikować
> 💬 OK

**BV5.** `[ ]` **Godziny otwarcia — format** — Pipes `|` mało eleganckie; użyć `·` separatora
> 💬 Na oddzielne linie

### 🔵 Docelowe

**BV6.** `[ ]` ⭐ **Mapa / Location embed** — Google Maps embed ze stylizowanym dark/sepia theme
> 💬 Tak zrobimy.

**BV7.** `[ ]` **Wideo z butiku** — Krótkie 10s video autoplay bez sound
> 💬 W przyszłości tak zrobimy

---

## 📊 TRUST SIGNALS (Sygnały zaufania)

Komentarz do całej sekcji: Ta sekcja ma być trochę rozszerzona o proces jaki mamy przy np. zakupie (albo jakieś wartości). Ma być dobrze sprzedażowo i rozwiewać obiekcje. Połączenie procesu i trust ma dawać odbiorcy wrażenie że ludzie ufają naszemu procesowi. (nie rozbijaj na dwie sekcje)

### 🟢 Na już

**TS1.** `[ ]` **Dane liczbowe — weryfikacja** — `15+ lat`, `500+ klientów`, `100% weryfikacja` — prawdopodobnie placeholdery; wymagają weryfikacji
> 💬 

**TS2.** `[ ]` **Cytaty " w trust-card** — Ledwo widoczna ozdoba z opacity 0.10; zrobić widoczniejszą lub usunąć
> 💬 

**TS3.** `[ ]` **Ikony w trust cards** — Złote OK, ale układ mógłby oddychać bardziej; na desktop 4 kolumny tworzą dużo pustej przestrzeni
> 💬 

### 🔵 Docelowe

**TS4.** `[ ]` ⭐ **Opinie klientów (testimonials)** — Brakuje kluczowego elementu lejka; 2-3 cytaty od klientów
> 💬 

**TS5.** `[ ]` **Liczby — większy kontrast typograficzny** — Zwiększyć do `text-4xl lg:text-5xl`
> 💬 

---

## ✉️ FINAL CTA (Szukasz czegoś wyjątkowego?)

### 🟢 Na już

**FC1.** `[ ]` **Heading za mały** — `size="md"` za mały dla CTA; zmienić na `size="lg"` lub custom
> 💬 OK

**FC2.** `[ ]` **Dwa przyciski — hierarchia** — Nie używają `.btn-sharp`/`.btn-premium-white`; zunifikować
> 💬 OK

**FC3.** `[ ]` **Brak editorial label** — Brak numeru rzymskiego/labelu jak w Product Showcase
> 💬 Nie wiem czy to wdrożymy. Na razie bez numerków ale zapamiętaj że to może byc do dodania potem.

**FC4.** `[ ]` **Tło sekcji — `variant="muted"`** — Nie buduje nacisku; rozważyć ciemne/czarne tło z białym tekstem i złotem
> 💬 OK

### 🔵 Docelowe

**FC5.** `[ ]` ⭐ **CTA — element pilności/ekskluzywności** — Alternatywy: `Twój zegarek czeka.` / `Kolekcja zmienia się.`
> 💬 Zrób jakiś element pilności ale takie co zaproponowałeś są za chamskie. Takie bardziej sprzedażowe jak zaproponowałeś to by pasowały do Ukrytej Kolekcji.

**FC6.** `[ ]` **CTA — tło z teksturą** — Subtelna tekstura (linen, grain overlay)
> 💬 OK

---

## 🧭 HEADER & NAWIGACJA

### 🟢 Na już

**HN1.** `[ ]` **Logo — tylko tekst Playfair** — Rozważyć dodanie monogramu WC lub ikonki zegarka
> 💬 Logo dodam. Pamiętaj że muszę to dodać ale teraz nie zmieniamy

**HN2.** `[ ]` **Nav link "Kolekcja na zapytanie"** — Za długi; skrócić do `Na zapytanie`
> 💬 Zróbmy Ukryta Kolekcja albo Prywatna Kolekcja. Prywatna brzmi lepiej ale nie wiem czy nie jest myląca że ludzie pomyślą o tej sekcji jako prywatna kolekcja właściciela. Wybierz jeden z tych dwóch wariantów i zastosuj go wszędzie aby zachować spójność.

**HN3.** `[ ]` **ActiveState nav** — Green active state wygląda jak przypadkowe podkreślenie; gold jest lepszy
> 💬 OK

**HN4.** `[ ]` **Header height** — `h-16` (64px) ciasne; premium butiki mają 72-80px
> 💬 Okej poprawiamy.

### 🔵 Docelowe

**HN5.** `[ ]` **Telefon w Header jako klikalne CTA** — Bardziej prominentny, hover z podkreśleniem/złotem
> 💬 OK

**HN6.** `[ ]` **Dropdown "Usługi" — styl menu** — Glassmorphism albo delikatna złota linia zamiast border
> 💬 OK

**HN7.** `[ ]` **Mobile menu — styl hamburgera** — Editorial wersja (3 linie z różnymi długościami) lub animowana morph do X
> 💬 Oba pomysły są dobre. Wybierz który będzie lepszy. Albo je połącz razem i zrób z tego jakąś fajną animację.

---

## 🦶 FOOTER

### 🟢 Na już

**FT1.** `[ ]` **Footer linki — hover na zielony** — Zmienić na `hover:text-accent-gold`
> 💬 OK

**FT2.** `[ ]` **Section headings — uppercase tracking** — Wzmocnić do `text-[10px] tracking-[0.4em]`
> 💬 OK

**FT3.** `[ ]` **Brand column — brak wyróżnienia Mokotowska 71** — Adres powinien być zaprojektowany inaczej
> 💬 OK

**FT4.** `[ ]` **Copyright line** — Zbyt korporacyjne; zmienić na np. `Warszawski Czas — Mokotowska 71, Warszawa`
> 💬 OK

### 🔵 Docelowe

**FT5.** `[ ]` **Footer — wariant dark** — Dark background dla lepszego kontrastu
> 💬 Okej możemy sprawdzić. Pamiętaj tylko aby zmienić kolory tekstów które się na nim znajdują aby wszystkie elementy były widoczne.

**FT6.** `[ ]` **Footer — social media** — Instagram i Facebook linki
> 💬 Mamy IG tiktok FB.

**FT7.** `[ ]` **Footer — dekoracyjne elementy** — Złota linia, monogram, pattern
> 💬 Dobry pomysł

---

## 📐 GLOBALNY SYSTEM TYPOGRAFICZNY

### 🟢 Na już

**TY1.** `[ ]` ⭐ **Niespójność H2 headingów** — Połowa centered, połowa left-aligned; zdecydować jeden system
> 💬 Posprawdzaj co lepiej wygląda. Zrób tak aby cała strona ładnie wyglądała jeżeli raz lewo raz środek dobrze by wygladały jako element kompozycji to nie musi być jednolicie ale jak źle to zrób jednolicie. Ma się przede wszystkim ładnie komponować (i na Desktop i na mobile).

**TY2.** `[ ]` **Rozmiary fontów — brak skali** — Proporcje OK ale powinny być udokumentowane i konsekwentne
> 💬 Znowu zrób tak aby była to ładna kompozycja.

**TY3.** `[ ]` **Font weight inconsistency** — `font-semibold` (600) vs `font-medium` (500) — zdecydować
> 💬 Tak aby była ładna kompozycja

### 🔵 Docelowe

**TY4.** `[ ]` **Trzecia czcionka — ozdobna** — Np. `Cormorant Garamond` dla pull quotes i callout'ów
> 💬 Tak dobry pomysł. Możesz nawet pozmieniać stare (nie musisz) czcionki mają być elementem kompozycji (ciekawej nietypowej ale premium).

**TY5.** `[ ]` **System labelów sekcji** — Konsekwentny `[NUMER ROMANS] —— [LABEL UPPERCASE GOLD]`
> 💬 Nie jestem jeszcze przekonany. Zrób tak aby była to ładna kompozycja.   

---

## 🎨 PALETA KOLORÓW I BRAND SYSTEM

### 🟢 Na już

**CL1.** `[ ]` **`accent-green` vs `accent-gold` — role** — Green = background/anchor, gold = accent/CTA/hover; ujednolicić
> 💬 OK

**CL2.** `[ ]` **Spójność gold w hover states** — Ikony w Brand Positioning i Services używają green zamiast gold
> 💬 OK

**CL3.** `[ ]` **`--accent-gold` wartość** — `hsl(46, 65%, 52%)` może wyglądać "cheap yellow"; stonować do `hsl(42, 50%, 45%)`
> 💬 OK

### 🔵 Docelowe

**CL4.** `[ ]` **Dark mode** — Przynajmniej niektóre sekcje (Hero, CTA) dark
> 💬 OK niech będzie hero CTA i Stopka 

**CL5.** `[ ]` **Grain/texture overlay** — Subtelna tekstura ziarna na tłach muted sekcji
> 💬 OK

---

## 📱 MOBILE — SPECYFICZNE PROBLEMY

### 🟢 Na już

**MB1.** `[ ]` **Hero na mobile — proporce przycisków** — Ciasno; więcej powietrza lub jedna pod drugą
> 💬 Więcej powietrza i unikamy że na mobile strona wygląda jak jedna długa lista. Musi się coś dziać

**MB2.** `[ ]` **Carousel na mobile — zbyt wysoka karta** — Rozważyć aspect ratio 4/5
> 💬 Karuzela może być pojedyńcza ale musi być mniejsza. Nie może być tak wysoka że zajmuje prawie cały ekran.

**MB3.** `[ ]` **Nav mobile — brak kontaktu w menu** — Telefon powinien być bezpośrednio dostępny w hamburger menu
> 💬 OK

**MB4.** `[ ]` **Scroll indicator na mobile** — Zdublowana z desktop; zmniejszyć visual weight
> 💬 OK

### 🔵 Docelowe

**MB5.** `[ ]` ⭐ **Mobile sticky CTA bar** — Sticky bar z `Zadzwoń` i `Napisz do nas`
> 💬 Na razie zapisz jako dodatkowe ale z wysokim priorytetem do wdrożenia (nie chce teraz robić wszystkiego na raz ale pewnie jak będziemy dodawaćzdjęcia dodamy też to)

**MB6.** `[ ]` **Brand Positioning grid na mobile** — Lepiej jako 2+1 z liniami poziomymi
> 💬 Musi być czytelnie ciekawie i nie może być tak że jest to jedna długa lista. Musi się coś dziać.

---

## 🐛 BŁĘDY TECHNICZNE

### 🟢 Na już

**BT1.** `[ ]` ⭐ **"1 Issue" badge** — Błąd hydrationowy `antigravity-scroll-lock`; eliminować przed launch
> 💬 OK

**BT2.** `[ ]` **Favicon — brak** — Dodać SVG favicon (tarcza zegarka lub monogram WC)
> 💬 Dodamy potem ale zrobimy. Ustaw priorytet wdrożenia taki jak na obrazki itp.

**BT3.** `[ ]` **Telefon placeholder** — `+48 123 456 789` wymaga wymiany na prawdziwy numer
> 💬 OK podałem już.

**BT4.** `[ ]` **Email placeholder** — `kontakt@warszawskiczas.pl` — weryfikacja z właścicielem
> 💬 biuro@warszawskiczas.pl

---

## ✨ MICRO-INTERACTIONS I ANIMACJE

### 🔵 Docelowe

**MI1.** `[ ]` **FadeIn — konsekwentność** — Ujednolicić animacje wejścia sekcji przy scroll
> 💬 Wszędzie tam gdzie jest to możliwe. Nie może być tak że raz jest a raz nie ma. Musi być spójne.

**MI2.** `[ ]` **Hover state na kartach usług** — Dodać elevation (`box-shadow`) lub przesunięcie 2px w górę
> 💬 OK

**MI3.** `[ ]` **Scroll-triggered number counter** — Liczby trust signals animują się licznik-stylem
> 💬 OK

**MI4.** `[ ]` **Gold shimmer effect** — Subtelny shimmer na złotych elementach przy hover
> 💬 OK

---

## 🔍 SEO I STRUKTURA

### 🟢 Na już

**SE1.** `[ ]` **Meta viewport themeColor** — Zmienić z `#1B4332` na `#faf9f7` dla iOS status bar
> 💬 OK

**SE2.** `[ ]` **Open Graph — brak image** — Potrzebuje OG image 1200x630
> 💬 Dam Ci razem z innymi zdjęciami. Pamiętaj 

**SE3.** `[ ]` **Heading hierarchy** — OK, sprawdzić czy brak zduplikowanych H2
> 💬 OK

### 🔵 Docelowe

**SE4.** `[ ]` **Structured data / Schema.org** — JSON-LD `LocalBusiness` z adresem i godzinami
> 💬 OK

**SE5.** `[ ]` **Alt texty** — Opisowe alt texty przy prawdziwych zdjęciach
> 💬 OK

---

> **Legenda:** ⭐ = Priorytet najwyższy | 🟢 = Quick win | 🔵 = Strategiczne
>
> **Jak komentować:** Wpisz swój komentarz po `💬` w każdym punkcie, np:
> - `OK` — punkt zatwierdzony, do wdrożenia
> - `usunąć` — punkt nieistotny, wyrzucić
> - `na potem` — przenieść do sekcji "do wdrożenia potem"
> - `zmienić: [twoja uwaga]` — modyfikacja treści punktu
> - `NOWE:` — nowy punkt do dodania
