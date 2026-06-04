"use client";
import React, { useEffect, useState } from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { Bitcoin } from 'lucide-react';
export default function CryptoPage() {
  const [finance, setFinance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => res.json())
      .then((data) => {
        setFinance(data['finance_markets']);
        setLoading(false);
      })
      .catch(console.error);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <div className="w-12 h-12 border-4 border-transparent/20 border-t-accent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary mb-6">Crypto Markets</h2>
      <WidgetCard id="crypto" title="Cryptocurrency Dashboard" icon={Bitcoin} delay={100} className="w-full max-w-4xl">
        {finance ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6">
            <div className="flex flex-col gap-4 bg-surface-inset border border-border-subtle p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-accent-warm/15 flex items-center justify-center text-accent-warm text-3xl font-bold">₿</div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Bitcoin</h3>
                  <span className="text-secondary">BTC</span>
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">${finance.crypto.bitcoin.usd.toLocaleString()}</div>
              <div className="text-xl text-secondary">€{finance.crypto.bitcoin.eur.toLocaleString()}</div>
            </div>
            <div className="flex flex-col gap-4 bg-surface-inset border border-border-subtle p-8 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-accent-warm/15 flex items-center justify-center text-accent-warm text-3xl font-bold">Ξ</div>
                <div>
                  <h3 className="text-2xl font-bold text-primary">Ethereum</h3>
                  <span className="text-secondary">ETH</span>
                </div>
              </div>
              <div className="text-5xl font-bold text-primary mb-2">${finance.crypto.ethereum.usd.toLocaleString()}</div>
              <div className="text-xl text-secondary">€{finance.crypto.ethereum.eur.toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <div className="text-muted text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
