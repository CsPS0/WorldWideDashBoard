# Stílusútmutató (Style Guide)

Ez a dokumentum a projekt vizuális megjelenéséhez használt alapvető dizájnelemeket és színpalettát tartalmazza.

## Színpaletta

A projekt egy modern, letisztult, sötét témájú (Dark Theme) színvilágot használ, amely a következőképpen épül fel:

<div align="left">

| Szín (Név) | HEX Kód | CSS Változó / Tailwind Token | Szerep |
| :--- | :--- | :--- | :--- |
| **Very Dark Gray** | `#111111` | `--surface-base` | Alkalmazás fő háttere |
| **Dark Gray** | `#1a1a1a` | `--surface-card` | Kártyák, panelek háttere |
| **Hover Gray** | `#222222` | `--surface-card-hover` | Kártyák interaktív (hover) állapota |
| **Deep Border** | `#2a2a2a` | `--border-default` | Kártyák és elemek szegélyei |
| **Orange** | `#e05a2b` | `--accent` | Kiemelés, gombok, ikonok, interakciók |
| **Light Gray** | `#e0e0e0` | `--text-primary` | Elsődleges szöveg (Címsorok, fő tartalom) |
| **Dim Gray** | `#888888` | `--text-secondary` | Másodlagos szöveg, metaadatok, ikonok |

> **Szigorú Szabály:** A UI felületen *kizárólag* ezek az alapszínek és a belőlük származtatott transzparenciák szerepelhetnek. A rendszer ezeket automatikusan leképezi a Tailwind v4 szintaxisba.

</div>

---

## Használat a kódban

### Tailwind CSS v4 & `globals.css`

A projekt a **Tailwind CSS v4** verzióját használja, így a színek egyenesen a `src/app/globals.css` fájlban vannak definiálva `@theme inline` segítségével, így nincs szükség külön `tailwind.config.ts` fájlra.

```css
@theme inline {
  --color-surface-base: var(--surface-base);
  --color-surface-sidebar: var(--surface-sidebar);
  --color-surface-card: var(--surface-card);
  --color-surface-card-hover: var(--surface-card-hover);
  --color-surface-inset: var(--surface-inset);
  
  --color-border-subtle: var(--border-subtle);
  --color-border-default: var(--border-default);
  
  --color-primary: var(--text-primary);
  --color-secondary: var(--text-secondary);
  --color-muted: var(--text-muted);
  
  --color-accent: var(--accent);
}
```

Ezek a színek a JSX/TSX komponensekben közvetlenül használhatóak osztályokként, például:
- Háttérhez: `bg-surface-card`, `bg-surface-base`
- Szöveghez: `text-primary`, `text-secondary`, `text-accent`
- Szegélyekhez: `border-border-default`

---

## Tipográfia (Typography)

A modern és letisztult megjelenés érdekében (a Next.js / Tailwind stackhez igazodva) ajánlott az alábbi megközelítés:
- **Elsődleges betűtípus**: `Inter`, `Roboto`, `Outfit`, vagy `Geist` (alapértelmezett).
- **Karakter**: Minimalista, jól olvasható, határozott hierarchiával (vastag címsorok, vékonyabb szövegtörzsek).

## Formák és Elrendezés (Layout & Shapes)

A projekt a **Dark Mode Glassmorphism** & **Modern Flat** dizájnelveket követi:
- **Kártya alapú elrendezés (Panel Layout)**: Az adatok, grafikonok és widgetek egyértelműen elkülönített, letisztult kártyákban jelennek meg (`.glass-card` osztály).
- **Sarokkerekítés (Corner Radius)**: Határozott, barátságos lekerekítések, például `rounded-xl` vagy `rounded-2xl`.
- **Belső mélység (Inset)**: Használjunk `bg-surface-inset`-et a kártyákon belüli adatblokkok elkülönítéséhez.

## Animációk és Interakciók

Mivel a projekt használja az **Anime.js**-t és a Tailwindet, az UI-nak "élnie" kell:
- **Kártya hover (Micro-interactions)**: A kártyákra történő rámutatáskor (hover) a szegély színe élénkebbé válik és a dobozárnyék megnő (a `glass-card` beépített effektjei).
- **Tranzíciók**: Tailwind tranzíciók használata (pl. `transition-colors`, `duration-200`) gomboknál és linkeknél.
- **Neon effektek**: A `.glow-accent` osztállyal különleges, fénylő árnyékhatást érhetünk el a kiemelt adatok körül.