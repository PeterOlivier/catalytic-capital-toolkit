"use client";

import { motion } from "framer-motion";
import { Instrument } from "@/data/types";
import { categoryColorMap } from "./CategoryBadge";

// Lens 2: Return Profile — Return spectrum with 0% centered
export function ReturnSpectrum({ instrument }: { instrument: Instrument }) {
  const color = categoryColorMap[instrument.category];
  const { min, expected, max } = instrument.financialReturn;

  // Map return values to position with 0% always at center (50%)
  // Left half scales independently from right half
  const absMin = Math.abs(min) || 1;
  const absMax = Math.abs(max) || 1;
  const mapToPos = (val: number) => {
    if (val === 0) return 50;
    if (val < 0) return 50 - (Math.abs(val) / absMin) * 45;
    return 50 + (val / absMax) * 45;
  };

  const minPos = mapToPos(min);
  const expectedPos = mapToPos(expected);
  const maxPos = mapToPos(max);

  return (
    <div className="space-y-8">
      {/* Return Spectrum */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-5">
          Financial Return Spectrum
        </h4>

        <div className="relative h-20">
          {/* Background track */}
          <div className="absolute inset-x-0 top-8 h-2 rounded-full bg-gradient-to-r from-red-100 via-gray-100 to-emerald-100" />

          {/* Range bar */}
          <motion.div
            className="absolute top-7 h-4 rounded-full"
            style={{
              backgroundColor: color,
              opacity: 0.2,
              left: `${minPos}%`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${maxPos - minPos}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {/* Zero line — always at center */}
          <div className="absolute top-4 w-px h-10 bg-foreground/20" style={{ left: "50%" }}>
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[11px] font-semibold text-text-secondary">
              0%
            </span>
          </div>

          {/* Min label */}
          {min !== expected && (
            <motion.div
              className="absolute top-[3.25rem] text-[10px] text-text-tertiary whitespace-nowrap"
              style={{ left: `${minPos}%`, transform: "translateX(-50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {min === -100 ? "Total Loss" : `${min}%`}
            </motion.div>
          )}

          {/* Max label */}
          {max !== expected && (
            <motion.div
              className="absolute top-[3.25rem] text-[10px] text-text-tertiary whitespace-nowrap"
              style={{ left: `${maxPos}%`, transform: "translateX(-50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {max}%
            </motion.div>
          )}

          {/* Expected marker */}
          <motion.div
            className="absolute top-5"
            style={{ left: `${expectedPos}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <div
              className="w-6 h-6 rounded-full border-[3px] border-white shadow-lg -translate-x-1/2"
              style={{ backgroundColor: color }}
            />
            <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
              <span className="text-xs font-bold" style={{ color }}>
                {expected === -100 ? "N/A" : `${expected}%`}
              </span>
              <span className="block text-[10px] text-text-tertiary">
                Expected
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Cost of capital summary */}
      <div className="bg-surface-secondary rounded-xl p-4">
        <div className="text-sm font-medium text-text-secondary mb-1">
          Cost of Capital Range
        </div>
        <div className="text-2xl font-bold" style={{ color }}>
          {instrument.costRange}
        </div>
        <div className="text-xs text-text-tertiary mt-1">
          {instrument.costFormula}
        </div>
      </div>

      {/* Non-financial returns */}
      <div>
        <h4 className="text-sm font-medium text-text-secondary mb-3">
          Non-Financial Returns
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {instrument.nonFinancialReturns.map((ret, i) => (
            <motion.div
              key={ret}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="text-sm text-foreground"
            >
              {ret}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
