import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Target,
  Activity,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function ProjectOverview() {
  const navigate = useNavigate();

  const projectStats = {
    totalPopulation: 45000,
    investment: 25000000,
    coverage: 87.2,
    expectedROI: 340,
    timeline: "24 meses",
    startDate: "2024-03-01"
  };

  const workflowSteps = [
    { 
      id: "gis", 
      name: "Entrada GIS", 
      status: "completed",
      description: "Área definida: Jardim Campos Elíseos"
    },
    { 
      id: "integration", 
      name: "Integração", 
      status: "in-progress",
      description: "Conectando com IBGE e SUS"
    },
    { 
      id: "analysis", 
      name: "Análise", 
      status: "pending",
      description: "Processamento espacial pendente"
    },
    { 
      id: "valuation", 
      name: "Valoração", 
      status: "pending",
      description: "Cálculos monetários aguardando"
    },
    { 
      id: "report", 
      name: "Relatório", 
      status: "pending",
      description: "Documentação final"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Concluído';
      case 'in-progress': return 'Em Progresso';
      default: return 'Pendente';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Projeto Jardim Campos Elíseos
        </h1>
        <p className="text-muted-foreground">
          Análise de impactos sociais para expansão do saneamento em Campinas/SP
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">População Atendida</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.totalPopulation.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              habitantes na região
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(projectStats.investment / 1000000).toFixed(0)}M
            </div>
            <p className="text-xs text-muted-foreground">
              infraestrutura integrada
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cobertura Atual</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.coverage}%</div>
            <p className="text-xs text-muted-foreground">
              esgotamento sanitário
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Projetado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectStats.expectedROI}%</div>
            <p className="text-xs text-muted-foreground">
              retorno social em 10 anos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Progresso do Fluxo de Trabalho
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">1 de 5 etapas</span>
          </div>
          <Progress value={20} className="h-2" />
          
          <div className="space-y-3 mt-6">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-4">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium
                  ${getStatusColor(step.status)}
                `}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{step.name}</span>
                    <Badge 
                      variant={step.status === 'completed' ? 'default' : 
                              step.status === 'in-progress' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {getStatusText(step.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {step.status === 'in-progress' && (
                  <Button 
                    size="sm" 
                    onClick={() => navigate(`/?tab=${step.id}`)}
                    className="ml-auto"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Próxima Ação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Continue a integração de dados com fontes externas (IBGE, SUS, INMET)
            </p>
            <Button 
              onClick={() => navigate("/?tab=integration")}
              className="w-full"
            >
              Integrar Dados Externos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Início:</span>
                <span className="font-medium">Mar 2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Conclusão prevista:</span>
                <span className="font-medium">Mar 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duração:</span>
                <span className="font-medium">{projectStats.timeline}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}