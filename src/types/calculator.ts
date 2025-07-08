// Project Area Definition
export interface ProjectArea {
  id: string;
  name: string;
  coordinates: [number, number][];
  area: number;
  population: number;
  municipality: string;
  state: string;
}

// Infrastructure Data
export interface InfrastructureData {
  type?: string;
  waterCoverage: number;
  sewerCoverage: number;
  treatmentPlants: number;
  pipelineLength: number;
  pumpStations: number;
  investmentAmount: number;
  projectType: 'water' | 'sewer' | 'treatment' | 'integrated';
}

// Demographics Data
export interface DemographicsData {
  totalPopulation: number;
  households: number;
  averageIncome: number;
  educationLevel: 'low' | 'medium' | 'high';
  vulnerabilityIndex: number;
  childrenUnder5: number;
  eldersOver65: number;
}

// Health Data
export interface HealthData {
  waterQualityIndex: number;
  waterborneIllnesses: number;
  hospitalizations: number;
  infantMortality: number;
  diarrheaCases: number;
}

// Economic Data
export interface EconomicData {
  tourism: number;
  propertyValues: number;
  localBusiness: number;
  employment: number;
  industrialActivity: number;
}

// Climate Data
export interface ClimateData {
  floodRisk: number;
  droughtRisk: number;
  temperatureChange: number;
  precipitationChange: number;
  extremeEvents: number;
}

// Complete Project Data
export interface ProjectData {
  area: ProjectArea;
  infrastructure: InfrastructureData;
  demographics: DemographicsData;
  health: HealthData;
  economic: EconomicData;
  climate: ClimateData;
}

// Data Source Definition
export interface DataSource {
  id: string;
  name: string;
  type: 'IBGE' | 'SUS' | 'TrataBrasil' | 'IPCC' | 'ANA' | 'INPE';
  reliability: number;
  lastUpdate: Date;
  status: 'active' | 'inactive' | 'maintenance';
}

// GIS Layer Definition
export interface GISLayer {
  id: string;
  name: string;
  type: 'infrastructure' | 'demographic' | 'health' | 'economic' | 'climate' | 'administrative';
  visible: boolean;
  opacity: number;
  data?: any;
}

// Impact Analysis Results
export interface ImpactResults {
  health: {
    diseaseReduction: number;
    hospitalizationReduction: number;
    mortalityReduction: number;
    waterQualityImprovement: number;
  };
  economic: {
    propertyValueIncrease: number;
    incomeIncrease: number;
    businessGrowth: number;
    employmentIncrease: number;
    tourismGrowth: number;
  };
  social: {
    educationImprovement: number;
    qualityOfLifeIndex: number;
    socialInclusionIndex: number;
    genderEqualityImpact: number;
  };
  environmental: {
    waterSavings: number;
    energySavings: number;
    carbonReduction: number;
    ecosystemRecovery: number;
    wasteReduction: number;
  };
  roi: {
    socialROI: number;
    economicROI: number;
    environmentalROI: number;
    overallROI: number;
    paybackPeriod: number;
  };
}

// Calculation Parameters
export interface CalculationParams {
  timeHorizon: number;
  discountRate: number;
  inflationRate: number;
  populationGrowthRate: number;
}

// Project Types for Impact Calculation
export type ProjectType = 'water_distribution' | 'sewage_treatment' | 'water_reuse' | 'water_security' | 'integrated';

// Scenario Analysis
export interface ScenarioData {
  baseline: ImpactResults;
  optimistic: ImpactResults;
  conservative: ImpactResults;
}

export interface CalculationResults {
  healthImpacts: {
    preventedIllnesses: number;
    reducedHospitalizations: number;
    savedMedicalCosts: number;
    improvedLifeExpectancy: number;
    childMortalityReduction: number;
    qualityAdjustedLifeYears: number;
  };
  economicImpacts: {
    propertyValueIncrease: number;
    newJobs: number;
    productivityGains: number;
    tourismIncrease: number;
    businessGrowth: number;
    taxRevenueIncrease: number;
  };
  socialImpacts: {
    educationImprovement: number;
    genderEquity: number;
    communityWellbeing: number;
    timeGainsByWomen: number;
    reducedInequality: number;
  };
  environmentalImpacts: {
    carbonFootprintReduction: number;
    waterConservation: number;
    biodiversityIndex: number;
    pollutionReduction: number;
    ecosystemServices: number;
  };
  roi: {
    socialROI: number;
    economicROI: number;
    environmentalROI: number;
    paybackPeriod: number;
    npv: number;
    irr: number;
    benefitCostRatio: number;
  };
  risks: {
    climateRisks: Array<{
      type: string;
      probability: number;
      impact: number;
      mitigation: string;
    }>;
    technicalRisks: Array<{
      type: string;
      probability: number;
      impact: number;
      mitigation: string;
    }>;
    financialRisks: Array<{
      type: string;
      probability: number;
      impact: number;
      mitigation: string;
    }>;
    socialRisks: Array<{
      type: string;
      probability: number;
      impact: number;
      mitigation: string;
    }>;
    overallRiskScore: number;
  };
  projectType?: 'water_loss' | 'reuse' | 'security' | 'sanitation';
}

export interface AIInsight {
  type: 'recommendation' | 'optimization' | 'alert' | 'prediction';
  confidence: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  data?: Record<string, any>;
}

// GIS-specific types for enhanced functionality
export interface GISProjectInput {
  polygon: GeoJSONPolygon;
  projectData: {
    name: string;
    interventionType: 'water_network' | 'sewer_network' | 'treatment_plant' | 'integrated';
    lengthKm: number;
    populationServed: number;
    investmentAmount: number;
    materials: string[];
    constructionPeriod: number;
  };
  externalData: {
    ibge?: IBGEData;
    sus?: SUSData;
    climate?: ClimateData;
  };
}

export interface GeoJSONPolygon {
  type: 'Feature';
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  properties: {
    project_id?: string;
    area_km2?: number;
    perimeter_km?: number;
  };
}

export interface IBGEData {
  populationDensity: number;
  averageIncome: number;
  urbanization: number;
  accessToWater: number;
  accessToSewer: number;
}

export interface SUSData {
  waterborneIllnesses: number;
  hospitalizations: number;
  infantMortality: number;
  healthFacilities: number;
}

export interface ExternalDataSource {
  id: string;
  name: string;
  type: 'IBGE' | 'SUS' | 'ANA' | 'INMET';
  endpoint: string;
  status: 'active' | 'inactive';
  lastSync: Date;
}

export interface GISValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  suggestions: string[];
}
