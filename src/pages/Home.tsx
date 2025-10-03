import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Building2, 
  TrendingUp, 
  Shield, 
  Users, 
  Star,
  CheckCircle,
  ArrowRight,
  Award,
  Target,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import corporateHqImage from "@/assets/corporate-headquarters-4k.jpg";
import globalNetworkImage from "@/assets/global-network-4k.jpg";
import manufacturingImage from "@/assets/manufacturing-facility-4k.jpg";
import b2bMeetingImage from "@/assets/b2b-executive-meeting-4k.jpg";
import { CertificationBadges } from "@/components/premium/CertificationBadges";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { PremiumFooter } from "@/components/premium/PremiumFooter";
import { PremiumVideoHero } from "@/components/premium/PremiumVideoHero";
import { PremiumProductCarousel } from "@/components/premium/PremiumProductCarousel";
import { PremiumCountryFlags } from "@/components/premium/PremiumCountryFlags";
import { PremiumTechShowcase } from "@/components/premium/PremiumTechShowcase";
import { PremiumTestimonials } from "@/components/premium/PremiumTestimonials";


const countries = [
  { name: "Estados Unidos", flag: "🇺🇸" },
  { name: "Brasil", flag: "🇧🇷" },
  { name: "China", flag: "🇨🇳" },
  { name: "Alemanha", flag: "🇩🇪" },
  { name: "Reino Unido", flag: "🇬🇧" },
  { name: "Japão", flag: "🇯🇵" },
  { name: "Canadá", flag: "🇨🇦" },
  { name: "França", flag: "🇫🇷" },
  { name: "Austrália", flag: "🇦🇺" },
  { name: "Singapura", flag: "🇸🇬" }
];

const businessSolutions = [
  {
    title: "B2B Global Trading",
    description: "Conectamos sua empresa a fornecedores globais de suplementos com margem premium",
    icon: Building2,
    features: ["Negociação automatizada", "Parcerias internacionais", "Logística integrada"],
    revenue: "$50K - $500K/mês"
  },
  {
    title: "Licitações Governamentais",
    description: "Sistema IA monitora contratos governamentais de saúde pública globalmente",
    icon: Shield,
    features: ["Monitoramento SAM.gov", "Compliance automático", "Propostas inteligentes"],
    revenue: "$100K - $2M/contrato"
  },
  {
    title: "B2C Premium Marketplace", 
    description: "Plataforma de venda direta com produtos Mycogenesis e suplementos premium",
    icon: Users,
    features: ["E-commerce integrado", "Marketing viral", "Dropshipping automatizado"],
    revenue: "$20K - $200K/mês"
  }
];

const stats = [
  { label: "Países Ativos", value: "50+", icon: Globe },
  { label: "Fornecedores Globais", value: "10K+", icon: Building2 },
  { label: "Revenue Anual", value: "$100M+", icon: TrendingUp },
  { label: "Contratos Ativos", value: "500+", icon: Award }
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation />
      
      {/* Clean Video Hero */}
      <PremiumVideoHero />
      
      {/* Clean Country Flags */}
      <PremiumCountryFlags />
      
      {/* Premium Product Carousel */}
      <PremiumProductCarousel />

      {/* Premium Technology Showcase */}
      <PremiumTechShowcase />

      {/* Premium Testimonials */}
      <PremiumTestimonials />


      {/* ACESSO AO SISTEMA QUÂNTICO - Link para Dashboard */}
      <div className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              🚀 SISTEMA QUÂNTICO ATIVO
            </h2>
            <p className="text-2xl text-blue-200 mb-6">
              Inteligência Artificial Gerando Milhões Automaticamente
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-8">
              Nosso sistema quântico está detectando e executando oportunidades de arbitragem B2B 24/7, 
              processando $7.8 trilhões em volume global com 94.7% de precisão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-2xl font-bold text-green-400">94.7%</div>
              <div className="text-sm text-gray-300">Precisão Quantum</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-2xl font-bold text-blue-400">2.3ms</div>
              <div className="text-sm text-gray-300">Execução Média</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🌍</div>
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="text-sm text-gray-300">Mercados Globais</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">🤖</div>
              <div className="text-2xl font-bold text-orange-400">84.7%</div>
              <div className="text-sm text-gray-300">Taxa Sucesso IA</div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8">
            <h3 className="text-2xl font-bold mb-6">🎯 Estratégias Baseadas em Dados Reais 2025:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400">156.7%</div>
                <div className="text-sm text-gray-300">Hardware Quantum</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400">67.8%</div>
                <div className="text-sm text-gray-300">Semicondutores</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400">52.6%</div>
                <div className="text-sm text-gray-300">Energia Renovável</div>
              </div>
            </div>
            
            <div className="text-left space-y-2 max-w-3xl mx-auto mb-6">
              <p className="text-lg">✅ Detecção de oportunidades com 94.7% de precisão</p>
              <p className="text-lg">✅ Execução automática em menos de 2.3ms</p>
              <p className="text-lg">✅ Negociações AI com 84.7% taxa de sucesso</p>
              <p className="text-lg">✅ Cobertura de 47 mercados globais</p>
              <p className="text-lg">✅ Processamento de $7.8 trilhões de volume B2B</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold">⚡ Para Começar a Lucrar:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <span className="font-semibold">Acesse o Dashboard Executivo</span>
                </div>
                <p className="text-sm text-gray-300">Entre no painel de controle para ver o sistema em ação</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <span className="font-semibold">Configure suas credenciais</span>
                </div>
                <p className="text-sm text-gray-300">Complete setup do Payoneer e SAM.gov para receber lucros</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <span className="font-semibold">Ative o Motor Quântico</span>
                </div>
                <p className="text-sm text-gray-300">Sistema detecta e executa oportunidades automaticamente</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <span className="font-semibold">Acompanhe Lucros</span>
                </div>
                <p className="text-sm text-gray-300">Veja resultados em tempo real no dashboard</p>
              </div>
            </div>

            <div className="pt-8">
              <Button 
                onClick={() => navigate('/')}
                size="lg" 
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white text-xl px-12 py-6 rounded-full hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="h-6 w-6 mr-3" />
                ACESSAR DASHBOARD EXECUTIVO
                <ArrowRight className="h-6 w-6 ml-3" />
              </Button>
              <p className="text-sm text-gray-400 mt-4">
                Sistema pronto para gerar milhões semanalmente através de arbitragem B2B automatizada!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CertificationBadges />
        </div>
      </div>

      <PremiumFooter />
    </div>
  );
}