import B2BBuyerCenter from "@/components/dashboard/B2BBuyerCenter";
import { useTranslation } from "react-i18next";

export default function B2BBuyersInfo() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Centro de Compradores B2B</h1>
        <p className="text-muted-foreground">
          Todas as informações completas de compradores, negociações e parceiros
        </p>
      </div>
      
      <B2BBuyerCenter />
    </div>
  );
}