# Dashboard.Tests

C# xUnit tesztek a `src/lib/core` és `src/lib/providers` TypeScript fájlok logikája alapján.

## Core

### DashboardManagerTests.cs

* **GetProviders_ReturnsAllRegisteredProviders**

  * Ellenőrzi, hogy a DashboardManager visszaadja az összes regisztrált providert.

* **GetProviderById_ReturnsCorrectProvider**

  * Ellenőrzi, hogy az adott azonosítóhoz a megfelelő provider kerül visszaadásra.

* **GetProviderById_ReturnsNullForUnknownProvider**

  * Ellenőrzi, hogy nem létező provider esetén a rendszer null értéket ad vissza.

* **AddProvider_IncreasesProviderCount**

  * Ellenőrzi, hogy új provider hozzáadásakor nő a tárolt providerek száma.

### DataSourceTests.cs

* **Metadata_IsStoredCorrectly**

  * Ellenőrzi, hogy az adatforrás metaadatai megfelelően kerülnek eltárolásra.

* **FetchData_ReturnsExpectedResult**

  * Ellenőrzi, hogy az adatlekérő metódus a várt adatokat adja vissza.

* **FetchData_ReturnsCollection**

  * Ellenőrzi, hogy a visszakapott eredmény lista vagy gyűjtemény formátumú.

* **FetchData_HandlesEmptyData**

  * Ellenőrzi, hogy üres adathalmaz esetén sem történik hiba.

---

## Providers

### FinanceProviderTests.cs

* **Metadata_IsCorrect**

  * Ellenőrzi a provider azonosítóját, nevét és kategóriáját.

* **FetchData_ReturnsItems**

  * Ellenőrzi, hogy az adatlekérés eredményt ad vissza.

* **FetchData_ContainsRequiredFields**

  * Ellenőrzi, hogy minden elem tartalmazza a szükséges mezőket.

* **FetchData_ReturnsSortedResults**

  * Ellenőrzi, hogy az adatok megfelelő sorrendben érkeznek.

### MusicProviderTests.cs

* **Metadata_IsCorrect**

  * Ellenőrzi a provider alapvető metaadatait.

* **FetchDataAsync_AssignsRanksStartingFromOne**

  * Ellenőrzi, hogy a rangsorolás 1-től indul.

* **FetchDataAsync_SortsByTotalStreamsDescending**

  * Ellenőrzi, hogy a zeneszámok hallgatottság szerint csökkenő sorrendben szerepelnek.

* **FetchDataAsync_ReturnsExpectedTrackCount**

  * Ellenőrzi, hogy a várt számú zeneszám érkezik vissza.

### PoliticsProviderTests.cs

* **Metadata_IsCorrect**

  * Ellenőrzi a provider azonosítóját és kategóriáját.

* **FetchData_ReturnsPoliticalArticles**

  * Ellenőrzi, hogy politikai témájú adatok érkeznek vissza.

* **FetchData_ReturnsNonEmptyCollection**

  * Ellenőrzi, hogy a visszaadott lista nem üres.

* **FetchData_ContainsValidTitles**

  * Ellenőrzi, hogy minden rekord rendelkezik címmel.

### SteamProviderTests.cs

* **Metadata_IsCorrect**

  * Ellenőrzi a Steam provider metaadatait.

* **FetchData_ReturnsGames**

  * Ellenőrzi, hogy játékok listája érkezik vissza.

* **FetchData_SortsGamesByPlayers**

  * Ellenőrzi, hogy a játékok játékosszám szerint vannak rendezve.

* **FetchData_ReturnsExpectedGameCount**

  * Ellenőrzi a visszaadott játékok számát.

### YouTubeProviderTests.cs

* **Metadata_IsCorrect**

  * Ellenőrzi a YouTube provider alapadatait.

* **FetchData_ReturnsVideos**

  * Ellenőrzi, hogy videók listája érkezik vissza.

* **FetchData_ContainsVideoTitles**

  * Ellenőrzi, hogy minden videó rendelkezik címmel.

* **FetchData_ReturnsSortedResults**

  * Ellenőrzi, hogy a videók a kívánt sorrendben érkeznek vissza.

---

## Futtatás

### Rider

1. Nyisd meg a `Dashboard.Tests.csproj` fájlt.
2. Várd meg a NuGet csomagok letöltését.
3. Jobb klikk a projekten → **Run Tests**.

### Terminál

```bash
cd Dashboard.Tests
dotnet test
```
