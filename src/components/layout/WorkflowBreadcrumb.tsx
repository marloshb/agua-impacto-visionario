import { useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function WorkflowBreadcrumb() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab");

  const getTabInfo = (tab: string | null) => {
    const tabs = {
      catalog: { name: "Catálogo de Projetos", step: null },
      gis: { name: "Entrada GIS", step: "Passo 1" },
      integration: { name: "Integração de Dados", step: "Passo 2" },
      analysis: { name: "Análise Espacial", step: "Passo 3" },
      valuation: { name: "Valoração Monetária", step: "Passo 4" },
      calculator: { name: "Motor de Cálculo", step: "Passo 5" },
      report: { name: "Relatório Final", step: "Resultado" },
    };

    return tab && tabs[tab as keyof typeof tabs] ? tabs[tab as keyof typeof tabs] : null;
  };

  const currentTabInfo = getTabInfo(currentTab);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            Calculadora Social
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        {currentTabInfo && (
          <>
            <BreadcrumbSeparator>
              <ChevronRight className="h-4 w-4" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="flex items-center gap-2">
                {currentTabInfo.name}
                {currentTabInfo.step && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {currentTabInfo.step}
                  </span>
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}