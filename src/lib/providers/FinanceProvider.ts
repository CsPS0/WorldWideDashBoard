import { BaseDataSource } from '../core/DataSource';
import axios from 'axios';

export interface FinanceData {
  crypto: {
    bitcoin: { usd: number; eur: number };
    ethereum: { usd: number; eur: number };
  };
  currency: {
    EUR_TO_HUF: number;
    EUR_TO_USD: number;
  };
}

export class FinanceProvider extends BaseDataSource<FinanceData> {
  id = 'finance_markets';
  name = 'Global Finance Markets';
  category = 'Finance';

  async fetchData(): Promise<FinanceData> {
    try {
      // Fetch Crypto Prices
      const cryptoRes = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur'
      );

      // Fetch Currency Exchange Rates
      const currencyRes = await axios.get(
        'https://api.frankfurter.app/latest?from=EUR&to=HUF,USD'
      );

      return {
        crypto: {
          bitcoin: {
            usd: cryptoRes.data.bitcoin.usd,
            eur: cryptoRes.data.bitcoin.eur,
          },
          ethereum: {
            usd: cryptoRes.data.ethereum.usd,
            eur: cryptoRes.data.ethereum.eur,
          },
        },
        currency: {
          EUR_TO_HUF: currencyRes.data.rates.HUF,
          EUR_TO_USD: currencyRes.data.rates.USD,
        },
      };
    } catch (error) {
      return this.handleFetchError(error);
    }
  }

  validateResponse(data: unknown): boolean {
    if (typeof data !== 'object' || data === null) return false;
    const d = data as Record<string, unknown>;
    
    return (
      'crypto' in d &&
      'currency' in d &&
      typeof d.crypto === 'object' && d.crypto !== null &&
      typeof d.currency === 'object' && d.currency !== null
    );
  }
}
