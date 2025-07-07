
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Droplets,
  Building2,
  Heart,
  Leaf,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

interface ProjectDetailsProps {
  project: {
    id: string;
    name: string;
    location: string;
    type: 'water' | 'sewer' | 'treatment' | 'integrated';
    investmentAmount: number;
    beneficiaries: number;
    roi: {
      social: number;
      economic: number;
      environmental: number;
    };
    paybackPeriod: number;
    status: 'planning' | 'execution' | 'completed';
    startDate: string;
    completionDate?: string;
    description: string;
    progress: number;
  };
  onBack: () => void;
}

const ProjectDetails = ({ project, onBack }: ProjectDetailsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      execution: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return colors[status as keyof typeof colors] || '';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      planning: 'Planejamento',
      execution: 'Execução',
      completed: 'Concluído'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const impactDetails = {
    health: {
      diseasesPrevented: 850,
      hospitalizationReduction: 65,
      medicalCostSavings: 450000,
      lifeExpectancyIncrease: 2.1
    },
    economic: {
      propertyValueIncrease: 12,
      newJobs: 145,
      businessGrowth: 8.5,
      taxRevenue: 320000
    },
    social: {
      educationImprovement: 18,
      genderEquity: 25,
      timeGainsByWomen: 3.2,
      communityWellbeing: 76
    },
    environmental: {
      waterConservation: 450000,
      carbonReduction: 125,
      biodiversityIndex: 15,
      pollutionReduction: 45
    }
  };

  const timeline = [
    { phase: 'Planejamento', duration: '6 meses', status: 'completed', progress: 100 },
    { phase: 'Aprovações', duration: '4 meses', status: 'completed', progress: 100 },
    { phase: 'Licitação', duration: '3 meses', status: 'completed', progress: 100 },
    { phase: 'Execução Fase 1', duration: '12 meses', status: 'current', progress: 65 },
    { phase: 'Execução Fase 2', duration: '8 meses', status: 'pending', progress: 0 },
    { phase: 'Testes e Operação', duration: '2 meses', status: 'pending', progress: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Catálogo
        </Button>
        <Badge className={getStatusColor(project.status)}>
          {getStatusLabel(project.status)}
        </Badge>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{project.name}</CardTitle>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{formatCurrency(project.investmentAmount)}</div>
                  <div className="text-sm text-muted-foreground">Investimento</div>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{formatNumber(project.beneficiaries)}</div>
                  <div className="text-sm text-muted-foreground">Beneficiários</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{project.roi.social.toFixed(1)}:1</div>
                  <div className="text-sm text-muted-foreground">ROI Social</div>
                </div>
                <div className="text-center">
                  <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">{project.paybackPeriod.toFixed(1)} anos</div>
                  <div className="text-sm text-muted-foreground">Payback</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Progresso do Projeto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Execução Geral</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium">ROI por Categoria:</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Social:</span>
                    <span className="font-medium">{project.roi.social.toFixed(1)}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Econômico:</span>
                    <span className="font-medium">{project.roi.economic.toFixed(1)}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ambiental:</span>
                    <span className="font-medium">{project.roi.environmental.toFixed(1)}:1</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="impacts" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="impacts">Impactos Detalhados</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          <TabsTrigger value="financial">Análise Financeira</TabsTrigger>
          <TabsTrigger value="risks">Riscos e Mitigação</TabsTrigger>
        </TabsList>

        <TabsContent value="impacts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Impactos na Saúde
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Doenças Prevenidas/ano:</span>
                  <span className="font-medium">{impactDetails.health.diseasesPrevented}</span>
                </div>
                <div className="flex justify-between">
                  <span>Redução Internações:</span>
                  <span className="font-medium">{impactDetails.health.hospitalizationReduction}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Economia Médica/ano:</span>
                  <span className="font-medium">{formatCurrency(impactDetails.health.medicalCostSavings)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Aumento Expectativa:</span>
                  <span className="font-medium">{impactDetails.health.lifeExpectancyIncrease} anos</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-500" />
                  Impactos Econômicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Valorização Imobiliária:</span>
                  <span className="font-medium">+{impactDetails.economic.propertyValueIncrease}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Novos Empregos:</span>
                  <span className="font-medium">{impactDetails.economic.newJobs}</span>
                </div>
                <div className="flex justify-between">
                  <span>Crescimento Negócios:</span>
                  <span className="font-medium">+{impactDetails.economic.businessGrowth}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Receita Fiscal/ano:</span>
                  <span className="font-medium">{formatCurrency(impactDetails.economic.taxRevenue)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Impactos Sociais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Melhoria Educação:</span>
                  <span className="font-medium">+{impactDetails.social.educationImprovement}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Equidade de Gênero:</span>
                  <span className="font-medium">+{impactDetails.social.genderEquity}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Tempo Ganho Mulheres:</span>
                  <span className="font-medium">{impactDetails.social.timeGainsByWomen}h/dia</span>
                </div>
                <div className="flex justify-between">
                  <span>Bem-estar Comunitário:</span>
                  <span className="font-medium">{impactDetails.social.communityWellbeing}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Impactos Ambientais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Água Economizada/ano:</span>
                  <span className="font-medium">{formatNumber(impactDetails.environmental.waterConservation)}m³</span>
                </div>
                <div className="flex justify-between">
                  <span>Redução CO₂/ano:</span>
                  <span className="font-medium">{impactDetails.environmental.carbonReduction} ton</span>
                </div>
                <div className="flex justify-between">
                  <span>Índice Biodiversidade:</span>
                  <span className="font-medium">+{impactDetails.environmental.biodiversityIndex}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Redução Poluição:</span>
                  <span className="font-medium">{impactDetails.environmental.pollutionReduction}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cronograma de Execução</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((phase, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {phase.status === 'completed' ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : phase.status === 'current' ? (
                        <Clock className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Target className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{phase.phase}</span>
                        <span className="text-sm text-muted-foreground">{phase.duration}</span>
                      </div>
                      <Progress value={phase.progress} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground w-12 text-right">
                      {phase.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Financeiros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>VPL (Valor Presente Líquido):</span>
                  <span className="font-medium text-green-600">R$ 8.5M</span>
                </div>
                <div className="flex justify-between">
                  <span>TIR (Taxa Interna de Retorno):</span>
                  <span className="font-medium">18.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Relação Benefício/Custo:</span>
                  <span className="font-medium">5.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Período de Payback:</span>
                  <span className="font-medium">{project.paybackPeriod.toFixed(1)} anos</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Benefícios (Anual)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Benefícios Saúde:</span>
                  <span className="font-medium">{formatCurrency(450000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Benefícios Econômicos:</span>
                  <span className="font-medium">{formatCurrency(680000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Benefícios Sociais:</span>
                  <span className="font-medium">{formatCurrency(320000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Benefícios Ambientais:</span>
                  <span className="font-medium">{formatCurrency(180000)}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold">
                  <span>Total Anual:</span>
                  <span>{formatCurrency(1630000)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  Riscos Identificados
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <h4 className="font-medium">Risco Climático - ALTO</h4>
                  <p className="text-sm text-muted-foreground">Variações pluviométricas extremas</p>
                  <div className="text-xs mt-1">Probabilidade: 75% | Impacto: Alto</div>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-medium">Risco Técnico - MÉDIO</h4>
                  <p className="text-sm text-muted-foreground">Complexidade técnica da execução</p>
                  <div className="text-xs mt-1">Probabilidade: 45% | Impacto: Médio</div>
                </div>
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-medium">Risco Financeiro - MÉDIO</h4>
                  <p className="text-sm text-muted-foreground">Flutuações nas tarifas</p>
                  <div className="text-xs mt-1">Probabilidade: 35% | Impacto: Médio</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Estratégias de Mitigação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-medium">Reservatórios de Segurança</h4>
                  <p className="text-sm text-muted-foreground">Construção de reservatórios para períodos críticos</p>
                  <div className="text-xs mt-1">Eficácia: 85%</div>
                </div>
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-medium">Supervisão Técnica Especializada</h4>
                  <p className="text-sm text-muted-foreground">Contratação de consultoria especializada</p>
                  <div className="text-xs mt-1">Eficácia: 90%</div>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-medium">Fundo de Contingência</h4>
                  <p className="text-sm text-muted-foreground">Reserva financeira de 15% do projeto</p>
                  <div className="text-xs mt-1">Eficácia: 80%</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectDetails;
