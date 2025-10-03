import { useState, useEffect } from "react";
import { Star, DollarSign, Brain, Zap, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { AmazonStrategyAI } from "@/services/amazonStrategy";
import { MultiAPIClient } from "@/services/rapidAPIClient";
import { AmazonHeader } from "@/components/amazon/AmazonHeader";
import { useMarketplace } from "@/hooks/useMarketplace";
import { getAffiliateLink } from "@/config/amazonMarketplaces";
import { geolocationService } from "@/services/geolocation";
import { currencyService } from "@/services/currency";

// Import high-quality flags from assets
import usFlag from "@/assets/flags/us.png";
import caFlag from "@/assets/flags/ca.png";
import gbFlag from "@/assets/flags/gb.png";
import deFlag from "@/assets/flags/de.png";
import frFlag from "@/assets/flags/fr.png";
import itFlag from "@/assets/flags/it.png";
import esFlag from "@/assets/flags/es.png";
import jpFlag from "@/assets/flags/jp.png";
import auFlag from "@/assets/flags/au.png";
import nlFlag from "@/assets/flags/nl.png";
import seFlag from "@/assets/flags/se.png";
import sgFlag from "@/assets/flags/sg.png";
import saFlag from "@/assets/flags/sa.png";

interface AmazonProduct {
  asin: string;
  title: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  affiliateLink: string;
  category: string;
  prime: boolean;
  _score?: number;
  _commission?: number;
}

const apiClient = new MultiAPIClient();
const strategyAI = new AmazonStrategyAI();

const productCache = new Map<string, { products: any[], timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const Amazon = () => {
  const [products, setProducts] = useState<AmazonProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("supplements");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("beauty");
  const [apiStats, setApiStats] = useState<any[]>([]);
  const [aiAnalysisEnabled, setAiAnalysisEnabled] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(true);
  const { toast } = useToast();
  const { currentMarketplace, setMarketplaceById, initializeFromGeolocation } = useMarketplace();

  // Auto-detecta país do visitante na primeira carga
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        setIsDetectingLocation(true);
        const marketplaceId = await geolocationService.detectMarketplace();
        initializeFromGeolocation(marketplaceId);
      } catch (error) {
        console.warn('Erro ao detectar país, usando USA como padrão:', error);
      } finally {
        setIsDetectingLocation(false);
      }
    };

    detectUserCountry();
  }, []); // Executa apenas uma vez na montagem

  const categories = [
    { id: "all", label: "All", keywords: "supplements vitamins health wellness" },
    { id: "beauty", label: "Beauty & Personal Care", keywords: "collagen beauty skincare hair nails" },
    { id: "wellness", label: "Health & Household", keywords: "wellness health household medical" },
    { id: "devices", label: "Health & Wellness Devices", keywords: "fitness tracker smart watch blood pressure monitor thermometer scale" },
    { id: "sports", label: "Sports Nutrition", keywords: "protein whey creatine pre-workout fitness" },
    { id: "vitamins", label: "Vitamins & Supplements", keywords: "vitamins supplements minerals multivitamins" },
  ];

  const subcategories: Record<string, string[]> = {
    'vitamins': ['Multivitamins', 'Single Vitamins', 'Minerals', 'Herbs & Botanicals', 'Probiotics', 'Omega-3'],
    'sports': ['Protein Powders', 'Pre-Workout', 'Post-Workout', 'Energy Drinks', 'BCAAs', 'Creatine'],
    'beauty': ['Skin Care', 'Hair Care', 'Nail Care', 'Bath & Body', 'Makeup', 'Anti-Aging'],
    'devices': ['Fitness Trackers', 'Blood Pressure Monitors', 'Thermometers', 'Scales', 'Pulse Oximeters'],
    'wellness': ['First Aid', 'Pain Relief', 'Digestive Health', 'Cold & Flu', 'Sleep Support', 'Vitamins']
  };

  // Mapping de subcategorias para queries específicas de busca
  const subcategorySearchTerms: Record<string, string> = {
    'skin care': 'skincare facial serum moisturizer cleanser',
    'hair care': 'shampoo conditioner hair treatment hair oil',
    'nail care': 'nail polish manicure nail treatment cuticle',
    'bath & body': 'body lotion shower gel body wash soap',
    'makeup': 'lipstick foundation mascara eyeshadow blush',
    'anti-aging': 'anti aging wrinkle cream collagen retinol serum',
    'multivitamins': 'multivitamin daily vitamin supplement',
    'single vitamins': 'vitamin d vitamin c vitamin b12 vitamin e',
    'minerals': 'calcium magnesium zinc iron mineral supplement',
    'herbs & botanicals': 'herbal supplement turmeric ginseng ashwagandha',
    'probiotics': 'probiotic digestive health gut health lactobacillus',
    'omega-3': 'fish oil omega 3 dha epa krill oil',
    'protein powders': 'whey protein powder isolate protein shake',
    'pre-workout': 'pre workout energy supplement nitric oxide',
    'post-workout': 'post workout recovery bcaa creatine',
    'energy drinks': 'energy drink caffeine supplement pre workout',
    'bcaas': 'bcaa amino acids leucine isoleucine',
    'creatine': 'creatine monohydrate muscle building supplement',
    'fitness trackers': 'fitness tracker smartwatch activity tracker',
    'blood pressure monitors': 'blood pressure monitor cuff sphygmomanometer',
    'thermometers': 'digital thermometer infrared fever thermometer',
    'scales': 'bathroom scale digital scale body composition',
    'pulse oximeters': 'pulse oximeter fingertip oxygen saturation',
    'first aid': 'first aid kit bandages wound care medical supplies',
    'pain relief': 'pain relief cream pain reliever analgesic',
    'digestive health': 'digestive enzymes fiber supplement gut health',
    'cold & flu': 'cold flu medicine immune support zinc vitamin c',
    'sleep support': 'melatonin sleep aid natural sleep supplement'
  };

  // Keywords para filtrar produtos relevantes por subcategoria
  const subcategoryFilters: Record<string, string[]> = {
    'skin care': ['skin', 'facial', 'serum', 'moisturizer', 'cleanser', 'face', 'cream', 'lotion', 'beauty', 'skincare'],
    'hair care': ['hair', 'shampoo', 'conditioner', 'treatment', 'scalp', 'salon'],
    'nail care': ['nail', 'polish', 'manicure', 'cuticle', 'gel'],
    'bath & body': ['body', 'bath', 'shower', 'soap', 'wash', 'lotion', 'gel'],
    'makeup': ['makeup', 'lipstick', 'foundation', 'mascara', 'eyeshadow', 'blush', 'cosmetic'],
    'anti-aging': ['anti', 'aging', 'wrinkle', 'collagen', 'retinol', 'age', 'youth'],
    'multivitamins': ['multivitamin', 'multi', 'daily', 'complete'],
    'single vitamins': ['vitamin', 'vit'],
    'minerals': ['mineral', 'calcium', 'magnesium', 'zinc', 'iron'],
    'herbs & botanicals': ['herb', 'botanical', 'turmeric', 'ginseng', 'ashwagandha', 'plant'],
    'probiotics': ['probiotic', 'digestive', 'gut', 'flora', 'lactobacillus'],
    'omega-3': ['omega', 'fish oil', 'dha', 'epa', 'krill'],
    'protein powders': ['protein', 'whey', 'isolate', 'powder', 'shake'],
    'pre-workout': ['pre', 'workout', 'energy', 'pump', 'nitric'],
    'post-workout': ['post', 'recovery', 'bcaa', 'amino'],
    'energy drinks': ['energy', 'drink', 'caffeine', 'boost'],
    'bcaas': ['bcaa', 'amino', 'leucine', 'isoleucine'],
    'creatine': ['creatine', 'monohydrate', 'muscle'],
    'fitness trackers': ['fitness', 'tracker', 'watch', 'activity', 'smart'],
    'blood pressure monitors': ['blood', 'pressure', 'monitor', 'cuff'],
    'thermometers': ['thermometer', 'temperature', 'fever', 'infrared'],
    'scales': ['scale', 'weight', 'body', 'bathroom'],
    'pulse oximeters': ['pulse', 'oximeter', 'oxygen', 'saturation'],
    'first aid': ['first', 'aid', 'bandage', 'wound', 'medical'],
    'pain relief': ['pain', 'relief', 'ache', 'sore', 'analgesic'],
    'digestive health': ['digestive', 'fiber', 'gut', 'stomach', 'enzyme'],
    'cold & flu': ['cold', 'flu', 'immune', 'cough', 'congestion'],
    'sleep support': ['sleep', 'melatonin', 'rest', 'night']
  };

  // SEU STORE ID DE AFILIADO AMAZON - TODOS OS LINKS USAM ESTE ID!
  const AFFILIATE_TAG = "globalsupleme-20";

  const handleSearchClick = () => {
    setSelectedCategory("all");
  };

  useEffect(() => {
    // Só busca produtos depois que terminou de detectar localização
    if (isDetectingLocation) {
      return;
    }
    
    const searchProductsEffect = async () => {
      console.log(`🎬 searchProducts called`);
      setLoading(true);
      
      try {
        strategyAI.setMarketplace(currentMarketplace.affiliateTag, currentMarketplace.domain);

        // Determina a query de busca baseada no termo de busca ou categoria/subcategoria
        let searchQuery: string;
        
        if (searchTerm.trim() !== "" && searchTerm.toLowerCase() !== "supplements") {
          // Se usuário digitou algo ou clicou em subcategoria, verifica se tem termo específico
          const subcategoryKey = searchTerm.toLowerCase().trim();
          searchQuery = subcategorySearchTerms[subcategoryKey] || searchTerm;
          console.log(`📋 Subcategoria detectada: "${subcategoryKey}" → Query: "${searchQuery}"`);
        } else {
          // Usa as keywords da categoria selecionada
          const category = categories.find(cat => cat.id === selectedCategory);
          searchQuery = category?.keywords || "supplements";
        }
        
        const cacheKey = `${currentMarketplace.id}-${searchQuery}`;
        
        const cached = productCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
          console.log(`✅ Usando cache para "${searchQuery}" (${Math.round((Date.now() - cached.timestamp) / 1000)}s atrás)`);
          
          let cachedProducts = cached.products;
          
          // Aplica filtro de relevância também no cache se for uma subcategoria específica
          if (searchTerm.trim() !== "" && searchTerm.toLowerCase() !== "supplements") {
            const subcategoryKey = searchTerm.toLowerCase().trim();
            const filterKeywords = subcategoryFilters[subcategoryKey];
            
            if (filterKeywords && filterKeywords.length > 0) {
              console.log(`🔍 Aplicando filtro de relevância (cache) para: "${subcategoryKey}"`);
              cachedProducts = cachedProducts.filter(product => {
                const titleLower = (product.title || '').toLowerCase();
                const categoryLower = (product.category || '').toLowerCase();
                const searchText = `${titleLower} ${categoryLower}`;
                
                const isRelevant = filterKeywords.some(keyword => 
                  searchText.includes(keyword.toLowerCase())
                );
                
                return isRelevant;
              });
              
              console.log(`✅ Filtrados (cache): ${cachedProducts.length} de ${cached.products.length} produtos relevantes`);
            }
          }
          
          const sortedByReviews = cachedProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
          const finalCachedProducts = sortedByReviews.slice(0, 40);
          setLoading(false);
          setProducts(finalCachedProducts);
          console.log(`✅ Loading set to FALSE (cache), ${finalCachedProducts.length} produtos`);
          return;
        }
        
        console.log(`🔍 Pesquisando produtos: "${searchQuery}"`);
        
        const results = await apiClient.searchProducts(
          searchQuery, 
          40, 
          currentMarketplace.id,
          currentMarketplace.domain
        );

        const uniqueProducts = Array.from(
          new Map(results.map(p => [p.asin, p])).values()
        );
        
        let filteredProducts = uniqueProducts;
        
        // Aplica filtro de relevância se for uma subcategoria específica
        if (searchTerm.trim() !== "" && searchTerm.toLowerCase() !== "supplements") {
          const subcategoryKey = searchTerm.toLowerCase().trim();
          const filterKeywords = subcategoryFilters[subcategoryKey];
          
          if (filterKeywords && filterKeywords.length > 0) {
            console.log(`🔍 Aplicando filtro de relevância para: "${subcategoryKey}"`);
            filteredProducts = uniqueProducts.filter(product => {
              const titleLower = (product.title || '').toLowerCase();
              const categoryLower = (product.category || '').toLowerCase();
              const searchText = `${titleLower} ${categoryLower}`;
              
              // Produto é relevante se contém pelo menos uma keyword do filtro
              const isRelevant = filterKeywords.some(keyword => 
                searchText.includes(keyword.toLowerCase())
              );
              
              return isRelevant;
            });
            
            console.log(`✅ Filtrados: ${filteredProducts.length} de ${uniqueProducts.length} produtos relevantes`);
          }
        }
        
        // Ordena sempre por reviews (maior para menor)
        const sortedByReviews = filteredProducts.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        
        productCache.set(cacheKey, { products: sortedByReviews, timestamp: Date.now() });
        
        const finalProducts = sortedByReviews.slice(0, 40);
        console.log(`📦 Setando ${finalProducts.length} produtos no state:`, finalProducts[0]);
        
        // Force state updates in sequence to ensure UI updates
        setLoading(false);
        setProducts(finalProducts);
        setApiStats(apiClient.getUsageStats());
        console.log(`✅ Loading set to FALSE (API), ${finalProducts.length} produtos`);
      } catch (error) {
        console.error('Search error:', error);
        setProducts([]);
        setLoading(false);
        console.log(`❌ Loading set to FALSE (error)`);
      }
    };
    
    searchProductsEffect();
  }, [selectedCategory, currentMarketplace.id, isDetectingLocation, searchTerm]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <AmazonHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSearch={handleSearchClick}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />

      {/* Subcategories Bar - Dynamic based on selected category */}
      {subcategories[selectedCategory] && subcategories[selectedCategory].length > 0 && (
        <div className="bg-[#F7F7F7] border-b border-gray-300 py-3 px-4">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
            {subcategories[selectedCategory].map((sub) => (
              <button 
                key={sub}
                onClick={() => setSearchTerm(sub.toLowerCase())}
                className={`text-xs hover:text-[#C7511F] hover:underline whitespace-nowrap transition-colors ${
                  searchTerm.toLowerCase() === sub.toLowerCase() 
                    ? 'text-[#C7511F] font-semibold underline' 
                    : 'text-gray-800'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full">
        
        {/* Global Credibility Section - Optimized Layout */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 border-t border-b border-gray-200 py-3 mb-6">
          <div className="w-full flex flex-col md:flex-row items-center">
            {/* Left: Logo & Text with Trust Badges - Colado na margem esquerda */}
            <div className="flex items-center pl-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge className="bg-[#FF9900] text-black font-bold text-xs px-2 py-0.5">Amazon OneLink Partner</Badge>
                  <Badge variant="outline" className="border-green-600 text-green-700 text-xs px-2 py-0.5">✓ Official</Badge>
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-tight mb-1.5">Trusted Worldwide • Ship to 14 Countries</h3>
                <p className="text-xs text-gray-600 leading-tight mb-2">Safe shopping with Amazon's global protection</p>
                
                {/* Trust Badges directly below text - Increased vertical spacing */}
                <div className="flex flex-wrap gap-3 text-xs mt-0">
                  <div className="flex items-center gap-1 text-gray-700">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Buyer Protection</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Global Delivery</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-700">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-medium">Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right: Country Flags Grid - 2 rows × 7 columns - CLICÁVEIS PARA MUDAR MARKETPLACE - Colado na margem direita */}
            <div className="flex flex-col gap-1.5 ml-auto pr-4">
              {/* First Row - 7 flags */}
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setMarketplaceById('US')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'US' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={usFlag} width="40" height="30" alt="USA" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">USA</span>
                </button>
                <button onClick={() => setMarketplaceById('CA')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'CA' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={caFlag} width="40" height="30" alt="Canada" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Canada</span>
                </button>
                <button onClick={() => setMarketplaceById('UK')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'UK' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={gbFlag} width="40" height="30" alt="UK" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">UK</span>
                </button>
                <button onClick={() => setMarketplaceById('DE')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'DE' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={deFlag} width="40" height="30" alt="Germany" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Germany</span>
                </button>
                <button onClick={() => setMarketplaceById('FR')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'FR' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={frFlag} width="40" height="30" alt="France" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">France</span>
                </button>
                <button onClick={() => setMarketplaceById('IT')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'IT' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={itFlag} width="40" height="30" alt="Italy" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Italy</span>
                </button>
                <button onClick={() => setMarketplaceById('ES')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'ES' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={esFlag} width="40" height="30" alt="Spain" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Spain</span>
                </button>
              </div>
              
              {/* Second Row - 7 flags */}
              <div className="flex items-center gap-3 justify-end">
                <button onClick={() => setMarketplaceById('JP')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'JP' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={jpFlag} width="40" height="30" alt="Japan" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Japan</span>
                </button>
                <button onClick={() => setMarketplaceById('AU')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'AU' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={auFlag} width="40" height="30" alt="Australia" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Australia</span>
                </button>
                <button onClick={() => setMarketplaceById('NL')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'NL' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={nlFlag} width="40" height="30" alt="Netherlands" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Netherlands</span>
                </button>
                <button onClick={() => setMarketplaceById('SE')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'SE' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={seFlag} width="40" height="30" alt="Sweden" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Sweden</span>
                </button>
                <button onClick={() => setMarketplaceById('SG')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'SG' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={sgFlag} width="40" height="30" alt="Singapore" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Singapore</span>
                </button>
                <button onClick={() => setMarketplaceById('PL')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'PL' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src="https://flagcdn.com/w320/pl.png" width="40" height="30" alt="Poland" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Poland</span>
                </button>
                <button onClick={() => setMarketplaceById('SA')} className={`flex flex-col items-center gap-0.5 hover:scale-110 transition-transform cursor-pointer ${currentMarketplace.id === 'SA' ? 'ring-2 ring-[#FF9900] rounded' : ''}`}>
                  <img src={saFlag} width="40" height="30" alt="Saudi Arabia" className="rounded shadow-sm" />
                  <span className="text-[9px] font-medium text-gray-600">Saudi Arabia</span>
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products from Amazon...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">No products found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4">
            {products.map((product) => (
              <Card key={product.asin} className="hover:shadow-lg transition-all hover:-translate-y-1 bg-white border border-gray-200">
                <CardHeader className="p-0">
                  <div className="relative bg-white">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-72 object-contain rounded-t-lg p-4"
                      loading="lazy"
                    />
                    {product.rating >= 4.5 && product.reviews >= 500 && (
                      <Badge className="absolute top-3 left-3 bg-[#232F3E] text-white font-bold px-2 py-1 text-xs">
                        Amazon's Choice
                      </Badge>
                    )}
                    {product.prime && (
                      <Badge className="absolute top-3 right-3 bg-[#00A8E1] text-white font-bold px-2 py-1">
                        <svg className="h-4 w-4 mr-1" viewBox="0 0 100 30" fill="currentColor">
                          <path d="M58.074 22.557c-4.372 3.223-10.718 4.94-16.177 4.94-7.658 0-14.562-2.831-19.784-7.544-.41-.37-.043-.875.45-.587 5.632 3.28 12.592 5.25 19.78 5.25 4.85 0 10.186-1.006 15.093-3.088.74-.314 1.36.487.638 1.03z"/>
                          <path d="M60.16 20.23c-.558-.716-3.697-.339-5.108-.17-.43.052-.496-.322-.108-.592 2.5-1.76 6.604-1.25 7.083-.662.48.593-.127 4.704-2.472 6.665-.36.302-.704.141-.544-.258.527-1.314 1.707-4.267 1.15-4.982z"/>
                        </svg>
                        Prime
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <CardTitle className="text-base mb-3 line-clamp-2 font-normal text-[#0F1111] hover:text-[#C7511F] cursor-pointer leading-snug">
                    {product.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-[#0F1111] mr-1">{product.rating}</span>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-[#FFA41C] text-[#FFA41C]' : 'fill-gray-300 text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#007185] ml-2 hover:text-[#C7511F] cursor-pointer">
                      {product.reviews.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="text-3xl font-bold text-[#B12704]">
                      {product.price}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0">
                  <Button 
                    className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-[#0F1111] font-medium rounded-lg shadow-sm border border-[#FCD200] h-10"
                    onClick={() => window.open(product.affiliateLink, '_blank')}
                  >
                    Buy on Amazon
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Info Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#232F3E] to-[#131921] text-white rounded-lg p-6">
          <div className="flex items-start gap-4">
            <ShoppingCart className="h-8 w-8 flex-shrink-0 text-[#FF9900]" />
            <div>
              <h3 className="text-xl font-bold mb-2">Amazon Affiliate Program</h3>
              <p className="text-gray-300">
                All products are linked through our Amazon Associates affiliate program (Store ID: globalsupleme-20). 
                We earn a commission on qualifying purchases at no extra cost to you.
                Products are updated in real-time from Amazon's catalog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Amazon;
