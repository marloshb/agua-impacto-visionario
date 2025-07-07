import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Calculator, 
  TrendingUp, 
  Activity, 
  GraduationCap,
  Home,
  Droplets,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

interface MonetaryIndicator {
  id: string;
  name: string;
  formula: string;
  source: string;
  value?: number;
  unit: string;
  status: 'pending' | 'calculating' | 'completed';
  progress: number;
  calculation?: {
    baseValue: number;
    multiplier: number;
    result: number;
  };
}

export default function MonetaryValuation() {
  const [indicators, setIndicators] = useState<MonetaryIndicator[]>([
    {
      id: 'water_saved',
      name: 'Água Economizada',
      formula: 'm³ × tarifa média',
      source: 'SNIS / Agência Reguladora',
      unit: 'R$ / ano',
      status: 'pending',
      progress: 0
    },
    {
      id: 'diseases_prevented',
      name: 'Doenças Evitadas',
      formula: 'Casos evitados × custo médio SUS',
      source: 'DATASUS',
      unit: 'R$ / ano',
      status: 'pending',
      progress: 0
    },
    {
      id: 'school_absences',
      name: 'Faltas Escolares Evitadas',
      formula: 'Nº faltas × custo-aluno/dia',
      source: 'INEP',
      unit: 'R$ / ano',
      status: 'pending',
      progress: 0
    },
    {
      id: 'property_value',
      name: 'Valorização Imobiliária',
      formula: 'Δ% valor m² × imóveis afetados',
      source: 'FipeZap, Dados Fiscais',
      unit: 'R$ total',
      status: 'pending',
      progress: 0
    },
    {
      id: 'scarcity_cost',
      name: 'Custo Evitado com Escassez',
      formula: 'R$/m³ × consumo crítico',
      source: 'Estudo Local/Regional',
      unit: 'R$ / ano',
      status: 'pending',
      progress: 0
    }
  ]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [totalValue, setTotalValue] = useState(0);

  const getIndicatorIcon = (id: string) => {
    switch (id) {
      case 'water_saved': return <Droplets className="w-4 h-4" />;
      case 'diseases_prevented': return <Activity className="w-4 h-4" />;
      case 'school_absences': return <GraduationCap className="w-4 h-4" />;
      case 'property_value': return <Home className="w-4 h-4" />;
      case 'scarcity_cost': return <AlertTriangle className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const getIndicatorColor = (id: string) => {
    switch (id) {
      case 'water_saved': return 'text-blue-600 dark:text-blue-400';
      case 'diseases_prevented': return 'text-green-600 dark:text-green-400';
      case 'school_absences': return 'text-purple-600 dark:text-purple-400';
      case 'property_value': return 'text-yellow-600 dark:text-yellow-400';
      case 'scarcity_cost': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const startCalculation = async () => {
    setIsCalculating(true);
    setTotalValue(0);
    
    for (let i = 0; i < indicators.length; i++) {
      await calculateIndicator(i);
    }
    
    // Calcular valor total
    const total = indicators.reduce((sum, indicator) => {
      return sum + (indicator.calculation?.result || 0);
    }, 0);
    setTotalValue(total);
    
    setIsCalculating(false);
  };

  const calculateIndicator = async (index: number): Promise<void> => {
    return new Promise((resolve) => {
      setIndicators(prev => prev.map((indicator, idx) => 
        idx === index ? { ...indicator, status: 'calculating', progress: 0 } : indicator
      ));

      const duration = 2000 + Math.random() * 2000;
      const interval = 100;
      const totalSteps = duration / interval;
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += 100 / totalSteps;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
          
          // Gerar cálculos simulados baseados no tipo
          const calculation = generateCalculation(indicators[index].id);
          
          setIndicators(prev => prev.map((indicator, idx) => 
            idx === index ? { 
              ...indicator, 
              status: 'completed', 
              progress: 100,
              value: calculation.result,
              calculation
            } : indicator
          ));
          
          resolve();
        } else {
          setIndicators(prev => prev.map((indicator, idx) => 
            idx === index ? { ...indicator, progress: currentProgress } : indicator
          ));
        }
      }, interval);
    });
  };

  const generateCalculation = (indicatorId: string) => {
    const calculations = {
      water_saved: {
        baseValue: 125000, // m³/ano
        multiplier: 4.85, // R$/m³
        result: 125000 * 4.85
      },
      diseases_prevented: {
        baseValue: 450, // casos evitados/ano
        multiplier: 2850, // R$/caso
        result: 450 * 2850
      },
      school_absences: {
        baseValue: 2800, // faltas evitadas/ano
        multiplier: 45, // R$/falta
        result: 2800 * 45
      },
      property_value: {
        baseValue: 8500, // imóveis afetados
        multiplier: 12500, // R$ valorização/imóvel
        result: 8500 * 12500
      },
      scarcity_cost: {
        baseValue: 85000, // m³ críticos/ano
        multiplier: 8.20, // R$/m³ custo escassez
        result: 85000 * 8.20
      }
    };

    return calculations[indicatorId as keyof typeof calculations] || {
      baseValue: 1000,
      multiplier: 100,
      result: 100000
    };
  };

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

  const completedIndicators = indicators.filter(i => i.status === 'completed').length;
  const totalIndicators = indicators.length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Etapa 3 - Valoração Monetária e Social
          </CardTitle>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso dos Cálculos</span>
              <span>{completedIndicators}/{totalIndicators} indicadores calculados</span>
            </div>
            <Progress value={(completedIndicators / totalIndicators) * 100} className="w-full" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {isCalculating && (
            <Alert>
              <Calculator className="w-4 h-4" />
              <AlertDescription>
                Calculando valoração monetária dos impactos sociais e ambientais...
              </AlertDescription>
            </Alert>
          )}

          {totalValue > 0 && (
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Valor Total dos Impactos</h3>
                  <div className="text-3xl font-bold text-primary">
                    {formatCurrency(totalValue)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Valor presente líquido dos benefícios socioambientais
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid gap-4">
            {indicators.map((indicator) => (
              <div key={indicator.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={getIndicatorColor(indicator.id)}>
                      {getIndicatorIcon(indicator.id)}
                    </div>
                    <div>
                      <h4 className="font-medium">{indicator.name}</h4>
                      <p className="text-sm text-muted-foreground">{indicator.formula}</p>
                    </div>
                  </div>
                  <Badge variant={indicator.status === 'completed' ? 'default' : 'outline'}>
                    {indicator.status === 'completed' ? 'Calculado' : 
                     indicator.status === 'calculating' ? 'Calculando' : 'Pendente'}
                  </Badge>
                </div>

                <div className="text-xs text-muted-foreground">
                  Fonte: {indicator.source}
                </div>

                {indicator.status === 'calculating' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Processando dados...</span>
                      <span>{Math.round(indicator.progress)}%</span>
                    </div>
                    <Progress value={indicator.progress} className="h-1" />
                  </div>
                )}

                {indicator.calculation && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="text-muted-foreground">Base</div>
                        <div className="font-medium">{formatNumber(indicator.calculation.baseValue)}</div>
                      </div>
                      <div className="p-2 bg-muted rounded text-center">
                        <div className="text-muted-foreground">Multiplicador</div>
                        <div className="font-medium">R$ {indicator.calculation.multiplier}</div>
                      </div>
                      <div className="p-2 bg-primary/10 rounded text-center">
                        <div className="text-muted-foreground">Resultado</div>
                        <div className="font-bold text-primary">
                          {formatCurrency(indicator.calculation.result)}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={startCalculation}
              disabled={isCalculating || completedIndicators === totalIndicators}
              className="min-w-48"
            >
              {isCalculating ? (
                <>
                  <Calculator className="w-4 h-4 mr-2 animate-spin" />
                  Calculando Valores...
                </>
              ) : completedIndicators === totalIndicators ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Cálculos Concluídos
                </>
              ) : (
                <>
                  <DollarSign className="w-4 h-4 mr-2" />
                  Iniciar Valoração
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}