import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, ShoppingCart, Award } from "lucide-react";
import { useTranslation } from 'react-i18next';
import premiumProductsImage from "@/assets/premium-products-showcase-4k.jpg";

const premiumProducts = [
  {
    id: 1,
    name: "Mycogenesis Elite Formula",
    category: "Premium Supplements",
    rating: 4.9,
    reviews: 1247,
    badge: "Bestseller",
    description: "Advanced mushroom-based supplement with 15 premium ingredients",
    image: premiumProductsImage,
    features: ["100% Organic", "Lab Tested", "GMP Certified"]
  },
  {
    id: 2,
    name: "Global Immunity Complex",
    category: "Immune Support",
    rating: 4.8,
    reviews: 892,
    badge: "New",
    description: "Cutting-edge immune system support formula",
    image: premiumProductsImage,
    features: ["Clinically Proven", "Third-Party Tested", "Premium Grade"]
  },
  {
    id: 3,
    name: "Executive Wellness Pack",
    category: "Business Elite",
    rating: 5.0,
    reviews: 456,
    badge: "Exclusive",
    description: "Complete wellness solution for high-performance professionals",
    image: premiumProductsImage,
    features: ["Executive Grade", "Personalized", "VIP Support"]
  },
  {
    id: 4,
    name: "Global Longevity Pro",
    category: "Anti-Aging",
    rating: 4.9,
    reviews: 654,
    badge: "Premium",
    description: "Advanced anti-aging and longevity support formula",
    image: premiumProductsImage,
    features: ["Research-Based", "Pure Ingredients", "Maximum Potency"]
  }
];

export function PremiumProductCarousel() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % premiumProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % premiumProducts.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + premiumProducts.length) % premiumProducts.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4 text-sm px-4 py-2 gold-accent text-primary font-semibold">
            🏆 Premium Collection
          </Badge>
          <h2 className="text-4xl font-bold mb-4 text-primary">
            {t('products.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('products.description')}
          </p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-2xl clean-shadow">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {premiumProducts.map((product, index) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <Card className="border-0 bg-white overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-8 p-8">
                      {/* Product Image */}
                      <div className="relative">
                        <div 
                          className="aspect-square bg-cover bg-center rounded-xl premium-video-container"
                          style={{ backgroundImage: `url(${product.image})` }}
                        >
                          <div className="premium-video-overlay" />
                          <div className="absolute top-4 left-4 z-10">
                            <Badge variant="secondary" className="gold-accent text-primary font-semibold">
                              {product.badge}
                            </Badge>
                          </div>
                          <div className="absolute top-4 right-4 z-10">
                            <div className="flex items-center gap-1 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white font-semibold">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col justify-center space-y-6">
                        <div>
                          <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                            {product.category}
                          </p>
                          <h3 className="text-3xl font-bold mb-3">{product.name}</h3>
                          <p className="text-lg text-muted-foreground mb-4">
                            {product.description}
                          </p>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {product.features.map((feature, fIndex) => (
                            <Badge key={fIndex} variant="outline" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews.toLocaleString()} {t('products.reviews')})
                          </span>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center">
                          <Button size="lg" className="gold-accent hover:opacity-90 text-primary font-semibold w-full">
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            {t('products.requestQuote')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 minimal-glass hover:bg-white/40"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 minimal-glass hover:bg-white/40"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {premiumProducts.map((_, index) => (
              <button
                key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-secondary w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}