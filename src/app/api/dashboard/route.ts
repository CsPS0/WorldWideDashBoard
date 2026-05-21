import { NextResponse } from 'next/server';
import { DashboardManager } from '@/lib/core/DashboardManager';
import { SteamProvider } from '@/lib/providers/SteamProvider';
import { YouTubeProvider } from '@/lib/providers/YouTubeProvider';
import { FinanceProvider } from '@/lib/providers/FinanceProvider';
import { PoliticsProvider } from '@/lib/providers/PoliticsProvider';
import { MusicProvider } from '@/lib/providers/MusicProvider';

export async function GET() {
  try {
    const manager = new DashboardManager();
    
    // Register all data sources
    manager.registerProvider(new SteamProvider(730)); // Counter-Strike 2
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

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
