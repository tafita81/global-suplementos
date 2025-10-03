import { allPremiumProducts } from '../data/premiumProducts';

export interface RapidAPIConfig {
  key: string;
  host: string;
  name: string;
}

export class MultiAPIClient {
  private apis: RapidAPIConfig[];
  private currentApiIndex = 0;
  private requestCounts: Map<string, number> = new Map();
  private readonly MAX_FREE_REQUESTS = 10000;

  constructor() {
    // Usando Real-Time Amazon Data (letscrape)
    this.apis = [
      {
        key: import.meta.env.VITE_RAPIDAPI_KEY_1 || '',
        host: 'real-time-amazon-data.p.rapidapi.com',
        name: 'Real-Time Amazon Data'
      }
    ].filter(api => api.key);
  }

  async searchProducts(category: string, limit: number = 50, countryCode: string = 'US', domain: string = 'amazon.com'): Promise<any[]> {
    if (this.apis.length === 0) {
      console.warn('No RapidAPI keys configured, returning demo data');
      return this.getDemoProducts();
    }

    let attempts = 0;
    let lastError: Error | null = null;

    while (attempts < this.apis.length) {
      const api = this.getCurrentAPI();
      const used = this.requestCounts.get(api.name) || 0;

      if (used >= this.MAX_FREE_REQUESTS) {
        console.log(`${api.name} reached limit (${used}/${this.MAX_FREE_REQUESTS}), switching...`);
        this.switchToNextAPI();
        attempts++;
        continue;
      }

      try {
        const products = await this.fetchFromAPI(api, category, limit, countryCode, domain);
        this.incrementRequestCount(api.name);
        console.log(`✅ ${products.length} produtos reais da Amazon carregados via ${api.name}!`);
        return products;
      } catch (error: any) {
        console.error(`${api.name} failed:`, error.message);
        lastError = error;
        this.switchToNextAPI();
        attempts++;
      }
    }

    console.error('All APIs failed or reached limits, using demo data');
    return this.getDemoProducts();
  }

  private async fetchFromAPI(api: RapidAPIConfig, category: string, limit: number, countryCode: string = 'US', domain: string = 'amazon.com'): Promise<any[]> {
    // Usando endpoint /search da Real-Time Amazon Data
    const url = `https://${api.host}/search`;
    
    const params = new URLSearchParams({
      query: this.getCategoryKeywords(category),
      page: '1',
      country: countryCode,
      sort_by: 'RELEVANCE',
      product_condition: 'ALL'
    });

    const response = await fetch(`${url}?${params}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': api.key,
        'x-rapidapi-host': api.host
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return this.parseAPIResponse(data, api.name, domain).slice(0, limit);
  }

  private parseAPIResponse(data: any, apiName: string, domain: string = 'amazon.com'): any[] {
    const AFFILIATE_TAG = 'globalsupleme-20';
    
    // Parser para Real-Time Amazon Data API
    const products = data.data?.products || [];
    
    return products.map((p: any) => ({
      asin: p.asin,
      title: p.product_title || p.title,
      price: p.product_price || p.price || '$0.00',
      rating: p.product_star_rating || p.rating || 4.5,
      reviews: p.product_num_ratings || p.reviews_count || 0,
      image: p.product_photo || p.product_url || p.image,
      category: p.product_category || p.category || 'Health & Personal Care',
      prime: p.is_prime || p.prime || false,
      affiliateLink: `https://www.${domain}/dp/${p.asin}?tag=${AFFILIATE_TAG}`
    }));
  }

  private getCategoryKeywords(category: string): string {
    const keywords: Record<string, string> = {
      'all': 'supplements vitamins health wellness',
      'beauty': 'collagen beauty supplements anti-aging skincare vitamins',
      'quantum': 'advanced supplements nootropics smart drugs cognitive enhancement',
      'medical': 'medical grade supplements pharmaceutical vitamins',
      'gadgets': 'health gadgets fitness tracker smart watch wellness device',
      'wellness': 'wellness supplements herbal natural vitamins',
      'b2b': 'bulk supplements wholesale vitamins business',
      'government': 'institutional supplements medical supplies',
      'manufacturing': 'industrial supplements raw materials'
    };
    return keywords[category] || 'health supplements vitamins';
  }

  private getCurrentAPI(): RapidAPIConfig {
    return this.apis[this.currentApiIndex];
  }

  private switchToNextAPI(): void {
    this.currentApiIndex = (this.currentApiIndex + 1) % this.apis.length;
  }

  private incrementRequestCount(apiName: string): void {
    const current = this.requestCounts.get(apiName) || 0;
    this.requestCounts.set(apiName, current + 1);
    console.log(`📊 ${apiName}: ${current + 1}/${this.MAX_FREE_REQUESTS} requests usadas`);
  }

  getUsageStats(): { api: string; used: number; remaining: number }[] {
    return this.apis.map(api => ({
      api: api.name,
      used: this.requestCounts.get(api.name) || 0,
      remaining: this.MAX_FREE_REQUESTS - (this.requestCounts.get(api.name) || 0)
    }));
  }

  private getDemoProducts(): any[] {
    // Return premium products from our curated database (300+ products)
    return allPremiumProducts || [];
  }
}
