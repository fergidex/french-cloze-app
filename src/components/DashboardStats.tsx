"use client";

import { useEffect, useState } from "react";
import { getDashboardStats } from "@/lib/storage";
import { CATEGORY_LABELS } from "@/types";
import type { GrammarCategory } from "@/types";
import { sentences } from "@/data/sentences";

interface Stats {
  dueToday: number;
  totalMastered: number;
  totalCards: number;
  newCards: number;
  categoryMap: Record<string, { total: number; mastered: number; due: number }>;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    setStats(getDashboardStats());
  }, []);

  if (!stats) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-zinc-800 rounded-2xl" />
        ))}
      </div>
    );
  }

  const reviewedCards = stats.totalCards - stats.newCards;

  return (
    <div className="space-y-6">
      {/* Top stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="À réviser aujourd'hui"
          value={stats.dueToday}
          highlight={stats.dueToday > 0}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          }
          color="blue"
        />
        <StatCard
          label="Maîtrisées"
          value={stats.totalMastered}
          highlight={false}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          }
          color="emerald"
        />
        <StatCard
          label="Cartes vues"
          value={reviewedCards}
          highlight={false}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          }
          color="violet"
        />
        <StatCard
          label="Total cartes"
          value={stats.totalCards}
          highlight={false}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          }
          color="zinc"
        />
      </div>

      {/* Progress bar */}
      <div className="bg-zinc-800/60 rounded-2xl p-4 space-y-2">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Progression globale</span>
          <span>
            {stats.totalMastered}/{stats.totalCards}
          </span>
        </div>
        <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{
              width: `${(stats.totalMastered / stats.totalCards) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-zinc-500">
          {Math.round((stats.totalMastered / stats.totalCards) * 100)}% maîtrisé
          (intervalle ≥ 21 jours)
        </p>
      </div>

      {/* Category breakdown */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider px-1">
          Par catégorie
        </h2>
        <div className="space-y-2">
          {Object.entries(stats.categoryMap)
            .sort((a, b) => b[1].due - a[1].due)
            .map(([category, data]) => (
              <CategoryRow
                key={category}
                category={category as GrammarCategory}
                data={data}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
  icon,
  color,
}: {
  label: string;
  value: number;
  highlight: boolean;
  icon: React.ReactNode;
  color: "blue" | "emerald" | "violet" | "zinc";
}) {
  const colors = {
    blue: highlight
      ? "bg-blue-900/40 ring-1 ring-blue-700"
      : "bg-zinc-800/60 ring-1 ring-zinc-700",
    emerald: "bg-zinc-800/60 ring-1 ring-zinc-700",
    violet: "bg-zinc-800/60 ring-1 ring-zinc-700",
    zinc: "bg-zinc-800/60 ring-1 ring-zinc-700",
  };

  const valueColors = {
    blue: highlight ? "text-blue-300" : "text-white",
    emerald: "text-emerald-400",
    violet: "text-violet-400",
    zinc: "text-zinc-300",
  };

  const iconColors = {
    blue: highlight ? "text-blue-400" : "text-zinc-500",
    emerald: "text-emerald-500",
    violet: "text-violet-500",
    zinc: "text-zinc-500",
  };

  return (
    <div className={`rounded-2xl p-4 ${colors[color]}`}>
      <div className="flex items-start justify-between">
        <svg
          className={`w-4 h-4 mt-0.5 ${iconColors[color]}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {icon}
        </svg>
      </div>
      <p className={`text-2xl font-bold mt-2 ${valueColors[color]}`}>
        {value}
      </p>
      <p className="text-xs text-zinc-500 mt-0.5 leading-tight">{label}</p>
    </div>
  );
}

function CategoryRow({
  category,
  data,
}: {
  category: GrammarCategory;
  data: { total: number; mastered: number; due: number };
}) {
  const masteredPct = Math.round((data.mastered / data.total) * 100);
  const label = CATEGORY_LABELS[category];

  return (
    <div className="bg-zinc-800/50 rounded-xl p-3 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm text-zinc-200 font-medium truncate">
          {label}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          {data.due > 0 && (
            <span className="text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full font-medium">
              {data.due} dû
            </span>
          )}
          <span className="text-xs text-zinc-500">
            {data.mastered}/{data.total}
          </span>
        </div>
      </div>
      <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-600 rounded-full"
          style={{ width: `${masteredPct}%` }}
        />
      </div>
    </div>
  );
}
