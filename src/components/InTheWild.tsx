"use client";

import { motion } from "framer-motion";
import { Instrument, MediaType } from "@/data/types";
import { categoryColorMap } from "./CategoryBadge";
import {
  ExternalLink,
  FileText,
  Headphones,
  MessageCircle,
  BookOpen,
  PlayCircle,
  Telescope,
  Building2,
  TrendingUp,
} from "lucide-react";

const mediaIcons: Record<MediaType, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  article: FileText,
  podcast: Headphones,
  interview: MessageCircle,
  report: BookOpen,
  video: PlayCircle,
};

const mediaLabels: Record<MediaType, string> = {
  article: "Article",
  podcast: "Podcast",
  interview: "Interview",
  report: "Report",
  video: "Video",
};

export function InTheWild({ instrument }: { instrument: Instrument }) {
  const examples = instrument.realWorldExamples;
  const color = categoryColorMap[instrument.category];

  if (!examples || (examples.providers.length === 0 && examples.deals.length === 0 && examples.media.length === 0)) {
    return (
      <div className="bg-surface-secondary rounded-xl p-8 text-center">
        <Telescope className="w-8 h-8 text-text-tertiary mx-auto mb-3" />
        <p className="text-sm text-text-secondary">
          Real-world examples for this instrument are being researched.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Providers */}
      {examples.providers.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Capital Providers
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {examples.providers.map((provider, i) => (
              <motion.a
                key={provider.name}
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="group block bg-surface rounded-xl border border-border hover:border-border-hover hover:shadow-sm transition-all p-4"
                style={{ borderLeft: `3px solid ${color}` }}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-text-tertiary flex-shrink-0" />
                    <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {provider.name}
                    </span>
                  </div>
                  <ExternalLink className="w-3 h-3 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-xs text-text-secondary leading-relaxed mb-2">
                  {provider.description}
                </p>
                {provider.notableActivity && (
                  <div className="bg-surface-secondary rounded-lg px-2.5 py-1.5">
                    <p className="text-[11px] text-text-tertiary leading-relaxed">
                      {provider.notableActivity}
                    </p>
                  </div>
                )}
              </motion.a>
            ))}
          </div>
        </div>
      )}

      {/* Deals */}
      {examples.deals.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Notable Deployments
          </h3>
          <div className="space-y-3">
            {examples.deals.map((deal, i) => (
              <motion.div
                key={deal.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="bg-surface rounded-xl border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${color}15`, color }}
                    >
                      {deal.year}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {deal.name}
                    </span>
                  </div>
                  {deal.size && (
                    <span className="text-sm font-bold text-foreground whitespace-nowrap">
                      {deal.size}
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-tertiary mb-1.5">
                  {deal.parties.join(" · ")}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {deal.description}
                </p>
                {deal.url && (
                  <a
                    href={deal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline mt-2"
                  >
                    Read more
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Media */}
      {examples.media.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Further Reading & Listening
          </h3>
          <div className="space-y-2">
            {examples.media.map((item, i) => {
              const Icon = mediaIcons[item.type];
              return (
                <motion.a
                  key={item.title}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.2 }}
                  className="group flex items-start gap-3 bg-surface-secondary rounded-xl border border-border hover:border-border-hover px-4 py-3 transition-all"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors truncate">
                        {item.title}
                      </span>
                      <ExternalLink className="w-3 h-3 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-tertiary mt-0.5">
                      <span>{item.source}</span>
                      <span className="opacity-40">·</span>
                      <span>{mediaLabels[item.type]}</span>
                      {item.date && (
                        <>
                          <span className="opacity-40">·</span>
                          <span>{item.date}</span>
                        </>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
