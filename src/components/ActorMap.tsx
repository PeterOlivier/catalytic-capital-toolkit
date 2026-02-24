"use client";

import { motion } from "framer-motion";
import { Instrument, Actor } from "@/data/types";
import { Users, Handshake, Settings, Globe } from "lucide-react";

const typeConfig: Record<
  Actor["type"],
  { label: string; color: string; ring: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  source: {
    label: "Capital Sources",
    color: "bg-blue-50 border-blue-200 text-blue-800",
    ring: "ring-blue-300",
    Icon: Users,
  },
  counterparty: {
    label: "Counterparties",
    color: "bg-amber-50 border-amber-200 text-amber-800",
    ring: "ring-amber-300",
    Icon: Handshake,
  },
  enabler: {
    label: "Enablers",
    color: "bg-emerald-50 border-emerald-200 text-emerald-800",
    ring: "ring-emerald-300",
    Icon: Settings,
  },
  ecosystem: {
    label: "Ecosystem",
    color: "bg-slate-50 border-slate-200 text-slate-700",
    ring: "ring-slate-300",
    Icon: Globe,
  },
};

// Lens 3: Who Else Is Involved — Actor constellation
export function ActorMap({ instrument }: { instrument: Instrument }) {
  const allActors = [
    ...instrument.sources.map((s) => ({ ...s, type: "source" as const })),
    ...instrument.actors,
  ];

  const grouped = {
    source: allActors.filter((a) => a.type === "source"),
    counterparty: allActors.filter((a) => a.type === "counterparty"),
    enabler: allActors.filter((a) => a.type === "enabler"),
    ecosystem: allActors.filter((a) => a.type === "ecosystem"),
  };

  return (
    <div className="space-y-6">
      {/* Actor groups */}
      {(["source", "counterparty", "enabler", "ecosystem"] as const).map(
        (type) => {
          const actors = grouped[type];
          if (actors.length === 0) return null;
          const config = typeConfig[type];
          const Icon = config.Icon;

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay:
                  type === "source"
                    ? 0.1
                    : type === "counterparty"
                    ? 0.25
                    : type === "enabler"
                    ? 0.4
                    : 0.55,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-text-secondary">
                  {config.label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {actors.map((actor, i) => (
                  <motion.div
                    key={actor.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 * i + 0.2 }}
                    className={`rounded-xl border p-3 ${config.color}`}
                  >
                    <div className="text-sm font-semibold mb-0.5">
                      {actor.name}
                    </div>
                    <div className="text-xs opacity-80 leading-relaxed">
                      {actor.description}
                    </div>
                    {actor.examples && actor.examples.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {actor.examples.map((ex) => (
                          <span
                            key={ex}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/60 font-medium"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        }
      )}
    </div>
  );
}
