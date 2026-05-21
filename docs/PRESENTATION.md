# Prezentáció Vázlat (5 perc) - World Wide Dashboard

Ez a dokumentum segít felkészülni a projekt bemutatójára. A prezentáció hossza összesen 5 perc, amit három részre bontottunk.

---

## 1. Bevezetés (Csongor) - 1.5 perc
**Téma:** Miért jött létre a projekt és miről szól?

- **Problémafelvetés:** 
    - "Sziasztok! Biztos ti is észrevettétek, hogy ha különböző adatokra (Steam statisztikák, YouTube trendek, tőzsdei árfolyamok vagy akár a magyar választási eredmények) vagytok kíváncsiak, rengeteg különböző oldalt kell végigböngésznetek."
    - "Sokszor nehézkes a navigáció, és az adatok nem egy helyen érhetők el."
- **A megoldás (A projekt célja):**
    - "A **World Wide Dashboard** célja, hogy ezeket a különálló adatforrásokat egyetlen, modern és letisztult felületen egyesítse."
    - "Egy olyan moduláris rendszert építünk, ahol a felhasználó saját maga döntheti el, milyen adatokat szeretne látni (legyen az gaming, politika vagy pénzügy)."
- **Főbb kategóriák:** Rövid felsorolás (Steam, YouTube és Zenei toplisták, Magyar választási adatok, Kripto és Deviza).

---

## 2. Frontend & Design (Ricsi) - 1.5 perc
**Téma:** Felhasználói felület és élmény.

- **Technológiai stack:** 
    - "A felületet **Next.js** és **Tailwind CSS** segítségével készítjük el, ami garantálja a sebességet és a modern kinézetet."
    - "Az animációkhoz az **Anime.js** könyvtárat használjuk, hogy a dashboard 'éljen' és reszponzív legyen."
- **Felhasználói élmény (UX):**
    - "A dashboard kártyákra (widgetekre) épül, amelyek egy modern, 
  - **UI/UX:** Letisztult üveghatás (Glassmorphism), reszponzív kártyák.
  - Teljes szélességű 3-oszlopos elrendezés (Navigáció, Adatok, Fiók).
  - Dinamikus sötét/világos téma (Light/Dark mode) üveghatással.
  - Szigorúan a Coolors.co paletta 5 színére építve (Prussian Blue, Orange, Alabaster Grey, stb.): a legfontosabb információk (pl. aktuális játékosszám, zenei toplista vagy árfolyam) azonnal szembeötlőek."
- **Interaktivitás:** Rövid említés a modulok testreszabhatóságáról (pl. a YouTube csatornák legördülő választója).

---

## 3. Backend & Architektúra (Zalán) - 2 perc
**Téma:** Adatkezelés és technikai háttér.

- **OOP Megközelítés (A tanári követelmény):**
    - "A projekt alapja egy **objektumorientált architektúra**. Egy úgynevezett **Strategy Pattern**-t használunk az adatforrások kezelésére."
    - "Minden adatforrás (Steam, YouTube, stb.) egy külön osztály, ami egy közös interfészt valósít meg. Ez teszi lehetővé, hogy bármikor könnyen hozzáadhassunk egy új modult a rendszerhez."
- **Technikai háttér:**
    - "A futtatáshoz a modern **Bun** runtime-ot használjuk, az adatok tárolására és gyorsítótárazására (caching) pedig a **Prisma** és **SQLite** párost."
- **Adatgyűjtés:**
    - "Ahol van hivatalos API (pl. Steam, YouTube), ott azt használjuk. Ahol nincs (pl. bizonyos politikai adatok), ott egyedi adatgyűjtő algoritmusokat (scraping) írunk."
- **Zárás:** "A rendszer Docker-kompatibilis, így bármilyen környezetben könnyen telepíthető."

---

## Időbeosztás összefoglaló:
1. **Csongor:** 0:00 - 1:30
2. **Ricsi:** 1:30 - 3:00
3. **Zalán:** 3:00 - 5:00
