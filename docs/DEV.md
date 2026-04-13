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
# Függőségek letöltése
bun install

# Fejlesztői szerver indítása
bun dev
```
A weboldal a [http://localhost:3000](http://localhost:3000) címen lesz elérhető.

## Architektúra (OOP)

A tanárok kérésére a projekt **objektumorientált** szemléletben készül. A legfontosabb rész a `src/lib/core` mappában található:

- **`IDataSource`**: Egy interfész, ami leírja, hogyan kell kinéznie egy adatforrásnak.
- **`BaseDataSource`**: Egy absztrakt osztály, ami alapértelmezett hibakezelést és funkciókat biztosít.
- **`DashboardManager`**: Ez az osztály fogja össze az összes modult (Steam, YouTube, stb.).

### Új modul hozzáadása (Példa)
Ha új adatforrást akarsz hozzáadni, hozz létre egy új fájlt a `src/lib/providers/` mappában, ami kiterjeszti a `BaseDataSource` osztályt.

## Kódolási Szabályok
- **Nyelv:** A kód (változók, osztályok, kommentek a kódban) **angolul** készül.
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
