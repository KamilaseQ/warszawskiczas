# Checklista poprawek - owner-pwa

Zakres: tylko `apps/owner-pwa`.  
Cel teraz: prosta, przyjemna aplikacja do organizacji nagrań: przesyłanie scenariuszy, recenzja właściciela, poprawki, akceptacja i oznaczanie materiału jako nagranego.  
Cel architektury: aplikacja ma być łatwa do rozbudowy, ale MVP nie może stać się ciężkim CRM-em ani systemem projektowym.

## Wnioski z researchu

- [x] Gesty mają być skrótem, nie jedyną drogą. Apple HIG zaleca, żeby standardowe akcje nadal miały widoczny przycisk, a gest był dodatkiem. W praktyce: dodajemy swipe-back, ale zostawiamy przycisk "Wróć".
- [x] Gesty muszą dawać natychmiastowy feedback. Użytkownik ma widzieć, czy gest zostanie wykonany czy anulowany.
- [x] Nie tworzyć egzotycznych gestów. Używać znanych wzorców: tap, swipe, drag, pull-to-refresh, przeciągnięcie dolnego panelu w dół.
- [x] PWA ma zachowywać się jak aplikacja, ale nadal działać w przeglądarce. Według web.dev i MDN kluczowe są: szybkość, responsywność, installability, offline/fallback i dostępność.
- [x] Uprawnienia i role muszą być zaplanowane centralnie. OWASP ostrzega, że rozproszone kontrole dostępu szybko stają się trudne do zrozumienia i audytu.
- [x] Workflow powinien być prosty i iteracyjny. Atlassian/Jira podkreśla, że zbyt dużo statusów i przejść komplikuje pracę; lepiej zacząć od lekkiego procesu i poprawiać go po realnym użyciu.
- [x] Powiadomienia powinny być użyteczne, zrozumiałe i nienachalne. MDN i Apple zalecają prosić o zgodę w odpowiednim momencie, nie na starcie, i nie wysyłać wielu powiadomień o tym samym.

Źródła do uwzględnienia przy wdrażaniu:
- Apple Human Interface Guidelines - Gestures: https://developer.apple.com/design/human-interface-guidelines/gestures
- Apple Human Interface Guidelines - Notifications: https://developer.apple.com/design/human-interface-guidelines/notifications
- web.dev - PWA checklist: https://web.dev/articles/pwa-checklist
- web.dev - Permissions best practices: https://web.dev/articles/permissions-best-practices
- MDN - PWA best practices: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Best_practices
- MDN - Web Push Notifications best practices: https://developer.mozilla.org/docs/Web/API/Push_API/Best_Practices
- OWASP - Broken Access Control: https://owasp.org/www-community/Broken_Access_Control
- OWASP - Enforce Access Controls: https://devguide.owasp.org/en/04-design/02-web-app-checklist/07-access-controls/
- Atlassian - workflow best practices: https://support.atlassian.com/jira-software-cloud/docs/best-practices-for-workflows-in-jira/

## Kierunek produktu

- [x] Krytyczne: traktować aplikację jako narzędzie codziennej organizacji nagrań, nie jako ogólny panel firmowy i nie jako rozbudowany CRM.
- [x] Krytyczne: pierwsza wersja ma obsłużyć jeden główny przepływ: scenariusz powstaje, trafia do właściciela, właściciel akceptuje albo odsyła poprawki, zespół poprawia, materiał zostaje oznaczony jako nagrany.
- [x] Krytyczne: UI ma być spokojny, szybki i oczywisty. Mniej efektów, więcej jasnych akcji.
- [x] Ważne: ciemnozielone akcenty mogą budować charakter, ale tło i tekst muszą pozostać czytelne.
- [x] Ważne: aplikacja ma być mobile-first. Desktop może być wygodniejszym wariantem tego samego systemu, a nie osobnym produktem.
- [x] Ważne: każdy ekran ma odpowiadać na jedno pytanie: "co mam teraz zrobić?".
- [x] Ważne: nie ukrywać podstawowych akcji za ikonami bez etykiety, jeśli akcja nie jest oczywista.
- [ ] Później: rozbudowa ma iść modułami: zadania, kalendarz nagrań, pliki, komentarze, powiadomienia, role, historia aktywności.

## Obecne bottlenecki w owner-pwa

