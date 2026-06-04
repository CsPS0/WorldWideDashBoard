# Dashboard.Tests – Tesztelési Jegyzőkönyv

**Dátum:** 2026. 06. 02.
**Keretrendszer:** xUnit (.NET 8.0)
**Összes teszt:** 30 | **Sikeres:** 30 | **Sikertelen:** 0

---

## Tesztelési Jegyzőkönyv

| # | Teszt neve | Kategória | Dátum / Idő | Eredmény |
|---|------------|-----------|-------------|----------|
| 1 | FetchByProviderId_ReturnsNull_WhenProviderDoesNotExist | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 2 | FetchByProviderId_ReturnsProviderData_WhenProviderExists | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 3 | FetchAllData_ReturnsDataFromEveryValidProvider | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 4 | FetchAllData_SkipsProvider_WhenValidationFailsAndNoCacheExists | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 5 | GetProvidersByCategory_ReturnsOnlyMatchingProviders | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 6 | GetCacheKey_UsesCategoryAndId | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 7 | BaseDataSource_StoresProviderMetadata | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 8 | FetchDataAsync_ReturnsConfiguredData | Core | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 9 | Metadata_IsCorrect (Finance) | Finance | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 10 | FetchDataAsync_ReturnsCryptoAndCurrencyData | Finance | 2026. 06. 02. – 00:00:02 | ✅ Sikeres |
| 11 | ValidateResponse_ReturnsTrue_ForFinanceData | Finance | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 12 | ValidateResponse_ReturnsFalse_ForWrongShape | Finance | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 13 | Metadata_IsCorrect (Music) | Entertainment | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 14 | FetchDataAsync_AssignsRanksStartingFromOne | Entertainment | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 15 | FetchDataAsync_SortsByTotalStreamsDescending | Entertainment | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 16 | FetchDataAsync_CalculatesTotalStreams | Entertainment | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 17 | ValidateResponse_ReturnsFalse_ForEmptyList (Music) | Entertainment | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 18 | Metadata_IsCorrect (Politics) | Politics | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 19 | FetchDataAsync_ReturnsFallbackPresentationData | Politics | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 20 | ValidateResponse_ReturnsTrue_ForPoliticsData | Politics | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 21 | ValidateResponse_ReturnsFalse_ForWrongData | Politics | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 22 | Metadata_IsCorrect (Steam) | Games | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 23 | Constructor_StoresAppIdInRequestUrl | Games | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 24 | ValidateResponse_ReturnsTrue_ForSteamPlayerData | Games | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 25 | ValidateResponse_ReturnsFalse_ForInvalidData (Steam) | Games | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 26 | Metadata_IsCorrect (YouTube) | Video | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 27 | BuildUrl_ContainsAllChannelIdsAndApiKey | Video | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 28 | FetchDataAsync_ReturnsMockStatsForEveryChannel | Video | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 29 | ParseItems_MapsStatisticsToChannelNames | Video | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |
| 30 | ValidateResponse_ReturnsFalse_ForEmptyObject (YouTube) | Video | 2026. 06. 02. – 00:00:01 | ✅ Sikeres |

---

**Összesítés:** 30 teszt futtatva | 30 sikeres | 0 sikertelen | Futási idő: ~00:00:32