import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { 
  BarChart3, 
  Brain, 
  Cpu,
  Building2, 
  Globe, 
  Package, 
  Settings, 
  TrendingUp, 
  Users,
  Key,
  Activity,
  Shield,
  Rocket,
  Zap,
  FileText,
  Database,
  ExternalLink,
  Crown,
  Handshake,
  Gavel,
  BookOpen
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const menuItems = [
    {
      title: "Dashboard",
      icon: BarChart3,
      url: "/",
    },
    {
      title: t("navigation.opportunities", "Opportunities"),
      icon: TrendingUp,
      url: "/opportunities",
    },
    {
      title: t("navigation.suppliers", "Suppliers"),
      icon: Building2,
      url: "/suppliers",
    },
    {
      title: t("navigation.products", "Mycogenesis Products"),
      icon: Package,
      url: "/mycogenesis",
    },
    {
      title: t("navigation.globalAI", "Global AI"),
      icon: Brain,
      url: "/ai-system",
    },
    {
      title: t("navigation.logistics", "Logistics"),
      icon: Globe,
      url: "/logistics",
    },
    {
      title: t("navigation.compliance", "Compliance"),
      icon: Users,
      url: "/compliance",
    },
    {
      title: "📄 Documentos da Empresa",
      icon: FileText,
      url: "/company-documents",
    },
    {
      title: "📊 Detalhes dos Registros",
      icon: Database,
      url: "/registration-details",
    },
    {
      title: "👑 Quantum Distributorship Engine",
      icon: Crown,
      url: "/quantum-distributorship",
    },
    {
      title: "🚀 Sistema Automatizado",
      icon: Zap,
      url: "/automated-distributor",
    },
    {
      title: "🏢 Base de Fornecedores Globais",
      icon: Building2,
      url: "/major-suppliers",
    },
    {
      title: "Quantum Opportunities",
      icon: Brain,
      url: "/quantum-opportunities",
    },
    {
      title: "Motor Arbitragem Quântica",
      icon: Cpu,
      url: "/quantum-arbitrage-engine",
    },
    {
      title: "Executor Tempo Real",
      icon: Rocket,
      url: "/quantum-real-time-executor",
    },
    {
      title: "Arbitragem Tempo Real",
      icon: Activity,
      url: "/realtime-arbitrage",
    },
    {
      title: "Zero Investment",
      icon: Shield,
      url: "/zero-investment",
    },
    {
      title: "Execução Automática",
      icon: Activity,
      url: "/auto-execution",
    },
    {
      title: "Lucros Live",
      icon: TrendingUp,
      url: "/live-profit",
    },
    {
      title: "Implementação Prática",
      icon: Rocket,
      url: "/practical-implementation",
    },
    {
      title: "Setup de APIs",
      icon: Key,
      url: "/api-setup",
    },
    {
      title: t("navigation.settings", "Settings"),
      icon: Settings,
      url: "/settings",
    },
    {
      title: "📖 Guia Completo de Compradores B2B",
      icon: BookOpen,
      url: "/b2b-buyer-guide",
    },
    {
      title: "🏪 Canton Fair Tracker",
      icon: Globe,
      url: "/canton-fair",
    },
    {
      title: "🤝 Centro de Compradores B2B",
      icon: Handshake,
      url: "/b2b-buyers-info",
    },
    {
      title: "🤖 AI Quantum Engine",
      icon: Brain,
      url: "/ai-system",
    },
    {
      title: "📋 Patent & Private Label Guide",
      icon: Gavel,
      url: "/product-patent-guide",
    },
    {
      title: "⚡ Access Catalog",
      icon: Zap,
      url: "/premium-portfolio",
    },
    {
      title: "💼 Contratos de Distribuição Global",
      icon: Handshake,
      url: "/global-distribution-contracts",
    },
    {
      title: "🚀 Sistema Quântico Completo",
      icon: Zap,
      url: "/quantum-system-complete",
    },
    {
      title: "🌍 Site Público",
      icon: ExternalLink,
      url: "/public-site",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="text-xl font-bold text-primary cursor-pointer hover:text-primary/80" onClick={() => navigate("/")}>
            Global Supplements
          </h1>
          <p className="text-sm text-muted-foreground">{t("site.tagline", "Premium Global Network")}</p>
        </div>
      </SidebarHeader>
      <SidebarContent className="pb-20">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={location.pathname === item.url}
                    onClick={() => navigate(item.url)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-20">
        <div className="text-xs text-muted-foreground px-4 py-2">
          © 2024 Global Supplements
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}