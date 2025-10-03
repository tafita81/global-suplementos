import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

// Import flag images - Countries with verified suppliers in database
import usFlag from "@/assets/flags/us.png";
import cnFlag from "@/assets/flags/cn.png"; // China - 29 suppliers
import deFlag from "@/assets/flags/de.png";
import jpFlag from "@/assets/flags/jp.png";
import gbFlag from "@/assets/flags/gb.png";
import frFlag from "@/assets/flags/fr.png";
import caFlag from "@/assets/flags/ca.png";
import auFlag from "@/assets/flags/au.png";
import itFlag from "@/assets/flags/it.png";
import esFlag from "@/assets/flags/es.png";
import nlFlag from "@/assets/flags/nl.png";
import chFlag from "@/assets/flags/ch.png";
import sgFlag from "@/assets/flags/sg.png";
import krFlag from "@/assets/flags/kr.png";
import mxFlag from "@/assets/flags/mx.png";
import arFlag from "@/assets/flags/ar.png";
import brFlag from "@/assets/flags/br.png";
import seFlag from "@/assets/flags/se.png";
import inFlag from "@/assets/flags/in.png"; // India - 19 suppliers
// Arab countries flags
import aeFlag from "@/assets/flags/ae.png"; // UAE
import saFlag from "@/assets/flags/sa.png"; // Saudi Arabia
import qaFlag from "@/assets/flags/qa.png"; // Qatar
import kwFlag from "@/assets/flags/kw.png"; // Kuwait
import bhFlag from "@/assets/flags/bh.png"; // Bahrain
import omFlag from "@/assets/flags/om.png"; // Oman
// Asia-Pacific flags
import twFlag from "@/assets/flags/tw.png"; // Taiwan - 21 suppliers
import myFlag from "@/assets/flags/my.png"; // Malaysia
// Latin America flags
import clFlag from "@/assets/flags/cl.png"; // Chile
import coFlag from "@/assets/flags/co.png"; // Colombia
import peFlag from "@/assets/flags/pe.png"; // Peru
import ptFlag from "@/assets/flags/pt.png"; // Portugal
import paFlag from "@/assets/flags/pa.png"; // Panama
import pyFlag from "@/assets/flags/py.png"; // Paraguay

// Countries where Global Supplements operates - all countries with mapped suppliers
const premiumCountries = [
  // Top Supplier Markets (15+ suppliers)
  { nameKey: "china", flag: cnFlag, market: "$45B", statusKey: "strategic" },
  { nameKey: "usa", flag: usFlag, market: "$25B", statusKey: "premium" },
  { nameKey: "japan", flag: jpFlag, market: "$15B", statusKey: "premium" },
  { nameKey: "germany", flag: deFlag, market: "$12B", statusKey: "premium" },
  { nameKey: "taiwan", flag: twFlag, market: "$2.3B", statusKey: "innovation" },
  { nameKey: "india", flag: inFlag, market: "$6B", statusKey: "strategic" },
  { nameKey: "korea", flag: krFlag, market: "$7B", statusKey: "innovation" },
  { nameKey: "uk", flag: gbFlag, market: "$9B", statusKey: "established" },
  { nameKey: "brazil", flag: brFlag, market: "$8B", statusKey: "growth" },
  { nameKey: "australia", flag: auFlag, market: "$4B", statusKey: "innovation" },
  { nameKey: "canada", flag: caFlag, market: "$6B", statusKey: "partner" },
  
  // Mid-tier Markets (3-10 suppliers)
  { nameKey: "mexico", flag: mxFlag, market: "$3B", statusKey: "growth" },
  { nameKey: "spain", flag: esFlag, market: "$4B", statusKey: "growth" },
  { nameKey: "argentina", flag: arFlag, market: "$2B", statusKey: "partner" },
  { nameKey: "chile", flag: clFlag, market: "$1.2B", statusKey: "growth" },
  { nameKey: "colombia", flag: coFlag, market: "$1.1B", statusKey: "growth" },
  { nameKey: "peru", flag: peFlag, market: "$0.8B", statusKey: "partner" },
  { nameKey: "portugal", flag: ptFlag, market: "$1.5B", statusKey: "established" },
  { nameKey: "saudi", flag: saFlag, market: "$6B", statusKey: "strategic" },
  { nameKey: "singapore", flag: sgFlag, market: "$2B", statusKey: "hub" },
  { nameKey: "switzerland", flag: chFlag, market: "$3B", statusKey: "quality" },
  { nameKey: "uae", flag: aeFlag, market: "$4.5B", statusKey: "luxury" },
  
  // Emerging Markets (2+ suppliers)
  { nameKey: "france", flag: frFlag, market: "$8B", statusKey: "luxury" },
  { nameKey: "italy", flag: itFlag, market: "$5B", statusKey: "luxury" },
  { nameKey: "netherlands", flag: nlFlag, market: "$5B", statusKey: "logistics" },
  { nameKey: "sweden", flag: seFlag, market: "$2B", statusKey: "innovation" },
  { nameKey: "bahrain", flag: bhFlag, market: "$0.8B", statusKey: "hub" },
  { nameKey: "kuwait", flag: kwFlag, market: "$1.2B", statusKey: "luxury" },
  { nameKey: "malaysia", flag: myFlag, market: "$1.8B", statusKey: "hub" },
  { nameKey: "oman", flag: omFlag, market: "$0.9B", statusKey: "growth" },
  { nameKey: "panama", flag: paFlag, market: "$0.4B", statusKey: "logistics" },
  { nameKey: "paraguay", flag: pyFlag, market: "$0.3B", statusKey: "partner" },
  { nameKey: "qatar", flag: qaFlag, market: "$1.8B", statusKey: "premium" }
];

