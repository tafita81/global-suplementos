import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Opportunities from "./pages/Opportunities";
import Suppliers from "./pages/Suppliers";
import Mycogenesis from "./pages/Mycogenesis";
import AISystem from "./pages/AISystem";
import Logistics from "./pages/Logistics";
import Compliance from "./pages/Compliance";
import Settings from "./pages/Settings";
import APISetup from "./pages/APISetup";
import QuantumOpportunityEngine from "./pages/QuantumOpportunityEngine";
import QuantumArbitrageEngine from "./pages/QuantumArbitrageEngine";
import QuantumRealTimeExecutor from "./pages/QuantumRealTimeExecutor";
import AdvancedMarketIntelligence from "./pages/AdvancedMarketIntelligence";
import RealTimeArbitrageEngine from "./pages/RealTimeArbitrageEngine";
import ZeroInvestmentEngine from "./pages/ZeroInvestmentEngine";
import AutoExecutionHub from "./pages/AutoExecutionHub";
import LiveProfitDashboard from "./pages/LiveProfitDashboard";
import PracticalImplementation from "./pages/PracticalImplementation";
import QuantumSystemComplete from "./pages/QuantumSystemComplete";
import RegistrationDetails from "./pages/RegistrationDetails";
import CompanyDocuments from "./pages/CompanyDocuments";
import AutomatedDistributorEngine from "./pages/AutomatedDistributorEngine";
import MajorSuppliersDatabase from "./pages/MajorSuppliersDatabase";
import GlobalDistributionContracts from "./pages/GlobalDistributionContracts";
import { AppLayout } from "./components/layout/AppLayout";
import { PublicSiteLayout } from "./components/layout/PublicSiteLayout";
import ProgressiveStrategy from "./pages/ProgressiveStrategy";
import QuantumDistributorship from "./pages/QuantumDistributorship";
import PublicSite from "./pages/PublicSite";
import GlobalPartnerships from "./pages/GlobalPartnerships";
import PremiumPortfolio from "./pages/PremiumPortfolio";
import ProductPatentGuide from "./pages/ProductPatentGuide";
import EnterpriseSolutions from "./pages/EnterpriseSolutions";
import RealTimeExecution from "./pages/RealTimeExecution";
import MarketIntelligence from "./pages/MarketIntelligence";
import ValidationMonitor from "./pages/ValidationMonitor";
import { I18nProvider } from "./components/ui/I18nProvider";
import BeautySupplements from "./pages/BeautySupplements";
import QuantumMaterials from "./pages/QuantumMaterials";
import MedicalGrade from "./pages/MedicalGrade";
import SmartGadgets from "./pages/SmartGadgets";
import TraditionalWellness from "./pages/TraditionalWellness";
import B2BSolutions from "./pages/B2BSolutions";
import GovernmentContracts from "./pages/GovernmentContracts";
import Manufacturing from "./pages/Manufacturing";
import ResearchDevelopment from "./pages/ResearchDevelopment";
import MarketIntelligenceCategory from "./pages/MarketIntelligenceCategory";
import B2BBuyersInfo from "./pages/B2BBuyersInfo";
import B2BBuyerGuide from "./pages/B2BBuyerGuide";
import CantonFairDashboard from "./pages/CantonFairDashboard";
import Bundles from "./pages/Bundles";
import BundleDetail from "./pages/BundleDetail";
import B2BDistribution from "./pages/B2BDistribution";
import Products from "./pages/Products";
import PreOrderPolicy from "./pages/PreOrderPolicy";
import Amazon from "./pages/Amazon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PublicSite />} />
              <Route path="/dashboard" element={<Index />} />
              <Route path="/opportunities" element={
                <AppLayout>
                  <Opportunities />
                </AppLayout>
              } />
              <Route path="/suppliers" element={
                <AppLayout>
                  <Suppliers />
                </AppLayout>
              } />
              <Route path="/mycogenesis" element={
                <AppLayout>
                  <Mycogenesis />
                </AppLayout>
              } />
              <Route path="/ai-system" element={
                <AppLayout>
                  <AISystem />
                </AppLayout>
              } />
              <Route path="/logistics" element={
                <AppLayout>
                  <Logistics />
                </AppLayout>
              } />
              <Route path="/compliance" element={
                <AppLayout>
                  <Compliance />
                </AppLayout>
              } />
              <Route path="/settings" element={
                <AppLayout>
                  <Settings />
                </AppLayout>
              } />
              <Route path="/b2b-buyers-info" element={
                <AppLayout>
                  <B2BBuyersInfo />
                </AppLayout>
              } />
              <Route path="/b2b-buyer-guide" element={
                <AppLayout>
                  <B2BBuyerGuide />
                </AppLayout>
              } />
              <Route path="/canton-fair" element={
                <AppLayout>
                  <CantonFairDashboard />
                </AppLayout>
              } />
              <Route path="/api-setup" element={
                <AppLayout>
                  <APISetup />
                </AppLayout>
              } />
              <Route path="/quantum-opportunities" element={
                <AppLayout>
                  <QuantumOpportunityEngine />
                </AppLayout>
              } />
              <Route path="/quantum-arbitrage-engine" element={
                <AppLayout>
                  <QuantumArbitrageEngine />
                </AppLayout>
              } />
              <Route path="/quantum-real-time-executor" element={
                <AppLayout>
                  <QuantumRealTimeExecutor />
                </AppLayout>
              } />
              <Route path="/realtime-arbitrage" element={
                <AppLayout>
                  <RealTimeArbitrageEngine />
                </AppLayout>
              } />
              <Route path="/zero-investment" element={
                <AppLayout>
                  <ZeroInvestmentEngine />
                </AppLayout>
              } />
              
              <Route path="/auto-execution" element={
                <AppLayout>
                  <AutoExecutionHub />
                </AppLayout>
              } />
              <Route path="/live-profit" element={
                <AppLayout>
                  <LiveProfitDashboard />
                </AppLayout>
              } />
              <Route path="/practical-implementation" element={
                <AppLayout>
                  <PracticalImplementation />
                </AppLayout>
              } />
              <Route path="/quantum-system-complete" element={<QuantumSystemComplete />} />
              <Route path="/registration-details" element={
                <AppLayout>
                  <RegistrationDetails />
                </AppLayout>
              } />
              <Route path="/company-documents" element={
                <AppLayout>
                  <CompanyDocuments />
                </AppLayout>
              } />
              <Route path="/progressive-strategy" element={
                <AppLayout>
                  <ProgressiveStrategy />
                </AppLayout>
              } />
              <Route path="/quantum-distributorship" element={
                <AppLayout>
                  <QuantumDistributorship />
                </AppLayout>
              } />
              <Route path="/automated-distributor" element={
                <AppLayout>
                  <AutomatedDistributorEngine />
                </AppLayout>
              } />
              <Route path="/major-suppliers" element={
                <AppLayout>
                  <MajorSuppliersDatabase />
                </AppLayout>
              } />
              <Route path="/global-distribution-contracts" element={
                <AppLayout>
                  <GlobalDistributionContracts />
                </AppLayout>
              } />
              <Route path="/public-site" element={<PublicSite />} />
              <Route path="/global-partnerships" element={
                <PublicSiteLayout>
                  <GlobalPartnerships />
                </PublicSiteLayout>
              } />
              <Route path="/premium-portfolio" element={
                <PublicSiteLayout>
                  <PremiumPortfolio />
                </PublicSiteLayout>
              } />
              <Route path="/product-patent-guide" element={
                <PublicSiteLayout>
                  <ProductPatentGuide />
                </PublicSiteLayout>
              } />
              <Route path="/enterprise-solutions" element={
                <PublicSiteLayout>
                  <EnterpriseSolutions />
                </PublicSiteLayout>
              } />
              <Route path="/real-time-execution" element={
                <PublicSiteLayout>
                  <RealTimeExecution />
                </PublicSiteLayout>
              } />
              <Route path="/market-intelligence" element={
                <PublicSiteLayout>
                  <MarketIntelligence />
                </PublicSiteLayout>
              } />
              <Route path="/validation-monitor" element={
                <AppLayout>
                  <ValidationMonitor />
                </AppLayout>
              } />
              
              {/* Product Category Pages */}
              <Route path="/beauty-supplements" element={<BeautySupplements />} />
              <Route path="/quantum-materials" element={<QuantumMaterials />} />
              <Route path="/medical-grade" element={<MedicalGrade />} />
              <Route path="/smart-gadgets" element={<SmartGadgets />} />
              <Route path="/traditional-wellness" element={<TraditionalWellness />} />
              <Route path="/b2b-solutions" element={<B2BSolutions />} />
              <Route path="/government-contracts" element={<GovernmentContracts />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/research-development" element={<ResearchDevelopment />} />
              <Route path="/market-intelligence-category" element={<MarketIntelligenceCategory />} />
              
              {/* New Bundle Routes */}
              <Route path="/bundles" element={<PublicSiteLayout><Bundles /></PublicSiteLayout>} />
              <Route path="/bundles/:bundleId" element={<PublicSiteLayout><BundleDetail /></PublicSiteLayout>} />
              <Route path="/b2b" element={<PublicSiteLayout><B2BDistribution /></PublicSiteLayout>} />
              <Route path="/products" element={<PublicSiteLayout><Products /></PublicSiteLayout>} />
              <Route path="/pre-order-policy" element={<PublicSiteLayout><PreOrderPolicy /></PublicSiteLayout>} />
              <Route path="/amazon" element={<Amazon />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </I18nProvider>
      </TooltipProvider>
  </QueryClientProvider>
);

export default App;
