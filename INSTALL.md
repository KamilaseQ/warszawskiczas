# Instalacja Aplikacji Właściciela (Owner PWA)

## Czym jest ta aplikacja?

Aplikacja **Warszawski Czas - Panel Właściciela** to aplikacja webowa (PWA), którą można zainstalować na telefonie tak, aby działała jak natywna aplikacja — bez paska przeglądarki.

Służy do:
- Przeglądania scenariuszy do filmów
- Akceptowania lub odrzucania propozycji
- (W przyszłości) Zarządzania ofertą i innymi funkcjami

---

## Jak zainstalować na telefonie (Add to Home Screen)

### iPhone (Safari)
1. Otwórz link do aplikacji w **Safari** (nie Chrome!)
2. Kliknij ikonę **Udostępnij** (prostokąt ze strzałką w górę) na dole ekranu
3. Przewiń w dół i wybierz **„Dodaj do ekranu początkowego"**
4. Nadaj nazwę (np. „Warszawski Czas") i kliknij **„Dodaj"**
5. Aplikacja pojawi się na ekranie głównym jako ikona

### Android (Chrome)
1. Otwórz link do aplikacji w **Chrome**
2. Kliknij **trzy kropki** (menu) w prawym górnym rogu
3. Wybierz **„Dodaj do ekranu głównego"** lub **„Zainstaluj aplikację"**
4. Potwierdź — aplikacja pojawi się na ekranie głównym

---

## Jak uruchomić lokalnie (dla developerów)

```bash
# Z katalogu głównego projektu
cd apps/owner-pwa
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:3001`.

### Zmienne środowiskowe

Skopiuj plik `.env.example` do `.env` i uzupełnij dane:

```bash
cp .env.example .env
```

| Zmienna | Opis |
|---------|------|
| `ADMIN_USERNAME` | Login administratora (Ty - do dodawania scenariuszy) |
| `ADMIN_PASSWORD` | Hasło administratora |
| `OWNER_USERNAME` | Login właściciela |
| `OWNER_PASSWORD` | Hasło właściciela |
| `AUTH_SECRET` | Losowy ciąg znaków do szyfrowania sesji |

---

## Hosting

Aplikacja jest przeznaczona do hostingu na **Hostinger** (Node.js Web App hosting).
Baza danych to plik SQLite — nie wymaga zewnętrznego serwera bazodanowego.
