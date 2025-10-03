import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Globe, 
  BarChart3,
  Eye,
  Zap,
  Gem,
  Radar,
  Search,
  ArrowUpRight,
  DollarSign,
  Users,
  Map,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import B2BBuyerSourcesGuide from "@/components/premium/B2BBuyerSourcesGuide";

interface MarketInsight {
  id: string;
  market: string;
  product: string;
  opportunity: string;
  confidence: number;
  potential: string;
  timeframe: string;
  risk: "low" | "medium" | "high";
  trend: "rising" | "stable" | "declining";
}

interface PredictionData {
  category: string;
  currentPrice: number;
  predictedPrice: number;
  change: number;
  confidence: number;
  timeframe: string;
}

export default function MarketIntelligence() {
  const { t } = useTranslation();
  const [selectedRegion, setSelectedRegion] = useState("global");

  const marketInsights: MarketInsight[] = [
    {
      id: "1",
      market: "🇺🇸 USA - West Coast", 
      product: "Immune Support Gummies",
      opportunity: "Seasonal demand surge expected (flu season approaching)",
      confidence: 94,
      potential: "$2.4M",
      timeframe: "Next 30 days",
      risk: "low",
      trend: "rising"
    },
    {
      id: "2",
      market: "🇩🇪 Germany - Bavaria",
      product: "Organic Protein Powder", 
      opportunity: "Supply shortage creating 340% price advantage",
      confidence: 87,
      potential: "$1.8M",
      timeframe: "Next 14 days",
      risk: "medium", 
      trend: "rising"
    },
    {
      id: "3",
      market: "🇯🇵 Japan - Tokyo Metro",
      product: "Collagen Beauty Supplements",
      opportunity: "New celebrity endorsement driving 580% demand increase",
      confidence: 96,
      potential: "$3.7M",
      timeframe: "Next 7 days",
      risk: "low",
      trend: "rising"
    },
    {
      id: "4",
      market: "🇦🇺 Australia - Sydney",
      product: "Plant-Based Omega-3",
      opportunity: "Regulatory approval opening premium segment",
      confidence: 82,
      potential: "$1.2M", 
      timeframe: "Next 45 days",
      risk: "medium",
      trend: "rising"
    }
  ];

  const predictions: PredictionData[] = [
    {
      category: "Vitamin D3",
      currentPrice: 24.99,
      predictedPrice: 32.47,
      change: 29.9,
      confidence: 91,
      timeframe: "14 days"
    },
    {
      category: "Probiotics", 
      currentPrice: 45.99,
      predictedPrice: 39.23,
      change: -14.7,
      confidence: 86,
      timeframe: "21 days"
    },
    {
      category: "Collagen",
      currentPrice: 67.99,
      predictedPrice: 89.45,
      change: 31.6,
      confidence: 93,
      timeframe: "7 days"
    },
    {
      category: "Magnesium",
      currentPrice: 19.99,
      predictedPrice: 27.89,
      change: 39.5,
      confidence: 88,
      timeframe: "30 days"
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low": return "text-success";
      case "medium": return "text-warning";
      case "high": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "rising": return <TrendingUp className="h-4 w-4 text-success" />;
      case "declining": return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      default: return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 py-40 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent"></div>
          <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-radial from-secondary/10 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-8 py-3">
              <Brain className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-sm font-medium">{t('marketIntelligence.badge')}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.3] mb-6 pb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t('marketIntelligence.title')}
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-muted-foreground">
              {t('marketIntelligence.subtitle')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">94%</div>
                <div className="text-sm text-muted-foreground">{t('marketIntelligence.stats.accuracy')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">$47M+</div>
                <div className="text-sm text-muted-foreground">{t('marketIntelligence.stats.opportunities')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">185</div>
                <div className="text-sm text-muted-foreground">{t('marketIntelligence.stats.markets')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">0.3s</div>
                <div className="text-sm text-muted-foreground">{t('marketIntelligence.stats.speed')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* AI Intelligence Dashboard */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('marketIntelligence.dashboard.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('marketIntelligence.dashboard.description')}
            </p>
          </div>

          <Tabs defaultValue="insights" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
              <TabsTrigger value="insights">{t('marketIntelligence.tabs.insights')}</TabsTrigger>
              <TabsTrigger value="predictions">{t('marketIntelligence.tabs.predictions')}</TabsTrigger>
              <TabsTrigger value="trends">{t('marketIntelligence.tabs.trends')}</TabsTrigger>
              <TabsTrigger value="analytics">{t('marketIntelligence.tabs.analytics')}</TabsTrigger>
              <TabsTrigger value="buyers">Buyer Sources</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-6">
              <div className="grid gap-6">
                {marketInsights.map((insight) => (
                  <Card key={insight.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-4">
                            <h4 className="font-bold text-lg">{insight.market}</h4>
                            {getTrendIcon(insight.trend)}
                            <Badge variant="outline" className="text-xs">
                              {insight.product}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground">{insight.opportunity}</p>
                          
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4 text-primary" />
                              <span className="text-sm">Confidence: {insight.confidence}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Target className={`h-4 w-4 ${getRiskColor(insight.risk)}`} />
                              <span className="text-sm capitalize">Risk: {insight.risk}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{insight.timeframe}</span>
                            </div>
                          </div>
                          
                          <Progress value={insight.confidence} className="h-2 max-w-xs" />
                        </div>
                        
                        <div className="text-right">
                          <div className="text-3xl font-bold text-success">{insight.potential}</div>
                          <div className="text-sm text-muted-foreground">Revenue Potential</div>
                          
                          <Button className="mt-4" size="sm">
                            Execute Opportunity
                            <ArrowUpRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {predictions.map((prediction, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/20">
                      <CardTitle className="flex items-center gap-2">
                        <Gem className="h-5 w-5 text-primary" />
                        {prediction.category} Price Prediction
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-lg font-bold">${prediction.currentPrice}</div>
                          <div className="text-xs text-muted-foreground">Current Price</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-primary">${prediction.predictedPrice}</div>
                          <div className="text-xs text-muted-foreground">Predicted Price</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className={`text-2xl font-bold ${prediction.change > 0 ? 'text-success' : 'text-destructive'}`}>
                          {prediction.change > 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                        </div>
                        <Badge variant="secondary">
                          {prediction.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        Expected in {prediction.timeframe}
                      </div>
                      
                      <Progress value={prediction.confidence} className="h-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <div className="grid gap-8 md:grid-cols-3">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <TrendingUp className="h-12 w-12 text-success mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Rising Categories</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Immunity Boosters</span>
                        <span className="text-success">+47%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Plant Proteins</span>
                        <span className="text-success">+34%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sleep Support</span>
                        <span className="text-success">+28%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <Map className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Hot Markets</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>🇯🇵 Japan</span>
                        <span className="text-primary">$12.4M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🇩🇪 Germany</span>
                        <span className="text-primary">$8.7M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>🇦🇺 Australia</span>
                        <span className="text-primary">$6.2M</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <AlertTriangle className="h-12 w-12 text-warning mx-auto mb-4" />
                    <h4 className="font-semibold mb-2">Market Alerts</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success" />
                        <span>FDA Approval: Nootropics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-3 w-3 text-warning" />
                        <span>Supply Shortage: Vitamin C</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span>Demand Surge: Adaptogens</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      AI Model Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Price Prediction Accuracy</span>
                        <span>94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Trend Detection Rate</span>
                        <span>91.8%</span>
                      </div>
                      <Progress value={91.8} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Opportunity Identification</span>
                        <span>96.5%</span>
                      </div>
                      <Progress value={96.5} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Radar className="h-5 w-5" />
                      Real-Time Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">847</div>
                        <div className="text-xs text-muted-foreground">Data Sources</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-success">2.4M</div>
                        <div className="text-xs text-muted-foreground">Daily Analyses</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-4xl font-bold text-secondary">0.3s</div>
                      <div className="text-sm text-muted-foreground">Average Processing Time</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="buyers" className="space-y-6">
              <B2BBuyerSourcesGuide />
            </TabsContent>
          </Tabs>
        </section>

        {/* AI Technology Stack */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('marketIntelligence.technology.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('marketIntelligence.technology.subtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center">
              <CardContent className="p-6">
                <Brain className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Neural Networks</h4>
                <p className="text-sm text-muted-foreground">Deep learning models for pattern recognition</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-warning mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Real-Time Processing</h4>
                <p className="text-sm text-muted-foreground">Instant analysis of market data streams</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Gem className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Predictive Models</h4>
                <p className="text-sm text-muted-foreground">Advanced forecasting algorithms</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-success mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Global Data Mesh</h4>
                <p className="text-sm text-muted-foreground">Distributed data collection network</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t('marketIntelligence.cta.title')}
            </h2>
            
            <p className="text-xl text-muted-foreground">
              {t('marketIntelligence.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-4">
                <Brain className="h-5 w-5 mr-2" />
                {t('marketIntelligence.cta.primaryButton')}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                <Search className="h-5 w-5 mr-2" />
                {t('marketIntelligence.cta.secondaryButton')}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span>94% Accuracy Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-warning" />
                <span>$47M+ Daily Opportunities</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}