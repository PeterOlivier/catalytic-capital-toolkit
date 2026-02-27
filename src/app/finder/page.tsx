"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { instruments } from "@/data/instruments";
import { InstrumentBadges } from "@/components/CategoryBadge";
import {
  questions,
  scoreInstruments,
  INITIAL_ANSWERS,
  FinderAnswers,
  Priority,
} from "@/data/finderQuestions";
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Compass,
  ChevronDown,
  ChevronUp,
  SkipForward,
  Sparkles,
  BookOpen,
} from "lucide-react";

// ============================================
// SPEED / COMPLEXITY DISPLAY (mirroring homepage)
// ============================================

const speedColors: Record<string, string> = {
  weeks: "bg-[#5a8a6e]/15 text-[#5a8a6e]",
  "1-3-months": "bg-[#5a8a6e]/10 text-[#5a8a6e]",
  "3-6-months": "bg-[#c9973a]/15 text-[#c9973a]",
  "6-12-months": "bg-[#b05445]/12 text-[#b05445]",
};
const speedLabels: Record<string, string> = {
  weeks: "Weeks", "1-3-months": "1–3 mo", "3-6-months": "3–6 mo", "6-12-months": "6–12+ mo",
};
const complexityColors: Record<string, string> = {
  low: "bg-[#5a8a6e]/15 text-[#5a8a6e]",
  medium: "bg-[#c9973a]/15 text-[#c9973a]",
  high: "bg-[#b05445]/12 text-[#b05445]",
};
const complexityLabels: Record<string, string> = {
  low: "Low", medium: "Medium", high: "High",
};

const tierConfig = {
  strong: { label: "Strong Matches", color: "text-[#5a8a6e]", bg: "bg-[#5a8a6e]/10", barColor: "bg-[#5a8a6e]" },
  good: { label: "Good Fits", color: "text-[#c9973a]", bg: "bg-[#c9973a]/10", barColor: "bg-[#c9973a]" },
  explore: { label: "Worth Exploring", color: "text-text-secondary", bg: "bg-surface-secondary", barColor: "bg-text-tertiary" },
};

// ============================================
// ANIMATION VARIANTS
// ============================================

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 120 : -120,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -120 : 120,
    opacity: 0,
  }),
};

// ============================================
// MAIN COMPONENT
// ============================================

const STORAGE_KEY = "cct-finder-state";

