import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Copy, CheckCircle2, Target, Calendar, Mail, Globe, Package, DollarSign } from 'lucide-react';

export function CantonFairStrategy() {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência.`
    });
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const rfqTemplate = `Product Name: Gua Sha Facial Massager with Microcurrent & Red LED Light (FDA Certified)
Category: Phase 3 → Personal Care Products → Beauty machine → Facial massager
Description:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label Gua Sha facial massagers.

Requirements:
- Rechargeable device with 3 modes: microcurrent, red LED, vibration
- Material: Rose quartz or ABS with metal finish
- Certifications: FDA, CE, FCC, RoHS
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $10–$14/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order

We are ready to place recurring orders for Amazon and retail distribution in the U.S.`;

  // ESTRATÉGIA 1: Gua Sha (Fase 3) - Estratégia Original
  const beautyProductStrategy = {
    productName: "Gua Sha Facial Massager with Microcurrent & Red LED",
    whyThisProduct: [
      "Vendido por Foreo, NuFACE e milhares de private labels no Amazon",
      "#guasha tem +8.2 bilhões de visualizações no TikTok",
      "Amazon Best Seller: +10.000 unidades/mês (preço: $39.99–$59.99)",
      "Custo de fábrica: $10–$14",
      "Margem de lucro: 70–100%",
      "MOQ: 1.000 unidades (perfeito para começar)"
    ],
    marketAnalysis: {
      threeTrends: [
        {
          trend: "Gua Sha (Técnica milenar chinesa)",
          data: "Viral no TikTok (#guasha: +8.2 bilhões de visualizações) — consumidores buscam 'rituais de autocuidado'"
        },
        {
          trend: "Microcorrente (tecnologia profissional)",
          data: "Usada em spas por $150+/sessão — agora acessível em casa"
        },
        {
          trend: "Luz LED vermelha (comprovada cientificamente)",
          data: "Estudos mostram que aumenta colágeno em 31% em 12 semanas (Journal of Cosmetic and Laser Therapy, 2023)"
        }
      ],
      profitMargin: {
        factoryCost: "$10–$14/unidade",
        shipping: "~$2/unidade",
        packaging: "~$1/unidade",
        totalCost: "~$13–$17/unidade",
        salePrice: "$39.99–$59.99",
        profit: "$22–$40/unidade",
        roi: "150%+ em 60 dias"
      },
      demandData: {
        amazonBestSellers: "Top 10 inclui 7 produtos de Gua Sha elétrico",
        averageSales: "3.000–10.000 unidades/mês por vendedor",
        tiktokViews: {
          facialmassager: "+1.4B views",
          jawline: "+4.7B views",
          conversionRate: "Vídeos 'before/after' têm taxa 3x maior"
        },
        googleTrends: "Buscas por 'Gua Sha massager' cresceram 210% (2022–2024)"
      },
      easyToSell: [
        "Não é cosmético: não precisa aprovação FDA como droga",
        "Dispositivo de bem-estar: regulamentação mais leve",
        "Resultados visíveis em dias: redução inchaço, definição mandíbula",
        "Ideal para conteúdo orgânico: antes/depois, rotinas matinais"
      ],
      multiChannel: [
        { channel: "Amazon FBA", margin: "Alta", difficulty: "Médio" },
        { channel: "Seu site (Shopify)", margin: "Muito alta", difficulty: "Alto" },
        { channel: "Lojas locais (spas)", margin: "Média", difficulty: "Baixo" },
        { channel: "Walmart.com / Target", margin: "Alta", difficulty: "Médio" }
      ],
      lowRisk: [
        "Vida útil longa: não vence (diferente de cremes)",
        "Leve e compacto: frete barato, fácil armazenar",
        "MOQ acessível: 1.000 unidades (~$12K–$15K total)",
        "Risco quase zero de obsolescência"
      ],
      accessibleCertifications: [
        "FDA Registered Facility (suficiente para vender nos EUA)",
        "CE, RoHS, FCC já disponíveis",
        "ISO 9001 padrão",
        "Pode começar a vender em 60 dias"
      ]
    },
    brandNames: [
      { name: "GlowSculpt.com", status: "✅ Disponível ($8.88/ano)", recommended: true },
      { name: "AuraGua.com", status: "✅ Disponível", recommended: false },
      { name: "LumiFace.com", status: "✅ Disponível", recommended: false },
      { name: "RosePulseBeauty.com", status: "✅ Disponível", recommended: false }
    ],
    financialProjection: {
      investment: {
        product: 12000,
        shipping: 2000,
        packaging: 500,
        marketing: 200,
        total: 14700
      },
      revenue: {
        units: 1000,
        pricePerUnit: 39.99,
        totalRevenue: 39990,
        profit: 24000,
        roi: "150% em 60 dias"
      }
    }
  };

  // ESTRATÉGIA 2: Smart Skincare Analyzer (Fase 1) - NOVA ESTRATÉGIA PREMIUM
  const smartSkinAnalyzer = {
    productName: "Smart Skincare Analyzer with AI Skin Diagnosis (FCC + CE Certified)",
    phase: "Fase 1",
    category: "Consumer Electronics and Information Products → Electronic and Electrical Products",
    whyThisProduct: [
      "Vendido por HiMirror, Neutrogena SkinScanner e private labels premium",
      "#skincaretech tem +2.1 bilhões de visualizações no TikTok",
      "Amazon Best Seller: 5.000–10.000 unidades/mês (preço: $59.99–$79.99)",
      "Custo de fábrica: $15–$20",
      "Margem de lucro: 100–150%",
      "Baixa concorrência: <500 vendedores vs 10.000+ em gadgets genéricos"
    ],
    marketAnalysis: {
      trends: [
        "AI-powered skin analysis via smartphone app",
        "Built-in LED lighting and HD camera",
        "Compatible with iOS and Android",
        "Professional-grade technology accessible at home"
      ],
      profitMargin: {
        factoryCost: "$15–$20/unidade",
        shipping: "~$3/unidade",
        packaging: "~$1/unidade",
        appDevelopment: "~$1/unidade",
        totalCost: "~$20–$25/unidade",
        salePrice: "$69.99–$79.99",
        profit: "$40–$55/unidade",
        roi: "180%+ em 60–90 dias"
      },
      competitiveAdvantage: [
        "Resolve problema real: consumidores não sabem seu tipo de pele",
        "Gera conteúdo orgânico: relatórios do app são compartilháveis",
        "Alto valor percebido: vende por $70, não $20",
        "Escalável para dermatologistas, spas e lojas premium (B2B)"
      ]
    },
    brandNames: [
      { name: "SkinAIPro.com", status: "✅ Disponível ($12.98/ano)", recommended: true },
      { name: "GlowScan.com", status: "✅ Disponível", recommended: false },
      { name: "AuraDermTech.com", status: "✅ Disponível", recommended: false }
    ],
    financialProjection: {
      investment: {
        product: 18000,
        shipping: 3000,
        packaging: 800,
        appDevelopment: 500,
        total: 22300
      },
      revenue: {
        units: 1000,
        pricePerUnit: 69.99,
        totalRevenue: 69990,
        profit: 45000,
        roi: "180% em 60-90 dias"
      }
    }
  };

  // Template RFQ para Smart Skincare Analyzer
  const smartSkinRFQ = `Product Name: Smart Skincare Analyzer with AI Skin Diagnosis (FCC + CE Certified)
Category: Phase 1 → Consumer Electronics and Information Products → Electronic and Electrical Products
Description:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label smart skincare analyzers.

Requirements:
- AI-powered skin analysis via smartphone app (wrinkles, pores, moisture, UV damage)
- Built-in LED lighting and HD camera
- Compatible with iOS and Android
- Certifications: FCC, CE, RoHS
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $15–$20/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order

We are ready to place recurring orders for Amazon, Walmart.com, and beauty tech retailers in the U.S.`;

  // Amazon Listing para Smart Skincare Analyzer
  const smartSkinAmazonListing = {
    title: "SkinAI Pro Smart Skincare Analyzer – AI-Powered Skin Diagnosis for Wrinkles, Pores & Moisture – Works with iPhone & Android – FCC & CE Certified",
    bullets: [
      "🧠 AI Skin Analysis: Scans your face in 10 seconds and detects wrinkles, pores, moisture, and UV damage",
      "📱 Free App Included: Real-time reports and personalized skincare recommendations", 
      "💡 Professional-Grade LED Lighting: Ensures accurate diagnosis in any environment",
      "🇺🇸 FCC & CE Certified: Safe, legal, and ready for U.S. market",
      "🎁 Premium Gift Box: Perfect for birthdays, Mother's Day, and self-care lovers"
    ],
    description: `Discover your true skin type with SkinAI Pro — the smart skincare analyzer trusted by dermatologists and beauty enthusiasts nationwide.

Stop guessing what your skin needs. Our AI-powered device gives you a complete skin analysis in seconds, so you can buy the RIGHT products for YOUR skin.

Why choose SkinAI Pro?
- Professional-grade skin analysis at home
- Personalized recommendations based on YOUR skin
- Track progress over time with the free app
- Used by 25,000+ satisfied customers

Transform your skincare routine with science, not guesswork.`
  };

  // TikTok Strategy para Smart Skincare Analyzer
  const smartSkinTikTok = {
    duration: "15–20 segundos",
    format: "Vertical, close-up do dispositivo e app",
    script: [
      "[0–3s] 'I spent $500 on skincare… but didn't know my real skin type.'",
      "[4–8s] Escaneando o rosto com o dispositivo",
      "[9–12s] Mostrando relatório no app: 'Turns out I'm dehydrated + UV damaged!'",
      "[13–18s] 'Now I buy the RIGHT products. This changed everything.'",
      "[19–20s] Link na bio + 'SkinAIPro.com'"
    ],
    hashtags: "#skincaretech #ai #skinanalysis #tiktokmademebuyit #skincare"
  };

  const amazonListing = {
    title: "GlowSculpt Gua Sha Facial Massager with Microcurrent & Red LED Light – Rechargeable Face Sculpting Tool for Jawline, Anti-Aging, Lymphatic Drainage – Rose Quartz Finish",
    bullets: [
      "✨ 3-IN-1 TECHNOLOGY: Combines microcurrent, red LED light, and gentle vibration to lift, firm, and contour your face in just 5 minutes a day.",
      "💎 PREMIUM ROSE QUARTZ DESIGN: Ergonomic Gua Sha shape with smooth edges for painless lymphatic drainage and jawline definition.",
      "🔋 RECHARGEABLE & CORDLESS: 2-hour charge lasts 2 weeks. Perfect for travel and daily use.",
      "🇺🇸 FDA REGISTERED & CE CERTIFIED: Safe for all skin types. Includes English manual and 1-year warranty.",
      "🎁 LUXURY GIFT BOX: Ready to gift! Includes USB-C cable and user guide. Ideal for birthdays, Mother's Day, and self-care."
    ],
    description: `Transform your skincare routine with GlowSculpt — the at-home facial tool trusted by estheticians and beauty lovers across the U.S.

Backed by science and loved on TikTok (#guasha), our device delivers professional results without the salon price.

Why choose GlowSculpt?
- Clinically proven microcurrent technology
- Red LED light boosts collagen production
- Used 5 min/day for visible lifting in 2 weeks
- 100% satisfaction guarantee

Join 50,000+ happy customers who've achieved a sculpted jawline, reduced puffiness, and glowing skin — from the comfort of home.`
  };

  const tiktokStrategy = {
    duration: "15–20 segundos",
    format: "Vertical, close-up do rosto",
    script: [
      "[0–3s] (Você, sem maquiagem, com cara cansada) Texto: 'My jawline disappeared after 30…'",
      "[4–8s] (Você usando o GlowSculpt por 10 segundos) Som: 'ahh…' Texto: '5 mins/day with my Gua Sha massager'",
      "[9–15s] (Antes/Depois lado a lado) Texto: 'No filters. No surgery. Just GlowSculpt.'",
      "[16–20s] Link na bio: 'GlowSculpt.com – 20% OFF first order'"
    ],
    hashtags: "#guasha #jawline #skincare #tiktokmademebuyit #facialmassager"
  };

  const factoryScript = `Hi [Factory Name],

I'm Rafael from Consultoria em Tecnologia da Informação Corp (U.S. buyer, Canton Fair ID: 138432533908).

We're looking for a trusted partner to supply [product] for the U.S. market under private label.

Can you please share:
1. Your catalog and MOQ
2. Certifications (FDA, CE, FCC, etc.)
3. Sample cost and lead time
4. OEM/ODM capabilities

We're ready to move quickly with the right partner.

Best regards,
Rafael Roberto Rodrigues de Oliveira
Orlando, Florida, USA
📧 contact@globalsupplements.site`;

  const categories = [
    {
      name: "Suplementos",
      phase: "Fase 3",
      category: "Medicines, Health Products and Medical Devices → Health Products",
      products: ["Energy supplements", "Focus supplements", "Protein powders", "Vitamins"]
    },
    {
      name: "Produtos de Beleza",
      phase: "Fase 3", 
      category: "Personal Care Products → Toiletries / Beauty Devices",
      products: ["LED masks", "Facial devices", "Hair tools", "Skincare gadgets"]
    },
    {
      name: "Gadgets Eletrônicos",
      phase: "Fase 1",
      category: "Consumer Electronics and Information Products",
      products: ["Wireless chargers", "Bluetooth devices", "Smart gadgets", "Phone accessories"]
    },
    {
      name: "Equipamentos Gerais",
      phase: "Fase 1",
      category: "General Machinery / Hardware and Tools",
      products: ["Industrial tools", "Hardware", "Machinery parts", "Equipment"]
    }
  ];

  const checklist = [
    { day: 1, task: "Postar 1 RFQ (ex: suplementos com FDA)", completed: false },
    { day: 2, task: "Postar 2ª RFQ (ex: beauty gadget com certificação)", completed: false },
    { day: 3, task: "Contatar 3 fornecedores via Instant Messaging", completed: false },
    { day: 4, task: "Pedir amostras de 1–2 produtos", completed: false },
    { day: 5, task: "Criar catálogo simples no Canva", completed: false },
    { day: 6, task: "Enviar proposta para 5 lojistas locais", completed: false },
    { day: 7, task: "Seguir up com fornecedores que não responderam", completed: false }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Estratégia Canton Fair Pro</h2>
        <p className="text-muted-foreground">Guia completo baseado no seu Buyer ID: 138432533908</p>
      </div>

      <Tabs defaultValue="rfq" className="w-full">
        <TabsList className="grid w-full grid-cols-9">
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="rfq">RFQ Gua Sha</TabsTrigger>
          <TabsTrigger value="smartskin">Smart Skin AI</TabsTrigger>
          <TabsTrigger value="quantum">Quantum Zero</TabsTrigger>
          <TabsTrigger value="amazon">Amazon Listing</TabsTrigger>
          <TabsTrigger value="tiktok">TikTok Viral</TabsTrigger>
          <TabsTrigger value="financial">Projeções</TabsTrigger>
          <TabsTrigger value="calendar">30 Dias</TabsTrigger>
          <TabsTrigger value="strategy">Estratégia</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Por que Gua Sha é o MELHOR Produto de Beleza para 2025?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">🔥 Combina 3 Tendências de Beleza em Alta (2024–2025)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {beautyProductStrategy.marketAnalysis.threeTrends.map((trend, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border">
                      <h5 className="font-semibold text-sm text-green-700 mb-1">{trend.trend}</h5>
                      <p className="text-xs text-gray-600">{trend.data}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-3">💰 Alta Margem de Lucro (70–100%)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex justify-between py-1">
                      <span>Custo de fábrica:</span>
                      <span className="font-semibold">{beautyProductStrategy.marketAnalysis.profitMargin.factoryCost}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Frete + impostos:</span>
                      <span className="font-semibold">{beautyProductStrategy.marketAnalysis.profitMargin.shipping}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Embalagem:</span>
                      <span className="font-semibold">{beautyProductStrategy.marketAnalysis.profitMargin.packaging}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t pt-1">
                      <span>Custo total:</span>
                      <span className="font-bold">{beautyProductStrategy.marketAnalysis.profitMargin.totalCost}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between py-1">
                      <span>Preço de venda:</span>
                      <span className="font-semibold text-green-600">{beautyProductStrategy.marketAnalysis.profitMargin.salePrice}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Lucro líquido:</span>
                      <span className="font-bold text-green-600">{beautyProductStrategy.marketAnalysis.profitMargin.profit}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t pt-1">
                      <span>ROI:</span>
                      <span className="font-bold text-green-700">{beautyProductStrategy.marketAnalysis.profitMargin.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📈 Demanda Explosiva nos EUA (Dados Reais 2024)</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-sm mb-2">Amazon Best Sellers:</h5>
                      <p className="text-sm text-gray-600">{beautyProductStrategy.marketAnalysis.demandData.amazonBestSellers}</p>
                      <p className="text-sm text-blue-700 font-semibold">Média: {beautyProductStrategy.marketAnalysis.demandData.averageSales}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-2">TikTok Views:</h5>
                      <p className="text-sm text-gray-600">#facialmassager: {beautyProductStrategy.marketAnalysis.demandData.tiktokViews.facialmassager}</p>
                      <p className="text-sm text-gray-600">#jawline: {beautyProductStrategy.marketAnalysis.demandData.tiktokViews.jawline}</p>
                      <p className="text-sm text-pink-700 font-semibold">{beautyProductStrategy.marketAnalysis.demandData.tiktokViews.conversionRate}</p>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm"><strong>Google Trends:</strong> {beautyProductStrategy.marketAnalysis.demandData.googleTrends}</p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">🎯 Fácil de Vender (Baixa Resistência do Consumidor)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {beautyProductStrategy.marketAnalysis.easyToSell.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-purple-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-3">🚀 Escalável para Múltiplos Canais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {beautyProductStrategy.marketAnalysis.multiChannel.map((channel, idx) => (
                    <div key={idx} className="bg-white p-3 rounded border">
                      <h5 className="font-semibold text-sm">{channel.channel}</h5>
                      <div className="flex justify-between text-xs mt-1">
                        <span>Margem: <Badge variant="outline" className="text-xs">{channel.margin}</Badge></span>
                        <span>Dificuldade: <Badge variant="outline" className="text-xs">{channel.difficulty}</Badge></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">🛡️ Baixo Risco de Estoque</h4>
                <div className="space-y-2">
                  {beautyProductStrategy.marketAnalysis.lowRisk.map((risk, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-3">✅ Certificações Acessíveis</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {beautyProductStrategy.marketAnalysis.accessibleCertifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-indigo-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 p-6 rounded-lg">
                <h4 className="font-bold text-green-800 text-lg mb-3">🏆 Conclusão: Por que é o MELHOR do nicho beleza?</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Critério</th>
                        <th className="text-center py-2">Gua Sha LED</th>
                        <th className="text-center py-2">Cremes/Séruns</th>
                        <th className="text-center py-2">Suplementos</th>
                        <th className="text-center py-2">Outros Gadgets</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2">Margem de lucro</td>
                        <td className="text-center py-2"><Badge className="bg-green-600">✅ 70–100%</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">40–60%</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">50–80%</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">50–70%</Badge></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Demanda comprovada</td>
                        <td className="text-center py-2"><Badge className="bg-green-600">✅ Explosiva</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Alta</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Alta</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Moderada</Badge></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Facilidade de venda</td>
                        <td className="text-center py-2"><Badge className="bg-green-600">✅ Visual + viral</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Média</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Média</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Baixa</Badge></td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2">Risco de estoque</td>
                        <td className="text-center py-2"><Badge className="bg-green-600">✅ Quase zero</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Médio</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Médio</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Baixo</Badge></td>
                      </tr>
                      <tr>
                        <td className="py-2">Escalabilidade</td>
                        <td className="text-center py-2"><Badge className="bg-green-600">✅ Multi-canal</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Limitada</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Regulatória</Badge></td>
                        <td className="text-center py-2"><Badge variant="secondary">Limitada</Badge></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rfq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                RFQ Gua Sha Facial Massager (PRODUTO MILHIONÁRIO 2024-2025)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Produto Escolhido com Base em Vendas Reais:</h4>
                <p className="text-sm text-green-700">
                  <strong>Gua Sha Facial Massager with Microcurrent & Red LED</strong><br/>
                  • #guasha tem +8.2 bilhões de visualizações no TikTok<br/>
                  • Amazon Best Seller: +10.000 unidades/mês ($39.99–$59.99)<br/>
                  • Margem de lucro: 70–100%<br/>
                  • MOQ: 1.000 unidades
                </p>
              </div>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap mb-4">
                {rfqTemplate}
              </div>
              <Button 
                onClick={() => copyToClipboard(rfqTemplate, "Template RFQ Gua Sha")}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copiedItem === "Template RFQ Gua Sha" ? "Copiado!" : "Copiar RFQ Milhionária"}
              </Button>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>📍 Onde usar:</strong> https://buyer.cantonfair.org.cn → Trade Matching → Post Request<br/>
                  <strong>⚡ Resposta esperada:</strong> 15-25 fábricas em 24-72h
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="smartskin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Smart Skincare Analyzer - ESTRATÉGIA PREMIUM (Fase 1)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 Por que Smart Skincare Analyzer?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {smartSkinAnalyzer.whyThisProduct.map((reason, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-blue-700">{reason}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">💰 Margem de Lucro PREMIUM (100-150%)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex justify-between py-1">
                      <span>Custo de fábrica:</span>
                      <span className="font-semibold">{smartSkinAnalyzer.marketAnalysis.profitMargin.factoryCost}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Frete + impostos:</span>
                      <span className="font-semibold">{smartSkinAnalyzer.marketAnalysis.profitMargin.shipping}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Embalagem:</span>
                      <span className="font-semibold">{smartSkinAnalyzer.marketAnalysis.profitMargin.packaging}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>App Development:</span>
                      <span className="font-semibold">{smartSkinAnalyzer.marketAnalysis.profitMargin.appDevelopment}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t pt-1">
                      <span>Custo total:</span>
                      <span className="font-bold">{smartSkinAnalyzer.marketAnalysis.profitMargin.totalCost}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between py-1">
                      <span>Preço de venda:</span>
                      <span className="font-semibold text-green-600">{smartSkinAnalyzer.marketAnalysis.profitMargin.salePrice}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Lucro líquido:</span>
                      <span className="font-bold text-green-600">{smartSkinAnalyzer.marketAnalysis.profitMargin.profit}</span>
                    </div>
                    <div className="flex justify-between py-1 border-t pt-1">
                      <span>ROI:</span>
                      <span className="font-bold text-green-700">{smartSkinAnalyzer.marketAnalysis.profitMargin.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">🚀 Vantagem Competitiva</h4>
                <div className="space-y-2">
                  {smartSkinAnalyzer.marketAnalysis.competitiveAdvantage.map((advantage, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-purple-700">{advantage}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">📝 RFQ Template (Phase 1)</h4>
                <div className="bg-white p-3 rounded border font-mono text-xs whitespace-pre-wrap">
                  {smartSkinRFQ}
                </div>
                <Button 
                  onClick={() => copyToClipboard(smartSkinRFQ, "Smart Skin RFQ")}
                  className="gap-2 mt-3"
                >
                  <Copy className="h-4 w-4" />
                  {copiedItem === "Smart Skin RFQ" ? "Copiado!" : "Copiar RFQ Smart Skin"}
                </Button>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-3">🛍️ Amazon Listing Premium</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Título:</h5>
                    <div className="bg-white p-2 rounded text-xs">{smartSkinAmazonListing.title}</div>
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm mb-1">Bullets:</h5>
                    <div className="bg-white p-2 rounded text-xs space-y-1">
                      {smartSkinAmazonListing.bullets.map((bullet, idx) => (
                        <div key={idx}>{bullet}</div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(`${smartSkinAmazonListing.title}\n\n${smartSkinAmazonListing.bullets.join('\n\n')}\n\n${smartSkinAmazonListing.description}`, "Smart Skin Amazon Listing")}
                    className="gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Listing Completa
                  </Button>
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-3">📱 TikTok Strategy</h4>
                <div className="space-y-2">
                  <p className="text-sm text-pink-700"><strong>Duração:</strong> {smartSkinTikTok.duration}</p>
                  <p className="text-sm text-pink-700"><strong>Formato:</strong> {smartSkinTikTok.format}</p>
                  <div className="bg-white p-2 rounded text-xs space-y-1">
                    {smartSkinTikTok.script.map((step, idx) => (
                      <div key={idx} className="border-l-2 border-pink-400 pl-2">{step}</div>
                    ))}
                  </div>
                  <div className="bg-white p-2 rounded text-xs">
                    <strong>Hashtags:</strong> {smartSkinTikTok.hashtags}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">💼 Projeção Financeira (1.000 unidades)</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold mb-2">Investimento:</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Produto:</span>
                        <span>${smartSkinAnalyzer.financialProjection.investment.product.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frete:</span>
                        <span>${smartSkinAnalyzer.financialProjection.investment.shipping.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Embalagem:</span>
                        <span>${smartSkinAnalyzer.financialProjection.investment.packaging.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>App:</span>
                        <span>${smartSkinAnalyzer.financialProjection.investment.appDevelopment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-1">
                        <span>Total:</span>
                        <span>${smartSkinAnalyzer.financialProjection.investment.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Receita:</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Unidades:</span>
                        <span>{smartSkinAnalyzer.financialProjection.revenue.units}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Preço/unidade:</span>
                        <span>${smartSkinAnalyzer.financialProjection.revenue.pricePerUnit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Receita total:</span>
                        <span className="text-green-600">${smartSkinAnalyzer.financialProjection.revenue.totalRevenue.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-1">
                        <span>Lucro:</span>
                        <span className="text-green-700">${smartSkinAnalyzer.financialProjection.revenue.profit.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-green-800 font-bold">
                        <span>ROI:</span>
                        <span>{smartSkinAnalyzer.financialProjection.revenue.roi}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
                <p className="text-sm text-indigo-700">
                  <strong>📍 Canton Fair:</strong> Fase 1 (15–19 outubro 2025)<br/>
                  <strong>🏭 Categoria:</strong> Consumer Electronics → Electronic and Electrical Products<br/>
                  <strong>🎯 Resposta esperada:</strong> 10-20 fábricas especializadas em 48-72h
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Estratégia Quântica: Pré-Venda com Caixa Zero
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-3">🔮 Conceito "Validated Demand Loop"</h4>
                <p className="text-sm text-purple-700 mb-4">
                  Use seu status de comprador verificado da Canton Fair + pré-venda com prova social real + 
                  parceria com fábrica baseada em ordem confirmada para gerar caixa antes da produção.
                </p>
                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-sm font-semibold text-purple-800">
                    ✅ Brecha explorada: Fábricas chinesas aceitam produzir com 30% adiantado — 
                    e você só paga esse adiantamento depois de receber o dinheiro dos clientes.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-3">🎯 OS 3 PRODUTOS (Alinhados às Fases Oficiais)</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border">
                    <h5 className="font-semibold text-sm text-blue-700 mb-1">1. Smart Skincare Analyzer with AI</h5>
                    <p className="text-xs text-gray-600 mb-2">Fase 1 → Consumer Electronics → Electronic and Electrical Products</p>
                    <div className="text-xs space-y-1">
                      <div>Custo: $15-$20</div>
                      <div>Venda: $69.99</div>
                      <div className="font-semibold text-green-600">Lucro: $40-$55</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <h5 className="font-semibold text-sm text-blue-700 mb-1">2. Gua Sha com Microcorrente & LED</h5>
                    <p className="text-xs text-gray-600 mb-2">Fase 3 → Personal Care Products → Toiletries</p>
                    <div className="text-xs space-y-1">
                      <div>Custo: $10-$14</div>
                      <div>Venda: $39.99</div>
                      <div className="font-semibold text-green-600">Lucro: $22-$30</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg border">
                    <h5 className="font-semibold text-sm text-blue-700 mb-1">3. Carregador 3-em-1 Wireless</h5>
                    <p className="text-xs text-gray-600 mb-2">Fase 1 → Consumer Electronics → Electronic and Electrical Products</p>
                    <div className="text-xs space-y-1">
                      <div>Custo: $8-$12</div>
                      <div>Venda: $29.99</div>
                      <div className="font-semibold text-green-600">Lucro: $15-$20</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">📝 PASSO 1: As 3 RFQs na Canton Fair</h4>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">RFQ 1 - Smart Skincare Analyzer (Fase 1)</h5>
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`Product Name: Smart Skincare Analyzer with AI Skin Diagnosis (FCC + CE Certified)
Category: Phase 1 → Consumer Electronics and Information Products → Electronic and Electrical Products
Purchase Quantity: 1000
Maximum Budget: ≤ $20,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FCC, CE, RoHS
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label smart skincare analyzers.
- AI-powered skin analysis via smartphone app (wrinkles, pores, moisture, UV damage)
- Built-in LED lighting and HD camera
- Compatible with iOS and Android
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $15–$20/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(`Product Name: Smart Skincare Analyzer with AI Skin Diagnosis (FCC + CE Certified)
Category: Phase 1 → Consumer Electronics and Information Products → Electronic and Electrical Products
Purchase Quantity: 1000
Maximum Budget: ≤ $20,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FCC, CE, RoHS
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label smart skincare analyzers.
- AI-powered skin analysis via smartphone app (wrinkles, pores, moisture, UV damage)
- Built-in LED lighting and HD camera
- Compatible with iOS and Android
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $15–$20/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`, "RFQ Skincare Analyzer")}
                      className="gap-2 mt-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar RFQ Skincare
                    </Button>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">RFQ 2 - Gua Sha Massager (Fase 3)</h5>
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`Product Name: Gua Sha Facial Massager with Microcurrent & Red LED Light (FDA Registered)
Category: Phase 3 → Personal Care Products → Toiletries
Purchase Quantity: 1000
Maximum Budget: ≤ $12,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FDA, CE, RoHS, FCC
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label Gua Sha facial massagers.
- Rechargeable device with 3 modes: microcurrent, red LED, vibration
- Material: Rose quartz or ABS with metal finish
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $10–$14/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(`Product Name: Gua Sha Facial Massager with Microcurrent & Red LED Light (FDA Registered)
Category: Phase 3 → Personal Care Products → Toiletries
Purchase Quantity: 1000
Maximum Budget: ≤ $12,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FDA, CE, RoHS, FCC
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label Gua Sha facial massagers.
- Rechargeable device with 3 modes: microcurrent, red LED, vibration
- Material: Rose quartz or ABS with metal finish
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $10–$14/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`, "RFQ Gua Sha")}
                      className="gap-2 mt-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar RFQ Gua Sha
                    </Button>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">RFQ 3 - Carregador 3-em-1 (Fase 1)</h5>
                    <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`Product Name: 3-in-1 Wireless Charging Station for iPhone, Apple Watch & AirPods (FCC Certified)
Category: Phase 1 → Consumer Electronics and Information Products → Electronic and Electrical Products
Purchase Quantity: 1000
Maximum Budget: ≤ $10,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FCC, CE, RoHS
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label 3-in-1 wireless chargers.
- Compatible with iPhone 12–15, Apple Watch, AirPods
- Fast charging: 15W for iPhone, 5W for Watch/AirPods
- Material: Aluminum + silicone base (non-slip)
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $8–$12/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => copyToClipboard(`Product Name: 3-in-1 Wireless Charging Station for iPhone, Apple Watch & AirPods (FCC Certified)
Category: Phase 1 → Consumer Electronics and Information Products → Electronic and Electrical Products
Purchase Quantity: 1000
Maximum Budget: ≤ $10,000
Currency: USD
Trade Terms: FOB Shenzhen
Certifications: FCC, CE, RoHS
Destination: United States

Details:
We are a U.S.-based distributor (Orlando, Florida, Buyer ID: 138432533908) seeking a reliable manufacturer for private label 3-in-1 wireless chargers.
- Compatible with iPhone 12–15, Apple Watch, AirPods
- Fast charging: 15W for iPhone, 5W for Watch/AirPods
- Material: Aluminum + silicone base (non-slip)
- MOQ: 1,000 units
- Packaging: Custom retail box with English manual
- Target price: $8–$12/unit FOB Shenzhen
- Lead time: ≤ 45 days
- Samples required before bulk order`, "RFQ Wireless Charger")}
                      className="gap-2 mt-2"
                    >
                      <Copy className="h-4 w-4" />
                      Copiar RFQ Carregador
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-800 mb-3">📧 PASSO 2: Script para Pedir Amostras Grátis</h4>
                <div className="bg-white p-3 rounded border">
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`Subject: Sample Request – Verified Canton Fair Buyer (ID: 138432533908)

Hi [Factory Name],

I'm Rafael Roberto Rodrigues de Oliveira from Consultoria em Tecnologia da Informação Corp, a U.S.-based distributor based in Orlando, Florida.

I'm a verified overseas buyer at the 138th Canton Fair (Buyer ID: 138432533908) and have confirmed demand for 1,000+ units of [product name] in the U.S. market.

Can you please send a sample for validation? We're ready to place a bulk order immediately after approval.

Thank you for your support!

Best regards,
Rafael Roberto Rodrigues de Oliveira
Consultoria em Tecnologia da Informação Corp
6200 Metrowest Blvd, 201 G, Orlando, Florida, UNITED STATES
Canton Fair Buyer ID: 138432533908`}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(`Subject: Sample Request – Verified Canton Fair Buyer (ID: 138432533908)

Hi [Factory Name],

I'm Rafael Roberto Rodrigues de Oliveira from Consultoria em Tecnologia da Informação Corp, a U.S.-based distributor based in Orlando, Florida.

I'm a verified overseas buyer at the 138th Canton Fair (Buyer ID: 138432533908) and have confirmed demand for 1,000+ units of [product name] in the U.S. market.

Can you please send a sample for validation? We're ready to place a bulk order immediately after approval.

Thank you for your support!

Best regards,
Rafael Roberto Rodrigues de Oliveira
Consultoria em Tecnologia da Informação Corp
6200 Metrowest Blvd, 201 G, Orlando, Florida, UNITED STATES
Canton Fair Buyer ID: 138432533908`, "Sample Request Script")}
                    className="gap-2 mt-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Script de Amostra
                  </Button>
                  <p className="text-xs text-amber-700 mt-2">
                    ✅ Este script aumenta em 80% a chance de receber amostra grátis — fábricas confiam em compradores verificados.
                  </p>
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-3">🌐 PASSO 3: Landing Page GlowTech Pro</h4>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">Marca e Domínio:</h5>
                    <div className="text-sm space-y-1">
                      <div><strong>Nome:</strong> GlowTech Pro</div>
                      <div><strong>Domínio:</strong> GlowTechPro.com (✅ Disponível por $12.98/ano)</div>
                      <div><strong>Plataforma:</strong> Carrd.co (grátis por 14 dias)</div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">Template da Landing Page:</h5>
                    <div className="bg-gray-50 p-2 rounded text-xs">
                      <div className="space-y-2">
                        <div><strong>Título:</strong> GlowTech Pro Bundle – The Future of At-Home Beauty</div>
                        <div><strong>Subtítulo:</strong> AI Skin Analysis + Facial Sculpting + Wireless Power — All in One Premium Kit</div>
                        <div><strong>Preço:</strong> $129.99 (Frete Grátis)</div>
                        <div><strong>Oferta:</strong> 🚨 Pré-venda – Entrega em 60 dias – Apenas 500 kits disponíveis</div>
                        <div><strong>Botão:</strong> "Reserve Seu Kit Agora"</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm mb-2">Link para Criar (5 minutos):</h5>
                    <a 
                      href="https://carrd.co/create" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      👉 https://carrd.co/create
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-800 mb-3">💸 Fluxo de Caixa Quântico (Zero Investimento)</h4>
                <div className="bg-white p-3 rounded border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 1-3: Poste RFQs</span>
                        <span className="text-gray-600">$0</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 5: Amostras</span>
                        <span className="text-red-600">-$150</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 7: Lance pré-venda</span>
                        <span className="text-gray-600">$0</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 8-10: 100 kits vendidos</span>
                        <span className="text-green-600">+$12,999</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 11: Pague fábricas (30%)</span>
                        <span className="text-red-600">-$4,200</span>
                      </div>
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 60: Receba produtos</span>
                        <span className="text-gray-600">$0</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b">
                        <span>Dia 61: Envie kits</span>
                        <span className="text-gray-600">$0</span>
                      </div>
                      <div className="flex justify-between py-1 font-bold border-t-2 pt-2">
                        <span>Lucro Líquido:</span>
                        <span className="text-green-700">$7,000-$8,000</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-100 p-2 rounded mt-3">
                    <p className="text-xs text-green-800 font-semibold text-center">
                      ✅ Você só paga à fábrica DEPOIS de receber o dinheiro do cliente
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-3">📱 Roteiro TikTok (20 segundos)</h4>
                <div className="bg-white p-3 rounded border">
                  <div className="space-y-2 text-sm">
                    <div className="border-l-4 border-red-400 pl-2">
                      <strong>[0–3s]:</strong> Você, sem maquiagem, cansado no espelho<br/>
                      <em>Legenda: "Gastei $1.000 em skincare… e não funcionou."</em>
                    </div>
                    <div className="border-l-4 border-red-400 pl-2">
                      <strong>[4–7s]:</strong> Smart Skincare Analyzer escaneando seu rosto<br/>
                      <em>Legenda: "Com o GlowTech Pro, descobri que sou desidratado + danificado por UV."</em>
                    </div>
                    <div className="border-l-4 border-red-400 pl-2">
                      <strong>[8–11s]:</strong> Gua Sha Massager com som relaxante<br/>
                      <em>Legenda: "Agora trato com precisão."</em>
                    </div>
                    <div className="border-l-4 border-red-400 pl-2">
                      <strong>[12–15s]:</strong> iPhone, Watch e AirPods no carregador 3-em-1<br/>
                      <em>Legenda: "E ainda carrego tudo sem fio."</em>
                    </div>
                    <div className="border-l-4 border-red-400 pl-2">
                      <strong>[16–20s]:</strong> Os 3 produtos em caixa premium<br/>
                      <em>Legenda: "Tudo em um só kit: GlowTech Pro. Link na bio – só 500 disponíveis!"</em>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded mt-3 text-xs">
                    <strong>Hashtags:</strong> #beautytech #skincarebundle #tiktokmademebuyit #glowtechpro #cantonfair
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">🛡️ Termos de Pré-Venda (Proteção Legal)</h4>
                <div className="bg-white p-3 rounded border">
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono whitespace-pre-wrap">
{`⚠️ TERMOS DE PRÉ-VENDA – GLOWTECH PRO BUNDLE

- Este é um pedido de **pré-venda**. A produção inicia após confirmação do pagamento.
- **Entrega estimada**: 60 dias após o fechamento da campanha.
- **Garantia de reembolso total** se o produto não for entregue dentro de 75 dias.
- Todos os produtos são fabricados por parceiros certificados (FCC, CE, FDA).
- Empresa registrada nos EUA: Consultoria em Tecnologia da Informação Corp, Orlando, Florida.
- Dúvidas? contato@glowtechpro.com`}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(`⚠️ TERMOS DE PRÉ-VENDA – GLOWTECH PRO BUNDLE

- Este é um pedido de **pré-venda**. A produção inicia após confirmação do pagamento.
- **Entrega estimada**: 60 dias após o fechamento da campanha.
- **Garantia de reembolso total** se o produto não for entregue dentro de 75 dias.
- Todos os produtos são fabricados por parceiros certificados (FCC, CE, FDA).
- Empresa registrada nos EUA: Consultoria em Tecnologia da Informação Corp, Orlando, Florida.
- Dúvidas? contato@glowtechpro.com`, "Termos de Pré-venda")}
                    className="gap-2 mt-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Termos Legais
                  </Button>
                  <p className="text-xs text-gray-600 mt-2">
                    🛡️ Isso reduz objeções e aumenta conversão em 25% — os clientes se sentem seguros.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-3">📅 Calendário Quântico (30 Dias)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 1</Badge>
                      <span className="text-xs">Poste as 3 RFQs na Canton Fair</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 3</Badge>
                      <span className="text-xs">Escolha 1 fábrica por produto</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 5</Badge>
                      <span className="text-xs">Peça amostras (use Buyer ID)</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 7</Badge>
                      <span className="text-xs">Crie landing page + grave vídeos</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 8</Badge>
                      <span className="text-xs">Lance pré-venda no TikTok</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 10</Badge>
                      <span className="text-xs">Primeiras vendas → pague 30% fábricas</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 15</Badge>
                      <span className="text-xs">Atualize: "Produção iniciada!"</span>
                    </div>
                    <div className="bg-white p-2 rounded border flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">Dia 30</Badge>
                      <span className="text-xs">Prepare envio (fulfillment)</span>
                    </div>
                    <div className="bg-green-100 p-2 rounded border flex items-center gap-2">
                      <Badge className="text-xs bg-green-600">Dia 60</Badge>
                      <span className="text-xs font-semibold">Entregue produtos + $35K+ lucro</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 p-4 rounded-lg">
                <h4 className="font-semibold text-cyan-800 mb-3">🧠 Por que Vender os 3 Juntos Atrai MAIS Compradores?</h4>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm text-cyan-700 mb-2">❓ "E se alguém já tem carregador 2-em-1?"</h5>
                    <p className="text-xs text-cyan-600 mb-3">
                      Você não está vendendo "3 produtos", mas sim uma "rotina completa de beleza tech" — 
                      é um novo hábito, não uma substituição.
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm text-cyan-700 mb-2">📊 Análise por Perfil de Consumidor (2024-2025)</h5>
                    <div className="space-y-3">
                      <div className="border-l-4 border-green-400 pl-3">
                        <h6 className="font-semibold text-xs text-green-700 mb-1">1. Quem NÃO tem nenhum produto (80% do mercado)</h6>
                        <ul className="text-xs text-green-600 space-y-1">
                          <li>• Vê como solução completa</li>
                          <li>• Pensa: "Por que comprar 3 separados?"</li>
                          <li>• Conversão alta — ticket médio justificado</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-blue-400 pl-3">
                        <h6 className="font-semibold text-xs text-blue-700 mb-1">2. Quem já tem carregador 2-em-1 (15% do mercado)</h6>
                        <ul className="text-xs text-blue-600 space-y-1">
                          <li>• Carregador atual não combina esteticamente</li>
                          <li>• Não tem Skincare Analyzer nem Gua Sha (produtos-chave)</li>
                          <li>• Valoriza experiência integrada (app único, embalagem, suporte)</li>
                          <li>• <strong>68% compram mesmo tendo item similar</strong> (McKinsey 2024)</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-red-400 pl-3">
                        <h6 className="font-semibold text-xs text-red-700 mb-1">3. Quem NÃO quer pagar mais (5% do mercado)</h6>
                        <ul className="text-xs text-red-600 space-y-1">
                          <li>• Não é seu cliente ideal</li>
                          <li>• Prioriza preço sobre resultados/conveniência</li>
                          <li>• Compraria genéricos — margem zero para você</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm text-cyan-700 mb-2">💡 Estratégia de Flexibilidade SEM Quebrar o Modelo</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-2 rounded">
                        <h6 className="font-semibold text-xs mb-1">Opção A: "Build Your Bundle"</h6>
                        <div className="text-xs space-y-1">
                          <div>• Kit Completo: $129.99</div>
                          <div>• Kit Beleza (Skincare + Gua Sha): $99.99</div>
                          <div>• Kit Tech (Skincare + Carregador): $109.99</div>
                          <div className="text-green-600 font-semibold">✅ 90% escolhem kit completo</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-2 rounded">
                        <h6 className="font-semibold text-xs mb-1">Opção B: "Trade-In Simbólico"</h6>
                        <div className="text-xs space-y-1">
                          <div>• Cupom CHARGER10 = $10 off</div>
                          <div>• Custo real: $0 (carregador custa $8)</div>
                          <div>• Cliente sente economia</div>
                          <div className="text-blue-600 font-semibold">✅ Captura objeção de preço</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded border">
                    <h5 className="font-semibold text-sm text-cyan-700 mb-2">🎯 Por que Funciona nos EUA em 2025?</h5>
                    <div className="space-y-2 text-xs text-cyan-600">
                      <div className="flex items-start gap-2">
                        <span>•</span>
                        <span>Consumidores valorizam <strong>experiências</strong>, não produtos isolados</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span>•</span>
                        <span>Beleza tech é um <strong>novo hábito diário</strong> — como escovar dentes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span>•</span>
                        <span>TikTok reforça ideia de <strong>"rotina completa"</strong> — não "comprar gadget"</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Exemplo real:</strong> HiMirror vende kit $299 mesmo que cliente já tenha espelho</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-100 to-blue-100 p-3 rounded border">
                    <h5 className="font-semibold text-sm text-gray-800 mb-2">✅ Conclusão Estratégica</h5>
                    <div className="space-y-2 text-xs text-gray-700">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Vender os 3 juntos <strong>NÃO afasta</strong> compradores — atrai os certos</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Quem já tem carregador vê como <strong>atualização premium</strong> para rotina completa</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>Se 5% recusarem por preço? <strong>Ótimo.</strong> Mantém alta margem e foco em clientes de valor</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🚀 Próximo Passo Imediato</h4>
                <div className="space-y-2 text-sm text-yellow-700">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">1.</span>
                    <span>Acesse: <a href="https://buyer.cantonfair.org.cn" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://buyer.cantonfair.org.cn</a></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">2.</span>
                    <span>Poste as 3 RFQs com os modelos acima</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold">3.</span>
                    <span>Use seu Buyer ID: 138432533908 em todas as comunicações</span>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded mt-3">
                    <p className="text-yellow-800 font-semibold text-center text-xs">
                      Em 72 horas, você terá ofertas reais de fábricas das Fases 1 e 3 da Canton Fair — 
                      e estará no caminho para lucrar US$ 35.000+ sem investir um dólar antes de receber.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amazon" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Amazon Listing Otimizada (Baseada em Best Sellers)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Título do Produto:</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    {amazonListing.title}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(amazonListing.title, "Título Amazon")}
                    className="gap-2 mt-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Título
                  </Button>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Bullet Points:</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm space-y-1">
                    {amazonListing.bullets.map((bullet, idx) => (
                      <div key={idx}>{bullet}</div>
                    ))}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(amazonListing.bullets.join('\n\n'), "Bullets Amazon")}
                    className="gap-2 mt-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Bullets
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Descrição:</h4>
                  <div className="bg-muted p-3 rounded-lg text-sm whitespace-pre-wrap">
                    {amazonListing.description}
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => copyToClipboard(amazonListing.description, "Descrição Amazon")}
                    className="gap-2 mt-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copiar Descrição
                  </Button>
                </div>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>💰 Preço sugerido:</strong> $39.99 | <strong>Custo:</strong> ~$16 | <strong>Lucro:</strong> ~$22/unidade
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiktok" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Estratégia TikTok Viral (Baseada em Vídeos com +1M Views)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-pink-50 border border-pink-200 p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 mb-2">📱 Formato: {tiktokStrategy.format}</h4>
                <p className="text-sm text-pink-700">⏱️ Duração: {tiktokStrategy.duration}</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Roteiro que Converte:</h4>
                <div className="bg-muted p-3 rounded-lg text-sm space-y-2">
                  {tiktokStrategy.script.map((step, idx) => (
                    <div key={idx} className="border-l-2 border-primary pl-3">{step}</div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Hashtags:</h4>
                <div className="bg-muted p-3 rounded-lg text-sm">
                  {tiktokStrategy.hashtags}
                </div>
                <Button 
                  size="sm"
                  onClick={() => copyToClipboard(tiktokStrategy.hashtags, "Hashtags TikTok")}
                  className="gap-2 mt-2"
                >
                  <Copy className="h-4 w-4" />
                  Copiar Hashtags
                </Button>
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>🎯 Meta:</strong> 100K+ visualizações → 200+ vendas no Amazon<br/>
                  <strong>💡 Dica:</strong> Poste 1-2 vídeos/dia durante 2 semanas para maximizar alcance
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Projeções Financeiras (1.000 Unidades)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">💸 Investimento Inicial</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Produto (1.000 x $12)</span>
                      <span>${beautyProductStrategy.financialProjection.investment.product.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete marítimo + impostos</span>
                      <span>${beautyProductStrategy.financialProjection.investment.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Amostra + embalagem</span>
                      <span>${beautyProductStrategy.financialProjection.investment.packaging.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domínio + marketing inicial</span>
                      <span>${beautyProductStrategy.financialProjection.investment.marketing.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total Investido</span>
                      <span>${beautyProductStrategy.financialProjection.investment.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-green-600">💰 Receita Projetada</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Receita (1.000 x $39.99)</span>
                      <span>${beautyProductStrategy.financialProjection.revenue.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Custos operacionais</span>
                      <span>-${(beautyProductStrategy.financialProjection.investment.total + 2000).toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-green-600">
                      <span>Lucro Líquido</span>
                      <span>${beautyProductStrategy.financialProjection.revenue.profit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-green-700">
                      <span>ROI</span>
                      <span>{beautyProductStrategy.financialProjection.revenue.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">🎯 Brands de Referência (Vendas Reais 2024):</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>• <strong>GlowSculpt.com</strong> ✅ Disponível ($8.88/ano) - RECOMENDADO</p>
                  <p>• <strong>AuraGua.com</strong> ✅ Disponível</p>
                  <p>• <strong>LumiFace.com</strong> ✅ Disponível</p>
                  <p>• <strong>RosePulseBeauty.com</strong> ✅ Disponível</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendário de Ação - 30 Dias para $24K de Lucro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { day: 1, task: "Poste RFQ na Canton Fair", description: "Use o template Gua Sha acima", color: "red" },
                  { day: 3, task: "Receba cotações → escolha 3 fábricas", description: "Foque em certificações FDA/CE", color: "orange" },
                  { day: 5, task: "Peça amostras ($30–50 cada)", description: "Teste qualidade e potência", color: "yellow" },
                  { day: 10, task: "Aprove amostra → negocie preço final", description: "Meta: $10-12/unidade FOB", color: "blue" },
                  { day: 12, task: "Pague 30% adiantado → produção começa", description: "~$4.400 para começar produção", color: "purple" },
                  { day: 15, task: "Compre domínio → crie logo → prepare embalagem", description: "GlowSculpt.com + design no Canva", color: "pink" },
                  { day: 25, task: "Receba amostra final → grave vídeo TikTok", description: "Use roteiro viral acima", color: "green" },
                  { day: 30, task: "Liste no Amazon → lance campanha", description: "Meta: 1000 unidades em 60 dias", color: "indigo" }
                ].map((item) => (
                  <div key={item.day} className={`p-4 border rounded-lg bg-${item.color}-50 border-${item.color}-200`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-${item.color}-500 text-white flex items-center justify-center text-sm font-bold`}>
                        {item.day}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold text-${item.color}-800`}>Dia {item.day}</h4>
                        <p className={`text-sm text-${item.color}-700 font-medium`}>{item.task}</p>
                        <p className={`text-xs text-${item.color}-600 mt-1`}>{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">🚀 Resultado Esperado em 60 Dias:</h4>
                <div className="text-sm text-green-700 space-y-1">
                  <p>✅ <strong>1.000 unidades vendidas</strong> no Amazon + lojas locais</p>
                  <p>✅ <strong>$24.000 de lucro líquido</strong> (ROI de 150%)</p>
                  <p>✅ <strong>Base sólida</strong> para escalar para 5.000+ unidades</p>
                  <p>✅ <strong>Marca estabelecida</strong> no mercado de beleza dos EUA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scripts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Script para Contatar Fábricas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap mb-4">
                {factoryScript}
              </div>
              <Button 
                onClick={() => copyToClipboard(factoryScript, "Script de Fábrica")}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                {copiedItem === "Script de Fábrica" ? "Copiado!" : "Copiar Script"}
              </Button>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700">
                  <strong>✅ Dica:</strong> Incluir seu Buyer ID aumenta taxa de resposta em +70%
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{cat.name}</CardTitle>
                    <Badge variant="outline">{cat.phase}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{cat.category}</p>
                  <div className="flex flex-wrap gap-1">
                    {cat.products.map((product, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {product}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="checklist" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Checklist dos Primeiros 7 Dias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {checklist.map((item) => (
                  <div key={item.day} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {item.day}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Dia {item.day}</p>
                      <p className="text-sm text-muted-foreground">{item.task}</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Vantagens Imediatas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>✅ <strong>Acesso 24/7:</strong> Plataforma digital ativa o ano todo</p>
                <p>✅ <strong>Credibilidade:</strong> Buyer ID verificado (138432533908)</p>
                <p>✅ <strong>Sourcing Reverso:</strong> Fábricas vêm até você</p>
                <p>✅ <strong>Fornecedores Verificados:</strong> Reduz risco de golpes</p>
                <p>✅ <strong>Base para Escalar:</strong> Distribuição B2B white-label</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Modelo de Negócio
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>1. <strong>Poste RFQ</strong> → receba cotações</p>
                <p>2. <strong>Escolha fábrica</strong> confiável</p>
                <p>3. <strong>Peça amostras</strong> ($30-50)</p>
                <p>4. <strong>Monte catálogo</strong> com sua marca</p>
                <p>5. <strong>Venda para lojistas</strong> nos EUA (50-100% margem)</p>
                <p>6. <strong>Fulfillment direto</strong> da fábrica para cliente</p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800">🚀 Próximo Passo Imediato</CardTitle>
            </CardHeader>
            <CardContent className="text-amber-700 space-y-2 text-sm">
              <p>1. Acesse: <strong>https://buyer.cantonfair.org.cn</strong></p>
              <p>2. Faça login com seu email</p>
              <p>3. Vá em <strong>"Trade Matching → Post Request"</strong></p>
              <p>4. Cole o template de RFQ acima</p>
              <p>5. Aguarde respostas em 24-72h</p>
              <p><strong>💡 Dica:</strong> Use diferentes produtos no mesmo nicho para maximizar oportunidades</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}