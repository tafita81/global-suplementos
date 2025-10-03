import { MapPin, ChevronDown, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useMarketplace } from "@/hooks/useMarketplace";
import { AMAZON_MARKETPLACES } from "@/config/amazonMarketplaces";

export const CountrySelector = () => {
  const { currentMarketplace, setMarketplace } = useMarketplace();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectMarketplace = (marketplace: typeof AMAZON_MARKETPLACES[0]) => {
    setMarketplace(marketplace);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 hover:border hover:border-white rounded text-sm transition-all"
      >
        <MapPin className="h-4 w-4" />
        <div className="text-left">
          <div className="text-xs text-gray-300">Deliver to</div>
          <div className="font-bold text-sm flex items-center gap-1">
            {currentMarketplace.name}
            <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white text-black rounded shadow-xl border border-gray-200 z-50 w-72 max-h-96 overflow-y-auto">
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <h3 className="font-bold text-sm">Choose your Amazon marketplace</h3>
            <p className="text-xs text-gray-600 mt-1">
              Products and prices will match your selected country
            </p>
          </div>
          
          <div className="py-2">
            {AMAZON_MARKETPLACES.map((marketplace) => (
              <button
                key={marketplace.id}
                onClick={() => handleSelectMarketplace(marketplace)}
                className="w-full px-4 py-2 hover:bg-blue-50 flex items-center gap-3 text-left transition-colors"
              >
                <img 
                  src={marketplace.flagUrl} 
                  alt={marketplace.name}
                  width="32"
                  height="24"
                  className="rounded shadow-sm"
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{marketplace.name}</div>
                  <div className="text-xs text-gray-500">
                    {marketplace.domain} • {marketplace.currency}
                  </div>
                </div>
                {currentMarketplace.id === marketplace.id && (
                  <Check className="h-5 w-5 text-[#FF9900]" />
                )}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 bg-gray-50">
            <p className="text-xs text-gray-600">
              💰 <strong>Earn commissions</strong> from sales in all countries!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
