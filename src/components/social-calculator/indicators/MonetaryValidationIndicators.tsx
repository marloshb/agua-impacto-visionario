
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Heart, 
  Building, 
  Leaf, 
  Shield,
  Calculator
} from 'lucide-react';

interface MonetaryIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  timeframe: string;
  confidence: number;
  trend: number;
  description: string;
  calculation: any;
}

interface MonetaryValidationIndicatorsProps {
  indicators: MonetaryIndicator[];
  scenario: string;
  projectLocation: string;
}

export default function MonetaryValidationIndicators({ 
  indicators, 
  scenario, 
  projectLocation 
}: MonetaryValidationIndicatorsProps) {
  
  const getIcon = (id: string) => {
    switch (id) {
      case 'health_savings': return Heart;
      case 'property_valuation': return Building;
      case 'tax_revenue': return DollarSign;
      case 'operational_savings': return Calculator;
      case 'climate_mitigation': return Shield;
      default: return Leaf;
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return `R$ ${value.toFixed(0)}`;
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getTrendColor = (trend: number) => {
    if (trend > 10) return 'text-green-600';
    if (trend > 0) return 'text-blue-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      {/* Resumo Geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Resumo da Validação Monetária - {projectLocation}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Benefícios Totais (10 anos)</h4>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(indicators.reduce((sum, ind) => 
                  sum + (ind.timeframe === 'anual' ? ind.value * 10 : ind.value), 0))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cenário Atual</h4>
              <Badge variant="outline" className="text-sm">
                {scenario === 'conservative' ? 'Conservador' : 
                 scenario === 'realistic' ? 'Realista' : 'Otimista'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Indicadores Individuais */}
      <div className="grid gap-6">
        {indicators.map((indicator) => {
          const IconComponent = getIcon(indicator.id);
          
          return (
            <Card key={indicator.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    {indicator.name}
                  </div>
                  <div className="flex items-center gap-2">
                    {indicator.trend > 0 ? (
                      <TrendingUp className={`w-4 h-4 ${getTrendColor(indicator.trend)}`} />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm font-medium ${getTrendColor(indicator.trend)}`}>
                      +{indicator.trend}%
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(indicator.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {indicator.timeframe === 'anual' ? 'por ano' : 'valor total'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Confiança</div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={indicator.confidence} 
                        className="w-20 h-2" 
                      />
                      <span className="text-sm font-medium">{indicator.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {indicator.description}
                </div>

                {/* Detalhes específicos do cálculo */}
                {indicator.id === 'health_savings' && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Detalhes - Economia em Saúde</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Internações atuais: {indicator.calculation.baseline}/ano</div>
                      <div>Internações projetadas: {indicator.calculation.projected}/ano</div>
                      <div>Custo médio SUS: R$ {indicator.calculation.avgCost.toLocaleString()}</div>
                      <div>Economia anual: {formatCurrency(indicator.calculation.reduction)}</div>
                    </div>
                  </div>
                )}

                {indicator.id === 'property_valuation' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Detalhes - Valorização Imobiliária</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Imóveis impactados: {indicator.calculation.properties.toLocaleString()}</div>
                      <div>Valorização média: R$ {indicator.calculation.avgIncrease.toLocaleString()}</div>
                      <div>Impacto total: {formatCurrency(indicator.calculation.totalValue)}</div>
                      <div>Região: Jardim Campos Elíseos</div>
                    </div>
                  </div>
                )}

                {indicator.id === 'operational_savings' && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Detalhes - Economia SANASA</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>Redução perdas: {indicator.calculation.waterLossReduction}%</div>
                      <div>Economia manutenção: {indicator.calculation.maintenanceSavings}%</div>
                      <div>Economia energia: {indicator.calculation.energySavings}%</div>
                    </div>
                  </div>
                )}

                {indicator.id === 'tax_revenue' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Detalhes - Receita Tributária</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Aumento IPTU: {formatCurrency(indicator.calculation.iptuIncrease)}</div>
                      <div>Aumento ISS: {formatCurrency(indicator.calculation.issIncrease)}</div>
                      <div>Total anual: {formatCurrency(indicator.value)}</div>
                      <div>Município: Campinas</div>
                    </div>
                  </div>
                )}

                {indicator.id === 'climate_mitigation' && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Detalhes - Mitigação Climática</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Prevenção enchentes: {formatCurrency(indicator.calculation.floodPrevention)}</div>
                      <div>Mitigação secas: {formatCurrency(indicator.calculation.droughtMitigation)}</div>
                      <div>Base: Histórico INMET</div>
                      <div>Período: 2019-2024</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Metodologia */}
      <Card>
        <CardHeader>
          <CardTitle>Metodologia de Cálculo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Fontes de Dados</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• DATASUS - Custos hospitalares</li>
                <li>• IBGE - Demografia e economia</li>
                <li>• SANASA - Dados operacionais</li>
                <li>• Prefeitura de Campinas - Tributação</li>
                <li>• INMET - Dados climáticos</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Premissas do Modelo</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Taxa de desconto: 10% a.a.</li>
                <li>• Horizonte temporal: 10 anos</li>
                <li>• Inflação: 4% a.a.</li>
                <li>• Crescimento populacional: 1.8% a.a.</li>
                <li>• Cenário climático: RCP 4.5</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
