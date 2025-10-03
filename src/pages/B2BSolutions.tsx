import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building, 
  Play, 
  Pause,
  Users,
  TrendingUp,
  ArrowRight,
  Globe,
  Shield,
  Zap
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import b2bMeetingImage from "@/assets/b2b-executive-meeting-4k.jpg";

const b2bSolutions = [
  {
    title: "Enterprise Supplement Programs",
    description: "Comprehensive wellness programs for corporate health initiatives",
    features: [
      "Custom formulation development",
      "Bulk manufacturing capabilities", 
      "White-label packaging options",
      "Regulatory compliance support",
      "Employee wellness analytics"
    ],
    industries: ["Healthcare", "Technology", "Finance", "Manufacturing"],
    icon: Building
  },
  {
    title: "Private Label Manufacturing",
    description: "End-to-end private label solutions for health brands",
    features: [
      "Product development consulting",
      "FDA-compliant manufacturing",
      "Custom packaging design",
      "Quality assurance testing",
      "Supply chain management"
    ],
    industries: ["Retail", "E-commerce", "Wellness Brands", "Distributors"],
    icon: Shield
  },
  {
    title: "Distribution Partnerships",
    description: "Global distribution network for supplement businesses",
    features: [
      "International market access",
      "Logistics optimization",
      "Regulatory compliance",
      "Market intelligence",
      "Local partnership facilitation"
    ],
    industries: ["Pharmaceutical", "Nutraceutical", "Export/Import", "Wholesale"],
    icon: Globe
  }
];

const enterpriseMetrics = [
  { value: "500+", label: "Enterprise Clients", icon: Building },
  { value: "50M+", label: "Products Manufactured", icon: TrendingUp },
  { value: "95%", label: "Client Satisfaction", icon: Users },
  { value: "185", label: "Countries Served", icon: Globe }
];

const partnershipLevels = [
  {
    level: "Starter",
    price: "Custom Quote",
    features: [
      "Minimum order: 10,000 units",
      "Standard formulations",
      "Basic packaging options",
      "60-day fulfillment",
      "Email support"
    ]
  },
  {
    level: "Professional", 
    price: "Premium Pricing",
    features: [
      "Minimum order: 50,000 units",
      "Custom formulations",
      "Premium packaging",
      "30-day fulfillment", 
      "Dedicated account manager"
    ]
  },
  {
    level: "Enterprise",
    price: "Volume Discounts",
    features: [
      "Minimum order: 100,000+ units",
      "Exclusive formulations",
      "Luxury packaging options",
      "15-day fulfillment",
      "Strategic partnership support"
    ]
  }
];

export default function B2BSolutions() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-800/90"
            style={{
              backgroundImage: `url(${b2bMeetingImage})`,
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
                <source src="/videos/b2b-solutions-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-indigo-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Building className="h-5 w-5" />
                  Enterprise Solutions
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  B2B
                  <span className="block bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                    Solutions
                  </span>
                </h1>
                
                <p className="text-2xl text-blue-100 leading-relaxed">
                  Comprehensive enterprise-grade supplement solutions designed to power your business growth with scalable manufacturing, distribution, and partnership opportunities.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">500+</div>
                    <div className="text-sm text-blue-200">Partners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">185</div>
                    <div className="text-sm text-blue-200">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">50M+</div>
                    <div className="text-sm text-blue-200">Products</div>
                  </div>
                </div>

                <div className="flex justify-center -mt-8">
                  <Button 
                    size="lg" 
                    className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-8 py-4"
                    onClick={() => window.location.href = 'mailto:contact@globalsupplements.site?subject=Partnership Inquiry&body=Hello, I am interested in learning more about partnership opportunities with Global Supplements.'}
                  >
                    Partnership Inquiry <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Enterprise Metrics */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {enterpriseMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-2xl p-6 mb-4 inline-block">
                    <metric.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* B2B Solutions Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Enterprise Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Scalable business solutions designed to meet the unique needs of enterprise clients
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {b2bSolutions.map((solution, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-indigo-50 pb-4">
                    <div className="bg-blue-100 rounded-2xl p-4 w-fit mb-4">
                      <solution.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                      {solution.title}
                    </CardTitle>
                    <p className="text-gray-600">{solution.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                        <ul className="space-y-2">
                          {solution.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Zap className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">Target Industries:</h4>
                        <div className="flex flex-wrap gap-2">
                          {solution.industries.map((industry, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {industry}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Request Quote
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Levels */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Partnership Levels
              </h2>
              <p className="text-xl text-gray-600">
                Choose the partnership level that best fits your business needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnershipLevels.map((level, index) => (
                <Card key={index} className={`overflow-hidden transition-all duration-300 hover:shadow-2xl ${index === 1 ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                  <CardHeader className={`text-center pb-4 ${index === 1 ? 'bg-gradient-to-br from-blue-50 to-indigo-50' : 'bg-gray-50'}`}>
                    {index === 1 && (
                      <Badge className="absolute top-4 right-4 bg-blue-600 text-white">
                        Most Popular
                      </Badge>
                    )}
                    <CardTitle className="text-2xl mb-2">{level.level}</CardTitle>
                    <div className="text-3xl font-bold text-blue-600">{level.price}</div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <ul className="space-y-3">
                      {level.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full mt-6 ${index === 1 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}>
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Partner With Industry Leaders
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of successful businesses leveraging our enterprise solutions for growth
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-12 py-4">
                Start Partnership <Building className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white/10 text-xl px-12 py-4">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}