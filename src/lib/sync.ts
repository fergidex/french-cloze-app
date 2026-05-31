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

// Newer lastReview wins; if both null, remote wins (it may have data from another device)
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

  const remoteMap = new Map(remoteCards.map((c) => [c.sentenceId, c]))
  const localMap = new Map(localCards.map((c) => [c.sentenceId, c]))

  const merged: CardProgress[] = []
  const toUpsert: ReturnType<typeof cardToRow>[] = []

  for (const local of localCards) {
    const remote = remoteMap.get(local.sentenceId)
    const winner = remote ? mergeCard(local, remote) : local
    merged.push(winner)
    // Only upsert cards that have been touched (avoids writing 100 blank rows on first sync)
    if (winner.lastReview !== null) {
      toUpsert.push(cardToRow(userId, winner))
    }
  }

  // Persist merged result locally
  for (const card of merged) {
    saveCardProgress(card)
  }

  // Push merged result to Supabase
  if (toUpsert.length > 0) {
    await supabase.from('card_progress').upsert(toUpsert, { onConflict: 'user_id,sentence_id' })
  }
}

export async function pushCard(supabase: SupabaseClient, userId: string, card: CardProgress): Promise<void> {
  await supabase
    .from('card_progress')
    .upsert(cardToRow(userId, card), { onConflict: 'user_id,sentence_id' })
}
