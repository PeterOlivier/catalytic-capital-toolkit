"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { instruments } from "@/data/instruments";
import { Category, Terms, CATEGORIES, TERMS_LIST } from "@/data/types";
import { InstrumentBadges, categoryColorMap, termsColorMap } from "@/components/CategoryBadge";
import {
  Search,
  ArrowRight,
  Gift,
  Landmark,
  Shield,
  TrendingUp,
  Layers,
  Building2,
  Sparkles,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gift,
  Landmark,
  Shield,
  TrendingUp,
  Layers,
  Building2,
};

const speedColors: Record<string, string> = {
  weeks: "bg-[#5a8a6e]/15 text-[#5a8a6e]",
  "1-3-months": "bg-[#5a8a6e]/10 text-[#5a8a6e]",
  "3-6-months": "bg-[#c9973a]/15 text-[#c9973a]",
  "6-12-months": "bg-[#b05445]/12 text-[#b05445]",
};

const speedLabels: Record<string, string> = {
  weeks: "Weeks",
  "1-3-months": "1–3 mo",
  "3-6-months": "3–6 mo",
  "6-12-months": "6–12+ mo",
};

const complexityColors: Record<string, string> = {
  low: "bg-[#5a8a6e]/15 text-[#5a8a6e]",
  medium: "bg-[#c9973a]/15 text-[#c9973a]",
  high: "bg-[#b05445]/12 text-[#b05445]",
};

const complexityLabels: Record<string, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");
  const [activeTerms, setActiveTerms] = useState<Terms | "all">("all");

  const filtered = useMemo(() => {
    return instruments.filter((inst) => {
      const matchesSearch =
        search === "" ||
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        inst.tagline.toLowerCase().includes(search.toLowerCase()) ||
        inst.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        activeCategory === "all" || inst.category === activeCategory;
      const matchesTerms =
        activeTerms === "all" || inst.terms === activeTerms;
      return matchesSearch && matchesCat && matchesTerms;
    });
  }, [search, activeCategory, activeTerms]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: instruments.length };
    instruments.forEach((inst) => {
      counts[inst.category] = (counts[inst.category] || 0) + 1;
    });
    return counts;
  }, []);

  const termsCounts = useMemo(() => {
    const counts: Record<string, number> = { all: instruments.length };
    instruments.forEach((inst) => {
      counts[inst.terms] = (counts[inst.terms] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/6 via-background to-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              {instruments.length} instruments — {new Set(instruments.map(i => i.category)).size} types, {new Set(instruments.map(i => i.terms)).size} terms
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5">
              The Climate Capital{" "}
              <span className="text-accent italic">Toolkit</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Explore every major type of catalytic, alternative, and conventional capital.
              Compare instruments side-by-side — who puts money in, what they get back,
              what happens when things go wrong, and how much it all costs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-[#faf6ef]/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-secondary border border-transparent focus:border-accent/30 focus:bg-surface focus:outline-none text-sm transition-all"
            />
          </div>

          {/* Type filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0">
            <span className="flex-shrink-0 text-xs font-medium text-text-tertiary uppercase tracking-wider self-center mr-1">Type</span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-foreground text-[#f5f0e8]"
                  : "bg-surface-secondary text-text-secondary hover:bg-border"
              }`}
            >
              All
            </button>
            {CATEGORIES.filter((cat) => categoryCounts[cat.id]).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-border"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: categoryColorMap[cat.id] }
                    : undefined
                }
              >
                {cat.name}
                <span className="opacity-60">{categoryCounts[cat.id] || 0}</span>
              </button>
            ))}
          </div>
          {/* Terms filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0 mt-2">
            <span className="flex-shrink-0 text-xs font-medium text-text-tertiary uppercase tracking-wider self-center mr-1">Terms</span>
            <button
              onClick={() => setActiveTerms("all")}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeTerms === "all"
                  ? "bg-foreground text-[#f5f0e8]"
                  : "bg-surface-secondary text-text-secondary hover:bg-border"
              }`}
            >
              All
            </button>
            {TERMS_LIST.filter((t) => termsCounts[t.id]).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTerms(t.id)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeTerms === t.id
                    ? "text-white"
                    : "bg-surface-secondary text-text-secondary hover:bg-border"
                }`}
                style={
                  activeTerms === t.id
                    ? { backgroundColor: termsColorMap[t.id] }
                    : undefined
                }
              >
                {t.name}
                <span className="opacity-60">{termsCounts[t.id] || 0}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-8">
        <AnimatePresence mode="popLayout">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((inst, i) => (
              <motion.div
                key={inst.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
              >
                <Link
                  href={`/instrument/${inst.slug}`}
                  className="group block bg-surface rounded-2xl border border-border hover:border-border-hover hover:shadow-md transition-all duration-200 p-5 h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-heading text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      {inst.name}
                    </h3>
                    <InstrumentBadges category={inst.category} terms={inst.terms} size="sm" />
                  </div>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {inst.tagline}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Cost
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {inst.costRange}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Size
                      </div>
                      <div className="text-sm font-semibold text-foreground truncate">
                        {inst.typicalSize.length > 14
                          ? inst.typicalSize.split("(")[0].trim().split(" - ")[1] || inst.typicalSize.split("(")[0].trim()
                          : inst.typicalSize}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Speed
                      </div>
                      <span
                        className={`inline-block text-xs font-medium px-1.5 py-0.5 rounded-full ${speedColors[inst.speed]}`}
                      >
                        {speedLabels[inst.speed]}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Complexity
                      </div>
                      <span
                        className={`inline-block text-xs font-medium px-1.5 py-0.5 rounded-full ${complexityColors[inst.complexity]}`}
                      >
                        {complexityLabels[inst.complexity]}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {inst.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-surface-secondary text-text-secondary"
                      >
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-1 text-sm font-medium text-accent/60 group-hover:text-accent transition-colors">
                    Explore instrument
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl bg-surface-secondary flex items-center justify-center mx-auto mb-5">
              <Search className="w-7 h-7 text-text-tertiary" />
            </div>
            <p className="text-text-secondary text-lg font-medium mb-1">
              No instruments found
            </p>
            <p className="text-text-tertiary text-sm mb-5">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setActiveTerms("all");
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
