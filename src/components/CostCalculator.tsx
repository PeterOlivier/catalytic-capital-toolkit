"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Instrument, CalculatorParam } from "@/data/types";
import { categoryColorMap } from "./CategoryBadge";
import { Calculator, DollarSign, Percent, Clock, Hash } from "lucide-react";

function formatCurrency(val: number): string {
  if (val >= 1e9) return `$${(val / 1e9).toFixed(1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(0)}K`;
  return `$${val.toFixed(0)}`;
}

function ParamInput({
  param,
  value,
  onChange,
}: {
  param: CalculatorParam;
  value: number;
  onChange: (v: number) => void;
}) {
  const formatVal = (v: number): string => {
    if (param.type === "currency") return formatCurrency(v);
    if (param.type === "percentage") return `${v}%`;
    if (param.type === "years") return `${v} yr${v !== 1 ? "s" : ""}`;
    if (param.type === "multiple") return `${v}x`;
    return String(v);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm text-text-secondary">
          {param.label}
        </label>
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {formatVal(value)}
        </span>
      </div>
      <input
        type="range"
        min={param.min}
        max={param.max}
        step={param.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-text-tertiary">
        <span>{formatVal(param.min)}</span>
        <span>{formatVal(param.max)}</span>
      </div>
    </div>
  );
}

// Lens 5: Cost of Capital Calculator
export function CostCalculator({ instrument }: { instrument: Instrument }) {
  const color = categoryColorMap[instrument.category];
  const params = instrument.calculatorParams;

  // Initialize state from defaults
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    params.forEach((p) => {
      init[p.id] = p.default;
    });
    return init;
  });

  const updateValue = (id: string, val: number) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  };

  // Calculate outputs based on instrument type
  const outputs = useMemo(() => {
    const v = values;
    const results: { label: string; value: string; highlight?: boolean }[] = [];

    switch (instrument.id) {
      case "pure-grant":
        results.push(
          { label: "Cost to Recipient", value: "$0", highlight: true },
          { label: "Cost to Funder", value: formatCurrency(v.amount) },
          { label: "Effective Rate", value: "0%" }
        );
        break;

      case "recoverable-grant":
        const expectedLoss = v.amount * (1 - v.successProb / 100);
        results.push(
          { label: "Expected Cost to Funder", value: formatCurrency(expectedLoss), highlight: true },
          { label: "Cost to Recipient", value: "$0" },
          { label: "Capital Recycled (if success)", value: formatCurrency(v.amount) },
          { label: "Expected Recovery Rate", value: `${v.successProb}%` }
        );
        break;

      case "forgivable-loan": {
        const effectiveRate = (v.rate * (1 - v.forgivenessProb / 100));
        const annualCost = v.amount * effectiveRate / 100;
        results.push(
          { label: "Effective Annual Rate", value: `${effectiveRate.toFixed(2)}%`, highlight: true },
          { label: "Annual Payment (if not forgiven)", value: formatCurrency(v.amount * v.rate / 100) },
          { label: "Expected Annual Cost", value: formatCurrency(annualCost) },
          { label: "Prob. of Forgiveness", value: `${v.forgivenessProb}%` }
        );
        break;
      }

      case "concessionary-debt": {
        const annualCost = v.amount * v.rate / 100;
        const marketCost = v.amount * v.marketRate / 100;
        const savings = (marketCost - annualCost) * v.term;
        results.push(
          { label: "Annual Interest Payment", value: formatCurrency(annualCost), highlight: true },
          { label: "Market-Rate Equivalent", value: formatCurrency(marketCost) },
          { label: "Annual Savings", value: formatCurrency(marketCost - annualCost) },
          { label: `Total Savings (${v.term}yr)`, value: formatCurrency(savings) },
          { label: "Concession (bps)", value: `${((v.marketRate - v.rate) * 100).toFixed(0)} bps` }
        );
        break;
      }

      case "first-loss-debt": {
        const firstLossAmt = v.totalFund * v.firstLossPct / 100;
        const expectedLossAmt = v.totalFund * v.expectedLoss / 100;
        const firstLossExposure = Math.min(expectedLossAmt, firstLossAmt);
        const leverage = v.totalFund / firstLossAmt;
        results.push(
          { label: "First-Loss Tranche Size", value: formatCurrency(firstLossAmt) },
          { label: "Leverage Ratio", value: `${leverage.toFixed(1)}x`, highlight: true },
          { label: "Expected Loss to First-Loss", value: formatCurrency(firstLossExposure) },
          { label: "Senior Tranche Protected", value: formatCurrency(v.totalFund - firstLossAmt) },
          { label: "Senior Debt Rate", value: `${v.seniorRate}%` }
        );
        break;
      }

      case "pri": {
        const annual = v.amount * v.rate / 100;
        const total = annual * v.term;
        results.push(
          { label: "Annual Interest", value: formatCurrency(annual), highlight: true },
          { label: "Total Interest Over Term", value: formatCurrency(total) },
          { label: "Counts Toward 5% Distribution", value: "Yes" },
          { label: "Interest Rate", value: `${v.rate}%` }
        );
        break;
      }

      case "revenue-based-financing": {
        const totalRepay = v.amount * v.cap;
        const monthlyPayment = v.monthlyRev * v.revShare / 100;
        const monthsToRepay = totalRepay / monthlyPayment;
        const yearsToRepay = monthsToRepay / 12;
        const effectiveAPR = ((v.cap - 1) / yearsToRepay) * 100;
        results.push(
          { label: "Total Repayment", value: formatCurrency(totalRepay), highlight: true },
          { label: "Monthly Payment", value: formatCurrency(monthlyPayment) },
          { label: "Months to Repay", value: `${monthsToRepay.toFixed(0)} months` },
          { label: "Effective APR", value: `${effectiveAPR.toFixed(1)}%` },
          { label: "Total Cost of Capital", value: formatCurrency(totalRepay - v.amount) }
        );
        break;
      }

      case "convertible-note": {
        const interestAccrued = v.amount * v.rate / 100;
        const effectivePriceDiscount = v.discount;
        results.push(
          { label: "Annual Interest Accrual", value: formatCurrency(interestAccrued) },
          { label: "Conversion Discount", value: `${effectivePriceDiscount}%`, highlight: true },
          { label: "Valuation Cap", value: formatCurrency(v.cap) },
          { label: "Effective Cost (dilution)", value: `${effectivePriceDiscount}% equity premium` }
        );
        break;
      }

      case "loan-guarantee": {
        const guaranteeAmt = v.loanAmount * v.coverage / 100;
        const annualFee = guaranteeAmt * v.fee / 100;
        const totalFee = annualFee * v.term;
        const leverage = v.loanAmount / totalFee;
        results.push(
          { label: "Guarantee Amount", value: formatCurrency(guaranteeAmt) },
          { label: "Annual Fee", value: formatCurrency(annualFee), highlight: true },
          { label: `Total Fee (${v.term}yr)`, value: formatCurrency(totalFee) },
          { label: "Leverage (Loan / Total Fee)", value: `${leverage.toFixed(0)}x` }
        );
        break;
      }

      case "first-loss-guarantee": {
        const guaranteeAmt = v.portfolio * v.firstLossPct / 100;
        const expectedLossAmt = v.portfolio * v.expectedLoss / 100;
        const guarantorLoss = Math.min(expectedLossAmt, guaranteeAmt);
        const leverage = v.portfolio / guaranteeAmt;
        results.push(
          { label: "Guarantee Amount", value: formatCurrency(guaranteeAmt) },
          { label: "Leverage Ratio", value: `${leverage.toFixed(0)}x`, highlight: true },
          { label: "Expected Loss to Guarantor", value: formatCurrency(guarantorLoss) },
          { label: "Commercial Capital Protected", value: formatCurrency(v.portfolio - guaranteeAmt) }
        );
        break;
      }

      case "performance-guarantee": {
        const annualPrem = v.bondValue * v.premium / 100;
        const totalPrem = annualPrem * v.term;
        results.push(
          { label: "Annual Premium", value: formatCurrency(annualPrem), highlight: true },
          { label: `Total Premium (${v.term}yr)`, value: formatCurrency(totalPrem) },
          { label: "Bond Value", value: formatCurrency(v.bondValue) }
        );
        break;
      }

      case "political-risk-insurance": {
        const annualPrem = v.insuredAmount * v.premium / 100;
        const totalPrem = annualPrem * v.term;
        results.push(
          { label: "Annual Premium", value: formatCurrency(annualPrem), highlight: true },
          { label: `Total Premium (${v.term}yr)`, value: formatCurrency(totalPrem) },
          { label: "Coverage Amount", value: formatCurrency(v.insuredAmount) }
        );
        break;
      }

      case "concessionary-equity": {
        const concessionPerYear = v.amount * (v.marketReturn - v.targetReturn) / 100;
        const totalConcession = concessionPerYear * v.holdPeriod;
        const targetValue = v.amount * Math.pow(1 + v.targetReturn / 100, v.holdPeriod);
        const marketValue = v.amount * Math.pow(1 + v.marketReturn / 100, v.holdPeriod);
        results.push(
          { label: "Annual Concession", value: formatCurrency(concessionPerYear) },
          { label: "Total Concession", value: formatCurrency(totalConcession), highlight: true },
          { label: `Value at ${v.targetReturn}% (target)`, value: formatCurrency(targetValue) },
          { label: `Value at ${v.marketReturn}% (market)`, value: formatCurrency(marketValue) }
        );
        break;
      }

      case "first-loss-equity": {
        const juniorAmt = v.fundSize * v.juniorPct / 100;
        const mezzAmt = v.fundSize * v.mezzPct / 100;
        const seniorAmt = v.fundSize - juniorAmt - mezzAmt;
        const leverage = v.fundSize / juniorAmt;
        results.push(
          { label: "Junior Tranche", value: formatCurrency(juniorAmt), highlight: true },
          { label: "Mezzanine Tranche", value: formatCurrency(mezzAmt) },
          { label: "Senior Tranche", value: formatCurrency(seniorAmt) },
          { label: "Leverage on Junior", value: `${leverage.toFixed(1)}x` },
          { label: "Max Loss Before Senior Hit", value: `${(v.juniorPct + v.mezzPct)}%` }
        );
        break;
      }

      case "patient-equity": {
        const exitValue = v.amount * Math.pow(1 + v.targetIRR / 100, v.holdPeriod);
        const totalReturn = exitValue - v.amount;
        const moic = exitValue / v.amount;
        results.push(
          { label: "Target Exit Value", value: formatCurrency(exitValue), highlight: true },
          { label: "Total Return", value: formatCurrency(totalReturn) },
          { label: "MOIC", value: `${moic.toFixed(2)}x` },
          { label: "Hold Period", value: `${v.holdPeriod} years` }
        );
        break;
      }

      case "anchor-commitment": {
        const anchorAmt = v.fundSize * v.anchorPct / 100;
        const remainingToRaise = v.fundSize - anchorAmt;
        results.push(
          { label: "Anchor Amount", value: formatCurrency(anchorAmt), highlight: true },
          { label: "Remaining to Raise", value: formatCurrency(remainingToRaise) },
          { label: "Fund Validation", value: `${v.anchorPct}% committed` },
          { label: "Target Return", value: `${v.targetReturn}%` }
        );
        break;
      }

      case "tiered-fund": {
        const juniorAmt = v.fundSize * v.juniorPct / 100;
        const mezzAmt = v.fundSize * v.mezzPct / 100;
        const seniorAmt = v.fundSize - juniorAmt - mezzAmt;
        const lossAmt = v.fundSize * v.portfolioLoss / 100;
        const juniorLoss = Math.min(lossAmt, juniorAmt);
        const mezzLoss = Math.min(Math.max(0, lossAmt - juniorAmt), mezzAmt);
        const seniorLoss = Math.max(0, lossAmt - juniorAmt - mezzAmt);
        results.push(
          { label: "Junior Tranche Loss", value: formatCurrency(juniorLoss), highlight: juniorLoss > 0 },
          { label: "Mezzanine Loss", value: formatCurrency(mezzLoss), highlight: mezzLoss > 0 },
          { label: "Senior Loss", value: formatCurrency(seniorLoss), highlight: seniorLoss > 0 },
          { label: "Total Portfolio Loss", value: formatCurrency(lossAmt) },
          { label: "Senior Protected?", value: seniorLoss === 0 ? "Yes" : "No" }
        );
        break;
      }

      case "technical-assistance": {
        const taAmount = v.fundSize * v.taPct / 100;
        results.push(
          { label: "TA Facility Size", value: formatCurrency(taAmount), highlight: true },
          { label: "As % of Fund", value: `${v.taPct}%` },
          { label: "Cost to Investees", value: "$0 (grant-funded)" }
        );
        break;
      }

      case "pay-for-success": {
        const returnIfSuccess = v.amount * v.returnOnSuccess / 100;
        const expectedVal = (v.successProb / 100) * returnIfSuccess + ((100 - v.successProb) / 100) * (-v.amount);
        const govPayment = v.amount + returnIfSuccess;
        results.push(
          { label: "Expected Value to Investor", value: formatCurrency(expectedVal), highlight: true },
          { label: "If Outcomes Met: Return", value: formatCurrency(returnIfSuccess) },
          { label: "If Outcomes Fail: Loss", value: formatCurrency(v.amount) },
          { label: "Government Pays (if success)", value: formatCurrency(govPayment) }
        );
        break;
      }

      case "offtake-backed": {
        const debtAmt = v.projectCost * v.debtPct / 100;
        const equityAmt = v.projectCost - debtAmt;
        const annualDebtService = debtAmt * v.interestRate / 100;
        results.push(
          { label: "Debt Amount", value: formatCurrency(debtAmt), highlight: true },
          { label: "Equity Required", value: formatCurrency(equityAmt) },
          { label: "Annual Debt Service", value: formatCurrency(annualDebtService) },
          { label: "Contract Length", value: `${v.contractLength} years` },
          { label: "Total Interest", value: formatCurrency(annualDebtService * v.contractLength) }
        );
        break;
      }

      case "doe-lpo": {
        const annualInterest = v.loanAmount * v.rate / 100;
        const commercialInterest = v.loanAmount * v.commercialRate / 100;
        const annualSavings = commercialInterest - annualInterest;
        const totalSavings = annualSavings * v.term;
        results.push(
          { label: "Annual Interest (DOE)", value: formatCurrency(annualInterest), highlight: true },
          { label: "Annual Interest (Commercial)", value: formatCurrency(commercialInterest) },
          { label: "Annual Savings", value: formatCurrency(annualSavings) },
          { label: `Total Savings (${v.term}yr)`, value: formatCurrency(totalSavings) },
          { label: "Rate Advantage", value: `${((v.commercialRate - v.rate) * 100).toFixed(0)} bps` }
        );
        break;
      }

      case "ira-tax-credits": {
        const creditVal = v.projectCost * v.creditPct / 100;
        const cashReceived = creditVal * v.transferPrice / 100;
        const transferDiscount = creditVal - cashReceived;
        results.push(
          { label: "Credit Value", value: formatCurrency(creditVal), highlight: true },
          { label: "Cash if Transferred", value: formatCurrency(cashReceived) },
          { label: "Transfer Discount", value: formatCurrency(transferDiscount) },
          { label: "Effective Project Cost Reduction", value: `${v.creditPct}%` }
        );
        break;
      }

      case "oced-grants": {
        const grantAmt = v.totalProject * v.grantPct / 100;
        const privateAmt = v.totalProject * v.privatePct / 100;
        results.push(
          { label: "Government Grant", value: formatCurrency(grantAmt), highlight: true },
          { label: "Private Cost-Share", value: formatCurrency(privateAmt) },
          { label: "Cost of Grant Capital", value: "0%" },
          { label: "Required Match", value: `${v.privatePct}%` }
        );
        break;
      }

      default:
        results.push({ label: "Calculator", value: "Coming soon" });
    }

    return results;
  }, [values, instrument.id]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-4">
          Adjust Parameters
        </h4>
        <div className="space-y-5">
          {params.map((param) => (
            <ParamInput
              key={param.id}
              param={param}
              value={values[param.id]}
              onChange={(v) => updateValue(param.id, v)}
            />
          ))}
        </div>
      </div>

      {/* Outputs */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Calculated Outputs
        </h4>
        <div className="space-y-2">
          {outputs.map((out, i) => (
            <motion.div
              key={out.label}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center justify-between p-3 rounded-xl ${
                out.highlight
                  ? "bg-white border-2 shadow-sm"
                  : "bg-surface-secondary"
              }`}
              style={
                out.highlight
                  ? { borderColor: `${color}40` }
                  : undefined
              }
            >
              <span className="text-sm text-text-secondary">{out.label}</span>
              <span
                className={`text-sm font-bold tabular-nums ${
                  out.highlight ? "" : "text-foreground"
                }`}
                style={out.highlight ? { color } : undefined}
              >
                {out.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Formula */}
      <div className="bg-surface-secondary rounded-xl p-4">
        <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-1">
          Formula
        </div>
        <div className="text-sm text-text-secondary leading-relaxed">
          {instrument.costFormula}
        </div>
      </div>
    </div>
  );
}
