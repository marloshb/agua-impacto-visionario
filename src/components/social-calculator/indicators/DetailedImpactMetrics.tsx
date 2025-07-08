
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  Leaf, 
  TrendingDown,
  Globe,
  Briefcase,
  AlertTriangle,
  Target
} from 'lucide-react';

interface ImpactMetric {
  id: string;
  name: string;
  category: 'social' | 'education' | 'environment' | 'inequality' | 'vulnerability' | 'economic';
  value: number;
  unit: string;
  baseline: number;
  target: number;
  description: string;
  methodology: string;
  sdgAlignment: string[];
  trend: 'improving' | 'stable' | 'declining';
}

interface DetailedImpactMetricsProps {
  projectData: any;
  onMetricsUpdate: (metrics: ImpactMetric[]) => void;
}

export default function DetailedImpactMetrics({ 
  projectData, 
  onMetricsUpdate 
}: DetailedImpactMetricsProps) {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('social');

  useEffect(() => {
    if (projectData) {
      calculateDetailedMetrics();
    }
  }, [projectData]);

  const calculateDetailedMetrics = async () => {
    setIsCalculating(true);
    
    const calculatedMetrics: ImpactMetric[] = [
      {
        id: 'hdl_improvement',
        name: 'Melhoria no IDH Local',
        category: 'social',
        value: calculateHDLImprovement(),
        unit: 'pontos',
        baseline: 0.65,
        target: 0.68,
        description: 'Impacto no Índice de Desenvolvimento Humano da área',
        methodology: 'Correlação entre acesso ao saneamento e componentes do IDH',
        sdgAlignment: ['ODS 3', 'ODS 6', 'ODS 11'],
        trend: 'improving'
      },
      {
        id: 'inequality_reduction',
        name: 'Redução da Desigualdade Social',
        category: 'inequality',
        value: calculateInequalityReduction(),
        unit: 'pontos Gini',
        baseline: 0.52,
        target: 0.48,
        description: 'Diminuição do índice de Gini local',
        methodology: 'Impacto na renda das famílias de baixa renda',
        sdgAlignment: ['ODS 1', 'ODS 10'],
        trend: 'improving'
      },
      {
        id: 'education_impact',
        name: 'Impacto na Educação',
        category: 'education',
        value: calculateEducationImpact(),
        unit: '% redução absenteísmo',
        baseline: 15,
        target: 10,
        description: 'Redução do absenteísmo escolar',
        methodology: 'Correlação entre saúde e frequência escolar',
        sdgAlignment: ['ODS 4'],
        trend: 'improving'
      },
      {
        id: 'carbon_mitigation',
        name: 'Mitigação de Emissões de Carbono',
        category: 'environment',
        value: calculateCarbonMitigation(),
        unit: 'tCO₂e/ano',
        baseline: 0,
        target: 150,
        description: 'Redução de emissões de gases de efeito estufa',
        methodology: 'Fatores de emissão IPCC para tratamento de esgoto',
        sdgAlignment: ['ODS 13'],
        trend: 'improving'
      },
      {
        id: 'economic_connectivity',
        name: 'Conectividade Econômica',
        category: 'economic',
        value: calculateEconomicConnectivity(),
        unit: 'novos empregos',
        baseline: 0,
        target: 80,
        description: 'Empregos diretos e indiretos gerados',
        methodology: 'Modelo input-output regional',
        sdgAlignment: ['ODS 8'],
        trend: 'improving'
      },
      {
        id: 'vulnerability_index',
        name: 'Índice de Vulnerabilidade Socioambiental',
        category: 'vulnerability',
        value: calculateVulnerabilityReduction(),
        unit: 'pontos',
        baseline: 0.8,
        target: 0.5,
        description: 'Redução da vulnerabilidade a riscos climáticos',
        methodology: 'Índice composto climático e socioeconômico',
        sdgAlignment: ['ODS 11', 'ODS 13'],
        trend: 'improving'
      }
    ];

    setMetrics(calculatedMetrics);
    onMetricsUpdate(calculatedMetrics);
    setIsCalculating(false);
  };

  const calculateHDLImprovement = () => {
    const healthImpact = (projectData.health?.waterborneIllnesses || 150) * 0.0001;
    const incomeImpact = (projectData.demographics?.averageIncome || 2000) * 0.0001;
    return Math.round((healthImpact + incomeImpact) * 1000) / 1000;
  };

  const calculateInequalityReduction = () => {
    const populationImpact = projectData.demographics?.totalPopulation || 5000;
    const reductionFactor = Math.min(populationImpact / 10000, 0.1);
    return Math.round(reductionFactor * 1000) / 1000;
  };

  const calculateEducationImpact = () => {
    const diseaseReduction = 0.3; // 30% redução em doenças
    const absenteeismReduction = diseaseReduction * 0.4; // 40% correlação
    return Math.round(absenteeismReduction * 100);
  };

  const calculateCarbonMitigation = () => {
    const sewageVolume = (projectData.infrastructure?.pipelineLength || 10) * 100; // m³/dia
    const emissionFactor = 0.365; // tCO₂e/m³/ano
    return Math.round(sewageVolume * emissionFactor);
  };

  const calculateEconomicConnectivity = () => {
    const investment = projectData.infrastructure?.investmentAmount || 1000000;
    const jobsPerMillion = 8; // empregos por milhão investido
    return Math.round((investment / 1000000) * jobsPerMillion);
  };

  const calculateVulnerabilityReduction = () => {
    const floodRisk = projectData.climate?.floodRisk || 30;
    const reductionFactor = 0.4; // 40% redução
    return Math.round((floodRisk * reductionFactor * 0.01) * 100) / 100;
  };

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'social': return <Users className="w-5 h-5 text-blue-500" />;
      case 'education': return <GraduationCap className="w-5 h-5 text-purple-500" />;
      case 'environment': return <Leaf className="w-5 h-5 text-green-500" />;
      case 'inequality': return <TrendingDown className="w-5 h-5 text-orange-500" />;
      case 'vulnerability': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'economic': return <Briefcase className="w-5 h-5 text-yellow-500" />;
      default: return <Target className="w-5 h-5 text-gray-500" />;
    }
  };

  const getProgressPercentage = (baseline: number, current: number, target: number) => {
    if (target === baseline) return 100;
    return Math.min(Math.max(((current - baseline) / (target - baseline)) * 100, 0), 100);
  };

  const formatValue = (value: number, unit: string) => {
    if (unit.includes('%')) return `${value}%`;
    if (unit.includes('pontos')) return value.toFixed(3);
    if (unit.includes('tCO₂e')) return `${value} tCO₂e`;
    return value.toLocaleString('pt-BR');
  };

  const getCategoryMetrics = (category: string) => {
    return metrics.filter(metric => metric.category === category);
  };

  const categories = [
    { id: 'social', name: 'Social', icon: Users },
    { id: 'education', name: 'Educação', icon: GraduationCap },
    { id: 'environment', name: 'Ambiental', icon: Leaf },
    { id: 'inequality', name: 'Desigualdade', icon: TrendingDown },
    { id: 'vulnerability', name: 'Vulnerabilidade', icon: AlertTriangle },
    { id: 'economic', name: 'Econômico', icon: Briefcase }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Métricas Detalhadas de Impacto
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Indicadores quantificáveis de impacto social, ambiental e econômico
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="w-4 h-4 mr-1" />
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <div className="space-y-4">
                  {getCategoryMetrics(category.id).map((metric) => (
                    <Card key={metric.id} className="border-l-4 border-l-primary">
                      <CardContent className="pt-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {getMetricIcon(metric.category)}
                            <div>
                              <h4 className="font-medium">{metric.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {metric.description}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">
                              {formatValue(metric.value, metric.unit)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {metric.unit}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Progresso (Baseline → Meta)</span>
                            <span>
                              {getProgressPercentage(metric.baseline, metric.value, metric.target).toFixed(1)}%
                            </span>
                          </div>
                          <Progress 
                            value={getProgressPercentage(metric.baseline, metric.value, metric.target)} 
                            className="h-2" 
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Base: {formatValue(metric.baseline, metric.unit)}</span>
                            <span>Meta: {formatValue(metric.target, metric.unit)}</span>
                          </div>
                        </div>

                        <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                          <div className="font-medium mb-1">Metodologia:</div>
                          <div>{metric.methodology}</div>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <div className="flex gap-1">
                            {metric.sdgAlignment.map((sdg) => (
                              <Badge key={sdg} variant="outline" className="text-xs">
                                {sdg}
                              </Badge>
                            ))}
                          </div>
                          <Badge 
                            variant={metric.trend === 'improving' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {metric.trend === 'improving' ? 'Melhorando' : 'Estável'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
