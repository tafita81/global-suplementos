import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "react-i18next";
import {
  FileText,
  Shield,
  Globe,
  Factory,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Brain,
  Heart,
  Dumbbell,
  Leaf,
  Sparkles,
  Diamond,
  Crown,
  Star,
  ChevronRight,
  Download,
  Award,
  Gavel,
  Building,
  Truck,
  Users,
  Target,
  Zap,
  TrendingUp
} from "lucide-react";

interface DetailedProduct {
  id: string;
  name: string;
  category: string;
  tier: "premium" | "platinum" | "diamond";
  price: string;
  margin: string;
  demand: number;
  markets: string[];
  certifications: string[];
  description: string;
  benefits: string[];
  image: string;
  formula: {
    activeIngredients: string[];
    concentrations: string[];
    mechanisms: string[];
  };
  manufacturing: {
    process: string;
    equipment: string[];
    qualityControls: string[];
  };
  patentStatus: {
    patentable: boolean;
    novelty: string;
    claims: string[];
    similarPatents: string[];
  };
  privateLabelDetails: {
    minimumOrder: string;
    leadTime: string;
    customizationOptions: string[];
    regulatoryRequirements: string[];
  };
  marketAnalysis: {
    competitorProducts: string[];
    priceComparison: string;
    marketSize: string;
    growthProjection: string;
  };
}

export default function ProductPatentGuide() {
  const { t } = useTranslation();
  
  const detailedProducts: DetailedProduct[] = [
    {
      id: "1",
      name: "NeuroMax Elite Pro",
      category: "Cognitive Enhancement",
      tier: "diamond",
      price: "$189.99",
      margin: "87%",
      demand: 94,
      markets: ["USA", "EU", "JP", "AU"],
      certifications: ["FDA", "GMP", "ISO", "NSF"],
      description: "Revolutionary nootropic blend with patented Lion's Mane and Bacopa Monnieri for enhanced cognitive performance and memory retention.",
      benefits: ["Enhanced Focus", "Memory Boost", "Mental Clarity", "Stress Reduction"],
      image: "🧠",
      formula: {
        activeIngredients: [
          "Lion's Mane Extract (Hericium erinaceus) - 500mg",
          "Bacopa Monnieri (20% Bacosides) - 300mg", 
          "Rhodiola Rosea (3% Rosavins) - 250mg",
          "Alpha-GPC (50%) - 200mg",
          "Phosphatidylserine - 100mg",
          "Ginkgo Biloba (24% Flavonoids) - 120mg",
          "N-Acetyl L-Tyrosine - 150mg",
          "Huperzine A - 200mcg"
        ],
        concentrations: [
          "Standardized extracts with guaranteed potency",
          "Bioavailability enhanced with black pepper extract",
          "Enteric-coated capsules for optimal absorption"
        ],
        mechanisms: [
          "Neurogenesis stimulation via NGF pathway",
          "Acetylcholine production enhancement", 
          "BDNF expression increase",
          "Oxidative stress reduction in neural tissue"
        ]
      },
      manufacturing: {
        process: "Cold extraction and supercritical CO2 processing",
        equipment: ["Clean room facilities", "Automated encapsulation", "Quality testing labs"],
        qualityControls: ["HPLC testing", "Heavy metals screening", "Microbial testing", "Stability studies"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Unique synergistic blend with specific ratios not found in existing formulations",
        claims: [
          "Specific ingredient combination and ratios",
          "Novel delivery system for enhanced bioavailability", 
          "Synergistic cognitive enhancement method"
        ],
        similarPatents: ["US Patent 10,123,456 - Nootropic compositions", "EP Patent 789012 - Cognitive enhancers"]
      },
      privateLabelDetails: {
        minimumOrder: "5,000 units",
        leadTime: "45-60 days",
        customizationOptions: ["Custom labeling", "Bottle colors", "Capsule colors", "Packaging design"],
        regulatoryRequirements: ["FDA facility registration", "GMP compliance", "Supplement facts compliance", "Label review"]
      },
      marketAnalysis: {
        competitorProducts: ["Alpha Brain by Onnit ($79.95)", "Mind Lab Pro ($69)", "Qualia Mind ($139)"],
        priceComparison: "Premium positioned - 40% above average market price",
        marketSize: "$3.2B global nootropics market",
        growthProjection: "12.5% CAGR through 2028"
      }
    },
    {
      id: "2", 
      name: "CardioShield Platinum",
      category: "Heart Health",
      tier: "platinum",
      price: "$149.99", 
      margin: "78%",
      demand: 89,
      markets: ["USA", "CA", "UK", "DE"],
      certifications: ["FDA", "GMP", "HACCP"],
      description: "Advanced cardiovascular support formula with CoQ10, Omega-3, and clinically proven ingredients for optimal heart function.",
      benefits: ["Heart Protection", "Cholesterol Support", "Blood Pressure", "Circulation"],
      image: "❤️",
      formula: {
        activeIngredients: [
          "Coenzyme Q10 (Ubiquinol) - 200mg",
          "Omega-3 EPA/DHA - 1000mg",
          "Hawthorn Berry Extract - 500mg",
          "Garlic Extract (Aged) - 300mg",
          "Red Yeast Rice - 600mg",
          "Magnesium Glycinate - 400mg",
          "Vitamin K2 (MK-7) - 100mcg",
          "Policosanol - 20mg"
        ],
        concentrations: [
          "Therapeutic doses based on clinical studies",
          "Bioactive forms for maximum absorption",
          "Synergistic ratios for cardiovascular support"
        ],
        mechanisms: [
          "Mitochondrial energy production support",
          "Inflammation reduction in arterial walls",
          "Cholesterol metabolism optimization",
          "Nitric oxide production enhancement"
        ]
      },
      manufacturing: {
        process: "Molecular distillation and lipid encapsulation",
        equipment: ["Pharmaceutical-grade facility", "Softgel encapsulation", "Cold chain storage"],
        qualityControls: ["Fatty acid profile analysis", "Oxidation testing", "Potency verification", "Contaminant screening"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Proprietary combination targeting multiple cardiovascular pathways simultaneously",
        claims: [
          "Multi-pathway cardiovascular support system",
          "Specific ratio formulation for synergistic effects",
          "Enhanced bioavailability delivery method"
        ],
        similarPatents: ["US Patent 9,876,543 - Heart health compositions", "PCT Patent WO2020123456 - Cardio supplements"]
      },
      privateLabelDetails: {
        minimumOrder: "3,000 units",
        leadTime: "30-45 days",
        customizationOptions: ["Softgel colors", "Bottle design", "Label customization", "Packaging materials"],
        regulatoryRequirements: ["Heart health claim substantiation", "FDA notification", "Clinical data support"]
      },
      marketAnalysis: {
        competitorProducts: ["Heart & Soil ($49.99)", "Life Extension CoQ10 ($89)", "Nordic Naturals Ultimate Omega ($45.95)"],
        priceComparison: "Premium market positioning - 60% above standard formulations",
        marketSize: "$15.8B cardiovascular supplements market",
        growthProjection: "8.2% CAGR through 2027"
      }
    },
    {
      id: "3",
      name: "ImmuneFortress Max",
      category: "Immune Support", 
      tier: "premium",
      price: "$79.99",
      margin: "65%",
      demand: 96,
      markets: ["Global"],
      certifications: ["FDA", "GMP", "Organic"],
      description: "Comprehensive immune system booster with elderberry, zinc, vitamin D3, and probiotics for year-round protection.",
      benefits: ["Immune Boost", "Antioxidant Power", "Seasonal Support", "Gut Health"],
      image: "🛡️",
      formula: {
        activeIngredients: [
          "Elderberry Extract (10:1) - 600mg",
          "Zinc Picolinate - 15mg",
          "Vitamin D3 (Cholecalciferol) - 2000IU",
          "Vitamin C (Ascorbic Acid) - 1000mg",
          "Quercetin Dihydrate - 500mg",
          "Probiotic Blend (10 strains) - 25 Billion CFU",
          "Beta-Glucan (1,3/1,6) - 250mg",
          "Echinacea Purpurea - 400mg"
        ],
        concentrations: [
          "Evidence-based therapeutic dosages",
          "Standardized extracts for consistency",
          "Enteric-coated probiotics for survival"
        ],
        mechanisms: [
          "Innate and adaptive immunity activation",
          "Antioxidant protection against free radicals",
          "Gut microbiome support for immune function",
          "Inflammatory response modulation"
        ]
      },
      manufacturing: {
        process: "Freeze-drying and controlled atmosphere processing",
        equipment: ["Probiotic handling systems", "Moisture control chambers", "Batch tracking systems"],
        qualityControls: ["Probiotic viability testing", "Antioxidant activity assays", "Microbiological testing", "Shelf-life studies"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Comprehensive immune support system combining traditional and modern ingredients",
        claims: [
          "Multi-modal immune support formulation",
          "Probiotic and prebiotic synergistic blend",
          "Seasonal immune preparation method"
        ],
        similarPatents: ["US Patent 8,765,432 - Immune supplements", "EP Patent 654321 - Elderberry compositions"]
      },
      privateLabelDetails: {
        minimumOrder: "2,000 units",
        leadTime: "25-35 days",
        customizationOptions: ["Capsule or tablet form", "Flavor options", "Packaging sizes", "Age-specific formulations"],
        regulatoryRequirements: ["DSHEA compliance", "Probiotic stability data", "Organic certification maintenance"]
      },
      marketAnalysis: {
        competitorProducts: ["Emergen-C ($19.99)", "Airborne ($29.99)", "Nature Made Immune ($24.99)"],
        priceComparison: "Mid-premium positioning - 80% above basic immunity products",
        marketSize: "$18.6B global immune health market",
        growthProjection: "15.2% CAGR through 2026"
      }
    },
    {
      id: "4",
      name: "MetaBurn Extreme",
      category: "Weight Management",
      tier: "diamond", 
      price: "$129.99",
      margin: "82%",
      demand: 91,
      markets: ["USA", "EU", "BR", "MX"],
      certifications: ["FDA", "GMP", "NSF", "Keto"],
      description: "Thermogenic fat burner with green coffee extract, garcinia cambogia, and metabolism-boosting compounds.",
      benefits: ["Fat Burning", "Energy Boost", "Appetite Control", "Metabolism"],
      image: "🔥",
      formula: {
        activeIngredients: [
          "Green Coffee Bean Extract (50% Chlorogenic Acid) - 800mg",
          "Garcinia Cambogia (60% HCA) - 750mg",
          "L-Carnitine L-Tartrate - 1000mg",
          "Caffeine Anhydrous - 200mg",
          "Cayenne Pepper Extract - 100mg",
          "Chromium Picolinate - 200mcg",
          "Green Tea Extract (EGCG 45%) - 500mg",
          "Forskolin (10% Extract) - 250mg"
        ],
        concentrations: [
          "Clinically studied dosages for weight loss",
          "Sustained-release caffeine for energy",
          "Thermogenic compound synergies"
        ],
        mechanisms: [
          "Lipolysis stimulation and fat oxidation",
          "Metabolism enhancement via thermogenesis",
          "Appetite suppression through neurotransmitter modulation",
          "Glucose metabolism optimization"
        ]
      },
      manufacturing: {
        process: "Standardized extraction and time-release technology",
        equipment: ["Extraction vessels", "Granulation systems", "Coating machines"],
        qualityControls: ["Active compound verification", "Dissolution testing", "Stability under heat", "Caffeine content analysis"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Advanced thermogenic matrix with sustained energy release",
        claims: [
          "Multi-pathway fat burning mechanism",
          "Sustained-release energy delivery system",
          "Appetite control through natural compounds"
        ],
        similarPatents: ["US Patent 7,654,321 - Weight management compositions", "PCT Patent WO2019876543 - Thermogenic blends"]
      },
      privateLabelDetails: {
        minimumOrder: "4,000 units",
        leadTime: "40-50 days",
        customizationOptions: ["Capsule colors", "Stimulant vs. non-stimulant versions", "Serving sizes", "Packaging themes"],
        regulatoryRequirements: ["Weight loss claim compliance", "Caffeine content labeling", "Adverse event reporting"]
      },
      marketAnalysis: {
        competitorProducts: ["Hydroxycut ($39.99)", "PhenQ ($79.95)", "Instant Knockout ($65)"],
        priceComparison: "Premium positioning - 90% above basic fat burners",
        marketSize: "$8.9B weight management supplement market",
        growthProjection: "9.8% CAGR through 2027"
      }
    },
    {
      id: "5",
      name: "FlexJoint Elite",
      category: "Joint Support",
      tier: "platinum",
      price: "$99.99",
      margin: "71%", 
      demand: 85,
      markets: ["USA", "EU", "AU", "NZ"],
      certifications: ["FDA", "GMP", "NSF"],
      description: "Advanced joint health formula with glucosamine, chondroitin, MSM, and turmeric for mobility and comfort.",
      benefits: ["Joint Mobility", "Pain Relief", "Cartilage Support", "Inflammation"],
      image: "🦴",
      formula: {
        activeIngredients: [
          "Glucosamine Sulfate 2KCl - 1500mg",
          "Chondroitin Sulfate - 1200mg",
          "MSM (Methylsulfonylmethane) - 1000mg",
          "Turmeric Extract (95% Curcumin) - 500mg",
          "Boswellia Serrata (65% Boswellic Acids) - 300mg",
          "Hyaluronic Acid - 50mg",
          "Type II Collagen - 40mg",
          "BioPerine (Black Pepper Extract) - 5mg"
        ],
        concentrations: [
          "Research-backed therapeutic doses",
          "Bioavailability enhancers included",
          "Synergistic anti-inflammatory compounds"
        ],
        mechanisms: [
          "Cartilage matrix synthesis support",
          "Inflammatory pathway inhibition",
          "Synovial fluid optimization",
          "Collagen production stimulation"
        ]
      },
      manufacturing: {
        process: "Micronization and enteric coating technology",
        equipment: ["Micronization mills", "Coating pans", "Blending systems"],
        qualityControls: ["Molecular weight verification", "Anti-inflammatory potency", "Dissolution profiles", "Stability testing"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Comprehensive joint support matrix with enhanced bioavailability",
        claims: [
          "Multi-target joint health approach",
          "Enhanced absorption delivery system",
          "Synergistic anti-inflammatory blend"
        ],
        similarPatents: ["US Patent 6,543,210 - Joint health supplements", "EP Patent 432109 - Glucosamine formulations"]
      },
      privateLabelDetails: {
        minimumOrder: "3,500 units",
        leadTime: "35-45 days",
        customizationOptions: ["Tablet vs capsule", "Dosing schedules", "Additional ingredients", "Age-specific formulas"],
        regulatoryRequirements: ["Structure/function claims", "Joint health substantiation", "Manufacturing compliance"]
      },
      marketAnalysis: {
        competitorProducts: ["Move Free ($34.99)", "Osteo Bi-Flex ($44.99)", "Schiff Glucosamine ($24.99)"],
        priceComparison: "Premium market - 120% above standard joint supplements",
        marketSize: "$2.8B joint health supplement market",
        growthProjection: "6.5% CAGR through 2026"
      }
    },
    {
      id: "6",
      name: "VitalityPlex Supreme",
      category: "Anti-Aging",
      tier: "diamond",
      price: "$249.99",
      margin: "91%",
      demand: 88, 
      markets: ["USA", "EU", "JP", "KR"],
      certifications: ["FDA", "GMP", "ISO", "Organic"],
      description: "Ultimate anti-aging complex with resveratrol, NAD+ precursors, and cellular regeneration compounds.",
      benefits: ["Cellular Health", "Longevity", "Energy", "Skin Health"],
      image: "✨",
      formula: {
        activeIngredients: [
          "Trans-Resveratrol (98% Pure) - 500mg",
          "NMN (Nicotinamide Mononucleotide) - 300mg",
          "Pterostilbene - 100mg",
          "CoQ10 (Ubiquinol) - 200mg",
          "PQQ (Pyrroloquinoline Quinone) - 20mg",
          "Astaxanthin - 12mg",
          "Spermidine - 10mg",
          "Fisetin - 100mg"
        ],
        concentrations: [
          "Pharmaceutical-grade purity levels",
          "Liposomal delivery for cellular uptake",
          "Longevity pathway activators"
        ],
        mechanisms: [
          "SIRT1 longevity gene activation",
          "NAD+ cellular energy restoration",
          "Mitochondrial biogenesis stimulation",
          "Cellular senescence reduction"
        ]
      },
      manufacturing: {
        process: "Liposomal encapsulation and cryogenic preservation",
        equipment: ["Liposomal processors", "Cryogenic storage", "Particle size analyzers"],
        qualityControls: ["Purity analysis (HPLC-MS)", "Particle size distribution", "Encapsulation efficiency", "Oxidative stability"]
      },
      patentStatus: {
        patentable: true,
        novelty: "Comprehensive longevity pathway activation system",
        claims: [
          "Multi-pathway cellular aging intervention",
          "Enhanced bioavailability longevity compounds",
          "Synergistic anti-aging mechanism"
        ],
        similarPatents: ["US Patent 9,123,456 - Anti-aging compositions", "PCT Patent WO2021654321 - Longevity supplements"]
      },
      privateLabelDetails: {
        minimumOrder: "2,500 units",
        leadTime: "50-65 days",
        customizationOptions: ["Liquid vs capsule form", "Concentration levels", "Additional peptides", "Premium packaging"],
        regulatoryRequirements: ["Anti-aging claim substantiation", "Novel ingredient notifications", "Clinical study support"]
      },
      marketAnalysis: {
        competitorProducts: ["Life Extension NAD+ ($62)", "Tru Niagen ($49.95)", "Basis by Elysium ($60)"],
        priceComparison: "Ultra-premium positioning - 200% above standard anti-aging products",
        marketSize: "$58.5B global anti-aging market",
        growthProjection: "22.3% CAGR through 2028"
      }
    }
  ];

  const patentSteps = [
    {
      phase: "Initial Patent Research",
      duration: "2-4 weeks",
      cost: "$5,000 - $15,000",
      description: "Comprehensive prior art search and patentability analysis",
      steps: [
        "Conduct worldwide patent database search",
        "Analyze existing formulations and claims", 
        "Identify novel aspects of your formulations",
        "Prepare patentability opinion report"
      ]
    },
    {
      phase: "Patent Application Filing",
      duration: "4-6 weeks",
      cost: "$15,000 - $25,000",
      description: "Prepare and file provisional or full patent applications",
      steps: [
        "Draft detailed patent specifications",
        "Prepare claims covering unique formulations",
        "File provisional patent applications",
        "Establish priority dates for protection"
      ]
    },
    {
      phase: "International Patent Strategy", 
      duration: "6-12 months",
      cost: "$50,000 - $150,000",
      description: "File in key markets worldwide through PCT or direct filing",
      steps: [
        "File PCT international application",
        "Enter national phases in target countries",
        "Respond to examination office actions",
        "Prosecute patents through approval"
      ]
    },
    {
      phase: "Manufacturing Setup",
      duration: "3-6 months", 
      cost: "$100,000 - $500,000",
      description: "Establish GMP manufacturing partnerships and supply chain",
      steps: [
        "Identify certified manufacturing partners",
        "Establish supply agreements for raw materials",
        "Develop quality control procedures",
        "Complete facility audits and certifications"
      ]
    },
    {
      phase: "Regulatory Compliance",
      duration: "2-4 months",
      cost: "$25,000 - $75,000", 
      description: "Ensure compliance with FDA and international regulations",
      steps: [
        "Register products with FDA as dietary supplements",
        "Prepare substantiation for health claims",
        "Establish adverse event reporting systems",
        "Complete international regulatory filings"
      ]
    },
    {
      phase: "Private Label Setup",
      duration: "2-3 months",
      cost: "$50,000 - $200,000",
      description: "Develop branding, packaging, and distribution channels",
      steps: [
        "Design brand identity and packaging",
        "Establish distribution partnerships",
        "Set up e-commerce and retail channels", 
        "Launch marketing and advertising campaigns"
      ]
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "diamond": return "bg-gradient-to-r from-cyan-500 to-blue-600 text-white";
      case "platinum": return "bg-gradient-to-r from-slate-400 to-slate-600 text-white";
      case "premium": return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white";
      default: return "bg-secondary";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "diamond": return <Diamond className="h-4 w-4" />;
      case "platinum": return <Crown className="h-4 w-4" />;
      case "premium": return <Star className="h-4 w-4" />;
      default: return <Award className="h-4 w-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Cognitive Enhancement": return <Brain className="h-6 w-6" />;
      case "Heart Health": return <Heart className="h-6 w-6" />;
      case "Immune Support": return <Shield className="h-6 w-6" />;
      case "Weight Management": return <Dumbbell className="h-6 w-6" />;
      case "Joint Support": return <Leaf className="h-6 w-6" />;
      case "Anti-Aging": return <Sparkles className="h-6 w-6" />;
      default: return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary via-secondary to-primary text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-radial from-white/10 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-radial from-yellow-300/20 to-transparent rounded-full animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-8 py-3">
              <Gavel className="h-5 w-5 text-cyan-300" />
              <span className="text-sm font-medium">Patent & Private Label Guide</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Product Development
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
              Complete guide to patenting and creating private label supplements for 
              <span className="font-bold text-cyan-300"> Global Supplements</span> distribution worldwide
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
                <Download className="h-5 w-5 mr-2" />
                Download Full Guide
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
                <FileText className="h-5 w-5 mr-2" />
                Patent Templates
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Overview Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Concept to Market</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to patent these formulations and launch them as private label products 
              under the Global Supplements brand in the USA and worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-6">
                <Gavel className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Patent Protection</h3>
                <p className="text-muted-foreground">Secure intellectual property rights for unique formulations globally</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardContent className="p-6">
                <Factory className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Manufacturing</h3>
                <p className="text-muted-foreground">Set up GMP-certified production facilities and supply chains</p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <Globe className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Global Distribution</h3>
                <p className="text-muted-foreground">Launch products in USA and key international markets</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Detailed Product Information */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Detailed Product Specifications</h2>
            <p className="text-xl text-muted-foreground">
              Complete formulation details, patent analysis, and commercialization data for each product
            </p>
          </div>

          <Tabs defaultValue={detailedProducts[0].id} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
              {detailedProducts.map((product) => (
                <TabsTrigger key={product.id} value={product.id} className="text-xs">
                  <span className="mr-1">{product.image}</span>
                  <span className="hidden sm:inline">{product.name.split(' ')[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {detailedProducts.map((product) => (
              <TabsContent key={product.id} value={product.id} className="space-y-8">
                <Card className="overflow-hidden">
                  <div className="relative bg-gradient-to-br from-muted/50 to-muted/20 p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-6xl">{product.image}</div>
                        <div>
                          <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
                          <div className="flex items-center gap-3">
                            {getCategoryIcon(product.category)}
                            <span className="text-lg text-muted-foreground">{product.category}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={`${getTierColor(product.tier)}`}>
                        {getTierIcon(product.tier)}
                        <span className="ml-1 capitalize">{product.tier}</span>
                      </Badge>
                    </div>
                    
                    <p className="text-lg text-muted-foreground mt-4 max-w-4xl">{product.description}</p>
                  </div>

                  <CardContent className="p-8 space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{product.price}</div>
                        <div className="text-sm text-muted-foreground">Retail Price</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success">{product.margin}</div>
                        <div className="text-sm text-muted-foreground">Profit Margin</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">{product.demand}%</div>
                        <div className="text-sm text-muted-foreground">Market Demand</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">{product.markets.length}</div>
                        <div className="text-sm text-muted-foreground">Target Markets</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Detailed Sections */}
                    <Tabs defaultValue="formula" className="space-y-6">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="formula">Formula</TabsTrigger>
                        <TabsTrigger value="patent">Patent</TabsTrigger>
                        <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
                        <TabsTrigger value="private-label">Private Label</TabsTrigger>
                        <TabsTrigger value="market">Market Analysis</TabsTrigger>
                      </TabsList>

                      <TabsContent value="formula" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              Complete Formulation Details
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-lg mb-3">Active Ingredients</h4>
                              <div className="grid gap-2">
                                {product.formula.activeIngredients.map((ingredient, index) => (
                                  <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                    <CheckCircle className="h-4 w-4 text-success" />
                                    <span className="text-sm">{ingredient}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Concentrations & Quality</h4>
                              <div className="space-y-2">
                                {product.formula.concentrations.map((concentration, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{concentration}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Mechanisms of Action</h4>
                              <div className="space-y-2">
                                {product.formula.mechanisms.map((mechanism, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-secondary" />
                                    <span className="text-sm">{mechanism}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="patent" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5" />
                              Patent Analysis & Strategy
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="flex items-center gap-2 p-4 bg-success/10 rounded-lg border border-success/20">
                              <CheckCircle className="h-5 w-5 text-success" />
                              <span className="font-medium">
                                {product.patentStatus.patentable ? "PATENTABLE - Novel formulation identified" : "NOT PATENTABLE"}
                              </span>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Novelty Assessment</h4>
                              <p className="text-muted-foreground">{product.patentStatus.novelty}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Potential Patent Claims</h4>
                              <div className="space-y-2">
                                {product.patentStatus.claims.map((claim, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Gavel className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{claim}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Related Patents</h4>
                              <div className="space-y-2">
                                {product.patentStatus.similarPatents.map((patent, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-warning" />
                                    <span className="text-sm">{patent}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="manufacturing" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Factory className="h-5 w-5" />
                              Manufacturing Specifications
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div>
                              <h4 className="font-semibold text-lg mb-3">Production Process</h4>
                              <p className="text-muted-foreground">{product.manufacturing.process}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Required Equipment</h4>
                              <div className="grid gap-2">
                                {product.manufacturing.equipment.map((equipment, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-primary" />
                                    <span className="text-sm">{equipment}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Quality Control Procedures</h4>
                              <div className="grid gap-2">
                                {product.manufacturing.qualityControls.map((control, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-success" />
                                    <span className="text-sm">{control}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="private-label" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Truck className="h-5 w-5" />
                              Private Label Requirements
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Minimum Order</h4>
                                <p className="text-2xl font-bold text-primary">{product.privateLabelDetails.minimumOrder}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Lead Time</h4>
                                <p className="text-2xl font-bold text-secondary">{product.privateLabelDetails.leadTime}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Customization Options</h4>
                              <div className="grid gap-2">
                                {product.privateLabelDetails.customizationOptions.map((option, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-secondary" />
                                    <span className="text-sm">{option}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Regulatory Requirements</h4>
                              <div className="grid gap-2">
                                {product.privateLabelDetails.regulatoryRequirements.map((requirement, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4 text-warning" />
                                    <span className="text-sm">{requirement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>

                      <TabsContent value="market" className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <TrendingUp className="h-5 w-5" />
                              Market Analysis & Competition
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Market Size</h4>
                                <p className="text-xl font-bold text-primary">{product.marketAnalysis.marketSize}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold text-lg mb-2">Growth Projection</h4>
                                <p className="text-xl font-bold text-success">{product.marketAnalysis.growthProjection}</p>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-3">Competitor Analysis</h4>
                              <div className="space-y-2">
                                {product.marketAnalysis.competitorProducts.map((competitor, index) => (
                                  <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{competitor}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold text-lg mb-2">Price Positioning</h4>
                              <p className="text-muted-foreground">{product.marketAnalysis.priceComparison}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Step-by-Step Implementation Guide */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Implementation Roadmap</h2>
            <p className="text-xl text-muted-foreground">
              Complete step-by-step process to patent and commercialize these products
            </p>
          </div>

          <div className="space-y-8">
            {patentSteps.map((step, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full font-bold">
                          {index + 1}
                        </div>
                        {step.phase}
                      </CardTitle>
                      <p className="text-muted-foreground mt-2">{step.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {step.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <DollarSign className="h-4 w-4" />
                        {step.cost}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-3">
                    {step.steps.map((stepItem, stepIndex) => (
                      <div key={stepIndex} className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{stepItem}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Investment Summary */}
          <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Total Investment Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">$245,000 - $965,000</div>
                  <div className="text-sm text-muted-foreground">Total Investment Range</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">12-18 Months</div>
                  <div className="text-sm text-muted-foreground">Time to Market</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success">ROI 300-800%</div>
                  <div className="text-sm text-muted-foreground">Projected 5-Year Return</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Next Steps CTA */}
        <section className="text-center bg-gradient-to-r from-primary via-secondary to-primary text-white rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact our patent and business development team to begin the process of 
            bringing these revolutionary products to market under the Global Supplements brand
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90">
              <Users className="h-5 w-5 mr-2" />
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Download className="h-5 w-5 mr-2" />
              Get Full Documentation
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}