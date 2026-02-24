"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instrument } from "@/data/types";
import { categoryColorMap } from "./CategoryBadge";
import { AlertTriangle, ChevronRight, Play, RotateCcw } from "lucide-react";

// Lens 4: What Happens in Default — Interactive step-through
export function DefaultCascade({ instrument }: { instrument: Instrument }) {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
  const [autoPlay, setAutoPlay] = useState(false);
  const color = categoryColorMap[instrument.category];
  const steps = instrument.defaultSteps;

  const triggerDefault = () => {
    setCurrentStep(0);
    setAutoPlay(true);
  };

  const reset = () => {
    setCurrentStep(-1);
    setAutoPlay(false);
  };

  // Auto-advance timer
  const advance = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setAutoPlay(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Explanation + trigger */}
      {currentStep === -1 && (
        <div className="bg-surface-secondary rounded-xl p-4 border border-border">
          <p className="text-sm text-text-secondary leading-relaxed">
            Walk through what happens when this instrument enters default. Click the button below to simulate the cascade step by step.
          </p>
        </div>
      )}

      {/* Trigger button */}
      <div className="flex items-center gap-3">
        {currentStep === -1 ? (
          <button
            onClick={triggerDefault}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
          >
            <AlertTriangle className="w-4 h-4" />
            Trigger Default
          </button>
        ) : (
          <>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-secondary text-text-secondary font-medium text-sm hover:bg-border transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            {currentStep < steps.length - 1 && (
              <button
                onClick={advance}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-medium text-sm transition-colors"
                style={{ backgroundColor: color }}
              >
                Next Step
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </>
        )}
      </div>

      {/* Steps timeline */}
      <div className="relative">
        {steps.map((step, i) => {
          const isActive = i <= currentStep;
          const isCurrent = i === currentStep;

          return (
            <motion.div
              key={i}
              className="flex gap-4 mb-0"
              initial={false}
            >
              {/* Timeline line */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-500 ${
                    isActive
                      ? "text-white shadow-md"
                      : "bg-surface-secondary text-text-tertiary"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor:
                            step.lossAbsorber ? "#ef4444" : color,
                        }
                      : undefined
                  }
                  animate={
                    isCurrent
                      ? { scale: [1, 1.15, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                >
                  {step.step}
                </motion.div>
                {i < steps.length - 1 && (
                  <div
                    className={`w-0.5 h-full min-h-[40px] transition-colors duration-500 ${
                      i < currentStep ? "bg-red-300" : "bg-border"
                    }`}
                  />
                )}
              </div>

              {/* Step content */}
              <motion.div
                className={`flex-1 pb-6 transition-all duration-500 ${
                  isActive ? "opacity-100" : "opacity-30"
                }`}
                animate={
                  isCurrent
                    ? { x: [10, 0], opacity: [0.5, 1] }
                    : {}
                }
                transition={{ duration: 0.4 }}
              >
                <div className="bg-white border border-border rounded-xl p-4">
                  <h4
                    className={`text-sm font-semibold mb-1 ${
                      isCurrent ? "text-foreground" : "text-text-secondary"
                    }`}
                  >
                    {step.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                  {step.lossAbsorber && isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                      <span className="text-xs font-medium text-red-700">
                        Loss absorbed by: {step.lossAbsorber}
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Recovery summary */}
      <AnimatePresence>
        {currentStep === steps.length - 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-surface-secondary rounded-xl p-4 border border-border"
          >
            <div className="text-sm font-semibold text-foreground mb-1">
              Recovery Summary
            </div>
            <div className="text-sm text-text-secondary">
              Expected recovery rate:{" "}
              <span className="font-bold text-foreground">
                {instrument.recoveryRate}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
