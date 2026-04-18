export interface IDataSource<T> {
  id: string;
  name: string;
  category: string;
  fetchData(): Promise<T>;
  validateResponse(data: any): boolean;
  getCacheKey(): string;
}

export abstract class BaseDataSource<T> implements IDataSource<T> {
  abstract id: string;
  abstract name: string;
  abstract category: string;

  abstract fetchData(): Promise<T>;
  abstract validateResponse(data: any): boolean;

  getCacheKey(): string {
    return `cache_${this.category}_${this.id}`;
  }

  protected async handleFetchError(error: any): Promise<never> {
    console.error(`[${this.name}] Fetch Error:`, error);
    throw new Error(`Failed to fetch data from ${this.name}: ${error.message || 'Unknown error'}`);
  }
}
