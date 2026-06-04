"use client";
import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { Music } from 'lucide-react';
import { MusicTrack } from '../DashboardClient';
export default function MusicPage() {
  const [music, setMusic] = useState<MusicTrack[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setMusic(data['global_music']);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  const formatNumber = (num: number) => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-12 h-12 border-4 border-transparent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary mb-6">Global Top 10 Music</h2>
      <WidgetCard id="music" title="Top Tracks" icon={Music} delay={100} className="w-full">
        {music ? (
          <div className="flex flex-col gap-4 p-4">
            {music.map((track) => (
              <div key={track.rank} className="flex items-center gap-6 bg-surface-inset border border-border-subtle p-6 rounded-xl hover:bg-surface-card-hover transition-colors">
                <div className="w-12 shrink-0 text-center font-bold text-3xl text-muted">
                  {track.rank}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xl font-bold text-primary mb-1">{track.title}</div>
                  <div className="text-md text-secondary">{track.artist}</div>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <div className="font-bold text-2xl text-accent-warm">{formatNumber(track.totalStreams)}</div>
                  <div className="text-sm text-secondary mt-1">Combined Streams</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-muted text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
