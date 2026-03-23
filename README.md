# Warszawski Czas — Antigravity Stack-Specific Skills Pack

Ten pakiet usztywnia projekt pod konkretny kierunek wdrożenia:

- **Website first**
- **Next.js app router**
- **Hostinger Node.js Web App hosting**
- **jedno repo (monorepo)**
- **strona + panel oferty w jednym appie website**
- **PWA właściciela później jako osobna aplikacja**

## Co jest najważniejsze
Agent ma najpierw przeczytać:
1. `.agents/project-constitution.md`
2. wszystkie pliki z `.agents/context/`
3. `.agents/skills/skill-router/SKILL.md`
4. dopiero potem konkretne skille zadaniowe

## Co usztywnia ten pakiet
- wybór stacku strony
- granice architektury
- model oferty i formularzy
- zasady premium UI
- kolejność budowy strony
- zasady deployu na Hostinger

## Główny wybór architektoniczny
Na obecnym etapie **nie rozdzielamy** strony i panelu zarządzania ofertą na osobne systemy.
Robimy:
- `apps/website` = publiczna strona + lekki panel zaplecza oferty
- `apps/owner-pwa` = później, osobna PWA właściciela

To jest celowo prostsze niż pełny CMS + osobny frontend + osobna apka. Dla Warszawski Czas to lepsze na start.
