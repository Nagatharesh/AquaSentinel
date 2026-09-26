export const PLANTS_DATA = [
  {
    id: "TN-ER-0412",
    name: "Sri Amman Processing Mills",
    town: "Erode",
    sector: "Textile dyeing",
    cluster: "Erode CETP-2",
    vendor: "Aquatrace Systems",
    score: 94,
    band: "red",
    harm: "High",
    motive: "₹41 L/yr",
    uptime: 71,
    param: "pH, COD",
    reason: "pH has not moved from 7.2 for 19 days, through a 40% production swing the plant reported itself.",
    why: "The effluent tank cannot hold a reading that still through a load change that large. Either the analyser is not reading the effluent, or the values are not coming from the analyser.",
    evid: [
      "Reported pH constant at 7.20 for 1,824 consecutive readings",
      "Production up 40% over the same window (own filing)",
      "ETP power draw fell 12% while COD removal reportedly improved"
    ],
    check: [
      "Open the analyser cabinet and photograph the sample line",
      "Take a grab sample at the final outfall, not the sampling tap",
      "Ask for the last 3 calibration certificates with serial numbers",
      "Check whether the sample line has been rerouted"
    ],
    tier: "Certified",
    tierNote: "Rests on 4 assumptions, all verifiable on site"
  },
  {
    id: "TN-TP-0088",
    name: "Kongu Knit Fabrics",
    town: "Tiruppur",
    sector: "Textile dyeing",
    cluster: "Tiruppur CETP-5",
    vendor: "Aquatrace Systems",
    score: 91,
    band: "red",
    harm: "High",
    motive: "₹28 L/yr",
    uptime: 64,
    param: "COD, TSS",
    reason: "Monitoring goes offline on the plant's busiest days, and stops going offline the moment it reaches 85% uptime each month.",
    why: "An instrument fault does not follow a production calendar, and it does not stop on the day a reporting target is met.",
    evid: [
      "6.2× more likely to be offline on top-decile production days",
      "Outages end within 48 hrs of crossing 85% every month for 11 months",
      "No maintenance record filed for 9 of 14 outages"
    ],
    check: [
      "Ask for the maintenance log for each outage period",
      "Verify the datalogger's own event log against the filed reasons",
      "Sample during a production peak, unannounced"
    ],
    tier: "Certified",
    tierNote: "Rests on 3 assumptions"
  },
  {
    id: "TN-KR-0219",
    name: "Cauvery Tanning Works",
    town: "Karur",
    sector: "Leather",
    cluster: "—",
    vendor: "Metroline Envirotech",
    score: 88,
    band: "red",
    harm: "Very high",
    motive: "₹63 L/yr",
    uptime: 93,
    param: "Chromium, COD",
    reason: "Reported treatment is not possible at the electricity the effluent plant actually used.",
    why: "Removing the reported organic load needs a minimum amount of oxygen, and that needs a minimum amount of power. The bill says 95 units a day. The reported treatment needs at least 486.",
    evid: [
      "Reported COD removal: 972 kg/day",
      "Minimum energy for that removal: 486 kWh/day",
      "ETP feeder actually drew 95 kWh/day (TANGEDCO)"
    ],
    check: [
      "Read the ETP feeder meter on site and photograph it",
      "Confirm the aeration blowers are running and rated",
      "Grab sample at inlet and outlet the same hour"
    ],
    tier: "Certified",
    tierNote: "Rests on 6 assumptions, incl. blower rating"
  },
  {
    id: "TN-ER-0377",
    name: "Bhavani Bleaching Unit",
    town: "Bhavani",
    sector: "Textile bleaching",
    cluster: "Erode CETP-2",
    vendor: "Aquatrace Systems",
    score: 79,
    band: "amber",
    harm: "Medium",
    motive: "₹9 L/yr",
    uptime: 88,
    param: "COD",
    reason: "Readings cluster just under the legal limit far more often than chance allows.",
    why: "Real effluent crosses its limit sometimes. This plant approaches the limit constantly and never crosses it — 412 readings in the 5% band below, 3 above.",
    evid: [
      "412 readings in the 5% band below the limit; 3 above it",
      "Variation collapses near the limit but is normal far from it",
      "Pattern begins the week the current analyser was installed"
    ],
    check: [
      "Download the analyser's configuration and check for an output cap",
      "Compare the analyser's internal log against what was transmitted"
    ],
    tier: "Certified",
    tierNote: "Rests on 3 assumptions"
  },
  {
    id: "TN-TP-0143",
    name: "Noyyal Garment Dyers",
    town: "Tiruppur",
    sector: "Textile dyeing",
    cluster: "Tiruppur CETP-5",
    vendor: "Hydroscan India",
    score: 72,
    band: "amber",
    harm: "High",
    motive: "₹17 L/yr",
    uptime: 90,
    param: "COD, pH",
    reason: "Four days of readings in August are an exact copy of four days in July.",
    why: "Instruments do not repeat themselves. These 384 values match an earlier stretch exactly, to the last decimal.",
    evid: [
      "384 values byte-identical to 12–15 July",
      "Gap in transmission immediately before the copied stretch"
    ],
    check: [
      "Seize the datalogger's raw file before it is overwritten",
      "Ask the vendor who has write access to the logger"
    ],
    tier: "Intent",
    tierNote: "Rests on 2 assumptions — strongest class"
  },
  {
    id: "TN-CB-0501",
    name: "Sulur Metal Finishers",
    town: "Sulur",
    sector: "Electroplating",
    cluster: "—",
    vendor: "Metroline Envirotech",
    score: 68,
    band: "amber",
    harm: "Very high",
    motive: "₹6 L/yr",
    uptime: 96,
    param: "Chromium",
    reason: "Small unit, highly toxic discharge, into a shallow aquifer used for drinking. Ranked up despite low volume.",
    why: "Volume is low so the usual ranking would bury it. Harm per litre is among the highest in the district.",
    evid: [
      "Reported chromium never exceeds 0.08 mg/L in 14 months",
      "Two drinking-water wells within 600 m downstream"
    ],
    check: [
      "Grab sample the outfall and the nearest well the same day"
    ],
    tier: "Statistical",
    tierNote: "Rests on 2 assumptions"
  },
  {
    id: "TN-ER-0290",
    name: "Perundurai Paper Board",
    town: "Perundurai",
    sector: "Paper",
    cluster: "—",
    vendor: "Hydroscan India",
    score: 41,
    band: "clear",
    harm: "Medium",
    motive: "₹2 L/yr",
    uptime: 97,
    param: "—",
    reason: "Nothing found. Data behaves the way a working plant's data behaves.",
    why: "Checks had enough power to rule out under-reporting above 60 kg/month.",
    evid: [
      "All 14 checks passed",
      "Reconciles against energy, water and production within tolerance"
    ],
    check: [],
    tier: "Cleared",
    tierNote: "Negative certificate issued 14 Sep"
  },
  {
    id: "TN-SL-0166",
    name: "Salem Steel Pickling",
    town: "Salem",
    sector: "Metal",
    cluster: "—",
    vendor: "Aquatrace Systems",
    score: 38,
    band: "clear",
    harm: "Medium",
    motive: "₹3 L/yr",
    uptime: 94,
    param: "—",
    reason: "Nothing found.",
    why: "Checks passed. Coverage is partial — no separate meter on the effluent plant.",
    evid: ["12 of 14 checks passed; 2 could not run"],
    check: [],
    tier: "Cleared",
    tierNote: "Partial coverage"
  }
];

