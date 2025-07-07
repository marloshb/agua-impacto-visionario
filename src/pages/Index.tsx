import { useState } from "react";
import CalculatorEngine from "@/components/social-calculator/CalculatorEngine";
import { ProjectData, CalculationResults, AIInsight } from "@/types/calculator";

const Index = () => {
  const [projectData, setProjectData] = useState<ProjectData>({
    area: {
      id: "main",
      name: "Área Principal",
      coordinates: [[-15.7934, -47.8823]],
      area: 0,
      population: 0,
      municipality: "Brasília",
      state: "DF"
    },
    infrastructure: {
      type: "water",
      investmentAmount: 0,
      pipelineLength: 0,
      sewerCoverage: 0,
      waterCoverage: 0,
      treatmentPlants: 0,
      pumpStations: 0,
      projectType: "water"
    },
    demographics: {
      totalPopulation: 0,
      households: 0,
      averageIncome: 0,
      educationLevel: "low",
      vulnerabilityIndex: 0,
      childrenUnder5: 0,
      eldersOver65: 0
    },
    health: {
      waterQualityIndex: 0,
      waterborneIllnesses: 0,
      hospitalizations: 0,
      infantMortality: 0,
      diarrheaCases: 0
    },
    economic: {
      tourism: 0,
      propertyValues: 0,
      localBusiness: 0,
      employment: 0,
      industrialActivity: 0
    },
    climate: {
      floodRisk: 0,
      droughtRisk: 0,
      temperatureChange: 0,
      precipitationChange: 0,
      extremeEvents: 0
    }
  });

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [insights, setInsights] = useState<AIInsight[]>([]);

  const handleResults = (newResults: CalculationResults) => {
    setResults(newResults);
  };

  const handleInsights = (newInsights: AIInsight[]) => {
    setInsights(newInsights);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Calculadora de Impactos Sociais</h1>
          <p className="text-xl text-muted-foreground">
            Análise completa de impactos em projetos de água e saneamento
          </p>
        </div>
        <CalculatorEngine 
          projectData={projectData}
          onResults={handleResults}
          onInsights={handleInsights}
        />
      </div>
    </div>
  );
};

export default Index;
