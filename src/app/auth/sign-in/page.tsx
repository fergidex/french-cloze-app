'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

type Phase = 'idle' | 'loading' | 'sent' | 'error'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPhase('loading')
    setErrorMsg('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      setErrorMsg(error.message)
      setPhase('error')
    } else {
      setPhase('sent')
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-4xl">🇫🇷</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">French Cloze</h1>
          <p className="text-sm text-zinc-400">Sign in to sync your progress across devices</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 rounded-3xl p-6 ring-1 ring-zinc-800 shadow-xl space-y-5">
          {phase === 'sent' ? (
            <div className="text-center space-y-3 py-4">
              <div className="text-3xl">📬</div>
              <p className="text-white font-semibold">Check your inbox</p>
              <p className="text-sm text-zinc-400">
                We sent a magic link to <span className="text-zinc-200">{email}</span>.
                Tap it to sign in — no password needed.
              </p>
              <button
                onClick={() => { setPhase('idle'); setEmail('') }}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-2"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  autoFocus
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm outline-none transition-colors"
                />
              </div>

              {phase === 'error' && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={phase === 'loading' || !email}
                className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-colors"
              >
                {phase === 'loading' ? 'Sending…' : 'Send magic link'}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-600">
          <Link href="/" className="hover:text-zinc-400 transition-colors">
            ← Back to app
          </Link>
        </p>
      </div>
    </div>
  )
}
