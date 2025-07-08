
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, DollarSign, Target, TrendingUp } from 'lucide-react';

import MonetaryValidationIndicators from './indicators/MonetaryValidationIndicators';
import DetailedImpactMetrics from './indicators/DetailedImpactMetrics';
import ImpactVisualization from './indicators/ImpactVisualization';
import { ProjectData } from '@/types/calculator';

interface EnhancedMonetaryValuationProps {
  projectData: ProjectData;
}

export default function EnhancedMonetaryValuation({ projectData }: EnhancedMonetaryValuationProps) {
  const [monetaryIndicators, setMonetaryIndicators] = useState<any[]>([]);
  const [impactMetrics, setImpactMetrics] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMonetaryIndicatorsUpdate = (indicators: any[]) => {
    setMonetaryIndicators(indicators);
  };

  const handleImpactMetricsUpdate = (metrics: any[]) => {
    setImpactMetrics(metrics);
  };

  const processAllIndicators = async () => {
    setIsProcessing(true);
    // Simular processamento integrado
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
  };

  const totalMonetaryValue = monetaryIndicators.reduce((sum, indicator) => 
    sum + (indicator.category !== 'npv' ? indicator.value : 0), 0
  );

  const averageConfidence = monetaryIndicators.length > 0 
    ? monetaryIndicators.reduce((sum, indicator) => sum + indicator.confidence, 0) / monetaryIndicators.length 
    : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Validação Monetária e Métricas Detalhadas
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            Sistema integrado de avaliação de impactos com validação monetária completa
          </div>
        </CardHeader>
        <CardContent>
          {isProcessing && (
            <Alert className="mb-4">
              <Calculator className="w-4 h-4" />
              <AlertDescription>
                Processando indicadores integrados com dados de múltiplas fontes...
              </AlertDescription>
            </Alert>
          )}

          {totalMonetaryValue > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-primary/5">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Valor Total Anual</div>
                      <div className="text-xl font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0
                        }).format(totalMonetaryValue)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Confiança Média</div>
                      <div className="text-xl font-bold text-green-700">
                        {averageConfidence.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-muted-foreground">Métricas Calculadas</div>
                      <div className="text-xl font-bold text-blue-700">
                        {monetaryIndicators.length + impactMetrics.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="flex justify-center mb-6">
            <Button 
              onClick={processAllIndicators}
              disabled={isProcessing}
              size="lg"
            >
              {isProcessing ? (
                <>
                  <Calculator className="w-4 h-4 mr-2 animate-spin" />
                  Processando Indicadores...
                </>
              ) : (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Processar Todos os Indicadores
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="monetary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monetary">Validação Monetária</TabsTrigger>
          <TabsTrigger value="impact">Métricas de Impacto</TabsTrigger>
          <TabsTrigger value="visualization">Visualizações</TabsTrigger>
          <TabsTrigger value="integration">Integração</TabsTrigger>
        </TabsList>

        <TabsContent value="monetary" className="mt-6">
          <MonetaryValidationIndicators
            projectData={projectData}
            onIndicatorsUpdate={handleMonetaryIndicatorsUpdate}
          />
        </TabsContent>

        <TabsContent value="impact" className="mt-6">
          <DetailedImpactMetrics
            projectData={projectData}
            onMetricsUpdate={handleImpactMetricsUpdate}
          />
        </TabsContent>

        <TabsContent value="visualization" className="mt-6">
          <ImpactVisualization
            monetaryIndicators={monetaryIndicators}
            impactMetrics={impactMetrics}
          />
        </TabsContent>

        <TabsContent value="integration" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Integração com Fontes de Dados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <AlertDescription>
                    <strong>Fontes de Dados Integradas:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• IBGE (SIDRA) - Dados socioeconômicos e demográficos</li>
                      <li>• DATASUS/SUS - Dados de saúde pública e internações</li>
                      <li>• INMET - Dados climáticos e meteorológicos</li>
                      <li>• SNIS - Dados de saneamento básico</li>
                      <li>• Secretarias Municipais - Dados fiscais e cadastrais</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertDescription>
                    <strong>Metodologias Aplicadas:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• Análise espacial com PostGIS para cruzamento geográfico</li>
                      <li>• Modelos de regressão para correlações estatísticas</li>
                      <li>• Fatores de emissão IPCC para cálculos ambientais</li>
                      <li>• Análise input-output para impactos econômicos</li>
                      <li>• Índices compostos para vulnerabilidade socioambiental</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
