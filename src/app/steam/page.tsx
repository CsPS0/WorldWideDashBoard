"use client";
import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { Gamepad2 } from 'lucide-react';
export default function SteamPage() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setPlayerCount(data['steam_players']?.player_count ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-10 h-10 border-[3px] border-border-subtle border-t-accent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full max-w-xl">
      <WidgetCard id="steam-detail" title="CS2 Live Player Count" icon={Gamepad2} delay={100}>
        {playerCount !== null ? (
          <div className="text-center py-8">
            <div className="text-6xl font-bold text-primary mb-2">{playerCount.toLocaleString()}</div>
            <div className="text-sm text-secondary">players online right now</div>
          </div>
        ) : (
          <div className="text-muted text-center py-8 text-sm">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
