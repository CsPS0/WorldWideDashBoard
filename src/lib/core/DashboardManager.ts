import { IDataSource } from './DataSource';

export class DashboardManager {
  private providers: Map<string, IDataSource<any>> = new Map();

  registerProvider(provider: IDataSource<any>): void {
    if (this.providers.has(provider.id)) {
      console.warn(`Provider with ID ${provider.id} is already registered. Overwriting.`);
    }
    this.providers.set(provider.id, provider);
  }

  async fetchAllData(): Promise<Record<string, any>> {
    const results: Record<string, any> = {};
    const fetchPromises = Array.from(this.providers.values()).map(async (provider) => {
      try {
        const data = await provider.fetchData();
        if (provider.validateResponse(data)) {
          results[provider.id] = data;
        } else {
          console.error(`Validation failed for provider: ${provider.name}`);
        }
      } catch (error) {
        console.error(`Error in provider ${provider.name}:`, error);
      }
    });

    await Promise.all(fetchPromises);
    return results;
  }

  async fetchByProviderId(id: string): Promise<any | null> {
    const provider = this.providers.get(id);
    if (!provider) {
      console.error(`Provider with ID ${id} not found.`);
      return null;
    }

    try {
      const data = await provider.fetchData();
      return provider.validateResponse(data) ? data : null;
    } catch (error) {
      console.error(`Error in provider ${provider.name}:`, error);
      return null;
    }
  }

  getProvidersByCategory(category: string): IDataSource<any>[] {
    return Array.from(this.providers.values()).filter(p => p.category === category);
  }
}
