import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Cpu, 
  Play, 
  Pause,
  Zap,
  Shield,
  ArrowRight,
  Atom,
  Activity,
  Target
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import quantumProcessingImage from "@/assets/quantum-processing-4k.jpg";

const quantumApplications = [
  {
    title: "Quantum Computing Enhancement",
    description: "Materials that enable quantum coherence at room temperature",
    specs: ["99.9% purity", "Coherence time: 100ms", "Operating temp: 25°C"],
    icon: Cpu
  },
  {
    title: "Superconductor Networks",
    description: "Zero-resistance materials for energy transmission",
    specs: ["Critical temp: 77K", "Current density: 10⁶ A/cm²", "Zero energy loss"],
    icon: Zap
  },
  {
    title: "Quantum Sensors",
    description: "Ultra-sensitive detection materials for precision measurements",
    specs: ["Sensitivity: 10⁻¹⁸ T", "Response time: 1ns", "Multi-frequency"],
    icon: Activity
  }
];

const researchAreas = [
  "Topological Quantum Materials",
  "2D Material Engineering", 
  "Quantum Dot Synthesis",
  "Metamaterial Design",
  "Photonic Crystals",
  "Spintronic Components"
];

export default function QuantumMaterials() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-cyan-800/90"
            style={{
              backgroundImage: `url(${quantumProcessingImage})`,
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
                <source src="/videos/quantum-materials-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-cyan-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Atom className="h-5 w-5" />
                  Quantum Innovation
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  Quantum
                  <span className="block bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    Materials
                  </span>
                </h1>
                
                <p className="text-2xl text-blue-100 leading-relaxed">
                  Next-generation materials engineered at the quantum level to unlock unprecedented capabilities in computing, energy, and communications.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-300">99.9%</div>
                    <div className="text-sm text-blue-200">Purity Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-300">10⁶</div>
                    <div className="text-sm text-blue-200">Atoms/cm³</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-300">-273°C</div>
                    <div className="text-sm text-blue-200">Operating Range</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-8 py-4">
                    Explore Catalog <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Applications Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Quantum Applications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Revolutionary materials enabling breakthrough technologies across multiple industries
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {quantumApplications.map((app, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-blue-200">
                  <CardHeader className="bg-gradient-to-br from-blue-50 to-cyan-50 pb-4">
                    <div className="bg-blue-100 rounded-2xl p-4 w-fit mb-4">
                      <app.icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                      {app.title}
                    </CardTitle>
                    <p className="text-gray-600">{app.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">Specifications:</h4>
                      <ul className="space-y-2">
                        {app.specs.map((spec, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <Target className="h-4 w-4 text-blue-500" />
                            {spec}
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                        Technical Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Research & Development
              </h2>
              <p className="text-xl text-gray-600">
                Cutting-edge research areas driving quantum material innovation
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                    {area}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Shape the Quantum Future
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Partner with us to develop next-generation quantum materials for your breakthrough applications
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-xl px-12 py-4">
                Request Samples <Atom className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-blue-600 hover:bg-white/10 text-xl px-12 py-4">
                Contact Research Team
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}