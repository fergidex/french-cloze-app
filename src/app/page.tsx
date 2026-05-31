'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import DashboardStats from '@/components/DashboardStats'
import LevelFilter from '@/components/LevelFilter'
import { createClient } from '@/lib/supabase'

export default function Home() {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setEmail(data.user?.email ?? null)
    }

    run()
  }, [])

  return (
    <div className="space-y-6">
      <div className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          🇫🇷 French Cloze
        </h1>
        <p className="text-sm text-zinc-400">
          Répétition espacée · CECRL
        </p>

        <p className="text-xs text-zinc-500">
          {email ? `Connecté en tant que ${email}` : 'Pas encore connecté'}
        </p>
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