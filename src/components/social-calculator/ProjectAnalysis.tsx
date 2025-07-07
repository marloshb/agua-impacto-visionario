
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
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
  Radar,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';
import { 
  ArrowLeft,
  TrendingUp,
  Target,
  Zap,
  Shield,
  Activity,
  Users,
  DollarSign,
  Heart,
  Leaf
} from 'lucide-react';

interface ProjectAnalysisProps {
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

const ProjectAnalysis = ({ project, onBack }: ProjectAnalysisProps) => {
  const [selectedScenario, setSelectedScenario] = useState('realistic');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Dados para análise temporal
  const temporalAnalysis = [
    { ano: 'Ano 1', social: 1.2, economico: 0.8, ambiental: 0.5, custos: 12800000, beneficios: 8500000 },
    { ano: 'Ano 2', social: 2.1, economico: 1.6, ambiental: 1.2, custos: 2100000, beneficios: 12400000 },
    { ano: 'Ano 3', social: 2.8, economico: 2.1, ambiental: 1.9, custos: 1800000, beneficios: 15200000 },
    { ano: 'Ano 4', social: 3.5, economico: 2.8, ambiental: 2.4, custos: 1650000, beneficios: 18800000 },
    { ano: 'Ano 5', social: 4.2, economico: 3.8, ambiental: 3.2, custos: 1500000, beneficios: 22100000 },
    { ano: 'Ano 7', social: 5.1, economico: 4.5, ambiental: 3.8, custos: 1350000, beneficios: 26500000 },
    { ano: 'Ano 10', social: 6.8, economico: 5.9, ambiental: 4.7, custos: 1200000, beneficios: 32000000 }
  ];

  // Análise de cenários
  const scenarioAnalysis = {
    conservative: { roi: 4.2, npv: 5200000, irr: 14.2, payback: 8.5 },
    realistic: { roi: 5.2, npv: 8500000, irr: 18.5, payback: 6.2 },
    optimistic: { roi: 6.8, npv: 12800000, irr: 24.1, payback: 4.8 }
  };

  // Comparação com benchmarks
  const benchmarkData = [
    { categoria: 'ROI Social', projeto: project.roi.social, benchmark: 4.1, setor: 5.5 },
    { categoria: 'ROI Econômico', projeto: project.roi.economic, benchmark: 3.2, setor: 4.8 },
    { categoria: 'ROI Ambiental', projeto: project.roi.environmental, benchmark: 2.8, setor: 3.9 },
    { categoria: 'Payback (anos)', projeto: project.paybackPeriod, benchmark: 7.2, setor: 5.8 }
  ];

  // Análise de sensibilidade
  const sensitivityData = [
    { variavel: 'Taxa Desconto', impacto: -15, probabilidade: 25 },
    { variavel: 'Crescimento Pop.', impacto: 12, probabilidade: 60 },
    { variavel: 'Tarifa Água', impacto: 8, probabilidade: 40 },
    { variavel: 'Custo Construção', impacto: -22, probabilidade: 35 },
    { variavel: 'Eficiência Op.', impacto: 18, probabilidade: 70 }
  ];

  // Distribuição de impactos
  const impactDistribution = [
    { name: 'Saúde', value: 35, color: '#ef4444' },
    { name: 'Econômico', value: 30, color: '#3b82f6' },
    { name: 'Social', value: 20, color: '#8b5cf6' },
    { name: 'Ambiental', value: 15, color: '#22c55e' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar ao Catálogo
        </Button>
        <div className="flex gap-2">
          {Object.keys(scenarioAnalysis).map((scenario) => (
            <Button
              key={scenario}
              variant={selectedScenario === scenario ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedScenario(scenario)}
            >
              {scenario === 'conservative' ? 'Conservador' : 
               scenario === 'realistic' ? 'Realista' : 'Otimista'}
            </Button>
          ))}
        </div>
      </div>

      {/* Project Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{project.name} - Análise Detalhada</CardTitle>
          <p className="text-muted-foreground">{project.location}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-lg font-bold">
                {scenarioAnalysis[selectedScenario as keyof typeof scenarioAnalysis].roi.toFixed(1)}:1
              </div>
              <div className="text-sm text-muted-foreground">ROI Total</div>
            </div>
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-lg font-bold">
                {formatCurrency(scenarioAnalysis[selectedScenario as keyof typeof scenarioAnalysis].npv)}
              </div>
              <div className="text-sm text-muted-foreground">VPL</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <div className="text-lg font-bold">
                {scenarioAnalysis[selectedScenario as keyof typeof scenarioAnalysis].irr.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">TIR</div>
            </div>
            <div className="text-center">
              <Target className="h-8 w-8 text-orange-500 mx-auto mb-2" />
              <div className="text-lg font-bold">
                {scenarioAnalysis[selectedScenario as keyof typeof scenarioAnalysis].payback.toFixed(1)} anos
              </div>
              <div className="text-sm text-muted-foreground">Payback</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Tabs */}
      <Tabs defaultValue="temporal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="temporal">Análise Temporal</TabsTrigger>
          <TabsTrigger value="benchmark">Benchmarking</TabsTrigger>
          <TabsTrigger value="sensitivity">Sensibilidade</TabsTrigger>
          <TabsTrigger value="impacts">Distribuição</TabsTrigger>
          <TabsTrigger value="scenarios">Cenários</TabsTrigger>
        </TabsList>

        <TabsContent value="temporal" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do ROI por Categoria</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={temporalAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${Number(value).toFixed(1)}:1`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="social" stroke="#ef4444" strokeWidth={2} name="ROI Social" />
                    <Line type="monotone" dataKey="economico" stroke="#3b82f6" strokeWidth={2} name="ROI Econômico" />
                    <Line type="monotone" dataKey="ambiental" stroke="#22c55e" strokeWidth={2} name="ROI Ambiental" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fluxo de Caixa Acumulado</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={temporalAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ano" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [formatCurrency(Number(value)), '']} />
                    <Legend />
                    <Area type="monotone" dataKey="beneficios" stackId="1" stroke="#22c55e" fill="#22c55e" fillOpacity={0.3} name="Benefícios" />
                    <Bar dataKey="custos" fill="#ef4444" name="Custos" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Métricas de Performance Temporal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">Ano 3</div>
                  <div className="text-sm text-muted-foreground">Break-even Point</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">85%</div>
                  <div className="text-sm text-muted-foreground">Probabilidade Sucesso</div>
                </div>
                <div className="text-center p-4 border rounded">
                  <Activity className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold">32M</div>
                  <div className="text-sm text-muted-foreground">Benefícios 10 anos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmark" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comparação com Benchmarks do Setor</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={benchmarkData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="categoria" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="projeto" fill="#3b82f6" name="Este Projeto" />
                  <Bar dataKey="benchmark" fill="#8b5cf6" name="Benchmark Médio" />
                  <Bar dataKey="setor" fill="#22c55e" name="Melhor do Setor" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Performance vs Saúde
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">125%</div>
                <p className="text-sm text-muted-foreground">Acima da média do setor</p>
                <Progress value={125} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Performance Econômica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">108%</div>
                <p className="text-sm text-muted-foreground">Acima da média do setor</p>
                <Progress value={108} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  Performance Ambiental
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">95%</div>
                <p className="text-sm text-muted-foreground">Próximo à média do setor</p>
                <Progress value={95} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sensitivity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análise de Sensibilidade</CardTitle>
              <p className="text-sm text-muted-foreground">
                Impacto de variações de ±20% nas principais variáveis
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="variavel" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`${value}%`, 'Impacto no ROI']} />
                  <Bar dataKey="impacto" fill={(entry: any) => entry.impacto > 0 ? '#22c55e' : '#ef4444'} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Variáveis de Maior Impacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {sensitivityData
                  .sort((a, b) => Math.abs(b.impacto) - Math.abs(a.impacto))
                  .slice(0, 3)
                  .map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium">{item.variavel}</span>
                      <Badge variant={item.impacto > 0 ? "default" : "destructive"}>
                        {item.impacto > 0 ? '+' : ''}{item.impacto}%
                      </Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendações de Monitoramento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20">
                  <h4 className="font-medium">Custo de Construção</h4>
                  <p className="text-sm text-muted-foreground">Monitorar preços mensalmente</p>
                </div>
                <div className="p-3 border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <h4 className="font-medium">Eficiência Operacional</h4>
                  <p className="text-sm text-muted-foreground">Otimizar processos continuamente</p>
                </div>
                <div className="p-3 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                  <h4 className="font-medium">Crescimento Populacional</h4>
                  <p className="text-sm text-muted-foreground">Acompanhar censos trimestrais</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impacts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Impactos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={impactDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {impactDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Radar de Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={[{
                    categoria: 'Saúde',
                    projeto: 85,
                    benchmark: 70,
                  }, {
                    categoria: 'Econômico',
                    projeto: 78,
                    benchmark: 65,
                  }, {
                    categoria: 'Social',
                    projeto: 82,
                    benchmark: 72,
                  }, {
                    categoria: 'Ambiental',
                    projeto: 68,
                    benchmark: 58,
                  }, {
                    categoria: 'Sustentabilidade',
                    projeto: 75,
                    benchmark: 68,
                  }]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="categoria" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Este Projeto" dataKey="projeto" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Benchmark" dataKey="benchmark" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(scenarioAnalysis).map(([key, scenario]) => (
              <Card key={key} className={selectedScenario === key ? 'ring-2 ring-blue-500' : ''}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {key === 'conservative' ? 'Cenário Conservador' : 
                     key === 'realistic' ? 'Cenário Realista' : 'Cenário Otimista'}
                    {selectedScenario === key && <Badge>Selecionado</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>ROI:</span>
                    <span className="font-bold">{scenario.roi.toFixed(1)}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VPL:</span>
                    <span className="font-bold">{formatCurrency(scenario.npv)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TIR:</span>
                    <span className="font-bold">{scenario.irr.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payback:</span>
                    <span className="font-bold">{scenario.payback.toFixed(1)} anos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Premissas dos Cenários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Conservador</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Crescimento pop. 1%/ano</li>
                    <li>• Eficiência 75%</li>
                    <li>• Aumento custos 5%</li>
                    <li>• Taxa desconto 12%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Realista</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Crescimento pop. 2%/ano</li>
                    <li>• Eficiência 85%</li>
                    <li>• Custos conforme previsto</li>
                    <li>• Taxa desconto 10%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Otimista</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Crescimento pop. 3%/ano</li>
                    <li>• Eficiência 95%</li>
                    <li>• Redução custos 10%</li>
                    <li>• Taxa desconto 8%</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectAnalysis;
