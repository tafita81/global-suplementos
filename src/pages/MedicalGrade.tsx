import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Play, 
  Pause,
  Heart,
  CheckCircle,
  ArrowRight,
  Award,
  Users,
  Microscope
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import medicalGradeImage from "@/assets/medical-grade-4k.jpg";

const medicalProducts = [
  {
    category: "Cardiovascular Support",
    products: [
      "CoQ10 Ultra (300mg)",
      "Omega-3 Pharmaceutical Grade",
      "L-Arginine Complex"
    ],
    icon: Heart,
    color: "red"
  },
  {
    category: "Immune Enhancement",
    products: [
      "Vitamin D3 (10,000 IU)",
      "Zinc Chelate Complex",
      "Elderberry Extract"
    ],
    icon: Shield,
    color: "green"
  },
  {
    category: "Cognitive Function",
    products: [
      "Lion's Mane Extract",
      "Phosphatidylserine",
      "Bacopa Monnieri"
    ],
    icon: Microscope,
    color: "blue"
  }
];

const certifications = [
  {
    name: "FDA cGMP",
    description: "Current Good Manufacturing Practice",
    icon: Award
  },
  {
    name: "USP Verified",
    description: "United States Pharmacopeia standards",
    icon: CheckCircle
  },
  {
    name: "NSF Certified",
    description: "NSF International certification",
    icon: Shield
  },
  {
    name: "Third-Party Tested",
    description: "Independent laboratory verification",
    icon: Microscope
  }
];

const qualityStandards = [
  "99.9% active ingredient purity",
  "Heavy metals testing below detection limits",
  "Microbiological contamination screening",
  "Dissolution rate optimization",
  "Bioavailability enhancement",
  "Stability testing protocols"
];

export default function MedicalGrade() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
        {/* Compact Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-800/90"
            style={{
              backgroundImage: `url(${medicalGradeImage})`,
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
                <source src="/videos/medical-compounds-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-emerald-900/60" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7 space-y-6">
                <Badge className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Shield className="h-4 w-4" />
                  Medical Excellence
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  Medical
                  <span className="block bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                    Grade
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-green-100 leading-relaxed max-w-2xl">
                  Pharmaceutical-grade supplements manufactured to the highest medical standards, ensuring maximum potency, purity, and therapeutic efficacy.
                </p>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-300">99.9%</div>
                    <div className="text-xs sm:text-sm text-green-200">Purity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-300">FDA</div>
                    <div className="text-xs sm:text-sm text-green-200">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-emerald-300">cGMP</div>
                    <div className="text-xs sm:text-sm text-green-200">Certified</div>
                  </div>
                </div>

                <div className="flex justify-center xl:justify-start">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-6 py-3">
                    Medical Catalog <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="xl:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video">
                  <button
                    onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                    className="absolute inset-0 flex items-center justify-center group bg-black/20 hover:bg-black/30 transition-colors z-10"
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform">
                      {isVideoPlaying ? (
                        <Pause className="h-8 w-8 text-white" />
                      ) : (
                        <Play className="h-8 w-8 text-white ml-1" />
                      )}
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Certifications */}
        <section className="py-8 bg-white/80 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quality Certifications</h2>
              <p className="text-sm text-gray-600">Rigorously tested and certified by leading regulatory bodies</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-green-100 rounded-xl p-2 mb-2 inline-block">
                    <cert.icon className="h-4 w-4 text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{cert.name}</h3>
                  <p className="text-xs text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Product Categories */}
        <section className="py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
                Therapeutic Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive range of medical-grade supplements for targeted health support
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {medicalProducts.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 pb-3`}>
                    <div className={`bg-${category.color}-100 rounded-xl p-3 w-fit mb-2`}>
                      <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <ul className="space-y-2">
                      {category.products.map((product, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{product}</span>
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-sm">
                      View Products
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Quality Standards */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Uncompromising Quality Standards
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Every product undergoes rigorous testing and quality control processes to ensure pharmaceutical-grade standards.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {qualityStandards.map((standard, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="xl:col-span-5">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 mb-4 inline-block">
                      <Users className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Healthcare Professional Program
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Exclusive access to clinical-grade formulations for healthcare practitioners and their patients.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-sm">
                      Join Program
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Experience Medical-Grade Excellence
            </h2>
            <p className="text-lg mb-6 text-green-100">
              Trust in pharmaceutical-grade quality for your most important health goals
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-3">
                Shop Medical Grade <Shield className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-green-600 hover:bg-white/10 text-lg px-8 py-3">
                Consult Team
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}