- [x] Krytyczne: obecny dashboard jest kafelkowy i bardziej przypomina panel administracyjny niż ekran pracy. Trzeba go zamienić na ekran "Dzisiaj".
- [x] Krytyczne: obecny model danych `Scenario` jest za ubogi na realny proces nagrań. Brakuje autora, właściciela recenzji, terminu, komentarzy, historii decyzji, wersji i priorytetu.
- [x] Krytyczne: statusy scenariuszy są stringami bez wspólnej definicji domenowej. Trzeba mieć jedno miejsce, które opisuje statusy, etykiety i dozwolone przejścia.
- [x] Krytyczne: role i uprawnienia są rozproszone po middleware, ekranach i endpointach. Trzeba dodać centralny helper uprawnień.
- [x] Krytyczne: `pending` jest obecnie rolą, a powinno być statusem konta.
- [x] Krytyczne: ustawienia konta pobierają użytkownika w formacie innym niż zwraca endpoint `me`. Trzeba naprawić zanim ustawienia będą używane szerzej.
- [x] Krytyczne: publiczny endpoint diagnostyczny pokazuje informacje o środowisku. Powinien być ograniczony albo usunięty przed użyciem produkcyjnym.
- [x] Ważne: build przechodzi, ale Next ostrzega o konwencji `middleware`. Trzeba zaplanować migrację do aktualnej konwencji.
- [x] Ważne: aplikacja blokuje zoom użytkownika. To utrudnia dostępność i czytelność.
- [x] Ważne: wiele błędów API jest ignorowanych po cichu. Użytkownik potrzebuje stanów błędu, ponowienia i jasnej informacji co się stało.
- [x] Ważne: akcje destrukcyjne używają natywnych alertów i confirmów. To słabe na telefonie i niespójne wizualnie.
- [x] Ważne: brakuje testów dla auth, ról, scenariuszy i statusów.
- [x] Ważne: manifest nadal opisuje panel scenariuszy video bardzo ogólnie. Trzeba dopasować nazwę, opis i skróty do rzeczywistego zastosowania.

## MVP - przepływ organizacji nagrań

- [x] Krytyczne: scenariusz może zostać utworzony przez osobę z uprawnieniem do edycji.
- [x] Krytyczne: scenariusz może zostać wysłany do recenzji właściciela.
- [x] Krytyczne: właściciel widzi listę scenariuszy oczekujących na decyzję.
- [x] Krytyczne: właściciel może zaakceptować scenariusz.
- [x] Krytyczne: właściciel może odesłać scenariusz do poprawek z komentarzem.
- [x] Krytyczne: zespół widzi komentarz właściciela i może przygotować poprawioną wersję.
- [x] Krytyczne: po akceptacji można oznaczyć scenariusz jako gotowy do nagrania.
- [x] Krytyczne: po realizacji można oznaczyć materiał jako nagrany.
- [x] Ważne: każda decyzja właściciela zapisuje się w historii scenariusza.
- [x] Ważne: komentarze powinny być widoczne w jednym ciągu, nie jako pojedyncze pole `feedback`.
- [x] Ważne: scenariusz powinien mieć prostą oś czasu zmian.
- [x] Ważne: scenariusz powinien mieć pole odpowiedzialnej osoby albo autora.
- [x] Ważne: scenariusz powinien mieć opcjonalny termin nagrania albo termin recenzji, ale bez budowania ciężkiego kalendarza w MVP.
- [ ] Później: do scenariusza można dodać pliki, linki, storyboard, brief, referencje i finalny materiał.

## Prosty workflow scenariusza

- [x] Krytyczne: nazwy statusów mają opisywać stan pracy, a nie techniczny skrót.
- [x] Krytyczne: statusy mają być zrozumiałe dla właściciela bez szkolenia.
- [x] Krytyczne: nie dodawać osobnego statusu dla każdego drobnego kroku.
- [x] Proponowany kierunek statusów:
  - wersje robocze (dla edytora),
  - do recenzji,
  - poprawki,
  - zaakceptowany,
  - nagrany,
  - archiwum.
- [x] Ważne: przejścia między statusami powinny być kontrolowane przez uprawnienia.
- [x] Ważne: zmiana statusu powinna wymagać komentarza tylko tam, gdzie ma to sens, na przykład przy odesłaniu do poprawek.
- [x] Ważne: status "archiwum" nie powinien usuwać danych.
- [ ] Później: workflow może być konfigurowalny, ale nie wdrażać edytora workflow teraz.

