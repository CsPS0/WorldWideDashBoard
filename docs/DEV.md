# Fejlesztői Dokumentáció - World Wide Dashboard

## Projekt Indítása (Csapattagoknak)

Mivel a projektet többen fejlesztitek, fontos, hogy mindenkinél ugyanaz a környezet legyen beállítva. A projekt **Bun** runtime-ot használ a sebesség és a modern eszközök miatt.

### Előfeltételek
1. **Bun telepítése:**
   - Windows (PowerShell): `powershell -c "irm bun.sh/install.ps1 | iex"`
   - Fontos: Telepítés után indítsd újra a terminált, vagy add hozzá a PATH-hoz: `C:\Users\<felhasználónév>\.bun\bin`
2. **Git elérés:** Győződj meg róla, hogy be tudsz lépni a közös GitLab/GitHub repository-ba.

### Első lépések
Klónozd a repository-t, majd futtasd a következő parancsokat a projekt gyökérmappájában:

```bash
# 1. Függőségek letöltése
bun install

# 2. Környezeti változók beállítása (másold le a példát)
cp .env.example .env

# 3. Adatbázis (SQLite Cache) inicializálása
bunx prisma migrate dev

# 4. Fejlesztői szerver indítása
bun dev
```
A weboldal a [http://localhost:3000](http://localhost:3000) címen lesz elérhető.

> [!TIP]
> **Docker futtatás:** Ha nem akarsz Bun-nal bajlódni, csak futtasd a `docker-compose up --build` parancsot, ami felépíti a projektet és futtatja a 3000-es porton!

## Architektúra és Rendszertervek (UML)

A tanárok kérésére a projekt **objektumorientált** szemléletben készül. A rendszer vizuális felépítését és az adatáramlási folyamatokat a `docs/UML/` mappában található diagramok részletezik:

> [!NOTE]
> A diagramok **Mermaid.js** használatával készültek. A VS Code-ban a megfelelő kiegészítővel (vagy GitHub-on) grafikusan is megjelennek.

- **[Elmetérkép (Mindmap)](./UML/MINDMAP.md):** A projekt teljes technológiai és funkcionális áttekintése.
- **[Adatlekérési Folyamat (Flowchart)](./UML/FLOWCHART.md):** Az adatáramlás életciklusa a kliens felülettől a külső API-kig.
- **[Osztálydiagram (Class Diagram)](./UML/CLASS.md):** Részletes OOP terv a Strategy Pattern megvalósításáról (11 regisztrált adatforrással).

> [!IMPORTANT]
> Zalán elkészítette a backend architektúra C# alapú tesztjeit (xUnit). A teszt mappa a `tests/Dashboard.Tests` alatt található, a futtatási jegyzőkönyv pedig a `docs/Tesztelesi Jegyzokonyv/tesztelési_jegyzőkönyv.md` fájlban érhető el!

A legfontosabb kódok a `src/lib/core` mappában találhatók:

- **`IDataSource`**: Egy interfész, ami leírja, hogyan kell kinéznie egy adatforrásnak.
- **`BaseDataSource`**: Egy absztrakt osztály, ami alapértelmezett hibakezelést és funkciókat biztosít.
- **`DashboardManager`**: Ez az osztály fogja össze az összes modult (Steam, YouTube, stb.).

### Új modul hozzáadása (Példa)
Ha új adatforrást akarsz hozzáadni, hozz létre egy új fájlt a `src/lib/providers/` mappában, ami kiterjeszti a `BaseDataSource` osztályt.

## Kódolási Szabályok
- **Nyelv:** A kódváltozók és osztályok **angolul** készülnek.
- **Szigorú Szabály (NINCS KOMMENT):** A projektben **SZIGORÚAN TILOS** bármilyen jellegű komment (// vagy /* */) elhelyezése a kódbázisban! Ennek érdekében a Next.js linter szabályai is módosításra kerültek az `.eslintrc.json` fájlban.
- **Dokumentáció:** A README és a `docs/` mappa tartalma **magyarul** van a tanári követelmények miatt.
- **Stílus:** Használjuk a Tailwind CSS-t a gyors és egységes UI érdekében.

## Git Workflow
1. Mindig csinálj egy `git pull`-t mielőtt elkezdesz dolgozni!
2. Ha kész vagy egy funkcióval:
   ```bash
   git add .
   git commit -m "feat: add steam player count widget"
   git push
   ```
