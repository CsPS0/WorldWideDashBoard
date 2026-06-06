# Dashboard.Tests – Tesztelési Jegyzőkönyv

**Dátum:** 2026. 06. 07.
**Keretrendszer:** xUnit (.NET 8.0)
**Összes teszt:** 30 | **Sikeres:** 30 | **Sikertelen:** 0

---

## Tesztelési Jegyzőkönyv

| # | Teszt neve | Kategória | Dátum / Idő | Eredmény |
|---|------------|-----------|-------------|----------|
| 1 | ValidateResponse_ReturnsFalse_ForWrongData | Politics | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 2 | GetCacheKey_UsesCategoryAndId | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 3 | ValidateResponse_ReturnsFalse_ForWrongShape | Finance | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 4 | FetchDataAsync_CalculatesTotalStreams | Entertainment | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 5 | Metadata_IsCorrect | Entertainment | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 6 | BaseDataSource_StoresProviderMetadata | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 7 | BuildUrl_ContainsAllChannelIdsAndApiKey | Video | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 8 | ValidateResponse_ReturnsFalse_ForInvalidData | Games | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 9 | ValidateResponse_ReturnsTrue_ForPoliticsData | Politics | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 10 | Constructor_StoresAppIdInRequestUrl | Games | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 11 | FetchAllData_ReturnsDataFromEveryValidProvider | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 12 | FetchDataAsync_AssignsRanksStartingFromOne | Entertainment | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 13 | ValidateResponse_ReturnsTrue_ForFinanceData | Finance | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 14 | FetchAllData_SkipsProvider_WhenValidationFailsAndNoCacheExists | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 15 | GetProvidersByCategory_ReturnsOnlyMatchingProviders | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 16 | ValidateResponse_ReturnsTrue_ForSteamPlayerData | Games | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 17 | Metadata_IsCorrect | Politics | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 18 | FetchByProviderId_ReturnsNull_WhenProviderDoesNotExist | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 19 | ValidateResponse_ReturnsFalse_ForEmptyObject | Video | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 20 | Metadata_IsCorrect | Games | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 21 | FetchDataAsync_ReturnsFallbackPresentationData | Politics | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 22 | FetchDataAsync_SortsByTotalStreamsDescending | Entertainment | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 23 | FetchDataAsync_ReturnsConfiguredData | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 24 | FetchByProviderId_ReturnsProviderData_WhenProviderExists | Core | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 25 | ValidateResponse_ReturnsFalse_ForEmptyList | Entertainment | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 26 | Metadata_IsCorrect | Finance | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 27 | ParseItems_MapsStatisticsToChannelNames | Video | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 28 | FetchDataAsync_ReturnsMockStatsForEveryChannel | Video | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 29 | Metadata_IsCorrect | Video | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |
| 30 | FetchDataAsync_ReturnsCryptoAndCurrencyData | Finance | 2026. 06. 07. – 01:20:15 | ✅ Sikeres |

---

**Összesítés:** 30 teszt futtatva | 30 sikeres | 0 sikertelen | Futási idő: 00:00:00.475
