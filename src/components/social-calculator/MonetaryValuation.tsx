
import React from 'react';
import { ProjectData } from '@/types/calculator';
import EnhancedMonetaryValuation from './EnhancedMonetaryValuation';

interface MonetaryValuationProps {
  projectData?: ProjectData;
}

export default function MonetaryValuation({ projectData }: MonetaryValuationProps) {
  // Dados padrão baseados no projeto de Campinas/SANASA
  const campanasProjectData: ProjectData = {
    area: {
      id: "campinas-jardim-campos-eliseos",
      name: "Jardim Campos Elíseos - Campinas/SP",
      coordinates: [[-22.8808, -47.0527], [-22.8820, -47.0510], [-22.8835, -47.0515], [-22.8823, -47.0532]],
      area: 12.5, // km²
      population: 45000,
      municipality: "Campinas",
      state: "SP"
    },
    infrastructure: {
      type: "integrated",
      investmentAmount: 25000000, // R$ 25 milhões
      pipelineLength: 85, // km de rede
      sewerCoverage: 87.2, // cobertura atual SANASA
      waterCoverage: 98.5, // cobertura atual SANASA
      treatmentPlants: 2,
      pumpStations: 8,
      projectType: "integrated"
    },
    demographics: {
      totalPopulation: 45000,
      households: 12800,
      averageIncome: 3200, // R$ renda média familiar
      educationLevel: "medium",
      vulnerabilityIndex: 0.45, // índice médio para região
      childrenUnder5: 3200,
      eldersOver65: 2700
    },
    health: {
      waterQualityIndex: 82, // índice SANASA
      waterborneIllnesses: 2100, // casos anuais estimados
      hospitalizations: 185, // internações anuais
      infantMortality: 12, // por 1000 nascidos vivos
      diarrheaCases: 1850 // casos anuais
    },
    economic: {
      tourism: 15000, // visitantes/ano na região
      propertyValues: 22, // valorização % estimada
      localBusiness: 890, // estabelecimentos
      employment: 18500, // população economicamente ativa
      industrialActivity: 25 // índice de atividade industrial
    },
    climate: {
      floodRisk: 45, // risco alto na região baixa
      droughtRisk: 28, // risco moderado
      temperatureChange: 2.1, // aumento projetado °C
      precipitationChange: -8, // redução % chuvas
      extremeEvents: 6 // eventos por ano
    }
  };

  const activeProjectData = projectData || campanasProjectData;

  return <EnhancedMonetaryValuation projectData={activeProjectData} />;
}
