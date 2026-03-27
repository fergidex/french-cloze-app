"use client";

import { useEffect, useState } from "react";
import { getLevelFilter, saveLevelFilter } from "@/lib/storage";
import type { LevelFilter as LevelFilterType } from "@/lib/storage";

export default function LevelFilter() {
  const [filter, setFilter] = useState<LevelFilterType>({ B1: true, B2: false });

  useEffect(() => {
    setFilter(getLevelFilter());
  }, []);

  const toggle = (level: "B1" | "B2") => {
    const next = { ...filter, [level]: !filter[level] };
    // Must keep at least one level selected
    if (!next.B1 && !next.B2) return;
    setFilter(next);
    saveLevelFilter(next);
  };

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-zinc-500 font-medium">Niveau :</span>
      {(["B1", "B2"] as const).map((level) => {
        const active = filter[level];
        return (
          <button
            key={level}
            onClick={() => toggle(level)}
            aria-pressed={active}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors touch-manipulation ${
              active
                ? level === "B1"
                  ? "bg-blue-600 text-white"
                  : "bg-violet-600 text-white"
                : "bg-zinc-800 text-zinc-500 ring-1 ring-zinc-700 hover:text-zinc-300"
            }`}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
