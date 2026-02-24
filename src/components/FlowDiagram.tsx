"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Instrument } from "@/data/types";
import { categoryColorMap } from "./CategoryBadge";

// Lens 1: Capital Sources — Sankey-style flow from sources into instrument
export function FlowDiagram({ instrument }: { instrument: Instrument }) {
  const sources = instrument.sources;
  const color = categoryColorMap[instrument.category];
  const n = sources.length;

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [layout, setLayout] = useState<{
    centers: number[];
    totalH: number;
  } | null>(null);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centers = cardRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top - containerRect.top + rect.height / 2;
      });
      setLayout({ centers, totalH: containerRect.height });
    };

    // Small delay to let framer-motion animations settle
    const timer = setTimeout(measure, 100);
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [sources]);

  const ribbonW = 14;
  const ribbonGap = 2;
  const svgW = 120;
  const mergeH = n * ribbonW + (n - 1) * ribbonGap;
  const mergeTop = layout ? (layout.totalH - mergeH) / 2 : 0;

  return (
    <div>
      {/* Mobile: stacked cards with colored left border */}
      <div className="sm:hidden space-y-3">
        {sources.map((source, i) => (
          <motion.div
            key={source.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white border border-border rounded-xl p-4"
            style={{ borderLeft: `3px solid ${color}` }}
          >
            <div className="text-sm font-semibold text-foreground mb-1">
              {source.name}
            </div>
            <div className="text-xs text-text-secondary leading-relaxed">
              {source.description}
            </div>
            {source.examples && source.examples.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {source.examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Desktop: source cards + sankey ribbons */}
      <div className="hidden sm:flex items-start" ref={containerRef}>
        {/* Source cards */}
        <div className="flex-1 space-y-3">
          {sources.map((source, i) => (
            <motion.div
              key={source.name}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-white border border-border rounded-xl p-4"
            >
              <div className="text-sm font-semibold text-foreground mb-1">
                {source.name}
              </div>
              <div className="text-xs text-text-secondary leading-relaxed">
                {source.description}
              </div>
              {source.examples && source.examples.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {source.examples.map((ex) => (
                    <span
                      key={ex}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-surface-secondary text-text-tertiary"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Sankey ribbons SVG */}
        {layout && layout.totalH > 0 && (
          <svg
            className="flex-shrink-0"
            width={svgW}
            height={layout.totalH}
            viewBox={`0 0 ${svgW} ${layout.totalH}`}
          >
            {sources.map((_, i) => {
              const startY = layout.centers[i];
              const endY =
                mergeTop + i * (ribbonW + ribbonGap) + ribbonW / 2;
              const h = ribbonW;
              const cx = svgW * 0.5;

              return (
                <motion.path
                  key={i}
                  d={`
                    M 0,${startY - h / 2}
                    C ${cx},${startY - h / 2} ${cx},${endY - h / 2} ${svgW - 10},${endY - h / 2}
                    L ${svgW - 10},${endY + h / 2}
                    C ${cx},${endY + h / 2} ${cx},${startY + h / 2} 0,${startY + h / 2}
                    Z
                  `}
                  fill={color}
                  fillOpacity={0.08 + i * 0.06}
                  stroke={color}
                  strokeWidth={0.5}
                  strokeOpacity={0.2}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: 0.2 + i * 0.15,
                    duration: 0.6,
                  }}
                />
              );
            })}

            {/* Merge bar */}
            <motion.rect
              x={svgW - 10}
              y={mergeTop}
              width={10}
              height={mergeH}
              rx={5}
              fill={color}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                delay: 0.4 + n * 0.1,
                duration: 0.4,
                type: "spring",
              }}
              style={{
                transformOrigin: `${svgW - 5}px ${mergeTop + mergeH / 2}px`,
              }}
            />
          </svg>
        )}
      </div>
    </div>
  );
}
