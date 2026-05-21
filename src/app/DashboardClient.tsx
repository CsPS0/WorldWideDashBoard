"use client";

import React, { useEffect, useState } from 'react';
import { WidgetCard } from './components/WidgetCard';
import { 
  Gamepad2, 
  MonitorPlay, 
  TrendingUp, 
  Bitcoin, 
  Landmark, 
  Users, 
  Activity,
  Music,
  Sun,
  Moon
} from 'lucide-react';

interface SteamData {
  player_count: number;
}

interface YouTubeData {
  [key: string]: {
    name: string;
    subscriberCount: number;
    viewCount: number;
    videoCount: number;
  };
}

interface FinanceData {
  crypto: {
    bitcoin: { usd: number; eur: number };
    ethereum: { usd: number; eur: number };
  };
  currency: {
    EUR_TO_HUF: number;
    EUR_TO_USD: number;
  };
}

interface PoliticsData {
  turnoutPercentage: number;
  processedPercentage: number;
  leadingParty: string;
}

export interface MusicTrack {
  rank: number;
  title: string;
  artist: string;
  spotifyStreams: number;
  soundcloudStreams: number;
  totalStreams: number;
}

interface DashboardData {
  steam_players?: SteamData;
  youtube_stats?: YouTubeData;
  finance_markets?: FinanceData;
  hungarian_elections?: PoliticsData;
  global_music?: MusicTrack[];
}

