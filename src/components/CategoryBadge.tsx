"use client";

import { Category, CATEGORIES } from "@/data/types";
import {
  Gift,
  Landmark,
  Shield,
  TrendingUp,
  Layers,
  Building2,
  Briefcase,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Gift,
  Landmark,
  Shield,
  TrendingUp,
  Layers,
  Building2,
  Briefcase,
};

const colorClasses: Record<Category, string> = {
  grant: "bg-purple-50 text-purple-700 border-purple-200",
  debt: "bg-blue-50 text-blue-700 border-blue-200",
  guarantee: "bg-emerald-50 text-emerald-700 border-emerald-200",
  equity: "bg-red-50 text-red-700 border-red-200",
  hybrid: "bg-amber-50 text-amber-700 border-amber-200",
  government: "bg-slate-50 text-slate-700 border-slate-200",
  conventional: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

export const categoryColorMap: Record<Category, string> = {
  grant: "#8b5cf6",
  debt: "#2563eb",
  guarantee: "#059669",
  equity: "#dc2626",
  hybrid: "#d97706",
  government: "#475569",
  conventional: "#0891b2",
};

export function CategoryBadge({
  category,
  size = "sm",
}: {
  category: Category;
  size?: "sm" | "md" | "lg";
}) {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  const Icon = iconMap[cat.icon];

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-sm px-4 py-1.5 gap-2",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${colorClasses[category]} ${sizeClasses[size]}`}
    >
      {cat.name}
    </span>
  );
}
