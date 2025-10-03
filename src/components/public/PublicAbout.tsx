import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Users, 
  Globe,
  TrendingUp,
  Award,
  Shield,
  Target,
  Heart,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { useTranslation } from "react-i18next";
import corporateHqImage from "@/assets/corporate-headquarters-4k.jpg";
import b2bMeetingImage from "@/assets/b2b-executive-meeting-4k.jpg";

export function PublicAbout() {
  const { t } = useTranslation();
  
  const values = [
    {
      title: t('public.about.values.qualityFirst.title'),
      description: t('public.about.values.qualityFirst.description'),
      icon: Award,
      color: "text-blue-500"
    },
    {
      title: t('public.about.values.globalReach.title'),
      description: t('public.about.values.globalReach.description'),
      icon: Globe,
      color: "text-green-500"
    },
    {
      title: t('public.about.values.innovation.title'),
      description: t('public.about.values.innovation.description'),
      icon: Lightbulb,
      color: "text-purple-500"
    },
    {
      title: t('public.about.values.integrity.title'),
      description: t('public.about.values.integrity.description'),
      icon: Shield,
      color: "text-orange-500"
    }
  ];

  const timeline = [
    {
      year: t('public.about.timeline.2008.year'),
      title: t('public.about.timeline.2008.title'),
      description: t('public.about.timeline.2008.description')
    },
    {
      year: t('public.about.timeline.2012.year'),
      title: t('public.about.timeline.2012.title'),
      description: t('public.about.timeline.2012.description')
    },
    {
      year: t('public.about.timeline.2016.year'),
      title: t('public.about.timeline.2016.title'),
      description: t('public.about.timeline.2016.description')
    },
    {
      year: t('public.about.timeline.2019.year'),
      title: t('public.about.timeline.2019.title'),
      description: t('public.about.timeline.2019.description')
    },
    {
      year: t('public.about.timeline.2021.year'),
      title: t('public.about.timeline.2021.title'),
      description: t('public.about.timeline.2021.description')
    },
    {
      year: t('public.about.timeline.2024.year'),
      title: t('public.about.timeline.2024.title'),
      description: t('public.about.timeline.2024.description')
    }
  ];
  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Building2 className="h-3 w-3 mr-1" />
            {t('public.about.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('public.about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('public.about.description')}
          </p>
        </div>

        {/* Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Left Column - Story */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('public.about.ourStory')}</h3>
            <div className="space-y-4 text-gray-700">
              <p>{t('public.about.story.paragraph1')}</p>
              <p>{t('public.about.story.paragraph2')}</p>
              <p>{t('public.about.story.paragraph3')}</p>
            </div>

            {/* Key Achievements */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">15+</div>
                <div className="text-sm text-gray-600">{t('public.about.achievements.yearsExperience')}</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">52</div>
                <div className="text-sm text-gray-600">{t('public.about.achievements.countriesServed')}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-600">{t('public.about.achievements.verifiedSuppliers')}</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">$2.8B</div>
                <div className="text-sm text-gray-600">{t('public.about.achievements.annualVolume')}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="space-y-6">
            <div className="relative">
              <img 
                src={corporateHqImage} 
                alt="Global Supplements Orlando headquarters" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-semibold">{t('public.about.locations.orlandoHq')}</div>
                <div className="text-sm">{t('public.about.locations.orlandoAddress')}</div>
              </div>
            </div>
            <div className="relative">
              <img 
                src={b2bMeetingImage} 
                alt="Global business meeting" 
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <div className="text-lg font-semibold">{t('public.about.locations.globalPartnerships')}</div>
                <div className="text-sm">{t('public.about.locations.connectingBusinesses')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">{t('public.about.coreValues')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className={`h-6 w-6 ${value.color}`} />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Company Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">{t('public.about.ourJourney')}</h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 hidden md:block"></div>
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <Badge className="bg-blue-100 text-blue-800 mb-2">{item.year}</Badge>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:block w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-full md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('public.about.cta.title')}
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {t('public.about.cta.description')}
          </p>
          <Button 
            size="lg" 
            onClick={scrollToContact}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8"
          >
            <Users className="h-5 w-5 mr-2" />
            {t('public.about.cta.button')}
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}