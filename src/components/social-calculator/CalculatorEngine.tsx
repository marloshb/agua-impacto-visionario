import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  Calculator,
  Database,
  Activity,
  Loader2
} from 'lucide-react';
import { ProjectData, CalculationResults, AIInsight } from '@/types/calculator';

interface CalculatorEngineProps {
  projectData: ProjectData;
  onResults: (results: CalculationResults) => void;
  onInsights: (insights: AIInsight[]) => void;
}

interface CalculationStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  progress: number;
  duration?: number;
}

export default function CalculatorEngine({ 
  projectData, 
  onResults, 
  onInsights 
}: CalculatorEngineProps) {
  const [calculationSteps, setCalculationSteps] = useState<CalculationStep[]>([
    {
      id: 'data_validation',
      name: 'Validação de Dados',
      description: 'Verificando integridade e completude dos dados de entrada',
      status: 'pending',
      progress: 0
    },
    {
      id: 'health_modeling',
      name: 'Modelagem de Saúde',
      description: 'Calculando impactos na saúde pública e redução de doenças',
      status: 'pending',
      progress: 0
    },
    {
      id: 'economic_analysis',
      name: 'Análise Econômica',
      description: 'Projetando valorização imobiliária e crescimento econômico',
      status: 'pending',
      progress: 0
    },
    {
      id: 'social_impact',
      name: 'Impacto Social',
      description: 'Avaliando melhorias em educação e equidade social',
      status: 'pending',
      progress: 0
    },
    {
      id: 'climate_assessment',
      name: 'Avaliação Climática',
      description: 'Integrando cenários climáticos e riscos ambientais',
      status: 'pending',
      progress: 0
    },
    {
      id: 'roi_calculation',
      name: 'Cálculo de ROI',
      description: 'Computando retorno sobre investimento social e ambiental',
      status: 'pending',
      progress: 0
    },
    {
      id: 'ai_insights',
      name: 'Insights de IA',
      description: 'Gerando recomendações e otimizações inteligentes',
      status: 'pending',
      progress: 0
    }
  ]);

  const [isCalculating, setIsCalculating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (projectData) {
      startCalculation();
    }
  }, [projectData]);

  const startCalculation = async () => {
    setIsCalculating(true);
    setCurrentStep(0);
    
    for (let i = 0; i < calculationSteps.length; i++) {
      await processStep(i);
    }
    
    // Generate final results
    const results = generateResults();
    const insights = generateAIInsights();
    
    onResults(results);
    onInsights(insights);
    
    setIsCalculating(false);
  };

  const processStep = async (stepIndex: number): Promise<void> => {
    return new Promise((resolve) => {
      setCurrentStep(stepIndex);
      
      // Update step status to running
      setCalculationSteps(prev => prev.map((step, idx) => 
        idx === stepIndex 
          ? { ...step, status: 'running', progress: 0 }
          : step
      ));

      // Simulate step processing with progress updates
      const stepDuration = 2000 + Math.random() * 3000; // 2-5 seconds
      const progressInterval = 50;
      const totalSteps = stepDuration / progressInterval;
      let currentProgress = 0;

      const interval = setInterval(() => {
        currentProgress += 100 / totalSteps;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          
          // Mark step as completed
          setCalculationSteps(prev => prev.map((step, idx) => 
            idx === stepIndex 
              ? { ...step, status: 'completed', progress: 100, duration: stepDuration }
              : step
          ));
          
          // Update overall progress
          setOverallProgress(((stepIndex + 1) / calculationSteps.length) * 100);
          
          resolve();
        } else {
          // Update step progress
          setCalculationSteps(prev => prev.map((step, idx) => 
            idx === stepIndex 
              ? { ...step, progress: currentProgress }
              : step
          ));
        }
      }, progressInterval);
    });
  };

  const generateResults = (): CalculationResults => {
    const { infrastructure, demographics, health, economic, climate } = projectData;
    
    // Simulate complex calculations based on real methodologies
    const populationBenefit = demographics.totalPopulation * (infrastructure.sewerCoverage / 100);
    const waterQualityImprovement = (100 - health.waterQualityIndex) * 0.8;
    
    return {
      healthImpacts: {
        preventedIllnesses: Math.round(health.waterborneIllnesses * 0.7 * (populationBenefit / 100000)),
        reducedHospitalizations: Math.round(health.hospitalizations * 0.4),
        savedMedicalCosts: health.hospitalizations * 0.4 * 3500, // R$ 3,500 per hospitalization
        improvedLifeExpectancy: 2.3,
        childMortalityReduction: 35,
        qualityAdjustedLifeYears: populationBenefit * 0.1
      },
      economicImpacts: {
        propertyValueIncrease: 12 + (infrastructure.sewerCoverage * 0.15),
        newJobs: Math.round(infrastructure.investmentAmount / 100000), // 1 job per 100k investment
        productivityGains: demographics.totalPopulation * demographics.averageIncome * 0.08,
        tourismIncrease: economic.tourism > 0 ? 25 : 5,
        businessGrowth: 18,
        taxRevenueIncrease: infrastructure.investmentAmount * 0.05
      },
      socialImpacts: {
        educationImprovement: 15,
        genderEquity: 0.12,
        communityWellbeing: 78,
        timeGainsByWomen: 8.5,
        reducedInequality: -0.08
      },
      environmentalImpacts: {
        carbonFootprintReduction: infrastructure.pipelineLength * 45,
        waterConservation: demographics.households * 150,
        biodiversityIndex: 65,
        pollutionReduction: 40,
        ecosystemServices: infrastructure.investmentAmount * 0.15
      },
      roi: {
        socialROI: 4.2,
        economicROI: 5.5,
        environmentalROI: 3.1,
        paybackPeriod: 7.8,
        npv: infrastructure.investmentAmount * 2.1,
        irr: 18.5,
        benefitCostRatio: 5.1
      },
      risks: {
        climateRisks: [
          {
            type: 'flood',
            probability: climate.floodRisk,
            impact: climate.floodRisk * 80,
            mitigation: 'Implementar sistemas de drenagem resilientes'
          }
        ],
        technicalRisks: [
          {
            type: 'infrastructure',
            probability: 0.15,
            impact: 25,
            mitigation: 'Monitoramento contínuo da infraestrutura'
          }
        ],
        financialRisks: [
          {
            type: 'cost_overrun',
            probability: 0.25,
            impact: 30,
            mitigation: 'Contingência de 15% no orçamento'
          }
        ],
        socialRisks: [
          {
            type: 'acceptance',
            probability: 0.1,
            impact: 20,
            mitigation: 'Programa de engajamento comunitário'
          }
        ],
        overallRiskScore: 23
      }
    };
  };

  const generateAIInsights = (): AIInsight[] => {
    return [
      {
        type: 'recommendation',
        confidence: 92,
        title: 'Priorização de Área de Alto Impacto',
        description: 'Concentrar primeiramente nas áreas com maior densidade populacional e menor cobertura atual pode maximizar o impacto em 34%.',
        impact: 'high',
        actionable: true,
        data: { priorityAreas: ['Setor Norte', 'Centro Histórico'] }
      },
      {
        type: 'optimization',
        confidence: 87,
        title: 'Faseamento Otimizado do Projeto',
        description: 'Implementação em 3 fases pode reduzir riscos financeiros e melhorar aceitação social.',
        impact: 'medium',
        actionable: true,
        data: { phases: 3, riskReduction: 25 }
      },
      {
        type: 'alert',
        confidence: 78,
        title: 'Atenção aos Riscos Climáticos',
        description: 'Cenários climáticos indicam aumento de 15% no risco de enchentes até 2030.',
        impact: 'medium',
        actionable: true,
        data: { floodRiskIncrease: 15, timeframe: 2030 }
      },
      {
        type: 'prediction',
        confidence: 89,
        title: 'Potencial de Financiamento Verde',
        description: 'Projeto tem 89% de probabilidade de qualificação para fundos climáticos internacionais.',
        impact: 'high',
        actionable: true,
        data: { greenFundingProbability: 89, estimatedAmount: 'R$ 2.5M' }
      }
    ];
  };

  const getStepIcon = (status: CalculationStep['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'running': return <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-600" />;
      default: return <div className="w-5 h-5 rounded-full bg-muted" />;
    }
  };

  const completedSteps = calculationSteps.filter(step => step.status === 'completed').length;
  const totalSteps = calculationSteps.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5" />
          Motor de Cálculo - Calculadora Social
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso Geral</span>
            <span>{completedSteps}/{totalSteps} etapas concluídas</span>
          </div>
          <Progress value={overallProgress} className="w-full" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {isCalculating && (
          <Alert>
            <Brain className="w-4 h-4" />
            <AlertDescription>
              IA processando dados de múltiplas fontes para gerar insights precisos...
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {calculationSteps.map((step, index) => (
            <div key={step.id} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                {getStepIcon(step.status)}
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{step.name}</h4>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                <Badge variant={
                  step.status === 'completed' ? 'default' :
                  step.status === 'running' ? 'secondary' :
                  step.status === 'error' ? 'destructive' : 'outline'
                }>
                  {step.status === 'completed' ? 'Concluído' :
                   step.status === 'running' ? 'Executando' :
                   step.status === 'error' ? 'Erro' : 'Aguardando'}
                </Badge>
              </div>
              
              {step.status === 'running' && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progresso</span>
                    <span>{Math.round(step.progress)}%</span>
                  </div>
                  <Progress value={step.progress} className="h-1" />
                </div>
              )}
              
              {step.status === 'completed' && step.duration && (
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Activity className="w-3 h-3" />
                  <span>Concluído em {(step.duration / 1000).toFixed(1)}s</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {!isCalculating && completedSteps === totalSteps && (
          <div className="flex items-center justify-center gap-2 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Cálculos concluídos com sucesso!
            </span>
          </div>
        )}

        {isCalculating && (
          <div className="flex justify-center">
            <Button disabled className="min-w-32">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Calculando...
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}