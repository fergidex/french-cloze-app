import type { CardProgress, SRSRating } from "@/types";
import { SRS_QUALITY } from "@/types";

const INITIAL_EASE_FACTOR = 2.5;
const MIN_EASE_FACTOR = 1.3;

/**
 * Returns a date string (YYYY-MM-DD) offset by `days` from today.
 */
export function dateOffsetDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export function todayString(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Creates a new CardProgress for a sentence that has never been reviewed.
 */
export function newCardProgress(sentenceId: number): CardProgress {
  return {
    sentenceId,
    interval: 0,
    repetitions: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    nextReview: todayString(), // due immediately
    lastReview: null,
    totalCorrect: 0,
    totalIncorrect: 0,
  };
}

/**
 * Applies the SM-2 algorithm and returns an updated CardProgress.
 *
 * SM-2 quality mapping:
 *   again=0  → fail: reset interval & reps, reduce EF
 *   hard=2   → borderline fail: reset interval & reps, smaller EF reduction
 *   good=4   → pass: normal interval progression, EF unchanged
 *   easy=5   → pass: boosted intervals, EF increases
 */
export function applyReview(
  card: CardProgress,
  rating: SRSRating
): CardProgress {
  const quality = SRS_QUALITY[rating];
  const today = todayString();
  let { interval, repetitions, easeFactor } = card;

  if (quality < 3) {
    // Failed: reset progression
    repetitions = 0;
    interval = 1;
  } else {
    // Passed: advance SM-2 schedule
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor (applies regardless of pass/fail)
  easeFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

  return {
    ...card,
    interval,
    repetitions,
    easeFactor,
    nextReview: dateOffsetDays(interval),
    lastReview: today,
    totalCorrect: quality >= 3 ? card.totalCorrect + 1 : card.totalCorrect,
    totalIncorrect:
      quality < 3 ? card.totalIncorrect + 1 : card.totalIncorrect,
  };
}

/**
 * Returns true if the card is due for review today or is overdue.
 */
export function isDueToday(card: CardProgress): boolean {
  return card.nextReview <= todayString();
}

/**
 * A card is considered mastered when its interval is >= 21 days.
 */
export function isMastered(card: CardProgress): boolean {
  return card.interval >= 21 && card.repetitions >= 3;
}

/**
 * Estimates how many days until review for display purposes.
 */
export function daysUntilReview(card: CardProgress): number {
  const today = new Date(todayString());
  const review = new Date(card.nextReview);
  const diff = Math.ceil(
    (review.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return Math.max(0, diff);
}
