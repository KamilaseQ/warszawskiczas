# Owner PWA - Warszawski Czas

Prosta aplikacja PWA do organizacji nagrań: scenariusze, recenzje właściciela, poprawki, akceptacja i oznaczanie materiału jako nagranego.

## Start

```bash
npm install
npm run postinstall
npm run dev
```

## Jakość

```bash
npm run lint
npm run test
npm run build
```

## Baza danych

Schemat jest w `prisma/schema.prisma`.

```bash
npx prisma db push
```

Szczegóły są w `DOKUMENTACJA_PROJEKTU.md`, a krótka instrukcja obsługi w `INSTRUKCJA_OBSLUGI.md`.
