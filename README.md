
# Dokumentacja Projektu

## Informacje Ogólne

**Nazwa Projektu**: Aplikacja Webowa SPA

**Technologie Wykorzystane**:
- HTML, CSS, JavaScript
- React (framework front-endowy)
- Biblioteka lodash (funkcja debounce)

**Opis Projektu**:
Projekt polega na stworzeniu aplikacji typu Single Page Application (SPA), która prezentuje informacje o użytkowniku, jego projektach oraz umożliwia kontakt poprzez formularz. Aplikacja jest w pełni responsywna i umożliwia interakcje za pomocą klikania oraz przewijania.

## Funkcjonalności

### 1. Przewijanie Sekcji
- Aplikacja składa się z czterech sekcji: Home, About Me, Projects, Contact.
- Użytkownik może poruszać się między sekcjami, używając:
  - Paska bocznego (kropki nawigacyjne).
  - Przewijania kółkiem myszy.
- Dynamiczne przewijanie sekcji realizowane jest za pomocą funkcji `scrollToSection` oraz `debounce`.

### 2. Modalne Okna
- **CV Modal**: Modal z informacjami o użytkowniku, jego doświadczeniu zawodowym, edukacji i umiejętnościach.
- **Projekt Modal**: Modal otwierany po kliknięciu na projekt, zawierający jego szczegóły.

### 3. Formularz Kontaktowy
- Formularz zawiera pola:
  - Imię (Name)
  - Email
  - Wiadomość (Message)
- Po wysłaniu formularza pola są czyszczone, a dane wyświetlane w konsoli.

### 4. Responsywność
- Projekt dostosowuje się do różnych urządzeń (desktop, tablet, mobile).
- Modalne okna i sekcje zmieniają swoje rozmiary i układ w zależności od rozdzielczości ekranu.

## Architektura Projektu

### Struktura Plików
```
projekt/
├── public/                 
│   ├── images/             
│   │   ├── github.svg
│   │   ├── linkedin.svg
│   └── ...
│   ├── fonts/              
│   │   ├── Roboto-Regular.ttf
│   │   ├── Engravers-Bold.woff
│   └── ...
│   ├── index.html          
│   ├── manifest.json       
│   └── ...
├── src/                    
│   ├── components/         
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── Section.js
│   │   └── ...
│   ├── styles/             
│   │   ├── App.css
│   │   ├── style.css
│   └── ...
│   ├── App.js              
│   ├── index.js            
│   ├── reportWebVitals.js  
│   └── ...
├── .gitignore              
├── README.md               
├── package.json            
├── package-lock.json       
└── ...
```

### Kluczowe Elementy

#### Generatory Komponentów
React zapewnia dynamiczne generowanie komponentów, takich jak lista projektów. Projekty są definiowane jako tablica obiektów w pliku `App.js`, a następnie renderowane w sekcji Projects za pomocą metody `.map()`.

#### Routery
Aplikacja korzysta z ręcznie zaimplementowanego systemu nawigacji, który pozwala na przewijanie do sekcji poprzez klikanie w linki lub kropki nawigacyjne.

#### Style CSS
Style aplikacji są zapisane w pliku `App.css`, który zawiera klasy odpowiadające za layout, animacje oraz responsywność.

## Problemy i Rozwiązania

### Problem: Nieprawidłowe Przewijanie Sekcji
- **Rozwiązanie**: Użycie funkcji `debounce` z biblioteki lodash, aby ograniczyć częstotliwość przewijania.

### Problem: Modalne Okna Blokujące Przewijanie
- **Rozwiązanie**: Dodanie klasy `modal-open` do elementu `body`, co wyłącza przewijanie strony podczas otwartego modalu.

## Przyszłe Rozszerzenia
1. **Integracja z API**:
   - Pobieranie danych o projektach z zewnętrznego API.
   - Przesyłanie danych z formularza kontaktowego na serwer.
2. **Baza Danych**:
   - Zastosowanie bazy danych (np. Firebase) do przechowywania informacji o projektach.
3. **Testy Jednostkowe**:
   - Dodanie testów jednostkowych do weryfikacji działania kluczowych funkcji.

## Wymagania Systemowe

- Node.js w wersji 14 lub nowszej
- Przeglądarka wspierająca ES6

## Uruchomienie Projektu

1. **Zainstaluj zależności**:
   ```bash
   npm install
   ```
2. **Uruchom serwer deweloperski**:
   ```bash
   npm start
   ```
3. **Otwórz aplikację** w przeglądarce pod adresem:
   http://localhost:3000
