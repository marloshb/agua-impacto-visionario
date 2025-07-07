import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area
} from 'recharts';
import { 
  Activity, 
  DollarSign, 
  Users, 
  Leaf, 
  TrendingUp, 
  TrendingDown,
  Download,
  Share,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Target
} from 'lucide-react';
import { CalculationResults, AIInsight } from '@/types/calculator';

interface ResultsDashboardProps {
  results: CalculationResults;
  insights: AIInsight[];
  projectName: string;
}

export default function ResultsDashboard({ 
  results, 
  insights, 
  projectName 
}: ResultsDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Data for ROI timeline chart
  const roiTimelineData = [
    { year: 'Ano 1', social: -20, economic: -15, environmental: -10 },
    { year: 'Ano 2', social: 5, economic: 8, environmental: 12 },
    { year: 'Ano 3', social: 25, economic: 28, environmental: 22 },
    { year: 'Ano 5', social: 65, economic: 75, environmental: 58 },
    { year: 'Ano 7', social: 120, economic: 140, environmental: 95 },
    { year: 'Ano 10', social: 200, economic: 250, environmental: 180 }
  ];

  // Data for impact breakdown
  const impactBreakdownData = [
    { name: 'Saúde', value: results.healthImpacts.savedMedicalCosts, color: '#22c55e' },
    { name: 'Economia', value: results.economicImpacts.productivityGains, color: '#3b82f6' },
    { name: 'Social', value: 150000, color: '#8b5cf6' },
    { name: 'Ambiental', value: results.environmentalImpacts.ecosystemServices, color: '#10b981' }
  ];

  // Risk assessment data
  const riskData = [
    { category: 'Climático', value: 65, max: 100 },
    { category: 'Técnico', value: 25, max: 100 },
    { category: 'Financeiro', value: 45, max: 100 },
    { category: 'Social', value: 15, max: 100 }
  ];

  // Health impact timeline
  const healthTimelineData = [
    { year: 'Atual', illnesses: 150, hospitalizations: 45 },
    { year: 'Ano 1', illnesses: 135, hospitalizations: 40 },
    { year: 'Ano 3', illnesses: 105, hospitalizations: 28 },
    { year: 'Ano 5', illnesses: 75, hospitalizations: 18 },
    { year: 'Ano 10', illnesses: 45, hospitalizations: 12 }
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

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'recommendation': return <Target className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'prediction': return <Calendar className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'recommendation': return 'text-blue-600 dark:text-blue-400';
      case 'alert': return 'text-orange-600 dark:text-orange-400';
      case 'optimization': return 'text-green-600 dark:text-green-400';
      case 'prediction': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Resultados da Calculadora Social</h2>
          <p className="text-muted-foreground">{projectName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-health">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Social</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.roi.socialROI.toFixed(1)}:1
            </div>
            <p className="text-xs text-muted-foreground">
              Cada R$ 1 gera R$ {results.roi.socialROI.toFixed(1)} em benefícios sociais
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-economic">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Econômico</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {results.roi.economicROI.toFixed(1)}:1
            </div>
            <p className="text-xs text-muted-foreground">
              Payback em {results.roi.paybackPeriod.toFixed(1)} anos
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-water">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vidas Impactadas</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatNumber(results.healthImpacts.qualityAdjustedLifeYears)}
            </div>
            <p className="text-xs text-muted-foreground">
              Anos de vida com qualidade ganhos
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
              {formatNumber(results.environmentalImpacts.carbonFootprintReduction)}
            </div>
            <p className="text-xs text-muted-foreground">
              Toneladas CO₂ reduzidas/ano
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="health">Saúde</TabsTrigger>
          <TabsTrigger value="economic">Economia</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="risks">Riscos</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ROI ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={roiTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, '']} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="social" 
                      stroke="hsl(var(--health-green))" 
                      strokeWidth={2}
                      name="ROI Social"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="economic" 
                      stroke="hsl(var(--water-blue))" 
                      strokeWidth={2}
                      name="ROI Econômico"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="environmental" 
                      stroke="hsl(var(--climate-purple))" 
                      strokeWidth={2}
                      name="ROI Ambiental"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Impact Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Benefícios (R$/ano)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {impactBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Insights da Inteligência Artificial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={getInsightColor(insight.type)}>
                        {getInsightIcon(insight.type)}
                      </div>
                      <Badge variant={insight.impact === 'high' ? 'default' : 'secondary'}>
                        {insight.impact === 'high' ? 'Alto Impacto' : 
                         insight.impact === 'medium' ? 'Médio Impacto' : 'Baixo Impacto'}
                      </Badge>
                      <Badge variant="outline">
                        {insight.confidence}% confiança
                      </Badge>
                    </div>
                    <h4 className="font-medium">{insight.title}</h4>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                    {insight.actionable && (
                      <Button size="sm" variant="outline" className="mt-2">
                        Ver Ação Recomendada
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Health Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Impactos na Saúde</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Doenças Prevenidas</span>
                    <span className="font-medium">{formatNumber(results.healthImpacts.preventedIllnesses)}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Internações Reduzidas</span>
                    <span className="font-medium">{formatNumber(results.healthImpacts.reducedHospitalizations)}</span>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mortalidade Infantil</span>
                    <span className="font-medium">-{results.healthImpacts.childMortalityReduction}%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Expectativa de Vida</span>
                    <span className="font-medium">+{results.healthImpacts.improvedLifeExpectancy} anos</span>
                  </div>
                  <Progress value={50} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Health Timeline */}
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Redução de Doenças ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={healthTimelineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="illnesses" 
                      stroke="hsl(var(--health-green))" 
                      fill="hsl(var(--health-green))"
                      fillOpacity={0.3}
                      name="Casos de Doenças"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hospitalizations" 
                      stroke="hsl(var(--water-blue))" 
                      fill="hsl(var(--water-blue))"
                      fillOpacity={0.3}
                      name="Internações"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Savings */}
          <Card>
            <CardHeader>
              <CardTitle>Economia em Custos de Saúde</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(results.healthImpacts.savedMedicalCosts)}
              </div>
              <p className="text-muted-foreground">
                Economia anual estimada em custos médicos diretos e indiretos
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Valorização Imobiliária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  +{results.economicImpacts.propertyValueIncrease.toFixed(1)}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Aumento médio no valor dos imóveis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Novos Empregos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {formatNumber(results.economicImpacts.newJobs)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Postos de trabalho diretos e indiretos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ganhos de Produtividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">
                  {formatCurrency(results.economicImpacts.productivityGains)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Ganhos anuais em produtividade
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crescimento do Turismo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600 mb-2">
                  +{results.economicImpacts.tourismIncrease}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Aumento estimado no turismo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Negócios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-teal-600 mb-2">
                  +{results.economicImpacts.businessGrowth}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Crescimento do setor empresarial
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita Tributária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-indigo-600 mb-2">
                  {formatCurrency(results.economicImpacts.taxRevenueIncrease)}
                </div>
                <p className="text-sm text-muted-foreground">
                  Aumento anual na arrecadação
                </p>
              </CardContent>
            </Card>
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
                    <span>Melhoria na Educação</span>
                    <span className="font-medium">+{results.socialImpacts.educationImprovement}%</span>
                  </div>
                  <Progress value={results.socialImpacts.educationImprovement * 5} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Equidade de Gênero</span>
                    <span className="font-medium">+{(results.socialImpacts.genderEquity * 100).toFixed(0)} pontos</span>
                  </div>
                  <Progress value={results.socialImpacts.genderEquity * 500} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Bem-estar Comunitário</span>
                    <span className="font-medium">{results.socialImpacts.communityWellbeing}/100</span>
                  </div>
                  <Progress value={results.socialImpacts.communityWellbeing} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Ganho de Tempo (Mulheres)</span>
                    <span className="font-medium">{results.socialImpacts.timeGainsByWomen}h/semana</span>
                  </div>
                  <Progress value={results.socialImpacts.timeGainsByWomen * 5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Redução da Desigualdade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-green-600">
                    {(Math.abs(results.socialImpacts.reducedInequality) * 100).toFixed(1)} pontos
                  </div>
                  <p className="text-muted-foreground">
                    Redução no Coeficiente de Gini
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                    <TrendingDown className="w-4 h-4" />
                    <span>Melhoria significativa na distribuição de renda</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Radar */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliação de Riscos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={riskData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Nível de Risco"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.3}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Risk Score */}
            <Card>
              <CardHeader>
                <CardTitle>Score Geral de Risco</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="text-4xl font-bold text-green-600">
                  {results.risks.overallRiskScore}/100
                </div>
                <Badge variant="secondary" className="text-green-600">
                  Risco Baixo
                </Badge>
                <p className="text-muted-foreground">
                  Projeto apresenta baixo risco geral com mitigações adequadas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Risk Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.risks.climateRisks.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    Risco Climático - {risk.type}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Probabilidade:</span>
                      <span>{(risk.probability * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impacto:</span>
                      <span>{risk.impact.toFixed(0)}/100</span>
                    </div>
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">
                        <strong>Mitigação:</strong> {risk.mitigation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}