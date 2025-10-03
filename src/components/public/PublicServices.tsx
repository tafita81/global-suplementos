import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Shield, 
  Users, 
  Globe,
  Truck,
  FileCheck,
  TrendingUp,
  Zap,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function PublicServices() {
  const { t } = useTranslation();
  
  const services = [
    {
      title: t('public.services.services.b2bTrading.title'),
      description: t('public.services.services.b2bTrading.description'),
      icon: Building2,
      features: [
        t('public.services.services.b2bTrading.features.0'),
        t('public.services.services.b2bTrading.features.1'),
        t('public.services.services.b2bTrading.features.2'),
        t('public.services.services.b2bTrading.features.3')
      ],
      benefits: t('public.services.services.b2bTrading.benefits'),
      color: "from-blue-500 to-cyan-500",
      category: t('public.services.services.b2bTrading.category')
    },
    {
      title: t('public.services.services.governmentContracts.title'),
      description: t('public.services.services.governmentContracts.description'),
      icon: Shield,
      features: [
        t('public.services.services.governmentContracts.features.0'),
        t('public.services.services.governmentContracts.features.1'),
        t('public.services.services.governmentContracts.features.2'),
        t('public.services.services.governmentContracts.features.3')
      ],
      benefits: t('public.services.services.governmentContracts.benefits'),
      color: "from-green-500 to-emerald-500",
      category: t('public.services.services.governmentContracts.category')
    },
    {
      title: t('public.services.services.privateLabel.title'),
      description: t('public.services.services.privateLabel.description'),
      icon: Users,
      features: [
        t('public.services.services.privateLabel.features.0'),
        t('public.services.services.privateLabel.features.1'),
        t('public.services.services.privateLabel.features.2'),
        t('public.services.services.privateLabel.features.3')
      ],
      benefits: t('public.services.services.privateLabel.benefits'),
      color: "from-purple-500 to-violet-500",
      category: t('public.services.services.privateLabel.category')
    },
    {
      title: t('public.services.services.globalLogistics.title'),
      description: t('public.services.services.globalLogistics.description'),
      icon: Truck,
      features: [
        t('public.services.services.globalLogistics.features.0'),
        t('public.services.services.globalLogistics.features.1'),
        t('public.services.services.globalLogistics.features.2'),
        t('public.services.services.globalLogistics.features.3')
      ],
      benefits: t('public.services.services.globalLogistics.benefits'),
      color: "from-orange-500 to-red-500",
      category: t('public.services.services.globalLogistics.category')
    },
    {
      title: t('public.services.services.compliance.title'),
      description: t('public.services.services.compliance.description'),
      icon: FileCheck,
      features: [
        t('public.services.services.compliance.features.0'),
        t('public.services.services.compliance.features.1'),
        t('public.services.services.compliance.features.2'),
        t('public.services.services.compliance.features.3')
      ],
      benefits: t('public.services.services.compliance.benefits'),
      color: "from-teal-500 to-blue-500",
      category: t('public.services.services.compliance.category')
    },
    {
      title: t('public.services.services.marketIntelligence.title'),
      description: t('public.services.services.marketIntelligence.description'),
      icon: TrendingUp,
      features: [
        t('public.services.services.marketIntelligence.features.0'),
        t('public.services.services.marketIntelligence.features.1'),
        t('public.services.services.marketIntelligence.features.2'),
        t('public.services.services.marketIntelligence.features.3')
      ],
      benefits: t('public.services.services.marketIntelligence.benefits'),
      color: "from-pink-500 to-rose-500",
      category: t('public.services.services.marketIntelligence.category')
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Zap className="h-3 w-3 mr-1" />
            {t('public.services.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('public.services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('public.services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits Badge */}
                  <div className="mb-4">
                    <Badge className={`bg-gradient-to-r ${service.color} text-white`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {service.benefits}
                    </Badge>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-300"
                    onClick={scrollToContact}
                  >
                    {t('public.services.learnMore')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('public.services.bottomCta.title')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('public.services.bottomCta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8"
            >
              <Globe className="h-5 w-5 mr-2" />
              {t('public.services.startPartnership')}
            </Button>
            <Button size="lg" variant="outline">
              {t('public.services.downloadBrochure')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}