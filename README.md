# World Wide Dashboard - Royale Team

## Leírás
A **World Wide Dashboard** egy modern, moduláris adatgyűjtő platform, amely egy helyen teszi elérhetővé a legfontosabb globális és lokális adatokat. A projekt célja a fragmentált adatforrások (SteamCharts, YouTube, pénzügyi hírek, választási adatok) egyesítése egy tisztán átlátható, testreszabható felületen. 

A szoftver különlegessége az objektumorientált (OOP) architektúra, amely lehetővé teszi új adatforrások (modulok) gyors és biztonságos hozzáadását.

## Funkciók
- **Játékok és Személyes Statisztikák:** Steam játékosszámok globális trendjei, valamint személyes Tracker.gg (R6, LoL, RL stb.) és Exophase (cross-platform játékidő) integrációk.
- **Videó & Zene:** YouTube csatorna statisztikák és globális Top 10 zenei toplista (Last.fm, Spotify, SoundCloud adatokkal), plusz személyes Last.fm "Now Playing" követés.
- **Politika:** Magyar választási adatok és globális vezetői statisztikák.
- **Pénzügy & Kripto:** Tőzsdei árfolyamok és kriptovaluta adatok (beleértve az egyedi Hawk Tuah Coint).
- **Testreszabhatóság:** Dinamikus elrendezés (Kompakt vagy Teljes szélesség), dedikált Beállítások oldal a személyes API kulcsoknak.
- **Biztonság és Jogi Nyilatkozatok:** Teljes értékű "Data & Privacy Policy" oldal a Mock és Live adatok átláthatóságáért, valamint beépített Open Source License megjelenítő.
- **Design:** Prémium, üveg hatású (glassmorphism) sötét téma fluid Anime.js animációkkal és egyedi vizuális 404 hibaoldallal.

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



## Hogyan futtasd a projektet?

### 1. Helyi fejlesztés (Bun & Prisma)
1. Klónozd a repository-t.
2. Másold le a `.env.example` fájlt `.env` néven és (kötelezően) töltsd ki a `YOUTUBE_API_KEY` és `LASTFM_API_KEY` értékeket. *(Megjegyzés: a személyes API kulcsokat, mint a Steam kulcs, nem ide kell beírni, hanem a felületen a Beállítások oldalon!)*
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

## Csapat
- **Solti Csongor Péter** - Lead fejlesztő / Fő Architektúra
- **Páva Zalán** - Backend fejlesztő / Tesztelés
- **Bodolai Richárd Tamás** - Fejlesztő segéd / Legidősebb csapattag