export default function FinderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({ ...INITIAL_ANSWERS });
  const [direction, setDirection] = useState(1);
  const [showRecap, setShowRecap] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Restore saved state after hydration
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.answers && typeof parsed.step === "number") {
          setAnswers(parsed.answers);
          setCurrentStep(parsed.step);
        }
      }
    } catch { /* ignore corrupt data */ }
    setHydrated(true);
  }, []);

  // Persist answers + step to localStorage (skip initial render)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step: currentStep }));
    } catch { /* storage full or unavailable */ }
  }, [answers, currentStep, hydrated]);

  const totalSteps = questions.length;
  const isResults = currentStep >= totalSteps;
  const currentQuestion = !isResults ? questions[currentStep] : null;

  // Score instruments from answers
  const results = useMemo(() => {
    if (!isResults) return [];
    return scoreInstruments(answers, instruments);
  }, [isResults, answers]);

  const strongMatches = results.filter(r => r.tier === "strong");
  const goodFits = results.filter(r => r.tier === "good");
  const worthExploring = results.filter(r => r.tier === "explore");

  // Navigation
  const goNext = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(1);
    setCurrentStep(s => Math.min(s + 1, totalSteps));
  }, [totalSteps]);

  const goBack = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    setCurrentStep(s => Math.max(s - 1, 0));
  }, []);

  const startOver = useCallback(() => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    setDirection(-1);
    setAnswers({ ...INITIAL_ANSWERS });
    setCurrentStep(0);
    setShowRecap(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  // Handle option selection
  const handleSelect = useCallback(
    (questionId: string, value: string) => {
      const q = questions.find(q => q.id === questionId);
      if (!q) return;

      if (q.multiSelect) {
        setAnswers(prev => {
          const current = prev.priorities as Priority[];
          const next = current.includes(value as Priority)
            ? current.filter(v => v !== value)
            : [...current, value as Priority];
          return { ...prev, priorities: next };
        });
      } else {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        // Auto-advance after brief delay
        if (advanceTimer.current) clearTimeout(advanceTimer.current);
        advanceTimer.current = setTimeout(() => {
          setDirection(1);
          setCurrentStep(s => Math.min(s + 1, totalSteps));
        }, 400);
      }
    },
    [totalSteps]
  );

  const getAnswer = (questionId: string): string | string[] | null => {
    if (questionId === "priorities") return answers.priorities;
    return (answers as unknown as Record<string, string | string[] | null>)[questionId] ?? null;
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/6 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              {instruments.length} ways to fund your project
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5">
              Figure out how to{" "}
              <span className="text-accent italic">fund your thing</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Grants, loans, equity, tax credits — there are a lot of options and
              it&apos;s hard to know where to start. Answer a few quick questions and
              we&apos;ll show you what fits.
            </p>
            {!isResults && (
              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => {
                    setDirection(1);
                    setCurrentStep(totalSteps);
                  }}
                  className="text-sm text-text-tertiary hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  Skip ahead — show me everything
                </button>
                <span className="text-text-tertiary/40">|</span>
                <Link
                  href="/"
                  className="text-sm text-text-tertiary hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5" />
                  Browse the full catalog
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 sm:px-8 pb-20">
        {/* Progress bar */}
        {!isResults && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-text-tertiary">
                Question {currentStep + 1} of {totalSteps}
              </span>
              {currentStep > 0 && (
                <button
                  onClick={startOver}
                  className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-foreground transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Start over
                </button>
              )}
            </div>
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    i < currentStep
                      ? "bg-accent"
                      : i === currentStep
                        ? "bg-accent/50"
                        : "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results header */}
        {isResults && (
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-text-tertiary">Results</span>
            <button
              onClick={startOver}
              className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Start over
            </button>
          </div>
        )}

        {/* Step content */}
        <AnimatePresence mode="wait" custom={direction}>
          {!isResults && currentQuestion ? (
            <motion.div
              key={`step-${currentStep}`}
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {/* Question */}
              <div className="mb-8">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                  {currentQuestion.title}
                </h2>
                <p className="text-text-secondary text-sm">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* Option cards */}
              <div className={`grid gap-3 mb-8 auto-rows-fr ${
                currentQuestion.options.length <= 3
                  ? "grid-cols-1"
                  : currentQuestion.options.length <= 4
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}>
                {currentQuestion.options.map((option, i) => {
                  const answer = getAnswer(currentQuestion.id);
                  const isSelected = currentQuestion.multiSelect
                    ? (answer as string[] | null)?.includes(option.value)
                    : answer === option.value;

                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleSelect(currentQuestion.id, option.value)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className={`group text-left p-5 rounded-2xl border transition-all duration-200 h-full ${
                        isSelected
                          ? "border-accent bg-accent/8 shadow-sm ring-1 ring-accent/20"
                          : "border-border bg-surface hover:border-border-hover hover:shadow-sm"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                            isSelected
                              ? "border-accent bg-accent"
                              : "border-border group-hover:border-text-tertiary"
                          }`}
                        >
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-2 h-2 rounded-full bg-white"
                            />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground mb-0.5">
                            {option.label}
                          </div>
                          <div className="text-xs text-text-secondary leading-relaxed">
                            {option.description}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div>
                  {currentStep > 0 && (
                    <button
                      onClick={goBack}
                      className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-foreground transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={goNext}
                    className="flex items-center gap-1.5 text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    Skip
                    <SkipForward className="w-3.5 h-3.5" />
                  </button>
                  {currentQuestion.multiSelect && (
                    <button
                      onClick={goNext}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                    >
                      See results
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ) : isResults ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Summary banner */}
              <div className="bg-gradient-to-r from-accent/8 to-accent/3 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-heading text-xl font-bold text-foreground mb-1">
                      Your recommendations are ready
                    </h2>
                    <p className="text-sm text-text-secondary">
                      We analyzed {instruments.length} funding options and found{" "}
                      <span className="font-semibold text-foreground">{results.length}</span>{" "}
                      that could work for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* Answer recap */}
              <div className="mb-8">
                <button
                  onClick={() => setShowRecap(!showRecap)}
                  className="flex items-center gap-2 text-sm text-text-tertiary hover:text-text-secondary transition-colors"
                >
                  {showRecap ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  {showRecap ? "Hide" : "Show"} your answers
                </button>
                {showRecap && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-3 p-4 rounded-xl bg-surface-secondary border border-border text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {questions.map(q => {
                        const ans = getAnswer(q.id);
                        if (!ans || (Array.isArray(ans) && ans.length === 0)) return (
                          <div key={q.id}>
                            <span className="text-text-tertiary">{q.title.replace("?", "")}: </span>
                            <span className="text-text-secondary italic">Skipped</span>
                          </div>
                        );
                        const labels = Array.isArray(ans)
                          ? ans.map(v => q.options.find(o => o.value === v)?.label).filter(Boolean).join(", ")
                          : q.options.find(o => o.value === ans)?.label;
                        return (
                          <div key={q.id}>
                            <span className="text-text-tertiary">{q.title.replace("?", "")}: </span>
                            <span className="font-medium text-foreground">{labels}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Tiered results */}
              {results.length > 0 ? (
                <div className="space-y-10">
                  {[
                    { tier: "strong" as const, items: strongMatches },
                    { tier: "good" as const, items: goodFits },
                    { tier: "explore" as const, items: worthExploring },
                  ].filter(g => g.items.length > 0).map(group => {
                    const config = tierConfig[group.tier];
                    return (
                      <div key={group.tier}>
                        <div className="flex items-center gap-2 mb-4">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-xs text-text-tertiary">
                            ({group.items.length})
                          </span>
                        </div>
                        <div className="space-y-3">
                          {group.items.map((result, i) => (
                            <motion.div
                              key={result.instrument.slug}
                              initial={{ opacity: 0, y: 16 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06, duration: 0.3 }}
                            >
                              <Link
                                href={`/instrument/${result.instrument.slug}`}
                                className="group block bg-surface rounded-2xl border border-border hover:border-border-hover hover:shadow-md transition-all duration-200 p-5"
                              >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-3 mb-2">
                                  <div className="min-w-0">
                                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                                      {result.instrument.name}
                                    </h3>
                                    <p className="text-sm text-text-secondary mt-0.5">
                                      {result.instrument.tagline}
                                    </p>
                                  </div>
                                  <InstrumentBadges category={result.instrument.category} terms={result.instrument.terms} size="sm" />
                                </div>

                                {/* Score bar */}
                                <div className="flex items-center gap-3 mb-3">
                                  <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                                    <motion.div
                                      className={`h-full rounded-full ${config.barColor}`}
                                      initial={{ width: 0 }}
                                      animate={{ width: `${result.score}%` }}
                                      transition={{ duration: 0.6, delay: i * 0.06 + 0.2 }}
                                    />
                                  </div>
                                  <span className={`text-xs font-semibold ${config.color} min-w-[2.5rem] text-right`}>
                                    {result.score}%
                                  </span>
                                </div>

                                {/* Why this fits */}
                                {result.reasons.length > 0 && (
                                  <div className="mb-3 space-y-1">
                                    {result.reasons.map((reason, ri) => (
                                      <p key={ri} className="text-xs text-text-secondary flex items-start gap-1.5">
                                        <span className="text-accent mt-0.5">•</span>
                                        {reason}
                                      </p>
                                    ))}
                                  </div>
                                )}

                                {/* Stats row */}
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Cost</div>
                                    <div className="text-xs font-semibold text-foreground truncate">{result.instrument.costRange}</div>
                                  </div>
                                  <div className="w-px h-7 bg-border" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Size</div>
                                    <div className="text-xs font-semibold text-foreground truncate">
                                      {result.instrument.typicalSize.length > 14
                                        ? result.instrument.typicalSize.split("(")[0].trim().split(" - ")[1] || result.instrument.typicalSize.split("(")[0].trim()
                                        : result.instrument.typicalSize}
                                    </div>
                                  </div>
                                  <div className="w-px h-7 bg-border" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Speed</div>
                                    <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full ${speedColors[result.instrument.speed]}`}>
                                      {speedLabels[result.instrument.speed]}
                                    </span>
                                  </div>
                                  <div className="w-px h-7 bg-border" />
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[10px] uppercase tracking-wider text-text-tertiary mb-0.5">Complexity</div>
                                    <span className={`inline-block text-[10px] font-medium px-1.5 py-0.5 rounded-full ${complexityColors[result.instrument.complexity]}`}>
                                      {complexityLabels[result.instrument.complexity]}
                                    </span>
                                  </div>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-1 text-sm font-medium text-accent/60 group-hover:text-accent transition-colors">
                                  Learn more
                                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Empty state */
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-surface-secondary flex items-center justify-center mx-auto mb-5">
                    <BookOpen className="w-7 h-7 text-text-tertiary" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    Your profile is unique
                  </p>
                  <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                    Fewer instruments match your exact situation directly. Consider building your &quot;capital readiness&quot; first with technical assistance and organizational development.
                  </p>
                  <Link
                    href="/instrument/technical-assistance"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                  >
                    Explore Technical Assistance
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* Browse all link */}
              <div className="mt-12 pt-8 border-t border-border text-center">
                <p className="text-sm text-text-tertiary mb-3">
                  Want to explore the full catalog?
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                  Browse all {instruments.length} funding options
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
