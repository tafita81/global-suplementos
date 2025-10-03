import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Sparkles, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

const bundles = [
  {
    id: "mind-glow",
    nameKey: "bundles.mindGlow.name",
    itemsKey: "bundles.mindGlow.items",
    price: "$89.99",
    icon: <Brain className="h-8 w-8" />
  },
  {
    id: "glowtech-pro", 
    nameKey: "bundles.glowTechPro.name",
    itemsKey: "bundles.glowTechPro.items",
    price: "$129.99",
    icon: <Sparkles className="h-8 w-8" />
  },
  {
    id: "total-wellness",
    nameKey: "bundles.totalWellness.name",
    itemsKey: "bundles.totalWellness.items",
    price: "$149.99",
    icon: <Heart className="h-8 w-8" />
  }
];

export function TechWellnessBundles() {
  const { t } = useTranslation();
  
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('bundles.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('bundles.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bundles.map((bundle) => (
            <Card key={bundle.id} className="premium-glass border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 text-primary w-fit">
                  {bundle.icon}
                </div>
                <CardTitle className="text-2xl">{t(bundle.nameKey)}</CardTitle>
                <div className="text-sm text-muted-foreground">{t(bundle.itemsKey)}</div>
              </CardHeader>
              
              <CardContent className="text-center space-y-4">
                <div className="text-3xl font-bold text-primary">{bundle.price}</div>
                <Button 
                  className="w-full gold-accent text-primary font-bold" 
                  size="lg"
                  onClick={() => window.location.href = `/bundles/${bundle.id}`}
                >
                  {t('bundles.preOrderNow')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}