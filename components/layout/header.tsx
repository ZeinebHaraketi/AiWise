"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, Command, ChevronDown, LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
      setIsSigningOut(false);
    }
  }
  return (
    <header className="sticky top-0 z-20 flex h-[68px] items-center justify-between gap-4 border-b border-[#202a3d] bg-[#080b16]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      {/* Search */}
      <div className="relative w-full max-w-xl">
        <Search
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="search"
          placeholder="Search your workspace..."
          aria-label="Search your workspace"
          className="h-10 w-full rounded-xl border border-[#202a3d] bg-[#111827] pl-10 pr-16 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-[#8b5cf6]"
        />

        <span className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs text-slate-500">
          <Command size={12} /> K
        </span>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-9 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-[#151d30] hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#8b5cf6]" />
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[#151d30]"
            aria-label="User menu"
            aria-expanded={isMenuOpen}
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#38bdf8] text-xs font-bold text-white">
              Z
            </span>
            <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-48 rounded-xl border border-[#202a3d] bg-[#111827] p-2 shadow-xl">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
              >
                <LogOut size={16} />
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
