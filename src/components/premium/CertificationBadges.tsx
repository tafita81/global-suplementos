import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Star, 
  CheckCircle2, 
  Leaf, 
  Globe,
  Zap,
  ShieldCheck,
  Crown,
  Medal
} from "lucide-react";
import { useTranslation } from "react-i18next";

const certifications = [
  { 
    name: "ISO 22000", 
    icon: ShieldCheck, 
    descriptionKey: "certifications.items.iso22000",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50 border-blue-200"
  },
  { 
    name: "GMP Certified", 
    icon: CheckCircle2, 
    descriptionKey: "certifications.items.gmp",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50 border-green-200"
  },
  { 
    name: "FDA Approved", 
    icon: Medal, 
    descriptionKey: "certifications.items.fda",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50 border-purple-200"
  },
  { 
    name: "HACCP", 
    icon: Star, 
    descriptionKey: "certifications.items.haccp",
    color: "from-amber-500 to-amber-600",
    bgColor: "bg-amber-50 border-amber-200"
  },
  { 
    name: "NSF International", 
    icon: Crown, 
    descriptionKey: "certifications.items.nsf",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-50 border-red-200"
  },
  { 
    name: "EU Organic", 
    icon: Leaf, 
    descriptionKey: "certifications.items.euOrganic",
    color: "from-emerald-500 to-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-200"
  }
];

export function CertificationBadges() {
  const { t } = useTranslation();
  
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4 text-gray-900">{t('certifications.title')}</h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('certifications.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${cert.bgColor} border-2 cursor-pointer`}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${cert.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <cert.icon className="h-12 w-12 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2 text-gray-900">{cert.name}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t(cert.descriptionKey)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-full border border-green-200">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="text-green-800 font-semibold">{t('certifications.verified')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}