## Nowa informacja architektoniczna

- [x] Krytyczne: zapisać w dokumentach agentów, że aktywnym produktem jest teraz `apps/owner-pwa`.
- [x] Krytyczne: dokumenty agentów nie powinny już prowadzić agenta do pracy nad innymi modułami repozytorium.
- [x] Krytyczne: dodać krótki opis domeny owner-pwa: scenariusze, recenzje, nagrania, zadania, powiadomienia.
- [x] Ważne: utrzymać prostotę. Aplikacja ma wspierać mały zespół, nie model korporacyjny.
- [x] Ważne: moduły przyszłościowe projektować jako osobne granice domenowe, ale nie wdrażać ich w MVP.

## Model danych pod rozbudowę

- [x] Krytyczne: zmienić `Scenario` w kierunku pełniejszego modelu scenariusza nagraniowego.
- [x] Krytyczne: dodać model komentarza lub recenzji.
- [x] Krytyczne: dodać model historii aktywności.
- [x] Ważne: dodać autora scenariusza.
- [x] Ważne: dodać pole terminu jako opcjonalne.
- [x] Ważne: dodać wersjonowanie scenariusza w prosty sposób.
- [x] Ważne: zostawić miejsce na załączniki bez budowania pełnego systemu plików od razu.
- [x] Ważne: trzymać definicje statusów i ról w jednym miejscu.
- [ ] Później: dodać moduł nagrań jako oddzielny byt, jeśli jeden scenariusz zacznie mieć kilka terminów albo kilka realizacji.
- [ ] Później: dodać moduł briefów kampanii, jeśli scenariusze zaczną grupować się w większe projekty.

## Ekrany MVP

### Ekran Dzisiaj

- [x] Krytyczne: pierwszy ekran po zalogowaniu ma pokazywać bieżącą pracę, nie tylko kafelki.
- [x] Krytyczne: pokazać scenariusze czekające na decyzję właściciela.
- [x] Krytyczne: pokazać scenariusze zwrócone do poprawek.
- [x] Krytyczne: pokazać scenariusze gotowe do nagrania.
- [x] Ważne: dodać krótkie "ostatnie aktywności".
- [x] Ważne: dodać jasny główny przycisk zależny od roli.
- [x] Ważne: unikać dużych statystyk jako pierwszego elementu. W aplikacji organizacyjnej ważniejsza jest lista rzeczy do zrobienia.

### Lista scenariuszy

- [x] Krytyczne: lista powinna mieć czytelne zakładki lub filtry statusów.
- [x] Krytyczne: każda karta scenariusza pokazuje tytuł, status, autora, ostatnią zmianę i najbliższą wymaganą akcję.
- [x] Ważne: filtry mają być proste i łatwo dostępne na telefonie.
- [x] Ważne: dodać sortowanie po ostatniej aktywności i terminie.
- [x] Ważne: dodać stan pusty z jasną akcją.
- [ ] Później: dodać wyszukiwarkę po tytule, autorze i treści.

### Szczegół scenariusza

- [x] Krytyczne: szczegół ma być miejscem decyzji, nie tylko podglądem tekstu.
- [x] Krytyczne: na górze pokazać status i wymaganą akcję.
- [x] Krytyczne: treść scenariusza musi być łatwa do czytania na telefonie.
- [x] Krytyczne: decyzje właściciela mają być zawsze widoczne jako główne akcje, jeśli scenariusz czeka na recenzję.
- [x] Krytyczne: komentarz do poprawek ma mieć wygodne pole tekstowe.
- [x] Ważne: historia komentarzy i decyzji ma być pod treścią, w jednym ciągu.
- [x] Ważne: po akcji pokazać toast albo potwierdzenie z możliwością cofnięcia tam, gdzie to bezpieczne.
- [ ] Później: dodać załączniki i referencje.

### Tworzenie i edycja scenariusza

- [x] Krytyczne: formularz ma być krótszy i bardziej podzielony wizualnie.
- [x] Krytyczne: tytuł i opis są podstawą.
- [x] Ważne: dodać pole notatki dla właściciela albo kontekstu nagrania.
- [x] Ważne: dodać zapis roboczy przed wysłaniem do recenzji.
- [x] Ważne: edycja zaakceptowanego scenariusza powinna tworzyć nową wersję albo wyraźnie cofać go do recenzji.
- [ ] Później: dodać szablony scenariuszy.

