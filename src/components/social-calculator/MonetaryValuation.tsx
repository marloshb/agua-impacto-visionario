
import React from 'react';
import { ProjectData } from '@/types/calculator';
import EnhancedMonetaryValuation from './EnhancedMonetaryValuation';

interface MonetaryValuationProps {
  projectData?: ProjectData;
}

export default function MonetaryValuation({ projectData }: MonetaryValuationProps) {
  // Usar dados padrão se não fornecidos
  const defaultProjectData: ProjectData = {
    area: {
      id: "sample",
      name: "Área de Exemplo",
      coordinates: [[-15.7934, -47.8823]],
      area: 10,
      population: 5000,
      municipality: "Brasília",
      state: "DF"
    },
    infrastructure: {
      type: "integrated",
      investmentAmount: 1500000,
      pipelineLength: 15,
      sewerCoverage: 60,
      waterCoverage: 85,
      treatmentPlants: 1,
      pumpStations: 2,
      projectType: "integrated"
    },
    demographics: {
      totalPopulation: 5000,
      households: 1400,
      averageIncome: 2800,
      educationLevel: "medium",
      vulnerabilityIndex: 0.65,
      childrenUnder5: 400,
      eldersOver65: 300
    },
    health: {
      waterQualityIndex: 70,
      waterborneIllnesses: 120,
      hospitalizations: 45,
      infantMortality: 8,
      diarrheaCases: 80
    },
    economic: {
      tourism: 1000,
      propertyValues: 15,
      localBusiness: 150,
      employment: 2200,
      industrialActivity: 8
    },
    climate: {
      floodRisk: 35,
      droughtRisk: 20,
      temperatureChange: 1.5,
      precipitationChange: -10,
      extremeEvents: 3
    }
  };

  const activeProjectData = projectData || defaultProjectData;

  return <EnhancedMonetaryValuation projectData={activeProjectData} />;
}
