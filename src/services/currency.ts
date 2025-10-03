// Serviço de Conversão de Moedas para Marketplaces Amazon
// Converte preços USD para moeda local automaticamente

interface CurrencyRates {
  [key: string]: number;
}

// Taxas de câmbio aproximadas (atualize com API se necessário)
// Base: 1 USD = X em moeda local
const EXCHANGE_RATES: CurrencyRates = {
  'USD': 1.00,      // Dólar americano
  'CAD': 1.36,      // Dólar canadense
  'GBP': 0.79,      // Libra esterlina
  'EUR': 0.92,      // Euro (Alemanha, França, Itália, Espanha, Holanda, Suécia*)
  'JPY': 149.50,    // Iene japonês
  'AUD': 1.53,      // Dólar australiano
  'SEK': 10.35,     // Coroa sueca
  'SGD': 1.34,      // Dólar de Singapura
  'PLN': 3.98,      // Zloty polonês
  'SAR': 3.75,      // Riyal saudita
};

// Símbolos de moeda
const CURRENCY_SYMBOLS: { [key: string]: string } = {
  'USD': '$',
  'CAD': 'CA$',
  'GBP': '£',
  'EUR': '€',
  'JPY': '¥',
  'AUD': 'A$',
  'SEK': 'kr',
  'SGD': 'S$',
  'PLN': 'zł',
  'SAR': '﷼',
};

// Posição do símbolo (antes ou depois do valor)
const SYMBOL_POSITION: { [key: string]: 'before' | 'after' } = {
  'USD': 'before',
  'CAD': 'before',
  'GBP': 'before',
  'EUR': 'before',
  'JPY': 'before',
  'AUD': 'before',
  'SEK': 'after',
  'SGD': 'before',
  'PLN': 'after',
  'SAR': 'before',
};

export class CurrencyService {
  private static instance: CurrencyService;

  private constructor() {}

  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  /**
   * Converte preço USD para moeda de destino
   * @param priceUSD Preço em dólares americanos (ex: 29.99)
   * @param targetCurrency Moeda de destino (ex: 'EUR', 'GBP')
   * @returns Preço convertido
   */
  convert(priceUSD: number, targetCurrency: string): number {
    const rate = EXCHANGE_RATES[targetCurrency] || 1.0;
    return priceUSD * rate;
  }

  /**
   * Extrai valor numérico de string de preço
   * @param priceString String de preço (ex: "$29.99", "29.99", "$1,299.99")
   * @returns Valor numérico
   */
  parsePrice(priceString: string): number {
    if (typeof priceString === 'number') return priceString;
    
    // Remove símbolos de moeda, espaços, e converte vírgulas
    const cleaned = priceString
      .replace(/[$£€¥₹CA\$A\$S\$kr zł﷼]/g, '')
      .replace(/,/g, '')
      .trim();
    
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }

  /**
   * Formata preço com símbolo de moeda correto
   * @param price Valor numérico
   * @param currency Código da moeda (ex: 'USD', 'EUR')
   * @returns String formatada (ex: "$29.99", "29,99 €")
   */
  format(price: number, currency: string): string {
    const symbol = CURRENCY_SYMBOLS[currency] || '$';
    const position = SYMBOL_POSITION[currency] || 'before';
    
    // Formatação especial para iene (sem decimais)
    if (currency === 'JPY') {
      const rounded = Math.round(price);
      return position === 'before' 
        ? `${symbol}${rounded.toLocaleString('ja-JP')}`
        : `${rounded.toLocaleString('ja-JP')} ${symbol}`;
    }
    
    // Formatação para outras moedas (2 decimais)
    const formatted = price.toFixed(2);
    
    // Formato europeu (vírgula como separador decimal)
    if (['EUR', 'SEK', 'PLN'].includes(currency)) {
      const europeanFormat = formatted.replace('.', ',');
      return position === 'before'
        ? `${symbol}${europeanFormat}`
        : `${europeanFormat} ${symbol}`;
    }
    
    // Formato padrão (ponto como separador decimal)
    return position === 'before'
      ? `${symbol}${formatted}`
      : `${formatted} ${symbol}`;
  }

  /**
   * Converte e formata preço em uma única operação
   * @param priceString Preço original em string (ex: "$29.99")
   * @param targetCurrency Moeda de destino
   * @returns Preço convertido e formatado
   */
  convertAndFormat(priceString: string, targetCurrency: string): string {
    const priceUSD = this.parsePrice(priceString);
    const converted = this.convert(priceUSD, targetCurrency);
    return this.format(converted, targetCurrency);
  }

  /**
   * Obtém símbolo de moeda
   */
  getSymbol(currency: string): string {
    return CURRENCY_SYMBOLS[currency] || '$';
  }

  /**
   * Obtém taxa de câmbio
   */
  getRate(currency: string): number {
    return EXCHANGE_RATES[currency] || 1.0;
  }

  /**
   * Atualiza taxas de câmbio (para integração futura com API de câmbio)
   */
  updateRates(newRates: Partial<CurrencyRates>): void {
    Object.assign(EXCHANGE_RATES, newRates);
  }
}

// Exporta instância singleton
export const currencyService = CurrencyService.getInstance();
