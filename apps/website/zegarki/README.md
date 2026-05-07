# Warszawski Czas - dane produktowe zegark?w

Folder wygenerowany 2026-05-06.

## Struktura
- `products.json` - zbiorcza tablica produkt?w gotowa do importu.
- `products.csv` - wersja tabelaryczna do szybkiego przegl?du.
- `products/<slug>/product.json` - dane pojedynczego zegarka.
- `products/<slug>/product.md` - opis w formacie redakcyjnym.
- `images/<slug>/*.jpg` - przekonwertowane zdj?cia JPG z zachowaniem uj??.
- `image-manifest.json` - manifest zdj?? po konwersji.
- `conversion-errors.json` - raport konwersji; jeden dodatkowy plik HEIC nie przeszed? dekodowania.
- `sources.md` - ?r?d?a u?yte do identyfikacji modeli i referencji.

## Wa?ne
Dane s? przygotowane do katalogu, ale pozycje z polem `do potwierdzenia` wymagaj? sprawdzenia na podstawie dokument?w, numeru referencyjnego na deklu lub ogl?dzin zegarmistrza. Nie dopisywa?em fikcyjnych rocznik?w ani stanu kolekcjonerskiego tam, gdzie nie da si? tego uczciwie potwierdzi? ze zdj??.
