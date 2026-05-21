# World Wide Dashboard - Royale Team

## Leírás
A **World Wide Dashboard** egy modern, moduláris adatgyűjtő platform, amely egy helyen teszi elérhetővé a legfontosabb globális és lokális adatokat. A projekt célja a fragmentált adatforrások (SteamCharts, YouTube, pénzügyi hírek, választási adatok) egyesítése egy tisztán átlátható, testreszabható felületen. 

A szoftver különlegessége az objektumorientált (OOP) architektúra, amely lehetővé teszi új adatforrások (modulok) gyors és biztonságos hozzáadását.

## Funkciók
- **Játékok:** Steam játékosszámok és népszerűségi trendek valós idejű követése.
- **Videó & Zene:** YouTube csatorna statisztikák (legördülő választóval) és globális Top 10 zenei toplista (Spotify + SoundCloud összesített adatokkal).
- **Politika:** Magyar választási adatok és részvételi statisztikák (interaktív térképekkel).
- **Pénzügy & Kripto:** Tőzsdei árfolyamok és kriptovaluta adatok.
- **Testreszabhatóság:** Prémium, üveg hatású (glassmorphism) sötét téma, fluid animációkkal.

## Technológiai Stack
- **Frontend/Backend:** Next.js 15+ (App Router)
- **Runtime:** Bun
- **Nyelv:** TypeScript (OOP szemléletben)
- **Stílus:** Tailwind CSS
- **Animációk:** Anime.js
- **Adatkezelés:** Prisma + SQLite (Caching)
- **Konténerizáció:** Docker

## Rendszertervek és Dokumentáció
A projekt részletes technikai és vizuális terveit külön dokumentumok tartalmazzák a `docs/` mappában:

> [!NOTE]
> A diagramok **Mermaid.js** használatával készültek. A VS Code-ban a megfelelő kiegészítővel (vagy GitHub-on) grafikusan is megjelennek.

- **[Elmetérkép (Mindmap)](./docs/UML/MINDMAP.md):** A projekt funkcionális áttekintése
- **[Folyamatábra (Flowchart)](./docs/UML/FLOWCHART.md):** Az adatáramlás és lekérési folyamat
- **[Osztálydiagram (Class Diagram)](./docs/UML/CLASS.md):** Objektumorientált (OOP) architektúra
- **[Stílusútmutató (Style Guide)](./docs/STYLE.md):** Vizuális szabályok és design sablonok

## Csapat
- **Bodolai Richárd Tamás** - Backend fejlesztő / Adatkezelés
- **Páva Zalán** - UI/UX design / Frontend fejlesztő
- **Solti Csongor Péter** - Lead fejlesztő / Architektúra

## Projekt Ütemterv
- **Április 14:** Ötlet prezentáció
- **Április 21:** Design és arculat tervezése
- **Április 28:** UML és részletes rendszertervezés
- **Május 12:** Fejlesztési szakasz lezárása
- **Május 19:** Tesztelés és dokumentáció véglegesítése
- **Május 25:** Projekt leadása

## Hogyan futtasd a projektet?

### 1. Helyi fejlesztés (Bun & Prisma)
1. Klónozd a repository-t.
2. Másold le a `.env.example` fájlt `.env` néven és (opcionálisan) töltsd ki a `YOUTUBE_API_KEY`-t.
3. Telepítsd a függőségeket:
   ```bash
   bun install
   ```
4. Futtasd a Prisma adatbázis migrációt (SQLite Cache):
   ```bash
   bunx prisma migrate dev
   ```
5. Indítsd el a fejlesztői szervert:
   ```bash
   bun dev
   ```
6. Nyisd meg a böngészőben: `http://localhost:3000`

### 2. Konténerizált futtatás (Docker Compose)
Ha Docker-t használsz, egyetlen paranccsal elindíthatod a teljes rendszert (Node.js/Bun környezet és adatbázis is automatikusan beállítódik):
```bash
docker-compose up --build
```
A weboldal a `http://localhost:3000` címen lesz elérhető.
