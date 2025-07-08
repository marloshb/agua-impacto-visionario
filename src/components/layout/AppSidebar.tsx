
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Calculator, 
  Map, 
  Database, 
  BarChart3, 
  DollarSign, 
  FileText, 
  Folder,
  Home,
  Settings,
  HelpCircle,
  ChevronRight,
  Activity,
  Target,
  TrendingUp
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface NavigationItem {
  title: string;
  url: string;
  icon: any;
  badge?: string;
  status?: 'pending' | 'in-progress' | 'completed';
  isNew?: boolean;
}

const workflowItems: NavigationItem[] = [
  { 
    title: "Visão Geral", 
    url: "/", 
    icon: Home, 
    status: 'completed'
  },
  { 
    title: "Catálogo de Projetos", 
    url: "/?tab=catalog", 
    icon: Folder, 
    status: 'completed'
  },
  { 
    title: "Entrada GIS", 
    url: "/?tab=gis", 
    icon: Map, 
    badge: "Passo 1",
    status: 'in-progress'
  },
  { 
    title: "Integração de Dados", 
    url: "/?tab=integration", 
    icon: Database, 
    badge: "Passo 2",
    status: 'pending'
  },
  { 
    title: "Análise Espacial", 
    url: "/?tab=analysis", 
    icon: BarChart3, 
    badge: "Passo 3",
    status: 'pending'
  },
  { 
    title: "Valoração Monetária", 
    url: "/?tab=valuation", 
    icon: DollarSign, 
    badge: "Passo 4",
    status: 'pending',
    isNew: true
  },
  { 
    title: "Motor de Cálculo", 
    url: "/?tab=calculator", 
    icon: Calculator, 
    badge: "Passo 5",
    status: 'pending'
  },
  { 
    title: "Relatório Final", 
    url: "/?tab=report", 
    icon: FileText, 
    badge: "Resultado",
    status: 'pending'
  },
];

const additionalItems: NavigationItem[] = [
  { title: "Configurações", url: "/settings", icon: Settings },
  { title: "Ajuda", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const [workflowProgress] = useState(25); // Example progress

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'pending': return 'text-gray-400';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return '✓';
      case 'in-progress': return '⏳';
      case 'pending': return '○';
      default: return '';
    }
  };

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/" && !location.search;
    if (url.includes("?tab=")) {
      const tab = url.split("tab=")[1];
      return location.search.includes(`tab=${tab}`);
    }
    return location.pathname === url;
  };

  const handleNavigation = (url: string) => {
    if (url.includes("?tab=")) {
      const tab = url.split("tab=")[1];
      navigate(`/?tab=${tab}`);
    } else {
      navigate(url);
    }
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-80"} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">Calculadora Social</h2>
              <p className="text-sm text-muted-foreground">Campinas - SANASA</p>
            </div>
          )}
        </div>
        
        {!collapsed && (
          <div className="px-4 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Projeto</span>
              <span className="text-sm text-muted-foreground">{workflowProgress}%</span>
            </div>
            <Progress value={workflowProgress} className="h-2" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            {!collapsed && "Fluxo de Trabalho"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {workflowItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={`
                      relative transition-all duration-200 hover:bg-accent/50
                      ${isActive(item.url) ? 'bg-accent text-accent-foreground border-r-2 border-primary' : ''}
                      ${collapsed ? 'justify-center' : 'justify-start'}
                    `}
                  >
                    <button 
                      onClick={() => handleNavigation(item.url)}
                      className="w-full"
                    >
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${getStatusColor(item.status)}`}>
                            {getStatusIcon(item.status)}
                          </span>
                          <item.icon className="h-5 w-5" />
                        </div>
                        
                        {!collapsed && (
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{item.title}</span>
                              {item.isNew && (
                                <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                                  Novo
                                </Badge>
                              )}
                              {item.badge && (
                                <Badge variant="outline" className="text-xs">
                                  {item.badge}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                        
                        {!collapsed && isActive(item.url) && (
                          <ChevronRight className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Status do Projeto
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="px-3 py-2 space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Jardim Campos Elíseos
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    45.000 habitantes • R$ 25M investimento
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Dados GIS</span>
                    <span className="text-green-600">Completo</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Integração IBGE</span>
                    <span className="text-yellow-600">Em progresso</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Cálculos</span>
                    <span className="text-gray-400">Pendente</span>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {additionalItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild
                className={`
                  transition-all duration-200 hover:bg-accent/50
                  ${isActive(item.url) ? 'bg-accent text-accent-foreground' : ''}
                  ${collapsed ? 'justify-center' : 'justify-start'}
                `}
              >
                <button 
                  onClick={() => handleNavigation(item.url)}
                  className="w-full"
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
