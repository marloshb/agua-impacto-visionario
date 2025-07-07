import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  MapPin, 
  Activity, 
  Home, 
  Droplets, 
  Users,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: string;
  source: string;
  status: 'pending' | 'loading' | 'completed' | 'error';
  progress: number;
  examples: string[];
}

export default function DataIntegration() {
  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: 'coverage',
      name: 'Cobertura de Esgoto e Água',
      type: 'Infraestrutura',
      source: 'Concessionária',
      status: 'pending',
      progress: 0,
      examples: ['Mapas da rede', 'Áreas atendidas', 'Pontos de conexão']
    },
    {
      id: 'losses',
      name: 'Perdas por Setor/DMA',
      type: 'Operacional',
      source: 'SNIS, Sistema Comercial',
      status: 'pending',
      progress: 0,
      examples: ['Antes/depois da intervenção', 'Medições de vazão', 'Índices de perda']
    },
    {
      id: 'reuse',
      name: 'Pontos de Reuso',
      type: 'Sustentabilidade',
      source: 'Operador do Sistema',
      status: 'pending',
      progress: 0,
      examples: ['Indústrias atendidas', 'Comércios conectados', 'Volume reutilizado']
    },
    {
      id: 'health_education',
      name: 'Indicadores de Saúde e Educação',
      type: 'Social',
      source: 'SINAN, SEDUC',
      status: 'pending',
      progress: 0,
      examples: ['Casos de doenças', 'Faltas escolares', 'Índices de desenvolvimento']
    },
    {
      id: 'property_prices',
      name: 'Preços de Imóveis por Bairro',
      type: 'Econômico',
      source: 'FipeZap, Dados Fiscais',
      status: 'pending',
      progress: 0,
      examples: ['Valor m²', 'Histórico de vendas', 'Valorização imobiliária']
    },
    {
      id: 'water_risk',
      name: 'Risco Hídrico e Mananciais',
      type: 'Ambiental',
      source: 'ANA, CPRM',
      status: 'pending',
      progress: 0,
      examples: ['Mapas de recarga', 'Pluviometria', 'Disponibilidade hídrica']
    },
    {
      id: 'population',
      name: 'População Atendida',
      type: 'Demográfico',
      source: 'IBGE, CADUNICO',
      status: 'pending',
      progress: 0,
      examples: ['Dados censitários por setor', 'Densidade populacional', 'Perfil socioeconômico']
    }
  ]);

  const [isIntegrating, setIsIntegrating] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Infraestrutura': return <Droplets className="w-4 h-4" />;
      case 'Operacional': return <Activity className="w-4 h-4" />;
      case 'Sustentabilidade': return <MapPin className="w-4 h-4" />;
      case 'Social': return <Users className="w-4 h-4" />;
      case 'Econômico': return <Home className="w-4 h-4" />;
      case 'Ambiental': return <Droplets className="w-4 h-4" />;
      case 'Demográfico': return <Users className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Infraestrutura': return 'text-blue-600 dark:text-blue-400';
      case 'Operacional': return 'text-green-600 dark:text-green-400';
      case 'Sustentabilidade': return 'text-purple-600 dark:text-purple-400';
      case 'Social': return 'text-red-600 dark:text-red-400';
      case 'Econômico': return 'text-yellow-600 dark:text-yellow-400';
      case 'Ambiental': return 'text-teal-600 dark:text-teal-400';
      case 'Demográfico': return 'text-indigo-600 dark:text-indigo-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: DataSource['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'loading': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 rounded-full bg-muted" />;
    }
  };

  const startIntegration = async () => {
    setIsIntegrating(true);
    
    for (let i = 0; i < dataSources.length; i++) {
      await integrateDataSource(i);
    }
    
    setIsIntegrating(false);
  };

  const integrateDataSource = async (index: number): Promise<void> => {
    return new Promise((resolve) => {
      // Simular integração com progresso
      setDataSources(prev => prev.map((source, idx) => 
        idx === index ? { ...source, status: 'loading', progress: 0 } : source
      ));

      const duration = 3000 + Math.random() * 2000; // 3-5 segundos
      const interval = 100;
      const totalSteps = duration / interval;
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += 100 / totalSteps;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
          
          setDataSources(prev => prev.map((source, idx) => 
            idx === index ? { ...source, status: 'completed', progress: 100 } : source
          ));
          
          setOverallProgress(((index + 1) / dataSources.length) * 100);
          resolve();
        } else {
          setDataSources(prev => prev.map((source, idx) => 
            idx === index ? { ...source, progress: currentProgress } : source
          ));
        }
      }, interval);
    });
  };

  const completedSources = dataSources.filter(source => source.status === 'completed').length;
  const totalSources = dataSources.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Etapa 1 - Integração de Dados SIG
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso da Integração</span>
              <span>{completedSources}/{totalSources} fontes integradas</span>
            </div>
            <Progress value={overallProgress} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isIntegrating && (
            <Alert>
              <Database className="w-4 h-4" />
              <AlertDescription>
                Integrando dados de múltiplas fontes ao banco SIG...
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-4">
            {dataSources.map((source) => (
              <div key={source.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(source.status)}
                    <div>
                      <h4 className="font-medium">{source.name}</h4>
                      <p className="text-sm text-muted-foreground">Fonte: {source.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={getTypeColor(source.type)}>
                      {getTypeIcon(source.type)}
                    </div>
                    <Badge variant="outline">{source.type}</Badge>
                  </div>
                </div>

                {source.status === 'loading' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Integrando dados...</span>
                      <span>{Math.round(source.progress)}%</span>
                    </div>
                    <Progress value={source.progress} className="h-1" />
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {source.examples.map((example, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startIntegration}
              disabled={isIntegrating || completedSources === totalSources}
              className="min-w-48"
            >
              {isIntegrating ? (
                <>
                  <Clock className="w-4 h-4 mr-2 animate-spin" />
                  Integrando Dados...
                </>
              ) : completedSources === totalSources ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Integração Concluída
                </>
              ) : (
                <>
                  <Database className="w-4 h-4 mr-2" />
                  Iniciar Integração SIG
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}