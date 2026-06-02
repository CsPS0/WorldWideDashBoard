"use client";
import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { MonitorPlay } from 'lucide-react';
export default function YouTubePage() {
  const [youtube, setYoutube] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYoutuber, setSelectedYoutuber] = useState('MrBeast');
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setYoutube(data['youtube_stats']);
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
        <div className="w-12 h-12 border-4 border-transparent/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">YouTube Analytics</h2>
      <WidgetCard id="youtube" title="YouTube Stats" icon={MonitorPlay} delay={100} className="w-full">
        {youtube ? (
          <div className="flex flex-col gap-8 p-4">
            <div className="flex justify-start items-center">
              <select 
                className="bg-black/50 text-white rounded-lg px-6 py-3 text-lg border border-white/10 outline-none focus:border-orange transition-colors cursor-pointer"
                value={selectedYoutuber}
                onChange={(e) => setSelectedYoutuber(e.target.value)}
              >
                {Object.keys(youtube).map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            {youtube[selectedYoutuber] ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="bg-black/30 p-8 rounded-xl">
                  <div className="text-5xl font-bold text-white mb-2">{formatNumber(youtube[selectedYoutuber].subscriberCount)}</div>
                  <div className="text-sm text-alabaster mt-1">Subscribers</div>
                </div>
                <div className="bg-black/30 p-8 rounded-xl">
                  <div className="text-5xl font-bold text-white mb-2">{formatNumber(youtube[selectedYoutuber].viewCount)}</div>
                  <div className="text-sm text-alabaster mt-1">Total Views</div>
                </div>
                <div className="bg-black/30 p-8 rounded-xl">
                  <div className="text-5xl font-bold text-white mb-2">{youtube[selectedYoutuber].videoCount.toLocaleString()}</div>
                  <div className="text-sm text-alabaster mt-1">Videos</div>
                </div>
              </div>
            ) : (
              <div className="text-alabaster text-center py-8">No data for {selectedYoutuber}</div>
            )}
          </div>
        ) : (
          <div className="text-alabaster text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
