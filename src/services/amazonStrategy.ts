import OpenAI from 'openai';

export interface AmazonCommissionRate {
  category: string;
  rate: number;
  priority: number;
}

export const COMMISSION_RATES: AmazonCommissionRate[] = [
  { category: 'Premium Beauty', rate: 10.0, priority: 1 },
  { category: 'Luxury Beauty', rate: 10.0, priority: 1 },
  { category: 'Beauty', rate: 8.0, priority: 2 },
  { category: 'Health & Personal Care', rate: 8.0, priority: 2 },
  { category: 'Toys', rate: 8.0, priority: 3 },
  { category: 'Sports & Outdoors', rate: 4.0, priority: 4 },
  { category: 'Electronics', rate: 4.0, priority: 5 },
];

export interface ProductScore {
  asin: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  commissionRate: number;
  estimatedCommission: number;
  roi: number;
  priority: number;
}

export class AmazonStrategyAI {
  private openai: OpenAI | null = null;
  private affiliateTag = 'globalsupleme-20';
  private marketplaceDomain = 'amazon.com';

  constructor(affiliateTag?: string, marketplaceDomain?: string) {
    this.openai = null;
    if (affiliateTag) this.affiliateTag = affiliateTag;
    if (marketplaceDomain) this.marketplaceDomain = marketplaceDomain;
  }
  
  setMarketplace(affiliateTag: string, marketplaceDomain: string) {
    this.affiliateTag = affiliateTag;
    this.marketplaceDomain = marketplaceDomain;
  }

  async analyzeProductStrategy(products: any[]): Promise<ProductScore[]> {
    const scoredProducts = products.map(p => this.scoreProduct(p));
    return scoredProducts.sort((a, b) => b.roi - a.roi);
  }

  private scoreProduct(product: any): ProductScore {
    const price = this.parsePrice(product.price);
    const rating = product.rating || 4.0;
    const reviews = product.reviews || 0;
    const category = this.detectCategory(product);
    const commissionRate = this.getCommissionRate(category);
    
    const estimatedCommission = price * (commissionRate / 100);
    
    const roi = price * (commissionRate / 100) * reviews * rating;

    const priority = COMMISSION_RATES.find(c => c.category === category)?.priority || 10;

    return {
      asin: product.asin,
      title: product.title,
      price,
      rating,
      reviews,
      category,
      commissionRate,
      estimatedCommission,
      roi,
      priority
    };
  }

  private parsePrice(priceStr: string): number {
    if (typeof priceStr === 'number') return priceStr;
    const match = priceStr?.match(/[\d,]+\.?\d*/);
    return match ? parseFloat(match[0].replace(',', '')) : 0;
  }

  private detectCategory(product: any): string {
    const title = (product.title || '').toLowerCase();
    const cat = (product.category || '').toLowerCase();
    
    if (cat.includes('beauty') || title.includes('beauty') || title.includes('makeup') || 
        title.includes('skincare') || title.includes('cosmetic')) {
      return 'Premium Beauty';
    }
    if (cat.includes('health') || title.includes('supplement') || title.includes('vitamin')) {
      return 'Health & Personal Care';
    }
    if (cat.includes('toys') || title.includes('toy')) {
      return 'Toys';
    }
    if (cat.includes('sport') || title.includes('fitness')) {
      return 'Sports & Outdoors';
    }
    if (cat.includes('electronic') || title.includes('gadget')) {
      return 'Electronics';
    }
    
    return 'Health & Personal Care';
  }

  private getCommissionRate(category: string): number {
    return COMMISSION_RATES.find(c => c.category === category)?.rate || 4.0;
  }

  async selectOptimalProducts(
    allProducts: any[],
    maxProducts: number = 200
  ): Promise<any[]> {
    const uniqueProducts = this.removeDuplicates(allProducts);
    
    const scored = await this.analyzeProductStrategy(uniqueProducts);
    
    const distribution = {
      'Premium Beauty': Math.floor(maxProducts * 0.60),
      'Health & Personal Care': Math.floor(maxProducts * 0.20),
      'Sports & Outdoors': Math.floor(maxProducts * 0.10),
      'Electronics': Math.floor(maxProducts * 0.10),
    };

    const selected: ProductScore[] = [];
    const byCategory = new Map<string, ProductScore[]>();

    scored.forEach(p => {
      if (!byCategory.has(p.category)) {
        byCategory.set(p.category, []);
      }
      byCategory.get(p.category)!.push(p);
    });

    Object.entries(distribution).forEach(([category, count]) => {
      const products = byCategory.get(category) || [];
      selected.push(...products.slice(0, count));
    });

    const remaining = maxProducts - selected.length;
    if (remaining > 0) {
      const notSelected = scored.filter(p => !selected.includes(p));
      selected.push(...notSelected.slice(0, remaining));
    }

    return selected.slice(0, maxProducts).map(p => {
      const originalProduct = allProducts.find(prod => prod.asin === p.asin) || {};
      return {
        ...originalProduct,
        affiliateLink: `https://www.${this.marketplaceDomain}/dp/${p.asin}?tag=${this.affiliateTag}`,
        _score: p.roi,
        _commission: p.commissionRate
      };
    });
  }

  private removeDuplicates(products: any[]): any[] {
    const seen = new Set<string>();
    return products.filter(p => {
      if (seen.has(p.asin)) return false;
      seen.add(p.asin);
      return true;
    });
  }
}
