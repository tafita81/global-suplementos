import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AmazonMarketplace, AMAZON_MARKETPLACES } from '@/config/amazonMarketplaces';
import i18n from '@/i18n';

interface MarketplaceState {
  currentMarketplace: AmazonMarketplace;
  isAutoDetected: boolean;
  setMarketplace: (marketplace: AmazonMarketplace) => void;
  setMarketplaceById: (id: string) => void;
  initializeFromGeolocation: (marketplaceId: string) => void;
}

export const useMarketplace = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      currentMarketplace: AMAZON_MARKETPLACES[0], // Default: US
      isAutoDetected: false,
      
      setMarketplace: (marketplace) => {
        set({ currentMarketplace: marketplace, isAutoDetected: false });
        // Muda o idioma da interface automaticamente
        if (i18n && i18n.changeLanguage) {
          i18n.changeLanguage(marketplace.language);
        }
        console.log(`🌍 Marketplace mudado para: ${marketplace.name} (${marketplace.domain})`);
      },
      
      setMarketplaceById: (id) => {
        const marketplace = AMAZON_MARKETPLACES.find(m => m.id === id);
        if (marketplace) {
          set({ currentMarketplace: marketplace, isAutoDetected: false });
          if (i18n && i18n.changeLanguage) {
            i18n.changeLanguage(marketplace.language);
          }
          console.log(`🌍 Marketplace mudado para: ${marketplace.name} (${marketplace.domain})`);
        }
      },
      
      // Inicializa marketplace baseado na geolocalização (só se ainda não foi escolhido manualmente)
      initializeFromGeolocation: (marketplaceId) => {
        const state = get();
        // Só muda se ainda não foi auto-detectado e usuário não escolheu manualmente
        if (!state.isAutoDetected) {
          const marketplace = AMAZON_MARKETPLACES.find(m => m.id === marketplaceId);
          if (marketplace) {
            set({ currentMarketplace: marketplace, isAutoDetected: true });
            if (i18n && i18n.changeLanguage) {
              i18n.changeLanguage(marketplace.language);
            }
            console.log(`🎯 Marketplace auto-detectado: ${marketplace.name} (${marketplace.domain})`);
          }
        }
      },
    }),
    {
      name: 'amazon-marketplace-storage',
    }
  )
);
