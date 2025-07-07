export interface ProjectArea {
  id: string;
  name: string;
  coordinates: [number, number][];
  area: number; // in km²
  population: number;
  municipality: string;
  state: string;
}

export interface ProjectData {
  area: ProjectArea;
  infrastructure: InfrastructureData;
  demographics: DemographicsData;
  health: HealthData;
  economic: EconomicData;
  climate: ClimateData;
}

export interface InfrastructureData {
  waterCoverage: number; // percentage
  sewerCoverage: number; // percentage
  treatmentPlants: number;
  pipelineLength: number; // km
  pumpStations: number;
  investmentAmount: number; // R$
  projectType: 'water' | 'sewer' | 'treatment' | 'integrated';
}

export interface DemographicsData {
  totalPopulation: number;
  households: number;
  averageIncome: number; // R$ monthly
  educationLevel: 'low' | 'medium' | 'high';
  vulnerabilityIndex: number; // 0-1
  childrenUnder5: number;
  eldersOver65: number;
}

export interface HealthData {
  waterborneIllnesses: number; // cases per 100k
  hospitalizations: number; // annual
  infantMortality: number; // per 1000 births
  diarrheaCases: number; // annual
  waterQualityIndex: number; // 0-100
}

export interface EconomicData {
  propertyValues: number; // average R$
  localBusiness: number; // count
  employment: number; // percentage
  tourism: number; // visitors/year
  industrialActivity: number; // index 0-100
}

export interface ClimateData {
  floodRisk: number; // 0-1
  droughtRisk: number; // 0-1
  temperatureChange: number; // °C by 2050
  precipitationChange: number; // % by 2050
  extremeEvents: number; // frequency/year
}

export interface CalculationResults {
  healthImpacts: HealthImpacts;
  economicImpacts: EconomicImpacts;
  socialImpacts: SocialImpacts;
  environmentalImpacts: EnvironmentalImpacts;
  roi: ROIAnalysis;
  risks: RiskAssessment;
}

export interface HealthImpacts {
  preventedIllnesses: number;
  reducedHospitalizations: number;
  savedMedicalCosts: number; // R$
  improvedLifeExpectancy: number; // years
  childMortalityReduction: number; // percentage
  qualityAdjustedLifeYears: number;
}

export interface EconomicImpacts {
  propertyValueIncrease: number; // percentage
  newJobs: number;
  productivityGains: number; // R$ annually
  tourismIncrease: number; // percentage
  businessGrowth: number; // percentage
  taxRevenueIncrease: number; // R$ annually
}

export interface SocialImpacts {
  educationImprovement: number; // percentage
  genderEquity: number; // index improvement
  communityWellbeing: number; // index 0-100
  timeGainsByWomen: number; // hours/week
  reducedInequality: number; // Gini coefficient change
}

export interface EnvironmentalImpacts {
  carbonFootprintReduction: number; // tons CO2/year
  waterConservation: number; // liters/day
  biodiversityIndex: number; // 0-100
  pollutionReduction: number; // percentage
  ecosystemServices: number; // R$ value/year
}

export interface ROIAnalysis {
  socialROI: number; // ratio
  economicROI: number; // ratio
  environmentalROI: number; // ratio
  paybackPeriod: number; // years
  npv: number; // R$ Net Present Value
  irr: number; // Internal Rate of Return
  benefitCostRatio: number;
}

export interface RiskAssessment {
  climateRisks: ClimateRisk[];
  technicalRisks: TechnicalRisk[];
  financialRisks: FinancialRisk[];
  socialRisks: SocialRisk[];
  overallRiskScore: number; // 0-100
}

export interface ClimateRisk {
  type: 'flood' | 'drought' | 'extreme_weather';
  probability: number; // 0-1
  impact: number; // 0-100
  mitigation: string;
}

export interface TechnicalRisk {
  type: 'infrastructure' | 'maintenance' | 'capacity';
  probability: number;
  impact: number;
  mitigation: string;
}

export interface FinancialRisk {
  type: 'cost_overrun' | 'funding' | 'tariff';
  probability: number;
  impact: number;
  mitigation: string;
}

export interface SocialRisk {
  type: 'acceptance' | 'displacement' | 'inequality';
  probability: number;
  impact: number;
  mitigation: string;
}

export interface DataSource {
  name: string;
  type: 'IBGE' | 'SUS' | 'TrataBrasil' | 'IPCC' | 'ANA' | 'INPE' | 'Custom';
  lastUpdate: Date;
  reliability: number; // 0-100
  coverage: number; // percentage of required data
}

export interface AIInsight {
  type: 'recommendation' | 'alert' | 'optimization' | 'prediction';
  confidence: number; // 0-100
  title: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  actionable: boolean;
  data: any;
}

export interface GISLayer {
  id: string;
  name: string;
  type: 'infrastructure' | 'demographic' | 'health' | 'economic' | 'climate' | 'administrative';
  visible: boolean;
  opacity: number;
  data: any;
  style: any;
}