
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  RadarChart, 
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Target, Activity } from 'lucide-react';

interface ImpactVisualizationProps {
  monetaryIndicators: any[];
  impactMetrics: any[];
}

export default function ImpactVisualization({ 
  monetaryIndicators, 
  impactMetrics 
}: ImpactVisualizationProps) {
  
  const monetaryData = monetaryIndicators.map(indicator => ({
    name: indicator.name.split(' ').slice(0, 2).join(' '),
    value: indicator.value / 1000, // Converter para milhares
    confidence: indicator.confidence
  }));

  const impactData = impactMetrics.map(metric => ({
    category: metric.category,
    baseline: metric.baseline,
    current: metric.value,
    target: metric.target,
    progress: ((metric.value - metric.baseline) / (metric.target - metric.baseline)) * 100
  }));

  const radarData = impactMetrics.map(metric => ({
    subject: metric.name.split(' ').slice(0, 2).join(' '),
    baseline: metric.baseline * 100,
    current: metric.value * 100,
    target: metric.target * 100
  }));

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(0)}K`;
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Indicadores Monetários */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Validação Monetária por Categoria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monetaryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis 
                label={{ value: 'Valor (R$ mil)', angle: -90, position: 'insideLeft' }}
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), 'Valor']}
                labelFormatter={(label) => `Categoria: ${label}`}
              />
              <Bar dataKey="value" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progresso dos Impactos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Progresso dos Indicadores de Impacto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={impactData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 100]} />
              <YAxis 
                type="category" 
                dataKey="category" 
                width={100}
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [formatPercent(value as number), 'Progresso']}
              />
              <Bar dataKey="progress" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Análise Radar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Análise Comparativa Radar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" fontSize={10} />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]}
                fontSize={8}
              />
              <Radar
                name="Baseline"
                dataKey="baseline"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.2}
              />
              <Radar
                name="Atual"
                dataKey="current"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Radar
                name="Meta"
                dataKey="target"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
