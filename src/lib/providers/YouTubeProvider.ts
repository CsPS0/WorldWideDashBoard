import { BaseDataSource } from '../core/DataSource';
export interface ChannelInfo {
  name: string;
  id: string;
}
export type YouTubeData = Record<string, {
  name: string;
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}>;
export class YouTubeProvider extends BaseDataSource<YouTubeData> {
  id = 'youtube_stats';
  name = 'YouTube Channel Stats';
  category = 'Video';
  private channels: ChannelInfo[];
  constructor(channels: ChannelInfo[]) {
    super();
    this.channels = channels;
  }
  async fetchData(): Promise<YouTubeData> {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey || apiKey === 'your_youtube_api_key_here') {
        return this.channels.reduce((acc, ch) => ({
          ...acc,
          [ch.name]: {
            name: ch.name,
            subscriberCount: 260000000,
            viewCount: 45000000000,
            videoCount: 800,
          }
        }), {} as YouTubeData);
      }
      const ids = this.channels.map(c => c.id).join(',');
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ids}&key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data = await response.json();
      const results: YouTubeData = {};
      data.items?.forEach((item: Record<string, unknown>) => {
        const id = item.id as string;
        const stats = item.statistics as Record<string, string>;
        const chInfo = this.channels.find(c => c.id === id);
        if (chInfo && stats) {
          results[chInfo.name] = {
            name: chInfo.name,
            subscriberCount: parseInt(stats.subscriberCount, 10),
            viewCount: parseInt(stats.viewCount, 10),
            videoCount: parseInt(stats.videoCount, 10),
          };
        }
      });
      if (Object.keys(results).length === 0) {
        throw new Error('No statistics found for the channels.');
      }
      return results;
    } catch (error) {
      return this.handleFetchError(error);
    }
  }
  validateResponse(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) return false;
    return Object.keys(data).length > 0;
  }
}
