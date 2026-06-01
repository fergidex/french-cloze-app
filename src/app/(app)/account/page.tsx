'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

type PasswordResetPhase = 'idle' | 'sending' | 'sent' | 'error'
type DeletePhase = 'idle' | 'confirming' | 'deleting' | 'error'

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [passwordPhase, setPasswordPhase] = useState<PasswordResetPhase>('idle')
  const [deletePhase, setDeletePhase] = useState<DeletePhase>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  const handleChangePassword = async () => {
    if (!email) return
    setPasswordPhase('sending')
    setErrorMsg('')

    const origin = window.location.origin
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=/auth/reset-password`,
    })

    if (error) {
      setErrorMsg(error.message)
      setPasswordPhase('error')
    } else {
      setPasswordPhase('sent')
    }
  }

  const handleDeleteAccount = async () => {
    setDeletePhase('deleting')
    setErrorMsg('')

    const res = await fetch('/api/delete-account', { method: 'POST' })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      setErrorMsg(body.error ?? 'Failed to delete account.')
      setDeletePhase('error')
      return
    }

    await createClient().auth.signOut()
    router.push('/auth/sign-in')
  }

  const handleSignOut = async () => {
    await createClient().auth.signOut()
    router.push('/auth/sign-in')
  }

  return (
    <div className="space-y-6 pt-2">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white tracking-tight">Account</h1>
        {email && <p className="text-sm text-zinc-400">{email}</p>}
      </div>

      {/* Change password */}
      <div className="bg-zinc-900 rounded-3xl p-5 ring-1 ring-zinc-800 space-y-3">
        <div>
          <p className="text-sm font-medium text-white">Password</p>
          <p className="text-xs text-zinc-500 mt-0.5">Send a reset link to your email</p>
        </div>

        {passwordPhase === 'sent' ? (
          <p className="text-sm text-emerald-400">Reset link sent — check your inbox.</p>
        ) : (
          <button
            onClick={handleChangePassword}
            disabled={passwordPhase === 'sending'}
            className="text-sm text-blue-400 hover:text-blue-300 disabled:opacity-50 transition-colors"
          >
            {passwordPhase === 'sending' ? 'Sending…' : 'Change password'}
          </button>
        )}
        {passwordPhase === 'error' && (
          <p className="text-sm text-red-400">{errorMsg}</p>
        )}
      </div>

      {/* Sign out */}
      <div className="bg-zinc-900 rounded-3xl p-5 ring-1 ring-zinc-800">
        <button
          onClick={handleSignOut}
          className="w-full text-sm font-medium text-zinc-300 hover:text-white transition-colors text-left"
        >
          Sign out
        </button>
      </div>

      {/* Delete account */}
      <div className="bg-zinc-900 rounded-3xl p-5 ring-1 ring-zinc-800 space-y-3">
        <div>
          <p className="text-sm font-medium text-white">Danger zone</p>
          <p className="text-xs text-zinc-500 mt-0.5">Permanently delete your account and all progress</p>
        </div>

        {deletePhase === 'idle' && (
          <button
            onClick={() => setDeletePhase('confirming')}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Delete account
          </button>
        )}

        {deletePhase === 'confirming' && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-300">This cannot be undone. Are you sure?</p>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteAccount}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
              >
                Yes, delete
              </button>
              <button
                onClick={() => setDeletePhase('idle')}
                className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {deletePhase === 'deleting' && (
          <p className="text-sm text-zinc-400">Deleting account…</p>
        )}

        {deletePhase === 'error' && (
          <div className="space-y-2">
            <p className="text-sm text-red-400">{errorMsg}</p>
            <button
              onClick={() => { setDeletePhase('idle'); setErrorMsg('') }}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
