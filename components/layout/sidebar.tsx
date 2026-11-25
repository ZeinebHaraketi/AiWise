
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  FolderKanban,
  Heart,
  History,
  Settings,
  UserRound,
  Zap,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Explore AI Tools", href: "/explore", icon: Compass },
  { label: "AI Assistant", href: "/assistant", icon: Sparkles },
  { label: "My Projects", href: "/projects", icon: FolderKanban },
  { label: "Favorites", href: "/favorites", icon: Heart },
  { label: "History", href: "/history", icon: History },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "User Profile", href: "/profile", icon: UserRound },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="group/sidebar flex min-h-screen w-[68px] shrink-0 flex-col border-r border-[#202a3d] bg-[#0b1020] px-2 py-5 transition-all duration-300 lg:w-[220px] lg:px-4">
      {/* Brand */}
      <Link
        href="/dashboard"
        className="mb-9 flex items-center justify-center gap-3 px-1 lg:justify-start"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/15 text-[#a78bfa]">
          <Zap size={20} />
        </span>

        <span className="hidden text-lg font-bold tracking-wide text-white lg:block">
          AIWISE
        </span>
      </Link>

      {/* Workspace label */}
      <p className="mb-3 hidden px-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 lg:block">
        Personal workspace
      </p>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center justify-center gap-3 rounded-xl px-3 py-3 text-sm transition-colors lg:justify-start ${
                isActive
                  ? "bg-[#19223a] text-white"
                  : "text-slate-400 hover:bg-[#151d30] hover:text-white"
              }`}
            >
              <Icon
                size={18}
                className={`shrink-0 ${
                  isActive ? "text-[#a78bfa]" : ""
                }`}
              />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom promotional card */}
      <div className="mt-6 hidden rounded-xl border border-[#27304a] bg-[#121a2d] p-3 lg:block">
        <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-[#8b5cf6]/15 text-[#a78bfa]">
          <Sparkles size={17} />
        </div>

        <p className="text-sm font-semibold text-white">
          A little more possibility.
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          Discover what you can create with AIWISE.
        </p>

        <Link
          href="/explore"
          className="mt-3 flex items-center justify-center rounded-lg bg-[#8b5cf6] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#7c3aed]"
        >
          Explore tools <span className="ml-1">→</span>
        </Link>
      </div>
    </aside>
  );
}
