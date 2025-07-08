import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Save, 
  Download, 
  Share2, 
  MoreHorizontal, 
  Play,
  Settings,
  Moon,
  Sun,
  Bell,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

export function ActionToolbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [notifications] = useState(3);

  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab");

  const getNextStep = () => {
    const steps = ["gis", "integration", "analysis", "valuation", "calculator", "report"];
    const currentIndex = steps.indexOf(currentTab || "");
    return currentIndex >= 0 && currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;
  };

  const handleSave = () => {
    toast({
      title: "Projeto salvo",
      description: "Dados salvos com sucesso no navegador.",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download iniciado",
      description: "Relatório sendo gerado...",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado",
      description: "URL do projeto copiada para a área de transferência.",
    });
  };

  const handleRunCalculation = () => {
    navigate("/?tab=calculator");
    toast({
      title: "Executando cálculos",
      description: "Redirecionando para o motor de cálculo...",
    });
  };

  const nextStep = getNextStep();

  return (
    <div className="flex items-center gap-2">
      {/* Quick Actions */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSave}
          className="text-muted-foreground hover:text-foreground"
        >
          <Save className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          className="text-muted-foreground hover:text-foreground"
        >
          <Download className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="text-muted-foreground hover:text-foreground"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Primary Action */}
      {currentTab && currentTab !== "report" && (
        <Button
          onClick={handleRunCalculation}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          <Play className="h-4 w-4 mr-2" />
          Executar Cálculo
        </Button>
      )}

      {nextStep && (
        <Button
          onClick={() => navigate(`/?tab=${nextStep}`)}
          variant="outline"
          size="sm"
        >
          Próximo Passo
        </Button>
      )}

      {/* Notifications */}
      <Button
        variant="ghost"
        size="sm"
        className="relative text-muted-foreground hover:text-foreground"
      >
        <Bell className="h-4 w-4" />
        {notifications > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
          >
            {notifications}
          </Badge>
        )}
      </Button>

      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="text-muted-foreground hover:text-foreground"
      >
        {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <User className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Analista SANASA</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem>
            Preferências
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* More Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Opções</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Duplicar Projeto
          </DropdownMenuItem>
          <DropdownMenuItem>
            Exportar Dados
          </DropdownMenuItem>
          <DropdownMenuItem>
            Histórico de Versões
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            Excluir Projeto
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}