'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardStats from '@/components/DashboardStats'
import LevelFilter from '@/components/LevelFilter'
import { createClient } from '@/lib/supabase'
import { syncProgress } from '@/lib/sync'

export default function Home() {
  const [email, setEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      const user = data.user
      setEmail(user?.email ?? null)
      if (user) {
        syncProgress(supabase, user.id).catch(() => {})
      }
    }
    run()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/auth/sign-in')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between pt-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-white tracking-tight">
            🇫🇷 French Cloze
          </h1>
          <p className="text-sm text-zinc-400">Répétition espacée · CECRL</p>
          {email && (
            <p className="text-xs text-zinc-500">{email}</p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-1 shrink-0"
        >
          Sign out
        </button>
      </div>

      <LevelFilter />

      <Link
        href="/practice"
        className="block w-full text-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-2xl py-4 text-base transition-colors touch-manipulation"
      >
        Commencer la révision →
      </Link>

      <DashboardStats />
    </div>
  )
}
