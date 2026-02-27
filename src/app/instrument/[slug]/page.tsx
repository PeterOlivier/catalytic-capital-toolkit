"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { instruments } from "@/data/instruments";
import { InstrumentBadges, categoryColorMap } from "@/components/CategoryBadge";
import { FlowDiagram } from "@/components/FlowDiagram";
import { ReturnSpectrum } from "@/components/ReturnSpectrum";
import { ActorMap } from "@/components/ActorMap";
import { DefaultCascade } from "@/components/DefaultCascade";
import { CostCalculator } from "@/components/CostCalculator";
import { InTheWild } from "@/components/InTheWild";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  BarChart3,
  Users,
  AlertTriangle,
  Calculator,
  Telescope,
} from "lucide-react";
import Link from "next/link";

const lenses = [
  { id: "flow", label: "Capital Sources", Icon: Banknote, shortLabel: "Sources" },
  { id: "returns", label: "Return Profile", Icon: BarChart3, shortLabel: "Returns" },
  { id: "actors", label: "Key Stakeholders", Icon: Users, shortLabel: "Stakeholders" },
  { id: "default", label: "Default Scenario", Icon: AlertTriangle, shortLabel: "Default" },
  { id: "calculator", label: "Cost Calculator", Icon: Calculator, shortLabel: "Calculator" },
  { id: "wild", label: "In the Wild", Icon: Telescope, shortLabel: "Wild" },
];

export default function InstrumentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const instrument = instruments.find((i) => i.slug === slug);
  const [activeLens, setActiveLens] = useState("flow");
  const isScrolling = useRef(false);

  // Scroll-spy: update active tab based on which section is in view
  useEffect(() => {
    const sections = lenses.map((l) => document.getElementById(`section-${l.id}`)).filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("section-", "");
            setActiveLens(id);
            break;
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [instrument]);

  const scrollToSection = (id: string) => {
    setActiveLens(id);
    isScrolling.current = true;
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isScrolling.current = false; }, 800);
  };

  if (!instrument) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Instrument not found</h1>
          <Link href="/" className="text-accent hover:underline">
            Back to catalog
          </Link>
        </div>
      </div>
    );
  }

  const color = categoryColorMap[instrument.category];
  const currentIdx = instruments.findIndex((i) => i.slug === slug);
  const prevInst = currentIdx > 0 ? instruments[currentIdx - 1] : null;
  const nextInst =
    currentIdx < instruments.length - 1 ? instruments[currentIdx + 1] : null;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}03, transparent)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 pt-6 pb-8">
          {/* Breadcrumb */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All Instruments
          </Link>

          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="font-heading text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {instrument.name}
            </h1>
            <InstrumentBadges category={instrument.category} terms={instrument.terms} size="md" />
          </div>
          <p className="text-base text-text-secondary leading-relaxed max-w-3xl">
            {instrument.description}
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4">
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-text-tertiary">Cost:</span>
              <span className="font-semibold">{instrument.costRange}</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-text-tertiary">Typical Size:</span>
              <span className="font-semibold">
                {instrument.typicalSize}
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-text-tertiary">Use Case:</span>
              <span className="font-semibold">{instrument.useCase}</span>
            </div>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {instrument.features.map((f) => (
              <span
                key={f}
                className="text-xs px-2.5 py-1 rounded-lg border border-border bg-surface text-text-secondary"
              >
                {f}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-text-tertiary/70 mt-4 leading-relaxed">
            Illustrative ranges only &mdash; actual terms vary by provider, creditworthiness, and market conditions.
          </p>
        </div>
      </section>

      {/* Lens tabs */}
      <section className="sticky top-16 z-30 bg-[#faf6ef]/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
          <div className="relative">
          <div className="flex gap-1 overflow-x-auto py-2 -mx-6 px-6 sm:mx-0 sm:px-0 scrollbar-none">
            {lenses.map((lens) => {
              const isActive = activeLens === lens.id;
              return (
                <button
                  key={lens.id}
                  onClick={() => scrollToSection(lens.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "text-white shadow-md"
                      : "text-text-secondary hover:bg-surface-secondary"
                  }`}
                  style={
                    isActive ? { backgroundColor: color } : undefined
                  }
                >
                  <span className="hidden sm:inline">{lens.label}</span>
                  <span className="sm:hidden">{lens.shortLabel}</span>
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#faf6ef]/85 to-transparent pointer-events-none sm:hidden" />
          </div>
        </div>
      </section>

      {/* All lens sections */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="max-w-4xl">
          {lenses.map((lens, i) => {
            const Component = {
              flow: FlowDiagram,
              returns: ReturnSpectrum,
              actors: ActorMap,
              default: DefaultCascade,
              calculator: CostCalculator,
              wild: InTheWild,
            }[lens.id]!;
            return (
              <section
                key={lens.id}
                id={`section-${lens.id}`}
                className="scroll-mt-28 py-8"
                style={i < lenses.length - 1 ? { borderBottom: "1px solid var(--color-border)" } : undefined}
              >
                <h2 className="font-heading text-lg font-semibold text-foreground mb-5">
                  {lens.label}
                </h2>
                <Component instrument={instrument} />
              </section>
            );
          })}
        </div>
      </div>

      {/* Navigation between instruments */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 xl:px-20">
        <div className="flex items-stretch justify-between border-t border-border pt-8 gap-4">
          {prevInst ? (
            <Link
              href={`/instrument/${prevInst.slug}`}
              className="group flex-1 flex items-center gap-3 p-4 rounded-xl border border-border hover:border-border-hover hover:bg-surface-secondary transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-text-tertiary group-hover:text-foreground transition-colors flex-shrink-0" />
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">Previous</div>
                <div className="text-sm font-semibold text-foreground truncate">{prevInst.shortName}</div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextInst ? (
            <Link
              href={`/instrument/${nextInst.slug}`}
              className="group flex-1 flex items-center justify-end gap-3 p-4 rounded-xl border border-border hover:border-border-hover hover:bg-surface-secondary transition-all text-right"
            >
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-text-tertiary mb-0.5">Next</div>
                <div className="text-sm font-semibold text-foreground truncate">{nextInst.shortName}</div>
              </div>
              <ArrowRight className="w-5 h-5 text-text-tertiary group-hover:text-foreground transition-colors flex-shrink-0" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </div>
  );
}
