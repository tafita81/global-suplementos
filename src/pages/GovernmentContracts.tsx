import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Globe, 
  Play, 
  Pause,
  Shield,
  FileCheck,
  ArrowRight,
  Award,
  Users,
  Building2
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import corporateHqImage from "@/assets/corporate-headquarters-4k.jpg";

const governmentSectors = [
  {
    sector: "Military & Defense",
    description: "Specialized nutritional supplements for military personnel and defense contractors",
    requirements: [
      "NSF for Sport certification",
      "BSCG banned substance testing",
      "Military specification compliance",
      "Combat readiness formulations"
    ],
    contracts: ["Department of Defense", "Coast Guard", "Special Operations"],
    icon: Shield
  },
  {
    sector: "Healthcare Systems",
    description: "Medical-grade supplements for government healthcare facilities",
    requirements: [
      "FDA cGMP compliance",
      "USP verification", 
      "Electronic procurement integration",
      "Clinical efficacy documentation"
    ],
    contracts: ["VA Hospitals", "Public Health Service", "CDC Programs"],
    icon: FileCheck
  },
  {
    sector: "Federal Employees",
    description: "Wellness programs for government workforce and employee benefits",
    requirements: [
      "GSA Schedule eligibility",
      "Federal acquisition compliance",
      "Employee wellness analytics",
      "Bulk procurement capabilities"
    ],
    contracts: ["Federal Employee Health Benefits", "Wellness Programs", "Agency Contracts"],
    icon: Users
  }
];

const contractCapabilities = [
  {
    capability: "GSA Schedule 65 IIA",
    description: "Authorized vendor on General Services Administration schedule",
    value: "$50M",
    status: "Active"
  },
  {
    capability: "SEWP VI Eligible",
    description: "Solutions for Enterprise-Wide Procurement contract ready",
    value: "$20B",
    status: "Certified" 
  },
  {
    capability: "OASIS Pool 1",
    description: "One Acquisition Solution for Integrated Services contract holder",
    value: "$60B",
    status: "Prime Contractor"
  }
];

const complianceStandards = [
  "Federal Acquisition Regulation (FAR) compliance",
  "Trade Agreements Act (TAA) compliant sourcing",
  "Section 508 accessibility requirements",
  "Cybersecurity Maturity Model Certification (CMMC)",
  "ISO 9001:2015 quality management",
  "FISMA security authorization"
];

export default function GovernmentContracts() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-blue-800/90"
            style={{
              backgroundImage: `url(${corporateHqImage})`,
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
                <source src="/videos/government-contracts-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-blue-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Globe className="h-5 w-5" />
                  Federal Contracting
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Government
                  <span className="block bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">
                    Contracts
                  </span>
                </h1>
                
                <p className="text-2xl text-blue-100 leading-relaxed">
                  Authorized government contractor providing specialized supplement solutions for federal agencies, military, and public sector organizations.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">GSA</div>
                    <div className="text-sm text-slate-200">Authorized</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">$50M</div>
                    <div className="text-sm text-slate-200">Contract Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-300">15+</div>
                    <div className="text-sm text-slate-200">Agencies</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-8 py-4">
                    GSA Schedule <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Contract Capabilities */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contract Vehicles</h2>
              <p className="text-lg text-gray-600">Authorized on major federal contract vehicles</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {contractCapabilities.map((contract, index) => (
                <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <Badge className={`mb-4 ${contract.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {contract.status}
                  </Badge>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{contract.capability}</h3>
                  <p className="text-sm text-gray-600 mb-3">{contract.description}</p>
                  <div className="text-2xl font-bold text-blue-600">{contract.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Government Sectors */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Government Sectors
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized solutions tailored for specific government sector requirements
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {governmentSectors.map((sector, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-slate-50 to-blue-50 pb-4">
                    <div className="bg-blue-100 rounded-2xl p-4 w-fit mb-4">
                      <sector.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                      {sector.sector}
                    </CardTitle>
                    <p className="text-gray-600">{sector.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Requirements:</h4>
                        <ul className="space-y-2">
                          {sector.requirements.map((req, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <FileCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">Active Contracts:</h4>
                        <div className="space-y-1">
                          {sector.contracts.map((contract, i) => (
                            <Badge key={i} variant="outline" className="text-xs block w-fit">
                              {contract}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        View Solutions
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Federal Compliance
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Full compliance with federal regulations and acquisition requirements for seamless procurement.
                </p>
                <div className="grid grid-cols-1 gap-4">
                  {complianceStandards.map((standard, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <span className="text-gray-700">{standard}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full p-6 mb-6 inline-block">
                    <Building2 className="h-12 w-12 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Contracting Support
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Dedicated government contracting team to support your procurement needs and ensure compliance.
                  </p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Contact Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-600 to-blue-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Serve Your Agency
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Leverage our federal contracting expertise for your supplement procurement needs
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-12 py-4">
                GSA eBuy Quote <Globe className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white/10 text-xl px-12 py-4">
                Schedule Briefing
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}