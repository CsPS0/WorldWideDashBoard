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
        const politicsData = data['world_politics'];
        if (politicsData && politicsData.parties && politicsData.parties.length > 0) {
           const sortedParties = [...politicsData.parties].sort((a: any, b: any) => b.totalMandates - a.totalMandates);
           politicsData.leadingParty = sortedParties[0].name;
        }
        setPolitics(politicsData);
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
    <div className="w-full space-y-10">
      <WidgetCard id="hungary" title="World Politics & Elections - Hungarian Elections 2026 (OGY)" icon={Landmark} delay={100} className="w-full">
        {politics ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 p-6">
            <div className="flex flex-col justify-center items-center bg-surface-inset border border-border-subtle p-10 rounded-2xl">
              <Users size={32} className="text-primary mb-4" />
              <div className="text-6xl font-bold text-primary mb-2">{politics.turnoutPercentage}%</div>
              <div className="text-lg text-secondary">Voter Turnout</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-[#1a1a1a] border-[#292929] border p-10 rounded-2xl">
              <Landmark size={32} className="text-accent-warm mb-4" />
              <div className="text-5xl font-bold text-accent-warm mb-4 text-center">{politics.leadingParty}</div>
              <div className="text-lg text-secondary">Leading Party</div>
            </div>
            <div className="flex flex-col justify-center items-center bg-surface-inset border border-border-subtle p-10 rounded-2xl">
              <div className="text-6xl font-bold text-primary mb-4">{politics.processedPercentage}%</div>
              <div className="text-lg text-secondary">Processed Votes</div>
              <div className="w-full bg-surface-base h-2 rounded-full mt-6 overflow-hidden">
                <div 
                  className="bg-accent h-2 rounded-full" 
                  style={{ width: `${politics.processedPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-muted text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
      <WidgetCard id="leaders" title="World Leaders Directory" icon={Users} delay={200} className="w-full">
        {politics?.globalLeaders ? (
          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-muted uppercase border-b border-border-subtle">
                <tr>
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Role</th>
                  <th className="pb-2 font-medium text-right">Country</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {politics.globalLeaders.map((leader: any) => (
                  <tr key={leader.id}>
                    <td className="py-4 font-bold text-primary text-base">{leader.name}</td>
                    <td className="py-4 text-secondary">{leader.role}</td>
                    <td className="py-4 text-right font-medium text-accent-warm">{leader.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
      <WidgetCard id="parliaments" title="Global Parliaments Overview" icon={Landmark} delay={300} className="w-full">
        {politics?.globalParliaments ? (
          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-muted uppercase border-b border-border-subtle">
                <tr>
                  <th className="pb-2 font-medium">Country</th>
                  <th className="pb-2 font-medium">Chamber</th>
                  <th className="pb-2 font-medium text-right">Women Representation</th>
                  <th className="pb-2 font-medium text-right">Next Election</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {politics.globalParliaments.map((parl: any) => (
                  <tr key={parl.country + parl.chamber}>
                    <td className="py-4 font-bold text-primary text-base">{parl.country}</td>
                    <td className="py-4 text-secondary">{parl.chamber}</td>
                    <td className="py-4 text-right">
                      <span className="bg-surface-inset border border-border-subtle px-3 py-1 rounded-full text-accent-warm font-medium">
                        {parl.womenPercentage}%
                      </span>
                    </td>
                    <td className="py-4 text-right font-bold text-primary">{parl.nextElection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-muted text-center py-12">Data unavailable</div>
        )}
      </WidgetCard>
    </div>
  );
}