export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYoutuber, setSelectedYoutuber] = useState('MrBeast');
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      // eslint-disable-next-line
      setIsLightMode(true);
      document.body.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    if (isLightMode) {
      document.body.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      setIsLightMode(false);
    } else {
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
      setIsLightMode(true);
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-transparent/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const steam = data?.['steam_players'];
  const youtube = data?.['youtube_stats'];
  const finance = data?.['finance_markets'];
  const politics = data?.['hungarian_elections'];
  const music = data?.['global_music'];

  return (
    <div className="w-full px-4 lg:px-8 xl:px-12 flex flex-col xl:flex-row gap-8 pb-12">
      
      {/* Left Sidebar - Navigation */}
      <div className="hidden xl:flex w-64 flex-col shrink-0 sticky top-8 h-fit">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-white mb-4">Segments</h2>
          <nav className="flex flex-col gap-2">
            {[
              { id: 'steam', icon: Gamepad2, label: 'Steam' },
              { id: 'youtube', icon: MonitorPlay, label: 'YouTube' },
              { id: 'music', icon: Music, label: 'Music' },
              { id: 'crypto', icon: Bitcoin, label: 'Crypto' },
              { id: 'exchange', icon: TrendingUp, label: 'Exchange Rates' },
              { id: 'politics', icon: Landmark, label: 'Politics' },
            ].map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-alabaster hover:bg-black/30 hover:text-orange transition-colors"
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Header */}
        <div className="glass-panel p-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-orange to-alabaster mb-2">
            World Wide Dashboard
          </h1>
          <p className="text-alabaster">Real-time global insights at a glance.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-alabaster bg-black/30 px-4 py-2 rounded-full">
            <Activity size={16} className="text-white" />
            Live Updates Active
          </div>
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 text-orange hover:bg-black/50 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Steam Widget */}
        <WidgetCard id="steam" title="CS2 Players" icon={Gamepad2} delay={100} className="col-span-1 md:col-span-2 lg:col-span-1">
          {steam ? (
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">{steam.player_count.toLocaleString()}</div>
              <div className="text-sm text-alabaster">Current Online Players</div>
            </div>
          ) : (
            <div className="text-alabaster text-center">Data unavailable</div>
          )}
        </WidgetCard>

        {/* YouTube Widget */}
        <WidgetCard id="youtube" title="YouTube Stats" icon={MonitorPlay} delay={200} className="col-span-1 md:col-span-2 lg:col-span-2">
          {youtube ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-start items-center">
                <select 
                  className="bg-black/50 text-white rounded-lg px-4 py-2 text-sm border border-white/10 outline-none focus:border-orange transition-colors cursor-pointer"
                  value={selectedYoutuber}
                  onChange={(e) => setSelectedYoutuber(e.target.value)}
                >
                  {Object.keys(youtube).map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              {youtube[selectedYoutuber] ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="bg-black/30 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-white">{formatNumber(youtube[selectedYoutuber].subscriberCount)}</div>
                    <div className="text-xs text-alabaster mt-1">Subscribers</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-white">{formatNumber(youtube[selectedYoutuber].viewCount)}</div>
                    <div className="text-xs text-alabaster mt-1">Total Views</div>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-white">{youtube[selectedYoutuber].videoCount.toLocaleString()}</div>
                    <div className="text-xs text-alabaster mt-1">Videos</div>
                  </div>
                </div>
              ) : (
                <div className="text-alabaster text-center py-4">No data for {selectedYoutuber}</div>
              )}
            </div>
          ) : (
            <div className="text-alabaster text-center py-4">Data unavailable</div>
          )}
        </WidgetCard>

        {/* Music Widget */}
        <WidgetCard id="music" title="Global Top 10 Music" icon={Music} delay={450} className="col-span-1 lg:col-span-1 row-span-2 flex flex-col max-h-150">
          {music ? (
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
              {music.map((track) => (
                <div key={track.rank} className="flex items-center gap-3 bg-black/30 p-3 rounded-xl hover:bg-black/50 transition-colors">
                  <div className="w-8 shrink-0 text-center font-bold text-xl text-alabaster">
                    {track.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{track.title}</div>
                    <div className="text-xs text-alabaster truncate">{track.artist}</div>
                  </div>
                  <div className="flex flex-col items-end text-xs shrink-0">
                    <div className="font-bold text-orange">{formatNumber(track.totalStreams)}</div>
                    <div className="text-[10px] text-alabaster">Comb.</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-alabaster text-center py-4">Data unavailable</div>
          )}
        </WidgetCard>

        {/* Finance Widget - Crypto */}
        <WidgetCard id="crypto" title="Crypto Markets" icon={Bitcoin} delay={300} className="col-span-1 md:col-span-2">
          {finance ? (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center text-orange">₿</div>
                  <span className="font-medium text-white">Bitcoin</span>
                </div>
                <div className="text-xl font-bold text-white">${finance.crypto.bitcoin.usd.toLocaleString()}</div>
              </div>
              <div className="flex justify-between items-center bg-black/30 p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange/20 flex items-center justify-center text-orange">Ξ</div>
                  <span className="font-medium text-white">Ethereum</span>
                </div>
                <div className="text-xl font-bold text-white">${finance.crypto.ethereum.usd.toLocaleString()}</div>
              </div>
            </div>
          ) : (
            <div className="text-alabaster text-center">Data unavailable</div>
          )}
        </WidgetCard>

        {/* Finance Widget - Currency */}
        <WidgetCard id="exchange" title="Exchange Rates" icon={TrendingUp} delay={400} className="col-span-1">
          {finance ? (
            <div className="flex flex-col gap-4">
              <div className="text-center bg-black/30 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">{finance.currency.EUR_TO_HUF.toFixed(2)} Ft</div>
                <div className="text-xs text-alabaster mt-1">1 EUR</div>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl">
                <div className="text-2xl font-bold text-white">${finance.currency.EUR_TO_USD.toFixed(2)}</div>
                <div className="text-xs text-alabaster mt-1">1 EUR</div>
              </div>
            </div>
          ) : (
            <div className="text-alabaster text-center">Data unavailable</div>
          )}
        </WidgetCard>

        {/* Politics Widget */}
        <WidgetCard id="politics" title="Election 2026" icon={Landmark} delay={500} className="col-span-1 md:col-span-3 lg:col-span-1 xl:col-span-4">
          {politics ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col justify-center items-center">
                <div className="text-4xl font-bold text-white mb-2">{politics.turnoutPercentage}%</div>
                <div className="text-sm text-alabaster flex items-center gap-2"><Users size={14}/> Voter Turnout</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-4xl font-bold text-orange mb-2">{politics.leadingParty}</div>
                <div className="text-sm text-alabaster">Leading Party</div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="text-4xl font-bold text-orange mb-2">{politics.processedPercentage}%</div>
                <div className="text-sm text-alabaster">Processed Votes</div>
              </div>
            </div>
          ) : (
            <div className="text-alabaster text-center">Data unavailable</div>
          )}
        </WidgetCard>

      </div>
      </div>

      {/* Right Sidebar - Account */}
      <div className="hidden xl:flex w-72 flex-col shrink-0 sticky top-8 h-fit">
        <div className="glass-panel p-6">
          <h2 className="text-xl font-bold text-white mb-4">Account</h2>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 px-4 bg-orange text-black font-bold rounded-lg hover:brightness-110 transition-all text-center">
              Sign Up
            </button>
            <button className="w-full py-3 px-4 bg-black/30 border border-white/10 text-white font-bold rounded-lg hover:bg-black/50 transition-all text-center">
              Login
            </button>
          </div>
          <p className="mt-4 text-xs text-center text-alabaster">
            Create an account to save your dashboard preferences.
          </p>
        </div>
      </div>

    </div>
  );
}