### Użytkownicy i role

- [x] Krytyczne: uprościć ekran użytkowników.
- [x] Krytyczne: role opisać językiem pracy, nie technicznym żargonem.
- [x] Krytyczne: nie używać `pending` jako roli.
- [x] Ważne: dodać status konta.
- [x] Ważne: dodać zaproszenia zamiast jednego globalnego kodu rejestracji.
- [x] Ważne: akcje na użytkowniku przenieść do dolnego panelu albo ekranu szczegółów.
- [ ] Później: dodać bardziej szczegółowe permissions, jeśli predefiniowane role przestaną wystarczać.

## Role i uprawnienia

- [x] Krytyczne: dodać centralny system sprawdzania uprawnień.
- [x] Krytyczne: każdy endpoint zmieniający dane ma używać tego samego mechanizmu autoryzacji.
- [x] Krytyczne: domyślnie odmawiać dostępu, jeśli permission nie jest jawnie przyznane.
- [x] Krytyczne: logować ważne zmiany uprawnień i statusów.
- [x] Proponowane role MVP:
  - właściciel,
  - edytor
  - podgląd.
- [x] Proponowane grupy uprawnień:
  - widzenie scenariuszy,
  - tworzenie scenariuszy,
  - edycja własnych scenariuszy,
  - edycja wszystkich scenariuszy,
  - wysyłanie do recenzji,
  - recenzja i akceptacja,
  - oznaczanie jako nagrane,
  - zarządzanie użytkownikami,
  - podgląd historii.
- [x] Ważne: właściciel powinien mieć pełną kontrolę, ale aplikacja musi chronić przed przypadkową utratą dostępu.
- [x] Ważne: scenarzysta nie powinien móc zaakceptować własnej pracy jako właściciel.
- [ ] Później: dodać role custom, jeśli pojawi się realna potrzeba.

## Design i UX

### Ogólny kierunek wizualny

- [x] Krytyczne: uprościć design. Mniej dekoracji, mniej gradientów, mniej dużych kart bez funkcji.
- [x] Krytyczne: zwiększyć czytelność tekstu i statusów.
- [x] Krytyczne: akcje powinny wyglądać jak akcje, a nie jak dekoracyjne elementy.
- [x] Ważne: ciemnozielony używać jako akcent dla aktywnych stanów, głównych akcji i statusów pozytywnych.
- [x] Ważne: tła powinny być spokojne, najlepiej ciemne albo jasne neutralne, ale nie przesadnie kontrastowe między ekranami.
- [x] Ważne: karty powinny być bardziej użytkowe: tytuł, status, następny krok, szybka akcja.
- [x] Ważne: ikony używać konsekwentnie i tylko tam, gdzie pomagają w skanowaniu.
- [ ] Później: dodać opcję motywu innego, jeśli właściciel realnie będzie jej używał. Możemy zrobić jasny motyw domyślny

### Kontrast i czytelność

- [x] Krytyczne: umożliwić zoom użytkownika.
- [x] Krytyczne: podnieść kontrast tekstów drugorzędnych.
- [x] Krytyczne: główne treści scenariusza nie mogą być małym, wyciszonym tekstem.
- [x] Ważne: status nie może być rozpoznawalny tylko po kolorze.
- [x] Ważne: focus keyboard musi być widoczny.
- [x] Ważne: tap feedback musi być wyczuwalny wizualnie.
- [x] Ważne: formularze powinny mieć duże pola i jednoznaczne komunikaty błędów.

### Nawigacja

- [x] Krytyczne: dodać prostą dolną nawigację na telefonie.
- [x] Proponowane zakładki:
  - Dzisiaj,
  - Scenariusze,
  - Nagrania,
  - Więcej.
- [x] Ważne: liczba zakładek ma pozostać mała. Nie dodawać osobnej zakładki dla każdej przyszłej funkcji.
- [x] Ważne: desktop może dostać boczny pasek, ale mobile jest priorytetem.
- [x] Ważne: każdy ekran podrzędny ma mieć widoczny powrót.

## Gesty

