# Stílusútmutató (Style Guide)

Ez a dokumentum a projekt vizuális megjelenéséhez használt alapvető dizájnelemeket és színpalettát tartalmazza.

## Színpaletta

A projekt egy modern, letisztult, és határozott színvilágot használ.
🔗 **[Megtekintés Coolors.co-n](https://coolors.co/palette/000000-14213d-fca311-e5e5e5-ffffff)**

<div align="left">

| Szín (Név) | HEX Kód | CSS Változó | Szerep (Sötét Mód) | Szerep (Világos Mód) |
| :--- | :--- | :--- | :--- | :--- |
| **Black** | `#000000` | `--black` | Háttér (szél) / Inner Card | Szöveg (kiemelt) |
| **Prussian Blue** | `#14213D` | `--prussian-blue` | Kártyák / Háttér (közép) | Háttér (szél) / Inner Card |
| **Orange** | `#FCA311` | `--orange` | Kiemelés / Gombok / Ikonok | Kiemelés / Gombok / Ikonok |
| **Alabaster Grey** | `#E5E5E5` | `--alabaster-grey`| Másodlagos Szöveg | Kártyák / Háttér (közép) |
| **White** | `#FFFFFF` | `--white` | Elsődleges Szöveg | Másodlagos Szöveg / Keretek |

> **Szigorú Szabály:** A UI felületen *kizárólag* ez az 5 szín szerepelhet, semmilyen más Tailwind szín (pl. kék, smaragd zöld) nem engedélyezett a szemantikus elemeken sem. Az élénk kiemelésekért kizárólag a Brand Orange felel.

</div>

---

## Használat a kódban

### 1. Tailwind CSS (`tailwind.config.ts`)

Másold be az alábbi objektumot a Tailwind konfigurációba a színek kiterjesztéséhez (`theme.extend.colors`):

```javascript
{
  'black': { DEFAULT: '#000000', 100: '#000000', 200: '#000000', 300: '#000000', 400: '#000000', 500: '#000000', 600: '#333333', 700: '#666666', 800: '#999999', 900: '#cccccc' },
  'prussian_blue': { DEFAULT: '#14213d', 100: '#04070c', 200: '#080d19', 300: '#0c1425', 400: '#101b31', 500: '#14213d', 600: '#29447e', 700: '#3e67bf', 800: '#7e99d5', 900: '#beccea' },
  'orange': { DEFAULT: '#fca311', 100: '#362101', 200: '#6b4201', 300: '#a16402', 400: '#d68502', 500: '#fca311', 600: '#fdb541', 700: '#fec871', 800: '#fedaa0', 900: '#ffedd0' },
  'alabaster_grey': { DEFAULT: '#e5e5e5', 100: '#2e2e2e', 200: '#5c5c5c', 300: '#8a8a8a', 400: '#b8b8b8', 500: '#e5e5e5', 600: '#ebebeb', 700: '#f0f0f0', 800: '#f5f5f5', 900: '#fafafa' },
  'white': { DEFAULT: '#ffffff', 100: '#333333', 200: '#666666', 300: '#999999', 400: '#cccccc', 500: '#ffffff', 600: '#ffffff', 700: '#ffffff', 800: '#ffffff', 900: '#ffffff' }
}
```

### 2. Vanilla CSS (`globals.css`)

Normál CSS alapú stílusozáshoz használd az alábbi gyökér változókat:

```css
:root {
  /* Alapszínek */
  --black: #000000;
  --prussian-blue: #14213d;
  --orange: #fca311;
  --alabaster-grey: #e5e5e5;
  --white: #ffffff;

  /* RGB a transzparenciához (glassmorphism) */
  --black-rgb: 0, 0, 0;
  --prussian-rgb: 20, 33, 61;
}

/* Világos mód (Light Theme) inverzió */
.light {
  --black: #ffffff;
  --prussian-blue: #e5e5e5;
  --alabaster-grey: #14213d;
  --white: #000000;
  
  --black-rgb: 255, 255, 255;
  --prussian-rgb: 229, 229, 229;
}
```

---

## Tipográfia (Typography)

A modern és letisztult megjelenés érdekében (a Next.js / Tailwind stackhez igazodva) ajánlott az alábbi megközelítés:
- **Elsődleges betűtípus**: `Inter`, `Roboto`, vagy `Outfit` (Google Fonts).
- **Karakter**: Minimalista, jól olvasható, határozott hierarchiával (vastag címsorok, vékonyabb szövegtörzsek).

## Formák és Elrendezés (Layout & Shapes)

A projekt a **Monochrome Flat & Modern** dizájnelveket követi, amit helyenként enyhe **Glassmorphism** (üveghatás) egészíthet ki:
- **Kártya alapú elrendezés (Panel Layout)**: Az adatok, grafikonok és widgetek egyértelműen elkülönített, letisztult kártyákban (panelekben) jelennek meg.
- **Sarokkerekítés (Corner Radius)**: Határozott, barátságos lekerekítések. Használjunk kifejezett görbületeket, pl. `border-radius: 24px` vagy 25% a kisebb elemeknél (Tailwind: `rounded-2xl` vagy `rounded-3xl`), hogy lágyítsuk a monokróm ridegséget.
- **Hátterek**: A panelek háttere monokróm, de enyhén áttetsző is lehet sötét háttér előtt (backdrop-blur), ezzel modern rétegződést létrehozva.

## Animációk és Interakciók

Mivel a projekt használja az **Anime.js**-t és a Tailwindet, az UI-nak "élnie" kell:
- **Mikro-animációk**: Gombokra és kártyákra történő rámutatáskor (hover) finom interakciók, pl. enyhe emelkedés (`hover:-translate-y-1`) és mélyülő árnyék.
- **Tranzíciók**: Minden állapotváltozás (pl. betöltés, navigáció) finom és sima (smooth) átmenettel történjen.

## Árnyékok és Mélység (Shadows & Depth)

A flat design ellenére a mélységérzet fontos:
- **Lágy, sötét árnyékok (Soft Shadows)**: Kerüljük a kemény határokat, használjunk elmosott, terjedelmes árnyékokat (Tailwind: `shadow-xl`, `shadow-black/40`), amelyek elemelik a paneleket a háttértől.
- **Finom keretek (Subtle Borders)**: 1px vastag, alig észrevehető szegélyek a paneleken (pl. `border border-white/5`), ami megadja az élek kontúrját a sötét módban.

---

## Referencia Tervek (Templates)

A fent említett vizuális elvek (kártyás elrendezés, monokróm árnyalatok, lekerekítések) megvalósulását az alábbi sablonképek szemléltetik:

### Dashboard Sablon
![Dashboard Sablon](../img/dashboard-template.png)

### Általános UI Sablon
![Általános UI Sablon](../img/template.png)