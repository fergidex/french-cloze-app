"use client";

import type { SRSRating } from "@/types";

interface SRSButtonsProps {
  onRate: (rating: SRSRating) => void;
}

const buttons: {
  rating: SRSRating;
  label: string;
  sublabel: string;
  classes: string;
}[] = [
  {
    rating: "again",
    label: "Again",
    sublabel: "1j",
    classes:
      "bg-red-900/50 text-red-300 ring-1 ring-red-700 hover:bg-red-800/60 active:bg-red-700/70",
  },
  {
    rating: "hard",
    label: "Difficile",
    sublabel: "1j",
    classes:
      "bg-orange-900/50 text-orange-300 ring-1 ring-orange-700 hover:bg-orange-800/60 active:bg-orange-700/70",
  },
  {
    rating: "good",
    label: "Bien",
    sublabel: "6j+",
    classes:
      "bg-emerald-900/50 text-emerald-300 ring-1 ring-emerald-700 hover:bg-emerald-800/60 active:bg-emerald-700/70",
  },
  {
    rating: "easy",
    label: "Facile",
    sublabel: "∞",
    classes:
      "bg-blue-900/50 text-blue-300 ring-1 ring-blue-700 hover:bg-blue-800/60 active:bg-blue-700/70",
  },
];

export default function SRSButtons({ onRate }: SRSButtonsProps) {
  return (
    <div className="animate-slide-up space-y-3">
      <p className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
        Comment c&apos;était ?
      </p>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map(({ rating, label, sublabel, classes }) => (
          <button
            key={rating}
            onClick={() => onRate(rating)}
            className={`
              flex flex-col items-center justify-center
              rounded-xl py-3 px-2
              font-semibold text-sm
              transition-all duration-150
              touch-manipulation
              ${classes}
            `}
          >
            <span>{label}</span>
            <span className="text-xs opacity-60 mt-0.5">{sublabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
