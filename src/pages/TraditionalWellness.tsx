import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Play, 
  Pause,
  Leaf,
  Sun,
  ArrowRight,
  Flower,
  Mountain,
  Droplet
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import traditionalWellnessImage from "@/assets/traditional-wellness-4k.jpg";

const traditionCategories = [
  {
    name: "Ayurvedic Formulations",
    origin: "Ancient India",
    description: "5,000-year-old holistic healing system focusing on mind-body balance",
    ingredients: ["Ashwagandha", "Turmeric", "Brahmi", "Triphala"],
    benefits: ["Stress relief", "Immune support", "Cognitive enhancement"],
    icon: Sun,
    color: "amber"
  },
  {
    name: "Traditional Chinese Medicine",
    origin: "Ancient China",
    description: "Time-tested herbs and formulas based on meridian energy flow",
    ingredients: ["Ginseng", "Goji Berry", "Reishi", "Cordyceps"],
    benefits: ["Energy boost", "Longevity", "Hormonal balance"],
    icon: Mountain,
    color: "green"
  },
  {
    name: "European Herbalism",
    origin: "Medieval Europe",
    description: "Traditional botanical remedies passed down through generations",
    ingredients: ["Echinacea", "St. John's Wort", "Milk Thistle", "Valerian"],
    benefits: ["Mood support", "Liver health", "Sleep quality"],
    icon: Flower,
    color: "purple"
  }
];

const sustainabilityFeatures = [
  {
    title: "Organic Cultivation",
    description: "Pesticide-free farming practices preserving soil health",
    icon: Leaf
  },
  {
    title: "Fair Trade Sourcing",
    description: "Supporting indigenous communities and traditional farmers",
    icon: Heart
  },
  {
    title: "Eco-Friendly Packaging",
    description: "Biodegradable and recyclable packaging materials",
    icon: Droplet
  }
];

const wellnessPrinciples = [
  "Holistic mind-body-spirit approach",
  "Natural ingredients from pristine environments",
  "Traditional preparation methods",
  "Sustainable and ethical sourcing",
  "Third-party tested for purity",
  "Preservative-free formulations"
];

export default function TraditionalWellness() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
        {/* Compact Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-teal-800/90"
            style={{
              backgroundImage: `url(${traditionalWellnessImage})`,
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
                <source src="/videos/wellness-products-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-teal-900/60" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7 space-y-6">
                <Badge className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Leaf className="h-4 w-4" />
                  Ancient Wisdom
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1]">
                  Traditional
                  <span className="block bg-gradient-to-r from-green-300 to-teal-300 bg-clip-text text-transparent">
                    Wellness
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-green-100 leading-relaxed max-w-2xl">
                  Timeless healing wisdom from ancient cultures, combined with modern quality standards to bring you pure, potent traditional remedies.
                </p>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-teal-300">5000+</div>
                    <div className="text-xs sm:text-sm text-green-200">Years Tradition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-teal-300">100%</div>
                    <div className="text-xs sm:text-sm text-green-200">Organic</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-teal-300">50+</div>
                    <div className="text-xs sm:text-sm text-green-200">Traditional Herbs</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center xl:justify-start">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-6 py-3">
                    Explore Traditions <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/30 text-green-500 hover:bg-white/10 text-lg px-6 py-3">
                    Ancient Wisdom
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

        {/* Compact Traditional Categories */}
        <section className="py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
                Ancient Healing Traditions
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover time-honored wellness practices from cultures around the world
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {traditionCategories.map((category, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className={`bg-gradient-to-br from-${category.color}-50 to-${category.color}-100 pb-3`}>
                    <div className={`bg-${category.color}-100 rounded-xl p-3 w-fit mb-2`}>
                      <category.icon className={`h-6 w-6 text-${category.color}-600`} />
                    </div>
                    <Badge variant="secondary" className={`bg-${category.color}-100 text-${category.color}-700 w-fit mb-2 text-xs`}>
                      {category.origin}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
                      {category.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900 text-sm">Key Ingredients:</h4>
                        <div className="flex flex-wrap gap-1">
                          {category.ingredients.map((ingredient, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900 text-sm">Benefits:</h4>
                        <ul className="space-y-1">
                          {category.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <Heart className="h-3 w-3 text-green-500 flex-shrink-0" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button className="w-full mt-2 bg-green-600 hover:bg-green-700 text-sm">
                        View Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Sustainability Section */}
        <section className="py-10 bg-white/80 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                Sustainable & Ethical
              </h2>
              <p className="text-lg text-gray-600">
                Committed to preserving traditional knowledge while protecting our planet
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sustainabilityFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="text-center p-6 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg hover:shadow-md transition-all duration-300"
                >
                  <div className="bg-green-200 rounded-full p-4 mb-4 inline-block">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Principles Section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Our Wellness Philosophy
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We honor traditional healing wisdom while maintaining the highest standards of quality and purity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {wellnessPrinciples.map((principle, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{principle}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="xl:col-span-5">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="bg-green-100 rounded-full p-4 mb-4 inline-block">
                      <Heart className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Wellness Consultation
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Connect with our traditional wellness experts for personalized guidance on your healing journey.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-sm">
                      Book Consultation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className="py-12 bg-gradient-to-r from-green-600 to-teal-700 text-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Begin Your Wellness Journey
            </h2>
            <p className="text-lg mb-6 text-green-100">
              Embrace ancient wisdom with modern quality for optimal health and vitality
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-3">
                Shop Traditional Wellness <Leaf className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-green-600 hover:bg-white/10 text-lg px-8 py-3">
                Learn Ancient Wisdom
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}