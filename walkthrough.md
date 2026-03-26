# Scroll-Driven Video Transition Walkthrough

## Co zrobiliśmy?

W ramach tego zadania dodaliśmy nową, luksusową sekcję na stronie głównej (zaraz pod nagłówkiem Hero), która płynnie przechodzi między dwoma obrazami za pomocą osadzonego wideo sterowanego postępem przewijania (scroll).

### Główne wdrożenia:

1. **Zarządzanie plikami**: 
   - Przenieśliśmy nowe pliki multimedialne ([1.png](file:///c:/Users/212ka/source/repos/warszawskiczas/apps/website/assets/1.png), [vidu-video-3222913456681169.mp4](file:///c:/Users/212ka/source/repos/warszawskiczas/apps/website/assets/vidu-video-3222913456681169.mp4), [2.png](file:///c:/Users/212ka/source/repos/warszawskiczas/apps/website/assets/2.png)) do folderu publicznego (`apps/website/public/assets/`), by zoptymalizować serwowanie plików przez serwer Next.js.
   
2. **Implementacja komponentu animacji**: 
   - Stworzyliśmy nowy komponent `ScrollVideoTransition` zlokalizowany w `apps/website/components/home/`.
   - Zastosowaliśmy bibliotekę `framer-motion` (którą uprzednio zainstalowaliśmy).
   - Animacja jest w pełni responsywna, zablokowana w ramie odpowiednich maksymalnych wymiarów (tak by idealnie mieściła się w osi ekranu) bez irytujących cieni rozpraszających interakcję.
   - Płynność ruchu (scrubbing wideo) została usprawniona za pomocą funkcji `useSpring()`.

3. **Poprawki konfiguracyjne**:
   - Wyeliminowaliśmy problem uruchamiania deweloperskiego silnika Turbopack po stronie `next.config.ts`, usuwając nieobsługiwaną flagę `reactCompiler`.

4. **Katalog zmian dla deploymentu**:
   - Przekonwertowaliśmy stary plik `changes.txt` w głównym drzewie projektu do formatu `changes.md` z poprawnym kodowaniem (UTF-8).
   - Dopisaliśmy do niego na sam koniec kompletną listę nowo utworzonych oraz zmodyfikowanych w tym zadaniu plików, co ułatwi ich przyszłe wdrożenie / przepięcie w innym miejscu.

## Pliki zmodyfikowane w tej aktualizacji (dodane do `changes.md`):

- `apps/website/package.json`
- `apps/website/components/home/ScrollVideoTransition.tsx` (Nowy)
- `apps/website/app/page.tsx`
- `apps/website/next.config.ts`
- `apps/website/public/assets/1.png` (Nowy)
- `apps/website/public/assets/2.png` (Nowy)
- `apps/website/public/assets/vidu-video-3222913456681169.mp4` (Nowy)

## Faza 1, 2 i Poprawki (Premium UI Redesign)

Wdrażanie ekskluzywnej estetyki "Warszawski Czas":

### 1. Rozwiązane Problemy Techniczne:
* **Menu Mobilne (Hamburger):** Naprawiono uciążliwy błąd uniemożliwiający otwarcie menu na urządzeniach mobilnych. Zastosowano `React.createPortal`, by przenieść komponent poza hierarchię (stacking context) nagłówka, oraz usunięto błąd z zależnościami w `useEffect`, który powodował natychmiastowe zamknięcie menu tuż po kliknięciu.
* **Hero Section (Wideo):** Dodano ciemny, gradientowy obraz zastępczy (placeholder), który eliminuje problem czarnego ekranu, gdy wideo lub zewnętrzne zdjęcia (z Unsplash) są blokowane przez zabezpieczenia przeglądarek (ORB/CORS). Zachowuje to kinowy, mroczny wygląd witryny.
* **Ukryta Kolekcja (Karuzela):** Zastąpiono statyczną, nieinteraktywną siatkę ukrytą pod rozmyciem w pełni funkcjonalną, powoli przesuwającą się karuzelą za pomocą biblioteki `embla-carousel`. Potęguje to wrażenie ekskluzywności.

### 2. Szybkie Poprawki UI (Kolejna Faza):
* **Obraz Tła Hero:** Zastąpiono tymczasowy gradient głębokim zdjęciem zegarka klasy premium z Unsplash, pobranym i osadzonym lokalnie w `public/hero-bg.jpg`. Zapobiega to jakimkolwiek błędom ORB/CORS i w pełni ukazuje efekt kinowego, mrocznego "Dior" na tekście powitalnym.
* **Kontrast Nagłówka (Podstrony):** Rozwiązano problem z niewidocznymi linkami nagłówka na podstronach, które cechują się jasnym tłem (np. `/produkty`). Kiedy użytkownik jest poza stroną główną (`/`), pasek nawigacyjny wymusza stan `isSolid`, serwując od razu twarde tło oraz odpowiednio skontrastowany ciemny font.
* **Wideo Rolex Datejust (Hero):** W odpowiedzi na prośbę o "fajny, ostry zegarek", wdrożono lokalne nagranie wideo `rolex.mp4`. Zastosowano bezpośrednio na tag `<video>` filtry nasycające i podbijające kontrast (`saturate(1.2) contrast(1.15)`). Aby zapobiec zlewaniu się jasnego zegarka z tekstem i nawigacją, zaimplementowano zaawansowany wielowarstwowy system masek gradientowych: mocna winieta węzłowa (`radial-gradient`), ściemnienie w tle przycisków CTA oraz zabezpieczenie nawigacji od góry (gradient pionowy `from-black/95`).

### 3. Dowody Wdrożenia (Weryfikacja Wizualna):
* **Potwierdzenie Sukcesu Menu Mobilnego:** 
![Mobile Menu Success](file:///C:/Users/212ka/.gemini/antigravity/brain/c454f02c-bfe1-4f3d-97ce-219c00f5df0e/mobile_menu_success_1774561539414.png)
* **Zabezpieczenie Kontrastu Nagłówka na Podstronach (np. /produkty):**
![Header /produkty Contrast Desktop](file:///C:/Users/212ka/.gemini/antigravity/brain/c454f02c-bfe1-4f3d-97ce-219c00f5df0e/header_produkty_success_desktop_1774562066181.png)
* **Wizualizacja Wideo Rolex (Kinowy Filtr & Maski):**
![Rolex Datejust Video Rendering](file:///C:/Users/212ka/.gemini/antigravity/brain/c454f02c-bfe1-4f3d-97ce-219c00f5df0e/rolex_hero_success_1774564127449.png)
