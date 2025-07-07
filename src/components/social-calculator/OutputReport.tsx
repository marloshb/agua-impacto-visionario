import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Download, 
  FileText, 
  Share, 
  Printer,
  TrendingUp,
  DollarSign,
  Users,
  Leaf,
  Heart,
  Building,
  Droplets,
  ChartBar,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
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
  Radar
} from 'recharts';

interface OutputReportProps {
  projectName: string;
  results: any;
}

const OutputReport = ({ projectName, results }: OutputReportProps) => {
  const [selectedFormat, setSelectedFormat] = useState('summary');

  // Sample data for charts
  const impactSummaryData = [
    { category: 'Saúde', valor: 1250000, meta: 1500000, percentual: 83 },
    { category: 'Econômico', valor: 2100000, meta: 2000000, percentual: 105 },
    { category: 'Social', valor: 850000, meta: 1000000, percentual: 85 },
    { category: 'Ambiental', valor: 650000, meta: 800000, percentual: 81 }
  ];

  const roiComparisonData = [
    { ano: 'Ano 1', social: 1.2, economico: 0.8, ambiental: 0.5 },
    { ano: 'Ano 3', social: 2.8, economico: 2.1, ambiental: 1.9 },
    { ano: 'Ano 5', social: 4.2, economico: 3.8, ambiental: 3.2 },
    { ano: 'Ano 10', social: 6.8, economico: 5.9, ambiental: 4.7 }
  ];

  const beneficiariesData = [
    { name: 'Crianças 0-5 anos', value: 3500, color: '#22c55e' },
    { name: 'Adultos 18-65 anos', value: 12000, color: '#3b82f6' },
    { name: 'Idosos 65+ anos', value: 2500, color: '#8b5cf6' },
    { name: 'Gestantes', value: 800, color: '#f59e0b' }
  ];

  const riskAssessmentData = [
    { risk: 'Financeiro', probability: 65, impact: 70, mitigation: 85 },
    { risk: 'Técnico', probability: 35, impact: 60, mitigation: 90 },
    { risk: 'Climático', probability: 80, impact: 85, mitigation: 60 },
    { risk: 'Social', probability: 25, impact: 40, mitigation: 95 }
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

  const exportOptions = [
    { format: 'PDF', icon: FileText, description: 'Relatório completo em PDF' },
    { format: 'Excel', icon: ChartBar, description: 'Dados e gráficos em planilha' },
    { format: 'PowerPoint', icon: Printer, description: 'Apresentação executiva' }
  ];

  return (
    <div className="space-y-6">
      {/* Header with Export Options */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatório de Saída</h2>
          <p className="text-muted-foreground">{projectName}</p>
        </div>
        <div className="flex gap-2">
          {exportOptions.map((option) => (
            <Button key={option.format} variant="outline" size="sm">
              <option.icon className="w-4 h-4 mr-2" />
              {option.format}
            </Button>
          ))}
          <Button>
            <Share className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ROI Total</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">5.2:1</div>
            <p className="text-xs text-green-600">
              Cada R$ 1 investido gera R$ 5,20 em benefícios
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Presente Líquido</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">R$ 8.5M</div>
            <p className="text-xs text-blue-600">
              VPL positivo confirma viabilidade
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiários</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-700">18.8K</div>
            <p className="text-xs text-purple-600">
              Pessoas diretamente impactadas
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payback</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-700">6.2 anos</div>
            <p className="text-xs text-orange-600">
              Período de retorno do investimento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Report Tabs */}
      <Tabs value={selectedFormat} onValueChange={setSelectedFormat} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Sumário Executivo</TabsTrigger>
          <TabsTrigger value="impacts">Análise de Impactos</TabsTrigger>
          <TabsTrigger value="financial">Análise Financeira</TabsTrigger>
          <TabsTrigger value="risks">Gestão de Riscos</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          {/* Impact Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Impactos por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {impactSummaryData.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {formatCurrency(item.valor)} / {formatCurrency(item.meta)}
                      </span>
                    </div>
                    <Progress value={item.percentual} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{item.percentual}% da meta alcançada</span>
                      <span>Meta: {formatCurrency(item.meta)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ROI Evolution */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução do ROI por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roiComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}:1`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="social" stroke="#22c55e" strokeWidth={2} name="ROI Social" />
                  <Line type="monotone" dataKey="economico" stroke="#3b82f6" strokeWidth={2} name="ROI Econômico" />
                  <Line type="monotone" dataKey="ambiental" stroke="#8b5cf6" strokeWidth={2} name="ROI Ambiental" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impacts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Beneficiaries Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Beneficiários</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={beneficiariesData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {beneficiariesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatNumber(value as number)} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Impact Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Impactos por Categoria (R$ milhões/ano)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={impactSummaryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Bar dataKey="valor" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Impact Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas Detalhadas de Impacto</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">2,150</div>
                  <div className="text-sm text-muted-foreground">Doenças Prevenidas/ano</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Building className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">+12%</div>
                  <div className="text-sm text-muted-foreground">Valorização Imobiliária</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Droplets className="h-8 w-8 text-cyan-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">450K</div>
                  <div className="text-sm text-muted-foreground">m³ Água Economizada/ano</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">125</div>
                  <div className="text-sm text-muted-foreground">Ton CO₂ Reduzidas/ano</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análise de Viabilidade Financeira</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Valor Presente Líquido (VPL)</span>
                  <span className="font-bold text-green-600">R$ 8.5M</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxa Interna de Retorno (TIR)</span>
                  <span className="font-bold">18.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Relação Benefício/Custo</span>
                  <span className="font-bold">5.2</span>
                </div>
                <div className="flex justify-between">
                  <span>Período de Payback</span>
                  <span className="font-bold">6.2 anos</span>
                </div>
                <div className="flex justify-between">
                  <span>Investimento Total</span>
                  <span className="font-bold">R$ 12.8M</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa Acumulado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={roiComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="economico" fill="#3b82f6" name="Benefícios Econômicos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Matriz de Riscos e Mitigação</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={riskAssessmentData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="risk" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Probabilidade" dataKey="probability" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                  <Radar name="Impacto" dataKey="impact" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                  <Radar name="Mitigação" dataKey="mitigation" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskAssessmentData.map((risk) => (
              <Card key={risk.risk}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    Risco {risk.risk}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Probabilidade</span>
                      <span>{risk.probability}%</span>
                    </div>
                    <Progress value={risk.probability} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Impacto</span>
                      <span>{risk.impact}%</span>
                    </div>
                    <Progress value={risk.impact} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Mitigação</span>
                      <span>{risk.mitigation}%</span>
                    </div>
                    <Progress value={risk.mitigation} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Recomendações de Otimização
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-medium">Ampliar Cobertura de Esgoto</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Expandir para mais 5.000 habitantes aumentaria o ROI social em 1.2 pontos.
                  </p>
                </div>
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-medium">Sistema de Reuso</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implementar reuso industrial poderia gerar economia adicional de R$ 800K/ano.
                  </p>
                </div>
                <div className="p-3 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20">
                  <h4 className="font-medium">Monitoramento Inteligente</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    IoT e sensores reduziriam perdas operacionais em até 15%.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Pontos de Atenção
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20">
                  <h4 className="font-medium">Gestão de Demanda</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Crescimento populacional pode exceder capacidade em 8 anos.
                  </p>
                </div>
                <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <h4 className="font-medium">Mudanças Climáticas</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Variações pluviométricas podem afetar disponibilidade hídrica.
                  </p>
                </div>
                <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                  <h4 className="font-medium">Manutenção Preventiva</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estabelecer cronograma rigoroso para manter eficiência operacional.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OutputReport;