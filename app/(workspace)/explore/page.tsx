"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Image as ImageIcon,
  Video,
  AudioLines,
  Code2,
  Brain,
  Star,
  Heart,
} from "lucide-react";

import { useFavorites } from "@/features/favorites/favorites-context";

const categories = [
  "All",
  "Text Generation",
  "Image Generation",
  "Video",
  "Audio",
  "Coding",
  "Data Analysis",
  "Productivity",
];

const tools = [
  {
    name: "ChatGPT",
    category: "Text Generation",
    description:
      "Your versatile partner for writing, research, and everyday problem-solving.",
    icon: MessageSquare,
    featured: true,
    popular: true,
  },
  {
    name: "Claude",
    category: "Text Generation",
    description: "Think through complex ideas and write with clarity.",
    icon: Brain,
    featured: true,
    popular: true,
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Turn your imagination into extraordinary visuals.",
    icon: ImageIcon,
    featured: true,
    popular: true,
  },
  {
    name: "Runway",
    category: "Video",
    description: "Create cinematic videos from a single idea.",
    icon: Video,
    featured: false,
    popular: true,
  },
  {
    name: "ElevenLabs",
    category: "Audio",
    description: "Bring stories to life with expressive AI voices.",
    icon: AudioLines,
    featured: false,
    popular: true,
  },
  {
    name: "GitHub Copilot",
    category: "Coding",
    description: "Your AI pair programmer, right in your editor.",
    icon: Code2,
    featured: false,
    popular: true,
  },
  {
    name: "Perplexity",
    category: "Data Analysis",
    description: "Find clear answers backed by research and sources.",
    icon: Brain,
    featured: false,
    popular: false,
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "Organize your ideas and get more done.",
    icon: Sparkles,
    featured: false,
    popular: false,
  },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      const matchesSearch =
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase()) ||
        tool.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-7">
      {/* Page heading */}
      <section>
        <p className="text-xs font-medium uppercase tracking-widest text-[#8b5cf6]">
          Discover your possibilities
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Find your next superpower.
        </h1>

        <p className="mt-2 text-sm text-[#94a3b8]">
          Discover remarkable AI tools, curated for the way you work.
        </p>
      </section>

      {/* Search */}
      <section>
        <div className="flex items-center gap-3 rounded-xl border border-[#27304a] bg-[#111827] px-4 py-3 transition-colors focus-within:border-[#8b5cf6]">
          <Search size={19} className="shrink-0 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools by name..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          <span className="hidden rounded border border-[#27304a] px-2 py-1 text-[10px] text-slate-500 sm:block">
            Search
          </span>
        </div>
      </section>

      {/* Categories */}
      <section className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                active
                  ? "border-[#8b5cf6] bg-[#8b5cf6]/15 text-[#c4b5fd]"
                  : "border-[#27304a] bg-[#111827] text-slate-400 hover:border-[#8b5cf6]/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          );
        })}
      </section>

      {/* Featured heading */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles size={17} className="text-[#a78bfa]" />
              <h2 className="text-base font-semibold text-white">
                Featured & trending
              </h2>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Explore tools worth discovering.
            </p>
          </div>

          <span className="text-xs text-slate-500">
            {filteredTools.length} tools
          </span>
        </div>

        {/* Tool cards */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const favorite = isFavorite(tool.name);

              return (
                <article
                  key={tool.name}
                  className="group relative rounded-xl border border-[#202a3d] bg-[#111827] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#8b5cf6]/50 hover:bg-[#151d30]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-[#27304a] bg-[#1b2940]">
                      <Icon size={20} className="text-sky-400" />
                    </div>

                    {/* <div className="flex items-center gap-2">
                      {tool.popular && (
                        <span className="flex items-center gap-1 rounded-md bg-[#8b5cf6]/10 px-2 py-1 text-[10px] text-[#c4b5fd]">
                          <Star size={11} />
                          Popular
                        </span>
                      )}

                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 transition-colors group-hover:text-[#a78bfa]"
                      />
                    </div> */}

                    <div className="flex items-center gap-2">
                      {tool.popular && (
                        <span className="flex items-center gap-1 rounded-md bg-[#8b5cf6]/10 px-2 py-1 text-[10px] text-[#c4b5fd]">
                          <Star size={11} />
                          Popular
                        </span>
                      )}

                      <button
                        onClick={() => toggleFavorite(tool.name)}
                        aria-label={
                          favorite
                            ? `Remove ${tool.name} from favorites`
                            : `Add ${tool.name} to favorites`
                        }
                        title={
                          favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        className="rounded-lg p-2 transition hover:bg-pink-500/10"
                      >
                        <Heart
                          size={17}
                          fill={favorite ? "currentColor" : "none"}
                          className={
                            favorite
                              ? "text-pink-400"
                              : "text-slate-500 hover:text-pink-400"
                          }
                        />
                      </button>

                      <ArrowUpRight
                        size={16}
                        className="text-slate-600 transition-colors group-hover:text-[#a78bfa]"
                      />
                    </div>
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

                  <div className="mt-5 border-t border-[#202a3d] pt-3">
                    <span className="text-[11px] font-medium text-[#a78bfa] transition-colors group-hover:text-white">
                      Discover tool →
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#27304a] bg-[#111827]/50 px-5 py-14 text-center">
            <Search size={26} className="mx-auto text-slate-500" />

            <h3 className="mt-4 text-sm font-semibold text-white">
              No tools found
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              Try another search or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-xs font-medium text-[#a78bfa] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
