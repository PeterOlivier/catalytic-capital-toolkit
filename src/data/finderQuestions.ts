import { Instrument } from "./types";

// ============================================
// ANSWER TYPES
// ============================================

export type OrgType = "nonprofit" | "c-corp" | "llc" | "cooperative" | "government" | "not-formed";
export type OrgStage = "idea" | "rnd" | "pilot" | "growth" | "scale";
export type RevenueLevel = "none" | "some" | "consistent" | "large";
export type CapitalNeed = "under-100k" | "100k-1m" | "1m-10m" | "10m-100m" | "100m-plus";
export type SpeedNeed = "asap" | "few-months" | "6-plus-months" | "no-rush";
export type ComplexityTolerance = "simple" | "some" | "complex";
export type NetworkLevel = "deep" | "some" | "none";
export type Priority = "ownership" | "lowest-cost" | "largest-amount" | "speed" | "flexibility" | "proven";

export interface FinderAnswers {
  orgType: OrgType | null;
  stage: OrgStage | null;
  revenue: RevenueLevel | null;
  capitalNeed: CapitalNeed | null;
  speedNeed: SpeedNeed | null;
  complexityTolerance: ComplexityTolerance | null;
  network: NetworkLevel | null;
  priorities: Priority[];
}

export interface FinderQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: { value: string; label: string; description: string }[];
  multiSelect?: boolean;
}

export interface ScoredInstrument {
  instrument: Instrument;
  score: number;
  reasons: string[];
  tier: "strong" | "good" | "explore";
}

export const INITIAL_ANSWERS: FinderAnswers = {
  orgType: null,
  stage: null,
  revenue: null,
  capitalNeed: null,
  speedNeed: null,
  complexityTolerance: null,
  network: null,
  priorities: [],
};

// ============================================
// QUESTION DEFINITIONS
// ============================================

