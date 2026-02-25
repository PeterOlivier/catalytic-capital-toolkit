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
  grant: "bg-[#7b6b9e]/10 text-[#7b6b9e] border-[#7b6b9e]/20",
  debt: "bg-[#3e6b8a]/10 text-[#3e6b8a] border-[#3e6b8a]/20",
  guarantee: "bg-[#5a8a6e]/10 text-[#5a8a6e] border-[#5a8a6e]/20",
  equity: "bg-[#b05445]/10 text-[#b05445] border-[#b05445]/20",
  hybrid: "bg-[#c9973a]/10 text-[#c9973a] border-[#c9973a]/20",
  government: "bg-[#5c6b78]/10 text-[#5c6b78] border-[#5c6b78]/20",
  conventional: "bg-[#4a7b8f]/10 text-[#4a7b8f] border-[#4a7b8f]/20",
};

export const categoryColorMap: Record<Category, string> = {
  grant: "#7b6b9e",
  debt: "#3e6b8a",
  guarantee: "#5a8a6e",
  equity: "#b05445",
  hybrid: "#c9973a",
  government: "#5c6b78",
  conventional: "#4a7b8f",
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
