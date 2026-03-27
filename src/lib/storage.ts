import type { CardProgress, CEFRLevel } from "@/types";
import { newCardProgress, isDueToday, isMastered } from "@/lib/sm2";
import { sentences } from "@/data/sentences";

const PROGRESS_KEY = "french-cloze-progress";
const LEVEL_FILTER_KEY = "french-cloze-levels";

export interface LevelFilter {
  B1: boolean;
  B2: boolean;
}

export function getLevelFilter(): LevelFilter {
  if (typeof window === "undefined") return { B1: true, B2: false };
  try {
    const raw = localStorage.getItem(LEVEL_FILTER_KEY);
    if (!raw) return { B1: true, B2: false };
    return JSON.parse(raw) as LevelFilter;
  } catch {
    return { B1: true, B2: false };
  }
}

export function saveLevelFilter(filter: LevelFilter): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LEVEL_FILTER_KEY, JSON.stringify(filter));
}

type ProgressMap = Record<number, CardProgress>;

function loadProgressMap(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressMap;
  } catch {
    return {};
  }
}

function saveProgressMap(map: ProgressMap): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
}

/**
 * Returns the CardProgress for a sentence, creating it if it doesn't exist.
 */
export function getCardProgress(sentenceId: number): CardProgress {
  const map = loadProgressMap();
  if (!map[sentenceId]) {
    return newCardProgress(sentenceId);
  }
  return map[sentenceId];
}

/**
 * Persists updated CardProgress.
 */
export function saveCardProgress(card: CardProgress): void {
  const map = loadProgressMap();
  map[card.sentenceId] = card;
  saveProgressMap(map);
}

/**
 * Returns all CardProgress records, initialising any missing ones.
 */
export function getAllProgress(): CardProgress[] {
  const map = loadProgressMap();
  return sentences.map((s) => map[s.id] ?? newCardProgress(s.id));
}

/**
 * Returns sentences due for review today (or new cards not yet seen),
 * optionally filtered to specific CEFR levels, shuffled so each session feels fresh.
 */
export function getDueCards(levels?: CEFRLevel[]): CardProgress[] {
  const map = loadProgressMap();
  const pool =
    levels && levels.length > 0
      ? sentences.filter((s) => levels.includes(s.level))
      : sentences;
  const all = pool.map((s) => map[s.id] ?? newCardProgress(s.id));
  const due = all.filter(isDueToday);
  // Shuffle
  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }
  return due;
}

/**
 * Aggregated stats for the dashboard.
 */
export function getDashboardStats() {
  const all = getAllProgress();
  const dueToday = all.filter(isDueToday).length;
  const totalMastered = all.filter(isMastered).length;
  const newCards = all.filter((c) => c.lastReview === null).length;

  // Per-category breakdown
  const categoryMap: Record<
    string,
    { total: number; mastered: number; due: number }
  > = {};

  for (const sentence of sentences) {
    const card = all.find((c) => c.sentenceId === sentence.id)!;
    if (!categoryMap[sentence.category]) {
      categoryMap[sentence.category] = { total: 0, mastered: 0, due: 0 };
    }
    categoryMap[sentence.category].total += 1;
    if (isMastered(card)) categoryMap[sentence.category].mastered += 1;
    if (isDueToday(card)) categoryMap[sentence.category].due += 1;
  }

  return {
    dueToday,
    totalMastered,
    totalCards: sentences.length,
    newCards,
    categoryMap,
  };
}

/**
 * Clears all stored progress (for reset/debug).
 */
export function clearAllProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(PROGRESS_KEY);
}