export const questions: FinderQuestion[] = [
  {
    id: "orgType",
    title: "What kind of organization are you?",
    subtitle: "This helps us filter out options you're not eligible for.",
    options: [
      { value: "llc", label: "LLC / Other for-profit", description: "LLC, S-Corp, B-Corp, sole prop, or partnership" },
      { value: "c-corp", label: "C-Corp", description: "Standard corporation structure" },
      { value: "nonprofit", label: "Nonprofit", description: "501(c)(3) or equivalent" },
      { value: "cooperative", label: "Cooperative", description: "Co-op, community land trust, or member-owned" },
      { value: "government", label: "Government / Public entity", description: "Municipal, state, tribal, or quasi-governmental" },
      { value: "not-formed", label: "Not yet formed", description: "Pre-incorporation or exploring structures" },
    ],
  },
  {
    id: "stage",
    title: "What stage are you at?",
    subtitle: "Different funding works at different points in your journey.",
    options: [
      { value: "idea", label: "Idea / concept", description: "Pre-anything — exploring feasibility" },
      { value: "rnd", label: "R&D / prototype", description: "Building and testing, not yet deployed" },
      { value: "pilot", label: "Pilot / early traction", description: "First customers or beneficiaries, proving the model" },
      { value: "growth", label: "Growth", description: "Model works, need funding to expand" },
      { value: "scale", label: "Scaling", description: "Operating at scale, need major capital to grow further" },
    ],
  },
  {
    id: "revenue",
    title: "Do you have revenue?",
    subtitle: "Some options require proof that money is coming in.",
    options: [
      { value: "none", label: "No revenue yet", description: "Pre-revenue or fully grant-funded" },
      { value: "some", label: "Some, but not consistent", description: "Lumpy or early-stage revenue" },
      { value: "consistent", label: "Consistent recurring revenue", description: "Predictable monthly or annual income" },
      { value: "large", label: "Large, predictable revenue", description: "Established revenue at significant scale" },
    ],
  },
  {
    id: "capitalNeed",
    title: "How much money do you need?",
    subtitle: "Different options work at different scales.",
    options: [
      { value: "under-100k", label: "Under $100K", description: "Small grant, seed, or micro-loan range" },
      { value: "100k-1m", label: "$100K – $1M", description: "Pilot funding or early-stage capital" },
      { value: "1m-10m", label: "$1M – $10M", description: "Growth capital or mid-size deployment" },
      { value: "10m-100m", label: "$10M – $100M", description: "Large-scale project or fund-level capital" },
      { value: "100m-plus", label: "$100M+", description: "Infrastructure-scale or institutional deployment" },
    ],
  },
  {
    id: "speedNeed",
    title: "How quickly do you need the money?",
    subtitle: "Some options close in weeks; others take months to set up.",
    options: [
      { value: "asap", label: "As fast as possible", description: "Weeks, not months — I need money now" },
      { value: "few-months", label: "Within a few months", description: "1–3 months is a reasonable timeline" },
      { value: "6-plus-months", label: "6+ months is fine", description: "I'm planning ahead and can wait" },
      { value: "no-rush", label: "No rush", description: "Timeline isn't a deciding factor for me" },
    ],
  },
  {
    id: "complexityTolerance",
    title: "How much process complexity can you handle?",
    subtitle: "Some options need just an application; others need lawyers and months of structuring.",
    options: [
      { value: "simple", label: "Keep it simple", description: "No lawyers on retainer — I need something straightforward" },
      { value: "some", label: "Some paperwork is fine", description: "I can manage moderate diligence and documentation" },
      { value: "complex", label: "My team handles complex deals", description: "Legal counsel available, experienced with structuring" },
    ],
  },
  {
    id: "network",
    title: "Do you have connections in the impact space?",
    subtitle: "Some funding sources require relationships with foundations or impact investors.",
    options: [
      { value: "deep", label: "Deep connections", description: "Active relationships with foundations, DFIs, DAF sponsors, or impact investors" },
      { value: "some", label: "Some connections", description: "Know a few people, have had some conversations" },
      { value: "none", label: "Starting from scratch", description: "No existing relationships in the impact/philanthropic world" },
    ],
  },
  {
    id: "priorities",
    title: "What matters most to you?",
    subtitle: "Select all that apply — this helps us rank your results.",
    multiSelect: true,
    options: [
      { value: "ownership", label: "Keep ownership & control", description: "No equity dilution or board seats given up" },
      { value: "lowest-cost", label: "Cheapest option", description: "Minimize interest, fees, and total cost" },
      { value: "largest-amount", label: "Largest possible amount", description: "Maximize how much I can raise" },
      { value: "speed", label: "Speed above all", description: "Get the money as fast as possible" },
      { value: "flexibility", label: "Flexibility if things go wrong", description: "Forgiving terms, room to pivot" },
      { value: "proven", label: "Established track record", description: "Well-known instrument with broad market adoption" },
    ],
  },
];

// ============================================
// SCORING HELPERS
// ============================================

// Parse "$50K - $10M" style strings into { min, max } in raw numbers
function parseSizeRange(typicalSize: string): { min: number; max: number } {
  const cleaned = typicalSize.replace(/\(.*?\)/g, "").replace(/Credits:\s*/i, "").replace(/per project/i, "");
  const amounts = cleaned.match(/\$[\d,.]+[KMB]?\+?/g) || [];

  function parseAmount(s: string): number {
    const num = parseFloat(s.replace(/[$,]/g, ""));
    if (s.includes("B")) return num * 1_000_000_000;
    if (s.includes("M")) return num * 1_000_000;
    if (s.includes("K")) return num * 1_000;
    return num;
  }

  if (amounts.length >= 2) {
    let max = parseAmount(amounts[1]!);
    if (amounts[1]!.includes("+")) max *= 10;
    return { min: parseAmount(amounts[0]!), max };
  }
  if (amounts.length === 1) {
    const val = parseAmount(amounts[0]!);
    return { min: val, max: amounts[0].includes("+") ? val * 10 : val * 2 };
  }
  return { min: 0, max: 1_000_000_000 };
}

