import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  TrendingUp, 
  MapPin, 
  Calendar,
  Users,
  Droplets,
  Activity,
  Eye,
  BarChart3
} from 'lucide-react';

interface ProjectData {
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
}

const sampleProjects: ProjectData[] = [
  {
    id: '1',
    name: 'Rede de Água Potável - Setor Norte',
    location: 'Brasília, DF',
    type: 'water',
    investmentAmount: 2500000,
    beneficiaries: 15000,
    roi: { social: 4.2, economic: 3.8, environmental: 2.9 },
    paybackPeriod: 7.5,
    status: 'execution',
    startDate: '2024-01-15',
    description: 'Expansão da rede de distribuição de água potável para atender comunidades carentes',
    progress: 65
  },
  {
    id: '2',
    name: 'Sistema de Tratamento de Esgoto - Águas Claras',
    location: 'Águas Claras, DF',
    type: 'treatment',
    investmentAmount: 5200000,
    beneficiaries: 32000,
    roi: { social: 5.1, economic: 4.5, environmental: 6.2 },
    paybackPeriod: 6.2,
    status: 'completed',
    startDate: '2023-03-10',
    completionDate: '2024-05-20',
    description: 'Construção de estação de tratamento de esgoto com capacidade para 50.000 habitantes',
    progress: 100
  },
  {
    id: '3',
    name: 'Projeto Integrado de Saneamento - Ceilândia',
    location: 'Ceilândia, DF',
    type: 'integrated',
    investmentAmount: 12800000,
    beneficiaries: 85000,
    roi: { social: 6.8, economic: 5.9, environmental: 4.7 },
    paybackPeriod: 8.1,
    status: 'planning',
    startDate: '2024-06-01',
    description: 'Projeto completo incluindo água, esgoto e sistema de reuso para a maior cidade satélite',
    progress: 15
  },
  {
    id: '4',
    name: 'Reuso de Água Industrial - Polo Tecnológico',
    location: 'Guará, DF',
    type: 'water',
    investmentAmount: 3400000,
    beneficiaries: 8500,
    roi: { social: 3.2, economic: 7.1, environmental: 8.3 },
    paybackPeriod: 4.8,
    status: 'execution',
    startDate: '2024-02-28',
    description: 'Sistema de reuso de água para indústrias do polo tecnológico',
    progress: 40
  }
];

const ProjectCatalog = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProjects = sampleProjects.filter(project => {
    return (selectedType === 'all' || project.type === selectedType) &&
           (selectedStatus === 'all' || project.status === selectedStatus);
  });

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

  const getTypeLabel = (type: string) => {
    const labels = {
      water: 'Água',
      sewer: 'Esgoto',
      treatment: 'Tratamento',
      integrated: 'Integrado'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      planning: 'Planejamento',
      execution: 'Execução',
      completed: 'Concluído'
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      planning: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      execution: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    };
    return colors[status as keyof typeof colors] || '';
  };

  const totalInvestment = filteredProjects.reduce((sum, project) => sum + project.investmentAmount, 0);
  const totalBeneficiaries = filteredProjects.reduce((sum, project) => sum + project.beneficiaries, 0);
  const avgSocialROI = filteredProjects.reduce((sum, project) => sum + project.roi.social, 0) / filteredProjects.length;

  return (
    <div className="space-y-6">
      {/* Header with Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investimento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredProjects.length} projetos selecionados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalBeneficiaries)}</div>
            <p className="text-xs text-muted-foreground">
              Pessoas impactadas diretamente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Social Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSocialROI.toFixed(1)}:1</div>
            <p className="text-xs text-muted-foreground">
              Retorno sobre investimento social
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedType === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedType('all')}
        >
          Todos os Tipos
        </Badge>
        {['water', 'sewer', 'treatment', 'integrated'].map(type => (
          <Badge 
            key={type}
            variant={selectedType === type ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedType(type)}
          >
            {getTypeLabel(type)}
          </Badge>
        ))}
        
        <div className="w-4" />
        
        <Badge 
          variant={selectedStatus === 'all' ? 'default' : 'outline'}
          className="cursor-pointer"
          onClick={() => setSelectedStatus('all')}
        >
          Todos os Status
        </Badge>
        {['planning', 'execution', 'completed'].map(status => (
          <Badge 
            key={status}
            variant={selectedStatus === status ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedStatus(status)}
          >
            {getStatusLabel(status)}
          </Badge>
        ))}
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3" />
                    {project.location}
                  </div>
                </div>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusLabel(project.status)}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>

              {/* Investment and Beneficiaries */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium text-primary">
                    {formatCurrency(project.investmentAmount)}
                  </div>
                  <div className="text-muted-foreground">Investimento</div>
                </div>
                <div>
                  <div className="font-medium text-primary">
                    {formatNumber(project.beneficiaries)}
                  </div>
                  <div className="text-muted-foreground">Beneficiários</div>
                </div>
              </div>

              {/* ROI Metrics */}
              <div className="space-y-2">
                <div className="text-sm font-medium">ROI por Categoria:</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Social: {project.roi.social.toFixed(1)}:1</span>
                    <span>Payback: {project.paybackPeriod.toFixed(1)} anos</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Econômico: {project.roi.economic.toFixed(1)}:1</span>
                    <span>Ambiental: {project.roi.environmental.toFixed(1)}:1</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progresso</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Project Dates */}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                {project.completionDate && (
                  <span> • Conclusão: {new Date(project.completionDate).toLocaleDateString('pt-BR')}</span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-3 h-3 mr-1" />
                  Ver Detalhes
                </Button>
                <Button size="sm" className="flex-1">
                  <BarChart3 className="w-3 h-3 mr-1" />
                  Analisar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              Nenhum projeto encontrado com os filtros selecionados.
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectCatalog;