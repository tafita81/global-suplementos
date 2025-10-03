import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { 
  Sparkles, 
  Cpu, 
  Shield, 
  Smartphone, 
  Heart,
  ArrowRight,
  Globe,
  Building,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from "lucide-react";
import beautySupplementsImage from "@/assets/beauty-supplements-4k.jpg";
import quantumProcessingImage from "@/assets/quantum-processing-4k.jpg";
import medicalGradeImage from "@/assets/medical-grade-4k.jpg";
import smartGadgetsImage from "@/assets/smart-health-gadgets-4k.jpg";
import traditionalWellnessImage from "@/assets/traditional-wellness-4k.jpg";

const productCategories = [
  {
    id: "gadgets",
    icon: Smartphone,
    color: "from-orange-500 to-red-600",
    videoUrl: "/videos/smart-gadgets-4k.mp4",
    image: smartGadgetsImage
  },
  {
    id: "beauty",
    icon: Sparkles,
    color: "from-pink-500 to-purple-600",
    videoUrl: "/videos/beauty-supplements-4k.mp4",
    image: beautySupplementsImage
  },
  {
    id: "quantum",
    icon: Cpu,
    color: "from-blue-500 to-cyan-600",
    videoUrl: "/videos/quantum-materials-4k.mp4",
    image: quantumProcessingImage
  },
  {
    id: "medical",
    icon: Shield,
    color: "from-green-500 to-emerald-600",
    videoUrl: "/videos/medical-compounds-4k.mp4",
    image: medicalGradeImage
  },
  {
    id: "wellness",
    icon: Heart,
    color: "from-violet-500 to-indigo-600",
    videoUrl: "/videos/wellness-products-4k.mp4",
    image: traditionalWellnessImage
  }
];

export function AdvancedProductCategories() {
  const { t } = useTranslation();
  const [currentCategory, setCurrentCategory] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPaused) return;
    
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % productCategories.length);
      setIsVideoPlaying(false);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPaused]);

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev + 1) % productCategories.length);
    setIsVideoPlaying(false);
    setIsAutoPaused(true);
  };

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev - 1 + productCategories.length) % productCategories.length);
    setIsVideoPlaying(false);
    setIsAutoPaused(true);
  };

  const currentProduct = productCategories[currentCategory];
  const IconComponent = currentProduct.icon;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 text-lg px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold">
            {t('products.badge')}
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold mb-16 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-[1.25] md:leading-[1.15] pb-2 md:pb-3">
            {t('products.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('products.description')}
          </p>
        </div>

        {/* Main Display */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Visual Content */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <div 
                className={`aspect-[4/3] bg-gradient-to-br ${currentProduct.color} relative`}
                style={{ 
                  backgroundImage: `url(${currentProduct.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Video Overlay */}
                {isVideoPlaying && (
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={currentProduct.videoUrl} type="video/mp4" />
                  </video>
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Pause Button */}
                {!isVideoPlaying && (
                  <button
                    onClick={() => setIsAutoPaused(!isAutoPaused)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      {isAutoPaused ? (
                        <Play className="h-12 w-12 text-white ml-1" />
                      ) : (
                        <Pause className="h-12 w-12 text-white" />
                      )}
                    </div>
                  </button>
                )}

                {/* Category Icon */}
                <div className="absolute top-6 left-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevCategory}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextCategory}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
            </div>

            {/* Category Indicators with Play/Pause Control */}
            <div className="flex justify-center items-center gap-4 mt-6">
              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoPaused(!isAutoPaused)}
                className="bg-primary/20 backdrop-blur-sm rounded-full p-2 hover:bg-primary/30 transition-all duration-300"
              >
                {isAutoPaused ? (
                  <Play className="h-4 w-4 text-primary" />
                ) : (
                  <Pause className="h-4 w-4 text-primary" />
                )}
              </button>
              
              {/* Category Dots */}
              <div className="flex gap-3">
                {productCategories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentCategory(index);
                      setIsVideoPlaying(false);
                      setIsAutoPaused(true);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCategory 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl font-bold mb-4 text-gray-900">
                {t(`products.categories.${currentProduct.id}.title`)}
              </h3>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {t(`products.categories.${currentProduct.id}.description`)}
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentProduct.color}`} />
                  <span className="text-gray-700 font-semibold text-xl">
                    {t(`products.categories.${currentProduct.id}.features.${i}`)}
                  </span>
                </div>
              ))}
            </div>

            {/* Business Models */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="font-bold text-blue-900 text-xl">{t('products.businessModels.b2b')}</div>
                <div className="text-lg font-medium text-blue-700">{t('products.businessModels.enterprise')}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="font-bold text-green-900 text-xl">{t('products.businessModels.b2c')}</div>
                <div className="text-lg font-medium text-green-700">{t('products.businessModels.consumer')}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <Globe className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="font-bold text-purple-900 text-xl">{t('products.businessModels.gov')}</div>
                <div className="text-lg font-medium text-purple-700">{t('products.businessModels.procurement')}</div>
              </div>
            </div>

            {/* Action Button */}
            <Button 
              size="lg" 
              className="w-full text-lg py-6 bg-gradient-to-r from-primary to-secondary text-white font-bold hover:opacity-90 transition-all duration-300"
            >
              {t('products.requestQuote')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* All Categories Overview - removed (only 5 cards) as requested */}
        {/* If needed again, restore the grid below:
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">...
        </div>
        */}
      </div>
    </section>
  );
}