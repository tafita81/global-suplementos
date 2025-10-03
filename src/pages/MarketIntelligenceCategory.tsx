import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3, 
  Play, 
  Pause,
  TrendingUp,
  Target,
  ArrowRight,
  Globe,
  Brain,
  Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import globalNetworkImage from "@/assets/global-network-4k.jpg";

const intelligenceServices = [
  {
    service: "Market Trend Analysis",
    description: "Real-time analysis of supplement market trends and consumer behavior",
    features: [
      "Predictive trend modeling",
      "Consumer sentiment analysis",
      "Competitive landscape mapping",
      "Emerging market opportunities"
    ],
    dataPoints: "50M+ data points analyzed daily",
    accuracy: "94%",
    icon: TrendingUp
  },
  {
    service: "Competitive Intelligence",
    description: "Comprehensive competitor analysis and market positioning insights",
    features: [
      "Product portfolio analysis",
      "Pricing strategy insights",
      "Market share tracking",
      "Launch strategy analysis"
    ],
    dataPoints: "10K+ competitors monitored",
    accuracy: "96%",
    icon: Target
  },
  {
    service: "Consumer Insights Platform",
    description: "Deep consumer behavior analytics and purchasing pattern analysis",
    features: [
      "Purchase behavior modeling",
      "Demographic segmentation",
      "Brand preference analysis",
      "Loyalty pattern recognition"
    ],
    dataPoints: "100M+ consumer interactions",
    accuracy: "92%",
    icon: Brain
  }
];

const marketMetrics = [
  { value: "$180B", label: "Global Market Size", icon: Globe },
  { value: "15.4%", label: "Annual Growth Rate", icon: TrendingUp },
  { value: "50M+", label: "Data Points/Day", icon: BarChart3 },
  { value: "185", label: "Countries Covered", icon: Target }
];

const aiCapabilities = [
  {
    capability: "Predictive Analytics",
    description: "AI-powered forecasting for market trends and consumer demand",
    applications: ["Demand forecasting", "Price optimization", "Inventory planning", "Market timing"]
  },
  {
    capability: "Natural Language Processing",
    description: "Advanced text analysis for social media and review sentiment",
    applications: ["Sentiment analysis", "Trend detection", "Brand monitoring", "Consumer feedback"]
  },
  {
    capability: "Machine Learning Models",
    description: "Sophisticated algorithms for pattern recognition and insights",
    applications: ["Consumer clustering", "Behavior prediction", "Risk assessment", "Opportunity scoring"]
  }
];

const reportTypes = [
  {
    type: "Market Opportunity Reports",
    frequency: "Monthly",
    features: ["Emerging trends", "Growth opportunities", "Market gaps", "Revenue projections"]
  },
  {
    type: "Competitive Intelligence Briefs",
    frequency: "Weekly", 
    features: ["Competitor moves", "Product launches", "Pricing changes", "Market share shifts"]
  },
  {
    type: "Consumer Behavior Analysis",
    frequency: "Quarterly",
    features: ["Purchase patterns", "Demographic insights", "Brand preferences", "Loyalty metrics"]
  }
];

export default function MarketIntelligenceCategory() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-cyan-900/90 to-blue-800/90"
            style={{
              backgroundImage: `url(${globalNetworkImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          >
            {isVideoPlaying && (
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/market-intelligence-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/60 to-blue-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <BarChart3 className="h-5 w-5" />
                  AI-Powered Analytics
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Market
                  <span className="block bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Intelligence
                  </span>
                </h1>
                
                <p className="text-2xl text-cyan-100 leading-relaxed">
                  Advanced AI-driven market intelligence platform providing real-time insights, predictive analytics, and competitive intelligence for the global supplement industry.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">50M+</div>
                    <div className="text-sm text-cyan-200">Data Points/Day</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">94%</div>
                    <div className="text-sm text-cyan-200">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">185</div>
                    <div className="text-sm text-cyan-200">Countries</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50 text-xl px-8 py-4">
                    Intelligence Platform <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-xl px-8 py-4">
                    Request Demo
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="absolute inset-0 flex items-center justify-center group bg-black/20 hover:bg-black/30 transition-colors z-10"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 group-hover:scale-110 transition-transform">
                      {isVideoPlaying ? (
                        <Pause className="h-12 w-12 text-white" />
                      ) : (
                        <Play className="h-12 w-12 text-white ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Metrics */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {marketMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="bg-cyan-100 rounded-2xl p-6 mb-4 inline-block">
                    <metric.icon className="h-8 w-8 text-cyan-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Intelligence Services */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Intelligence Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive market intelligence solutions powered by advanced AI and machine learning
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {intelligenceServices.map((service, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-cyan-50 to-blue-50 pb-4">
                    <div className="bg-cyan-100 rounded-2xl p-4 w-fit mb-4">
                      <service.icon className="h-8 w-8 text-cyan-600" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-cyan-600 transition-colors">
                      {service.service}
                    </CardTitle>
                    <p className="text-gray-600">{service.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Zap className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-500">Accuracy</div>
                          <div className="text-xl font-bold text-cyan-600">{service.accuracy}</div>
                        </div>
                        <Button className="bg-cyan-600 hover:bg-cyan-700">
                          Learn More
                        </Button>
                      </div>
                      
                      <div className="text-sm text-gray-500 pt-2">
                        {service.dataPoints}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Capabilities */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                AI-Powered Capabilities
              </h2>
              <p className="text-xl text-gray-600">
                Advanced artificial intelligence technologies driving market insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {aiCapabilities.map((ai, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-white pb-4">
                    <CardTitle className="text-xl mb-2">{ai.capability}</CardTitle>
                    <p className="text-gray-600">{ai.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Applications:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {ai.applications.map((app, i) => (
                          <Badge key={i} variant="outline" className="text-xs justify-center">
                            {app}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Report Types */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Intelligence Reports
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive reporting suite delivering actionable market insights
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {reportTypes.map((report, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-cyan-50 pb-4">
                    <Badge className="bg-cyan-100 text-cyan-700 w-fit mb-2">
                      {report.frequency}
                    </Badge>
                    <CardTitle className="text-xl">{report.type}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-2">
                      {report.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <BarChart3 className="h-4 w-4 text-cyan-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full mt-4">
                      Sample Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Transform Your Market Strategy
            </h2>
            <p className="text-xl mb-8 text-cyan-100">
              Leverage AI-powered market intelligence to make data-driven decisions and stay ahead of the competition
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-cyan-50 text-xl px-12 py-4">
                Start Free Trial <BarChart3 className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-xl px-12 py-4">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}