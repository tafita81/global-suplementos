import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Smartphone, 
  Play, 
  Pause,
  Wifi,
  Battery,
  ArrowRight,
  Activity,
  Watch,
  Thermometer,
  Bluetooth
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { PublicSiteLayout } from "@/components/layout/PublicSiteLayout";
import smartGadgetsImage from "@/assets/smart-health-gadgets-4k.jpg";

const smartDevices = [
  {
    name: "HealthWatch Pro X1",
    category: "Wearable Health Monitor",
    features: [
      "24/7 Heart Rate Monitoring",
      "Blood Oxygen Tracking",
      "Sleep Quality Analysis",
      "ECG Recording",
      "7-day Battery Life"
    ],
    
    connectivity: ["Bluetooth 5.0", "WiFi 6", "NFC"],
    icon: Watch
  },
  {
    name: "VitalSense Scanner",
    category: "Portable Health Scanner",
    features: [
      "Non-invasive Blood Analysis",
      "Vitamin Level Detection",
      "Hydration Monitoring",
      "AI Health Insights",
      "Cloud Data Sync"
    ],
    
    connectivity: ["USB-C", "Bluetooth 5.2", "WiFi 6E"],
    icon: Activity
  },
  {
    name: "ThermoGuard Smart",
    category: "Environment Monitor",
    features: [
      "Air Quality Tracking",
      "Temperature Control",
      "Humidity Monitoring",
      "UV Index Detection",
      "Smart Home Integration"
    ],
    
    connectivity: ["WiFi 6", "Zigbee 3.0", "Matter"],
    icon: Thermometer
  }
];

const technologies = [
  {
    name: "AI-Powered Analytics",
    description: "Machine learning algorithms for personalized health insights",
    icon: "🧠"
  },
  {
    name: "5G Connectivity",
    description: "Ultra-fast data transmission for real-time monitoring",
    icon: "📡"
  },
  {
    name: "Edge Computing",
    description: "Local processing for instant responses and privacy",
    icon: "⚡"
  },
  {
    name: "Quantum Sensors",
    description: "Next-gen sensors for unprecedented accuracy",
    icon: "🔬"
  }
];

export default function SmartGadgets() {
  const { t } = useTranslation();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <PublicSiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        {/* Compact Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-red-800/90"
            style={{
              backgroundImage: `url(${smartGadgetsImage})`,
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
                <source src="/videos/smart-gadgets-4k.mp4" type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-900/60 to-red-900/60" />
          </div>

          <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-white py-12">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7 space-y-6">
                <Badge className="inline-flex items-center gap-2 text-sm px-4 py-2 bg-white/20 backdrop-blur-sm text-white border-white/20">
                  <Smartphone className="h-4 w-4" />
                  Smart Innovation
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4">
                  Smart
                  <span className="block bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                    Gadgets
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl text-orange-100 leading-relaxed max-w-2xl">
                  Revolutionary health technology devices that seamlessly integrate into your daily life, providing real-time insights and intelligent health monitoring.
                </p>

                <div className="grid grid-cols-3 gap-4 py-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-300">24/7</div>
                    <div className="text-xs sm:text-sm text-orange-200">Monitoring</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-300">AI</div>
                    <div className="text-xs sm:text-sm text-orange-200">Powered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-red-300">5G</div>
                    <div className="text-xs sm:text-sm text-orange-200">Connected</div>
                  </div>
                </div>

                <div className="flex justify-center xl:justify-start">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-6 py-3">
                    Shop Devices <ArrowRight className="ml-2 h-4 w-4" />
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

        {/* Compact Smart Devices Grid */}
        <section className="py-12">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">
                Next-Gen Health Devices
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Cutting-edge smart gadgets designed to revolutionize personal health monitoring and wellness
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {smartDevices.map((device, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <CardHeader className="bg-gradient-to-br from-orange-50 to-red-50 pb-3">
                    <div className="bg-orange-100 rounded-xl p-3 w-fit mb-2">
                      <device.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 w-fit mb-2 text-xs">
                      {device.category}
                    </Badge>
                    <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                      {device.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2 text-gray-900 text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {device.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                              <Activity className="h-3 w-3 text-orange-500 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-1 text-gray-900 text-sm">Connectivity:</h4>
                        <div className="flex flex-wrap gap-1">
                          {device.connectivity.map((conn, i) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {conn}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-center pt-2 border-t">
                        <Button className="bg-orange-600 hover:bg-orange-700 w-full text-sm">
                          Pre-Order
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Technologies Section */}
        <section className="py-10 bg-white/80 backdrop-blur-sm">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
                Advanced Technologies
              </h2>
              <p className="text-lg text-gray-600">
                Powered by the latest innovations in health technology
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {technologies.map((tech, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg p-4 text-center hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-3xl mb-2">{tech.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-gray-600">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compact Connectivity Features */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid xl:grid-cols-12 gap-6 lg:gap-8 items-center">
              <div className="xl:col-span-7">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-900">
                  Seamless Connectivity
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  All devices feature advanced connectivity options for real-time data synchronization and smart home integration.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-sm">WiFi 6E</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bluetooth className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-sm">Bluetooth 5.2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-sm">5G Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Battery className="h-5 w-5 text-orange-500" />
                    <span className="font-medium text-sm">7-Day Battery</span>
                  </div>
                </div>
              </div>
              <div className="xl:col-span-5">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-center">
                    <div className="bg-orange-100 rounded-full p-4 mb-4 inline-block">
                      <Smartphone className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Smart Health App
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive mobile app for device management, health insights, and data visualization.
                    </p>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-sm">
                      Download App
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compact CTA Section */}
        <section className="py-12 bg-gradient-to-r from-orange-600 to-red-700 text-white">
          <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Experience the Future of Health Tech
            </h2>
            <p className="text-lg mb-6 text-orange-100">
              Join the smart health revolution with our cutting-edge connected devices
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-3">
                Shop Smart Gadgets <Smartphone className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-orange-600 hover:bg-white/10 text-lg px-8 py-3">
                Request Demo
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicSiteLayout>
  );
}