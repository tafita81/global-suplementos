import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Globe, 
  TrendingUp, 
  Star, 
  Award, 
  Building, 
  Users, 
  DollarSign,
  Zap,
  Shield,
  Crown
} from "lucide-react";

interface Partnership {
  name: string;
  logo: string;
  type: string;
  volume: string;
  revenue: string;
  growth: string;
  description: string;
  status: string;
}

interface Testimonial {
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
  metric: string;
}

export default function GlobalPartnerships() {
  const partnerships: Partnership[] = [
    {
      name: "Amazon Global",
      logo: "🟠",
      type: "Strategic Alliance",
      volume: "$847M",
      revenue: "+340%",
      growth: "92%",
      description: "Exclusive supplier network integration with Amazon's global fulfillment centers across 185+ countries.",
      status: "platinum"
    },
    {
      name: "Alibaba Group",
      logo: "🟡", 
      type: "Premium Partner",
      volume: "$623M",
      revenue: "+289%",
      growth: "87%",
      description: "Direct access to Asia-Pacific manufacturers with automated quality control and logistics optimization.",
      status: "diamond"
    },
    {
      name: "AliExpress Enterprise",
      logo: "🔴",
      type: "Elite Distributor",
      volume: "$456M",
      revenue: "+195%", 
      growth: "78%",
      description: "B2B marketplace integration enabling real-time arbitrage opportunities across emerging markets.",
      status: "gold"
    },
    {
      name: "Walmart International",
      logo: "🔵",
      type: "Global Supplier",
      volume: "$1.2B",
      revenue: "+425%",
      growth: "156%", 
      description: "Private label manufacturing and distribution partnership across 27 countries with automated compliance.",
      status: "platinum"
    },
    {
      name: "Costco Wholesale",
      logo: "🟣",
      type: "Premium Vendor",
      volume: "$389M", 
      revenue: "+267%",
      growth: "94%",
      description: "Bulk distribution network with exclusive access to premium supplement categories and member pricing.",
      status: "diamond"
    },
    {
      name: "iHerb Global",
      logo: "🟢",
      type: "Strategic Partner", 
      volume: "$567M",
      revenue: "+312%",
      growth: "145%",
      description: "Health & wellness marketplace integration with AI-powered demand forecasting and inventory optimization.",
      status: "platinum"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Isabella Rodriguez",
      title: "International Trade Manager", 
      company: "LatAm Supplements Corp",
      avatar: "IR",
      quote: "The real-time arbitrage system allowed us to expand to 12 new countries. Complete automation frees our team for strategy. Fantastic!",
      metric: "$1.8M profit increase"
    },
    {
      name: "James Wilson", 
      title: "Chief Supply Officer",
      company: "Pacific Nutrition Ltd",
      avatar: "JW", 
      quote: "Zero Investment Engine is revolutionary. We managed to operate without our own capital and still achieve 30%+ margins. Premium 24/7 support is exceptional.",
      metric: "$4.2M revenue generated"
    },
    {
      name: "Liu Wei",
      title: "Strategic Partnerships Director",
      company: "Asia Health Network", 
      avatar: "LW",
      quote: "The integration with Asian suppliers is perfect. Automatic compliance for all markets saved us millions in consulting. Incalculable ROI.",
      metric: "$3.1M compliance savings"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "platinum": return "bg-gradient-to-r from-slate-400 to-slate-600 text-white";
      case "diamond": return "bg-gradient-to-r from-cyan-400 to-blue-600 text-white";
      case "gold": return "bg-gradient-to-r from-yellow-400 to-orange-600 text-white";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-primary/90 to-secondary text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2">
              <Crown className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-medium">Exclusive Global Network</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-white to-yellow-200 bg-clip-text text-transparent">
              Strategic Partnerships
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
              Partnered with the world's largest marketplaces and distributors, 
              processing over <span className="font-bold text-yellow-300">$4.2 billion</span> in 
              annual volume across <span className="font-bold text-yellow-300">185+ countries</span>
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">$4.2B+</div>
                <div className="text-sm text-white/80">Annual Volume</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">185+</div>
                <div className="text-sm text-white/80">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">99.7%</div>
                <div className="text-sm text-white/80">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Partnership Grid */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Elite Partnership Network</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Direct integrations with the world's largest platforms, enabling seamless global distribution 
              and real-time opportunity detection across premium supplement categories
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnerships.map((partnership, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent"></div>
                
                <CardHeader className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{partnership.logo}</div>
                      <div>
                        <CardTitle className="text-lg">{partnership.name}</CardTitle>
                        <Badge className={getStatusColor(partnership.status)}>
                          {partnership.type}
                        </Badge>
                      </div>
                    </div>
                    <Award className="h-6 w-6 text-yellow-500" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{partnership.description}</p>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="font-bold text-lg text-primary">{partnership.volume}</div>
                      <div className="text-xs text-muted-foreground">Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-success">{partnership.revenue}</div>
                      <div className="text-xs text-muted-foreground">Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg text-secondary">{partnership.growth}</div>
                      <div className="text-xs text-muted-foreground">Growth</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Real results from our global partnership network
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      <p className="text-xs text-primary font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <blockquote className="text-muted-foreground mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="flex items-center gap-2 text-success">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">{testimonial.metric}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Access Our Global Network?
            </h2>
            
            <p className="text-xl text-white/90">
              Join elite partners already generating millions through our platform. 
              Get instant access to 185+ countries and $4.2B+ in annual opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Shield className="h-5 w-5 mr-2" />
                Request Partnership Access
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Zap className="h-5 w-5 mr-2" />
                View Live Demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-300" />
                <span>99.7% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>5000+ Active Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-300" />
                <span>$890M+ Generated</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}