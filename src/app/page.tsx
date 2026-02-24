"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { instruments } from "@/data/instruments";
import { Category, CATEGORIES } from "@/data/types";
import { CategoryBadge, categoryColorMap } from "@/components/CategoryBadge";
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

const riskColors: Record<string, string> = {
  "very-low": "bg-emerald-100 text-emerald-700",
  low: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  "very-high": "bg-red-100 text-red-700",
};

const riskLabels: Record<string, string> = {
  "very-low": "Very Low",
  low: "Low",
  moderate: "Moderate",
  high: "High",
  "very-high": "Very High",
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    return instruments.filter((inst) => {
      const matchesSearch =
        search === "" ||
        inst.name.toLowerCase().includes(search.toLowerCase()) ||
        inst.tagline.toLowerCase().includes(search.toLowerCase()) ||
        inst.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        activeCategory === "all" || inst.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: instruments.length };
    instruments.forEach((inst) => {
      counts[inst.category] = (counts[inst.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-accent/5 via-white to-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-16 pb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
              23 instruments across 6 categories
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight leading-[1.1] mb-5">
              The Catalytic Capital{" "}
              <span className="text-accent">Toolkit</span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Explore every major type of catalytic and alternative capital.
              Understand who puts money in, what they get back, what happens when
              things go wrong, and how much it all costs.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-white/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search instruments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-secondary border border-transparent focus:border-accent/30 focus:bg-white focus:outline-none text-sm transition-all"
            />
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-none sm:flex-wrap sm:overflow-visible pb-1 sm:pb-0 -mx-6 px-6 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all"
                  ? "bg-foreground text-white"
                  : "bg-surface-secondary text-text-secondary hover:bg-border"
              }`}
            >
              All{" "}
              <span className="opacity-60 ml-1">{categoryCounts.all}</span>
            </button>
            {CATEGORIES.filter((cat) => categoryCounts[cat.id]).map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
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
                  <span className="opacity-60 ml-0.5">
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              );
            })}
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
                  className="group block bg-white rounded-2xl border border-border hover:border-border-hover hover:shadow-md transition-all duration-200 p-5 h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors">
                      {inst.name}
                    </h3>
                    <CategoryBadge category={inst.category} size="sm" />
                  </div>
                  <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                    {inst.tagline}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Cost
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {inst.costRange}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Typical Size
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {inst.typicalSize.length > 18
                          ? inst.typicalSize.split("(")[0].trim()
                          : inst.typicalSize}
                      </div>
                    </div>
                    <div className="w-px h-8 bg-border" />
                    <div className="flex-1">
                      <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">
                        Risk
                      </div>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full ${riskColors[inst.riskLevel]}`}
                      >
                        {riskLabels[inst.riskLevel]}
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
