
import {
  Search,
  Bell,
  Command,
  ChevronDown,
} from "lucide-react";

export function Header() {
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

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-[#151d30]"
          aria-label="User menu"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#38bdf8] text-xs font-bold text-white">
            Z
          </span>
          <ChevronDown size={14} className="hidden text-slate-400 sm:block" />
        </button>
      </div>
    </header>
  );
}
