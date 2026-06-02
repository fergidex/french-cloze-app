"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { GrammarCategory, Sentence } from "@/types";

interface ClozeCardProps {
  sentence: Sentence;
  onCorrect: () => void;
}

type InputState = "idle" | "wrong" | "correct";

const ACCENTS = ["é", "è", "ê", "ë", "à", "â", "ù", "û", "ç", "î", "ï", "ô", "œ", "æ"] as const;

function normalizeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Coaching-voice fallback hints, one per category, used when the explanation
// sentences are all contaminated with the answer word.
const CATEGORY_HINTS: Record<GrammarCategory, string> = {
  subjunctive:
    "Something in this sentence triggers the subjunctive — look for an expression of will, emotion, doubt, or a conjunction like 'pour que' or 'bien que'.",
  conditional_present:
    "This calls for the conditionnel présent — is it expressing a wish, advice, a polite suggestion, or speech reported from the past?",
  conditional_past:
    "Think about what would have happened if a past condition had been met — that counterfactual meaning points to the conditionnel passé.",
  imparfait:
    "Think about whether this verb describes a habitual action, an ongoing background state, or a past emotion rather than a single completed event.",
  passe_compose:
    "This calls for a completed, bounded past action — something that happened once with a clear endpoint.",
  imparfait_passe_compose:
    "One tense sets the scene (ongoing or habitual); the other narrates what happened in it (completed event). Which role does this blank play?",
  relative_clauses:
    "Consider the role this word plays in the relative clause — is it the subject, direct object, or the object of a preposition?",
  futur_anterieur:
    "This action will be completely finished before another future event takes place — that ordering of two future moments points to a specific compound tense.",
  passive_voice:
    "The subject here receives the action rather than performing it — that reversal is the key to the form needed.",
  reported_speech:
    "When reporting past speech, tenses shift back one step: present → imparfait, future → conditionnel. Apply that shift here.",
  gerund:
    "Think about how to express an action happening simultaneously with, or as the means of, the main verb — the gérondif construction.",
  si_clauses:
    "Look at the tense in the si clause — it will tell you exactly which tense belongs in the main clause, since the two are always paired.",
};

/**
 * Generates a pedagogical hint from the sentence's explanation field.
 * Never reveals the answer word. Returns up to two safe sentences from the
 * explanation, falling back to a category-level coaching prompt.
 */
