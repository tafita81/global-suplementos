import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Globe, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter,
  Building2,
  Award
} from "lucide-react";
import { useTranslation } from "react-i18next";

export function PremiumFooter() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <h3 className="text-xl font-bold text-primary">{t('footer.companyName')}</h3>
                <p className="text-sm text-muted-foreground">{t('footer.premiumNetwork')}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('footer.description')}
            </p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Business Solutions */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.businessSolutions')}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                <Building2 className="h-4 w-4" />
                {t('footer.b2bGlobalTrading')}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                <Award className="h-4 w-4" />
                {t('footer.governmentContracts')}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground cursor-pointer">
                <Globe className="h-4 w-4" />
                {t('footer.b2cMarketplace')}
              </div>
            </div>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.technology')}</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{t('footer.realTimeArbitrage')}</p>
              <p>{t('footer.autoExecution')}</p>
              <p>{t('footer.globalCompliance')}</p>
              <p>{t('footer.advancedAI')}</p>
              <p>{t('footer.executiveDashboard')}</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.premiumContact')}</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                contact@globalsupplements.site
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Globe className="h-4 w-4" />
                www.globalsupplements.site
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {t('footer.globalNetwork')}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer">{t('footer.privacyPolicy')}</span>
            <span className="hover:text-foreground cursor-pointer">{t('footer.termsOfUse')}</span>
            <span className="hover:text-foreground cursor-pointer">{t('footer.compliance')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}