export const CLUSTERS_DATA = [
  {
    name: "Tiruppur CETP-5",
    riverBasin: "Noyyal River Basin",
    members: 64,
    gap: "+18%",
    status: "red",
    memberSum: "41,200 m³/day",
    cetpActual: "48,600 m³/day",
    unreported: "7,400 m³/day",
    line: "Members report 18% less load than the common plant actually receives. Someone in this cluster is under-reporting.",
    note: "42 of 64 members have distinct operating patterns on shutdown days. De-convolution narrowed suspicion to 7 specific units.",
    narrowed: 7
  },
  {
    name: "Erode CETP-2",
    riverBasin: "Kalingarayan Canal",
    members: 38,
    gap: "+6%",
    status: "amber",
    memberSum: "24,500 m³/day",
    cetpActual: "25,970 m³/day",
    unreported: "1,470 m³/day",
    line: "A 6% gap exists, but it sits within standard flow meter calibration tolerance (±5%). Watch, do not issue notices.",
    note: "Meter calibration at the common plant inlet is being re-certified by TNPCB engineers.",
    narrowed: 0
  },
  {
    name: "Karur CETP-1",
    riverBasin: "Amaravathi River Basin",
    members: 29,
    gap: "+1%",
    status: "clear",
    memberSum: "18,900 m³/day",
    cetpActual: "19,080 m³/day",
    unreported: "180 m³/day",
    line: "Member reports reconcile perfectly against the common plant's primary electromagnetic inlet meter.",
    note: "Verified compliant cluster. All member filings sum up to CETP receiving tank totals within 1% margin.",
    narrowed: 0
  },
  {
    name: "Pallipalayam CETP-3",
    riverBasin: "Cauvery River Basin",
    members: 47,
    gap: "—",
    status: "grey",
    memberSum: "32,100 m³/day",
    cetpActual: "Offline",
    unreported: "Unknown",
    line: "Cannot be checked. The main CETP electromagnetic inlet flow meter has been offline since March.",
    note: "Hardware repair order issued. CETP inlet flow telemetry must be restored before individual members can be audited.",
    narrowed: 0
  }
];

export const VENDORS_DATA = [
  {
    name: "Aquatrace Systems",
    plants: 38,
    flagged: 11,
    exceed: "0.4%",
    peer: "5.1%",
    status: "red",
    line: "Across all 38 plants this agency services, readings cross the legal limit one-twelfth as often as at comparable plants served by other agencies.",
    note: "Same rounding habit appears in 31 of 38 client plants. Independent instruments do not round alike."
  },
  {
    name: "Metroline Envirotech",
    plants: 22,
    flagged: 3,
    exceed: "4.2%",
    peer: "5.1%",
    status: "amber",
    line: "Two clients share an unusual reporting pattern. Not yet a portfolio-wide finding.",
    note: "Review at next empanelment."
  },
  {
    name: "Hydroscan India",
    plants: 41,
    flagged: 2,
    exceed: "5.6%",
    peer: "5.1%",
    status: "clear",
    line: "Client exceedance rate is in line with comparable plants elsewhere.",
    note: "No action."
  }
];

export const COVERAGE_DATA = [
  { rec: "Consent to operate", have: 892, tot: 892, who: "Board's own register" },
  { rec: "Effluent plant electricity", have: 318, tot: 892, who: "TANGEDCO" },
  { rec: "Water intake metering", have: 204, tot: 892, who: "Water board / borewell permits" },
  { rec: "Sludge disposal manifests", have: 671, tot: 892, who: "Hazardous waste authority" },
  { rec: "Production filings", have: 544, tot: 892, who: "GST returns" },
  { rec: "Downstream river station", have: 239, tot: 892, who: "CPCB station network" },
  { rec: "Analyser make and model", have: 405, tot: 892, who: "Plant declaration" }
];
