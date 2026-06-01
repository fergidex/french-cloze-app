'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

export default function UserMenu() {
  const [email, setEmail] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    createClient().auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null)
    })
  }, [])

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSignOut = async () => {
    await createClient().auth.signOut()
    router.push('/auth/sign-in')
  }

  if (!email) return null

  const initial = email[0].toUpperCase()

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-500 transition-colors flex items-center justify-center text-white text-sm font-semibold shrink-0"
        aria-label="User menu"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-zinc-800">
            <p className="text-xs text-zinc-400 truncate">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Account
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
