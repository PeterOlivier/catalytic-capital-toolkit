"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stackInstruments } from "@/data/stackInstruments";
import { StackLayer } from "@/data/types";
import {
  Plus,
  X,
  DollarSign,
  Layers,
  ChevronDown,
  ChevronUp,
  Percent,
  Clock,
  BarChart3,
  Calendar,
} from "lucide-react";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const NOW = new Date();
const CURRENT_YEAR = NOW.getFullYear();
const CURRENT_MONTH = NOW.getMonth() + 1; // 1-12

function formatCurrency(val: number): string {
  if (val >= 1e9) return `$${(val / 1e9).toFixed(val % 1e9 === 0 ? 0 : 1)}B`;
  if (val >= 1e6) return `$${(val / 1e6).toFixed(val % 1e6 === 0 ? 0 : 1)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(0)}K`;
  return `$${val.toFixed(0)}`;
}

function formatCompact(val: number): string {
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(1)}K`;
  return `$${val.toFixed(0)}`;
}

/** Convert year+month to absolute month index (months since year 0) */
function toAbsMonth(year: number, month: number): number {
  return year * 12 + (month - 1);
}

function fromAbsMonth(abs: number): { year: number; month: number } {
  const year = Math.floor(abs / 12);
  const month = (abs % 12) + 1;
  return { year, month };
}

function formatDate(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`;
}

// Monthly payment for an amortizing loan
function amortizingPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0 || months === 0) return months > 0 ? principal / months : 0;
  const r = annualRate / 100 / 12;
  return (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
}

// Generate monthly payment schedule for a layer (relative months 1..N)
function generateSchedule(
  layer: StackLayer,
  def: typeof stackInstruments[number]
): { month: number; principal: number; interest: number; total: number; balance: number }[] {
  if (def.isEquity || def.isGrant || layer.amount === 0) return [];

  // Revenue-Based Financing
  if (def.repaymentType === "revenue-based") {
    const monthlyRev = layer.monthlyRevenue ?? 0;
    const sharePct = layer.revenueSharePct ?? def.defaultRevenueShare ?? 5;
    const capX = layer.repaymentCapX ?? def.defaultCapMultiple ?? 1.5;
    if (monthlyRev <= 0 || sharePct <= 0) return [];

    const totalCap = layer.amount * capX;
    const monthlyPayment = monthlyRev * (sharePct / 100);
    const premium = totalCap - layer.amount; // total "interest" equivalent
    const schedule: { month: number; principal: number; interest: number; total: number; balance: number }[] = [];
    let remaining = totalCap;

    for (let m = 1; remaining > 0.01; m++) {
      const total = Math.min(monthlyPayment, remaining);
      // Split proportionally: principal portion vs premium portion
      const principalPortion = total * (layer.amount / totalCap);
      const premiumPortion = total - principalPortion;
      remaining -= total;
      schedule.push({
        month: m,
        principal: principalPortion,
        interest: premiumPortion,
        total,
        balance: Math.max(0, remaining),
      });
      if (m > 600) break; // safety cap at 50 years
    }
    return schedule;
  }

  // Standard debt
  if (layer.termMonths === 0) return [];
  const months = layer.termMonths;
  const annualRate = layer.rate;
  const r = annualRate / 100 / 12;
  const schedule: { month: number; principal: number; interest: number; total: number; balance: number }[] = [];
  let balance = layer.amount;

  for (let m = 1; m <= months; m++) {
    const interest = balance * r;

    if (def.repaymentType === "amortizing") {
      const total = amortizingPayment(layer.amount, annualRate, months);
      const principal = total - interest;
      balance -= principal;
      schedule.push({ month: m, principal, interest, total, balance: Math.max(0, balance) });
    } else if (def.repaymentType === "interest-only" || def.repaymentType === "bullet") {
      const principal = m === months ? layer.amount : 0;
      const total = interest + principal;
      if (m === months) balance = 0;
      schedule.push({ month: m, principal, interest, total, balance });
    }
  }

  return schedule;
}