const capitalNeedRanges: Record<CapitalNeed, { min: number; max: number }> = {
  "under-100k": { min: 0, max: 100_000 },
  "100k-1m": { min: 100_000, max: 1_000_000 },
  "1m-10m": { min: 1_000_000, max: 10_000_000 },
  "10m-100m": { min: 10_000_000, max: 100_000_000 },
  "100m-plus": { min: 100_000_000, max: 100_000_000_000 },
};

const speedMap: Record<string, number> = { weeks: 0, "1-3-months": 1, "3-6-months": 2, "6-12-months": 3 };
const speedNeedMap: Record<SpeedNeed, number> = { asap: 0, "few-months": 1, "6-plus-months": 2, "no-rush": 3 };
const complexityMap: Record<string, number> = { low: 0, medium: 1, high: 2 };
const complexityToleranceMap: Record<ComplexityTolerance, number> = { simple: 0, some: 1, complex: 2 };

// ============================================
// ELIGIBILITY MATRIX
// ============================================

// true = eligible, false = filtered out
const eligibilityMatrix: Record<OrgType, Record<string, boolean>> = {
  nonprofit: {
    "pure-grant": true, "recoverable-grant": true, "forgivable-loan": true,
    "concessionary-debt": true, "first-loss-debt": true, "program-related-investment": true,
    "revenue-based-financing": false, "convertible-note": false,
    "loan-guarantee": true, "first-loss-guarantee": true, "performance-guarantee": true,
    "political-risk-insurance": false,
    "concessionary-equity": false, "first-loss-equity": false, "patient-equity": false, "anchor-commitment": false,
    "tiered-fund": true, "technical-assistance": true, "pay-for-success": true,
    "offtake-backed-financing": false, "doe-lpo": false, "ira-tax-credits": false, "oced-grants": true,
    // Conventional
    "term-loan": false, "sba-loan": false, "equipment-financing": true, "line-of-credit": true,
    "commercial-mortgage": true, "venture-debt": false, "mezzanine-debt": false,
    "vc-equity": false, "angel-seed": false, "crowdfunding": true, "invoice-factoring": true, "project-finance": false,
  },
  "c-corp": {
    "pure-grant": true, "recoverable-grant": true, "forgivable-loan": true,
    "concessionary-debt": true, "first-loss-debt": true, "program-related-investment": true,
    "revenue-based-financing": true, "convertible-note": true,
    "loan-guarantee": true, "first-loss-guarantee": true, "performance-guarantee": true,
    "political-risk-insurance": true,
    "concessionary-equity": true, "first-loss-equity": true, "patient-equity": true, "anchor-commitment": true,
    "tiered-fund": true, "technical-assistance": true, "pay-for-success": true,
    "offtake-backed-financing": true, "doe-lpo": true, "ira-tax-credits": true, "oced-grants": true,
    // Conventional
    "term-loan": true, "sba-loan": true, "equipment-financing": true, "line-of-credit": true,
    "commercial-mortgage": true, "venture-debt": true, "mezzanine-debt": true,
    "vc-equity": true, "angel-seed": true, "crowdfunding": true, "invoice-factoring": true, "project-finance": true,
  },
  llc: {
    "pure-grant": true, "recoverable-grant": true, "forgivable-loan": true,
    "concessionary-debt": true, "first-loss-debt": true, "program-related-investment": true,
    "revenue-based-financing": true, "convertible-note": true,
    "loan-guarantee": true, "first-loss-guarantee": true, "performance-guarantee": true,
    "political-risk-insurance": true,
    "concessionary-equity": true, "first-loss-equity": true, "patient-equity": true, "anchor-commitment": true,
    "tiered-fund": true, "technical-assistance": true, "pay-for-success": true,
    "offtake-backed-financing": true, "doe-lpo": true, "ira-tax-credits": true, "oced-grants": true,
    // Conventional
    "term-loan": true, "sba-loan": true, "equipment-financing": true, "line-of-credit": true,
    "commercial-mortgage": true, "venture-debt": true, "mezzanine-debt": true,
    "vc-equity": true, "angel-seed": true, "crowdfunding": true, "invoice-factoring": true, "project-finance": true,
  },
  cooperative: {
    "pure-grant": true, "recoverable-grant": true, "forgivable-loan": true,
    "concessionary-debt": true, "first-loss-debt": true, "program-related-investment": true,
    "revenue-based-financing": true, "convertible-note": false,
    "loan-guarantee": true, "first-loss-guarantee": true, "performance-guarantee": true,
    "political-risk-insurance": false,
    "concessionary-equity": false, "first-loss-equity": false, "patient-equity": false, "anchor-commitment": false,
    "tiered-fund": true, "technical-assistance": true, "pay-for-success": true,
    "offtake-backed-financing": true, "doe-lpo": false, "ira-tax-credits": false, "oced-grants": true,
    // Conventional
    "term-loan": true, "sba-loan": true, "equipment-financing": true, "line-of-credit": true,
    "commercial-mortgage": true, "venture-debt": false, "mezzanine-debt": false,
    "vc-equity": false, "angel-seed": false, "crowdfunding": true, "invoice-factoring": true, "project-finance": false,
  },
  government: {
    "pure-grant": true, "recoverable-grant": false, "forgivable-loan": true,
    "concessionary-debt": true, "first-loss-debt": false, "program-related-investment": false,
    "revenue-based-financing": false, "convertible-note": false,
    "loan-guarantee": true, "first-loss-guarantee": true, "performance-guarantee": true,
    "political-risk-insurance": true,
    "concessionary-equity": false, "first-loss-equity": false, "patient-equity": false, "anchor-commitment": false,
    "tiered-fund": false, "technical-assistance": true, "pay-for-success": true,
    "offtake-backed-financing": true, "doe-lpo": true, "ira-tax-credits": true, "oced-grants": true,
    // Conventional
    "term-loan": false, "sba-loan": false, "equipment-financing": true, "line-of-credit": false,
    "commercial-mortgage": true, "venture-debt": false, "mezzanine-debt": false,
    "vc-equity": false, "angel-seed": false, "crowdfunding": false, "invoice-factoring": true, "project-finance": true,
  },
  "not-formed": {
    "pure-grant": true, "recoverable-grant": false, "forgivable-loan": false,
    "concessionary-debt": false, "first-loss-debt": false, "program-related-investment": false,
    "revenue-based-financing": false, "convertible-note": false,
    "loan-guarantee": false, "first-loss-guarantee": false, "performance-guarantee": false,
    "political-risk-insurance": false,
    "concessionary-equity": false, "first-loss-equity": false, "patient-equity": false, "anchor-commitment": false,
    "tiered-fund": false, "technical-assistance": true, "pay-for-success": false,
    "offtake-backed-financing": false, "doe-lpo": false, "ira-tax-credits": false, "oced-grants": false,
    // Conventional
    "term-loan": false, "sba-loan": false, "equipment-financing": false, "line-of-credit": false,
    "commercial-mortgage": false, "venture-debt": false, "mezzanine-debt": false,
    "vc-equity": false, "angel-seed": true, "crowdfunding": true, "invoice-factoring": false, "project-finance": false,
  },
};

