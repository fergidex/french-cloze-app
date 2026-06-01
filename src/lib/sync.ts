import type { SupabaseClient } from '@supabase/supabase-js'
import type { CardProgress } from '@/types'
import { getAllProgress, saveCardProgress } from '@/lib/storage'

interface DbRow {
  sentence_id: number
  interval: number
  repetitions: number
  ease_factor: number
  next_review: string
  last_review: string | null
  total_correct: number
  total_incorrect: number
}

function rowToCard(row: DbRow): CardProgress {
  return {
    sentenceId: row.sentence_id,
    interval: row.interval,
    repetitions: row.repetitions,
    easeFactor: row.ease_factor,
    nextReview: row.next_review,
    lastReview: row.last_review,
    totalCorrect: row.total_correct,
    totalIncorrect: row.total_incorrect,
  }
}

function cardToRow(userId: string, card: CardProgress): DbRow & { user_id: string; updated_at: string } {
  return {
    user_id: userId,
    sentence_id: card.sentenceId,
    interval: card.interval,
    repetitions: card.repetitions,
    ease_factor: card.easeFactor,
    next_review: card.nextReview,
    last_review: card.lastReview,
    total_correct: card.totalCorrect,
    total_incorrect: card.totalIncorrect,
    updated_at: new Date().toISOString(),
  }
}

// Newer lastReview wins; if both null, remote wins (may have data from another device)
function mergeCard(local: CardProgress, remote: CardProgress): CardProgress {
  if (!local.lastReview) return remote
  if (!remote.lastReview) return local
  return local.lastReview >= remote.lastReview ? local : remote
}

export async function syncProgress(supabase: SupabaseClient, userId: string): Promise<void> {
  const { data, error } = await supabase
    .from('card_progress')
    .select('sentence_id,interval,repetitions,ease_factor,next_review,last_review,total_correct,total_incorrect')
    .eq('user_id', userId)

  if (error) return

  const remoteCards = (data as DbRow[]).map(rowToCard)
  const localCards = getAllProgress()

  const localById: Record<number, CardProgress> = {}
  for (const c of localCards) localById[c.sentenceId] = c

  const remoteById: Record<number, CardProgress> = {}
  for (const c of remoteCards) remoteById[c.sentenceId] = c

  // Collect all sentence IDs seen on either side
  const seen = new Set<number>()
  localCards.forEach((c) => seen.add(c.sentenceId))
  remoteCards.forEach((c) => seen.add(c.sentenceId))
  const allIds = Array.from(seen)

  const toUpsert: ReturnType<typeof cardToRow>[] = []

  for (const id of allIds) {
    const local = localById[id]
    const remote = remoteById[id]

    let winner: CardProgress
    if (local && remote) {
      winner = mergeCard(local, remote)
    } else {
      winner = (local ?? remote)!
    }

    saveCardProgress(winner)

    if (winner.lastReview !== null) {
      toUpsert.push(cardToRow(userId, winner))
    }
  }

  if (toUpsert.length > 0) {
    await supabase.from('card_progress').upsert(toUpsert, { onConflict: 'user_id,sentence_id' })
  }
}

export async function pushCard(supabase: SupabaseClient, userId: string, card: CardProgress): Promise<void> {
  await supabase
    .from('card_progress')
    .upsert(cardToRow(userId, card), { onConflict: 'user_id,sentence_id' })
}
