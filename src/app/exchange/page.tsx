"use client";
import React from 'react';
import { WidgetCard } from '../components/WidgetCard';
import { TrendingUp } from 'lucide-react';
import CurrencyChart from '../components/CurrencyChart';
export default function ExchangePage() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-primary mb-6">Exchange Rates</h2>
      <WidgetCard id="exchange" title="Interactive Currency Explorer" icon={TrendingUp} delay={100} className="w-full">
        <div className="p-6">
          <CurrencyChart height={450} showCalculator={true} />
        </div>
      </WidgetCard>
    </div>
  );
}