// ============================================
// STAGE AFFINITY SCORES (0-20)
// ============================================

const stageScores: Record<OrgStage, Record<string, number>> = {
  idea: {
    "pure-grant": 20, "technical-assistance": 20, "recoverable-grant": 12,
    "oced-grants": 10, "forgivable-loan": 5,
    // Conventional
    "angel-seed": 15, "crowdfunding": 12,
  },
  rnd: {
    "pure-grant": 20, "recoverable-grant": 18, "technical-assistance": 18,
    "oced-grants": 15, "forgivable-loan": 12, "convertible-note": 8,
    "program-related-investment": 8,
    // Conventional
    "angel-seed": 12, "crowdfunding": 8,
  },
  pilot: {
    "recoverable-grant": 20, "forgivable-loan": 18, "pure-grant": 15,
    "convertible-note": 15, "technical-assistance": 15, "concessionary-debt": 12,
    "program-related-investment": 12, "revenue-based-financing": 10,
    "loan-guarantee": 8,
    // Conventional
    "angel-seed": 14, "crowdfunding": 12, "equipment-financing": 8,
    "invoice-factoring": 6, "line-of-credit": 6,
  },
  growth: {
    "concessionary-debt": 20, "revenue-based-financing": 20, "loan-guarantee": 18,
    "first-loss-debt": 15, "program-related-investment": 15, "forgivable-loan": 15,
    "ira-tax-credits": 15, "concessionary-equity": 14, "convertible-note": 12,
    "patient-equity": 12, "performance-guarantee": 12, "tiered-fund": 10,
    "pay-for-success": 10, "offtake-backed-financing": 10,
    // Conventional
    "term-loan": 18, "sba-loan": 18, "line-of-credit": 16, "venture-debt": 16,
    "equipment-financing": 15, "invoice-factoring": 15, "vc-equity": 12,
    "commercial-mortgage": 10, "mezzanine-debt": 10, "crowdfunding": 8, "angel-seed": 8,
  },
  scale: {
    "tiered-fund": 20, "doe-lpo": 20, "offtake-backed-financing": 20,
    "anchor-commitment": 18, "patient-equity": 18, "ira-tax-credits": 18,
    "first-loss-equity": 15, "first-loss-guarantee": 15, "political-risk-insurance": 15,
    "concessionary-equity": 14, "loan-guarantee": 12, "concessionary-debt": 12,
    "oced-grants": 12, "performance-guarantee": 12, "first-loss-debt": 10,
    "pay-for-success": 10, "revenue-based-financing": 8,
    // Conventional
    "project-finance": 20, "commercial-mortgage": 18, "mezzanine-debt": 18,
    "vc-equity": 15, "venture-debt": 14, "term-loan": 12, "line-of-credit": 12,
    "equipment-financing": 10, "invoice-factoring": 10, "sba-loan": 8,
  },
};

