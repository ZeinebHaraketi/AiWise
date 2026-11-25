
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  History,
  MessageSquare,
  Wrench,
  FolderKanban,
  Trash2,
  Clock3,
  X,
  Sparkles,
} from "lucide-react";
import { useHistory, type HistoryItem } from "./history-context";

type FilterType = "All" | "assistant" | "tool" | "project";

function getDateGroup(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const itemDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  if (itemDate.getTime() === today.getTime()) return "Today";
  if (itemDate.getTime() === yesterday.getTime()) return "Yesterday";

  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  if (itemDate >= sevenDaysAgo) return "Previous 7 days";

  return "Older";
}

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(dateString));
}

const typeConfig = {
  assistant: {
    label: "AI Assistant",
    icon: MessageSquare,
    color: "text-purple-300",
    background: "bg-purple-500/10",
  },
  tool: {
    label: "AI Tool",
    icon: Wrench,
    color: "text-sky-300",
    background: "bg-sky-500/10",
  },
  project: {
    label: "Project",
    icon: FolderKanban,
    color: "text-emerald-300",
    background: "bg-emerald-500/10",
  },
};

const groups = ["Today", "Yesterday", "Previous 7 days", "Older"];

export function HistoryWorkspace() {
  const { history, removeHistoryItem, clearHistory } = useHistory();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tool.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesType =
        activeFilter === "All" || item.type === activeFilter;

      return matchesSearch && matchesType;
    });
  }, [history, search, activeFilter]);

  const groupedHistory = useMemo(() => {
    return groups
      .map((group) => ({
        name: group,
        items: filteredHistory.filter(
          (item) => getDateGroup(item.createdAt) === group
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredHistory]);

  const filters: { label: string; value: FilterType }[] = [
    { label: "All activity", value: "All" },
    { label: "AI Assistant", value: "assistant" },
    { label: "AI Tools", value: "tool" },
    { label: "Projects", value: "project" },
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#a78bfa]">
            <History size={14} />
            Your activity
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Your journey, <span className="text-[#8b5cf6]">in one place.</span>
          </h1>

          <p className="mt-2 text-sm text-[#94a3b8]">
            Revisit your AI interactions, discover past ideas, and pick up where you left off.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => setShowClearConfirmation(true)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/20 px-4 py-2.5 text-xs font-medium text-red-300 transition hover:bg-red-500/10"
          >
            <Trash2 size={15} />
            Clear history
          </button>
        )}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total activities",
            value: history.length,
            icon: History,
            color: "text-purple-300",
          },
          {
            label: "AI interactions",
            value: history.filter((item) => item.type === "assistant" || item.type === "tool").length,
            icon: Sparkles,
            color: "text-sky-300",
          },
          {
            label: "Projects",
            value: history.filter((item) => item.type === "project").length,
            icon: FolderKanban,
            color: "text-emerald-300",
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#27304a] bg-[#111827] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <Icon size={19} className={stat.color} />
              </div>
              <p className="mt-3 text-3xl font-semibold text-white">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      {/* Search and filters */}
      <section className="space-y-4">
        <div className="relative w-full lg:max-w-md">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your activity..."
            className="h-12 w-full rounded-xl border border-[#27304a] bg-[#111827] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#8b5cf6]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-lg border px-4 py-2.5 text-xs font-medium transition ${
                activeFilter === filter.value
                  ? "border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#c4b5fd]"
                  : "border-[#27304a] bg-[#111827] text-slate-400 hover:border-[#8b5cf6]/50 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Activity list */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">
            Recent activity
          </h2>
          <span className="text-xs text-slate-500">
            {filteredHistory.length} activities
          </span>
        </div>

        {groupedHistory.length > 0 ? (
          <div className="space-y-8">
            {groupedHistory.map((group) => (
              <div key={group.name}>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {group.name}
                  </h3>
                  <div className="h-px flex-1 bg-[#202a3d]" />
                  <span className="text-xs text-slate-600">
                    {group.items.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {group.items.map((item) => (
                    <HistoryCard
                      key={item.id}
                      item={item}
                      onRemove={removeHistoryItem}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#27304a] bg-[#111827]/50 px-5 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10">
              <History size={26} className="text-purple-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              {history.length === 0
                ? "Your story starts here"
                : "No activity found"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
              {history.length === 0
                ? "Your AI interactions and activities will appear here as you use AIWISE."
                : "Try another search or select a different activity filter."}
            </p>

            {history.length > 0 && (
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-4 text-xs font-medium text-[#a78bfa] hover:text-white"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </section>

      {/* Clear confirmation */}
      {showClearConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-[#27304a] bg-[#111827] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-white">
                Clear all history?
              </h3>
              <button
                onClick={() => setShowClearConfirmation(false)}
                aria-label="Close confirmation"
                className="rounded-lg p-1 text-slate-500 hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              This will permanently remove all your activity records from this browser.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowClearConfirmation(false)}
                className="rounded-lg border border-[#27304a] px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  clearHistory();
                  setShowClearConfirmation(false);
                }}
                className="rounded-lg bg-red-500 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-red-400"
              >
                Clear history
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryCard({
  item,
  onRemove,
}: {
  item: HistoryItem;
  onRemove: (id: string) => void;
}) {
  const config = typeConfig[item.type];
  const Icon = config.icon;

  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-[#202a3d] bg-[#111827] p-4 transition hover:border-[#8b5cf6]/30 sm:flex-row sm:items-center sm:p-5">
      <div className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${config.background}`}>
        <Icon size={20} className={config.color} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-white">
            {item.title}
          </h4>
          <span className={`rounded-md px-2 py-1 text-[10px] font-medium ${config.background} ${config.color}`}>
            {config.label}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {item.description}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
          <span>{item.tool}</span>
          <span>•</span>
          <span>{item.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock3 size={11} />
            {formatTime(item.createdAt)}
          </span>
        </div>
      </div>

      <button
        onClick={() => onRemove(item.id)}
        aria-label={`Delete ${item.title} from history`}
        title="Remove from history"
        className="self-end rounded-lg p-2 text-slate-500 opacity-100 transition hover:bg-red-500/10 hover:text-red-300 sm:self-center sm:opacity-0 sm:group-hover:opacity-100"
      >
        <Trash2 size={17} />
      </button>
    </article>
  );
}
