
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  GraduationCap, 
  Leaf, 
  Users, 
  TrendingUp, 
  Shield,
  Target,
  CheckCircle
} from 'lucide-react';

interface ImpactMetric {
  id: string;
  category: string;
  name: string;
  value: number;
  baseline: number;
  target: number;
  unit: string;
  description: string;
  details: any;
}

interface DetailedImpactMetricsProps {
  metrics: ImpactMetric[];
  scenario: string;
  campanasContext: any;
}

export default function DetailedImpactMetrics({ 
  metrics, 
  scenario, 
  campanasContext 
}: DetailedImpactMetricsProps) {
  
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'saúde': return Heart;
      case 'educação': return GraduationCap;
      case 'ambiental': return Leaf;
      case 'social': return Users;
      case 'econômico': return TrendingUp;
      case 'vulnerabilidade': return Shield;
      default: return Target;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'saúde': return 'bg-red-500';
      case 'educação': return 'bg-blue-500';
      case 'ambiental': return 'bg-green-500';
      case 'social': return 'bg-purple-500';
      case 'econômico': return 'bg-yellow-500';
      case 'vulnerabilidade': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getProgressValue = (metric: ImpactMetric) => {
    if (metric.unit === 'índice_gini' || metric.unit === 'índice') {
      // Para índices onde menor é melhor
      const progress = Math.max(0, (metric.baseline - metric.value) / (metric.baseline - metric.target));
      return Math.min(100, progress * 100);
    } else {
      // Para percentuais onde maior é melhor
      const progress = (metric.value - metric.baseline) / (metric.target - metric.baseline);
      return Math.min(100, Math.max(0, progress * 100));
    }
  };

  const formatValue = (value: number, unit: string) => {
    switch (unit) {
      case 'percentual':
        return `${(value * 100).toFixed(1)}%`;
      case 'índice_gini':
        return value.toFixed(3);
      case 'índice':
        return value.toFixed(2);
      default:
        return value.toFixed(2);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview dos Impactos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Métricas de Impacto - Jardim Campos Elíseos, Campinas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">
                {campanasContext.demographics.totalPopulation.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">População Beneficiada</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-700">
                {campanasContext.demographics.households.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Famílias Atendidas</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">
                {campanasContext.sanasa.coverage.sewer}%
              </div>
              <div className="text-sm text-muted-foreground">Cobertura Esgoto Atual</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas por Categoria */}
      <div className="grid gap-6">
        {metrics.map((metric) => {
          const IconComponent = getIcon(metric.category);
          const progressValue = getProgressValue(metric);
          
          return (
            <Card key={metric.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-5 h-5" />
                    {metric.name}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-white ${getCategoryColor(metric.category)}`}
                  >
                    {metric.category}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {formatValue(metric.value, metric.unit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Valor atual
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Progress value={progressValue} className="w-32" />
                      <span className="text-sm font-medium">{progressValue.toFixed(0)}%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Meta: {formatValue(metric.target, metric.unit)}
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {metric.description}
                </div>

                {/* Detalhes específicos por categoria */}
                {metric.id === 'health_impact' && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Impacto na Saúde - Dados HC Unicamp/Hospital Mário Gatti</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Diarreia</div>
                        <div>Atual: {metric.details.diarrhea.current} casos/ano</div>
                        <div>Projetado: {metric.details.diarrhea.projected} casos/ano</div>
                      </div>
                      <div>
                        <div className="font-medium">Hepatite A</div>
                        <div>Atual: {metric.details.hepatitis.current} casos/ano</div>
                        <div>Projetado: {metric.details.hepatitis.projected} casos/ano</div>
                      </div>
                      <div>
                        <div className="font-medium">Verminoses</div>
                        <div>Atual: {metric.details.parasites.current} casos/ano</div>
                        <div>Projetado: {metric.details.parasites.projected} casos/ano</div>
                      </div>
                    </div>
                  </div>
                )}

                {metric.id === 'education_impact' && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Impacto na Educação - Escolas da Região</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Escolas Beneficiadas</div>
                        <div>{metric.details.schools} unidades</div>
                      </div>
                      <div>
                        <div className="font-medium">Estudantes</div>
                        <div>{metric.details.students.toLocaleString()} alunos</div>
                      </div>
                      <div>
                        <div className="font-medium">Redução Faltas</div>
                        <div>{metric.details.absenceReduction}%</div>
                      </div>
                    </div>
                  </div>
                )}

                {metric.id === 'environmental_impact' && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Impacto Ambiental - Região Metropolitana de Campinas</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">CO₂ Reduzido</div>
                        <div>{metric.details.co2Reduction} t/ano</div>
                      </div>
                      <div>
                        <div className="font-medium">Metano Reduzido</div>
                        <div>{metric.details.methaneReduction} t/ano</div>
                      </div>
                      <div>
                        <div className="font-medium">Água Economizada</div>
                        <div>{metric.details.waterSaved}M m³/ano</div>
                      </div>
                    </div>
                  </div>
                )}

                {metric.id === 'social_impact' && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Impacto Social - Jardim Campos Elíseos</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Famílias Beneficiadas</div>
                        <div>{metric.details.beneficiaries.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="font-medium">Aumento de Renda</div>
                        <div>{metric.details.incomeIncrease}% médio</div>
                      </div>
                      <div>
                        <div className="font-medium">Empregos Criados</div>
                        <div>{metric.details.jobsCreated} postos</div>
                      </div>
                    </div>
                  </div>
                )}

                {metric.id === 'economic_impact' && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Impacto Econômico - Economia Local</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Novos Negócios</div>
                        <div>{metric.details.newBusinesses} empresas</div>
                      </div>
                      <div>
                        <div className="font-medium">Aumento PIB</div>
                        <div>{metric.details.gdpIncrease}% local</div>
                      </div>
                      <div>
                        <div className="font-medium">Turismo</div>
                        <div>+{metric.details.tourismGrowth}% visitantes</div>
                      </div>
                    </div>
                  </div>
                )}

                {metric.id === 'vulnerability_reduction' && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg">
                    <h5 className="font-medium mb-2">Redução de Vulnerabilidade - Riscos Climáticos</h5>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <div className="font-medium">Risco Enchentes</div>
                        <div>-{metric.details.floodRisk}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Risco Secas</div>
                        <div>-{metric.details.droughtRisk}%</div>
                      </div>
                      <div>
                        <div className="font-medium">Vulnerabilidade Social</div>
                        <div>-{metric.details.socialVulnerability}%</div>
                      </div>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alinhamento com ODS */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Alinhamento com Objetivos de Desenvolvimento Sustentável (ODS)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 3 - Saúde e Bem-estar</div>
              <div className="text-sm text-muted-foreground mt-1">
                Redução de 65% das doenças hídricas na região
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 4 - Educação de Qualidade</div>
              <div className="text-sm text-muted-foreground mt-1">
                Redução de 28% no absenteísmo escolar
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 6 - Água Potável e Saneamento</div>
              <div className="text-sm text-muted-foreground mt-1">
                Expansão da cobertura de esgoto para 95%
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 8 - Trabalho Decente</div>
              <div className="text-sm text-muted-foreground mt-1">
                Criação de 280 empregos diretos e indiretos
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 10 - Redução das Desigualdades</div>
              <div className="text-sm text-muted-foreground mt-1">
                Melhoria do índice de Gini de 0,62 para 0,48
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-medium text-blue-600">ODS 13 - Ação Contra Mudança Climática</div>
              <div className="text-sm text-muted-foreground mt-1">
                Redução de 850 tCO₂e/ano em emissões
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contexto SANASA */}
      <Card>
        <CardHeader>
          <CardTitle>Contexto Operacional - SANASA Campinas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">Cobertura Atual</h5>
              <div className="space-y-1">
                <div>Água: {campanasContext.sanasa.coverage.water}%</div>
                <div>Esgoto: {campanasContext.sanasa.coverage.sewer}%</div>
                <div>Tarifa residencial: R$ {campanasContext.sanasa.tariff.residential}/m³</div>
                <div>Tarifa comercial: R$ {campanasContext.sanasa.tariff.commercial}/m³</div>
              </div>
            </div>
            <div>
              <h5 className="font-medium mb-2">Metas do Projeto</h5>
              <div className="space-y-1">
                <div>Cobertura esgoto: 95% (meta)</div>
                <div>Perda de água: <15% (atual ~25%)</div>
                <div>Qualidade: 100% tratamento</div>
                <div>Eficiência energética: +20%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
