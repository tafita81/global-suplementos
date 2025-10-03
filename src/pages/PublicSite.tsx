import { Button } from "@/components/ui/button";
import { 
  Globe, 
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { PremiumFooter } from "@/components/premium/PremiumFooter";
import { PremiumVideoHeroPublic } from "@/components/premium/PremiumVideoHeroPublic";
import { AdvancedProductCategories } from "@/components/premium/AdvancedProductCategories";
import { PremiumCountryFlags } from "@/components/premium/PremiumCountryFlags";
import { PremiumTechShowcase } from "@/components/premium/PremiumTechShowcase";
import { PremiumTestimonials } from "@/components/premium/PremiumTestimonials";
import { TechWellnessBundles } from "@/components/premium/TechWellnessBundles";
import { CertificationBadges } from "@/components/premium/CertificationBadges";

export default function PublicSite() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      
      {/* Hero Video Premium - Public Version */}
      <PremiumVideoHeroPublic />
      
      {/* Advanced Product Categories */}
      <AdvancedProductCategories />
      
      {/* Amazon Partnership Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-[#232F3E] to-[#131921] p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white px-4 py-2 rounded">
                      <svg className="h-8" viewBox="0 0 103 30" fill="none">
                        <path d="M63.3 24.2c-6.7 4.9-16.4 7.5-24.8 7.5-11.7 0-22.3-4.3-30.3-11.5-.6-.6-.1-1.4.7-.9 8.6 5 19.2 8 30.2 8 7.4 0 15.5-1.5 23-4.7 1.1-.5 2 .7.9 1.6z" fill="#FF9900"/>
                        <path d="M66 21.6c-.9-1.1-5.7-.5-7.8-.3-.7.1-.8-.5-.2-.9 3.8-2.7 10.1-1.9 10.8-1 .7.9-.2 7.2-3.8 10.2-.5.5-1.1.2-.8-.4.8-1.9 2.6-6.2 1.8-7.6z" fill="#FF9900"/>
                        <path d="M59.3 3.3V1.5c0-.3.2-.5.5-.5h9.3c.3 0 .5.2.5.5v1.5c0 .3-.2.6-.5.9l-4.8 6.9c1.8-.1 3.7.2 5.3 1 .4.2.5.4.5.7v1.9c0 .3-.4.7-.8.5-2.1-1.1-4.9-1.2-7.2.1-.4.2-.8-.2-.8-.5v-1.8c0-.4 0-.9.4-1.5l5.5-7.9h-4.8c-.3 0-.5-.2-.5-.5zM21.3 14.8h-2.4c-.2 0-.5-.2-.5-.4V1.6c0-.3.2-.5.5-.5h2.2c.2 0 .5.2.5.4v1.7h0c.6-1.7 1.8-2.5 3.4-2.5 1.6 0 2.6.8 3.3 2.5.6-1.7 2.1-2.5 3.6-2.5 1.1 0 2.3.5 3 1.4.8 1 .6 2.5.6 3.8v8c0 .3-.2.5-.5.5h-2.4c-.2 0-.5-.2-.5-.5V6.8c0-.8.1-2.7-.1-3.4-.3-1.2-1.2-1-2.3-1-1 0-2 .7-2.4 1.7-.4 1-.4 2.7-.4 3.8v6.4c0 .3-.2.5-.5.5h-2.4c-.2 0-.5-.2-.5-.5l0-7.9c0-1.7.3-4.1-2.4-4.1-2.7 0-2.6 3.1-2.6 4.1v7.9c0 .3-.2.5-.5.5zM78.9 .7c3.6 0 5.5 3.1 5.5 7 0 3.8-2.1 6.8-5.5 6.8-3.5 0-5.4-3.1-5.4-6.9 0-3.8 2-6.9 5.4-6.9zm0 2.5c-1.8 0-1.9 2.4-1.9 3.9 0 1.5 0 4.7 1.9 4.7 1.8 0 2-2.6 2-4.2 0-1-.1-2.3-.4-3.3-.3-.9-.8-1.2-1.6-1.2zm10.1 11.6h-2.4c-.2 0-.5-.2-.5-.5l0-12.7c0-.3.2-.5.5-.5h2.2c.2 0 .4.1.5.4v2h0c.8-1.8 1.9-2.7 3.7-2.7 1.2 0 2.4.4 3.2 1.6.7 1.1.7 2.9.7 4.2v8.3c0 .3-.2.5-.5.5h-2.4c-.2 0-.5-.2-.5-.5V6.6c0-1.7.2-4.1-1.9-4.1-.7 0-1.4.5-1.7 1.2-.4 1-.5 1.9-.5 2.9v7.7c0 .3-.2.5-.5.5z" fill="currentColor"/>
                      </svg>
                    </div>
                    <div className="h-8 w-px bg-white/30"></div>
                    <div>
                      <div className="text-sm text-blue-200">Official Partner</div>
                      <div className="text-xs text-gray-300">OneLink Global Program</div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Shop Amazon Global Supplements</h2>
                  <p className="text-gray-300 text-sm mb-4">Trusted worldwide delivery to 13 countries • Secure Amazon protection</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full">✓ Verified Partner</span>
                    <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">✓ Secure Payment</span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">✓ Buyer Protection</span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  <Button 
                    onClick={() => navigate('/amazon')}
                    className="bg-[#FF9900] hover:bg-[#F08804] text-black font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    <ShoppingCart className="mr-2 h-6 w-6" />
                    Browse Products
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span className="font-semibold">Amazon Verified</span>
                  </div>
                  <div className="h-4 w-px bg-gray-300"></div>
                  <div>Ships to: 🇨🇦 🇬🇧 🇩🇪 🇫🇷 🇮🇹 🇪🇸 🇯🇵 🇦🇺 🇳🇱 🇸🇪 🇸🇬 🇵🇱 🇸🇦</div>
                </div>
                <a 
                  href="https://affiliate-program.amazon.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  Verify Partnership
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tech & Wellness Bundles */}
      <TechWellnessBundles />
      
      {/* Country Flags Section */}
      <PremiumCountryFlags />


      {/* Premium Testimonials */}
      <PremiumTestimonials />



      {/* Certifications */}
      <CertificationBadges />

      <PremiumFooter />
    </div>
  );
}