const getStatusColor = (statusKey: string) => {
  switch (statusKey) {
    case "premium": return "bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 text-yellow-800 border-yellow-300/30";
    case "strategic": return "bg-gradient-to-r from-purple-400/20 to-purple-600/20 text-purple-800 border-purple-300/30";
    case "luxury": return "bg-gradient-to-r from-pink-400/20 to-pink-600/20 text-pink-800 border-pink-300/30";
    case "innovation": return "bg-gradient-to-r from-blue-400/20 to-blue-600/20 text-blue-800 border-blue-300/30";
    case "growth": return "bg-gradient-to-r from-green-400/20 to-green-600/20 text-green-800 border-green-300/30";
    case "established": return "bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 text-indigo-800 border-indigo-300/30";
    case "partner": return "bg-gradient-to-r from-teal-400/20 to-teal-600/20 text-teal-800 border-teal-300/30";
    case "hub": return "bg-gradient-to-r from-orange-400/20 to-orange-600/20 text-orange-800 border-orange-300/30";
    case "quality": return "bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 text-cyan-800 border-cyan-300/30";
    case "logistics": return "bg-gradient-to-r from-emerald-400/20 to-emerald-600/20 text-emerald-800 border-emerald-300/30";
    default: return "bg-gradient-to-r from-gray-400/20 to-gray-600/20 text-gray-800 border-gray-300/30";
  }
};

export function PremiumCountryFlags() {
  const { t } = useTranslation();
  
  const capitalizeFirst = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-6 text-sm px-4 py-2 gold-accent text-primary font-semibold">
            {t('countries.badge')}
          </Badge>
          <h2 className="text-4xl font-bold mb-6 text-primary">
            {t('countries.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {t('countries.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {premiumCountries.map((country, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-6 border border-border/30 hover:border-secondary/20 transition-all duration-500 clean-fade-in hover:clean-shadow country-flag-clean"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Country Flag */}
              <div className="text-center mb-4">
                <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                  <img 
                    src={country.flag} 
                    alt={`Flag of ${t(country.nameKey)}`}
                    className="w-16 h-12 object-cover rounded-md shadow-sm"
                  />
                </div>
                <h3 className="font-semibold text-lg mb-1">{capitalizeFirst(t(country.nameKey))}</h3>
                <p className="text-base font-medium text-muted-foreground">{country.market}</p>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center">
                <Badge 
                  variant="outline" 
                  className={`text-sm font-medium px-3 py-1.5 ${getStatusColor(country.statusKey)} border`}
                >
                  {country.statusKey}
                </Badge>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </div>
          ))}
        </div>

        {/* Global Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl border border-border/20 clean-shadow">
            <div className="text-4xl font-bold subtle-gold mb-2">32+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('countries.stats.active')}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-border/20 clean-shadow">
            <div className="text-4xl font-bold subtle-gold mb-2">$220B+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('countries.stats.market')}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-border/20 clean-shadow">
            <div className="text-4xl font-bold subtle-gold mb-2">300+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('countries.stats.suppliers')}</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl border border-border/20 clean-shadow">
            <div className="text-4xl font-bold subtle-gold mb-2">95%</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wide">{t('countries.stats.verified')}</div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            {t('countries.cta.title')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 gold-accent text-primary font-semibold rounded-lg hover:opacity-90 transition-opacity">
              {t('countries.contact.international')}
            </button>
            <button className="px-8 py-3 border border-border hover:bg-muted/30 rounded-lg transition-colors">
              {t('countries.contact.operations')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}