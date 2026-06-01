export type CEFRLevel = "B1" | "B2";

export type GrammarCategory =
  | "subjunctive"
  | "conditional_present"
  | "conditional_past"
  | "imparfait"
  | "passe_compose"
  | "imparfait_passe_compose"
  | "relative_clauses"
  | "futur_anterieur"
  | "passive_voice"
  | "reported_speech"
  | "gerund"
  | "si_clauses";

export const CATEGORY_LABELS: Record<GrammarCategory, string> = {
  subjunctive: "Subjonctif",
  conditional_present: "Conditionnel présent",
  conditional_past: "Conditionnel passé",
  imparfait: "Imparfait",
  passe_compose: "Passé composé",
  imparfait_passe_compose: "Imparfait vs Passé composé",
  relative_clauses: "Propositions relatives",
  futur_anterieur: "Futur antérieur",
  passive_voice: "Voix passive",
  reported_speech: "Discours indirect",
  gerund: "Gérondif",
  si_clauses: "Propositions en si",
};

export interface Sentence {
  id: number;
  text: string; // Contains ___ as the blank placeholder
  answer: string;
  level: CEFRLevel;
  category: GrammarCategory;
  explanation: string; // Grammar explanation — not displayed yet, for future use
  // Prompt clarity fields
  englishMeaning?: string;      // English translation shown when the intended word is otherwise ambiguous
  acceptedAnswers?: string[];   // Additional correct answers beyond the primary
  strictAccentMode?: boolean;   // If true, accents must match exactly; default false (normalized comparison)
}

// SM-2 card progress
export interface CardProgress {
  sentenceId: number;
  interval: number; // days until next review
  repetitions: number; // consecutive correct answers
  easeFactor: number; // SM-2 ease factor (starts at 2.5)
  nextReview: string; // ISO date string (YYYY-MM-DD)
  lastReview: string | null; // ISO date string
  totalCorrect: number;
  totalIncorrect: number;
}

export type SRSRating = "again" | "hard" | "good" | "easy";

// Quality values for SM-2: again=0, hard=2, good=4, easy=5
export const SRS_QUALITY: Record<SRSRating, number> = {
  again: 0,
  hard: 2,
  good: 4,
  easy: 5,
};

export interface DashboardStats {
  dueToday: number;
  totalMastered: number; // interval >= 21 days
  totalCards: number;
  newCards: number; // never reviewed
  categoryBreakdown: CategoryStat[];
}

export interface CategoryStat {
  category: GrammarCategory;
  label: string;
  total: number;
  mastered: number;
  due: number;
}
