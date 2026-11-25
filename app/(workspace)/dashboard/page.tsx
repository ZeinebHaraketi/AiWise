
import {
  Sparkles,
  ArrowUpRight,
  Clock3,
  Folder,
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  CircleDashed,
  CalendarDays,
} from "lucide-react";

const stats = [
  {
    label: "Tools explored",
    value: "24",
    detail: "+5 this week",
    icon: Sparkles,
    color: "text-sky-400",
  },
  {
    label: "Projects created",
    value: "12",
    detail: "3 in progress",
    icon: Folder,
    color: "text-violet-400",
  },
  {
    label: "Hours saved",
    value: "38.5",
    detail: "+12% this month",
    icon: Clock3,
    color: "text-emerald-400",
  },
  {
    label: "Favorite tools",
    value: "08",
    detail: "Your creative toolkit",
    icon: Heart,
    color: "text-pink-400",
  },
];

const tools = [
  {
    name: "ChatGPT",
    category: "Text Generation",
    description:
      "Your versatile partner for writing, research, and everyday problem-solving.",
    icon: MessageSquare,
    color: "text-sky-400",
  },
  {
    name: "Claude",
    category: "Text Generation",
    description:
      "Think through complex ideas and write with clarity.",
    icon: Sparkles,
    color: "text-sky-400",
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description:
      "Turn your imagination into extraordinary visuals.",
    icon: ImageIcon,
    color: "text-sky-400",
  },
];

const projects = [
  { name: "Brand launch campaign", status: "In progress", updated: "Updated 2 hours ago", done: false },
  { name: "Q4 market research", status: "Completed", updated: "Updated yesterday", done: true },
  { name: "Website content refresh", status: "Draft", updated: "Updated 3 days ago", done: false },
];

const weeklyActivity = [
  { day: "Mon", height: 35 },
  { day: "Tue", height: 55 },
  { day: "Wed", height: 42 },
  { day: "Thu", height: 75 },
  { day: "Fri", height: 95 },
  { day: "Sat", height: 60 },
  { day: "Sun", height: 30 },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-7">

      {/* Welcome */}
      <section>
        <p className="text-sm text-[#94a3b8]">Your AI workspace</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Welcome back, Zeineb
        </h1>
        <p className="mt-2 text-sm text-[#94a3b8]">
          A little intelligence. A lot of possibility. Let's make something great.
        </p>
      </section>

      {/* Hero banner */}
      <section className="relative overflow-hidden rounded-2xl border border-[#27304a] bg-gradient-to-r from-[#191b3b] via-[#171a35] to-[#111827] p-6 sm:p-8">
        <div className="relative z-10 max-w-xl">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#a78bfa]">
            Your next big idea starts here
          </p>

          <h2 className="mt-4 text-2xl font-bold text-white">
            Less switching. More creating.
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Your favorite AI tools and brilliant ideas, all in one place.
          </p>

          <a
            href="/assistant"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7c3aed]"
          >
            Ask AIWISE <ArrowUpRight size={16} />
          </a>
        </div>

        <Sparkles
          size={76}
          className="absolute bottom-6 right-8 hidden text-[#a78bfa] drop-shadow-[0_0_20px_rgba(139,92,246,0.7)] sm:block"
        />
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-xl border border-[#202a3d] bg-[#111827] p-4 transition-colors hover:border-[#8b5cf6]/40 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">{stat.label}</p>
                <Icon size={17} className={stat.color} />
              </div>

              <p className="mt-4 text-2xl font-bold text-white">
                {stat.value}
              </p>

              <p className="mt-2 text-[11px] text-sky-400">
                {stat.detail}
              </p>
            </article>
          );
        })}
      </section>

      {/* Tools */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Pick up where you left off
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Your favorite tools, ready when you are.
            </p>
          </div>

          <a
            href="/explore"
            className="flex items-center gap-1 text-xs font-medium text-[#a78bfa] hover:text-white"
          >
            Explore all <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <article
                key={tool.name}
                className="group rounded-xl border border-[#202a3d] bg-[#111827] p-5 transition-all hover:-translate-y-1 hover:border-[#8b5cf6]/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[#1b2940]">
                    <Icon size={19} className={tool.color} />
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-slate-600 transition-colors group-hover:text-[#a78bfa]"
                  />
                </div>

                <h3 className="mt-4 text-sm font-semibold text-white">
                  {tool.name}
                </h3>

                <p className="mt-1 text-[10px] text-sky-400">
                  {tool.category}
                </p>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  {tool.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Projects and weekly activity */}
      <section className="grid gap-5 xl:grid-cols-2">

        {/* Recent projects */}
        <article className="rounded-xl border border-[#202a3d] bg-[#111827] p-5">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent projects
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Continue working on your ideas.
              </p>
            </div>

            <a
              href="/projects"
              className="text-xs text-[#a78bfa] hover:text-white"
            >
              View all →
            </a>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex items-center justify-between gap-3 border-b border-[#202a3d] pb-4 last:border-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#1b2940]">
                    <Folder size={17} className="text-[#a78bfa]" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {project.name}
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      {project.updated}
                    </p>
                  </div>
                </div>

                <span className={`flex shrink-0 items-center gap-1 text-[10px] ${
                  project.done ? "text-emerald-400" : "text-sky-400"
                }`}>
                  {project.done ? (
                    <CheckCircle2 size={12} />
                  ) : (
                    <CircleDashed size={12} />
                  )}
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Weekly activity */}
        <article className="rounded-xl border border-[#202a3d] bg-[#111827] p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Your week in focus
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                AI sessions this week. Keep the momentum going.
              </p>
            </div>

            <CalendarDays size={18} className="text-[#a78bfa]" />
          </div>

          <div className="mt-7 flex h-36 items-end justify-between gap-3">
            {weeklyActivity.map((item) => (
              <div
                key={item.day}
                className="flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="flex w-full flex-1 items-end">
                  <div
                    className={`w-full rounded-t-md ${
                      item.day === "Fri"
                        ? "bg-[#8b5cf6]"
                        : "bg-[#27304a]"
                    }`}
                    style={{ height: `${item.height}%` }}
                  />
                </div>

                <span className="text-[10px] text-slate-500">
                  {item.day}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-[#202a3d] pt-4">
            <span className="text-xs text-slate-400">
              Weekly activity
            </span>
            <span className="text-sm font-semibold text-white">
              18 AI sessions
            </span>
          </div>
        </article>
      </section>
    </div>
  );
}
