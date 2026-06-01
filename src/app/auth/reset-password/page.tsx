'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type Phase = 'idle' | 'loading' | 'done' | 'error'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [phase, setPhase] = useState<Phase>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.')
      setPhase('error')
      return
    }
    if (password !== confirm) {
      setErrorMsg('Passwords do not match.')
      setPhase('error')
      return
    }

    setPhase('loading')
    setErrorMsg('')

    const { error } = await createClient().auth.updateUser({ password })

    if (error) {
      setErrorMsg(error.message)
      setPhase('error')
    } else {
      setPhase('done')
      setTimeout(() => router.push('/'), 1500)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2">
          <div className="text-4xl">🔒</div>
          <h1 className="text-2xl font-bold text-white tracking-tight">New password</h1>
          <p className="text-sm text-zinc-400">Choose a new password for your account</p>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 ring-1 ring-zinc-800 shadow-xl">
          {phase === 'done' ? (
            <div className="text-center space-y-2 py-4">
              <div className="text-3xl">✅</div>
              <p className="text-white font-semibold">Password updated</p>
              <p className="text-sm text-zinc-400">Redirecting you to the app…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="password" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                  autoComplete="new-password"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="confirm" className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full bg-zinc-800 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm outline-none transition-colors"
                />
              </div>

              {phase === 'error' && (
                <p className="text-red-400 text-sm">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={phase === 'loading' || !password || !confirm}
                className="w-full bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-colors"
              >
                {phase === 'loading' ? 'Updating…' : 'Update password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