// ============================================
// NETWORK REQUIREMENT CLASSIFICATION
// ============================================

// Instruments that heavily rely on philanthropic/impact ecosystem access
const highNetworkInstruments = new Set([
  "recoverable-grant", "program-related-investment", "concessionary-equity",
  "first-loss-equity", "first-loss-debt", "anchor-commitment", "first-loss-guarantee",
  "patient-equity", "pay-for-success", "tiered-fund",
]);

// Instruments accessible without philanthropic connections
const lowNetworkInstruments = new Set([
  "revenue-based-financing", "convertible-note", "doe-lpo", "ira-tax-credits",
  "oced-grants", "performance-guarantee", "political-risk-insurance",
  "loan-guarantee", "offtake-backed-financing",
  // Conventional — all accessible through standard commercial channels
  "term-loan", "sba-loan", "equipment-financing", "line-of-credit",
  "commercial-mortgage", "venture-debt", "mezzanine-debt", "vc-equity",
  "angel-seed", "crowdfunding", "invoice-factoring", "project-finance",
]);

// ============================================
// PRIORITY SCORING
// ============================================

function scorePriorities(instrument: Instrument, priorities: Priority[]): number {
  let boost = 0;
  for (const p of priorities) {
    switch (p) {
      case "ownership": {
        const dilutiveConventional = new Set(["vc-equity", "angel-seed", "crowdfunding"]);
        if (instrument.category === "equity" || dilutiveConventional.has(instrument.slug)) { boost += 0; }
        else if (instrument.terms === "conventional" && !dilutiveConventional.has(instrument.slug)) boost += 8;
        else if (["grant", "debt", "guarantee"].includes(instrument.category) && instrument.slug !== "convertible-note") boost += 8;
        else if (instrument.category === "hybrid" || instrument.slug === "convertible-note") boost += 4;
        break;
      }
      case "lowest-cost":
        if (instrument.costRange.startsWith("0")) boost += 8;
        else if (instrument.financialReturn.expected <= 0) boost += 6;
        else boost += 2;
        break;
      case "largest-amount": {
        const { max } = parseSizeRange(instrument.typicalSize);
        if (max >= 1_000_000_000) boost += 8;
        else if (max >= 100_000_000) boost += 6;
        else if (max >= 10_000_000) boost += 3;
        break;
      }
      case "speed":
        if (instrument.speed === "weeks") boost += 8;
        else if (instrument.speed === "1-3-months") boost += 5;
        break;
      case "flexibility":
        if (instrument.features.some(f => ["flexible", "risk-tolerant"].includes(f))) boost += 8;
        else if (instrument.category === "grant") boost += 6;
        break;
      case "proven":
        if (instrument.terms === "government" || instrument.terms === "conventional" || instrument.category === "guarantee") boost += 8;
        else if (instrument.realWorldExamples && instrument.realWorldExamples.deals.length >= 3) boost += 6;
        else boost += 3;
        break;
    }
  }
  return boost;
}

