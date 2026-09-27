// Tamil Nadu District Coverage & Factory Telemetry Submission Dataset

export const TN_DISTRICT_COVERAGE = [
  {
    id: 'dist-erode',
    name: 'Erode District',
    status: 'covered',
    activeUnits: 142,
    totalUnits: 142,
    syncPercentage: 100,
    riverBasin: 'Cauvery & Bhavani Basin',
    multiInputCompliant: 108,
    missingDataUnits: 34,
    keyHubs: ['Perundurai SIPCOT', 'Bhavani Textile Cluster']
  },
  {
    id: 'dist-tiruppur',
    name: 'Tiruppur District',
    status: 'covered',
    activeUnits: 210,
    totalUnits: 210,
    syncPercentage: 94,
    riverBasin: 'Noyyal River Estuary',
    multiInputCompliant: 154,
    missingDataUnits: 56,
    keyHubs: ['Tiruppur CETP Hubs', 'Orathupalayam Grid']
  },
  {
    id: 'dist-chennai',
    name: 'Chennai & Thiruvallur',
    status: 'covered',
    activeUnits: 165,
    totalUnits: 165,
    syncPercentage: 88,
    riverBasin: 'Kosasthalaiyar River',
    multiInputCompliant: 122,
    missingDataUnits: 43,
    keyHubs: ['Manali Petrochemical Zone', 'Ennore Basin']
  },
  {
    id: 'dist-cuddalore',
    name: 'Cuddalore District',
    status: 'covered',
    activeUnits: 88,
    totalUnits: 88,
    syncPercentage: 92,
    riverBasin: 'Uppanar River Basin',
    multiInputCompliant: 68,
    missingDataUnits: 20,
    keyHubs: ['SIPCOT Cuddalore Phase I & II']
  },
  {
    id: 'dist-ranipet',
    name: 'Ranipet & Vellore',
    status: 'covered',
    activeUnits: 120,
    totalUnits: 120,
    syncPercentage: 78,
    riverBasin: 'Palar River Aquifer',
    multiInputCompliant: 82,
    missingDataUnits: 38,
    keyHubs: ['Ranipet Tannery CETP Complex']
  },
  {
    id: 'dist-karur',
    name: 'Karur District',
    status: 'covered',
    activeUnits: 80,
    totalUnits: 80,
    syncPercentage: 85,
    riverBasin: 'Amaravathi River',
    multiInputCompliant: 58,
    missingDataUnits: 22,
    keyHubs: ['Karur Textile & Dyeing Hub']
  },
  // Pending Expansion / Non-Covered Districts
  {
    id: 'dist-salem',
    name: 'Salem District',
    status: 'pending',
    activeUnits: 0,
    totalUnits: 45,
    syncPercentage: 0,
    riverBasin: 'Sarabanga River Basin',
    multiInputCompliant: 0,
    missingDataUnits: 45,
    keyHubs: ['Steel & Chemical Industrial Zone'],
    roadmapTarget: 'Phase II (Q1 2027 Target)'
  },
  {
    id: 'dist-tuticorin',
    name: 'Tuticorin (Thoothukudi)',
    status: 'pending',
    activeUnits: 0,
    totalUnits: 52,
    syncPercentage: 0,
    riverBasin: 'Gulf of Mannar Coastal Grid',
    multiInputCompliant: 0,
    missingDataUnits: 52,
    keyHubs: ['SIPCOT Complex & Marine Outfalls'],
    roadmapTarget: 'Phase II (Q2 2027 Target)'
  },
  {
    id: 'dist-dindigul',
    name: 'Dindigul District',
    status: 'pending',
    activeUnits: 0,
    totalUnits: 30,
    syncPercentage: 0,
    riverBasin: 'Kudaganaru River',
    multiInputCompliant: 0,
    missingDataUnits: 30,
    keyHubs: ['Dindigul Leather Cluster'],
    roadmapTarget: 'Phase II (Q2 2027 Target)'
  }
];

export const FACTORY_SUBMISSION_MATRIX = [
  {
    id: 'plant-tn-001',
    name: 'Manali Petrochemical Unit-1',
    district: 'Chennai & Thiruvallur',
    status: 'compliant', // all 7 submitted
    submittedStreams: 7,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: true,
      waterMeter: true,
      sludgeManifest: true,
      gstReturns: true,
      riverStation: true,
      analyzerDecl: true
    },
    missingReason: null
  },
  {
    id: 'plant-tn-002',
    name: 'SIPCOT Cuddalore Chemical Complex',
    district: 'Cuddalore District',
    status: 'compliant',
    submittedStreams: 7,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: true,
      waterMeter: true,
      sludgeManifest: true,
      gstReturns: true,
      riverStation: true,
      analyzerDecl: true
    },
    missingReason: null
  },
  {
    id: 'plant-tn-003',
    name: 'Ranipet Tannery Effluent Cluster',
    district: 'Ranipet & Vellore',
    status: 'partial',
    submittedStreams: 5,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: false, // Unmetered power feeder
      waterMeter: true,
      sludgeManifest: true,
      gstReturns: true,
      riverStation: false,
      analyzerDecl: true
    },
    missingReason: 'Missing TANGEDCO ETP Feeder Meter & Downstream CPCB station'
  },
  {
    id: 'plant-tn-004',
    name: 'Bhavani River Dyers Union #4',
    district: 'Erode District',
    status: 'partial',
    submittedStreams: 4,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: true,
      waterMeter: false, // Unmetered borewell
      sludgeManifest: true,
      gstReturns: false,
      riverStation: true,
      analyzerDecl: false
    },
    missingReason: 'Unmetered borewell intake & missing GST returns filing'
  },
  {
    id: 'plant-tn-005',
    name: 'Tiruppur Knit Finishers CETP #2',
    district: 'Tiruppur District',
    status: 'compliant',
    submittedStreams: 7,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: true,
      waterMeter: true,
      sludgeManifest: true,
      gstReturns: true,
      riverStation: true,
      analyzerDecl: true
    },
    missingReason: null
  },
  {
    id: 'plant-tn-006',
    name: 'Kallapalayam Textile Processing',
    district: 'Tiruppur District',
    status: 'unmonitored',
    submittedStreams: 2,
    totalStreams: 7,
    streams: {
      cto: true,
      tangedcoPower: false,
      waterMeter: false,
      sludgeManifest: true,
      gstReturns: false,
      riverStation: false,
      analyzerDecl: false
    },
    missingReason: 'Runs on internal diesel generator; placed in Randomized Audit Pool'
  }
];
