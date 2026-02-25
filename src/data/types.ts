export type Category =
  | "grant"
  | "debt"
  | "guarantee"
  | "equity"
  | "hybrid"
  | "government"
  | "conventional";

export interface Actor {
  name: string;
  type: "source" | "counterparty" | "enabler" | "ecosystem";
  description: string;
  examples?: string[];
}

export interface DefaultStep {
  step: number;
  title: string;
  description: string;
  lossAbsorber?: string; // who absorbs loss at this step
}

export interface CalculatorParam {
  id: string;
  label: string;
  type: "currency" | "percentage" | "years" | "multiple" | "select";
  default: number;
  min: number;
  max: number;
  step: number;
  options?: { label: string; value: number }[];
}

export interface Instrument {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: Category;
  number: number;
  tagline: string;
  description: string;

  // Lens 1: Who puts money in
  sources: Actor[];
  typicalSize: string;
  motivationMix: {
    impact: number; // 0-100
    financial: number;
    policy: number;
  };

  // Lens 2: What they get
  financialReturn: {
    min: number; // percentage, -100 for total loss
    expected: number;
    max: number;
  };
  nonFinancialReturns: string[];
  riskLevel: "very-low" | "low" | "moderate" | "high" | "very-high";

  // Lens 3: Who else is involved
  actors: Actor[];

  // Lens 4: Default scenario
  defaultSteps: DefaultStep[];
  recoveryRate: string; // e.g. "0-20%", "60-80%"

  // Lens 5: Calculator
  costRange: string; // e.g. "0-3%", "4-7%"
  calculatorParams: CalculatorParam[];
  costFormula: string; // human-readable formula description

  // Visual
  features: string[]; // e.g. ["risk-tolerant", "concessionary", "patient"]
  useCase: string;

  // Lens 6: In the Wild
  realWorldExamples?: RealWorldExamples;
}

export type MediaType = "article" | "podcast" | "interview" | "report" | "video";

export interface RealWorldProvider {
  name: string;
  url: string;
  description: string;
  notableActivity?: string;
}

export interface RealWorldDeal {
  name: string;
  year: number;
  size?: string;
  parties: string[];
  description: string;
  url?: string;
}

export interface RealWorldMedia {
  title: string;
  source: string;
  type: MediaType;
  url: string;
  date?: string;
  description?: string;
}

export interface RealWorldExamples {
  providers: RealWorldProvider[];
  deals: RealWorldDeal[];
  media: RealWorldMedia[];
}

export interface CategoryInfo {
  id: Category;
  name: string;
  color: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "grant",
    name: "Grant-Based",
    color: "var(--cat-grant)",
    description: "Non-repayable funding deployed for impact",
    icon: "Gift",
  },
  {
    id: "debt",
    name: "Debt",
    color: "var(--cat-debt)",
    description: "Loans and lending with concessionary terms",
    icon: "Landmark",
  },
  {
    id: "guarantee",
    name: "Guarantees",
    color: "var(--cat-guarantee)",
    description: "Backstops that absorb risk for others",
    icon: "Shield",
  },
  {
    id: "equity",
    name: "Equity",
    color: "var(--cat-equity)",
    description: "Ownership stakes with catalytic terms",
    icon: "TrendingUp",
  },
  {
    id: "hybrid",
    name: "Hybrid",
    color: "var(--cat-hybrid)",
    description: "Multi-layered and outcomes-based structures",
    icon: "Layers",
  },
  {
    id: "government",
    name: "Government",
    color: "var(--cat-government)",
    description: "Public-sector financing and incentives",
    icon: "Building2",
  },
  {
    id: "conventional",
    name: "Conventional",
    color: "var(--cat-conventional)",
    description: "Standard commercial financing instruments",
    icon: "Briefcase",
  },
];

// ============================================
// Stack Builder types
// ============================================

export type RepaymentType = "amortizing" | "interest-only" | "bullet" | "revenue-based" | "none";

export interface StackInstrumentDef {
  id: string;
  name: string;
  shortName: string;
  category: Category;
  color: string;
  repaymentType: RepaymentType;
  defaultRate: number;
  defaultTerm: number; // months
  rateRange: [number, number];
  termRange: [number, number]; // months
  description: string;
  isEquity?: boolean; // no debt payments
  isGrant?: boolean;  // no repayment at all
  // RBF-specific defaults
  defaultRevenueShare?: number;   // % of monthly revenue (e.g. 5)
  defaultCapMultiple?: number;    // repayment cap as multiple of principal (e.g. 1.5)
  revenueShareRange?: [number, number]; // e.g. [2, 15]
  capMultipleRange?: [number, number];  // e.g. [1.1, 3.0]
}

export interface StackLayer {
  instrumentId: string;
  amount: number;
  rate: number;       // annual interest rate %
  termMonths: number; // loan term in months
  startYear: number;  // e.g. 2026
  startMonth: number; // 1-12
  // RBF-specific
  monthlyRevenue?: number;   // estimated monthly revenue
  revenueSharePct?: number;  // % of revenue going to repayment
  repaymentCapX?: number;    // repayment cap as multiple (e.g. 1.5 = pay back 1.5x)
}
