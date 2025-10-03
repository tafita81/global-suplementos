import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Sparkles, 
  Award, 
  Globe, 
  TrendingUp, 
  Star, 
  Shield, 
  Crown,
  Diamond,
  Heart,
  Brain,
  Dumbbell,
  Leaf,
  ChevronRight,
  PlayCircle
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  tier: "premium" | "platinum" | "diamond";
  price: string;
  margin: string;
  demand: number;
  markets: string[];
  certifications: string[];
  description: string;
  benefits: string[];
  image: string;
}

export default function PremiumPortfolio() {
  const products: Product[] = [
    {
      id: "1",
      name: "Omega-3 Premium 1000mg",
      category: "Heart Health",
      tier: "premium",
      price: "$29.99",
      margin: "67%",
      demand: 96,
      markets: ["USA", "EU", "CA", "AU"],
      certifications: ["FDA", "GMP", "NSF"],
      description: "High-purity omega-3 fish oil with EPA and DHA for cardiovascular health and brain function support.",
      benefits: ["Heart Health", "Brain Function", "Joint Support", "Eye Health"],
      image: "🐟"
    },
    {
      id: "2", 
      name: "Whey Protein Isolate",
      category: "Sports Nutrition",
      tier: "premium",
      price: "$49.99", 
      margin: "72%",
      demand: 94,
      markets: ["USA", "EU", "BR", "AU"],
      certifications: ["FDA", "GMP", "NSF"],
      description: "Pure whey protein isolate with 25g protein per serving, fast absorption for muscle building and recovery.",
      benefits: ["Muscle Building", "Recovery", "Lean Mass", "Strength"],
      image: "💪"
    },
    {
      id: "3",
      name: "Vitamin D3 5000IU",
      category: "Immune Support", 
      tier: "premium",
      price: "$19.99",
      margin: "54%",
      demand: 98,
      markets: ["Global"],
      certifications: ["FDA", "GMP", "Organic"],
      description: "High-potency vitamin D3 for immune system support, bone health, and calcium absorption.",
      benefits: ["Immune Support", "Bone Health", "Mood Support", "Calcium Absorption"],
      image: "☀️"
    },
    {
      id: "4",
      name: "Creatine Monohydrate",
      category: "Sports Nutrition",
      tier: "premium", 
      price: "$24.99",
      margin: "78%",
      demand: 92,
      markets: ["USA", "EU", "BR", "AU"],
      certifications: ["FDA", "GMP", "NSF"],
      description: "Pure creatine monohydrate for enhanced strength, power output, and muscle endurance during training.",
      benefits: ["Strength", "Power", "Endurance", "Muscle Volume"],
      image: "⚡"
    },
    {
      id: "5",
      name: "Turmeric Curcumin Complex",
      category: "Anti-Inflammatory",
      tier: "platinum",
      price: "$34.99",
      margin: "68%", 
      demand: 89,
      markets: ["USA", "CA", "EU", "AU"],
      certifications: ["FDA", "GMP", "Organic"],
      description: "Standardized turmeric extract with black pepper for enhanced absorption and anti-inflammatory benefits.",
      benefits: ["Joint Health", "Anti-Inflammatory", "Antioxidant", "Digestive Health"],
      image: "🌿"
    },
    {
      id: "6",
      name: "Collagen Peptides Powder",
      category: "Beauty & Wellness",
      tier: "platinum",
      price: "$39.99",
      margin: "83%",
      demand: 87, 
      markets: ["USA", "EU", "JP", "AU"],
      certifications: ["FDA", "GMP", "Grass-Fed"],
      description: "Hydrolyzed collagen peptides for skin elasticity, joint health, and hair & nail strength.",
      benefits: ["Skin Health", "Joint Support", "Hair & Nails", "Bone Health"],
      image: "✨"
    },
    {
      id: "7",
      name: "Multivitamin Complete",
      category: "General Health",
      tier: "premium",
      price: "$27.99",
      margin: "65%",
      demand: 95,
      markets: ["Global"],
      certifications: ["FDA", "GMP", "Non-GMO"],
      description: "Comprehensive multivitamin and mineral formula with 25+ essential nutrients for daily health support.",
      benefits: ["Energy Support", "Immune Health", "Antioxidant", "Overall Wellness"],
      image: "🌈"
    },
    {
      id: "8",
      name: "Magnesium Glycinate",
      category: "Sleep & Recovery",
      tier: "premium",
      price: "$22.99",
      margin: "59%",
      demand: 88,
      markets: ["USA", "EU", "CA", "AU"],
      certifications: ["FDA", "GMP", "Non-GMO"],
      description: "Highly bioavailable magnesium glycinate for muscle relaxation, sleep quality, and stress management.",
      benefits: ["Sleep Quality", "Muscle Relaxation", "Stress Relief", "Heart Health"],
      image: "😴"
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "diamond": return "bg-gradient-to-r from-cyan-500 to-blue-600 text-white";
      case "platinum": return "bg-gradient-to-r from-slate-400 to-slate-600 text-white";
      case "premium": return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white";
      default: return "bg-secondary";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "diamond": return <Diamond className="h-4 w-4" />;
      case "platinum": return <Crown className="h-4 w-4" />;
      case "premium": return <Star className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Heart Health": return <Heart className="h-6 w-6" />;
      case "Sports Nutrition": return <Dumbbell className="h-6 w-6" />;
      case "Immune Support": return <Shield className="h-6 w-6" />;
      case "Anti-Inflammatory": return <Leaf className="h-6 w-6" />;
      case "Beauty & Wellness": return <Sparkles className="h-6 w-6" />;
      case "General Health": return <Star className="h-6 w-6" />;
      case "Sleep & Recovery": return <Brain className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-radial from-yellow-300/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3">
              <Diamond className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-medium">Premium Product Portfolio</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Premium Supplements
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
              Comprehensive collection of proven, market-leading supplements including 
              <span className="font-bold text-cyan-300"> Omega-3, Whey Protein, Creatine</span> and other 
              top-performing formulas with average margins of <span className="font-bold text-cyan-300">68%</span> across global markets
            </p>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Stats Overview */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Premium Products</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-success mb-2">78%</div>
                <div className="text-sm text-muted-foreground">Avg. Margin</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-secondary mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Quality Score</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-accent mb-2">180</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Product Showcase */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Market-Leading Product Collection</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Proven supplement formulas including popular categories like Omega-3, Whey Protein, Creatine, 
              and Vitamins - all backed by science and designed for maximum market performance
            </p>
          </div>

          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="diamond">Diamond</TabsTrigger>
              <TabsTrigger value="platinum">Platinum</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 p-8">
                      <div className="text-6xl text-center mb-4">{product.image}</div>
                      <Badge className={`${getTierColor(product.tier)} absolute top-4 right-4`}>
                        {getTierIcon(product.tier)}
                        <span className="ml-1 capitalize">{product.tier}</span>
                      </Badge>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        {getCategoryIcon(product.category)}
                        <span className="text-sm text-muted-foreground">{product.category}</span>
                      </div>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <p className="text-muted-foreground text-sm">{product.description}</p>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-2xl font-bold text-primary">{product.price}</div>
                          <div className="text-xs text-muted-foreground">Retail Price</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-success">{product.margin}</div>
                          <div className="text-xs text-muted-foreground">Profit Margin</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Market Demand</span>
                          <span>{product.demand}%</span>
                        </div>
                        <Progress value={product.demand} className="h-2" />
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Key Benefits</h5>
                        <div className="flex flex-wrap gap-1">
                          {product.benefits.map((benefit, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-sm mb-2">Certifications</h5>
                        <div className="flex flex-wrap gap-1">
                          {product.certifications.map((cert, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full mt-4 group-hover:bg-primary/90" onClick={() => window.location.href = '/product-patent-guide'}>
                        View Patent Guide
                        <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["diamond", "platinum", "premium"].map((tier) => (
              <TabsContent key={tier} value={tier} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {products.filter(p => p.tier === tier).map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                      <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 p-8">
                        <div className="text-6xl text-center mb-4">{product.image}</div>
                        <Badge className={`${getTierColor(product.tier)} absolute top-4 right-4`}>
                          {getTierIcon(product.tier)}
                          <span className="ml-1 capitalize">{product.tier}</span>
                        </Badge>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          {getCategoryIcon(product.category)}
                          <span className="text-sm text-muted-foreground">{product.category}</span>
                        </div>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <p className="text-muted-foreground text-sm">{product.description}</p>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-2xl font-bold text-primary">{product.price}</div>
                            <div className="text-xs text-muted-foreground">Retail Price</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-success">{product.margin}</div>
                            <div className="text-xs text-muted-foreground">Profit Margin</div>
                          </div>
                        </div>

                        <Button className="w-full group-hover:bg-primary/90" onClick={() => window.location.href = '/product-patent-guide'}>
                          View Patent Guide
                          <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Quality Assurance */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Uncompromising Quality Standards</h2>
            <p className="text-xl text-muted-foreground">
              Every product meets the highest global certification requirements
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center bg-background/50">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">FDA Approved</h4>
                <p className="text-sm text-muted-foreground">All facilities FDA registered and inspected</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/50">
              <CardContent className="p-6">
                <Award className="h-12 w-12 text-success mx-auto mb-4" />
                <h4 className="font-semibold mb-2">GMP Certified</h4>
                <p className="text-sm text-muted-foreground">Good Manufacturing Practices compliance</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/50">
              <CardContent className="p-6">
                <Star className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Third-Party Tested</h4>
                <p className="text-sm text-muted-foreground">Independent lab verification for purity</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-background/50">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-accent mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Global Compliance</h4>
                <p className="text-sm text-muted-foreground">Meets regulations in 180+ countries</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-secondary via-primary to-secondary text-white rounded-3xl p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Access Our Entire Premium Collection
            </h2>
            
            <p className="text-xl text-white/90">
              Partner with us to gain access to proven supplement formulas 
              including Omega-3, Whey Protein, Creatine and more with competitive margins and global distribution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Crown className="h-5 w-5 mr-2" />
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <TrendingUp className="h-5 w-5 mr-2" />
                View Profit Calculator
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}