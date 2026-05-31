# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Development server at http://localhost:3000
npm run build            # Production build
npm run start            # Serve production build
npm run lint             # ESLint via next lint
npm run generate-icons   # One-time PWA icon generation (writes to public/)
```

> The PWA service worker is disabled in `dev` mode. Run `build && start` to test full PWA / offline behaviour.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3, dark mode via `class` strategy |
| PWA | `@ducanh2912/next-pwa` (Workbox) |
| Auth | Supabase (OTP / magic-link, SSR cookie refresh) |
| Persistence | `localStorage` (primary) — Supabase DB sync not yet implemented |

---

## Architecture

### Auth + Middleware

`src/middleware.ts` runs on every request. It creates a **server-side Supabase client** (via `@supabase/ssr`'s `createServerClient`) using request/response cookies and calls `supabase.auth.getUser()` to refresh the session token transparently. This keeps the cookie-based session alive without any client action.

`src/lib/supabase.ts` exports `createBrowserClient()` for use inside React components/pages. Environment variables required:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Auth flow: `/auth/sign-in` sends a magic-link OTP via `signInWithOtp({ email })`. There is no password flow. Auth is **optional** — the app works fully offline using localStorage. The home page shows the signed-in email if a session exists, but does not gate any content.

### Practice Session Flow (multi-file)

The session state machine lives entirely in `src/app/practice/page.tsx` and progresses through four phases: `loading → answering → rating → done`.

1. On mount, `getDueCards(levels)` (from `src/lib/storage.ts`) filters `sentences.ts` to cards where `isDueToday(card)` is true and shuffles them.
2. Each card renders `<ClozeCard>` which splits `sentence.text` on `___` and places an `<input>` inline. On every keystroke it compares the typed prefix against `sentence.answer` (case-insensitive, accent-sensitive) and turns the input green / red. When a full match fires, `onCorrect()` advances to `rating` phase.
3. `<SRSButtons>` (Again / Hard / Good / Easy) maps to SM-2 quality scores (0, 2, 4, 5). The rating calls `applyReview(card, rating)` from `src/lib/sm2.ts`, then `saveCardProgress(updated)` to localStorage.
4. Again/Hard re-push the card to the end of the session queue for immediate retry.

### SM-2 Algorithm (`src/lib/sm2.ts`)

| Rating | Quality | Effect |
|--------|---------|--------|
| Again  | 0 | interval=1, reps=0, EF heavily penalised |
| Hard   | 2 | interval=1, reps=0, EF penalised |
| Good   | 4 | normal interval growth, EF unchanged |
| Easy   | 5 | boosted interval growth, EF increases |

Interval progression: 0 → 1 → 6 → `prev × EF` days. EF starts at 2.5, minimum 1.3. A card is **mastered** when `interval ≥ 21` AND `repetitions ≥ 3`.

### localStorage Schema

Key `"french-cloze-progress"` → `Record<sentenceId, CardProgress>`:

```ts
interface CardProgress {
  sentenceId: number;
  interval: number;       // days
  repetitions: number;
  easeFactor: number;     // starts at 2.5
  nextReview: string;     // "YYYY-MM-DD"
  lastReview: string | null;
  totalCorrect: number;
  totalIncorrect: number;
}
```

A second key `"french-cloze-levels"` stores the active `('B1' | 'B2')[]` level filter. All localStorage access goes through `src/lib/storage.ts`.

### Sentence Data (`src/data/sentences.ts`)

100 hand-crafted B1/B2 sentences. Each has `text` (with `___` blank), `answer`, `level`, `category`, and `explanation` (grammar note — not yet shown in UI). The 12 `GrammarCategory` values are defined in `src/types/index.ts` and drive the dashboard category breakdown.

### iOS / PWA Specifics

- `globals.css` defines `.pb-nav` (padding-bottom accounting for fixed nav + iOS safe-area inset) — apply to any scrollable page content.
- `tailwind.config.js` includes custom `brand.*` colours, `fade-in` / `slide-up` / `pulse-correct` animations.
- `public/manifest.json` declares a `/practice` shortcut for quick home-screen launch.

---

## Planned Features

- **Grammar explanation modal** — `explanation` is populated on all 100 sentences; not yet wired to UI.
- **Supabase progress sync** — persist `CardProgress` to a Supabase table so progress survives device changes.
- **Streak tracking**, **TTS audio**, **custom sentence import**.
