
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Droplets, 
  Heart, 
  DollarSign, 
  Users, 
  Leaf, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Factory,
  School,
  Home,
  Zap
} from 'lucide-react';
import { CalculationResults } from '@/types/calculator';

interface ImpactAnalysisProps {
  results: CalculationResults;
  projectType: 'water_loss' | 'reuse' | 'security' | 'sanitation';
}

interface DetailedImpact {
  health: {
    waterborneDiseasesReduction: number;
    hospitalizations: number;
    schoolAttendanceImprovement: number;
    lifeExpectancyGain: number;
    qualityOfLifeIndex: number;
  };
  economic: {
    operationalSavings: number;
    propertyValueIncrease: number;
    productivityGains: number;
    energySavings: number;
    taxRevenueIncrease: number;
  };
  social: {
    coverageIncrease: number;
    educationImprovement: number;
    genderEquity: number;
    communityWellbeing: number;
    accessibilityImprovement: number;
  };
  environmental: {
    waterSaved: number;
    carbonEmissionReduction: number;
    aquiferPressureReduction: number;
    waterBodyRecovery: number;
    ecosystemResilience: number;
  };
  roi: {
    socialROI: number;
    economicROI: number;
    environmentalROI: number;
    paybackPeriod: number;
    totalBenefitCostRatio: number;
  };
}

