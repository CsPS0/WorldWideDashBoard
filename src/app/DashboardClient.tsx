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
  Music,
  Star
} from 'lucide-react';
import CurrencyChart from './components/CurrencyChart';
export interface MusicTrack {
  rank: number;
  title: string;
  artist: string;
  spotifyStreams: number;
  soundcloudStreams: number;
  totalStreams: number;
}
interface DashboardData {
  steam_players?: { player_count: number };
  youtube_stats?: Record<string, { subscriberCount: number; viewCount: number; videoCount: number }>;
  finance_markets?: {
    crypto: { bitcoin: { usd: number; eur: number }; ethereum: { usd: number; eur: number } };
    currency: { EUR_TO_HUF: number; EUR_TO_USD: number };
  };
  hungarian_elections?: {
    turnoutPercentage: number;
    processedPercentage: number;
    parties: {
      name: string;
      listMandates: number;
      individualMandates: number;
      totalMandates: number;
      listVotesPercentage: number;
    }[];
  };
  global_music?: MusicTrack[];
  personal_data?: {
    youtube?: Record<string, { name: string; subscriberCount: number }>;
    steam?: { username: string; inventoryValue: number; hoursPlayed: number };
    artist?: { name: string; monthlyListeners: number };
  };
}
export default function DashboardClient() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYoutuber, setSelectedYoutuber] = useState('MrBeast');
  const [preferences, setPreferences] = useState<{ dashboardStyle: string; hiddenWidgets: string[] }>({
    dashboardStyle: 'grid',
    hiddenWidgets: [],
  });
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    fetch('/api/auth/preferences')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not logged in');
      })
      .then((prefData) => {
        setPreferences({
          dashboardStyle: prefData.dashboardStyle || 'grid',
          hiddenWidgets: prefData.hiddenWidgets ? JSON.parse(prefData.hiddenWidgets) : [],
        });
      })
      .catch(() => {});
  }, []);
  const fmt = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-[3px] border-border-subtle border-t-accent rounded-full animate-spin" />
      </div>
    );
  }
  const steam = data?.steam_players;
  const youtube = data?.youtube_stats;
  const finance = data?.finance_markets;
  const politics = data?.hungarian_elections;
  const music = data?.global_music;
  const personal = data?.personal_data;
  const isGrid = preferences.dashboardStyle === 'grid';
  const { hiddenWidgets } = preferences;
  return (
    <div className="w-full space-y-6">
      {personal && Object.keys(personal).length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3 flex items-center gap-2">
            <Star size={14} className="text-accent-warm" />
            Personal Showcase
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {personal.youtube && Object.values(personal.youtube).map((ch: { name: string; subscriberCount: number }) => (
              <div key={ch.name} className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <MonitorPlay size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{ch.name}</p>
                  <p className="text-xs text-secondary">YouTube · {fmt(ch.subscriberCount)} subs</p>
                </div>
              </div>
            ))}
            {personal.steam && (
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Gamepad2 size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{personal.steam.username}</p>
                  <p className="text-xs text-secondary">Steam · ${personal.steam.inventoryValue.toLocaleString()}</p>
                </div>
              </div>
            )}
            {personal.artist && (
              <div className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <Music size={20} className="text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-primary truncate">{personal.artist.name}</p>
                  <p className="text-xs text-secondary">{fmt(personal.artist.monthlyListeners)} monthly listeners</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      <div className={
        isGrid
          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          : "flex flex-col gap-4"
      }>
        {!hiddenWidgets.includes('steam') && (
          <WidgetCard id="steam" title="CS2 Players" icon={Gamepad2} delay={100} theme="dark">
            {steam ? (
              <div className="text-center py-4">
                <div className="text-4xl font-bold text-primary mb-1">{steam.player_count.toLocaleString()}</div>
                <div className="text-xs text-secondary">Current Online Players</div>
              </div>
            ) : (
              <div className="text-muted text-center py-4 text-sm">Data unavailable</div>
            )}
          </WidgetCard>
        )}
        {!hiddenWidgets.includes('youtube') && (
          <WidgetCard id="youtube" title="YouTube Stats" icon={MonitorPlay} delay={200} className="md:col-span-2 xl:col-span-2" theme="light">
            {youtube ? (
              <div className="flex flex-col gap-4">
                <select
                  className="self-start bg-surface-inset text-primary text-sm rounded-lg px-3 py-2 border border-border-subtle outline-none focus:border-accent transition-colors cursor-pointer"
                  value={selectedYoutuber}
                  onChange={(e) => setSelectedYoutuber(e.target.value)}
                >
                  {Object.keys(youtube).map((name) => (
                    <option key={name} value={name} className="bg-surface-inset text-primary">{name}</option>
                  ))}
                </select>
                {youtube[selectedYoutuber] ? (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Subscribers', value: fmt(youtube[selectedYoutuber].subscriberCount) },
                      { label: 'Total Views', value: fmt(youtube[selectedYoutuber].viewCount) },
                      { label: 'Videos', value: youtube[selectedYoutuber].videoCount.toLocaleString() },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-surface-inset p-3 rounded-lg text-center border border-border-subtle">
                        <div className="text-xl font-bold text-primary">{stat.value}</div>
                        <div className="text-[11px] text-secondary mt-0.5">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted text-center py-4 text-sm">No data for {selectedYoutuber}</div>
                )}
              </div>
            ) : (
              <div className="text-muted text-center py-4 text-sm">Data unavailable</div>
            )}
          </WidgetCard>
        )}
        {!hiddenWidgets.includes('music') && (
          <WidgetCard id="music" title="Global Top 10" icon={Music} delay={450} className="xl:row-span-2 flex flex-col max-h-[600px]">
            {music ? (
              <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
                {music.map((track) => (
                  <div key={track.rank} className="flex items-center gap-3 bg-surface-inset p-2.5 rounded-lg hover:bg-surface-card-hover transition-colors border border-border-subtle">
                    <div className="w-6 text-center text-sm font-bold text-muted">{track.rank}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-primary truncate">{track.title}</div>
                      <div className="text-[11px] text-secondary truncate">{track.artist}</div>
                    </div>
                    <div className="text-xs font-semibold text-accent-warm shrink-0">{fmt(track.totalStreams)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted text-center py-4 text-sm">Data unavailable</div>
            )}
          </WidgetCard>
        )}
        {!hiddenWidgets.includes('crypto') && (
          <WidgetCard id="crypto" title="Crypto Markets" icon={Bitcoin} delay={300} className="md:col-span-2 xl:col-span-1" theme="accent">
            {finance?.crypto ? (
              <div className="space-y-4">
                {[
                  { name: 'Bitcoin', symbol: 'BTC', price: finance.crypto.bitcoin.usd },
                  { name: 'Ethereum', symbol: 'ETH', price: finance.crypto.ethereum.usd },
                ].map((coin) => (
                  <div key={coin.name} className="flex items-center justify-between p-3 rounded-lg bg-surface-inset border border-border-subtle">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent-warm/15 flex items-center justify-center font-bold text-xs text-accent-warm">
                        {coin.symbol}
                      </div>
                      <span className="text-sm font-medium text-primary">{coin.name}</span>
                    </div>
                    <span className="text-base font-bold text-primary">${coin.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted text-center py-4 text-sm">Data unavailable</div>
            )}
          </WidgetCard>
        )}
        {!hiddenWidgets.includes('exchange') && (
          <WidgetCard id="exchange" title="Currency Explorer" icon={TrendingUp} delay={400} className="md:col-span-2">
            <CurrencyChart height={220} />
          </WidgetCard>
        )}
        {!hiddenWidgets.includes('politics') && (
          <WidgetCard id="politics" title="Election 2026" icon={Landmark} delay={500} className="md:col-span-2 xl:col-span-3">
            {politics ? (
              <div className="flex flex-col gap-4 py-2">
                <div className="flex justify-between items-center bg-surface-inset p-3 rounded-lg border border-border-subtle">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-accent" />
                    <span className="text-sm text-secondary">Voter Turnout</span>
                  </div>
                  <span className="text-sm font-bold text-primary">{politics.turnoutPercentage}%</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-[11px] text-muted uppercase border-b border-border-subtle">
                      <tr>
                        <th className="pb-2 font-medium">Party</th>
                        <th className="pb-2 font-medium text-right">List</th>
                        <th className="pb-2 font-medium text-right">Individual</th>
                        <th className="pb-2 font-medium text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {politics.parties.map((party: any) => (
                        <tr key={party.name}>
                          <td className="py-2.5 font-semibold text-primary">{party.name}</td>
                          <td className="py-2.5 text-right text-secondary">{party.listMandates}</td>
                          <td className="py-2.5 text-right text-secondary">{party.individualMandates}</td>
                          <td className="py-2.5 text-right font-bold text-accent-warm">{party.totalMandates}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-muted text-center py-4 text-sm">Data unavailable</div>
            )}
          </WidgetCard>
        )}
      </div>
    </div>
  );
}
