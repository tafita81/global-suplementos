// Serviço de Geolocalização Automática
// Detecta o país do visitante via IP e retorna o marketplace correto

interface GeolocationResponse {
  country_code: string;
  country_name: string;
  city?: string;
  region?: string;
}

// Mapeamento de códigos de país ISO para IDs de marketplace Amazon
const COUNTRY_TO_MARKETPLACE: Record<string, string> = {
  'US': 'US',
  'CA': 'CA',
  'GB': 'UK',
  'UK': 'UK',
  'DE': 'DE',
  'FR': 'FR',
  'IT': 'IT',
  'ES': 'ES',
  'JP': 'JP',
  'AU': 'AU',
  'NL': 'NL',
  'SE': 'SE',
  'SG': 'SG',
  'PL': 'PL',
  'SA': 'SA',
  // Países adicionais que podem usar marketplaces próximos
  'IE': 'UK', // Irlanda → UK
  'AT': 'DE', // Áustria → Alemanha
  'BE': 'FR', // Bélgica → França
  'CH': 'DE', // Suíça → Alemanha
  'LU': 'FR', // Luxemburgo → França
  'PT': 'ES', // Portugal → Espanha
  'NZ': 'AU', // Nova Zelândia → Austrália
  'MY': 'SG', // Malásia → Singapura
  'ID': 'SG', // Indonésia → Singapura
  'TH': 'SG', // Tailândia → Singapura
  'VN': 'SG', // Vietnã → Singapura
  'PH': 'SG', // Filipinas → Singapura
  'IN': 'SG', // Índia → Singapura
  'AE': 'SA', // Emirados → Arábia Saudita
  'KW': 'SA', // Kuwait → Arábia Saudita
  'QA': 'SA', // Qatar → Arábia Saudita
  'OM': 'SA', // Omã → Arábia Saudita
  'BH': 'SA', // Bahrein → Arábia Saudita
  'EG': 'SA', // Egito → Arábia Saudita
  'MX': 'US', // México → USA
  'BR': 'US', // Brasil → USA
  'AR': 'US', // Argentina → USA
  'CL': 'US', // Chile → USA
  'CO': 'US', // Colômbia → USA
  'PE': 'US', // Peru → USA
  'DK': 'SE', // Dinamarca → Suécia
  'NO': 'SE', // Noruega → Suécia
  'FI': 'SE', // Finlândia → Suécia
  'CZ': 'DE', // República Tcheca → Alemanha
  'SK': 'DE', // Eslováquia → Alemanha
  'HU': 'DE', // Hungria → Alemanha
  'RO': 'DE', // Romênia → Alemanha
  'GR': 'IT', // Grécia → Itália
  'HR': 'IT', // Croácia → Itália
  'SI': 'IT', // Eslovênia → Itália
};

export class GeolocationService {
  private static instance: GeolocationService;
  private cache: { country?: string; timestamp?: number } = {};
  private readonly CACHE_DURATION = 3600000; // 1 hora em ms

  private constructor() {}

  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  /**
   * Detecta o país do visitante via IP usando múltiplas APIs gratuitas
   * @returns Código ISO do país (ex: 'US', 'GB', 'DE')
   */
  async detectCountry(): Promise<string> {
    // Verifica cache
    if (this.cache.country && this.cache.timestamp) {
      const age = Date.now() - this.cache.timestamp;
      if (age < this.CACHE_DURATION) {
        console.log('🌍 País detectado (cache):', this.cache.country);
        return this.cache.country;
      }
    }

    try {
      // Tenta múltiplas APIs em ordem de prioridade
      const country = await this.tryMultipleAPIs();
      
      // Salva no cache
      this.cache = {
        country,
        timestamp: Date.now()
      };
      
      console.log('🌍 País detectado:', country);
      return country;
    } catch (error) {
      console.warn('⚠️ Erro ao detectar país, usando USA como padrão:', error);
      return 'US'; // Fallback para USA
    }
  }

  /**
   * Tenta detectar país usando múltiplas APIs gratuitas
   */
  private async tryMultipleAPIs(): Promise<string> {
    const apis = [
      // API 1: ipapi.co (100 requisições/dia gratuito)
      async () => {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('ipapi.co failed');
        const data: GeolocationResponse = await response.json();
        return data.country_code;
      },
      
      // API 2: ip-api.com (totalmente gratuito, 45 req/min)
      async () => {
        const response = await fetch('http://ip-api.com/json/');
        if (!response.ok) throw new Error('ip-api.com failed');
        const data = await response.json();
        return data.countryCode;
      },
      
      // API 3: ipinfo.io (50k requisições/mês gratuito)
      async () => {
        const response = await fetch('https://ipinfo.io/json');
        if (!response.ok) throw new Error('ipinfo.io failed');
        const data = await response.json();
        return data.country;
      },
      
      // API 4: cloudflare trace (sempre gratuito)
      async () => {
        const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
        if (!response.ok) throw new Error('cloudflare failed');
        const text = await response.text();
        const match = text.match(/loc=([A-Z]{2})/);
        if (!match) throw new Error('No country code in response');
        return match[1];
      }
    ];

    // Tenta cada API até conseguir
    for (const api of apis) {
      try {
        const country = await Promise.race([
          api(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Timeout')), 3000)
          )
        ]);
        
        if (country && country.length === 2) {
          return country.toUpperCase();
        }
      } catch (error) {
        // Tenta próxima API
        continue;
      }
    }

    throw new Error('All geolocation APIs failed');
  }

  /**
   * Converte código de país para ID de marketplace Amazon
   * @param countryCode Código ISO do país (ex: 'US', 'GB')
   * @returns ID do marketplace (ex: 'US', 'UK', 'DE')
   */
  getMarketplaceForCountry(countryCode: string): string {
    const marketplaceId = COUNTRY_TO_MARKETPLACE[countryCode.toUpperCase()];
    return marketplaceId || 'US'; // Fallback para USA se país não mapeado
  }

  /**
   * Detecta país e retorna o marketplace Amazon apropriado
   */
  async detectMarketplace(): Promise<string> {
    const country = await this.detectCountry();
    return this.getMarketplaceForCountry(country);
  }

  /**
   * Limpa o cache (útil para testes)
   */
  clearCache(): void {
    this.cache = {};
  }
}

// Exporta instância singleton
export const geolocationService = GeolocationService.getInstance();