export default function ImpactAnalysis({ results, projectType }: ImpactAnalysisProps) {
  const [activeMetric, setActiveMetric] = useState('overview');

  // Calcular impactos detalhados baseados no tipo de projeto
  const calculateDetailedImpacts = (): DetailedImpact => {
    const basePopulation = 100000; // População base para cálculos
    
    switch (projectType) {
      case 'water_loss':
        return {
          health: {
            waterborneDiseasesReduction: 25,
            hospitalizations: 150,
            schoolAttendanceImprovement: 8,
            lifeExpectancyGain: 1.2,
            qualityOfLifeIndex: 15
          },
          economic: {
            operationalSavings: 2500000,
            propertyValueIncrease: 8,
            productivityGains: 1800000,
            energySavings: 450000,
            taxRevenueIncrease: 320000
          },
          social: {
            coverageIncrease: 15,
            educationImprovement: 8,
            genderEquity: 0.12,
            communityWellbeing: 22,
            accessibilityImprovement: 18
          },
          environmental: {
            waterSaved: 15000000, // m³/ano
            carbonEmissionReduction: 2800,
            aquiferPressureReduction: 35,
            waterBodyRecovery: 28,
            ecosystemResilience: 25
          },
          roi: {
            socialROI: 3.8,
            economicROI: 4.2,
            environmentalROI: 2.9,
            paybackPeriod: 6.5,
            totalBenefitCostRatio: 4.1
          }
        };
        
      case 'reuse':
        return {
          health: {
            waterborneDiseasesReduction: 18,
            hospitalizations: 95,
            schoolAttendanceImprovement: 5,
            lifeExpectancyGain: 0.8,
            qualityOfLifeIndex: 12
          },
          economic: {
            operationalSavings: 3200000,
            propertyValueIncrease: 12,
            productivityGains: 2400000,
            energySavings: 680000,
            taxRevenueIncrease: 480000
          },
          social: {
            coverageIncrease: 20,
            educationImprovement: 5,
            genderEquity: 0.08,
            communityWellbeing: 18,
            accessibilityImprovement: 25
          },
          environmental: {
            waterSaved: 25000000,
            carbonEmissionReduction: 4200,
            aquiferPressureReduction: 45,
            waterBodyRecovery: 35,
            ecosystemResilience: 38
          },
          roi: {
            socialROI: 4.5,
            economicROI: 5.1,
            environmentalROI: 3.8,
            paybackPeriod: 5.2,
            totalBenefitCostRatio: 5.0
          }
        };
        
      case 'security':
        return {
          health: {
            waterborneDiseasesReduction: 35,
            hospitalizations: 220,
            schoolAttendanceImprovement: 12,
            lifeExpectancyGain: 1.8,
            qualityOfLifeIndex: 25
          },
          economic: {
            operationalSavings: 1800000,
            propertyValueIncrease: 18,
            productivityGains: 3200000,
            energySavings: 320000,
            taxRevenueIncrease: 580000
          },
          social: {
            coverageIncrease: 30,
            educationImprovement: 15,
            genderEquity: 0.18,
            communityWellbeing: 35,
            accessibilityImprovement: 28
          },
          environmental: {
            waterSaved: 18000000,
            carbonEmissionReduction: 3500,
            aquiferPressureReduction: 40,
            waterBodyRecovery: 32,
            ecosystemResilience: 42
          },
          roi: {
            socialROI: 5.2,
            economicROI: 4.8,
            environmentalROI: 3.5,
            paybackPeriod: 7.8,
            totalBenefitCostRatio: 4.8
          }
        };
        
      default: // sanitation
        return {
          health: {
            waterborneDiseasesReduction: 65,
            hospitalizations: 450,
            schoolAttendanceImprovement: 22,
            lifeExpectancyGain: 2.8,
            qualityOfLifeIndex: 45
          },
          economic: {
            operationalSavings: 1200000,
            propertyValueIncrease: 25,
            productivityGains: 4200000,
            energySavings: 280000,
            taxRevenueIncrease: 780000
          },
          social: {
            coverageIncrease: 45,
            educationImprovement: 25,
            genderEquity: 0.25,
            communityWellbeing: 50,
            accessibilityImprovement: 35
          },
          environmental: {
            waterSaved: 12000000,
            carbonEmissionReduction: 2200,
            aquiferPressureReduction: 25,
            waterBodyRecovery: 65,
            ecosystemResilience: 55
          },
          roi: {
            socialROI: 6.8,
            economicROI: 5.5,
            environmentalROI: 4.2,
            paybackPeriod: 8.5,
            totalBenefitCostRatio: 6.1
          }
        };
    }
  };

  const detailedImpacts = calculateDetailedImpacts();

  // Dados para gráficos
  const healthTimelineData = [
    { year: 'Atual', diseases: 100, hospitalizations: 100 },
    { year: 'Ano 1', diseases: 92, hospitalizations: 88 },
    { year: 'Ano 3', diseases: 68, hospitalizations: 65 },
    { year: 'Ano 5', diseases: 45, hospitalizations: 40 },
    { year: 'Ano 10', diseases: 35, hospitalizations: 28 }
  ];

  const economicImpactData = [
    { category: 'Poupança Operacional', value: detailedImpacts.economic.operationalSavings },
    { category: 'Ganhos Produtividade', value: detailedImpacts.economic.productivityGains },
    { category: 'Economia Energia', value: detailedImpacts.economic.energySavings },
    { category: 'Receita Tributária', value: detailedImpacts.economic.taxRevenueIncrease }
  ];

  const environmentalData = [
    { metric: 'Água Economizada', value: detailedImpacts.environmental.waterSaved, unit: 'm³/ano' },
    { metric: 'Redução CO₂', value: detailedImpacts.environmental.carbonEmissionReduction, unit: 'ton/ano' },
    { metric: 'Recuperação Corpos Hídricos', value: detailedImpacts.environmental.waterBodyRecovery, unit: '%' },
    { metric: 'Resiliência Ecossistemas', value: detailedImpacts.environmental.ecosystemResilience, unit: 'pontos' }
  ];

  const roiComparisonData = [
    { type: 'Social', roi: detailedImpacts.roi.socialROI, color: '#22c55e' },
    { type: 'Econômico', roi: detailedImpacts.roi.economicROI, color: '#3b82f6' },
    { type: 'Ambiental', roi: detailedImpacts.roi.environmentalROI, color: '#8b5cf6' }
  ];

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

  const getProjectTypeTitle = () => {
    switch (projectType) {
      case 'water_loss': return 'Redução de Perdas na Distribuição';
      case 'reuse': return 'Água de Reuso para Grandes Consumidores';
      case 'security': return 'Segurança Hídrica em Região de Escassez';
      case 'sanitation': return 'Universalização do Esgotamento Sanitário';
      default: return 'Análise de Impactos';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Análise Completa de Impactos</h2>
          <p className="text-muted-foreground">{getProjectTypeTitle()}</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          ROI Geral: {detailedImpacts.roi.totalBenefitCostRatio.toFixed(1)}:1
        </Badge>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="shadow-health">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto Saúde</CardTitle>
            <Heart className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              -{detailedImpacts.health.waterborneDiseasesReduction}%
            </div>
            <p className="text-xs text-muted-foreground">
              Redução doenças hídricas
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-economic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto Econômico</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(detailedImpacts.economic.operationalSavings)}
            </div>
            <p className="text-xs text-muted-foreground">
              Economia operacional/ano
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-water">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto Social</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{detailedImpacts.social.coverageIncrease}%
            </div>
            <p className="text-xs text-muted-foreground">
              Aumento cobertura
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto Ambiental</CardTitle>
            <Leaf className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(detailedImpacts.environmental.waterSaved)}
            </div>
            <p className="text-xs text-muted-foreground">
              m³ água economizada/ano
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payback</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {detailedImpacts.roi.paybackPeriod.toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              anos para retorno
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Análise Detalhada por Eixo */}
      <Tabs value={activeMetric} onValueChange={setActiveMetric} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="health">Saúde</TabsTrigger>
          <TabsTrigger value="economic">Economia</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="environmental">Ambiental</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Comparação de ROI por Eixo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={roiComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}:1`, 'ROI']} />
                    <Bar dataKey="roi" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Timeline Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução dos Benefícios</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={healthTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="diseases" 
                      stroke="#ef4444" 
                      name="Índice Doenças"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hospitalizations" 
                      stroke="#3b82f6" 
                      name="Índice Internações"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-600" />
                  Redução de Doenças
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Doenças Hídricas</span>
                    <span className="font-medium">-{detailedImpacts.health.waterborneDiseasesReduction}%</span>
                  </div>
                  <Progress value={detailedImpacts.health.waterborneDiseasesReduction} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Internações</span>
                    <span className="font-medium">{detailedImpacts.health.hospitalizations}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Frequência Escolar</span>
                    <span className="font-medium">+{detailedImpacts.health.schoolAttendanceImprovement}%</span>
                  </div>
                  <Progress value={detailedImpacts.health.schoolAttendanceImprovement * 4} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Expectativa de Vida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">
                    +{detailedImpacts.health.lifeExpectancyGain} anos
                  </div>
                  <p className="text-muted-foreground">
                    Ganho médio na expectativa de vida
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Qualidade de Vida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">
                    +{detailedImpacts.health.qualityOfLifeIndex} pontos
                  </div>
                  <p className="text-muted-foreground">
                    Melhoria no índice de qualidade de vida
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Benefícios Econômicos Anuais</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={economicImpactData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={120} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="w-5 h-5 text-purple-600" />
                    Valorização Imobiliária
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    +{detailedImpacts.economic.propertyValueIncrease}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Aumento médio no valor dos imóveis
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    Economia de Energia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600 mb-2">
                    {formatCurrency(detailedImpacts.economic.energySavings)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Economia anual em energia
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Aumento de Cobertura</span>
                    <span className="font-medium">+{detailedImpacts.social.coverageIncrease}%</span>
                  </div>
                  <Progress value={detailedImpacts.social.coverageIncrease * 2} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Melhoria na Educação</span>
                    <span className="font-medium">+{detailedImpacts.social.educationImprovement}%</span>
                  </div>
                  <Progress value={detailedImpacts.social.educationImprovement * 3} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Equidade de Gênero</span>
                    <span className="font-medium">+{(detailedImpacts.social.genderEquity * 100).toFixed(0)} pontos</span>
                  </div>
                  <Progress value={detailedImpacts.social.genderEquity * 300} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bem-estar Comunitário</span>
                    <span className="font-medium">+{detailedImpacts.social.communityWellbeing} pontos</span>
                  </div>
                  <Progress value={detailedImpacts.social.communityWellbeing * 2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="w-5 h-5 text-blue-600" />
                  Impacto na Educação
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      +{detailedImpacts.health.schoolAttendanceImprovement}%
                    </div>
                    <p className="text-muted-foreground">
                      Melhoria na frequência escolar
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>• Redução do absenteísmo por doenças</p>
                    <p>• Melhoria nas condições de higiene</p>
                    <p>• Maior tempo para estudos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {environmentalData.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    {item.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {formatNumber(item.value)} {item.unit}
                  </div>
                  <Progress value={Math.min(item.value / 1000, 100)} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Benefícios Ambientais Detalhados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Recursos Hídricos:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Redução da pressão sobre mananciais</li>
                    <li>• Melhoria da qualidade dos corpos hídricos</li>
                    <li>• Aumento da disponibilidade de água potável</li>
                    <li>• Preservação de aquíferos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Clima e Biodiversidade:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Redução de emissões de carbono</li>
                    <li>• Melhoria da resiliência ecossistêmica</li>
                    <li>• Preservação da biodiversidade aquática</li>
                    <li>• Redução de impactos ambientais</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