function buildHint(sentence: Sentence): string {
  const answerLower = sentence.answer.toLowerCase();

  // Word-aware contamination check — avoids false positives where the answer
  // is a short string that appears as a substring inside another word.
  const containsAnswer = (text: string): boolean => {
    const words = text
      .split(/[\s,;:!?'"()[\]{}/\\→]+/)
      .map((w) => w.replace(/[^a-zà-ÿA-ZÀ-Ÿ]/gi, "").toLowerCase())
      .filter(Boolean);
    return words.includes(answerLower);
  };

  // Split the explanation into individual sentences, preserving punctuation.
  const parts =
    sentence.explanation
      .match(/[^.!?]+[.!?]*/g)
      ?.map((s) => s.trim())
      .filter((s) => s.length > 0) ?? [];

  // Collect up to 2 sentences that don't contain the answer.
  const safe: string[] = [];
  for (const part of parts) {
    if (containsAnswer(part)) continue;
    safe.push(part);
    if (safe.length === 2) break;
  }

  if (safe.length > 0) {
    const combined = safe.join(" ");
    // Stay within a readable length
    return combined.length <= 220 ? combined : safe[0];
  }

  return CATEGORY_HINTS[sentence.category];
}

export default function ClozeCard({ sentence, onCorrect }: ClozeCardProps) {
  const [input, setInput] = useState("");
  const [state, setState] = useState<InputState>("idle");
  const [revealed, setRevealed] = useState(false);
  const [hintShown, setHintShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // Tracks cursor position so accent buttons can insert at the right spot.
  // Kept in a ref to avoid re-renders; updated on every selection change and blur.
  const selectionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

  const saveSelection = () => {
    if (inputRef.current) {
      selectionRef.current = {
        start: inputRef.current.selectionStart ?? input.length,
        end: inputRef.current.selectionEnd ?? input.length,
      };
    }
  };

  const insertAccent = (char: string) => {
    const { start, end } = selectionRef.current;
    const newValue = input.slice(0, start) + char + input.slice(end);
    setInput(newValue);
    checkInput(newValue);
    // Restore focus and advance cursor past the inserted character
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(start + 1, start + 1);
      }
    });
  };

  // Reset when sentence changes
  useEffect(() => {
    setInput("");
    setState("idle");
    setRevealed(false);
    setHintShown(false);
    selectionRef.current = { start: 0, end: 0 };
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [sentence.id]);

  const handleShowAnswer = () => {
    setInput(sentence.answer);
    setState("correct");
    setRevealed(true);
    onCorrect();
  };

  const checkInput = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setState("idle");
        return;
      }
      const normalize = (s: string) =>
        sentence.strictAccentMode === true
          ? s.toLowerCase()
          : normalizeAccents(s.toLowerCase());
      const typedNorm = normalize(value);
      const allAnswers = [sentence.answer, ...(sentence.acceptedAnswers ?? [])];
      if (allAnswers.some((a) => normalize(a) === typedNorm)) {
        setState("correct");
        onCorrect();
      } else if (allAnswers.some((a) => normalize(a).startsWith(typedNorm))) {
        setState("idle");
      } else {
        setState("wrong");
      }
    },
    [sentence.answer, sentence.acceptedAnswers, sentence.strictAccentMode, onCorrect]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    checkInput(value);
  };

  // Build the sentence with the blank as an inline input
  const [before, after] = sentence.text.split("___");

  const inputColorClass =
    state === "correct"
      ? "text-green-400 border-green-500 bg-green-950/40"
      : state === "wrong"
        ? "text-red-400 border-red-500 bg-red-950/40"
        : "text-white border-zinc-500 bg-zinc-800";

  return (
    <div className="animate-fade-in space-y-6">
      {/* Level + category badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            sentence.level === "B2"
              ? "bg-violet-900/60 text-violet-300 ring-1 ring-violet-600"
              : "bg-blue-900/60 text-blue-300 ring-1 ring-blue-600"
          }`}
        >
          {sentence.level}
        </span>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 ring-1 ring-zinc-700">
          {sentence.category
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      </div>

      {/* Sentence with inline cloze input */}
      <div className="text-xl sm:text-2xl leading-relaxed text-zinc-100 font-medium">
        <span>{before}</span>
        <span className="inline-flex items-center align-baseline mx-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleChange}
            disabled={state === "correct"}
            autoCapitalize="none"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            onSelect={saveSelection}
            onKeyUp={saveSelection}
            onMouseUp={saveSelection}
            onBlur={saveSelection}
            className={`
              inline-block border-b-2 border-t-0 border-l-0 border-r-0
              rounded-none bg-transparent outline-none
              text-xl sm:text-2xl font-medium text-center
              transition-colors duration-100
              px-1 py-0
              min-w-[80px]
              ${inputColorClass}
            `}
            style={{ width: `${Math.max(sentence.answer.length + 1, 6)}ch` }}
            aria-label="Type the missing French word"
          />
        </span>
        <span>{after}</span>
      </div>

      {/* English meaning */}
      <p className="text-sm text-zinc-500 italic leading-snug">
        <span className="not-italic text-zinc-600 text-xs font-medium uppercase tracking-wide">en · </span>
        {sentence.englishMeaning}
      </p>

      {/* Accent character buttons */}
      {state !== "correct" && (
        <div className="flex flex-wrap gap-1.5">
          {ACCENTS.map((char) => (
            <button
              key={char}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => insertAccent(char)}
              className="min-w-[2.25rem] h-9 px-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-600 text-zinc-300 text-sm font-medium transition-colors touch-manipulation ring-1 ring-zinc-700"
            >
              {char}
            </button>
          ))}
        </div>
      )}

      {/* Correct answer reveal */}
      {state === "correct" && (
        <div className="animate-slide-up flex items-center gap-2 text-sm font-medium">
          {revealed ? (
            <>
              <svg
                className="w-4 h-4 flex-shrink-0 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span className="text-amber-400">
                Réponse : <span className="font-bold">{sentence.answer}</span>
              </span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 flex-shrink-0 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-green-400">Correct !</span>
            </>
          )}
        </div>
      )}

      {/* Hint box */}
      {hintShown && state !== "correct" && (
        <div className="text-xs bg-amber-950/40 text-amber-300 rounded-xl px-3 py-2.5 ring-1 ring-amber-800/50 leading-relaxed">
          <span className="font-semibold">Indice : </span>
          {buildHint(sentence)}
        </div>
      )}

      {/* Letter count + action buttons */}
      {state !== "correct" && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-zinc-500 tabular-nums">
            {sentence.answer.length} lettre
            {sentence.answer.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-3">
            {!hintShown && (
              <button
                onClick={() => setHintShown(true)}
                className="text-xs text-zinc-500 hover:text-zinc-300 active:text-zinc-400 transition-colors touch-manipulation"
              >
                Indice
              </button>
            )}
            <button
              onClick={handleShowAnswer}
              className="text-xs text-zinc-500 hover:text-zinc-300 active:text-zinc-400 transition-colors touch-manipulation underline underline-offset-2"
            >
              Voir la réponse
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
