import { BaseDataSource } from '../core/DataSource';
export interface PartyResult {
  name: string;
  listMandates: number;
  individualMandates: number;
  totalMandates: number;
  listVotesPercentage: number;
}
export interface GlobalLeader {
  id: string;
  name: string;
  country: string;
  role: string;
}
export interface GlobalParliament {
  country: string;
  chamber: string;
  totalMembers: number;
  womenPercentage: number;
  nextElection: string;
}
export interface PoliticsData {
  turnoutPercentage: number;
  processedPercentage: number;
  parties: PartyResult[];
  globalLeaders: GlobalLeader[];
  globalParliaments: GlobalParliament[];
}
export class PoliticsProvider extends BaseDataSource<PoliticsData> {
  id = 'world_politics';
  name = 'World Politics & Elections';
  category = 'Politics';
  async fetchData(): Promise<PoliticsData> {
    let parties: PartyResult[] = [];
    let turnoutPercentage = 0;
    let processedPercentage = 0;
    try {
      const configRes = await fetch('https://vtr.valasztas.hu/ogy2026/data/config.json');
      const config = await configRes.json();
      const ver = config.ver;
      const szavossz = config.szavossz;
      const orgsRes = await fetch(`https://vtr.valasztas.hu/ogy2026/data/${ver}/ver/Szervezetek.json`);
      const orgsData = await orgsRes.json();
      const orgMap: Record<number, string> = {};
      orgsData.list.forEach((o: any) => {
        orgMap[o.szkod] = o.r_nev || o.nev;
      });
      const resultsRes = await fetch(`https://vtr.valasztas.hu/ogy2026/data/${szavossz}/szavossz/SzervezetekEredmenye.json`);
      const resultsData = await resultsRes.json();
      parties = resultsData.list
        .filter((p: any) => p.mand_osszes > 0)
        .map((p: any) => ({
          name: orgMap[p.szkod] || 'Ismeretlen',
          listMandates: p.mand_listas,
          individualMandates: p.mand_evk,
          totalMandates: p.mand_osszes,
          listVotesPercentage: p.listas_szavazat_szaz,
        }))
        .sort((a: any, b: any) => b.totalMandates - a.totalMandates);
      const turnoutRes = await fetch(`https://vtr.valasztas.hu/ogy2026/data/${szavossz}/szavossz/ReszvetelOrszag.json`);
      const turnoutData = await turnoutRes.json();
      turnoutPercentage = parseFloat(((turnoutData.data.megj / turnoutData.data.valp) * 100).toFixed(2));
      processedPercentage = turnoutData.data.feldar_csak_belf || 100;
    } catch (error) {
      console.warn('Failed to fetch Hungarian VTR data. Using fallback.');
      this.isMock = true;
      turnoutPercentage = 78.99;
      processedPercentage = 100;
      parties = [
        { name: 'TISZA', listMandates: 45, individualMandates: 96, totalMandates: 141, listVotesPercentage: 53.18 },
        { name: 'FIDESZ - KDNP', listMandates: 42, individualMandates: 10, totalMandates: 52, listVotesPercentage: 38.61 },
        { name: 'Mi Hazánk', listMandates: 6, individualMandates: 0, totalMandates: 6, listVotesPercentage: 5.63 },
      ];
    }
    let globalLeaders: GlobalLeader[] = [];
    try {
      const osRes = await fetch('https://api.opensanctions.org/search/default?q=president&limit=5', {
        headers: { 'Accept': 'application/json' }
      });
      if (osRes.ok) {
        const osData = await osRes.json();
        globalLeaders = osData.results?.map((r: any) => ({
          id: r.id,
          name: r.caption,
          country: r.properties?.country?.[0] || 'Unknown',
          role: r.properties?.position?.[0] || 'Politician',
        })).slice(0, 5) || [];
      }
    } catch (e) {
      console.warn('Failed to fetch OpenSanctions data. Using fallback.');
    }
    if (globalLeaders.length === 0) {
      globalLeaders = [
        { id: '1', name: 'Joe Biden', country: 'United States', role: 'President' },
        { id: '2', name: 'Emmanuel Macron', country: 'France', role: 'President' },
        { id: '3', name: 'Olaf Scholz', country: 'Germany', role: 'Chancellor' },
        { id: '4', name: 'Justin Trudeau', country: 'Canada', role: 'Prime Minister' },
        { id: '5', name: 'Luiz Inácio Lula da Silva', country: 'Brazil', role: 'President' },
      ];
    }
    let globalParliaments: GlobalParliament[] = [];
    try {
      const ipuRes = await fetch('https://data.ipu.org/api/v1/parliaments', {
        headers: { 'Accept': 'application/json' }
      });
      if (ipuRes.ok) {
        const ipuData = await ipuRes.json();
        globalParliaments = ipuData.data?.slice(0, 5).map((p: any) => ({
          country: p.country?.name || 'Unknown',
          chamber: p.chamber?.name || 'Parliament',
          totalMembers: p.stat_members || 0,
          womenPercentage: p.stat_women_pct || 0,
          nextElection: p.next_election_date || 'Unknown',
        })) || [];
      }
    } catch (e) {
      console.warn('Failed to fetch IPU Parline data. Using fallback.');
    }
    if (globalParliaments.length === 0) {
      globalParliaments = [
        { country: 'United Kingdom', chamber: 'House of Commons', totalMembers: 650, womenPercentage: 34.6, nextElection: '2029' },
        { country: 'India', chamber: 'Lok Sabha', totalMembers: 543, womenPercentage: 14.9, nextElection: '2029' },
        { country: 'Australia', chamber: 'House of Representatives', totalMembers: 151, womenPercentage: 38.4, nextElection: '2025' },
        { country: 'Japan', chamber: 'House of Representatives', totalMembers: 465, womenPercentage: 9.7, nextElection: '2025' },
      ];
    }
    return {
      turnoutPercentage,
      processedPercentage,
      parties,
      globalLeaders,
      globalParliaments,
    };
  }
  validateResponse(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) return false;
    const d = data as Record<string, unknown>;
    return (
      'turnoutPercentage' in d &&
      'parties' in d &&
      Array.isArray(d.parties) &&
      'globalLeaders' in d &&
      Array.isArray(d.globalLeaders) &&
      'globalParliaments' in d &&
      Array.isArray(d.globalParliaments)
    );
  }
}
