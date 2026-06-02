"use client";
import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { Landmark, Users } from 'lucide-react';
export default function PoliticsPage() {
  const [politics, setPolitics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setPolitics(data['hungarian_elections']);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-12 h-12 border-4 border-transparent/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-white mb-6">Hungarian Elections 2026</h2>
      <WidgetCard id="politics" title="Election Insights" icon={Landmark} delay={100} className="w-full">
        {politics ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6">
            <div className="flex flex-col justify-center items-center bg-black/30 p-10 rounded-2xl">
              <Users size={32} className="text-white mb-4" />
              <div className="text-6xl font-bold text-white mb-2">{politics.turnoutPercentage}%</div>
              <div className="text-lg text-alabaster">Voter Turnout</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-black/30 p-10 rounded-2xl border border-orange/30 shadow-[0_0_15px_rgba(255,165,0,0.1)]">
              <Landmark size={32} className="text-orange mb-4" />
              <div className="text-5xl font-bold text-orange mb-4 text-center">{politics.leadingParty}</div>
              <div className="text-lg text-alabaster">Leading Party</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-black/30 p-10 rounded-2xl">
              <div className="text-6xl font-bold text-white mb-4">{politics.processedPercentage}%</div>
              <div className="text-lg text-alabaster">Processed Votes</div>
              <div className="w-full bg-white/10 h-2 rounded-full mt-6">
                <div 
                  className="bg-orange h-2 rounded-full" 
                  style={{ width: `${politics.processedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-alabaster text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
