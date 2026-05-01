# Agent Notes - owner-pwa

Aktywnym produktem w tym katalogu jest `apps/owner-pwa`.

## Domena

Owner PWA wspiera mały zespół Warszawskiego Czasu w organizacji nagrań:

- scenariusze,
- recenzje właściciela,
- poprawki,
- oznaczanie gotowości do nagrania,
- oznaczanie materiału jako nagranego,
- zadania przyszłościowe,
- powiadomienia wewnętrzne.

## Zasady pracy

- Pracuj w pierwszej kolejności nad `apps/owner-pwa`.
- Nie kieruj agenta do przebudowy innych modułów repozytorium, jeśli zadanie dotyczy Owner PWA.
- Utrzymuj prostotę: to narzędzie dla małego zespołu, nie CRM ani system projektowy.
- Nowe moduły projektuj jako osobne granice domenowe, ale nie wdrażaj ich w MVP bez wyraźnej potrzeby.
- Centralne definicje statusów są w `src/domain/workflow.ts`.
- Centralne role i uprawnienia są w `src/domain/permissions.ts`.
- Route handlery zmieniające dane powinny korzystać z `src/lib/api-guard.ts`.
- Historia scenariusza i audit log nie są dodatkiem kosmetycznym; są częścią procesu decyzyjnego.

## Next.js

Projekt używa Next 16. Zamiast `middleware.ts` używany jest `src/proxy.ts`.
