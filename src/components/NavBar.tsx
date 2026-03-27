"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 safe-area-bottom">
      <div className="max-w-lg mx-auto flex">
        <NavItem
          href="/"
          label="Accueil"
          active={pathname === "/"}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={pathname === "/" ? 2.5 : 2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          }
        />
        <NavItem
          href="/practice"
          label="Pratiquer"
          active={pathname === "/practice"}
          icon={
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={pathname === "/practice" ? 2.5 : 2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          }
        />
      </div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
  icon,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`flex-1 flex flex-col items-center justify-center py-3 gap-1 transition-colors touch-manipulation ${
        active ? "text-blue-400" : "text-zinc-500 hover:text-zinc-300"
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
