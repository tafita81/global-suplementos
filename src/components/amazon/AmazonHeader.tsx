import { Search, ShoppingCart, Menu, Globe, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { CountrySelector } from "./CountrySelector";
import { useTranslation } from "react-i18next";

interface AmazonHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: { id: string; label: string }[];
  cartCount?: number;
}

export const AmazonHeader = ({
  searchTerm,
  onSearchChange,
  onSearch,
  selectedCategory,
  onCategoryChange,
  categories,
  cartCount = 0
}: AmazonHeaderProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-[#131921] text-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <div className="flex items-center px-4 py-2 gap-4">
        <Link to="/" className="flex items-center mr-3 hover:opacity-80 transition-opacity cursor-pointer">
          <div className="relative">
            <Globe className="h-10 w-10 text-[#FBBF24]" />
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#FBBF24] rounded-full flex items-center justify-center">
              <Crown className="h-1.5 w-1.5 text-[#131921]" />
            </div>
          </div>
        </Link>

        <CountrySelector />

        <div className="flex-1 flex items-center">
          <select 
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-[#f3f3f3] text-black px-3 py-2.5 rounded-l border-r border-gray-300 focus:outline-none text-sm h-10"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            placeholder={t('navigation.amazonSearchPlaceholder')}
            className="flex-1 rounded-none border-0 h-10 focus:outline-none focus:ring-2 focus:ring-[#FF9900] text-black font-normal"
          />
          
          <Button 
            onClick={onSearch}
            className="bg-[#FF9900] hover:bg-[#F08804] rounded-r rounded-l-none h-10 px-4"
          >
            <Search className="h-5 w-5 text-black" />
          </Button>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1 hover:border hover:border-white rounded px-2 py-1">
            <div className="text-left">
              <div className="text-xs text-gray-300">Hello, Sign in</div>
              <div className="font-bold text-sm flex items-center gap-1">
                Account & Lists
              </div>
            </div>
          </button>

          <button className="flex items-center gap-1 hover:border hover:border-white rounded px-2 py-1">
            <div className="text-left">
              <div className="text-xs text-gray-300">Returns</div>
              <div className="font-bold text-sm">& Orders</div>
            </div>
          </button>

          <button className="flex items-center gap-2 hover:border hover:border-white rounded px-2 py-1 relative">
            <ShoppingCart className="h-8 w-8" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#FF9900] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
            <span className="font-bold text-sm">Cart</span>
          </button>
        </div>
      </div>

      <div className="bg-[#232F3E] px-4 py-2 overflow-x-auto">
        <div className="flex items-center gap-4 text-xs whitespace-nowrap min-w-max">
          <button 
            onClick={() => onCategoryChange('all')}
            className={`flex items-center gap-2 hover:border hover:border-white rounded px-2 py-1 font-bold ${selectedCategory === 'all' ? 'border border-white' : ''}`}
          >
            <Menu className="h-5 w-5" />
            All
          </button>
          
          {categories.filter(cat => cat.id !== 'all').slice(0, 6).map(cat => (
            <button 
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`hover:border hover:border-white rounded px-2 py-1 ${selectedCategory === cat.id ? 'border border-white' : ''}`}
            >
              {cat.label}
            </button>
          ))}
          
          <div className="ml-auto text-[#FF9900] font-bold">
            Affiliate Partner Store
          </div>
        </div>
      </div>
    </div>
  );
};
