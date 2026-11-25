
"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Video,
  AudioLines,
  Code2,
  Brain,
  Sparkles,
  ArrowUpRight,
  Star,
  Trash2,
} from "lucide-react";
import { useFavorites } from "./favorites-context";

const tools = [
  {
    name: "ChatGPT",
    category: "Text Generation",
    description:
      "Your versatile partner for writing, research, and everyday problem-solving.",
    icon: MessageSquare,
  },
  {
    name: "Claude",
    category: "Text Generation",
    description: "Think through complex ideas and write with clarity.",
    icon: Brain,
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Turn your imagination into extraordinary visuals.",
    icon: ImageIcon,
  },
  {
    name: "Runway",
    category: "Video",
    description: "Create cinematic videos from a single idea.",
    icon: Video,
  },
  {
    name: "ElevenLabs",
    category: "Audio",
    description: "Bring stories to life with expressive AI voices.",
    icon: AudioLines,
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    description: "Your AI pair programmer, right in your editor.",
    icon: Code2,
  },
  {
    name: "Perplexity",
    category: "Data Analysis",
    description: "Find clear answers backed by research and sources.",
    icon: Brain,
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "Organize your ideas and get more done.",
    icon: Sparkles,
  },
];

export function FavoritesWorkspace() {
  const { favorites, toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const favoriteTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesFavorite = favorites.includes(tool.name);
      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      return matchesFavorite && matchesSearch && matchesCategory;
    });
  }, [favorites, search, activeCategory]);

  const categories = [
    "All",
    ...Array.from(new Set(tools.map((tool) => tool.category))),
  ];

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      <section>
        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#a78bfa]">
          <Heart size={14} />
          Your personal collection
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Your favorites, <span className="text-[#8b5cf6]">all in one place.</span>
        </h1>

        <p className="mt-2 text-sm text-[#94a3b8]">
          Keep your favorite AI tools close and access them whenever inspiration strikes.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-[#27304a] bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Saved tools</p>
            <Heart size={19} className="text-purple-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-white">
            {favorites.length}
          </p>
        </div>

        <div className="rounded-xl border border-[#27304a] bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">Available categories</p>
            <Sparkles size={19} className="text-sky-400" />
          </div>
          <p className="mt-3 text-3xl font-semibold text-white">
            {new Set(favoriteTools.map((tool) => tool.category)).size}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your favorites..."
            className="h-12 w-full rounded-xl border border-[#27304a] bg-[#111827] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#8b5cf6]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                activeCategory === category
                  ? "border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#c4b5fd]"
                  : "border-[#27304a] bg-[#111827] text-slate-400 hover:border-[#8b5cf6]/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Star size={17} className="text-[#a78bfa]" />
            <h2 className="text-base font-semibold text-white">
              Your saved tools
            </h2>
          </div>

          <span className="text-xs text-slate-500">
            {favoriteTools.length} tools
          </span>
        </div>

        {favoriteTools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article
                  key={tool.name}
                  className="group rounded-xl border border-[#202a3d] bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#8b5cf6]/50 hover:bg-[#151d30]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[#27304a] bg-[#1b2940]">
                      <Icon size={20} className="text-sky-400" />
                    </div>

                    <button
                      onClick={() => toggleFavorite(tool.name)}
                      aria-label={`Remove ${tool.name} from favorites`}
                      title="Remove from favorites"
                      className="rounded-lg p-2 text-pink-400 transition hover:bg-pink-500/10"
                    >
                      <Heart size={19} fill="currentColor" />
                    </button>
                  </div>

                  <h3 className="mt-5 text-sm font-semibold text-white">
                    {tool.name}
                  </h3>

                  <p className="mt-1 text-[10px] font-medium text-sky-400">
                    {tool.category}
                  </p>

                  <p className="mt-3 min-h-10 text-xs leading-5 text-slate-400">
                    {tool.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between border-t border-[#202a3d] pt-3">
                    <span className="text-[11px] font-medium text-[#a78bfa]">
                      Saved to favorites
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-slate-500 transition group-hover:text-[#a78bfa]"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#27304a] bg-[#111827]/50 px-5 py-16 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-purple-500/10">
              <Heart size={26} className="text-purple-400" />
            </div>

            <h3 className="mt-4 text-sm font-semibold text-white">
              {favorites.length === 0
                ? "Your collection starts here"
                : "No matching favorites"}
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-500">
              {favorites.length === 0
                ? "Explore AIWISE and save the AI tools you love. They will appear here for quick access."
                : "Try another search or category to find your saved tools."}
            </p>

            {favorites.length === 0 && (
              <a
                href="/explore"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-purple-500"
              >
                Explore AI tools
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
