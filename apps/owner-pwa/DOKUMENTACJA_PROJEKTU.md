# Dokumentacja projektu Owner PWA

## Cel

Owner PWA to prosta aplikacja do organizacji nagrań. Jej główny przepływ to:

scenariusz roboczy -> recenzja właściciela -> poprawki albo akceptacja -> gotowość do nagrania -> nagrany materiał.

Projekt ma pozostać narzędziem pracy dla małego zespołu, nie rozbudowanym CRM-em.

## Stack

- Next.js 16 App Router
- React 19
- Prisma 7
- MariaDB/MySQL przez `@prisma/adapter-mariadb`
- Tailwind CSS 4
- `next-themes`
- `jose` dla sesji JWT
- `bcryptjs` dla haseł
- `tsx --test` dla testów domenowych

## Najważniejsze katalogi

- `src/components/owner-workspace.tsx` - główny interfejs aplikacji.
- `src/domain/workflow.ts` - statusy scenariusza, etykiety i dozwolone przejścia.
- `src/domain/permissions.ts` - role, status konta, permissions i helpery.
- `src/domain/password.ts` - wspólne reguły haseł i loginów.
- `src/lib/api-guard.ts` - centralna autoryzacja i kontrola same-origin dla akcji.
- `src/lib/audit.ts` - zapis audit logu.
- `src/lib/notifications.ts` - tworzenie powiadomień wewnętrznych.
- `prisma/schema.prisma` - model danych.
- `src/proxy.ts` - ochrona tras w Next 16.

## Model danych

`Scenario` zawiera tytuł, treść, notatkę dla właściciela, status, priorytet, wersję, autora, recenzenta, opcjonalny termin i miejsce na przyszłe załączniki.

`ScenarioComment` przechowuje komentarze oraz recenzje właściciela w jednym ciągu pod scenariuszem.

`ScenarioActivity` zapisuje oś czasu zmian scenariusza.

`Notification` przechowuje powiadomienia wewnątrz aplikacji.

`Invitation` zastępuje globalny kod rejestracji.

`AuditLog` zapisuje ważne zmiany: statusy, komentarze recenzji, role i usunięcia.

`User` ma osobno `role` i `accountStatus`; `pending` nie jest rolą.

## Statusy scenariusza

- `draft` - wersja robocza.
- `in_review` - do recenzji właściciela.
- `changes_requested` - poprawki.
- `accepted` - zaakceptowany.
- `ready_to_record` - gotowy do nagrania.
- `recorded` - nagrany.
- `archived` - archiwum bez usuwania danych.

Przejścia są walidowane po stronie serwera w `workflow.ts`.

## Role

- `owner` - pełna kontrola, decyzje, zespół, zaproszenia.
- `editor` - tworzenie i poprawianie scenariuszy, wysyłka do recenzji, oznaczanie nagrań.
- `viewer` - podgląd.

Statusy konta:

- `active`
- `pending`
- `suspended`

## Główne ekrany

`Dzisiaj` pokazuje bieżącą pracę: decyzje właściciela, poprawki, gotowe nagrania i ostatnie aktywności.

`Scenariusze` pokazuje listę z filtrami statusów, sortowaniem po aktywności albo terminie i kartami z następną akcją.

`Nagrania` skupia zaakceptowane, gotowe do nagrania i nagrane materiały.

`Więcej` zawiera powiadomienia, ustawienia, zespół i wylogowanie.

## Gesty i PWA

- Swipe z lewej krawędzi zamyka aktywny panel, ale przycisk **Wróć** zawsze zostaje widoczny.
- Dolny panel można przeciągnąć w dół.
- Listy mają pull-to-refresh.
- Karty mają swipe action jako skrót do widocznej akcji.
- Manifest opisuje realny produkt.
- Service worker daje prosty ekran offline.
- Zoom użytkownika nie jest blokowany.

## API

Najważniejsze endpointy:

- `GET /api/scenarios`
- `POST /api/scenarios`
- `GET /api/scenarios/[id]`
- `PUT /api/scenarios/[id]`
- `DELETE /api/scenarios/[id]` - archiwizuje zamiast usuwać.
- `PATCH /api/scenarios/[id]/status`
- `POST /api/scenarios/[id]/comments`
- `GET /api/notifications`
- `PATCH /api/notifications/[id]`
- `GET /api/users`
- `PUT /api/users/[id]`
- `DELETE /api/users/[id]`
- `GET /api/invitations`
- `POST /api/invitations`

## Komendy

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run postinstall
npx prisma db push
```

`npx prisma db push` wymaga działającego połączenia z bazą skonfigurowaną w `.env`.

## Testy

Testy domenowe są w `src/domain/*.test.ts` i chronią:

- reguły haseł,
- normalizację ról i statusu konta,
- blokadę recenzowania własnej pracy,
- najważniejsze przejścia workflow.

## Decyzje architektoniczne

- MVP ma jeden główny workflow scenariusza.
- Komentarze i historia są osobnymi bytami.
- `feedback` pozostał w schemacie jako pole legacy, żeby nie kasować starych danych przy aktualizacji bazy.
- `archived` nie usuwa danych.
- Web Push, załączniki, kalendarz i szablony są celowo poza MVP.
