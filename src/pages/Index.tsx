
import { useState } from "react";
import CalculatorEngine from "@/components/social-calculator/CalculatorEngine";
import DataIntegration from "@/components/social-calculator/DataIntegration";
import SpatialAnalysis from "@/components/social-calculator/SpatialAnalysis";
import MonetaryValuation from "@/components/social-calculator/MonetaryValuation";
import ProjectCatalog from "@/components/social-calculator/ProjectCatalog";
import OutputReport from "@/components/social-calculator/OutputReport";
import GISInput from "@/components/social-calculator/GISInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectData, CalculationResults, AIInsight, GISProjectInput, GISValidationResult } from "@/types/calculator";

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
  const [gisProject, setGisProject] = useState<GISProjectInput | null>(null);

  const handleResults = (newResults: CalculationResults) => {
    setResults(newResults);
  };

  const handleInsights = (newInsights: AIInsight[]) => {
    setInsights(newInsights);
  };

  const handleGISProject = (project: GISProjectInput) => {
    setGisProject(project);
    
    // Update project data with GIS information
    const updatedProjectData: ProjectData = {
      ...projectData,
      area: {
        id: "gis_area",
        name: project.projectData.name,
        coordinates: project.polygon.geometry.coordinates[0].map(coord => [coord[1], coord[0]]),
        area: project.polygon.properties.area_km2 || 0,
        population: project.projectData.populationServed,
        municipality: "Município GIS",
        state: "Estado GIS"
      },
      infrastructure: {
        ...projectData.infrastructure,
        investmentAmount: project.projectData.investmentAmount,
        pipelineLength: project.projectData.lengthKm,
        projectType: project.projectData.interventionType as any
      },
      demographics: {
        ...projectData.demographics,
        totalPopulation: project.projectData.populationServed,
        averageIncome: project.externalData.ibge?.averageIncome || 0,
        households: Math.round(project.projectData.populationServed / 3.5)
      },
      health: {
        ...projectData.health,
        waterborneIllnesses: project.externalData.sus?.waterborneIllnesses || 0,
        hospitalizations: project.externalData.sus?.hospitalizations || 0,
        infantMortality: project.externalData.sus?.infantMortality || 0
      }
    };
    
    setProjectData(updatedProjectData);
  };

  const handleValidation = (result: GISValidationResult) => {
    console.log('Validation result:', result);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Calculadora de Impactos Sociais</h1>
          <p className="text-xl text-muted-foreground">
            Análise completa de impactos em projetos de água e saneamento com integração GIS
          </p>
        </div>
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="catalog">Catálogo</TabsTrigger>
            <TabsTrigger value="gis">Entrada GIS</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
            <TabsTrigger value="analysis">Análises</TabsTrigger>
            <TabsTrigger value="valuation">Valoração</TabsTrigger>
            <TabsTrigger value="calculator">Cálculo</TabsTrigger>
            <TabsTrigger value="report">Relatório</TabsTrigger>
          </TabsList>
          
          <TabsContent value="catalog" className="mt-6">
            <ProjectCatalog />
          </TabsContent>
          
          <TabsContent value="gis" className="mt-6">
            <GISInput 
              onProjectSubmit={handleGISProject}
              onValidationComplete={handleValidation}
            />
          </TabsContent>
          
          <TabsContent value="integration" className="mt-6">
            <DataIntegration />
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-6">
            <SpatialAnalysis />
          </TabsContent>
          
          <TabsContent value="valuation" className="mt-6">
            <MonetaryValuation />
          </TabsContent>
          
          <TabsContent value="calculator" className="mt-6">
            <CalculatorEngine 
              projectData={projectData}
              onResults={handleResults}
              onInsights={handleInsights}
            />
          </TabsContent>
          
          <TabsContent value="report" className="mt-6">
            <OutputReport 
              projectName={gisProject?.projectData.name || "Projeto de Saneamento - Ceilândia"}
              results={results}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
