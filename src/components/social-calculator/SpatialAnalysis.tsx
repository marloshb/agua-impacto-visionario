import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Map, 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Layers,
  Zap,
  Activity,
  Home,
  Droplets
} from 'lucide-react';

interface AnalysisResult {
  id: string;
  name: string;
  type: 'comparison' | 'correlation' | 'reach' | 'thematic';
  status: 'pending' | 'running' | 'completed';
  progress: number;
  results?: {
    improvement: number;
    correlation: number;
    coverage: number;
    insights: string[];
  };
}

export default function SpatialAnalysis() {
  const [analyses, setAnalyses] = useState<AnalysisResult[]>([
    {
      id: 'before_after',
      name: 'Comparação Antes/Depois',
      type: 'comparison',
      status: 'pending',
      progress: 0
    },
    {
      id: 'spatial_correlation',
      name: 'Correlações Espaciais',
      type: 'correlation',
      status: 'pending',
      progress: 0
    },
    {
      id: 'geographic_reach',
      name: 'Alcance Geográfico',
      type: 'reach',
      status: 'pending',
      progress: 0
    },
    {
      id: 'thematic_maps',
      name: 'Mapas Temáticos',
      type: 'thematic',
      status: 'pending',
      progress: 0
    }
  ]);

  const [activeTab, setActiveTab] = useState('comparisons');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const thematicMaps = [
    {
      name: 'Variação de Perdas por Região',
      description: 'Mapa de calor mostrando redução de perdas após intervenções',
      icon: <Droplets className="w-4 h-4" />,
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      name: 'Crescimento do Atendimento com Esgoto',
      description: 'Expansão da cobertura de esgotamento sanitário',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'text-green-600 dark:text-green-400'
    },
    {
      name: 'Localização de Grandes Consumidores com Reuso',
      description: 'Pontos de reuso e volume economizado por setor',
      icon: <MapPin className="w-4 h-4" />,
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      name: 'Áreas com Maior Valorização Imobiliária',
      description: 'Correlação entre infraestrutura e valorização de imóveis',
      icon: <Home className="w-4 h-4" />,
      color: 'text-yellow-600 dark:text-yellow-400'
    }
  ];

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    
    for (let i = 0; i < analyses.length; i++) {
      await runAnalysis(i);
    }
    
    setIsAnalyzing(false);
  };

  const runAnalysis = async (index: number): Promise<void> => {
    return new Promise((resolve) => {
      setAnalyses(prev => prev.map((analysis, idx) => 
        idx === index ? { ...analysis, status: 'running', progress: 0 } : analysis
      ));

      const duration = 4000 + Math.random() * 3000;
      const interval = 100;
      const totalSteps = duration / interval;
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += 100 / totalSteps;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
          
          // Gerar resultados simulados
          const mockResults = {
            improvement: 15 + Math.random() * 35, // 15-50% improvement
            correlation: 0.6 + Math.random() * 0.3, // 0.6-0.9 correlation
            coverage: 70 + Math.random() * 25, // 70-95% coverage
            insights: generateInsights(analyses[index].type)
          };
          
          setAnalyses(prev => prev.map((analysis, idx) => 
            idx === index ? { 
              ...analysis, 
              status: 'completed', 
              progress: 100,
              results: mockResults
            } : analysis
          ));
          
          resolve();
        } else {
          setAnalyses(prev => prev.map((analysis, idx) => 
            idx === index ? { ...analysis, progress: currentProgress } : analysis
          ));
        }
      }, interval);
    });
  };

  const generateInsights = (type: string): string[] => {
    const insights = {
      comparison: [
        'Redução de 32% nas perdas de água após implementação',
        'Aumento de 45% na cobertura de esgotamento sanitário',
        'Melhoria de 28% nos indicadores de qualidade da água'
      ],
      correlation: [
        'Correlação forte (0.78) entre cobertura de esgoto e redução de doenças',
        'Relação positiva entre acesso à água e frequência escolar',
        'Impacto significativo na redução de internações infantis'
      ],
      reach: [
        'Zona de influência de 2.5 km para grandes consumidores',
        'Buffer de 500m para análise de valorização imobiliária',
        'Alcance direto: 15.000 habitantes, indireto: 45.000'
      ],
      thematic: [
        'Gradiente de melhoria concentrado no centro da intervenção',
        'Hotspots de valorização imobiliária próximos à infraestrutura',
        'Padrão espacial consistente com teoria de difusão de benefícios'
      ]
    };
    return insights[type as keyof typeof insights] || [];
  };

  const getAnalysisIcon = (type: string) => {
    switch (type) {
      case 'comparison': return <BarChart3 className="w-4 h-4" />;
      case 'correlation': return <Activity className="w-4 h-4" />;
      case 'reach': return <MapPin className="w-4 h-4" />;
      case 'thematic': return <Layers className="w-4 h-4" />;
      default: return <Map className="w-4 h-4" />;
    }
  };

  const completedAnalyses = analyses.filter(a => a.status === 'completed').length;
  const totalAnalyses = analyses.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5" />
            Etapa 2 - Análises Espaciais SIG
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso das Análises</span>
              <span>{completedAnalyses}/{totalAnalyses} análises concluídas</span>
            </div>
            <Progress value={(completedAnalyses / totalAnalyses) * 100} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="comparisons">Comparações</TabsTrigger>
              <TabsTrigger value="correlations">Correlações</TabsTrigger>
              <TabsTrigger value="reach">Alcance</TabsTrigger>
              <TabsTrigger value="maps">Mapas</TabsTrigger>
            </TabsList>

            <TabsContent value="comparisons" className="space-y-4">
              <div className="grid gap-4">
                {analyses.filter(a => a.type === 'comparison').map((analysis) => (
                  <div key={analysis.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      {getAnalysisIcon(analysis.type)}
                      <h4 className="font-medium">{analysis.name}</h4>
                      <Badge variant={analysis.status === 'completed' ? 'default' : 'outline'}>
                        {analysis.status === 'completed' ? 'Concluído' : 
                         analysis.status === 'running' ? 'Executando' : 'Pendente'}
                      </Badge>
                    </div>
                    
                    {analysis.status === 'running' && (
                      <Progress value={analysis.progress} className="mb-3" />
                    )}
                    
                    {analysis.results && (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="p-2 bg-muted rounded">
                            <span className="text-muted-foreground">Melhoria Geral:</span>
                            <span className="font-medium ml-2">{analysis.results.improvement.toFixed(1)}%</span>
                          </div>
                          <div className="p-2 bg-muted rounded">
                            <span className="text-muted-foreground">Cobertura:</span>
                            <span className="font-medium ml-2">{analysis.results.coverage.toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {analysis.results.insights.map((insight, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">• {insight}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="correlations" className="space-y-4">
              <div className="grid gap-4">
                {analyses.filter(a => a.type === 'correlation').map((analysis) => (
                  <div key={analysis.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      {getAnalysisIcon(analysis.type)}
                      <h4 className="font-medium">{analysis.name}</h4>
                      <Badge variant={analysis.status === 'completed' ? 'default' : 'outline'}>
                        {analysis.status === 'completed' ? 'Concluído' : 
                         analysis.status === 'running' ? 'Executando' : 'Pendente'}
                      </Badge>
                    </div>
                    
                    {analysis.status === 'running' && (
                      <Progress value={analysis.progress} className="mb-3" />
                    )}
                    
                    {analysis.results && (
                      <div className="space-y-2">
                        <div className="p-2 bg-muted rounded text-sm">
                          <span className="text-muted-foreground">Correlação Espacial:</span>
                          <span className="font-medium ml-2">{analysis.results.correlation.toFixed(2)}</span>
                        </div>
                        <div className="space-y-1">
                          {analysis.results.insights.map((insight, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">• {insight}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reach" className="space-y-4">
              <div className="grid gap-4">
                {analyses.filter(a => a.type === 'reach').map((analysis) => (
                  <div key={analysis.id} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      {getAnalysisIcon(analysis.type)}
                      <h4 className="font-medium">{analysis.name}</h4>
                      <Badge variant={analysis.status === 'completed' ? 'default' : 'outline'}>
                        {analysis.status === 'completed' ? 'Concluído' : 
                         analysis.status === 'running' ? 'Executando' : 'Pendente'}
                      </Badge>
                    </div>
                    
                    {analysis.status === 'running' && (
                      <Progress value={analysis.progress} className="mb-3" />
                    )}
                    
                    {analysis.results && (
                      <div className="space-y-2">
                        <div className="space-y-1">
                          {analysis.results.insights.map((insight, idx) => (
                            <p key={idx} className="text-sm text-muted-foreground">• {insight}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="maps" className="space-y-4">
              <div className="grid gap-4">
                {thematicMaps.map((map, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={map.color}>
                        {map.icon}
                      </div>
                      <h4 className="font-medium">{map.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{map.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center mt-6">
            <Button 
              onClick={startAnalysis}
              disabled={isAnalyzing || completedAnalyses === totalAnalyses}
              className="min-w-48"
            >
              {isAnalyzing ? (
                <>
                  <Zap className="w-4 h-4 mr-2 animate-spin" />
                  Executando Análises...
                </>
              ) : completedAnalyses === totalAnalyses ? (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Análises Concluídas
                </>
              ) : (
                <>
                  <Map className="w-4 h-4 mr-2" />
                  Iniciar Análises SIG
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}