import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, Award, Building } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonials = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    position: "CEO, MedTech Global",
    company: "Fortune 500 Healthcare",
    rating: 5,
    content: "Global Supplements revolutionized our supply chain. The AI identifies opportunities we would never see manually. 340% ROI in the first year.",
    avatar: "👩‍💼",
    revenue: "$2.3M saved",
    country: "🇺🇸"
  },
  {
    id: 2,
    name: "Marcus Schmidt",
    position: "Procurement Director",
    company: "European Health Alliance",
    rating: 5,
    content: "The government bidding platform is impressive. We won 15 contracts in 6 months, all with margins above 25%. Automatic compliance is perfect.",
    avatar: "👨‍💼",
    revenue: "$5.7M in contracts",
    country: "🇩🇪"
  },
  {
    id: 3,
    name: "Isabella Rodriguez",
    position: "International Trade Manager",
    company: "LatAm Supplements Corp",
    rating: 5,
    content: "The real-time arbitrage system allowed us to expand to 12 new countries. Complete automation frees our team for strategy. Fantastic!",
    avatar: "👩‍💻",
    revenue: "$1.8M profit increase",
    country: "🇧🇷"
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Chief Supply Officer",
    company: "Pacific Nutrition Ltd",
    rating: 5,
    content: "Zero Investment Engine is revolutionary. We managed to operate without our own capital and still achieve 30%+ margins. Premium 24/7 support is exceptional.",
    avatar: "👨‍💻",
    revenue: "$4.2M revenue generated",
    country: "🇦🇺"
  },
  {
    id: 5,
    name: "Liu Wei",
    position: "Strategic Partnerships Director",
    company: "Asia Health Network",
    rating: 5,
    content: "The integration with Asian suppliers is perfect. Automatic compliance for all markets saved us millions in consulting. Incalculable ROI.",
    avatar: "👨‍🏫",
    revenue: "$3.1M compliance savings",
    country: "🇨🇳"
  }
];

export function PremiumTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 text-sm px-6 py-2 bg-amber-400 hover:bg-amber-300 text-amber-900 font-semibold rounded-full border-0">
            {t('testimonials.badge')}
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Card className="relative overflow-hidden clean-shadow bg-white border border-border/20">
            <div className="absolute top-0 left-0 w-full h-2 gold-accent" />
            
            <CardContent className="p-12">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Profile Section */}
                <div className="text-center md:text-left">
                  <div className="relative inline-block mb-4">
                    <div className="text-6xl mb-4">{currentTestimonial.avatar}</div>
                    <div className="absolute -top-2 -right-2 text-2xl">
                      {currentTestimonial.country}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{currentTestimonial.name}</h3>
                  <p className="text-secondary font-semibold mb-1">{currentTestimonial.position}</p>
                  <p className="text-sm text-muted-foreground mb-4">{currentTestimonial.company}</p>
                  
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <Badge variant="outline" className="gold-accent text-primary border-0">
                    <Award className="h-3 w-3 mr-1" />
                    {currentTestimonial.revenue}
                  </Badge>
                </div>

                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <div className="relative">
                    <Quote className="h-12 w-12 text-secondary/30 absolute -top-4 -left-2" />
                    <blockquote className="text-xl leading-relaxed text-muted-foreground relative z-10 pl-8">
                      "{currentTestimonial.content}"
                    </blockquote>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-6 pt-6 border-t border-border/30">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {t('testimonials.verified')}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 minimal-glass hover:bg-white/40"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 minimal-glass hover:bg-white/40"
            onClick={nextTestimonial}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-secondary w-8' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="text-4xl font-bold text-secondary mb-2">500+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('testimonials.stats.enterpriseClients')}</div>
          </div>
          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="text-4xl font-bold text-secondary mb-2">98.7%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('testimonials.stats.satisfaction')}</div>
          </div>
          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="text-4xl font-bold text-secondary mb-2">$2.3B</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('testimonials.stats.revenueGenerated')}</div>
          </div>
          <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30">
            <div className="text-4xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('testimonials.stats.premiumSupport')}</div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">
            {t('testimonials.joinLeaders')}
          </p>
          <Button 
            size="lg" 
            className="gold-accent text-primary font-semibold px-8 py-4"
          >
            {t('testimonials.requestDemo')}
          </Button>
        </div>
      </div>
    </div>
  );
}