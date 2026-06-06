## 3. Osztálydiagram (Class Diagram)
Részletes UML diagram a **Strategy Pattern** (Stratégia Tervezési Minta) megvalósításáról. Professzionális OOP kapcsolatokkal (Aggregáció, Megvalósítás, Öröklődés) és kardinalitással bővítve.

```mermaid
classDiagram

    class DashboardManager {
        -IDataSource[] sources
        +addSource(source: IDataSource) void
        +removeSource(id: string) void
        +fetchAllData() Promise~any~
        +refreshData() void
    }


    class IDataSource {
        <<interface>>
        +String id
        +String name
        +Boolean isActive
        +fetchData() Promise~any~
        +getData() any
    }


    class BaseDataSource {
        <<abstract>>
        +String id
        +String name
        +Boolean isActive
        #Object cache
        +fetchData()* Promise~any~
        +getData() any
        #handleError(error: Error) void
    }


    class SteamProvider {
        -String apiKey
        -String steamId
        +fetchData() Promise~any~
        +getRecentGames() any
        +getPlayerSummaries() any
    }

    class YouTubeProvider {
        -String apiKey
        -String channelId
        +fetchData() Promise~any~
        +getChannelStats() any
    }

    class PoliticsProvider {
        -String region
        +fetchData() Promise~any~
        +getElectionStats() any
    }

    class FinanceProvider {
        -Array~String~ currencyPairs
        +fetchData() Promise~any~
        +getExchangeRates() any
    }

    class MusicProvider {
        -String defaultCountry
        +fetchData() Promise~any~
    }

    class TRNProvider {
        -String trnApiKey
        +fetchData() Promise~any~
    }

    class ExophaseProvider {
        -String username
        +fetchData() Promise~any~
    }

    class PersonalProviders {
        <<group>>
        SteamPersonalProvider
        LastFmPersonalProvider
        YouTubePersonalProvider
    }


    IDataSource <|.. BaseDataSource : Megvalósítja (Realization)
    DashboardManager "1" o-- "*" IDataSource : Aggregál (1-to-Many)
    
    BaseDataSource <|-- SteamProvider : Öröklődés
    BaseDataSource <|-- YouTubeProvider : Öröklődés
    BaseDataSource <|-- PoliticsProvider : Öröklődés
    BaseDataSource <|-- FinanceProvider : Öröklődés
    BaseDataSource <|-- MusicProvider : Öröklődés
    BaseDataSource <|-- TRNProvider : Öröklődés
    BaseDataSource <|-- ExophaseProvider : Öröklődés
    BaseDataSource <|-- PersonalProviders : Öröklődés
```