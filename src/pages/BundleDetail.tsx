import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, Heart, Shield, Truck, Star, Clock, Users, Crown, Zap, CheckCircle, AlertTriangle, Gift, TrendingUp, Award, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const bundleData = {
  "mind-glow": {
    name: "Mind & Glow Bundle",
    originalPrice: "$159.99",
    price: "$89.99",
    savings: "$70.00",
    icon: <Brain className="h-12 w-12" />,
    items: [
      "1x Energy & Focus Supplement (60 caps) - $39.99 Value",
      "1x Smart Skincare Analyzer with AI - $119.99 Value"
    ],
    benefits: [
      "🧠 Unlock your cognitive potential with GMP-certified nootropics",
      "✨ Reveal your perfect skin routine with AI precision analysis",
      "⚡ Experience 300% more mental clarity within 7 days",
      "🎯 Achieve flawless skin texture in just 2 weeks"
    ],
    testimonials: [
      { name: "Sarah M.", text: "My focus increased dramatically! Closed 3 major deals this month.", rating: 5 },
      { name: "David K.", text: "The AI analyzer revealed issues I never knew I had. Skin is glowing now!", rating: 5 }
    ],
    urgency: "Only 47 kits left in stock",
    social: "127 people bought this in the last 24 hours",
    guarantee: "60-Day Money-Back Guarantee",
    image: "/images/mind-glow-bundle.jpg"
  },
  "glowtech-pro": {
    name: "GlowTech Pro Bundle",
    originalPrice: "$249.99",
    price: "$129.99", 
    savings: "$120.00",
    icon: <Sparkles className="h-12 w-12" />,
    items: [
      "1x Smart Skincare Analyzer with AI - $119.99 Value",
      "1x Gua Sha Facial Massager - $89.99 Value",
      "1x 3-in-1 Wireless Charger - $79.99 Value"
    ],
    benefits: [
      "🔬 Scientific skincare analysis reveals hidden potential",
      "💆‍♀️ Ancient wellness meets cutting-edge technology",
      "⚡ Triple charging convenience for your digital life",
      "✨ Transform into your most radiant self"
    ],
    testimonials: [
      { name: "Maria L.", text: "This bundle transformed my entire wellness routine. Incredible!", rating: 5 },
      { name: "Alex R.", text: "The Gua Sha combined with AI analysis = perfect skin routine", rating: 5 }
    ],
    urgency: "Only 23 kits left in stock",
    social: "89 people bought this in the last 24 hours",
    guarantee: "60-Day Money-Back Guarantee",
    image: "/images/glowtech-pro-bundle.jpg"
  },
  "total-wellness": {
    name: "Total Wellness Kit",
    originalPrice: "$349.99",
    price: "$149.99",
    savings: "$200.00",
    icon: <Heart className="h-12 w-12" />,
    items: [
      "1x Energy & Focus Supplement (60 caps) - $39.99 Value",
      "1x Smart Skincare Analyzer with AI - $119.99 Value", 
      "1x Gua Sha Facial Massager - $89.99 Value",
      "1x 3-in-1 Wireless Charger - $79.99 Value"
    ],
    benefits: [
      "🌟 Complete mind-body transformation system",
      "🎯 4-in-1 premium solution saves you $200+ instantly",
      "⚡ Peak performance optimization for ambitious achievers",
      "✨ Become the upgraded version of yourself"
    ],
    testimonials: [
      { name: "Jennifer P.", text: "Best investment I made this year. Everything I needed in one kit!", rating: 5 },
      { name: "Michael T.", text: "My productivity and appearance both improved dramatically.", rating: 5 }
    ],
    urgency: "Only 12 kits left in stock",
    social: "156 people bought this in the last 24 hours",
    guarantee: "60-Day Money-Back Guarantee",
    image: "/images/total-wellness-kit.jpg"
  }
};

