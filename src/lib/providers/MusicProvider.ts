import { BaseDataSource } from '../core/DataSource';
export interface MusicTrack {
  rank: number;
  title: string;
  artist: string;
  spotifyStreams: number;
  soundcloudStreams: number;
  totalStreams: number;
}
export class MusicProvider extends BaseDataSource<MusicTrack[]> {
  id = 'global_music';
  name = 'Global Top 10 Music';
  category = 'Entertainment';
  async fetchData(): Promise<MusicTrack[]> {
    try {
      const tracks = [
        { title: 'Blinding Lights', artist: 'The Weeknd', spotify: 4100000000, soundcloud: 250000000 },
        { title: 'Shape of You', artist: 'Ed Sheeran', spotify: 3800000000, soundcloud: 190000000 },
        { title: 'Someone You Loved', artist: 'Lewis Capaldi', spotify: 3300000000, soundcloud: 140000000 },
        { title: 'Sunflower', artist: 'Post Malone & Swae Lee', spotify: 3200000000, soundcloud: 310000000 },
        { title: 'Starboy', artist: 'The Weeknd', spotify: 3100000000, soundcloud: 280000000 },
        { title: 'As It Was', artist: 'Harry Styles', spotify: 3000000000, soundcloud: 110000000 },
        { title: 'Dance Monkey', artist: 'Tones And I', spotify: 3000000000, soundcloud: 180000000 },
        { title: 'One Dance', artist: 'Drake', spotify: 2900000000, soundcloud: 400000000 },
        { title: 'STAY', artist: 'The Kid LAROI & Justin Bieber', spotify: 2800000000, soundcloud: 150000000 },
        { title: 'rockstar', artist: 'Post Malone', spotify: 2800000000, soundcloud: 350000000 },
      ];
      const processedTracks: MusicTrack[] = tracks.map((t) => ({
        rank: 0, 
        title: t.title,
        artist: t.artist,
        spotifyStreams: t.spotify,
        soundcloudStreams: t.soundcloud,
        totalStreams: t.spotify + t.soundcloud,
      })).sort((a, b) => b.totalStreams - a.totalStreams);
      processedTracks.forEach((track, index) => {
        track.rank = index + 1;
      });
      return processedTracks;
    } catch (error) {
      return this.handleFetchError(error);
    }
  }
  validateResponse(data: unknown): boolean {
    if (!Array.isArray(data)) return false;
    if (data.length === 0) return false;
    const first = data[0] as Record<string, unknown>;
    return (
      'title' in first &&
      'artist' in first &&
      'totalStreams' in first
    );
  }
}
