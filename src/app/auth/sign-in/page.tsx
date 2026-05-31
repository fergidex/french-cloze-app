'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState<string | null>(null)

  const supabase = createClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Check your email for the login link.')
  }

  const checkSession = async () => {
    const { data } = await supabase.auth.getUser()
    setUserId(data.user?.id ?? null)
    if (!data.user) setMessage('No active session yet.')
    else setMessage(`Signed in as ${data.user.email ?? data.user.id}`)
  }

  return (
    <main style={{ padding: 24, maxWidth: 480 }}>
      <h1>Sign in</h1>

      <form onSubmit={handleSignIn} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ padding: 12, border: '1px solid #ccc', borderRadius: 8 }}
        />
        <button type="submit" style={{ padding: 12, borderRadius: 8 }}>
          Send login link
        </button>
      </form>

      <button
        onClick={checkSession}
        style={{ marginTop: 12, padding: 12, borderRadius: 8 }}
      >
        Check session
      </button>

      {message ? <p style={{ marginTop: 12 }}>{message}</p> : null}
      {userId ? <p style={{ marginTop: 12 }}>User ID: {userId}</p> : null}
    </main>
  )
}