export default function BundleDetail() {
  const { bundleId } = useParams();
  const { t } = useTranslation();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 47, seconds: 32 });
  const [stockCount, setStockCount] = useState(47);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: ""
  });

  const bundle = bundleData[bundleId as keyof typeof bundleData];

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Stock countdown effect
  useEffect(() => {
    const stockTimer = setInterval(() => {
      if (Math.random() > 0.8 && stockCount > 10) {
        setStockCount(prev => prev - 1);
      }
    }, 15000);

    return () => clearInterval(stockTimer);
  }, [stockCount]);

  if (!bundle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bundle Not Found</h1>
          <Button onClick={() => window.location.href = "/bundles"}>
            Return to Bundles
          </Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "🎉 Order Confirmed!",
      description: "Welcome to your transformation journey! Production starts immediately.",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background">
      {/* Urgent Banner */}
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-3 px-4 text-center animate-pulse">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-bold">FLASH SALE ENDING SOON:</span>
          <div className="flex gap-1 ml-2">
            <span className="bg-black/20 px-2 py-1 rounded text-sm font-mono">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span className="bg-black/20 px-2 py-1 rounded text-sm font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span className="bg-black/20 px-2 py-1 rounded text-sm font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      <section className="pt-4 pb-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 min-h-[80vh]">
            
            {/* Left Column - Product Info */}
            <div className="xl:col-span-7 space-y-6">
              
              {/* Compact Product Header */}
              <div className="text-center xl:text-left">
                <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
                    <div className="scale-75">
                      {bundle.icon}
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm px-3 py-1 animate-bounce">
                    LIMITED EDITION
                  </Badge>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm px-3 py-1">
                    <Crown className="h-3 w-3 mr-1" />
                    BESTSELLER
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent leading-tight">
                  {bundle.name}
                </h1>
                
                {/* Compact Pricing */}
                <div className="mb-6">
                  <div className="flex items-center justify-center xl:justify-start gap-3 mb-2">
                    <span className="text-lg sm:text-xl text-muted-foreground line-through">{bundle.originalPrice}</span>
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary">{bundle.price}</div>
                  </div>
                  <div className="flex items-center justify-center xl:justify-start gap-2 text-green-600 font-bold text-lg">
                    <TrendingUp className="h-4 w-4" />
                    You Save {bundle.savings} (48% OFF)
                  </div>
                </div>

                {/* Compact Social Proof */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-700 justify-center xl:justify-start">
                      <Users className="h-4 w-4" />
                      <span className="font-semibold text-sm animate-pulse">{bundle.social}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-700 justify-center xl:justify-start">
                      <Timer className="h-4 w-4 animate-pulse" />
                      <span className="font-bold text-sm">{bundle.urgency}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compact Product Visualization */}
              <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="mb-2 scale-75 animate-pulse">
                          {bundle.icon}
                        </div>
                        <p className="text-muted-foreground text-sm font-semibold">Premium Bundle</p>
                      </div>
                    </div>
                    {/* Value Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xs">
                        <Gift className="h-3 w-3 mr-1" />
                        {bundle.originalPrice} Value
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Compact What's Included */}
              <Card className="border border-primary/20 shadow-md">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5 py-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="h-5 w-5 text-yellow-500" />
                    What's Included ({bundle.originalPrice} Value)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  {bundle.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded border border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="font-medium text-sm">{item}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Compact Benefits */}
              <Card className="border border-secondary/20 shadow-md">
                <CardHeader className="bg-gradient-to-r from-secondary/5 to-primary/5 py-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Your Transformation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                  {bundle.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded border border-blue-200">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-1.5 flex-shrink-0 animate-pulse"></div>
                      <span className="text-sm font-medium leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Compact Testimonials */}
              <Card className="border border-yellow-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 py-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Real Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-4">
                  {bundle.testimonials.map((testimonial, index) => (
                    <div key={index} className="p-3 bg-white rounded border-l-4 border-yellow-400 shadow-sm">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm italic mb-1">"{testimonial.text}"</p>
                      <p className="font-bold text-primary text-xs">- {testimonial.name}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sticky Order Form */}
            <div className="xl:col-span-5 space-y-4">
              
              {/* Optimized Order Card */}
              <Card className="border-4 border-primary shadow-xl relative overflow-hidden sticky top-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
                <CardHeader className="relative z-10 text-center bg-gradient-to-r from-primary to-secondary text-white py-4">
                  <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                    <Shield className="h-6 w-6" />
                    Secure Your Kit Now
                  </CardTitle>
                  <p className="text-lg opacity-90">Only {stockCount} Left in Stock!</p>
                </CardHeader>
                <CardContent className="relative z-10 p-4 sm:p-6">
                  
                  {/* Compact Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Stock Level</span>
                      <span className="text-red-600 font-bold">{Math.round((stockCount/50) * 100)}% Remaining</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${(stockCount/50) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 text-sm p-2 border-2 focus:border-primary"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 text-sm p-2 border-2 focus:border-primary"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address" className="text-sm font-semibold">Shipping Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="mt-1 text-sm p-2 border-2 focus:border-primary"
                        placeholder="123 Main Street"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div>
                        <Label htmlFor="city" className="text-sm font-semibold">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 text-sm p-2 border-2 focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-sm font-semibold">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="mt-1 text-sm p-2 border-2 focus:border-primary"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode" className="text-sm font-semibold">ZIP *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="mt-1 text-sm p-2 border-2 focus:border-primary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="country" className="text-sm font-semibold">Country *</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="mt-1 text-sm p-2 border-2 focus:border-primary"
                        placeholder="United States"
                        required
                      />
                    </div>

                    {/* Compact CTA Button */}
                    <Button 
                      type="submit" 
                      className="w-full text-lg font-bold py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 animate-pulse"
                      size="lg"
                    >
                      🔥 CLAIM YOUR {bundle.price} KIT NOW 🔥
                    </Button>
                    
                    <div className="text-center space-y-1">
                      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm">
                        <Shield className="h-4 w-4" />
                        256-Bit SSL Secured • Verified U.S. Business
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ✅ {bundle.guarantee} • ✅ Free Shipping • ✅ 24/7 Support
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Compact Trust Signals */}
              <Card className="border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                    <Shield className="h-5 w-5 text-green-600" />
                    Success Guaranteed
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">60-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">Free Express Shipping (2-3 Days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">Production Starts Immediately</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-sm">FDA-Approved Facility in Orlando, FL</span>
                  </div>
                </CardContent>
              </Card>

              {/* Compact FOMO Booster */}
              <Card className="border border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
                <CardContent className="p-4 text-center">
                  <h3 className="text-lg font-bold text-red-800 mb-2">⚠️ DON'T MISS OUT ⚠️</h3>
                  <p className="text-red-700 font-medium text-sm">
                    This exclusive bundle sells out every month. 
                    <br />
                    Next restock won't be until February 2025.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}