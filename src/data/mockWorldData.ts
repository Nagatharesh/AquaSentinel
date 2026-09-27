import type { IndustryData, CetpData, DownstreamStationData, BorewellData } from '../types/worldModel';

export const CETP_LOCATION: [number, number, number] = [0, 0.3, 3];
export const DISCHARGE_POINT_LOCATION: [number, number, number] = [0, 0.15, 9.2];
export const DOWNSTREAM_STATION_LOCATION: [number, number, number] = [12, 0.25, 16.0];
export const BOREWELL_LOCATION: [number, number, number] = [-11, 0.1, -2];

export const MOCK_INDUSTRIES: IndustryData[] = [
  {
    id: 'ind-01',
    name: 'ABC Textiles Pvt Ltd',
    code: 'TN-PCB-TEX-4409',
    type: 'Textile / Dyeing',
    category: 'Red',
    status: 'Monitoring Active',
    basin: 'Bhavani River Basin, Erode Cluster',
    coordinates: { lat: 11.3410, lng: 77.7172 },
    
    // Real-world physical evidence (matches prompt specifications exactly)
    productionCapacityPercent: 82,
    permittedCapacityTpd: '45.0 Tonnes/day Fabric',
    electricityKwhDay: 12450,
    electricityBaselineKwhDay: 10200,
    chemicals: {
      limeKgDay: 420,
      alumKgDay: 180,
      polyelectrolyteKgDay: 35,
      sodiumHypochloriteKgDay: 65,
      causticSodaKgDay: 210,
    },
    sludgeTonnesDay: 1.8,
    sludgeBaselineTonnesDay: 1.4,
    wastewaterReportedKlDay: 420,
    computedMassBalanceKlDay: 512,
    cetpLoadContributionPercent: 18,
    
    // OCEMS Parameters
    ocems: {
      ph: 7.4,
      bod: 29.2, // mg/L (limit is 30.0 - hugging threshold)
      cod: 118, // mg/L (limit is 250)
      tss: 42, // mg/L (limit is 100)
      flowRateM3Hr: 17.5,
      dataAvailabilityPercent: 96.8,
      temperatureC: 28.5,
      dissolvedOxygenMgL: 3.2,
    },
    ocemsLimits: {
      phMin: 6.5,
      phMax: 8.5,
      bodMax: 30.0,
      codMax: 250.0,
      tssMax: 100.0,
    },
    
    // Forensic Signals (responsible government wording)
    forensicSignals: {
      flatline: 'Normal',
      thresholdHugging: 'Attention',
      digitPreference: 'Normal',
      strategicDowntime: 'Attention',
    },
    inspectionPriority: 'High Priority Inspection',
    inspectionReason: 'OCEMS readings show unusual threshold clustering while production and electricity consumption indicate increased industrial activity.',
    
    // System Impact (as specified in prompt)
    systemImpact: {
      productionChangePercent: 12,
      estimatedWastewaterChangePercent: 9,
      cetpLoadChangePercent: 7,
      downstreamRiskScore: 68,
    },
    
    // 3D Spatial Layout
    position3D: [-10, 0, -8],
    buildingType: 'textile',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    pipeColor: '#0ea5e9',
    pipeRoute: [
      [-10, 0.4, -8],
      [-6, 0.3, -4],
      [-2, 0.3, 0],
      [0, 0.3, 3], // CETP
    ],
  },
  {
    id: 'ind-02',
    name: 'Cauvery Chemical Synthetics',
    code: 'TN-PCB-CHM-8821',
    type: 'Chemical / Specialty Intermediates',
    category: 'Red',
    status: 'Monitoring Active',
    basin: 'Bhavani River Basin, SIPCOT Phase-II',
    coordinates: { lat: 11.3520, lng: 77.7280 },
    
    productionCapacityPercent: 74,
    permittedCapacityTpd: '20.0 Tonnes/day Organics',
    electricityKwhDay: 18600,
    electricityBaselineKwhDay: 18100,
    chemicals: {
      limeKgDay: 280,
      alumKgDay: 110,
      polyelectrolyteKgDay: 22,
      sodiumHypochloriteKgDay: 90,
      causticSodaKgDay: 340,
    },
    sludgeTonnesDay: 2.3,
    sludgeBaselineTonnesDay: 2.2,
    wastewaterReportedKlDay: 310,
    computedMassBalanceKlDay: 318,
    cetpLoadContributionPercent: 14,
    
    ocems: {
      ph: 7.8,
      bod: 18.5,
      cod: 92,
      tss: 28,
      flowRateM3Hr: 12.9,
      dataAvailabilityPercent: 99.2,
      temperatureC: 31.2,
      dissolvedOxygenMgL: 4.1,
    },
    ocemsLimits: {
      phMin: 6.5,
      phMax: 8.5,
      bodMax: 30.0,
      codMax: 250.0,
      tssMax: 100.0,
    },
    
    forensicSignals: {
      flatline: 'Normal',
      thresholdHugging: 'Normal',
      digitPreference: 'Normal',
      strategicDowntime: 'Normal',
    },
    inspectionPriority: 'Consistent',
    inspectionReason: 'Operational mass balance and OCEMS continuous signals align consistently with historical baselines and power consumption telemetry.',
    
    systemImpact: {
      productionChangePercent: 3,
      estimatedWastewaterChangePercent: 2,
      cetpLoadChangePercent: 1.5,
      downstreamRiskScore: 18,
    },
    
    position3D: [-3, 0, -11],
    buildingType: 'chemical',
    primaryColor: '#059669',
    accentColor: '#34d399',
    pipeColor: '#10b981',
    pipeRoute: [
      [-3, 0.4, -11],
      [-1.5, 0.3, -5],
      [0, 0.3, 3],
    ],
  },
  {
    id: 'ind-03',
    name: 'Sri Meenakshi Electroplaters',
    code: 'TN-PCB-MET-1923',
    type: 'Electroplating & Surface Finishing',
    category: 'Red',
    status: 'Monitoring Active',
    basin: 'Bhavani River Basin, Small Scale Industrial Estate',
    coordinates: { lat: 11.3360, lng: 77.7050 },
    
    productionCapacityPercent: 88,
    permittedCapacityTpd: '12.5 Tonnes/day Anodizing',
    electricityKwhDay: 9800,
    electricityBaselineKwhDay: 7400,
    chemicals: {
      limeKgDay: 190,
      alumKgDay: 85,
      polyelectrolyteKgDay: 18,
      causticSodaKgDay: 150,
    },
    sludgeTonnesDay: 0.9,
    sludgeBaselineTonnesDay: 0.85,
    wastewaterReportedKlDay: 180,
    computedMassBalanceKlDay: 245,
    cetpLoadContributionPercent: 8,
    
    ocems: {
      ph: 6.8,
      bod: 14.0,
      cod: 68,
      tss: 36,
      flowRateM3Hr: 7.5,
      dataAvailabilityPercent: 89.4,
      temperatureC: 27.0,
      dissolvedOxygenMgL: 3.8,
    },
    ocemsLimits: {
      phMin: 6.5,
      phMax: 8.5,
      bodMax: 30.0,
      codMax: 250.0,
      tssMax: 100.0,
    },
    
    forensicSignals: {
      flatline: 'Attention',
      thresholdHugging: 'Normal',
      digitPreference: 'Requires Verification',
      strategicDowntime: 'Attention',
    },
    inspectionPriority: 'Requires Verification',
    inspectionReason: 'Sensors show periodic zero-variance telemetry windows correlated with peak tariff electricity operating hours.',
    
    systemImpact: {
      productionChangePercent: 8,
      estimatedWastewaterChangePercent: 6,
      cetpLoadChangePercent: 4,
      downstreamRiskScore: 52,
    },
    
    position3D: [5, 0, -10],
    buildingType: 'electroplating',
    primaryColor: '#d97706',
    accentColor: '#fbbf24',
    pipeColor: '#f59e0b',
    pipeRoute: [
      [5, 0.4, -10],
      [3, 0.3, -4],
      [0.5, 0.3, 0],
      [0, 0.3, 3],
    ],
  },
  {
    id: 'ind-04',
    name: 'Kongu Paper & Pulp Agro Mills',
    code: 'TN-PCB-PAP-3107',
    type: 'Paper & Pulp Processing',
    category: 'Red',
    status: 'Monitoring Active',
    basin: 'Bhavani River Basin, Sector 4 Industrial Corridor',
    coordinates: { lat: 11.3650, lng: 77.7420 },
    
    productionCapacityPercent: 91,
    permittedCapacityTpd: '120 Tonnes/day Kraft Board',
    electricityKwhDay: 24200,
    electricityBaselineKwhDay: 23800,
    chemicals: {
      limeKgDay: 680,
      alumKgDay: 320,
      polyelectrolyteKgDay: 60,
      causticSodaKgDay: 480,
    },
    sludgeTonnesDay: 4.8,
    sludgeBaselineTonnesDay: 4.6,
    wastewaterReportedKlDay: 850,
    computedMassBalanceKlDay: 870,
    cetpLoadContributionPercent: 36,
    
    ocems: {
      ph: 7.2,
      bod: 24.8,
      cod: 145,
      tss: 58,
      flowRateM3Hr: 35.4,
      dataAvailabilityPercent: 98.1,
      temperatureC: 33.0,
      dissolvedOxygenMgL: 2.9,
    },
    ocemsLimits: {
      phMin: 6.5,
      phMax: 8.5,
      bodMax: 30.0,
      codMax: 250.0,
      tssMax: 100.0,
    },
    
    forensicSignals: {
      flatline: 'Normal',
      thresholdHugging: 'Normal',
      digitPreference: 'Normal',
      strategicDowntime: 'Normal',
    },
    inspectionPriority: 'Consistent',
    inspectionReason: 'Pulp digestion steam balance, lignin extraction records, and biological aeration telemetry remain within calibrated tolerances.',
    
    systemImpact: {
      productionChangePercent: 5,
      estimatedWastewaterChangePercent: 4.2,
      cetpLoadChangePercent: 5.8,
      downstreamRiskScore: 32,
    },
    
    position3D: [11, 0, -6],
    buildingType: 'paper',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    pipeColor: '#0369a1',
    pipeRoute: [
      [11, 0.4, -6],
      [7, 0.3, -2],
      [2, 0.3, 1],
      [0, 0.3, 3],
    ],
  },
  {
    id: 'ind-05',
    name: 'Palar Chrome & Leather Tannery',
    code: 'TN-PCB-TAN-7754',
    type: 'Tannery / Chrome Finishing',
    category: 'Red',
    status: 'Monitoring Active',
    basin: 'Bhavani River Basin, Tannery Cluster Zone',
    coordinates: { lat: 11.3210, lng: 77.6980 },
    
    productionCapacityPercent: 79,
    permittedCapacityTpd: '15.0 Tonnes/day Wet Blue Hides',
    electricityKwhDay: 11200,
    electricityBaselineKwhDay: 9600,
    chemicals: {
      limeKgDay: 390,
      alumKgDay: 140,
      polyelectrolyteKgDay: 28,
      sodiumHypochloriteKgDay: 75,
    },
    sludgeTonnesDay: 1.5,
    sludgeBaselineTonnesDay: 1.2,
    wastewaterReportedKlDay: 260,
    computedMassBalanceKlDay: 330,
    cetpLoadContributionPercent: 12,
    
    ocems: {
      ph: 8.1,
      bod: 28.6,
      cod: 185,
      tss: 62,
      flowRateM3Hr: 10.8,
      dataAvailabilityPercent: 91.5,
      temperatureC: 29.8,
      dissolvedOxygenMgL: 2.6,
    },
    ocemsLimits: {
      phMin: 6.5,
      phMax: 8.5,
      bodMax: 30.0,
      codMax: 250.0,
      tssMax: 100.0,
    },
    
    forensicSignals: {
      flatline: 'Normal',
      thresholdHugging: 'Attention',
      digitPreference: 'Attention',
      strategicDowntime: 'Normal',
    },
    inspectionPriority: 'Inspection Recommended',
    inspectionReason: 'Triangulation between hide chemical tanning salt consumption and reported equalization tank volumes suggests potential unmetered batch discharge.',
    
    systemImpact: {
      productionChangePercent: 9.5,
      estimatedWastewaterChangePercent: 7.8,
      cetpLoadChangePercent: 4.5,
      downstreamRiskScore: 61,
    },
    
    position3D: [-8, 0, -14],
    buildingType: 'tannery',
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    pipeColor: '#8b5cf6',
    pipeRoute: [
      [-8, 0.4, -14],
      [-6, 0.3, -9],
      [-3, 0.3, -3],
      [0, 0.3, 3],
    ],
  },
];

