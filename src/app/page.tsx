import Link from "next/link";
import DashboardStats from "@/components/DashboardStats";
import LevelFilter from "@/components/LevelFilter";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 pt-2">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          🇫🇷 French Cloze
        </h1>
        <p className="text-sm text-zinc-400">
          Répétition espacée · CECRL
        </p>
      </div>

      {/* Level filter */}
      <LevelFilter />

      {/* CTA */}
      <Link
        href="/practice"
        className="block w-full text-center bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold rounded-2xl py-4 text-base transition-colors touch-manipulation"
      >
        Commencer la révision →
      </Link>

      {/* Stats */}
      <DashboardStats />
    </div>
  );
}
