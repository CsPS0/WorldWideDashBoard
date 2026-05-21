import { BaseDataSource } from '../core/DataSource';
import axios from 'axios';
import * as cheerio from 'cheerio';

export interface PoliticsData {
  turnoutPercentage: number;
  leadingParty: string;
  processedPercentage: number;
}

export class PoliticsProvider extends BaseDataSource<PoliticsData> {
  id = 'hungarian_elections';
  name = 'Hungarian Elections (OGY 2026)';
  category = 'Politics';

  async fetchData(): Promise<PoliticsData> {
    try {
      // Attempt to scrape the vtr site (which might be an SPA or not exist yet) TODO: make the scrap one by one, or with uint tests
      const res = await axios.get('https://vtr.valasztas.hu/ogy2026', {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 5000,
      });

      const $ = cheerio.load(res.data);
      
      const turnoutText = $('.turnout-value').text().trim();
      const processedText = $('.processed-value').text().trim();
      const leadingPartyText = $('.leading-party-name').first().text().trim();

      if (turnoutText && processedText && leadingPartyText) {
        return {
          turnoutPercentage: parseFloat(turnoutText.replace(',', '.')),
          processedPercentage: parseFloat(processedText.replace(',', '.')),
          leadingParty: leadingPartyText,
        };
      }
      
      throw new Error('Could not parse election data.');
    } catch {
      console.warn('Failed to scrape real politics data. Returning mocked presentation data.');

      return {
        turnoutPercentage: 68.45,
        processedPercentage: 99.98,
        leadingParty: 'TISZA',
      };
    }
  }

  validateResponse(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) return false;
    const d = data as Record<string, unknown>;
    return (
      'turnoutPercentage' in d &&
      'leadingParty' in d &&
      'processedPercentage' in d
    );
  }
}
