import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Sparkles, 
  Play, 
  Pause,
  CheckCircle,
  Star,
  ArrowRight,
  Award,
  Heart,
  Shield
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import beautySupplementsImage from "@/assets/beauty-supplements-4k.jpg";

const beautyProducts = [
  {
    name: "Collagen Matrix Pro",
    description: "Advanced marine collagen peptides with hyaluronic acid",
    benefits: ["Skin elasticity", "Wrinkle reduction", "Joint health"],
    rating: 4.9,
    price: "$89"
  },
  {
    name: "Vitamin C Serum Complex",
    description: "20% L-Ascorbic acid with vitamin E and ferulic acid",
    benefits: ["Brightening", "Antioxidant protection", "Even tone"],
    rating: 4.8,
    price: "$65"
  },
  {
    name: "Biotin Hair Boost",
    description: "10,000mcg biotin with keratin and bamboo extract",
    benefits: ["Hair growth", "Nail strength", "Scalp health"],
    rating: 4.7,
    price: "$45"
  }
];

const certifications = [
  { name: "FDA Approved", icon: Shield },
  { name: "GMP Certified", icon: Award },
  { name: "Organic Certified", icon: Heart }
];

export default function BeautySupplements() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        {/* Compact Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-pink-600/90 to-purple-700/90"
            style={{
              backgroundImage: `url(${beautySupplementsImage})`,
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
                <source src="/videos/beauty-supplements-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 to-purple-900/50" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7 space-y-6">
                <Badge className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Sparkles className="h-4 w-4" />
                  Premium Beauty Solutions
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4">
                  Beauty
                  <span className="block bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                    Supplements
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-pink-100 leading-relaxed max-w-2xl">
                  Revolutionary formulations combining cutting-edge science with natural ingredients for radiant skin, lustrous hair, and overall beauty enhancement.
                </p>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-300">FDA</div>
                    <div className="text-xs sm:text-sm text-pink-200">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-300">100%</div>
                    <div className="text-xs sm:text-sm text-pink-200">Natural</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-purple-300">GMP</div>
                    <div className="text-xs sm:text-sm text-pink-200">Certified</div>
                  </div>
                </div>

                <div className="flex justify-center xl:justify-start">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 text-lg px-6 py-3">
                    Shop Collection <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="grid grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="text-center">
                  <div className="bg-pink-100 rounded-xl p-3 mb-2 inline-block">
                    <cert.icon className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Products Grid */}
        <section className="py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Scientifically formulated supplements designed to enhance your natural beauty from within
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {beautyProducts.map((product, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-xs">
                        Bestseller
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-pink-600 transition-colors">
                      {product.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">{product.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900 text-sm">Key Benefits:</h4>
                        <ul className="space-y-1">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-center pt-2 border-t">
                        <Button className="bg-pink-600 hover:bg-pink-700 w-full text-sm">
                          Request Quote
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className="py-12 bg-gradient-to-r from-pink-600 to-purple-700 text-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Transform Your Beauty Routine Today
            </h2>
            <p className="text-lg mb-6 text-pink-100">
              Join thousands of satisfied customers who have discovered the power of science-backed beauty supplements
            </p>
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50 text-lg px-8 py-3">
              Start Your Journey <Sparkles className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}