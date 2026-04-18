import { BaseDataSource } from '../core/DataSource';

export interface SteamPlayerData {
  player_count: number;
  result: number;
}

export class SteamProvider extends BaseDataSource<SteamPlayerData> {
  id = 'steam_players';
  name = 'Steam Player Count';
  category = 'Games';

  private appId: number;

  constructor(appId: number) {
    super();
    this.appId = appId;
  }

  async fetchData(): Promise<SteamPlayerData> {
    try {
      const response = await fetch(
        `https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=${this.appId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      return data.response as SteamPlayerData;
    } catch (error) {
      return this.handleFetchError(error);
    }
  }

  validateResponse(data: any): boolean {
    return typeof data === 'object' && 'player_count' in data && 'result' in data;
  }
}
