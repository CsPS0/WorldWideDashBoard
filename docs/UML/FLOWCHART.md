## 2. Adatlekérési Folyamat (Flowchart)
Ez az ábra bemutatja az adatáramlás teljes életciklusát: a felhasználói interakciótól kezdve a lokális gyorsítótárazáson (cache) át a külső API-kig, majd vissza a UI-hoz.

```mermaid
flowchart TD

    User((Felhasználó))
    UI[Kliens Felület / Kártyák]
    Manager{DashboardManager}
    Cache[(Lokális Cache)]
    
    subgraph Adatforrások [Külső API Szolgáltatások]
        Steam[Steam API]
        YT[YouTube API]
        Pol[Politics API]
        Fin[Finance API]
    end


    User -->|Oldal megnyitása| UI
    UI -->|fetchAllData metódus hívása| Manager
    Manager -->|Keresés ID alapján| Cache
    
    Cache -- Adat friss és érvényes --> Manager
    Cache -- Adat hiányzik vagy lejárt --> Steam & YT & Pol & Fin
    
    Steam -->|Nyers JSON válasz| Manager
    YT -->|Nyers JSON válasz| Manager
    Pol -->|Nyers JSON válasz| Manager
    Fin -->|Nyers JSON válasz| Manager
    
    Manager -.->|Új adat mentése| Cache
    Manager -->|Formázott objektumok| UI
    UI -->|Animált renderelés Anime.js használatával| User
    
    classDef api fill:#14213d,stroke:#fca311,stroke-width:2px,color:#fff;
    class Steam,YT,Pol,Fin api;
```