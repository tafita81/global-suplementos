export interface AmazonMarketplace {
  id: string;
  name: string;
  domain: string;
  affiliateTag: string;
  language: string;
  currency: string;
  flagCode: string;
  flagUrl: string;
}

// Amazon Associates program IDs por país
// IMPORTANTE: Você precisa se registrar em cada programa de afiliados Amazon regional
// Para maximizar ganhos, registre-se em: https://affiliate-program.amazon.com/help/node/topic/G200127830
export const AMAZON_MARKETPLACES: AmazonMarketplace[] = [
  {
    id: 'US',
    name: 'United States',
    domain: 'amazon.com',
    affiliateTag: 'globalsupleme-20', // US affiliate tag
    language: 'en',
    currency: 'USD',
    flagCode: 'us',
    flagUrl: 'https://flagcdn.com/w80/us.png'
  },
  {
    id: 'CA',
    name: 'Canada',
    domain: 'amazon.ca',
    affiliateTag: 'globalsupleme-20', // Registre tag CA: https://associates.amazon.ca
    language: 'en',
    currency: 'CAD',
    flagCode: 'ca',
    flagUrl: 'https://flagcdn.com/w80/ca.png'
  },
  {
    id: 'UK',
    name: 'United Kingdom',
    domain: 'amazon.co.uk',
    affiliateTag: 'globalsup05-21', // Registre tag UK: https://affiliate-program.amazon.co.uk
    language: 'en',
    currency: 'GBP',
    flagCode: 'gb',
    flagUrl: 'https://flagcdn.com/w80/gb.png'
  },
  {
    id: 'DE',
    name: 'Germany',
    domain: 'amazon.de',
    affiliateTag: 'globalsup0a6-21', // Registre tag DE: https://partnernet.amazon.de
    language: 'de',
    currency: 'EUR',
    flagCode: 'de',
    flagUrl: 'https://flagcdn.com/w80/de.png'
  },
  {
    id: 'FR',
    name: 'France',
    domain: 'amazon.fr',
    affiliateTag: 'globalsup0f6-21', // Registre tag FR: https://partenaires.amazon.fr
    language: 'fr',
    currency: 'EUR',
    flagCode: 'fr',
    flagUrl: 'https://flagcdn.com/w80/fr.png'
  },
  {
    id: 'IT',
    name: 'Italy',
    domain: 'amazon.it',
    affiliateTag: 'globalsup0bb-21', // Registre tag IT: https://programma-affiliazione.amazon.it
    language: 'it',
    currency: 'EUR',
    flagCode: 'it',
    flagUrl: 'https://flagcdn.com/w80/it.png'
  },
  {
    id: 'ES',
    name: 'Spain',
    domain: 'amazon.es',
    affiliateTag: 'globalsup00f-21', // Registre tag ES: https://afiliados.amazon.es
    language: 'es',
    currency: 'EUR',
    flagCode: 'es',
    flagUrl: 'https://flagcdn.com/w80/es.png'
  },
  {
    id: 'JP',
    name: 'Japan',
    domain: 'amazon.co.jp',
    affiliateTag: 'globalsup-22', // Registre tag JP: https://affiliate.amazon.co.jp
    language: 'ja',
    currency: 'JPY',
    flagCode: 'jp',
    flagUrl: 'https://flagcdn.com/w80/jp.png'
  },
  {
    id: 'AU',
    name: 'Australia',
    domain: 'amazon.com.au',
    affiliateTag: 'globalsup0e0-22', // Registre tag AU: https://affiliate-program.amazon.com.au
    language: 'en',
    currency: 'AUD',
    flagCode: 'au',
    flagUrl: 'https://flagcdn.com/w80/au.png'
  },
  {
    id: 'NL',
    name: 'Netherlands',
    domain: 'amazon.nl',
    affiliateTag: 'globalsup0ae-21', // Registre tag NL: https://partnernet.amazon.nl
    language: 'nl',
    currency: 'EUR',
    flagCode: 'nl',
    flagUrl: 'https://flagcdn.com/w80/nl.png'
  },
  {
    id: 'SE',
    name: 'Sweden',
    domain: 'amazon.se',
    affiliateTag: 'globalsup07f-21', // Registre tag SE: https://partnernet.amazon.se
    language: 'sv',
    currency: 'SEK',
    flagCode: 'se',
    flagUrl: 'https://flagcdn.com/w80/se.png'
  },
  {
    id: 'SG',
    name: 'Singapore',
    domain: 'amazon.sg',
    affiliateTag: 'globalsup07-22', // Registre tag SG: https://affiliate-program.amazon.sg
    language: 'en',
    currency: 'SGD',
    flagCode: 'sg',
    flagUrl: 'https://flagcdn.com/w80/sg.png'
  },
  {
    id: 'PL',
    name: 'Poland',
    domain: 'amazon.pl',
    affiliateTag: 'globalsup0c-21', // Registre tag PL: https://partnernet.amazon.pl
    language: 'en', // Pode ajustar para 'pl' se tiver traduções
    currency: 'PLN',
    flagCode: 'pl',
    flagUrl: 'https://flagcdn.com/w80/pl.png'
  },
  {
    id: 'SA',
    name: 'Saudi Arabia',
    domain: 'amazon.sa',
    affiliateTag: 'globalsup03-22', // Registre tag SA: https://affiliate-program.amazon.sa
    language: 'ar',
    currency: 'SAR',
    flagCode: 'sa',
    flagUrl: 'https://flagcdn.com/w80/sa.png'
  }
];

export const getMarketplaceById = (id: string): AmazonMarketplace => {
  return AMAZON_MARKETPLACES.find(m => m.id === id) || AMAZON_MARKETPLACES[0];
};

export const getAffiliateLink = (asin: string, marketplace: AmazonMarketplace): string => {
  return `https://www.${marketplace.domain}/dp/${asin}?tag=${marketplace.affiliateTag}`;
};