- [x] Krytyczne: dodać gest cofania z lewej krawędzi do prawej.
- [x] Krytyczne: gest cofania nie może być jedyną metodą powrotu.
- [x] Krytyczne: gest cofania nie powinien działać podczas pisania w formularzu.
- [x] Krytyczne: gest cofania nie powinien kolidować z przewijaniem list ani edycją tekstu.
- [x] Ważne: dodać subtelny feedback podczas gestu cofania.
- [x] Ważne: gest powinien anulować się płynnie, jeśli użytkownik nie dokończy ruchu.
- [x] Ważne: dodać przeciągnięcie dolnego panelu w dół, żeby zamknąć szczegół albo formularz.
- [x] Ważne: dodać pull-to-refresh na listach, jeśli nie będzie przeszkadzał w normalnym scrollu.
- [x] Ważne: dodać swipe actions na kartach scenariuszy, ale tylko jako skrót do widocznych akcji.
- [ ] Później: dodać long press do szybkich akcji, jeśli użytkownicy faktycznie tego potrzebują.

## Powiadomienia

- [x] Krytyczne: dodać powiadomienia wewnątrz aplikacji.
- [x] Krytyczne: powiadomienie powinno powstawać, gdy scenariusz trafia do recenzji właściciela.
- [x] Krytyczne: powiadomienie powinno powstawać, gdy właściciel zaakceptuje scenariusz albo odeśle poprawki.
- [x] Krytyczne: na ekranie "Dzisiaj" nowe rzeczy do reakcji powinny być widoczne bez szukania.
- [x] Ważne: dodać badge nieprzeczytanych powiadomień.
- [x] Ważne: gdy aplikacja jest otwarta, nie pokazywać natarczywego systemowego powiadomienia; wystarczy subtelny toast, badge albo odświeżenie listy.
- [x] Ważne: o zgodę na push prosić dopiero po wyjaśnieniu wartości, nie przy pierwszym wejściu.
- [x] Ważne: push nie powinien zawierać wrażliwej treści scenariusza.
- [ ] Później: dodać Web Push dla zainstalowanej PWA.
- [ ] Później: dodać preferencje powiadomień użytkownika.
- [ ] Później: dodać tryb cichy.

## PWA i zachowanie aplikacyjne

- [x] Krytyczne: poprawić manifest pod realny produkt.
- [x] Krytyczne: aplikacja po instalacji powinna otwierać się na ekranie pracy, nie na widoku technicznym.
- [x] Ważne: dodać sensowny ekran offline albo komunikat offline.
- [x] Ważne: zachować działającą sesję w zainstalowanej PWA.
- [x] Ważne: dodać loading/skeleton tylko tam, gdzie poprawia odczucie szybkości.
- [x] Ważne: unikać ciężkiego splash screena. Aplikacja organizacyjna ma szybko dawać dostęp do pracy.
- [ ] Później: dodać podstawową obsługę offline draftów scenariuszy albo komentarzy.

## Obsługa błędów i stanów

- [x] Krytyczne: każda akcja API powinna mieć stan sukcesu i błędu.
- [x] Krytyczne: przy błędzie pokazać prosty komunikat i możliwość ponowienia.
- [x] Krytyczne: nie ignorować błędów zmiany statusu.
- [x] Ważne: dodać optimistic UI tylko tam, gdzie da się bezpiecznie cofnąć akcję.
- [x] Ważne: po zatwierdzeniu lub odesłaniu do poprawek użytkownik ma zobaczyć co się zmieniło.
- [x] Ważne: stany puste muszą tłumaczyć, co dalej.
- [x] Ważne: akcje destrukcyjne zastąpić własnym dialogiem z jasnym opisem skutku.

## Bezpieczeństwo

- [x] Krytyczne: centralna autoryzacja dla route handlerów.
- [x] Krytyczne: walidować role i statusy po stronie serwera.
- [x] Krytyczne: ujednolicić reguły haseł.
- [x] Krytyczne: zabezpieczyć endpoint diagnostyczny.
- [x] Krytyczne: dodać ochronę przed utratą ostatniego konta właściciela lub administratora.
- [x] Ważne: dodać audit log dla zmiany statusu, komentarza recenzji, zmiany roli i usunięcia danych.
- [ ] Ważne: rozważyć sesje w bazie, żeby można było unieważnić dostęp po zmianie hasła albo zablokowaniu konta.
- [x] Ważne: dodać ochronę CSRF dla akcji zmieniających dane.
- [ ] Później: dodać dwuetapowe logowanie dla kont z najwyższymi uprawnieniami.

