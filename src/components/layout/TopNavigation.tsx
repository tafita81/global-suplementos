import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Globe, 
  BarChart3, 
  Search, 
  ShoppingCart, 
  User, 
  Menu,
  MapPin,
  Phone,
  Crown,
  Home
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/ui/language-selector";

const navigationCategories = [
  { name: "beautySupplements", href: "/beauty-supplements" },
  { name: "quantumMaterials", href: "/quantum-materials" },
  { name: "medicalGrade", href: "/medical-grade" },
  { name: "smartGadgets", href: "/smart-gadgets" },
  { name: "traditionalWellness", href: "/traditional-wellness" },
  { name: "b2bSolutions", href: "/b2b-solutions" },
  { name: "governmentContracts", href: "/government-contracts" },
  { name: "manufacturing", href: "/manufacturing" },
  { name: "researchDevelopment", href: "/research-development" },
  { name: "marketIntelligence", href: "/market-intelligence" }
];

export function TopNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  const isHome = location.pathname === "/";
  
  return (
    <div className="sticky top-0 z-50">
      {/* Top Bar - Premium Contact Info */}
      <div className="bg-primary text-primary-foreground py-2 hidden md:block">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="h-3 w-3" />
                <span>+1 2029498397</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                <span>Florida - US</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-xs gold-accent text-white border-0">
                <Crown className="h-3 w-3 mr-1" />
                {t("navigation.enterpriseSolutions")}
              </Badge>
              <a 
                href="mailto:contact@globalsupplements.site" 
                className="hover:text-secondary transition-colors"
              >
                contact@globalsupplements.site
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Amazon Style */}
      <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="relative">
                  <Globe className="h-10 w-10 text-secondary" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                    <Crown className="h-2 w-2 text-primary" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold">
                    <span className="text-muted-foreground">Global</span>{' '}
                    <span className="text-[#FBBF24]">Supplements</span>
                  </h1>
                  <p className="text-sm text-muted-foreground -mt-1 font-medium">
                    {t('navigation.tagline')}
                  </p>
                </div>
              </button>
            </div>

            {/* Search Bar - Amazon Style */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Input
                  type="search"
                  placeholder={t("navigation.searchPlaceholder")}
                  className="w-full pl-4 pr-12 h-10 bg-background border-2 border-border/30 focus:border-secondary"
                />
                <Button 
                  size="sm" 
                  className="absolute right-0 top-0 h-10 px-4 gold-accent text-primary font-semibold"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <LanguageSelector />
              
              <div className="hidden md:flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center gap-1 h-12 px-3"
                >
                  <User className="h-4 w-4" />
                  <span className="text-xs">{t("navigation.account")}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex flex-col items-center gap-1 h-12 px-3"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-xs">{t("navigation.cart")}</span>
                </Button>
              </div>
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Navigation Bar - CONTAINER CINZA COM SCROLL HORIZONTAL */}
        <div className="border-t border-border/30 shadow-sm" style={{ backgroundColor: '#fafafa' }}>
          <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
            <div className="overflow-x-auto overflow-y-hidden py-2 scrollbar-visible">
              <div className="flex items-center gap-3" style={{ width: 'max-content' }}>
                {/* All Categories Distributed */}
                {navigationCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(category.href)}
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200 px-3 py-2 hover:bg-white/50 hover:shadow-sm rounded-lg border border-transparent hover:border-primary/20 text-center whitespace-nowrap flex-shrink-0"
                  >
                    <span className="block font-medium">{t(`navigation.${category.name}`)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/30 bg-card">
            <div className="px-4 py-4 space-y-3">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate("/public-site");
                    setIsMobileMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <Home className="h-4 w-4 mr-2" />
                  {t("navigation.home")}
                </Button>
                
                {navigationCategories.map((category, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigate(category.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    {t(`navigation.${category.name}`)}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}