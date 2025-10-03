import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Factory, 
  Play, 
  Pause,
  Cog,
  Shield,
  ArrowRight,
  Award,
  Truck,
  Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import manufacturingImage from "@/assets/manufacturing-facility-4k.jpg";

const manufacturingCapabilities = [
  {
    capability: "Tablet Manufacturing",
    description: "High-speed tablet production with precision coating and quality control",
    specs: [
      "500M tablets/year capacity",
      "Multi-layer tablet technology",
      "Enteric and film coating",
      "Custom shapes and sizes"
    ],
    equipment: ["Korsch rotary presses", "Coating systems", "Granulation equipment"],
    icon: Factory
  },
  {
    capability: "Capsule Production",
    description: "Automated capsule filling for powder, liquid, and pellet formulations",
    specs: [
      "200M capsules/year capacity", 
      "Size 000 to size 5 capsules",
      "Vegetarian and gelatin options",
      "Multi-particulate filling"
    ],
    equipment: ["Capsugel equipment", "Automatic fillers", "Weight checkers"],
    icon: Cog
  },
  {
    capability: "Soft Gel Production",
    description: "Specialized soft gel manufacturing with liquid encapsulation technology",
    specs: [
      "100M soft gels/year capacity",
      "Custom shapes and colors",
      "Oil-based formulations", 
      "Enteric soft gels"
    ],
    equipment: ["Rotary die encapsulation", "Tumble dryers", "Inspection systems"],
    icon: Shield
  }
];

const qualityControls = [
  {
    process: "Raw Material Testing",
    description: "Complete identity, purity, and potency testing of all incoming materials",
    methods: ["HPLC analysis", "FTIR spectroscopy", "Microbiological testing", "Heavy metals screening"]
  },
  {
    process: "In-Process Monitoring", 
    description: "Real-time monitoring throughout manufacturing process",
    methods: ["Weight variation checks", "Content uniformity", "Hardness testing", "Disintegration time"]
  },
  {
    process: "Finished Product Release",
    description: "Comprehensive testing before product release to market",
    methods: ["Dissolution testing", "Stability analysis", "Label claim verification", "Shelf life validation"]
  }
];

const certifications = [
  { name: "FDA cGMP", description: "Current Good Manufacturing Practice", icon: Award },
  { name: "NSF International", description: "Product and facility certification", icon: Shield },
  { name: "ISO 22000", description: "Food safety management system", icon: Factory },
  { name: "Organic Certified", description: "USDA organic manufacturing", icon: Users }
];

const facilityStats = [
  { value: "500,000", label: "Sq Ft Facility", icon: Factory },
  { value: "800M", label: "Units/Year Capacity", icon: Cog },
  { value: "24/7", label: "Quality Monitoring", icon: Shield },
  { value: "99.9%", label: "Quality Rate", icon: Award }
];

export default function Manufacturing() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-slate-800/90"
            style={{
              backgroundImage: `url(${manufacturingImage})`,
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
                <source src="/videos/manufacturing-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 to-slate-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Factory className="h-5 w-5" />
                  World-Class Manufacturing
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Manufacturing
                  <span className="block bg-gradient-to-r from-gray-300 to-slate-300 bg-clip-text text-transparent">
                    Excellence
                  </span>
                </h1>
                
                <p className="text-2xl text-gray-100 leading-relaxed">
                  State-of-the-art manufacturing facilities with advanced automation, rigorous quality control, and capacity to produce 800+ million units annually.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-300">500K</div>
                    <div className="text-sm text-gray-200">Sq Ft Facility</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-300">800M</div>
                    <div className="text-sm text-gray-200">Units/Year</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-300">99.9%</div>
                    <div className="text-sm text-gray-200">Quality Rate</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-50 text-xl px-8 py-4">
                    Facility Tour <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Facility Stats */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {facilityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-2xl p-6 mb-4 inline-block">
                    <stat.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Manufacturing Capabilities */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Manufacturing Capabilities
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced production capabilities with cutting-edge technology and precision engineering
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {manufacturingCapabilities.map((capability, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-gray-50 to-slate-50 pb-4">
                    <div className="bg-gray-100 rounded-2xl p-4 w-fit mb-4">
                      <capability.icon className="h-8 w-8 text-gray-600" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-gray-600 transition-colors">
                      {capability.capability}
                    </CardTitle>
                    <p className="text-gray-600">{capability.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Specifications:</h4>
                        <ul className="space-y-2">
                          {capability.specs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Cog className="h-4 w-4 text-gray-500 flex-shrink-0" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900">Equipment:</h4>
                        <div className="space-y-1">
                          {capability.equipment.map((equip, i) => (
                            <Badge key={i} variant="outline" className="text-xs block w-fit">
                              {equip}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-gray-600 hover:bg-gray-700">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Control */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Quality Control Process
              </h2>
              <p className="text-xl text-gray-600">
                Comprehensive quality assurance at every stage of manufacturing
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {qualityControls.map((control, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-white pb-4">
                    <CardTitle className="text-xl mb-2">{control.process}</CardTitle>
                    <p className="text-gray-600">{control.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3 text-gray-900">Testing Methods:</h4>
                    <ul className="space-y-2">
                      {control.methods.map((method, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <Shield className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {method}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Manufacturing Certifications
              </h2>
              <p className="text-xl text-gray-600">
                Certified by leading regulatory and quality organizations
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow">
                  <div className="bg-gray-100 rounded-2xl p-4 mb-4 inline-block">
                    <cert.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-gray-600 to-slate-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Partner With Manufacturing Leaders
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Experience world-class manufacturing with uncompromising quality standards
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-gray-600 hover:bg-gray-50 text-xl px-12 py-4">
                Request Quote <Factory className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-gray-600 hover:bg-white/10 text-xl px-12 py-4">
                Schedule Tour
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}