import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  Zap, 
  Globe, 
  TrendingUp, 
  Shield, 
  Bot,
  Crown,
  Diamond,
  Rocket,
  Target,
  Users,
  Settings,
  ChevronRight,
  CheckCircle,
  ArrowUpRight
} from "lucide-react";

interface Solution {
  id: string;
  name: string;
  category: string;
  tier: "enterprise" | "premium" | "platinum";
  description: string;
  features: string[];
  benefits: string[];
  roi: string;
  implementation: string;
  clients: number;
}

interface CaseStudy {
  company: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  logo: string;
}

export default function EnterpriseSolutions() {
  const solutions: Solution[] = [
    {
      id: "1",
      name: "AI-Powered Procurement Engine",
      category: "Supply Chain Automation",
      tier: "enterprise",
      description: "Revolutionary AI system that automatically identifies, negotiates, and secures the best supplier deals in real-time across global markets.",
      features: [
        "Real-time supplier discovery",
        "Automated price negotiation",
        "Risk assessment algorithms", 
        "Compliance monitoring",
        "Multi-currency processing"
      ],
      benefits: [
        "87% cost reduction",
        "95% faster procurement",
        "Zero human error",
        "24/7 operations"
      ],
      roi: "340%",
      implementation: "14 days",
      clients: 2847
    },
    {
      id: "2",
      name: "Quantum Distribution Network",
      category: "Logistics & Fulfillment",
      tier: "platinum", 
      description: "Advanced distribution system leveraging quantum computing principles to optimize global shipping routes and inventory management.",
      features: [
        "Quantum route optimization",
        "Predictive inventory",
        "Multi-modal shipping",
        "Real-time tracking",
        "Automated customs"
      ],
      benefits: [
        "78% shipping cost reduction",
        "99.8% delivery accuracy",
        "50% faster fulfillment",
        "Global coverage"
      ],
      roi: "289%",
      implementation: "21 days", 
      clients: 1923
    },
    {
      id: "3",
      name: "Enterprise Compliance Suite",
      category: "Regulatory Management",
      tier: "premium",
      description: "Comprehensive compliance management system ensuring adherence to regulations across 185+ countries with automatic updates.",
      features: [
        "Global regulation database",
        "Automatic compliance checks",
        "Document generation",
        "Audit trail management",
        "Real-time alerts"
      ],
      benefits: [
        "100% compliance rate",
        "90% documentation time saved", 
        "Zero regulatory fines",
        "Instant market access"
      ],
      roi: "245%",
      implementation: "7 days",
      clients: 4156
    },
    {
      id: "4", 
      name: "Market Intelligence Platform",
      category: "Data Analytics",
      tier: "enterprise",
      description: "Advanced analytics platform providing real-time market insights, trend predictions, and opportunity identification using big data and AI.",
      features: [
        "Real-time market analysis",
        "Trend prediction algorithms",
        "Competitor monitoring",
        "Price optimization",
        "Demand forecasting"
      ],
      benefits: [
        "95% accurate predictions",
        "67% revenue increase",
        "Competitive advantage",
        "Data-driven decisions"
      ],
      roi: "456%", 
      implementation: "10 days",
      clients: 3241
    }
  ];

  const caseStudies: CaseStudy[] = [
    {
      company: "Fortune 500 Pharma Corp",
      industry: "Pharmaceutical",
      logo: "🏢",
      challenge: "Manual procurement processes causing 67% cost overruns and 3-month delays in product launches.",
      solution: "Implemented AI-Powered Procurement Engine with custom pharmaceutical compliance modules.",
      results: [
        "87% reduction in procurement costs",
        "95% faster supplier onboarding", 
        "Zero compliance violations",
        "$24M annual savings"
      ]
    },
    {
      company: "Global Retail Giant",
      industry: "Consumer Goods",
      logo: "🛒", 
      challenge: "Inefficient distribution network resulting in 23% shipping cost overruns and customer satisfaction issues.",
      solution: "Deployed Quantum Distribution Network with AI-powered route optimization across 47 countries.",
      results: [
        "78% shipping cost reduction",
        "99.8% delivery accuracy",
        "50% faster fulfillment",
        "$156M cost savings"
      ]
    },
    {
      company: "European Health Network",
      industry: "Healthcare Distribution",
      logo: "🏥",
      challenge: "Complex regulatory compliance across 27 EU countries causing delays and $2.3M in fines annually.", 
      solution: "Integrated Enterprise Compliance Suite with real-time regulatory monitoring and automatic updates.",
      results: [
        "100% compliance rate achieved",
        "Zero regulatory fines",
        "90% documentation time saved",
        "Instant market access"
      ]
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "enterprise": return "bg-gradient-to-r from-purple-600 to-blue-600 text-white";
      case "platinum": return "bg-gradient-to-r from-slate-400 to-slate-600 text-white"; 
      case "premium": return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white";
      default: return "bg-secondary";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "enterprise": return <Crown className="h-4 w-4" />;
      case "platinum": return <Diamond className="h-4 w-4" />;
      case "premium": return <Rocket className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-radial from-blue-400/20 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-56 h-56 bg-gradient-radial from-purple-400/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3">
              <Building2 className="h-5 w-5 text-blue-300" />
              <span className="text-sm font-medium">Enterprise-Grade Solutions</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
              Transform Your Business
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
              Revolutionary enterprise solutions powering <span className="font-bold text-blue-300">12,000+ businesses</span> 
              across <span className="font-bold text-blue-300">185 countries</span>, generating over 
              <span className="font-bold text-blue-300"> $4.2 billion</span> in annual value
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300">12,000+</div>
                <div className="text-sm text-white/80">Enterprise Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300">$4.2B+</div>
                <div className="text-sm text-white/80">Annual Value</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300">99.9%</div>
                <div className="text-sm text-white/80">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300">340%</div>
                <div className="text-sm text-white/80">Avg. ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Solutions Overview */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Solution Suite</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive business transformation tools designed for enterprise scale, 
              delivering measurable ROI and competitive advantage
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {solutions.map((solution) => (
              <Card key={solution.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <CardHeader className="bg-gradient-to-r from-muted/50 to-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getTierColor(solution.tier)}>
                      {getTierIcon(solution.tier)}
                      <span className="ml-1 capitalize">{solution.tier}</span>
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-success">+{solution.roi}</div>
                      <div className="text-xs text-muted-foreground">Average ROI</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{solution.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">{solution.category}</p>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-bold text-primary">{solution.implementation}</div>
                      <div className="text-xs text-muted-foreground">Implementation</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-secondary">{solution.clients.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Active Clients</div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-3">Key Features</h5>
                    <div className="space-y-2">
                      {solution.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {solution.features.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{solution.features.length - 3} more features
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-sm mb-3">Key Benefits</h5>
                    <div className="flex flex-wrap gap-1">
                      {solution.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4 group-hover:bg-primary/90">
                    Schedule Demo
                    <ArrowUpRight className="h-4 w-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Stories */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Real transformation results from Fortune 500 companies
            </p>
          </div>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{study.logo}</div>
                        <div>
                          <h4 className="font-bold text-lg">{study.company}</h4>
                          <p className="text-muted-foreground">{study.industry}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h5 className="font-semibold text-destructive mb-2">Challenge</h5>
                        <p className="text-sm text-muted-foreground">{study.challenge}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-primary mb-2">Solution</h5>
                        <p className="text-sm text-muted-foreground">{study.solution}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-success mb-2">Results</h5>
                        <div className="grid grid-cols-2 gap-2">
                          {study.results.map((result, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <TrendingUp className="h-4 w-4 text-success flex-shrink-0" />
                              <span>{result}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Implementation Process */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Seamless Implementation</h2>
            <p className="text-xl text-muted-foreground">
              Our proven methodology ensures rapid deployment and immediate value realization
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Analysis & Planning",
                description: "Comprehensive assessment of current systems and customized implementation roadmap",
                duration: "3-5 days"
              },
              {
                step: "2", 
                title: "System Integration",
                description: "Seamless integration with existing infrastructure using our proprietary connectors",
                duration: "5-10 days"
              },
              {
                step: "3",
                title: "Testing & Training", 
                description: "Rigorous testing protocols and comprehensive team training for optimal adoption",
                duration: "3-7 days"
              },
              {
                step: "4",
                title: "Go-Live & Support",
                description: "Smooth transition to production with 24/7 dedicated support and monitoring",
                duration: "Ongoing"
              }
            ].map((phase, index) => (
              <Card key={index} className="text-center relative">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {phase.step}
                  </div>
                  <h4 className="font-semibold mb-2">{phase.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{phase.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {phase.duration}
                  </Badge>
                </CardContent>
                {index < 3 && (
                  <ChevronRight className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground" />
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 text-white rounded-3xl p-12">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Enterprise?
            </h2>
            
            <p className="text-xl text-white/90">
              Join 12,000+ enterprises already benefiting from our solutions. 
              Schedule a personalized demo and see how we can accelerate your business growth.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                <Target className="h-5 w-5 mr-2" />
                Schedule Enterprise Demo
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Users className="h-5 w-5 mr-2" />
                Contact Solutions Team
              </Button>
            </div>

            <div className="flex items-center justify-center gap-8 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-300" />
                <span>Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-300" />
                <span>Rapid Implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-green-300" />
                <span>Global Support</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}