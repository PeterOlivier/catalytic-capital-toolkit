"use client";

import { Category, Terms, CATEGORIES, TERMS_LIST } from "@/data/types";

const categoryColorClasses: Record<Category, string> = {
  grant: "bg-[#7b6b9e]/10 text-[#7b6b9e] border-[#7b6b9e]/20",
  debt: "bg-[#3e6b8a]/10 text-[#3e6b8a] border-[#3e6b8a]/20",
  guarantee: "bg-[#5a8a6e]/10 text-[#5a8a6e] border-[#5a8a6e]/20",
  equity: "bg-[#b05445]/10 text-[#b05445] border-[#b05445]/20",
  hybrid: "bg-[#c9973a]/10 text-[#c9973a] border-[#c9973a]/20",
};

const termsColorClasses: Record<Terms, string> = {
  concessionary: "bg-[#7b6b9e]/10 text-[#7b6b9e] border-[#7b6b9e]/20",
  alternative: "bg-[#c9973a]/10 text-[#c9973a] border-[#c9973a]/20",
  conventional: "bg-[#4a7b8f]/10 text-[#4a7b8f] border-[#4a7b8f]/20",
  government: "bg-[#5c6b78]/10 text-[#5c6b78] border-[#5c6b78]/20",
};

export const categoryColorMap: Record<Category, string> = {
  grant: "#7b6b9e",
  debt: "#3e6b8a",
  guarantee: "#5a8a6e",
  equity: "#b05445",
  hybrid: "#c9973a",
};

export const termsColorMap: Record<Terms, string> = {
  concessionary: "#7b6b9e",
  alternative: "#c9973a",
  conventional: "#4a7b8f",
  government: "#5c6b78",
};

const sizeClasses = {
  sm: "text-xs px-2 py-0.5 gap-1",
  md: "text-sm px-3 py-1 gap-1.5",
  lg: "text-sm px-4 py-1.5 gap-2",
};

export function CategoryBadge({
  category,
  size = "sm",
}: {
  category: Category;
  size?: "sm" | "md" | "lg";
}) {
  const cat = CATEGORIES.find((c) => c.id === category)!;
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${categoryColorClasses[category]} ${sizeClasses[size]}`}
    >
      {cat.name}
    </span>
  );
}

export function TermsBadge({
  terms,
  size = "sm",
}: {
  terms: Terms;
  size?: "sm" | "md" | "lg";
}) {
  const t = TERMS_LIST.find((tl) => tl.id === terms)!;
  return (
    <span
      className={`inline-flex items-center rounded-full border font-medium ${termsColorClasses[terms]} ${sizeClasses[size]}`}
    >
      {t.name}
    </span>
  );
}

export function InstrumentBadges({
  category,
  terms,
  size = "sm",
}: {
  category: Category;
  terms: Terms;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex items-center gap-1.5 flex-shrink-0">
      <CategoryBadge category={category} size={size} />
      <TermsBadge terms={terms} size={size} />
    </div>
  );
}