export default function CalculatorPage() {
  const [layers, setLayers] = useState<StackLayer[]>([
    { instrumentId: "sba-loan", amount: 2000000, rate: 6.5, termMonths: 120, startYear: CURRENT_YEAR - 4, startMonth: 7 },
    { instrumentId: "equipment-financing", amount: 1500000, rate: 7.0, termMonths: 60, startYear: CURRENT_YEAR - 1, startMonth: 11 },
    { instrumentId: "standard-equity", amount: 2500000, rate: 0, termMonths: 0, startYear: CURRENT_YEAR - 3, startMonth: 1 },
    { instrumentId: "stack-grant", amount: 350000, rate: 0, termMonths: 0, startYear: CURRENT_YEAR - 2, startMonth: 6 },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [hoveredChartIdx, setHoveredChartIdx] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [expandedLayer, setExpandedLayer] = useState<number | null>(0);

  const totalAllocated = layers.reduce((sum, l) => sum + l.amount, 0);

  const addLayer = (instrumentId: string) => {
    const def = stackInstruments.find((s) => s.id === instrumentId)!;
    const newLayer: StackLayer = {
      instrumentId,
      amount: 500000,
      rate: def.defaultRate,
      termMonths: def.defaultTerm,
      startYear: CURRENT_YEAR,
      startMonth: CURRENT_MONTH,
    };
    if (def.repaymentType === "revenue-based") {
      newLayer.monthlyRevenue = 200000;
      newLayer.revenueSharePct = def.defaultRevenueShare ?? 5;
      newLayer.repaymentCapX = def.defaultCapMultiple ?? 1.5;
    }
    setLayers([...layers, newLayer]);
    setShowAdd(false);
    setExpandedLayer(layers.length);
  };

  const removeLayer = (idx: number) => {
    setLayers(layers.filter((_, i) => i !== idx));
    if (expandedLayer === idx) setExpandedLayer(null);
    else if (expandedLayer !== null && expandedLayer > idx) setExpandedLayer(expandedLayer - 1);
  };

  const updateLayer = (idx: number, updates: Partial<StackLayer>) => {
    setLayers(layers.map((l, i) => (i === idx ? { ...l, ...updates } : l)));
  };

  // Payment schedules for each layer
  const layerSchedules = useMemo(() => {
    return layers.map((layer) => {
      const def = stackInstruments.find((s) => s.id === layer.instrumentId)!;
      return {
        layer,
        def,
        schedule: generateSchedule(layer, def),
      };
    });
  }, [layers]);

  // Compute absolute month range across all layers
  const { absStart, absEnd } = useMemo(() => {
    let earliest = Infinity;
    let latest = -Infinity;
    layerSchedules.forEach((ls) => {
      if (ls.schedule.length === 0) return;
      const start = toAbsMonth(ls.layer.startYear, ls.layer.startMonth);
      earliest = Math.min(earliest, start);
      latest = Math.max(latest, start + ls.schedule.length - 1);
    });
    if (earliest === Infinity) {
      earliest = toAbsMonth(CURRENT_YEAR, CURRENT_MONTH);
      latest = earliest;
    }
    return { absStart: earliest, absEnd: latest };
  }, [layerSchedules]);

  const totalMonths = absEnd - absStart + 1;

  // Debt layer defs for chart
  const debtLayerDefs = useMemo(() => {
    return layerSchedules
      .filter((ls) => !ls.def.isEquity && !ls.def.isGrant && ls.schedule.length > 0)
      .map((ls) => ({
        id: ls.layer.instrumentId,
        name: ls.def.shortName,
        color: ls.def.color,
      }));
  }, [layerSchedules]);

  // Monthly totals for chart using absolute months
  const chartData = useMemo(() => {
    if (totalMonths <= 1) return [];
    const step = Math.max(1, Math.floor(totalMonths / 80));
    const data: { absMonth: number; payments: Record<string, number>; total: number; amountRaised: number }[] = [];

    for (let abs = absStart; abs <= absEnd; abs += step) {
      const payments: Record<string, number> = {};
      let total = 0;
      let raised = 0;
      layerSchedules.forEach((ls) => {
        const layerAbsStart = toAbsMonth(ls.layer.startYear, ls.layer.startMonth);
        // Cumulative amount raised: count layer if its start date <= current month
        if (abs >= layerAbsStart) {
          raised += ls.layer.amount;
        }
        if (ls.schedule.length === 0) return;
        const relativeMonth = abs - layerAbsStart + 1; // 1-indexed
        if (relativeMonth < 1 || relativeMonth > ls.schedule.length) {
          payments[ls.layer.instrumentId] = 0;
          return;
        }
        const entry = ls.schedule[relativeMonth - 1];
        // Exclude balloon payments from chart to keep scale readable
        const isLastMonth = relativeMonth === ls.layer.termMonths;
        const val = isLastMonth && (ls.def.repaymentType === "bullet" || ls.def.repaymentType === "interest-only")
          ? entry.interest
          : entry.total;
        payments[ls.layer.instrumentId] = val;
        total += val;
      });
      data.push({ absMonth: abs, payments, total, amountRaised: raised });
    }
    return data;
  }, [layerSchedules, absStart, absEnd, totalMonths]);

  const chartMaxPayment = useMemo(() => {
    return Math.max(1, ...chartData.map((d) => d.total));
  }, [chartData]);

  const chartMaxRaised = useMemo(() => {
    return Math.max(1, ...chartData.map((d) => d.amountRaised));
  }, [chartData]);

  const handleChartMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current || chartData.length === 0) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round((x / rect.width) * (chartData.length - 1));
    setHoveredChartIdx(Math.max(0, Math.min(chartData.length - 1, idx)));
  }, [chartData.length]);

  // Summary stats
  const summaryStats = useMemo(() => {
    let totalInterest = 0;
    let totalPayments = 0;
    const perLayer: {
      id: string;
      name: string;
      color: string;
      monthlyPayment: number;
      totalInterest: number;
      totalPayments: number;
      isDebt: boolean;
    }[] = [];

    layerSchedules.forEach((ls) => {
      const isDebt = !ls.def.isEquity && !ls.def.isGrant;
      const layerInterest = ls.schedule.reduce((s, e) => s + e.interest, 0);
      const layerTotal = ls.schedule.reduce((s, e) => s + e.total, 0);
      const initPayment = ls.schedule.length > 0 ? ls.schedule[0].total : 0;

      totalInterest += layerInterest;
      totalPayments += layerTotal;

      perLayer.push({
        id: ls.layer.instrumentId,
        name: ls.def.shortName,
        color: ls.def.color,
        monthlyPayment: initPayment,
        totalInterest: layerInterest,
        totalPayments: layerTotal,
        isDebt,
      });
    });

    const debtLayers = perLayer.filter((l) => l.isDebt);
    const totalMonthly = debtLayers.reduce((s, l) => s + l.monthlyPayment, 0);

    const debtAmount = layers.reduce((s, l) => {
      const def = stackInstruments.find((d) => d.id === l.instrumentId)!;
      return def.isEquity || def.isGrant ? s : s + l.amount;
    }, 0);
    const weightedRate = debtAmount > 0
      ? layers.reduce((s, l) => {
          const def = stackInstruments.find((d) => d.id === l.instrumentId)!;
          return def.isEquity || def.isGrant ? s : s + (l.rate * l.amount) / debtAmount;
        }, 0)
      : 0;

    return { totalInterest, totalPayments, totalMonthly, weightedRate, perLayer, debtAmount };
  }, [layerSchedules, layers]);

  const groupedAvailable = useMemo(() => {
    const groups: Record<string, typeof stackInstruments> = {};
    stackInstruments.forEach((inst) => {
      const label =
        inst.category === "conventional"
          ? "Conventional"
          : inst.category === "equity"
          ? "Equity"
          : "Catalytic / Alternative";
      if (!groups[label]) groups[label] = [];
      groups[label].push(inst);
    });
    return groups;
  }, []);

  // Year options for select: current year - 1 to current year + 10
  const yearOptions = Array.from({ length: CURRENT_YEAR - 2010 + 11 }, (_, i) => 2010 + i);

  // X-axis labels for the chart
  const xAxisLabels = useMemo(() => {
    if (chartData.length === 0) return [];
    const first = chartData[0].absMonth;
    const last = chartData[chartData.length - 1].absMonth;
    const mid = Math.round((first + last) / 2);
    const labels: { absMonth: number; label: string }[] = [];
    const f = fromAbsMonth(first);
    labels.push({ absMonth: first, label: formatDate(f.year, f.month) });
    if (last - first >= 24) {
      const m = fromAbsMonth(mid);
      labels.push({ absMonth: mid, label: formatDate(m.year, m.month) });
    }
    const l = fromAbsMonth(last);
    labels.push({ absMonth: last, label: formatDate(l.year, l.month) });
    return labels;
  }, [chartData]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/6 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              Interactive capital stack modeler
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5">
              Build <em className="text-accent italic">Your</em> Capital Stack
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Mix conventional and catalytic instruments, adjust rates, terms,
              and timing — then see monthly payments and total cost of debt
              over time.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-8">
        {/* Payment Timeline Chart */}
        {debtLayerDefs.length > 0 && chartData.length > 1 && (
          <div className="mb-8 bg-surface rounded-2xl border border-border p-5">
            <h3 className="text-sm font-semibold text-text-secondary mb-2">
              Debt Payment Schedule Over Time
            </h3>
            <p className="text-xs text-text-tertiary mb-4">
              Stacked monthly payments across all debt instruments, showing how debt service changes as loans are paid off.
            </p>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {debtLayerDefs.map((d) => (
                <div key={d.id} className="flex items-center gap-1.5 text-xs text-text-secondary">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />
                  {d.name}
                </div>
              ))}
<div className="flex items-center gap-1.5 text-xs text-text-secondary">
                <div className="w-3 h-0.5 rounded-full bg-accent" />
                Amount Raised
              </div>
            </div>

            {/* SVG stacked area chart */}
            <div className="flex">
              {/* Left Y-axis labels (payments) */}
              <div className="flex flex-col justify-between pr-2 py-1 flex-shrink-0" style={{ height: "250px" }}>
                <span className="text-[10px] text-text-tertiary tabular-nums text-right">{formatCompact(chartMaxPayment)}</span>
                <span className="text-[10px] text-text-tertiary tabular-nums text-right">{formatCompact(chartMaxPayment * 0.75)}</span>
                <span className="text-[10px] text-text-tertiary tabular-nums text-right">{formatCompact(chartMaxPayment / 2)}</span>
                <span className="text-[10px] text-text-tertiary tabular-nums text-right">{formatCompact(chartMaxPayment * 0.25)}</span>
                <span className="text-[10px] text-text-tertiary text-right">$0</span>
              </div>

              {/* Chart area */}
              <div
                ref={chartRef}
                className="flex-1 relative cursor-crosshair"
                style={{ height: "250px" }}
                onMouseMove={handleChartMouseMove}
                onMouseLeave={() => setHoveredChartIdx(null)}
              >
                <svg
                  viewBox={`0 0 ${chartData.length} 100`}
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  {/* Grid lines */}
                  <line x1="0" y1="25" x2={chartData.length} y2="25" stroke="#e2e8f0" strokeWidth="0.3" />
                  <line x1="0" y1="50" x2={chartData.length} y2="50" stroke="#e2e8f0" strokeWidth="0.3" />
                  <line x1="0" y1="75" x2={chartData.length} y2="75" stroke="#e2e8f0" strokeWidth="0.3" />

                  {/* Stacked areas */}
                  {debtLayerDefs.map((layerDef, layerIdx) => {
                    const points = chartData.map((d, i) => {
                      let yBottom = 0;
                      for (let j = 0; j < layerIdx; j++) {
                        yBottom += (d.payments[debtLayerDefs[j].id] || 0) / chartMaxPayment * 100;
                      }
                      const yTop = yBottom + (d.payments[layerDef.id] || 0) / chartMaxPayment * 100;
                      return { x: i, yBottom, yTop };
                    });

                    const topLine = points.map((p) => `${p.x},${100 - p.yTop}`).join(" ");
                    const bottomLine = [...points].reverse().map((p) => `${p.x},${100 - p.yBottom}`).join(" ");

                    return (
                      <polygon
                        key={layerDef.id}
                        points={`${topLine} ${bottomLine}`}
                        fill={layerDef.color}
                        opacity={0.75}
                      />
                    );
                  })}

                  {/* Amount raised line (right Y-axis) */}
                  <polyline
                    points={chartData.map((d, i) => `${i},${100 - (d.amountRaised / chartMaxRaised) * 100}`).join(" ")}
                    fill="none"
                    stroke="#b8763e"
                    strokeWidth="0.8"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Crosshair line */}
                  {hoveredChartIdx !== null && (
                    <line
                      x1={hoveredChartIdx}
                      y1={0}
                      x2={hoveredChartIdx}
                      y2={100}
                      stroke="#334155"
                      strokeWidth="0.4"
                      strokeDasharray="1,1"
                    />
                  )}
                </svg>

                {/* Tooltip */}
                {hoveredChartIdx !== null && chartData[hoveredChartIdx] && (() => {
                  const d = chartData[hoveredChartIdx];
                  const { year, month } = fromAbsMonth(d.absMonth);
                  const pctX = hoveredChartIdx / (chartData.length - 1);
                  const flipsLeft = pctX > 0.7;
                  return (
                    <div
                      className="absolute top-2 pointer-events-none z-10"
                      style={{ left: flipsLeft ? undefined : `${pctX * 100}%`, right: flipsLeft ? `${(1 - pctX) * 100}%` : undefined, marginLeft: flipsLeft ? undefined : "12px", marginRight: flipsLeft ? "12px" : undefined }}
                    >
                      <div className="bg-foreground/95 text-white rounded-lg px-3 py-2 text-xs shadow-lg whitespace-nowrap">
                        <div className="font-semibold mb-1.5">{formatDate(year, month)}</div>
                        {/* Debt layers — monthly payments */}
                        {debtLayerDefs.map((ld) => {
                          const val = d.payments[ld.id] || 0;
                          if (val <= 0) return null;
                          return (
                            <div key={ld.id} className="flex items-center justify-between gap-4 py-0.5">
                              <div className="flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: ld.color }} />
                                <span className="opacity-80">{ld.name}</span>
                              </div>
                              <span className="font-medium tabular-nums">{formatCompact(val)}</span>
                            </div>
                          );
                        })}
                        <div className="flex items-center justify-between gap-4 pt-1 mt-1 border-t border-white/20 font-semibold">
                          <span>Total Payment</span>
                          <span className="tabular-nums">{formatCompact(d.total)}</span>
                        </div>
                        {/* Capital raised — grouped by type */}
                        {(() => {
                          const active = layerSchedules.filter((ls) => d.absMonth >= toAbsMonth(ls.layer.startYear, ls.layer.startMonth));
                          const debt = active.filter((ls) => !ls.def.isEquity && !ls.def.isGrant).reduce((s, ls) => s + ls.layer.amount, 0);
                          const equity = active.filter((ls) => ls.def.isEquity).reduce((s, ls) => s + ls.layer.amount, 0);
                          const grants = active.filter((ls) => ls.def.isGrant).reduce((s, ls) => s + ls.layer.amount, 0);
                          const categories = [
                            { label: "Debt", amount: debt, color: "#4a7b8f" },
                            { label: "Equity", amount: equity, color: "#b05445" },
                            { label: "Grants", amount: grants, color: "#7b6b9e" },
                          ].filter((c) => c.amount > 0);
                          return (
                            <div className="pt-1.5 mt-1.5 border-t border-white/30">
                              {categories.map((c) => (
                                <div key={c.label} className="flex items-center justify-between gap-4 py-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: c.color }} />
                                    <span className="opacity-80">{c.label}</span>
                                  </div>
                                  <span className="font-medium tabular-nums">{formatCompact(c.amount)}</span>
                                </div>
                              ))}
                              <div className="flex items-center justify-between gap-4 pt-1 mt-1 border-t border-white/20 font-semibold">
                                <span>Total Raised</span>
                                <span className="tabular-nums">{formatCompact(d.amountRaised)}</span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Right Y-axis labels (amount raised) */}
              <div className="flex flex-col justify-between pl-2 py-1 flex-shrink-0" style={{ height: "250px" }}>
                <span className="text-[10px] text-amber-500 tabular-nums">{formatCompact(chartMaxRaised)}</span>
                <span className="text-[10px] text-amber-500 tabular-nums">{formatCompact(chartMaxRaised * 0.75)}</span>
                <span className="text-[10px] text-amber-500 tabular-nums">{formatCompact(chartMaxRaised / 2)}</span>
                <span className="text-[10px] text-amber-500 tabular-nums">{formatCompact(chartMaxRaised * 0.25)}</span>
                <span className="text-[10px] text-amber-500">$0</span>
              </div>
            </div>

            {/* X-axis with date labels */}
            <div className="flex justify-between mt-2 mx-12">
              {xAxisLabels.map((label, i) => (
                <span key={i} className="text-[10px] text-text-tertiary">{label.label}</span>
              ))}
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Total Raised</div>
                <div className="text-lg font-bold text-foreground tabular-nums">{formatCompact(totalAllocated)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Total Debt</div>
                <div className="text-lg font-bold text-foreground tabular-nums">{formatCompact(summaryStats.debtAmount)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Total Interest</div>
                <div className="text-lg font-bold text-danger tabular-nums">{formatCompact(summaryStats.totalInterest)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Wtd. Blended Cost</div>
                <div className="text-lg font-bold text-foreground tabular-nums">{summaryStats.weightedRate.toFixed(2)}%</div>
              </div>
            </div>
          </div>
        )}

        <div>
          {/* Stack builder */}
          <div className="space-y-4">
            <div className="mb-1">
              <h3 className="font-heading text-sm font-semibold text-foreground">
                Capital Stack ({layers.length} layers)
              </h3>
            </div>

            {/* Layer cards */}
            <AnimatePresence>
              {layers.map((layer, idx) => {
                const def = stackInstruments.find((s) => s.id === layer.instrumentId)!;
                const isExpanded = expandedLayer === idx;
                const isDebt = !def.isEquity && !def.isGrant;
                const isRBF = def.repaymentType === "revenue-based";
                const sched = isDebt ? generateSchedule(layer, def) : [];
                const monthlyPayment = sched.length > 0 ? sched[0].total : 0;

                return (
                  <motion.div
                    key={`${layer.instrumentId}-${idx}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-surface rounded-xl border border-border overflow-hidden"
                  >
                    {/* Header */}
                    <div
                      className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-secondary/50 transition-colors"
                      onClick={() => setExpandedLayer(isExpanded ? null : idx)}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-3 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: def.color }} />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-foreground truncate">{def.shortName}</div>
                          <div className="text-xs text-text-tertiary">
                            {formatCurrency(layer.amount)}
                            {isRBF && (
                              <span>
                                {" "}&middot; {layer.revenueSharePct ?? def.defaultRevenueShare}% of rev &middot; {layer.repaymentCapX ?? def.defaultCapMultiple}x cap
                                {" "}&middot; {MONTH_NAMES[layer.startMonth - 1]} {layer.startYear}
                              </span>
                            )}
                            {isDebt && !isRBF && (
                              <span>
                                {" "}&middot; {layer.rate}% &middot; {Math.round(layer.termMonths / 12)}yr
                                {" "}&middot; {MONTH_NAMES[layer.startMonth - 1]} {layer.startYear}
                              </span>
                            )}
                            {def.isEquity && <span> &middot; No debt service &middot; {MONTH_NAMES[layer.startMonth - 1]} {layer.startYear}</span>}
                            {def.isGrant && <span> &middot; No repayment &middot; {MONTH_NAMES[layer.startMonth - 1]} {layer.startYear}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {isDebt && sched.length > 0 && (
                          <div className="flex items-center gap-5 text-right hidden sm:flex">
                            <div>
                              <div className="text-[10px] text-text-tertiary">Monthly Payment</div>
                              <div className="text-xs font-semibold text-foreground tabular-nums">{formatCompact(monthlyPayment)}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-text-tertiary">{isRBF ? "Total Premium" : "Total Interest"}</div>
                              <div className="text-xs font-semibold text-danger tabular-nums">{formatCompact(sched.reduce((s, e) => s + e.interest, 0))}</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-text-tertiary">Total Paid</div>
                              <div className="text-xs font-semibold text-foreground tabular-nums">{formatCompact(sched.reduce((s, e) => s + e.total, 0))}</div>
                            </div>
                          </div>
                        )}
                        <button
                          onClick={(e) => { e.stopPropagation(); removeLayer(idx); }}
                          className="p-1.5 rounded-lg hover:bg-danger/10 text-text-tertiary hover:text-danger transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-text-tertiary" /> : <ChevronDown className="w-4 h-4 text-text-tertiary" />}
                      </div>
                    </div>

                    {/* Expanded */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-border"
                        >
                          <div className="p-4 space-y-4">
                            <p className="text-xs text-text-tertiary leading-relaxed">{def.description}</p>

                            {/* Amount */}
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-medium text-text-secondary">
                                  Amount
                                </label>
                                <span className="text-sm font-bold text-foreground tabular-nums">{formatCurrency(layer.amount)}</span>
                              </div>
                              <input type="range" min={100000} max={100000000} step={100000} value={layer.amount}
                                onChange={(e) => updateLayer(idx, { amount: Number(e.target.value) })} className="w-full" />
                            </div>

                            {/* RBF-specific controls */}
                            {isRBF && (
                              <>
                                {/* Monthly Revenue */}
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-medium text-text-secondary">
                                      Est. Monthly Revenue
                                    </label>
                                    <span className="text-sm font-bold text-foreground tabular-nums">
                                      {formatCurrency(layer.monthlyRevenue ?? 0)}
                                    </span>
                                  </div>
                                  <input type="range" min={10000} max={10000000} step={10000}
                                    value={layer.monthlyRevenue ?? 200000}
                                    onChange={(e) => updateLayer(idx, { monthlyRevenue: Number(e.target.value) })} className="w-full" />
                                  <div className="flex justify-between text-[10px] text-text-tertiary">
                                    <span>$10K</span>
                                    <span>$10M</span>
                                  </div>
                                </div>

                                {/* Revenue Share % */}
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-medium text-text-secondary">
                                      Revenue Share
                                    </label>
                                    <span className="text-sm font-bold text-foreground tabular-nums">
                                      {layer.revenueSharePct ?? def.defaultRevenueShare}%
                                    </span>
                                  </div>
                                  <input type="range"
                                    min={def.revenueShareRange?.[0] ?? 2}
                                    max={def.revenueShareRange?.[1] ?? 15}
                                    step={0.5}
                                    value={layer.revenueSharePct ?? def.defaultRevenueShare ?? 5}
                                    onChange={(e) => updateLayer(idx, { revenueSharePct: Number(e.target.value) })} className="w-full" />
                                  <div className="flex justify-between text-[10px] text-text-tertiary">
                                    <span>{def.revenueShareRange?.[0] ?? 2}%</span>
                                    <span>{def.revenueShareRange?.[1] ?? 15}%</span>
                                  </div>
                                </div>

                                {/* Repayment Cap */}
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-medium text-text-secondary">
                                      Repayment Cap
                                    </label>
                                    <span className="text-sm font-bold text-foreground tabular-nums">
                                      {(layer.repaymentCapX ?? def.defaultCapMultiple ?? 1.5).toFixed(1)}x ({formatCurrency(layer.amount * (layer.repaymentCapX ?? def.defaultCapMultiple ?? 1.5))})
                                    </span>
                                  </div>
                                  <input type="range"
                                    min={def.capMultipleRange?.[0] ?? 1.1}
                                    max={def.capMultipleRange?.[1] ?? 3.0}
                                    step={0.1}
                                    value={layer.repaymentCapX ?? def.defaultCapMultiple ?? 1.5}
                                    onChange={(e) => updateLayer(idx, { repaymentCapX: Number(e.target.value) })} className="w-full" />
                                  <div className="flex justify-between text-[10px] text-text-tertiary">
                                    <span>{def.capMultipleRange?.[0] ?? 1.1}x</span>
                                    <span>{def.capMultipleRange?.[1] ?? 3.0}x</span>
                                  </div>
                                </div>

                                {/* Computed term */}
                                {sched.length > 0 && (
                                  <div className="text-xs text-text-tertiary bg-surface-secondary rounded-lg px-3 py-2">
                                    Est. payoff in <span className="font-semibold text-foreground">
                                      {sched.length >= 12
                                        ? `${(sched.length / 12).toFixed(1)} years`
                                        : `${sched.length} months`}
                                    </span> at current revenue
                                  </div>
                                )}
                              </>
                            )}

                            {/* Rate (standard debt only) */}
                            {isDebt && !isRBF && (
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-xs font-medium text-text-secondary">
                                    Annual Interest Rate
                                  </label>
                                  <span className="text-sm font-bold text-foreground tabular-nums">{layer.rate}%</span>
                                </div>
                                <input type="range" min={def.rateRange[0]} max={def.rateRange[1]} step={0.25} value={layer.rate}
                                  onChange={(e) => updateLayer(idx, { rate: Number(e.target.value) })} className="w-full" />
                                <div className="flex justify-between text-[10px] text-text-tertiary">
                                  <span>{def.rateRange[0]}%</span>
                                  <span>{def.rateRange[1]}%</span>
                                </div>
                              </div>
                            )}

                            {/* Term (standard debt only) */}
                            {isDebt && !isRBF && (
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-xs font-medium text-text-secondary">
                                    Loan Term
                                  </label>
                                  <span className="text-sm font-bold text-foreground tabular-nums">
                                    {layer.termMonths >= 12
                                      ? `${(layer.termMonths / 12).toFixed(layer.termMonths % 12 === 0 ? 0 : 1)} years`
                                      : `${layer.termMonths} months`}
                                  </span>
                                </div>
                                <input type="range" min={def.termRange[0]} max={def.termRange[1]} step={6} value={layer.termMonths}
                                  onChange={(e) => updateLayer(idx, { termMonths: Number(e.target.value) })} className="w-full" />
                                <div className="flex justify-between text-[10px] text-text-tertiary">
                                  <span>{Math.round(def.termRange[0] / 12)}yr</span>
                                  <span>{Math.round(def.termRange[1] / 12)}yr</span>
                                </div>
                              </div>
                            )}

                            {/* Start Date */}
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-medium text-text-secondary">
                                  Start Date
                                </label>
                                <span className="text-sm font-bold text-foreground">
                                  {MONTH_NAMES[layer.startMonth - 1]} {layer.startYear}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <select
                                  value={layer.startMonth}
                                  onChange={(e) => updateLayer(idx, { startMonth: Number(e.target.value) })}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-sm text-foreground focus:outline-none focus:border-accent/40"
                                >
                                  {MONTH_NAMES.map((name, i) => (
                                    <option key={i} value={i + 1}>{name}</option>
                                  ))}
                                </select>
                                <select
                                  value={layer.startYear}
                                  onChange={(e) => updateLayer(idx, { startYear: Number(e.target.value) })}
                                  className="flex-1 px-3 py-1.5 rounded-lg border border-border bg-surface-secondary text-sm text-foreground focus:outline-none focus:border-accent/40"
                                >
                                  {yearOptions.map((y) => (
                                    <option key={y} value={y}>{y}</option>
                                  ))}
                                </select>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Add instrument */}
            <div className="relative">
              <button
                onClick={() => setShowAdd(!showAdd)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-border hover:border-accent/30 text-text-secondary hover:text-accent text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Instrument
                <ChevronDown className={`w-4 h-4 transition-transform ${showAdd ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {showAdd && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-xl shadow-xl max-h-80 overflow-y-auto z-20"
                  >
                    {Object.entries(groupedAvailable).map(([group, items]) => (
                      <div key={group}>
                        <div className="px-4 py-2 text-[10px] uppercase tracking-wider font-semibold text-text-tertiary bg-surface-secondary border-b border-border">
                          {group}
                        </div>
                        {items.map((inst) => (
                          <button
                            key={inst.id}
                            onClick={() => addLayer(inst.id)}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-secondary text-left transition-colors border-b border-border last:border-0"
                          >
                            <div className="w-3 h-6 rounded-full flex-shrink-0" style={{ backgroundColor: inst.color }} />
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-foreground truncate">{inst.name}</div>
                              <div className="text-xs text-text-tertiary">
                                {inst.isEquity ? "Equity -- no debt service"
                                  : inst.isGrant ? "No repayment"
                                  : inst.repaymentType === "revenue-based"
                                  ? `${inst.defaultRevenueShare}% of revenue / ${inst.defaultCapMultiple}x cap`
                                  : `${inst.defaultRate}% / ${Math.round(inst.defaultTerm / 12)}yr / ${inst.repaymentType}`}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
