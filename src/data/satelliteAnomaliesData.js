// Real Satellite Telemetry & Officer Explanation Data Model
export const SATELLITE_ANOMALIES_DATA = {
  'plant-tn-001': {
    plantId: 'plant-tn-001',
    plantName: 'Manali Petrochemical Unit-1',
    town: 'Chennai',
    coordinates: { lat: 13.1683, lng: 80.2592 },
    satelliteSource: 'Sentinel-2B MSI Pass #8429',
    captureDate: '2026-09-24 02:14 UTC',
    resolution: '10m Multi-Spectral',
    bandSeverity: 'red',
    overallAnomalyScore: 88,

    // Plain English Summary for Compliance Officers
    officerSummary:
      'High-resolution satellite thermal-infrared imagery detected an unannounced surface effluent plume extending 520 meters northeast into the Kosasthalaiyar River estuary from Outfall Pipe #3. Multispectral NDWI analysis indicates high concentrations of dissolved organic solvents and heavy particulate suspended solids.',

    // Quantitative Spectral Indicators
    spectralTelemetry: {
      thermalAnomalyDelta: '+4.8°C',
      outfallTemp: '37.6°C',
      ambientRiverTemp: '32.8°C',
      ndwiTurbidityIndex: 0.74, // Baseline 0.12
      plumeSpreadAreaSqM: 14200,
      bufferZoneEncroachmentSqM: 1850,
      chemicalFingerprintMatch: 'Aromatic Hydrocarbons / Petrochemical Residuals'
    },

    // Statutory & Legal Framework (Indian Regulations)
    legalFramework: {
      statute: 'Water (Prevention & Control of Pollution) Act, 1974',
      section: 'Section 33A (Power to give directions for closure & regulation)',
      cpcbRule: 'CPCB Environment Protection Rules Schedule VI (Thermal Discharges ≤ 5°C delta)',
      severityLevel: 'Critical Violation',
      legalSummary:
        'Discharge exceeds thermal mixing zone thresholds and lacks required secondary CETP aeration. Immediate notice under Sec 33A mandated.'
    },

    // Actionable Officer Checklist
    actionChecklist: [
      { id: 'act-1', task: 'Dispatch Tamil Nadu PCB Mobile Sampling Unit to GPS 13.1683° N, 80.2592° E', completed: true },
      { id: 'act-2', task: 'Cross-examine CETP real-time flowmeter logs against satellite pass time (02:14 UTC)', completed: false },
      { id: 'act-3', task: 'Issue Form VIII Show-Cause Notice to Managing Director within 24 hours', completed: false },
      { id: 'act-4', task: 'Inspect 1,850 sq.m illegal settling pond constructed inside the 500m CRZ buffer zone', completed: false }
    ],

    // Before/After Image Assets
    compareImages: {
      baselineDate: 'Jan 15, 2026 (Baseline Operational State)',
      currentDate: 'Sept 24, 2026 (Sentinel-2 Spectral Pass)',
      baselineUrl: '/images/satellite_baseline_manali.jpg',
      currentUrl: '/images/satellite_spectral_manali.jpg',
      overlayType: 'NDWI & Thermal IR Red Target Anomaly'
    }
  },

  'plant-tn-002': {
    plantId: 'plant-tn-002',
    plantName: 'SIPCOT Cuddalore Chemical Complex',
    town: 'Cuddalore',
    coordinates: { lat: 11.6892, lng: 79.7611 },
    satelliteSource: 'Landsat-9 Thermal Infrared Sensor-2',
    captureDate: '2026-09-22 10:45 UTC',
    resolution: '15m Multispectral / Thermal',
    bandSeverity: 'red',
    overallAnomalyScore: 92,

    officerSummary:
      'Orbital imagery confirms illegal bypass channel discharging untreated acidic dye effluent into the Uppanar River basin during heavy rainfall. Spectral signature confirms High Chemical Oxygen Demand (COD) cloud spanning 850m downstream.',

    spectralTelemetry: {
      thermalAnomalyDelta: '+6.2°C',
      outfallTemp: '39.1°C',
      ambientRiverTemp: '32.9°C',
      ndwiTurbidityIndex: 0.89,
      plumeSpreadAreaSqM: 28400,
      bufferZoneEncroachmentSqM: 3200,
      chemicalFingerprintMatch: 'Acidic Azo Dyes & Sulfide Solids'
    },

    legalFramework: {
      statute: 'Water (Prevention & Control of Pollution) Act, 1974',
      section: 'Section 25 / 26 (Restrictions on new outlets and discharges)',
      cpcbRule: 'CPCB Zero Liquid Discharge (ZLD) Compliance Standards for Textile & Chemical Hubs',
      severityLevel: 'Severe Repeat Offense',
      legalSummary:
        'Bypass channel operates without valid Consent to Operate (CTO). Statutory power under Sec 33A for electricity disconnections applicable.'
    },

    actionChecklist: [
      { id: 'act-1', task: 'Seal bypass pipe outlet at Uppanar River coordinate 11.6892° N', completed: true },
      { id: 'act-2', task: 'Collect physical effluent grab samples for heavy metal mass spectrometry testing', completed: true },
      { id: 'act-3', task: 'Initiate bank guarantee forfeiture procedure (₹50 Lakh penalty recommended)', completed: false }
    ],

    compareImages: {
      baselineDate: 'Feb 10, 2026 (Baseline ZLD Compliance)',
      currentDate: 'Sept 22, 2026 (Landsat-9 Bypass Detection)',
      baselineUrl: '/images/satellite_baseline_cuddalore.jpg',
      currentUrl: '/images/satellite_spectral_cuddalore.jpg',
      overlayType: 'Acidic Plume Red Circle Highlight'
    }
  },

  'plant-tn-003': {
    plantId: 'plant-tn-003',
    plantName: 'Ranipet Tannery Effluent Cluster',
    town: 'Ranipet',
    coordinates: { lat: 12.9284, lng: 79.3331 },
    satelliteSource: 'Sentinel-2A MSI Pass #4102',
    captureDate: '2026-09-20 06:30 UTC',
    resolution: '10m Sentinel Imagery',
    bandSeverity: 'amber',
    overallAnomalyScore: 74,

    officerSummary:
      'Satellite soil moisture and spectral reflection data indicate subsurface chromium slurry seepage near secondary sludge drying lagoons. Suspended solid migration observed toward Palar River alluvium aquifer.',

    spectralTelemetry: {
      thermalAnomalyDelta: '+2.1°C',
      outfallTemp: '34.2°C',
      ambientRiverTemp: '32.1°C',
      ndwiTurbidityIndex: 0.48,
      plumeSpreadAreaSqM: 8900,
      bufferZoneEncroachmentSqM: 920,
      chemicalFingerprintMatch: 'Hexavalent Chromium Cr(VI) & Saline Effluent'
    },

    legalFramework: {
      statute: 'Environment (Protection) Act, 1986',
      section: 'Hazardous and Other Wastes Management Rules, 2016',
      cpcbRule: 'CPCB Chromium Remediation & Sludge Storage Directives',
      severityLevel: 'Moderate Seepage Threat',
      legalSummary:
        'Unlined sludge storage pond violates containment requirements. Directive issued to construct HDPA impermeable lining.'
    },

    actionChecklist: [
      { id: 'act-1', task: 'Deploy groundwater piezometer test kits around Palar River embankment', completed: false },
      { id: 'act-2', task: 'Order immediate transfer of dried chromium sludge to authorized TSDF facility', completed: true }
    ],

    compareImages: {
      baselineDate: 'Mar 01, 2026 (Dry Season Storage)',
      currentDate: 'Sept 20, 2026 (Subsurface Seepage Detection)',
      baselineUrl: '/images/satellite_baseline_ranipet.jpg',
      currentUrl: '/images/satellite_spectral_ranipet.jpg',
      overlayType: 'Chromium Seepage Red Target Ring'
    }
  }
};