// ============================================
// MAIN SCORING FUNCTION
// ============================================

export function scoreInstruments(answers: FinderAnswers, instruments: Instrument[]): ScoredInstrument[] {
  const results: ScoredInstrument[] = [];

  for (const inst of instruments) {
    const reasons: string[] = [];
    let score = 0;

    // Step 1: Eligibility filter
    if (answers.orgType) {
      const matrix = eligibilityMatrix[answers.orgType];
      if (matrix && matrix[inst.slug] === false) continue;
    }
    if (answers.revenue === "none") {
      const noRevenueExclude = new Set([
        "revenue-based-financing", "term-loan", "sba-loan", "line-of-credit",
        "venture-debt", "mezzanine-debt", "invoice-factoring",
      ]);
      if (noRevenueExclude.has(inst.slug)) continue;
    }

    // Step 2: Stage match (0-20)
    if (answers.stage) {
      const stageMap = stageScores[answers.stage];
      const stageScore = stageMap[inst.slug] ?? 5;
      score += stageScore;
      if (stageScore >= 15) {
        const stageLabels: Record<OrgStage, string> = {
          idea: "idea-stage", rnd: "R&D-stage", pilot: "pilot-stage",
          growth: "growth-stage", scale: "scale-stage",
        };
        reasons.push(`Well-suited for ${stageLabels[answers.stage]} organizations`);
      }
    } else {
      score += 10; // neutral
    }

    // Step 3: Size match (0-15)
    if (answers.capitalNeed) {
      const need = capitalNeedRanges[answers.capitalNeed];
      const instRange = parseSizeRange(inst.typicalSize);
      const overlapMin = Math.max(need.min, instRange.min);
      const overlapMax = Math.min(need.max, instRange.max);
      if (overlapMin <= overlapMax) {
        const overlapPct = (overlapMax - overlapMin) / (need.max - need.min || 1);
        const sizeScore = overlapPct > 0.5 ? 15 : overlapPct > 0 ? 10 : 5;
        score += sizeScore;
        if (sizeScore >= 10) {
          const sizeLabels: Record<string, string> = {
            "under-100k": "under $100K",
            "100k-1m": "$100K–$1M",
            "1m-10m": "$1M–$10M",
            "10m-100m": "$10M–$100M",
            "100m-plus": "$100M+",
          };
          reasons.push(`Typical size range includes your ${sizeLabels[answers.capitalNeed]} need`);
        }
      } else {
        // Check adjacency
        const gap = Math.min(Math.abs(need.min - instRange.max), Math.abs(instRange.min - need.max));
        score += gap < need.max * 0.5 ? 3 : 0;
      }
    } else {
      score += 8;
    }

    // Step 4: Speed match (0-15)
    if (answers.speedNeed) {
      if (answers.speedNeed === "no-rush") {
        score += 15;
      } else {
        const diff = Math.abs(speedMap[inst.speed] - speedNeedMap[answers.speedNeed]);
        const speedScore = diff === 0 ? 15 : diff === 1 ? 9 : diff === 2 ? 3 : 0;
        score += speedScore;
        if (speedScore >= 12) {
          const labels: Record<string, string> = { weeks: "weeks", "1-3-months": "1–3 months", "3-6-months": "3–6 months", "6-12-months": "6–12 months" };
          reasons.push(`Available in ${labels[inst.speed]}, matching your timeline`);
        }
      }
    } else {
      score += 8;
    }

    // Step 5: Complexity match (0-10)
    if (answers.complexityTolerance) {
      const instC = complexityMap[inst.complexity];
      const tolC = complexityToleranceMap[answers.complexityTolerance];
      if (answers.complexityTolerance === "complex") {
        score += 10; // can handle anything
      } else {
        const diff = instC - tolC;
        if (diff <= 0) score += 10;
        else if (diff === 1) score += 5;
        else score += 0;
      }
      if (inst.complexity === "low" && answers.complexityTolerance === "simple") {
        reasons.push("Low complexity — straightforward to access");
      }
    } else {
      score += 5;
    }

    // Step 6: Network match (0-10)
    if (answers.network) {
      if (highNetworkInstruments.has(inst.slug)) {
        if (answers.network === "deep") { score += 10; reasons.push("Leverages your impact ecosystem connections"); }
        else if (answers.network === "some") score += 5;
        else score += 0;
      } else if (lowNetworkInstruments.has(inst.slug)) {
        score += 10;
        if (answers.network === "none") reasons.push("Accessible without philanthropic connections");
      } else {
        score += answers.network === "deep" ? 8 : answers.network === "some" ? 6 : 4;
      }
    } else {
      score += 5;
    }

    // Step 7: Priority boost
    if (answers.priorities.length > 0) {
      const priorityScore = scorePriorities(inst, answers.priorities);
      score += priorityScore;
      // Add priority-based reasons
      if (answers.priorities.includes("ownership")) {
        const dilutiveConventional = new Set(["vc-equity", "angel-seed", "crowdfunding"]);
        if (dilutiveConventional.has(inst.slug)) {
          // no non-dilutive reason for these
        } else if (inst.terms === "conventional" && !dilutiveConventional.has(inst.slug)) {
          reasons.push("Non-dilutive — you keep full ownership and control");
        } else if (inst.category !== "equity" && ["grant", "debt", "guarantee"].includes(inst.category) && inst.slug !== "convertible-note") {
          reasons.push("Non-dilutive — you keep full ownership and control");
        }
      }
      if (answers.priorities.includes("lowest-cost") && inst.costRange.startsWith("0")) {
        reasons.push(`Zero or minimal cost (${inst.costRange})`);
      }
      if (answers.priorities.includes("flexibility") && inst.features.some(f => ["flexible", "risk-tolerant"].includes(f))) {
        reasons.push("Flexible terms with room for adjustment");
      }
    }

    // Revenue penalty for debt instruments
    if (answers.revenue === "some" && ["debt", "hybrid"].includes(inst.category) && inst.slug !== "forgivable-loan") {
      score -= 3;
    }

    // Determine tier
    const tier = score >= 70 ? "strong" : score >= 50 ? "good" : "explore";

    if (score >= 30) {
      results.push({
        instrument: inst,
        score: Math.min(score, 100),
        reasons: reasons.slice(0, 3),
        tier,
      });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
