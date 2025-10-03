import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import { Sparkles, Brain, Zap, Smartphone } from "lucide-react";

const products = [
  {
    id: "energy-supplement",
    name: "Energy & Focus Supplement",
    category: "Beauty Supplements",
    description: "GMP-certified formula for mental clarity and energy boost",
    image: "/images/energy-supplement.jpg",
    icon: <Brain className="h-8 w-8" />,
    features: [
      "60 capsules per bottle",
      "GMP-certified manufacturing",
      "Natural ingredients",
      "30-day supply"
    ]
  },
  {
    id: "skincare-analyzer",
    name: "Smart Skincare Analyzer",
    category: "Smart Gadgets", 
    description: "AI-powered device to analyze your skin type and condition",
    image: "/images/skincare-analyzer.jpg",
    icon: <Sparkles className="h-8 w-8" />,
    features: [
      "AI-powered analysis",
      "Mobile app integration",
      "Personalized recommendations",
      "FCC/CE certified"
    ]
  },
  {
    id: "gua-sha-massager",
    name: "Gua Sha Facial Massager",
    category: "Wellness Tech",
    description: "Traditional wellness meets modern design for facial care",
    image: "/images/gua-sha-massager.jpg",
    icon: <Zap className="h-8 w-8" />,
    features: [
      "Premium materials",
      "Ergonomic design",
      "Traditional technique",
      "Easy to clean"
    ]
  },
  {
    id: "wireless-charger",
    name: "3-in-1 Wireless Charger",
    category: "Smart Gadgets",
    description: "Charge phone, earbuds, and watch simultaneously",
    image: "/images/wireless-charger.jpg", 
    icon: <Smartphone className="h-8 w-8" />,
    features: [
      "15W fast charging",
      "Multiple device support",
      "LED indicators",
      "Universal compatibility"
    ]
  }
];

const categories = ["All", "Beauty Supplements", "Smart Gadgets", "Wellness Tech"];

export default function Products() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Header Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Premium supplements and smart wellness technology for modern health solutions.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="premium-glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                      {product.icon}
                    </div>
                    <Badge className="mb-2 gold-accent text-primary font-medium">
                      {product.category}
                    </Badge>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Product Image Placeholder */}
                    <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        {product.icon}
                        <p className="text-muted-foreground text-sm mt-2">Product Image</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      {product.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Features:
                      </h4>
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                          <span className="text-xs">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-center pt-4">
                      <div className="text-lg font-semibold text-muted-foreground mb-3">
                        Contact for Pricing
                      </div>
                      <Button 
                        variant="outline"
                        className="w-full border-primary/30 hover:bg-primary/10" 
                        onClick={() => window.location.href = "/b2b"}
                      >
                        Request Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* B2B CTA Section */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Card className="premium-glass border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Interested in Bulk Orders?</h3>
                <p className="text-muted-foreground mb-6">
                  Contact our B2B team for wholesale pricing, private labeling, and distribution opportunities.
                </p>
                <Button 
                  size="lg"
                  className="gold-accent text-primary font-bold"
                  onClick={() => window.location.href = "/b2b"}
                >
                  🤝 Partner With Us
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}