export type ForensicStatus = 'Normal' | 'Attention' | 'Requires Verification';

export type InspectionPriority = 
  | 'Consistent' 
  | 'Requires Verification' 
  | 'Inspection Recommended' 
  | 'High Priority Inspection';

export interface ChemicalUsage {
  limeKgDay: number;
  alumKgDay: number;
  polyelectrolyteKgDay: number;
  sodiumHypochloriteKgDay?: number;
  causticSodaKgDay?: number;
}

export interface OcemsParameters {
  ph: number;
  bod: number; // mg/L
  cod: number; // mg/L
  tss: number; // mg/L
  flowRateM3Hr: number;
  dataAvailabilityPercent: number;
  temperatureC?: number;
  dissolvedOxygenMgL?: number;
}

export interface OcemsLimits {
  phMin: number;
  phMax: number;
  bodMax: number;
  codMax: number;
  tssMax: number;
}

export interface ForensicSignals {
  flatline: ForensicStatus;
  thresholdHugging: ForensicStatus;
  digitPreference: ForensicStatus;
  strategicDowntime: ForensicStatus;
}

export interface SystemImpact {
  productionChangePercent: number;
  estimatedWastewaterChangePercent: number;
  cetpLoadChangePercent: number;
  downstreamRiskScore: number; // 0 - 100
}

export interface IndustryData {
  id: string;
  name: string;
  code: string;
  type: string;
  category: 'Red' | 'Orange' | 'Green';
  status: string;
  basin: string;
  coordinates: { lat: number; lng: number };
  
  // Real-world physical evidence
  productionCapacityPercent: number;
  permittedCapacityTpd: string;
  electricityKwhDay: number;
  electricityBaselineKwhDay: number;
  chemicals: ChemicalUsage;
  sludgeTonnesDay: number;
  sludgeBaselineTonnesDay: number;
  wastewaterReportedKlDay: number;
  computedMassBalanceKlDay: number;
  cetpLoadContributionPercent: number;
  
  // Continuous Monitoring
  ocems: OcemsParameters;
  ocemsLimits: OcemsLimits;
  
  // Triangulation & Forensic Signals
  forensicSignals: ForensicSignals;
  inspectionPriority: InspectionPriority;
  inspectionReason: string;
  
  // System Simulation & World Model
  systemImpact: SystemImpact;
  
  // 3D Spatial Layout Properties
  position3D: [number, number, number];
  buildingType: 'textile' | 'chemical' | 'electroplating' | 'paper' | 'tannery';
  primaryColor: string;
  accentColor: string;
  pipeColor: string;
  pipeRoute: [number, number, number][];
}

export interface CetpData {
  id: string;
  name: string;
  code: string;
  location: string;
  designCapacityKlDay: number;
  currentHydraulicLoadKlDay: number;
  inletCodMgL: number;
  treatedOutletCodMgL: number;
  inletBodMgL: number;
  treatedOutletBodMgL: number;
  removalEfficiencyPercent: number;
  connectedUnitsCount: number;
  status: string;
  treatedDischargeKlDay: number;
  position3D: [number, number, number];
  dischargePipeRoute: [number, number, number][];
}

export interface DownstreamStationData {
  id: string;
  name: string;
  code: string;
  riverName: string;
  distanceFromDischargeKm: number;
  sensorStatus: 'Active - Transmitting' | 'Maintenance' | 'Calibrating';
  dataAvailabilityPercent: number;
  parameters: {
    ph: number;
    bod: number;
    cod: number;
    do: number; // Dissolved Oxygen mg/L
    tds: number; // Total Dissolved Solids mg/L
    turbidityNtu: number;
    temperatureC: number;
    flowVelocityMs: number;
  };
  limits: {
    phMin: number;
    phMax: number;
    bodMax: number;
    codMax: number;
    doMin: number;
    tdsMax: number;
  };
  waterQualityIndex: number; // 0 - 100
  waterQualityGrade: 'Class A (Pristine)' | 'Class B (Outdoor Bathing)' | 'Class C (Drinking after Treatment)' | 'Class D (Propagation of Wildlife)';
  status: 'Consistent' | 'Attention' | 'Requires Verification';
  position3D: [number, number, number];
}

export interface BorewellData {
  id: string;
  name: string;
  code: string;
  depthMeters: number;
  staticWaterLevelMeters: number;
  aquiferLayer: string;
  electricalConductivityUscm: number;
  tdsMgL: number;
  heavyMetalSignal: 'Below Detection Limit' | 'Trace Anomaly Detected' | 'Elevated Chromium-VI Detected';
  sensorStatus: 'Online Multiparameter Piezometer';
  status: 'Consistent' | 'Requires Verification';
  riskNote: string;
  position3D: [number, number, number];
}

export type SelectedEntity = 
  | { type: 'industry'; data: IndustryData }
  | { type: 'cetp'; data: CetpData }
  | { type: 'monitoring'; data: DownstreamStationData }
  | { type: 'borewell'; data: BorewellData }
  | null;
