
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Heart, 
  Building, 
  CloudRain, 
  Calculator,
  TrendingUp,
  Activity
} from 'lucide-react';

interface MonetaryIndicator {
  id: string;
  name: string;
  category: 'health' | 'climate' | 'tax' | 'operational' | 'npv';
  value: number;
  unit: string;
  description: string;
  calculation: {
    baseValue: number;
    multiplier: number;
    formula: string;
  };
  confidence: number;
  timeHorizon: number;
}

interface MonetaryValidationIndicatorsProps {
  projectData: any;
  onIndicatorsUpdate: (indicators: MonetaryIndicator[]) => void;
}

export default function MonetaryValidationIndicators({ 
  projectData, 
  onIndicatorsUpdate 
}: MonetaryValidationIndicatorsProps) {
  const [indicators, setIndicators] = useState<MonetaryIndicator[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [totalSavings, setTotalSavings] = useState(0);

  useEffect(() => {
    if (projectData) {
      calculateMonetaryIndicators();
    }
  }, [projectData]);

  const calculateMonetaryIndicators = async () => {
    setIsCalculating(true);
    
    // Simular cálculos baseados nos dados do projeto
    const calculatedIndicators: MonetaryIndicator[] = [
      {
        id: 'health_cost_savings',
        name: 'Economia em Custos de Saúde Pública',
        category: 'health',
        value: calculateHealthSavings(),
        unit: 'R$/ano',
        description: 'Redução de gastos com tratamento de doenças hídricas',
        calculation: {
          baseValue: projectData.health?.waterborneIllnesses || 150,
          multiplier: 2000, // R$ por internação evitada
          formula: 'Casos evitados × Custo médio por caso'
        },
        confidence: 85,
        timeHorizon: 10
      },
      {
        id: 'climate_cost_reduction',
        name: 'Redução de Custos com Eventos Climáticos',
        category: 'climate',
        value: calculateClimateSavings(),
        unit: 'R$/ano',
        description: 'Economia com mitigação de danos climáticos',
        calculation: {
          baseValue: projectData.climate?.floodRisk || 30,
          multiplier: 25000, // R$ por % de risco reduzido
          formula: 'Risco reduzido (%) × Custo histórico de danos'
        },
        confidence: 70,
        timeHorizon: 20
      },
      {
        id: 'tax_revenue_increase',
        name: 'Aumento da Receita Tributária',
        category: 'tax',
        value: calculateTaxIncrease(),
        unit: 'R$/ano',
        description: 'Incremento na arrecadação fiscal local',
        calculation: {
          baseValue: projectData.economic?.propertyValues || 12,
          multiplier: 15000, // R$ por % de valorização
          formula: 'Valorização (%) × Base tributária × Alíquota'
        },
        confidence: 80,
        timeHorizon: 15
      },
      {
        id: 'operational_cost_reduction',
        name: 'Redução de Custos Operacionais',
        category: 'operational',
        value: calculateOperationalSavings(),
        unit: 'R$/ano',
        description: 'Economia em operação e manutenção',
        calculation: {
          baseValue: projectData.infrastructure?.pipelineLength || 10,
          multiplier: 5000, // R$ por km de rede otimizada
          formula: 'Extensão da rede × Economia por km'
        },
        confidence: 90,
        timeHorizon: 25
      },
      {
        id: 'social_npv',
        name: 'Valor Presente Líquido Social',
        category: 'npv',
        value: calculateSocialNPV(),
        unit: 'R$',
        description: 'VPL dos benefícios sociais totais',
        calculation: {
          baseValue: projectData.infrastructure?.investmentAmount || 1000000,
          multiplier: 4.2, // Multiplicador de ROI social
          formula: 'Σ(Benefícios futuros / (1+taxa)^t)'
        },
        confidence: 75,
        timeHorizon: 30
      }
    ];

    setIndicators(calculatedIndicators);
    onIndicatorsUpdate(calculatedIndicators);
    
    const total = calculatedIndicators.reduce((sum, indicator) => 
      sum + (indicator.category !== 'npv' ? indicator.value : 0), 0
    );
    setTotalSavings(total);
    
    setIsCalculating(false);
  };

  const calculateHealthSavings = () => {
    const illnesses = projectData.health?.waterborneIllnesses || 150;
    const reductionRate = 0.6; // 60% de redução
    const costPerCase = 2000; // R$ por caso
    return Math.round(illnesses * reductionRate * costPerCase);
  };

  const calculateClimateSavings = () => {
    const floodRisk = projectData.climate?.floodRisk || 30;
    const riskReduction = 0.4; // 40% de redução no risco
    const costPerRiskPoint = 25000; // R$ por ponto percentual de risco
    return Math.round(floodRisk * riskReduction * costPerRiskPoint);
  };

  const calculateTaxIncrease = () => {
    const propertyValue = projectData.economic?.propertyValues || 12;
    const taxRate = 0.015; // 1.5% de IPTU
    const properties = projectData.demographics?.households || 1000;
    return Math.round(propertyValue * taxRate * properties * 1000);
  };

  const calculateOperationalSavings = () => {
    const pipelineLength = projectData.infrastructure?.pipelineLength || 10;
    const savingsPerKm = 5000; // R$ por km/ano
    return Math.round(pipelineLength * savingsPerKm);
  };

  const calculateSocialNPV = () => {
    const investment = projectData.infrastructure?.investmentAmount || 1000000;
    const annualBenefits = totalSavings;
    const discountRate = 0.06; // 6% a.a.
    const years = 20;
    
    let npv = -investment;
    for (let year = 1; year <= years; year++) {
      npv += annualBenefits / Math.pow(1 + discountRate, year);
    }
    return Math.round(npv);
  };

  const getIndicatorIcon = (category: string) => {
    switch (category) {
      case 'health': return <Heart className="w-5 h-5 text-red-500" />;
      case 'climate': return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'tax': return <Building className="w-5 h-5 text-green-500" />;
      case 'operational': return <Activity className="w-5 h-5 text-purple-500" />;
      case 'npv': return <TrendingUp className="w-5 h-5 text-orange-500" />;
      default: return <DollarSign className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Indicadores de Validação Monetária
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Conversão de impactos sociais e ambientais em valores financeiros
          </div>
        </CardHeader>
        <CardContent>
          {totalSavings > 0 && (
            <div className="mb-6 p-4 bg-primary/10 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(totalSavings)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total de economias anuais projetadas
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4">
            {indicators.map((indicator) => (
              <Card key={indicator.id} className="border-l-4 border-l-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getIndicatorIcon(indicator.category)}
                      <div>
                        <h4 className="font-medium">{indicator.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {indicator.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatCurrency(indicator.value)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {indicator.unit}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Confiança</span>
                      <span className={getConfidenceColor(indicator.confidence)}>
                        {indicator.confidence}%
                      </span>
                    </div>
                    <Progress value={indicator.confidence} className="h-1" />
                  </div>

                  <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                    <div className="font-medium mb-1">Cálculo:</div>
                    <div>{indicator.calculation.formula}</div>
                    <div className="text-muted-foreground">
                      Base: {indicator.calculation.baseValue.toLocaleString('pt-BR')} × 
                      Fator: {indicator.calculation.multiplier.toLocaleString('pt-BR')}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
                    <span>Horizonte: {indicator.timeHorizon} anos</span>
                    <Badge variant="outline" className="text-xs">
                      {indicator.category.toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