export function getSatelliteAnomalyForPlant(plantId) {
  if (SATELLITE_ANOMALIES_DATA[plantId]) {
    return SATELLITE_ANOMALIES_DATA[plantId];
  }

  // Fallback default satellite anomaly generator for any plant ID
  return {
    plantId: plantId,
    plantName: 'Industrial Facility Site',
    town: 'Tamil Nadu Region',
    coordinates: { lat: 11.0168, lng: 76.9558 },
    satelliteSource: 'Sentinel-2 Optical Satellite Imagery',
    captureDate: '2026-09-25 04:12 UTC',
    resolution: '10m High-Resolution',
    bandSeverity: 'amber',
    overallAnomalyScore: 68,
    officerSummary:
      'High-resolution satellite optical pass shows active thermal outfall mixing with local water body. Minor elevation in surface turbidity detected in immediate outfall vicinity.',
    spectralTelemetry: {
      thermalAnomalyDelta: '+2.4°C',
      outfallTemp: '34.5°C',
      ambientRiverTemp: '32.1°C',
      ndwiTurbidityIndex: 0.42,
      plumeSpreadAreaSqM: 5400,
      bufferZoneEncroachmentSqM: 450,
      chemicalFingerprintMatch: 'Suspended Solids & Process Washwater'
    },
    legalFramework: {
      statute: 'Water (Prevention & Control of Pollution) Act, 1974',
      section: 'Section 33A (Environmental Compliance Directive)',
      cpcbRule: 'CPCB General Discharge Standards',
      severityLevel: 'Standard Surveillance Watch',
      legalSummary: 'Effluent parameters within cautionary threshold. Quarterly physical inspection recommended.'
    },
    actionChecklist: [
      { id: 'act-1', task: 'Schedule routine officer site verification visit within 7 days', completed: false },
      { id: 'act-2', task: 'Verify online continuous monitoring (OCEMS) sensor telemetry calibration', completed: true }
    ],
    compareImages: {
      baselineDate: 'Baseline Optical Satellite Pass',
      currentDate: 'Current Sentinel Spectral Capture',
      baselineUrl: '/images/satellite_baseline_manali.jpg',
      currentUrl: '/images/satellite_spectral_manali.jpg',
      overlayType: 'Optical & Spectral Composite View'
    }
  };
}