export const MOCK_CETP: CetpData = {
  id: 'cetp-01',
  name: 'Perundurai Common Effluent Treatment Plant (CETP)',
  code: 'TN-CETP-ERD-01',
  location: 'SIPCOT Industrial Growth Centre, Perundurai',
  designCapacityKlDay: 50000,
  currentHydraulicLoadKlDay: 39200,
  inletCodMgL: 1420,
  treatedOutletCodMgL: 112,
  inletBodMgL: 480,
  treatedOutletBodMgL: 16.4,
  removalEfficiencyPercent: 92.1,
  connectedUnitsCount: 38,
  status: 'Operational - Optimal Membrane Bio-Reactor (MBR)',
  treatedDischargeKlDay: 38400,
  position3D: CETP_LOCATION,
  dischargePipeRoute: [
    [0, 0.3, 3],
    [0, 0.25, 6],
    [0, 0.15, 9.2], // Direct to River Drainage Outfall
  ],
};

export const MOCK_DOWNSTREAM_STATION: DownstreamStationData = {
  id: 'stn-01',
  name: 'Bhavani River Telemetry Station #04',
  code: 'TN-WQ-RIV-BHV-04',
  riverName: 'Bhavani River Basin',
  distanceFromDischargeKm: 2.4,
  sensorStatus: 'Active - Transmitting',
  dataAvailabilityPercent: 99.8,
  parameters: {
    ph: 7.35,
    bod: 3.8,
    cod: 18.2,
    do: 6.4,
    tds: 410,
    turbidityNtu: 4.8,
    temperatureC: 26.2,
    flowVelocityMs: 1.15,
  },
  limits: {
    phMin: 6.5,
    phMax: 8.5,
    bodMax: 5.0,
    codMax: 50.0,
    doMin: 5.0,
    tdsMax: 1500,
  },
  waterQualityIndex: 84.5,
  waterQualityGrade: 'Class B (Outdoor Bathing)',
  status: 'Consistent',
  position3D: DOWNSTREAM_STATION_LOCATION,
};

export const MOCK_BOREWELL: BorewellData = {
  id: 'bw-01',
  name: 'SIPCOT Industrial Aquifer Piezometer #BW-09',
  code: 'TN-GW-PIEZ-09',
  depthMeters: 145,
  staticWaterLevelMeters: 28.4,
  aquiferLayer: 'Deep Fractured Charnockite Hard-Rock Aquifer',
  electricalConductivityUscm: 1240,
  tdsMgL: 780,
  heavyMetalSignal: 'Below Detection Limit',
  sensorStatus: 'Online Multiparameter Piezometer',
  status: 'Consistent',
  riskNote: 'Continuous conductivity telemetry confirms zero industrial deep-percolation intrusion across the impervious clay aquitard cap.',
  position3D: BOREWELL_LOCATION,
};
