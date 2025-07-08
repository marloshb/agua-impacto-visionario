
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProjectData } from '@/types/calculator';
import MonetaryValidationIndicators from './indicators/MonetaryValidationIndicators';
import DetailedImpactMetrics from './indicators/DetailedImpactMetrics';
import ImpactVisualization from './indicators/ImpactVisualization';

interface EnhancedMonetaryValuationProps {
  projectData: ProjectData;
}

export default function EnhancedMonetaryValuation({ projectData }: EnhancedMonetaryValuationProps) {
  const [selectedScenario, setSelectedScenario] = useState('realistic');

  // Dados simulados baseados em Campinas/Sanasa
  const campanasData = {
    location: "Jardim Campos Elíseos, Campinas/SP",
    sanasa: {
      name: "SANASA - Sociedade de Abastecimento de Água e Saneamento S/A",
      coverage: {
        water: 98.5,
        sewer: 87.2
      },
      tariff: {
        residential: 4.85, // R$/m³
        commercial: 7.20   // R$/m³
      }
    },
    demographics: {
      totalPopulation: 45000,
      households: 12800,
      averageIncome: 3200,
      vulnerabilityIndex: 0.45
    }
  };

  // Indicadores monetários simulados para Campinas
  const monetaryIndicators = [
    {
      id: 'health_savings',
      name: 'Economia em Custos de Saúde',
      value: 2800000,
      unit: 'BRL',
      timeframe: 'anual',
      confidence: 85,
      trend: 15,
      description: 'Redução de internações por doenças hídricas no HC Unicamp e Hospital Mário Gatti',
      calculation: {
        baseline: 850, // internações/ano
        projected: 320, // internações/ano após projeto
        avgCost: 5200, // custo médio internação SUS Campinas
        reduction: 530 * 5200
      }
    },
    {
      id: 'property_valuation',
      name: 'Valorização Imobiliária',
      value: 4200000,
      unit: 'BRL',
      timeframe: 'total',
      confidence: 78,
      trend: 12,
      description: 'Aumento no valor dos imóveis na região do Jardim Campos Elíseos',
      calculation: {
        properties: 3200,
        avgIncrease: 18000, // R$ por imóvel
        totalValue: 3200 * 18000
      }
    },
    {
      id: 'tax_revenue',
      name: 'Aumento da Receita Tributária',
      value: 650000,
      unit: 'BRL',
      timeframe: 'anual',
      confidence: 92,
      trend: 8,
      description: 'Aumento do IPTU devido à valorização e formalização de atividades',
      calculation: {
        iptuIncrease: 480000,
        issIncrease: 170000
      }
    },
    {
      id: 'operational_savings',
      name: 'Economia Operacional SANASA',
      value: 1200000,
      unit: 'BRL',
      timeframe: 'anual',
      confidence: 88,
      trend: 10,
      description: 'Redução de perdas e custos operacionais da SANASA',
      calculation: {
        waterLossReduction: 15,
        maintenanceSavings: 35,
        energySavings: 12
      }
    },
    {
      id: 'climate_mitigation',
      name: 'Mitigação de Riscos Climáticos',
      value: 950000,
      unit: 'BRL',
      timeframe: 'anual',
      confidence: 70,
      trend: 25,
      description: 'Redução de custos com eventos climáticos extremos',
      calculation: {
        floodPrevention: 750000,
        droughtMitigation: 200000
      }
    }
  ];

  // Métricas detalhadas de impacto para Campinas
  const impactMetrics = [
    {
      id: 'health_impact',
      category: 'Saúde',
      name: 'Redução de Doenças Hídricas',
      value: 0.65,
      baseline: 0.12,
      target: 0.80,
      unit: 'percentual',
      description: 'Redução de casos de diarreia, hepatite A e verminoses',
      details: {
        diarrhea: { current: 2100, projected: 850 },
        hepatitis: { current: 85, projected: 25 },
        parasites: { current: 1200, projected: 420 }
      }
    },
    {
      id: 'education_impact',
      category: 'Educação',
      name: 'Redução do Absenteísmo Escolar',
      value: 0.72,
      baseline: 0.15,
      target: 0.85,
      unit: 'percentual',
      description: 'Menos faltas escolares devido a doenças',
      details: {
        schools: 8,
        students: 3200,
        absenceReduction: 28
      }
    },
    {
      id: 'environmental_impact',
      category: 'Ambiental',
      name: 'Redução de Emissões de Carbono',
      value: 0.58,
      baseline: 0.05,
      target: 0.75,
      unit: 'percentual',
      description: 'Mitigação através de tratamento adequado de esgoto',
      details: {
        co2Reduction: 850, // tCO2/ano
        methaneReduction: 120, // tCH4/ano
        waterSaved: 2.5 // milhões m³/ano
      }
    },
    {
      id: 'social_impact',
      category: 'Social',
      name: 'Redução da Desigualdade',
      value: 0.48,
      baseline: 0.62,
      target: 0.45,
      unit: 'índice_gini',
      description: 'Melhoria na distribuição de renda local',
      details: {
        beneficiaries: 12800, // famílias
        incomeIncrease: 15, // %
        jobsCreated: 280
      }
    },
    {
      id: 'economic_impact',
      category: 'Econômico',
      name: 'Aumento da Atividade Econômica',
      value: 0.68,
      baseline: 0.25,
      target: 0.80,
      unit: 'percentual',
      description: 'Crescimento do PIB local e novos negócios',
      details: {
        newBusinesses: 45,
        gdpIncrease: 8.5, // %
        tourismGrowth: 12 // %
      }
    },
    {
      id: 'vulnerability_reduction',
      category: 'Vulnerabilidade',
      name: 'Redução da Vulnerabilidade Socioambiental',
      value: 0.75,
      baseline: 0.68,
      target: 0.35,
      unit: 'índice',
      description: 'Maior resiliência a eventos climáticos extremos',
      details: {
        floodRisk: 40, // redução %
        droughtRisk: 25, // redução %
        socialVulnerability: 35 // redução %
      }
    }
  ];

  const scenarios = {
    conservative: {
      name: 'Conservador',
      description: 'Cenário com premissas mais restritivas',
      multiplier: 0.7,
      assumptions: [
        'Crescimento populacional 1.2%/ano',
        'Eficiência operacional 75%',
        'Taxa de desconto 12%',
        'Riscos climáticos altos'
      ]
    },
    realistic: {
      name: 'Realista',
      description: 'Cenário baseado em dados históricos de Campinas',
      multiplier: 1.0,
      assumptions: [
        'Crescimento populacional 1.8%/ano',
        'Eficiência operacional 85%',
        'Taxa de desconto 10%',
        'Riscos climáticos moderados'
      ]
    },
    optimistic: {
      name: 'Otimista',
      description: 'Cenário com melhores condições esperadas',
      multiplier: 1.35,
      assumptions: [
        'Crescimento populacional 2.5%/ano',
        'Eficiência operacional 95%',
        'Taxa de desconto 8%',
        'Riscos climáticos baixos'
      ]
    }
  };

  const currentScenario = scenarios[selectedScenario as keyof typeof scenarios];
  const adjustedMonetaryIndicators = monetaryIndicators.map(indicator => ({
    ...indicator,
    value: Math.round(indicator.value * currentScenario.multiplier)
  }));

  const adjustedImpactMetrics = impactMetrics.map(metric => ({
    ...metric,
    value: Math.min(1, metric.value * currentScenario.multiplier)
  }));

  // Cálculo do ROI total
  const totalBenefits = adjustedMonetaryIndicators.reduce((sum, indicator) => {
    return sum + (indicator.timeframe === 'anual' ? indicator.value * 10 : indicator.value);
  }, 0);
  const totalInvestment = projectData.infrastructure.investmentAmount;
  const roi = totalBenefits / totalInvestment;

  return (
    <div className="space-y-6">
      {/* Header com informações do projeto */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            Validação Monetária - Projeto Saneamento Integrado
          </CardTitle>
          <div className="text-sm text-muted-foreground">
            <p><strong>Local:</strong> {campanasData.location}</p>
            <p><strong>Operadora:</strong> {campanasData.sanasa.name}</p>
            <p><strong>População Atendida:</strong> {campanasData.demographics.totalPopulation.toLocaleString()} habitantes</p>
            <p><strong>Investimento:</strong> R$ {totalInvestment.toLocaleString()}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                {roi.toFixed(1)}:1
              </div>
              <div className="text-sm text-muted-foreground">ROI Total</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                R$ {((totalBenefits - totalInvestment) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">VPL (10 anos)</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                {campanasData.demographics.households.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Famílias Beneficiadas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seletor de Cenários */}
      <Card>
        <CardHeader>
          <CardTitle>Análise de Cenários</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            {Object.entries(scenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => setSelectedScenario(key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedScenario === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {scenario.name}
              </button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            <p><strong>{currentScenario.name}:</strong> {currentScenario.description}</p>
            <ul className="mt-2 space-y-1">
              {currentScenario.assumptions.map((assumption, index) => (
                <li key={index}>• {assumption}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Tabs principais */}
      <Tabs defaultValue="monetary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="monetary">Validação Monetária</TabsTrigger>
          <TabsTrigger value="impact">Métricas de Impacto</TabsTrigger>
          <TabsTrigger value="visualization">Visualizações</TabsTrigger>
        </TabsList>

        <TabsContent value="monetary" className="space-y-6">
          <MonetaryValidationIndicators 
            indicators={adjustedMonetaryIndicators}
            scenario={selectedScenario}
            projectLocation="Campinas/SP"
          />
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <DetailedImpactMetrics 
            metrics={adjustedImpactMetrics}
            scenario={selectedScenario}
            campanasContext={campanasData}
          />
        </TabsContent>

        <TabsContent value="visualization" className="space-y-6">
          <ImpactVisualization 
            monetaryIndicators={adjustedMonetaryIndicators}
            impactMetrics={adjustedImpactMetrics}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
