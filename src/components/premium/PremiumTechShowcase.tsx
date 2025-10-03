import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Zap, 
  Shield, 
  Globe2, 
  TrendingUp, 
  Target,
  Cpu,
  Database,
  Cloud,
  Rocket,
  Eye,
  BarChart3
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import globalNetworkImage from "@/assets/global-network-4k.jpg";
import manufacturingImage from "@/assets/manufacturing-facility-4k.jpg";
import techGlobeImage from "@/assets/tech-globe-4k.jpg";

const techFeatures = [
  {
    id: "ai",
    titleKey: "tech.features.aiEngine.title",
    descriptionKey: "tech.features.aiEngine.description",
    statsKey: "tech.features.aiEngine.stats",
    icon: Brain,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    id: "realtime",
    titleKey: "tech.features.realTime.title",
    descriptionKey: "tech.features.realTime.description", 
    statsKey: "tech.features.realTime.stats",
    icon: Zap,
    color: "from-yellow-500/20 to-yellow-600/20"
  },
  {
    id: "security",
    titleKey: "tech.features.security.title",
    descriptionKey: "tech.features.security.description",
    statsKey: "tech.features.security.stats",
    icon: Shield,
    color: "from-green-500/20 to-green-600/20"
  },
  {
    id: "global",
    titleKey: "tech.features.globalNetwork.title",
    descriptionKey: "tech.features.globalNetwork.description",
    statsKey: "tech.features.globalNetwork.stats",
    icon: Globe2,
    color: "from-blue-500/20 to-blue-600/20"
  }
];

const platforms = [
  {
    nameKey: "tech.platforms.quantum.name",
    descriptionKey: "tech.platforms.quantum.description",
    features: ["Machine Learning", "Predictive Analytics", "Market Intelligence"],
    href: "/quantum-opportunity-engine"
  },
  {
    nameKey: "tech.platforms.arbitrage.name",
    descriptionKey: "tech.platforms.arbitrage.description",
    features: ["Price Monitoring", "Auto-Execution", "Risk Management"],
    href: "/real-time-arbitrage-engine"
  },
  {
    nameKey: "tech.platforms.zeroInvestment.name",
    descriptionKey: "tech.platforms.zeroInvestment.description",
    features: ["Credit Facilitation", "Automated Trading", "Risk-Free Operations"],
    href: "/zero-investment-engine"
  }
];

export function PremiumTechShowcase() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 text-sm px-4 py-2 gold-accent text-primary font-semibold">
            {t('tech.badge')}
          </Badge>
          <h2 className="text-5xl font-bold mb-6 text-primary">
            {t('tech.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {t('tech.subtitle')}
          </p>
        </div>

        {/* Tech Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techFeatures.map((feature, index) => (
            <Card 
              key={feature.id} 
              className={`relative overflow-hidden hover:clean-shadow transition-all duration-500 clean-fade-in bg-white border border-border/30`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-muted/20 rounded-xl">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-sm font-medium">
                    {t(feature.statsKey)}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold">{t(feature.titleKey)}</CardTitle>
                <CardDescription className="text-base">{t(feature.descriptionKey)}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Main Tech Showcase Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="text-base font-medium">{t('tech.tabs.overview')}</TabsTrigger>
            <TabsTrigger value="platforms" className="text-base font-medium">{t('tech.tabs.platforms')}</TabsTrigger>
            <TabsTrigger value="analytics" className="text-base font-medium">{t('tech.tabs.analytics')}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="p-3 bg-purple-500/20 rounded-xl">
                    <Cpu className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-primary">{t('tech.aiQuantum.title')}</h3>
                    <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                      {t('tech.aiQuantum.description')}
                    </p>
                    <Badge variant="secondary" className="text-sm font-medium bg-purple-100 text-purple-700">
                      {t('tech.aiQuantum.badge')}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-primary">{t('tech.bigData.title')}</h3>
                    <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                      {t('tech.bigData.description')}
                    </p>
                    <Badge variant="secondary" className="text-sm font-medium bg-blue-100 text-blue-700">
                      {t('tech.bigData.badge')}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="p-3 bg-green-500/20 rounded-xl">
                    <Cloud className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-primary">{t('tech.cloudInfra.title')}</h3>
                    <p className="text-muted-foreground mb-4 text-base leading-relaxed">
                      {t('tech.cloudInfra.description')}
                    </p>
                    <Badge variant="secondary" className="text-sm font-medium bg-green-100 text-green-700">
                      {t('tech.cloudInfra.badge')}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div 
                  className="bg-gradient-to-br from-blue-900/95 to-purple-900/95 rounded-2xl p-8 text-center relative overflow-hidden min-h-[400px] flex flex-col justify-center items-center"
                  style={{ 
                    backgroundImage: `url(${techGlobeImage})`, 
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'overlay'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/85 to-purple-900/85" />
                  <div className="relative z-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 mb-6 w-16 h-16 flex items-center justify-center mx-auto border border-white/20">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4 text-white">{t('tech.dashboardIA.title')}</h3>
                    <p className="text-white/95 mb-8 text-lg max-w-sm mx-auto leading-relaxed">
                      {t('tech.dashboardIA.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="platforms" className="mt-8">
            <div className="grid md:grid-cols-3 gap-6">
              {platforms.map((platform, index) => (
                <Card 
                  key={index} 
                  className="hover:clean-shadow transition-all duration-300 cursor-pointer bg-white"
                  onClick={() => navigate(platform.href)}
                >
                  <CardHeader>
                    <CardTitle className="text-xl">{t(platform.nameKey)}</CardTitle>
                    <CardDescription>{t(platform.descriptionKey)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {platform.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-secondary" />
                          <span className="text-sm">{t(`tech.platforms.${platform.nameKey.split('.')[2]}.features.${fIndex}`)}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      {t('tech.ctas.explorePlatform')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="mt-8">
            <div 
              className="bg-gradient-to-br from-card to-muted/20 rounded-2xl p-8 relative overflow-hidden"
              style={{ backgroundImage: `url(${manufacturingImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
              <div className="relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6">{t('tech.analytics.title')}</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary/20 rounded-lg">
                          <Eye className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold">{t('tech.analytics.vision360.title')}</p>
                          <p className="text-sm text-muted-foreground">
                            {t('tech.analytics.vision360.description')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary/20 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="font-semibold">{t('tech.analytics.predictions.title')}</p>
                          <p className="text-sm text-muted-foreground">
                            {t('tech.analytics.predictions.description')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted/20 rounded-lg">
                          <BarChart3 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{t('tech.analytics.roiOptimized.title')}</p>
                          <p className="text-sm text-muted-foreground">
                            {t('tech.analytics.roiOptimized.description')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}