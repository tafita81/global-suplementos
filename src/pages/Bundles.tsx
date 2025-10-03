import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import { Sparkles, Brain, Heart } from "lucide-react";

const bundles = [
  {
    id: "mind-glow",
    name: "Mind & Glow Bundle",
    items: ["Energy Supplement", "AI Skincare Analyzer"],
    price: "$89.99",
    icon: <Brain className="h-8 w-8" />,
    description: "Boost mental clarity with AI-powered skincare analysis"
  },
  {
    id: "glowtech-pro",
    name: "GlowTech Pro Bundle", 
    items: ["Skincare Analyzer", "Gua Sha Massager", "Wireless Charger"],
    price: "$129.99",
    icon: <Sparkles className="h-8 w-8" />,
    description: "Complete tech wellness experience for daily beauty routine"
  },
  {
    id: "total-wellness",
    name: "Total Wellness Kit",
    items: ["All 4 products", "Supplement + Skincare Analyzer + Gua Sha + Charger"],
    price: "$149.99", 
    icon: <Heart className="h-8 w-8" />,
    description: "Complete wellness transformation with premium tech integration"
  }
];

export default function Bundles() {
  const { t } = useTranslation();

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        {/* Header Section */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tech & Wellness Bundles
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto">
              Premium kits for beauty, focus, and daily tech convenience.
            </p>
          </div>
        </section>

        {/* Bundles Grid */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {bundles.map((bundle) => (
                <Card key={bundle.id} className="premium-glass border-primary/20 hover:border-primary/40 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                      {bundle.icon}
                    </div>
                    <CardTitle className="text-2xl">{bundle.name}</CardTitle>
                    <CardDescription className="text-lg">
                      {bundle.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{bundle.price}</div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                        Included Items:
                      </h4>
                      {bundle.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span className="text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full gold-accent text-primary font-bold" 
                      size="lg"
                      onClick={() => window.location.href = `/bundles/${bundle.id}`}
                    >
                      Pre-Order Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Terms Section */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="premium-glass border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-center">All bundles include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="font-medium">✨ Custom retail packaging</div>
                    <div className="font-medium">📖 English user manuals</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">🛡️ 30-day satisfaction guarantee</div>
                    <div className="font-medium">🚚 Delivery in 60 days after pre-order confirmation</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}