// Environmental Compliance Reports & Legal Dossiers Dataset

export const COMPLIANCE_REPORTS_DATA = [
  {
    id: "REP-2026-0842",
    title: "Form VIII Show-Cause Notice & Satellite Thermal Briefing",
    facilityId: "TN-ER-0412",
    facilityName: "Sri Amman Processing Mills",
    district: "Erode District",
    category: "Statutory Notice",
    author: "R. Karthikeyan (Erode District Officer)",
    date: "2026-09-24",
    status: "Issued",
    severity: "Critical",
    summary:
      "Statutory Notice under Section 33A of Water Act 1974 issued due to 1,824 consecutive static pH readings (7.20) amidst 40% production surge. Satellite thermal imagery confirmed unannounced effluent discharge.",
    legalStatute: "Water (Prevention & Control of Pollution) Act, 1974 - Sec 33A",
    evidenceSummary: [
      "Reported pH constant at 7.20 for 1,824 consecutive readings",
      "Sentinel-2 thermal IR pass #8429 detected +4.8°C outfall plume in Kosasthalaiyar River",
      "ETP power draw fell 12% while reported COD removal reportedly improved"
    ],
    recommendedActions: [
      "Seal Outfall Pipe #3 within 24 hours",
      "Conduct physical grab sampling at primary aeration tank",
      "Audit last 3 analyzer calibration logs with serial numbers"
    ],
    downloadUrl: "#"
  },
  {
    id: "REP-2026-0791",
    title: "SIPCOT Cuddalore Illegal Bypass Channel Audit",
    facilityId: "TN-CU-0088",
    facilityName: "SIPCOT Cuddalore Chemical Complex",
    district: "Cuddalore District",
    category: "Audit Report",
    author: "M. Selvam (Senior Environmental Engineer)",
    date: "2026-09-22",
    status: "Pending Action",
    severity: "Critical",
    summary:
      "Landsat-9 satellite TIRS-2 sensor pass confirmed illegal bypass channel discharging untreated acidic dye effluent into Uppanar River. COD cloud spanning 850m downstream.",
    legalStatute: "Water Act 1974 Sec 25/26 & CPCB Zero Liquid Discharge (ZLD) Rules",
    evidenceSummary: [
      "NDWI turbidity index 0.89 vs baseline 0.12",
      "Bypass channel operates without valid Consent to Operate (CTO)",
      "₹50 Lakh bank guarantee forfeiture recommended"
    ],
    recommendedActions: [
      "Issue immediate electricity disconnection notice to TANGEDCO",
      "Deploy mobile water sampling unit to Uppanar River coordinate 11.6892° N",
      "Order physical sealing of unauthorized concrete culvert"
    ],
    downloadUrl: "#"
  },
  {
    id: "REP-2026-0715",
    title: "Ranipet Tannery Subsurface Seepage & Sludge Report",
    facilityId: "TN-RN-0219",
    facilityName: "Ranipet Tannery Effluent Cluster",
    district: "Ranipet & Vellore",
    category: "Satellite Briefing",
    author: "Dr. K. Arumugam (Chief Scientist, TNPCB)",
    date: "2026-09-20",
    status: "Under Review",
    severity: "High",
    summary:
      "Sentinel-2 soil moisture analysis indicated subsurface chromium slurry seepage near secondary sludge drying lagoons migrating toward Palar River alluvium aquifer.",
    legalStatute: "Environment (Protection) Act, 1986 - Hazardous Waste Rules 2016",
    evidenceSummary: [
      "Soil moisture spectral reflection anomaly detected over 920 m²",
      "Unlined sludge storage pond violates HDPE containment standards",
      "Elevated hexavalent chromium Cr(VI) risk in groundwater"
    ],
    recommendedActions: [
      "Deploy groundwater piezometer test kits along Palar River embankment",
      "Order immediate transfer of dried sludge to authorized TSDF facility",
      "Mandate construction of 1.5mm HDPE double-geomembrane liner"
    ],
    downloadUrl: "#"
  },
  {
    id: "REP-2026-0620",
    title: "Tiruppur CETP Member Mass Balance Cross-Check",
    facilityId: "TN-TP-0055",
    facilityName: "Kongu Knit Fabrics & CETP #5 Members",
    district: "Tiruppur District",
    category: "Annual Compliance",
    author: "S. Priya (Tiruppur Regional Officer)",
    date: "2026-09-15",
    status: "Resolved",
    severity: "Medium",
    summary:
      "Cross-verification of 47 member plant production filings against CETP #5 electricity consumption revealed a 18% discrepancy in washwater volume.",
    legalStatute: "CPCB Common Effluent Treatment Plant (CETP) Standards",
    evidenceSummary: [
      "Combined member reported water intake: 42,000 m³/day",
      "CETP main electromagnetic flowmeter recorded 34,400 m³/day",
      "3 member units operated unmetered night shifts"
    ],
    recommendedActions: [
      "Calibrate member electromagnetic flowmeters with tamper-proof seals",
      "Impose penalty surcharge on 3 non-compliant member units"
    ],
    downloadUrl: "#"
  }
];
