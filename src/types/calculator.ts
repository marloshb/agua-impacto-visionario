export interface ProjectData {
  infrastructure: {
    type?: string;
    investmentAmount: number;
    pipelineLength: number;
    sewerCoverage: number;
  };
  demographics: {
    totalPopulation: number;
    households: number;
    averageIncome: number;
  };
  health: {
    waterQualityIndex: number;
    waterborneIllnesses: number;
    hospitalizations: number;
  };
  economic: {
    tourism: number;
  };
  climate: {
    floodRisk: number;
  };
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
    climateRisks: Risk[];
    technicalRisks: Risk[];
    financialRisks: Risk[];
    socialRisks: Risk[];
    overallRiskScore: number;
  };
  projectType?: 'water_loss' | 'reuse' | 'security' | 'sanitation';
}

export interface Risk {
  type: string;
  probability: number;
  impact: number;
  mitigation: string;
}

export interface AIInsight {
  type: 'recommendation' | 'alert' | 'optimization' | 'prediction';
  confidence: number;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  data: any;
}
