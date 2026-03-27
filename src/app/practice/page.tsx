"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ClozeCard from "@/components/ClozeCard";
import SRSButtons from "@/components/SRSButtons";
import { getDueCards, getCardProgress, saveCardProgress, getLevelFilter } from "@/lib/storage";
import type { CEFRLevel } from "@/types";
import { applyReview } from "@/lib/sm2";
import { sentences } from "@/data/sentences";
import type { CardProgress, SRSRating, Sentence } from "@/types";

type SessionPhase = "loading" | "answering" | "rating" | "done";

interface SessionCard {
  sentence: Sentence;
  card: CardProgress;
}

export default function PracticePage() {
  const [queue, setQueue] = useState<SessionCard[]>([]);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>("loading");
  const [sessionTotal, setSessionTotal] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Load due cards on mount
  useEffect(() => {
    const levelFilter = getLevelFilter();
    const activeLevels = (
      Object.entries(levelFilter) as [CEFRLevel, boolean][]
    )
      .filter(([, on]) => on)
      .map(([level]) => level);
    const dueCards = getDueCards(activeLevels.length > 0 ? activeLevels : undefined);
    const sessionCards: SessionCard[] = dueCards
      .map((card) => {
        const sentence = sentences.find((s) => s.id === card.sentenceId);
        if (!sentence) return null;
        return { sentence, card };
      })
      .filter((x): x is SessionCard => x !== null);

    setQueue(sessionCards);
    setSessionTotal(sessionCards.length);
    setPhase(sessionCards.length === 0 ? "done" : "answering");
  }, []);

  const currentItem = queue[index] ?? null;

  const handleCorrect = useCallback(() => {
    setPhase("rating");
    setSessionCorrect((n) => n + 1);
  }, []);

  const handleRate = useCallback(
    (rating: SRSRating) => {
      if (!currentItem) return;

      // Apply SM-2
      const freshCard = getCardProgress(currentItem.sentence.id);
      const updated = applyReview(freshCard, rating);
      saveCardProgress(updated);

      // If "again" or "hard", re-queue the card at the end
      if (rating === "again" || rating === "hard") {
        const requeued: SessionCard = {
          sentence: currentItem.sentence,
          card: updated,
        };
        setQueue((prev) => [...prev, requeued]);
      }

      const nextIndex = index + 1;
      if (nextIndex >= queue.length) {
        setPhase("done");
      } else {
        setIndex(nextIndex);
        setPhase("answering");
      }
    },
    [currentItem, index, queue.length]
  );

  if (phase === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (phase === "done") {
    return <SessionComplete total={sessionTotal} correct={sessionCorrect} />;
  }

  if (!currentItem) return null;

  const progressPct = Math.min(
    100,
    Math.round((index / Math.max(sessionTotal, 1)) * 100)
  );

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>
            Carte {Math.min(index + 1, sessionTotal)} / {sessionTotal}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main cloze card */}
      <div className="bg-zinc-900 rounded-3xl p-5 shadow-xl ring-1 ring-zinc-800 min-h-[200px] flex flex-col justify-between gap-6">
        <ClozeCard
          key={currentItem.sentence.id + "-" + index}
          sentence={currentItem.sentence}
          onCorrect={handleCorrect}
        />

        {/* SRS buttons appear after correct answer */}
        {phase === "rating" && <SRSButtons onRate={handleRate} />}
      </div>

      {/* Quit link */}
      <div className="text-center">
        <Link
          href="/"
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Quitter la session
        </Link>
      </div>
    </div>
  );
}

function SessionComplete({
  total,
  correct,
}: {
  total: number;
  correct: number;
}) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fade-in">
      <div className="text-6xl">
        {pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Session terminée !</h2>
        {total === 0 ? (
          <p className="text-zinc-400 text-sm">
            Aucune carte à réviser aujourd&apos;hui.
            <br />
            Revenez demain !
          </p>
        ) : (
          <p className="text-zinc-400 text-sm">
            {correct} bonne{correct !== 1 ? "s" : ""} réponse
            {correct !== 1 ? "s" : ""} sur {total} cartes
            <br />
            <span
              className={
                pct >= 80
                  ? "text-emerald-400"
                  : pct >= 50
                    ? "text-yellow-400"
                    : "text-red-400"
              }
            >
              {pct}% de réussite
            </span>
          </p>
        )}
      </div>

      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-2xl px-8 py-4 transition-colors touch-manipulation"
      >
        Voir le tableau de bord
      </Link>
    </div>
  );
}
