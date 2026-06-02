import { NextResponse } from 'next/server';
import { DashboardManager } from '@/lib/core/DashboardManager';
import { SteamProvider } from '@/lib/providers/SteamProvider';
import { YouTubeProvider } from '@/lib/providers/YouTubeProvider';
import { FinanceProvider } from '@/lib/providers/FinanceProvider';
import { PoliticsProvider } from '@/lib/providers/PoliticsProvider';
import { MusicProvider } from '@/lib/providers/MusicProvider';
export async function GET(req: Request) {
  try {
    const manager = new DashboardManager();
    manager.registerProvider(new SteamProvider(730)); 
    manager.registerProvider(new YouTubeProvider([
      { name: 'MrBeast', id: 'UCX6OQ3DkcsbYNE6H8uQQuVA' },
      { name: 'Pearoo', id: 'UCsBw4YIB40Zpiw4yVIqxtbg' },
      { name: 'chewiebutbetter', id: 'UCQ-A-kiSu1ADgUrJ58d4G0A' },
      { name: 'TheVR', id: 'UCrpWCVp9FuGA8OnGtA0rgsw' },
      { name: 'Nessaj', id: 'UCcSAt9uIqRHK8dEV2wVY1dQ' }
    ]));
    manager.registerProvider(new FinanceProvider());
    manager.registerProvider(new PoliticsProvider());
    manager.registerProvider(new MusicProvider());
    const data = await manager.fetchAllData();
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    if (token) {
      const { verifyToken } = await import('@/lib/utils/auth');
      const { prisma } = await import('@/lib/utils/prisma');
      const payload = await verifyToken(token);
      if (payload && payload.id) {
        const user = await prisma.user.findUnique({
          where: { id: payload.id as string }
        });
        if (user) {
          const personalData: any = {};
          if (user.youtubeHandle) {
            try {
              let ytId = user.youtubeHandle;
              let ytDisplayName = ytId;
              const handleMatch = ytId.match(/youtube\.com\/@([^/?]+)/);
              const channelMatch = ytId.match(/youtube\.com\/channel\/(UC[^/?]+)/);
              if (channelMatch) {
                ytId = channelMatch[1];
                ytDisplayName = ytId;
              } else if (handleMatch) {
                ytDisplayName = handleMatch[1];
                ytId = handleMatch[1];
              }
              const apiKey = process.env.YOUTUBE_API_KEY;
              if (apiKey && apiKey !== 'your_youtube_api_key_here' && !ytId.startsWith('UC')) {
                const handleRes = await fetch(
                  `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&forHandle=${ytId}&key=${apiKey}`
                );
                if (handleRes.ok) {
                  const handleData = await handleRes.json();
                  if (handleData.items?.[0]) {
                    const item = handleData.items[0];
                    const stats = item.statistics;
                    personalData.youtube = {
                      [ytDisplayName]: {
                        name: item.snippet?.title || ytDisplayName,
                        subscriberCount: parseInt(stats.subscriberCount, 10),
                        viewCount: parseInt(stats.viewCount, 10),
                        videoCount: parseInt(stats.videoCount, 10),
                      }
                    };
                  }
                }
              }
              if (!personalData.youtube) {
                const personalYt = new YouTubeProvider([{ name: ytDisplayName, id: ytId }]);
                personalData.youtube = await personalYt.fetchData();
              }
            } catch {
            }
          }
          if (user.steamId) {
            try {
              let steamName = user.steamId;
              const vanityMatch = steamName.match(/steamcommunity\.com\/id\/([^/?]+)/);
              const profileMatch = steamName.match(/steamcommunity\.com\/profiles\/(\d+)/);
              if (vanityMatch) {
                steamName = vanityMatch[1];
              } else if (profileMatch) {
                steamName = profileMatch[1];
              }
              personalData.steam = {
                username: steamName,
                inventoryValue: Math.floor(Math.random() * 5000) + 100,
                hoursPlayed: Math.floor(Math.random() * 3000) + 500,
              };
            } catch {
            }
          }
          if (user.favoriteArtist) {
            try {
              let artistName = user.favoriteArtist;
              const spotifyMatch = artistName.match(/open\.spotify\.com\/artist\/([^/?]+)/);
              if (spotifyMatch) {
                artistName = spotifyMatch[1];
              }
              personalData.artist = {
                name: artistName,
                monthlyListeners: Math.floor(Math.random() * 50000000) + 1000000,
              };
            } catch {
            }
          }
          if (Object.keys(personalData).length > 0) {
            data['personal_data'] = personalData;
          }
        }
      }
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
