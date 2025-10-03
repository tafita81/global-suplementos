import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Microscope, 
  Play, 
  Pause,
  Beaker,
  FileText,
  ArrowRight,
  Award,
  TrendingUp,
  Users
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import quantumProcessingImage from "@/assets/quantum-processing-4k.jpg";

const researchAreas = [
  {
    area: "Nutrigenomics Research",
    description: "Personalized nutrition based on genetic profiles and biomarkers",
    projects: [
      "Gene-nutrient interaction studies",
      "Personalized supplement algorithms",
      "Biomarker-driven formulations",
      "Precision nutrition platforms"
    ],
    funding: "$2.5M",
    timeline: "2024-2027",
    icon: Microscope
  },
  {
    area: "Bioavailability Enhancement", 
    description: "Advanced delivery systems for improved nutrient absorption",
    projects: [
      "Liposomal encapsulation technology",
      "Nanoparticle delivery systems",
      "Targeted release mechanisms",
      "Absorption enhancement studies"
    ],
    funding: "$1.8M",
    timeline: "2023-2026",
    icon: Beaker
  },
  {
    area: "Clinical Efficacy Studies",
    description: "Randomized controlled trials validating supplement effectiveness",
    projects: [
      "Multi-center clinical trials",
      "Biomarker validation studies",
      "Safety and toxicology research",
      "Meta-analysis publications"
    ],
    funding: "$3.2M", 
    timeline: "2022-2025",
    icon: FileText
  }
];

const partnerships = [
  {
    institution: "Stanford University School of Medicine",
    collaboration: "Nutrigenomics and Personalized Nutrition Research",
    duration: "5 years",
    focus: "Genetic factors in supplement response"
  },
  {
    institution: "MIT Laboratory for Nutrition Science",
    collaboration: "Advanced Delivery Systems Development", 
    duration: "3 years",
    focus: "Nanotechnology applications"
  },
  {
    institution: "Johns Hopkins Center for Human Nutrition",
    collaboration: "Clinical Efficacy and Safety Studies",
    duration: "4 years", 
    focus: "Evidence-based nutrition research"
  }
];

const publications = [
  {
    title: "Personalized Nutrition: The Role of Nutrigenomics in Supplement Design",
    journal: "Nature Nutrition",
    year: "2024",
    impact: "9.2"
  },
  {
    title: "Liposomal Delivery Systems for Enhanced Bioavailability",
    journal: "Journal of Nutritional Science",
    year: "2023", 
    impact: "7.8"
  },
  {
    title: "Clinical Validation of Novel Probiotic Formulations",
    journal: "American Journal of Clinical Nutrition",
    year: "2023",
    impact: "8.5"
  }
];

const rdMetrics = [
  { value: "50+", label: "Active Studies", icon: Microscope },
  { value: "$15M", label: "R&D Investment", icon: TrendingUp },
  { value: "25+", label: "Publications", icon: FileText },
  { value: "15+", label: "University Partners", icon: Users }
];

export default function ResearchDevelopment() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
        {/* Hero Section */}
        <section className="relative min-h-[110vh] flex items-center overflow-hidden pb-32">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-800/90"
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
                <source src="/videos/research-development-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-indigo-900/60" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <Badge className="inline-flex items-center gap-2 text-lg px-6 py-3 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Microscope className="h-5 w-5" />
                  Scientific Innovation
                </Badge>
                
                <h1 className="text-6xl md:text-7xl font-bold leading-[1.2] mb-8">
                  Research &
                  <span className="block bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent pb-2">
                    Development
                  </span>
                </h1>
                
                <p className="text-2xl text-purple-100 leading-relaxed">
                  Cutting-edge research driving the future of nutritional science through advanced studies, clinical trials, and breakthrough innovations.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">50+</div>
                    <div className="text-sm text-purple-200">Active Studies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">$15M</div>
                    <div className="text-sm text-purple-200">R&D Investment</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-300">25+</div>
                    <div className="text-sm text-purple-200">Publications</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-xl px-8 py-4">
                    Research Portfolio <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* R&D Metrics */}
        <section className="py-16 bg-white/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {rdMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="bg-purple-100 rounded-2xl p-6 mb-4 inline-block">
                    <metric.icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-gray-600">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Areas */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 text-gray-900">
                Research Focus Areas
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leading-edge research programs advancing the science of nutrition and supplementation
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {researchAreas.map((area, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-purple-50 to-indigo-50 pb-4">
                    <div className="bg-purple-100 rounded-2xl p-4 w-fit mb-4">
                      <area.icon className="h-8 w-8 text-purple-600" />
                    </div>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 w-fit mb-2">
                      {area.timeline}
                    </Badge>
                    <CardTitle className="text-2xl group-hover:text-purple-600 transition-colors">
                      {area.area}
                    </CardTitle>
                    <p className="text-gray-600">{area.description}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Active Projects:</h4>
                        <ul className="space-y-2">
                          {area.projects.map((project, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Beaker className="h-4 w-4 text-purple-500 flex-shrink-0" />
                              {project}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div>
                          <div className="text-sm text-gray-500">Funding</div>
                          <div className="text-xl font-bold text-purple-600">{area.funding}</div>
                        </div>
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Academic Partnerships */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Academic Partnerships
              </h2>
              <p className="text-xl text-gray-600">
                Collaborating with leading universities and research institutions worldwide
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {partnerships.map((partnership, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-white pb-4">
                    <Badge variant="outline" className="w-fit mb-2">
                      {partnership.duration}
                    </Badge>
                    <CardTitle className="text-xl mb-2">{partnership.institution}</CardTitle>
                    <p className="text-gray-600">{partnership.collaboration}</p>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">Research Focus:</h4>
                        <p className="text-sm text-gray-600">{partnership.focus}</p>
                      </div>
                      <Button variant="outline" className="w-full">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Publications */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Recent Publications
              </h2>
              <p className="text-xl text-gray-600">
                Peer-reviewed research published in leading scientific journals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {publications.map((pub, index) => (
                <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="bg-purple-50 pb-4">
                    <Badge className="bg-purple-100 text-purple-700 w-fit mb-2">
                      Impact Factor: {pub.impact}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">{pub.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div>
                        <div className="font-semibold text-gray-900">{pub.journal}</div>
                        <div className="text-sm text-gray-600">{pub.year}</div>
                      </div>
                      <Button variant="outline" className="w-full">
                        View Publication
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-6">
              Advance Nutritional Science
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Partner with us to drive breakthrough research and innovation in nutritional supplementation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 text-xl px-12 py-4">
                Research Collaboration <Microscope className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 text-xl px-12 py-4">
                Clinical Trials Program
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}