## Plan rozbudowy - nie wdrażać teraz

### Moduł nagrań

- [ ] Później: osobny widok nagrań z datą, miejscem, odpowiedzialnymi osobami i listą scenariuszy.
- [ ] Później: status nagrania oddzielić od statusu scenariusza, jeśli proces zacznie tego wymagać.
- [ ] Później: dodać checklistę przygotowania nagrania.
- [ ] Później: dodać widok materiałów po nagraniu.

### Moduł kalendarza

- [ ] Później: kalendarz terminów recenzji i nagrań.
- [ ] Później: widok tygodnia albo lista terminów, zależnie od tego, co okaże się prostsze w realnym użyciu.
- [ ] Później: przypomnienia o zbliżających się recenzjach.

### Moduł załączników

- [ ] Później: pliki do scenariusza: PDF, zdjęcia, linki, materiały referencyjne.
- [ ] Później: prosty podgląd załączników bez rozbudowanego DAM.
- [ ] Później: limity i zasady przechowywania plików ustalić dopiero po wyborze hostingu/storage.

### Moduł komentarzy zespołu

- [ ] Później: komentarze w wątku pod scenariuszem.
- [ ] Później: wzmianki użytkowników.
- [ ] Później: oznaczanie komentarzy jako rozwiązane.

### Moduł szablonów

- [ ] Później: szablony scenariuszy dla powtarzalnych typów nagrań.
- [ ] Później: pola pomocnicze zależne od typu scenariusza.
- [ ] Później: biblioteka przykładowych briefów.

### Moduł raportów

- [ ] Później: proste podsumowanie tygodnia: co czeka na właściciela, co wróciło do poprawek, co jest gotowe do nagrania.
- [ ] Później: nie budować rozbudowanej analityki, dopóki nie ma realnego procesu i danych.

### Integracje

- [ ] Później: integracja z kalendarzem.
- [ ] Później: integracja z dyskiem albo storage plików.
- [ ] Później: eksport PDF scenariusza.
- [ ] Później: powiadomienia email albo push poza aplikacją.

## Kolejność wdrożenia

### Najpierw

- [x] Naprawić bug ustawień konta.
- [x] Ograniczyć lub usunąć publiczny health endpoint.
- [x] Uprościć dashboard do ekranu "Dzisiaj".
- [x] Uporządkować statusy scenariusza i centralne definicje.
- [x] Dodać komentarze/recenzje jako osobny byt.
- [x] Dodać historię aktywności scenariusza.
- [x] Poprawić kontrast, zoom i podstawową dostępność.

### Następnie

- [x] Przebudować listę scenariuszy.
- [x] Przebudować szczegół scenariusza.
- [x] Dodać gest cofania.
- [x] Dodać przeciągnięcie panelu w dół.
- [x] Dodać powiadomienia wewnętrzne.
- [x] Dodać centralny helper uprawnień.
- [x] Dodać podstawowe testy.

### Po stabilizacji MVP

- [x] Dodać zaproszenia użytkowników.
- [x] Dodać lepszy audit log.
- [x] Dodać dolną nawigację i ewentualny desktop sidebar.
- [ ] Dodać Web Push, jeśli wewnętrzne powiadomienia okażą się niewystarczające.
- [ ] Dodać zalążek kalendarza nagrań.
- [ ] Dodać załączniki.

## Definicja gotowości MVP

- [x] Aplikacja prowadzi scenariusz przez recenzję właściciela bez ręcznego obchodzenia procesu.
- [x] Właściciel widzi od razu, co wymaga jego decyzji.
- [x] Zespół widzi, co wymaga poprawki.
- [x] Każda decyzja ma historię.
- [x] Role nie są sprawdzane ad hoc w wielu miejscach.
- [x] Aplikacja jest czytelna na telefonie.
- [x] Zoom nie jest blokowany.
- [x] Gest cofania działa, ale przycisk powrotu nadal istnieje.
- [x] Akcje mają jasne komunikaty sukcesu i błędu.
- [x] Build przechodzi.
- [x] Podstawowe testy chronią auth, role i workflow scenariusza.
