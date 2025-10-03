import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Building2, 
  Star,
  CheckCircle,
  Globe,
  Users,
  FileCheck
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function PublicCredibility() {
  const { t } = useTranslation();
  
  const certifications = [
    {
      title: t('public.credibility.certifications.fdaRegistered.title'),
      description: t('public.credibility.certifications.fdaRegistered.description'),
      icon: Shield,
      color: "text-green-500",
      bg: "bg-green-50"
    },
    {
      title: t('public.credibility.certifications.iso9001.title'),
      description: t('public.credibility.certifications.iso9001.description'),
      icon: Award,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: t('public.credibility.certifications.gmpCertified.title'),
      description: t('public.credibility.certifications.gmpCertified.description'),
      icon: FileCheck,
      color: "text-purple-500",
      bg: "bg-purple-50"
    },
    {
      title: t('public.credibility.certifications.bbbRating.title'),
      description: t('public.credibility.certifications.bbbRating.description'),
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-50"
    }
  ];

  const companyInfo = [
    {
      label: t('public.credibility.companyDetails.dunsNumber.label'),
      value: t('public.credibility.companyDetails.dunsNumber.value'),
      description: t('public.credibility.companyDetails.dunsNumber.description')
    },
    {
      label: t('public.credibility.companyDetails.ein.label'),
      value: t('public.credibility.companyDetails.ein.value'),
      description: t('public.credibility.companyDetails.ein.description')
    },
    {
      label: t('public.credibility.companyDetails.founded.label'),
      value: t('public.credibility.companyDetails.founded.value'),
      description: t('public.credibility.companyDetails.founded.description')
    },
    {
      label: t('public.credibility.companyDetails.headquarters.label'),
      value: t('public.credibility.companyDetails.headquarters.value'),
      description: t('public.credibility.companyDetails.headquarters.description')
    }
  ];

  const trustIndicators = [
    t('public.credibility.memberships.0'),
    t('public.credibility.memberships.1'),
    t('public.credibility.memberships.2'),
    t('public.credibility.memberships.3'),
    t('public.credibility.memberships.4'),
    t('public.credibility.memberships.5')
  ];
  
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-4">
            <Shield className="h-3 w-3 mr-1" />
            {t('public.credibility.badge')}
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {t('public.credibility.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('public.credibility.description')}
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${cert.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-8 w-8 ${cert.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.title}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Company Details */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('public.credibility.companyInfo')}</h3>
            <div className="space-y-6">
              {companyInfo.map((info, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <div className="font-semibold text-gray-900">{info.label}</div>
                    <div className="text-sm text-gray-600">{info.description}</div>
                  </div>
                  <div className="font-mono text-lg text-blue-600">{info.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="h-5 w-5 text-blue-500" />
                <span className="font-semibold text-gray-900">Legal Entity</span>
              </div>
              <p className="text-gray-700 mb-2">Global Supplements Corporation</p>
              <p className="text-sm text-gray-600">
                {t('public.credibility.legalEntity.description')}
              </p>
            </div>
          </div>

          {/* Right Column - Trust Indicators */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('public.credibility.industryMemberships')}</h3>
            <div className="space-y-3">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <span className="text-gray-700">{indicator}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-6 w-6" />
                <span className="text-lg font-semibold">Global Presence</span>
              </div>
              <p className="mb-4">
                Headquartered in Orlando with strategic partnerships across 52 countries, 
                we're your trusted American gateway to the global supplement market.
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>2,400+ Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4" />
                  <span>Fortune 500 Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Assurance */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {t('public.credibility.transparencyGuarantee')}
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            {t('public.credibility.transparencyAssurance.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Publicly Verifiable
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <FileCheck className="h-3 w-3 mr-1" />
              Full Documentation
            </Badge>
            <Badge className="bg-purple-100 text-purple-800">
              <Shield className="h-3 w-3 mr-1" />
              Compliance Guaranteed
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}