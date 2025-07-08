
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CalculatorEngine from "@/components/social-calculator/CalculatorEngine";
import DataIntegration from "@/components/social-calculator/DataIntegration";
import SpatialAnalysis from "@/components/social-calculator/SpatialAnalysis";
import MonetaryValuation from "@/components/social-calculator/MonetaryValuation";
import ProjectCatalog from "@/components/social-calculator/ProjectCatalog";
import OutputReport from "@/components/social-calculator/OutputReport";
import GISInput from "@/components/social-calculator/GISInput";
import { ProjectOverview } from "@/components/dashboard/ProjectOverview";
import { AppLayout } from "@/components/layout/AppLayout";
import { ProjectData, CalculationResults, AIInsight, GISProjectInput, GISValidationResult } from "@/types/calculator";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
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

  // Get current tab from URL
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || "overview";

  // Update URL when tab changes
  const setCurrentTab = (tab: string) => {
    if (tab === "overview") {
      navigate("/", { replace: true });
    } else {
      navigate(`/?tab=${tab}`, { replace: true });
    }
  };

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

  const renderContent = () => {
    switch (currentTab) {
      case "overview":
        return <ProjectOverview />;
      case "catalog":
        return <ProjectCatalog />;
      case "gis":
        return (
          <GISInput 
            onProjectSubmit={handleGISProject}
            onValidationComplete={handleValidation}
          />
        );
      case "integration":
        return <DataIntegration />;
      case "analysis":
        return <SpatialAnalysis />;
      case "valuation":
        return <MonetaryValuation projectData={projectData} />;
      case "calculator":
        return (
          <CalculatorEngine 
            projectData={projectData}
            onResults={handleResults}
            onInsights={handleInsights}
          />
        );
      case "report":
        return (
          <OutputReport 
            projectName={gisProject?.projectData.name || "Projeto de Saneamento - Jardim Campos Elíseos"}
            results={results}
          />
        );
      default:
        return <ProjectOverview />;
    }
  };

  return (
    <AppLayout>
      {renderContent()}
    </AppLayout>
  );
};

export default Index;
