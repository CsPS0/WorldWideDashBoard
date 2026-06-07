# Felhasználói Dokumentáció - World Wide Dashboard

## Bevezetés
A **World Wide Dashboard** egy központi felület, ahol a legfontosabb globális és lokális adatokat követheted nyomon. Nem kell külön oldalakat látogatnod a Steam statisztikákért, a YouTube trendekért vagy a választási eredményekért – minden egy helyen van.

## A Kezdőképernyő Használata
A weboldal megnyitása után a főoldalon találod a különböző adatmodulokat (widgeteket), melyek egy elegáns, sötét témájú, üveghatású (glassmorphism) felületen jelennek meg:

- **Játékok (Games):** A Steam aktuális játékosszámait követheted nyomon (globális statisztikák). Ha megadod a Steam azonosítódat, a saját Last Played adataidat is láthatod! Támogatja a Tracker.gg és az Exophase fiókok bekötését is cross-platform statisztikákhoz.
- **Videó & Zene (Media):** 
  - **YouTube Stats:** Választhatsz a legnépszerűbb tartalomgyártók közül, de beállíthatod a saját YouTube csatornádat is.
  - **Zene:** Globális toplisták követése (Spotify/SoundCloud/Last.fm alapon), illetve a saját "Most játszott" (Now Playing) Last.fm profilod összekötése.
- **Pénzügy (Finance):** Kriptovaluták (Bitcoin, Ethereum, Hawk Tuah Coin) aktuális dollár és euró árfolyama, valamint a valós idejű EUR/HUF devizaárfolyamok.
- **Politika (Politics):** A magyar választási adatokkal kapcsolatos statisztikák, illetve a világ vezetőinek profiljai.

A felület animációkkal (Anime.js) van ellátva, és egy egyedi Narnia témájú 404 hibaoldallal rendelkezik.

## Beállítások és Testreszabhatóság
Az új **Beállítások (Settings)** fülön személyre szabhatod a Dashboardod működését:
- **Kompakt Nézet:** A "Dashboard Layout Options" menüben bekapcsolhatod a kompakt kártyanézetet, vagy hagyhatod, hogy az oldal teljesen kitöltse a képernyőt (Full-width).
- **Személyes Fiókok (API Kulcsok):** Megadhatod a saját Steam azonosítódat, YouTube csatornádat, Last.fm nevedet és Tracker.gg linkjeidet (R6, LoL, RL). A megadott linkek automatikusan betöltik a te személyes adataidat a főoldalon lévő kártyákra!

## Adatvédelem és Licenc (Data & Privacy)
A jobb felső sarokban található **Privacy** gombra kattintva érhető el a részletes Adatvédelmi Irányelvünk. Itt transzparensen látható, hogy mely modulok használnak élő, valódi API kapcsolatot (Steam, YouTube, Last.fm, CoinGecko), és mely modulok dolgoznak pusztán szimulált (Mock) adatokkal a felhasználói biztonság és a projekt jellege miatt (például a 2026-os magyar politikai választások és a hagyományos tőzsde).
A **License** gombra kattintva a projekt hivatalos, nyílt forráskódú MIT Licenc dokumentációja tekinthető meg egy modern, beépített felületen.

## Gyakori Kérdések (FAQ)
- **Milyen gyakran frissülnek az adatok?**
  - Az alkalmazás egy beépített gyorsítótárral (Cache) rendelkezik. Az adatok lekérése a háttérben zajlik, és 5 percenként frissülnek automatikusan az API limitációk elkerülése érdekében.
- **Elérhető mobilról is az oldal?**
  - Igen, a weboldal teljes mértékben reszponzív, így telefonon és tableten is hibátlanul jelenik meg.
- **Ingyenes a szolgáltatás?**
  - Igen, a Dashboard minden funkciója nyílt és ingyenesen elérhető.
