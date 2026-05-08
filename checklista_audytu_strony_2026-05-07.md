# Checklista audytu i wdrozenia poprawek - Warszawski Czas

Data aktualizacji: 2026-05-07  
Aplikacja: `apps/website`  
Stan: po wdrozeniu poprawek P0-P2 z wyjatkami wskazanymi przez uzytkownika.  
Wyjatki: nie zmieniano `ACCESS_CODE = 'WC2024'`, nie podlaczano formularzy do backendu, nie wdrazano pozycji P3.

## Testy wykonane po wdrozeniu

- [x] `npm run lint` w `apps/website` - przechodzi.
- [x] `npm run build` w `apps/website` - przechodzi, build produkcyjny wygenerowal 32 trasy statyczne/SSG.
- [x] Regresja produkcyjnego builda na `http://127.0.0.1:3010` przez Playwright.
- [x] Desktop Chrome: kolejnosc przejscia `/` -> `/produkty`.
- [x] Desktop Chrome: klikniecie linku do tej samej podstrony nie uruchamia falszywej kurtyny.
- [x] Desktop Chrome: klikniecie pod aktywna kurtyna jest blokowane.
- [x] Desktop Chrome: `Back` podczas przejscia nie zostawia zawieszonej kurtyny.
- [x] No-JS: loader startowy nie blokuje strony.
- [x] Mobile Chrome i Mobile WebKit: brak poziomego overflow oraz brak requestu `/rolex.mp4`.
- [x] Mobile overlay: menu blokuje scroll i przywraca go po zamknieciu.
- [x] Sprawdzenie zakresu wyjatkow: `WC2024` pozostaje bez zmian, formularze pozostaja front-endowe.

## Dziala po poprawkach

### P0 - krytyczne

- [x] Rzeczywista kolejnosc przejscia miedzy podstronami jest intuicyjna.
  - Kurtyna pojawia sie przed zmiana trasy i tresci.
  - Pomiar regresji: pierwsza kurtyna ok. `53 ms`, tresc celu i zmiana widoku ok. `879 ms`, zdjecie kurtyny ok. `2410 ms`.

- [x] Kurtyna przejscia blokuje interakcje pod spodem.
  - `pointer-events` na aktywnym ekranie przejscia: `auto`.
  - Test `elementFromPoint` trafia w warstwe kurtyny, nie w link pod spodem.

- [x] Szybkie/back nawigacje nie zostawiaja strony w stanie wyscigu.
  - Test `Back` podczas przejscia konczy sie bez aktywnej kurtyny.
  - Kolejne klikniecia podczas aktywnej kurtyny nie uruchamiaja rownoleglych przejsc.

### P1 - wysokie

- [x] Loader startowy ma fallback bez JavaScript.
  - Przy wylaczonym JS `.wc-loading-screen` ma `display: none`, a tresc strony jest dostepna.

- [x] Poziomy overflow na stronie glownej zostal usuniety w testowanych viewportach.
  - Mobile Chrome: `scrollWidth - clientWidth = 0`.
  - Mobile WebKit: `scrollWidth - clientWidth = 0`.
  - Desktop test przejscia: `scrollWidth = clientWidth`.

- [x] Ciasne teksty statystyk na mobile zostaly poluzowane.
  - Uklad ponizej bardzo waskich viewportow przechodzi na jedna kolumne.
  - Zmniejszono tracking i dodano zabezpieczenia lamaniem tekstu.

### P2 - srednie

- [x] Hero na mobile nie pobiera niepotrzebnie desktopowego wideo.
  - Mobile Chrome: `mediaRequests = []` dla `/rolex.mp4`.
  - Mobile WebKit: `mediaRequests = []` dla `/rolex.mp4`.

- [x] Scroll lock overlayow zostal ujednolicony.
  - Menu mobilne, drawer filtrow i lightbox galerii korzystaja ze wspolnego licznika blokad.
  - Zamkniecie jednego overlayu nie powinno odblokowac scrolla, gdy inny overlay nadal go wymaga.

- [x] Przejscia przy `Back` i rapid-click sa objete regresja tymczasowa.
  - Tymczasowy skrypt testowy zostal usuniety po weryfikacji, zgodnie z wymaganiem braku zmian pomocniczych w repo.

- [x] Skrypt lintujacy jest nieinteraktywny.
  - `next lint` zastapiono `tsc -p tsconfig.lint.json --noEmit --pretty false`.

## Celowo nie wdrozone

### P1 - wysokie, ale wykluczone przez uzytkownika

- [ ] Formularze nie sa podlaczone do backendu.
  - Status: celowo bez zmian.
  - Ryzyko produkcyjne: uzytkownik widzi sukces wyslania, ale dane nie trafiaja do systemu.
  - Decyzja: nie laczyc formularzy do backendu w tym wdrozeniu.

- [ ] Kod `WC2024` pozostaje front-endowym mechanizmem demonstracyjnym.
  - Status: celowo bez zmian.
  - Ryzyko produkcyjne: kod jest publiczny w bundle klienta.
  - Decyzja: nie zmieniac `WC2024` w tym wdrozeniu.

### P3 - niskie, wykluczone przez uzytkownika

- [ ] Dodac stale testy regresyjne do repo, zamiast trzymac je jako tymczasowe skrypty audytowe.
- [ ] Dalsze kosmetyczne ograniczenie dekoracji wychodzacych poza viewport na breakpointach, gdzie nie sa potrzebne.
- [ ] Przeniesc placeholdery kontaktowe i TODO do docelowej konfiguracji przed produkcja.

## Wymaga poprawy przed produkcja

- [P1] Jesli formularze maja przyjmowac realne zapytania, trzeba podlaczyc backend lub zmienic komunikaty sukcesu tak, by nie sugerowaly wyslania danych.
- [P1] Jesli kolekcja prywatna ma byc rzeczywiscie chroniona, kod dostepu musi zostac zweryfikowany poza publicznym bundle frontendu.
- [P3] Warto przeniesc najwazniejsze testy regresyjne do stalego zestawu testow CI, ale nie bylo to czescia tego wdrozenia.
