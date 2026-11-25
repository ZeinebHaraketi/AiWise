
"use client";

import { useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  MoreHorizontal,
  Clock3,
  CheckCircle2,
  CircleDashed,
  ArrowUpRight,
  LayoutGrid,
} from "lucide-react";

type ProjectStatus = "In Progress" | "Draft" | "Completed";

type Project = {
  id: number;
  name: string;
  description: string;
  category: string;
  status: ProjectStatus;
  updatedAt: string;
  progress: number;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "AI Marketing Strategy",
    description: "A complete marketing strategy powered by AI insights.",
    category: "Marketing",
    status: "In Progress",
    updatedAt: "Updated 2 hours ago",
    progress: 68,
  },
  {
    id: 2,
    name: "Brand Identity Concept",
    description: "Building a visual identity for a new creative brand.",
    category: "Design",
    status: "In Progress",
    updatedAt: "Updated yesterday",
    progress: 42,
  },
  {
    id: 3,
    name: "Content Creation Hub",
    description: "Organizing ideas and workflows for content production.",
    category: "Content",
    status: "Draft",
    updatedAt: "Updated 3 days ago",
    progress: 0,
  },
  {
    id: 4,
    name: "Customer Insights",
    description: "Exploring customer behavior and market opportunities.",
    category: "Research",
    status: "Completed",
    updatedAt: "Completed last week",
    progress: 100,
  },
];

const statusStyles: Record<ProjectStatus, string> = {
  "In Progress": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  Draft: "bg-slate-500/10 text-slate-300 border-slate-500/20",
  Completed: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
};

export function ProjectsWorkspace() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [menuProject, setMenuProject] = useState<number | null>(null);

  const filters = ["All", "In Progress", "Draft", "Completed"];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase()) ||
        project.category.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        activeFilter === "All" || project.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [projects, search, activeFilter]);

  function createProject() {
    const name = window.prompt("Enter your project name:");
    if (!name?.trim()) return;

    setProjects((current) => [
      {
        id: Date.now(),
        name: name.trim(),
        description: "Your new project. Start adding ideas and tasks.",
        category: "General",
        status: "Draft",
        updatedAt: "Created just now",
        progress: 0,
      },
      ...current,
    ]);
    setActiveFilter("All");
    setSearch("");
  }

  function deleteProject(id: number) {
    setProjects((current) => current.filter((project) => project.id !== id));
    setMenuProject(null);
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm text-slate-400">
            <FolderKanban size={16} />
            <span>Workspace</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-300">My Projects</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ideas, moving <span className="text-purple-400">forward.</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Your creative space to organize ideas, manage projects, and turn
            inspiration into something real.
          </p>
        </div>

        <button
          onClick={createProject}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-500"
        >
          <Plus size={18} />
          Create project
        </button>
      </div>

      {/* Project overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            label: "Total projects",
            value: projects.length,
            icon: LayoutGrid,
            color: "text-purple-300",
          },
          {
            label: "In progress",
            value: projects.filter((p) => p.status === "In Progress").length,
            icon: Clock3,
            color: "text-sky-300",
          },
          {
            label: "Completed",
            value: projects.filter((p) => p.status === "Completed").length,
            icon: CheckCircle2,
            color: "text-emerald-300",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/[0.07] bg-[#111827] p-5"
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
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search your projects..."
            className="h-12 w-full rounded-xl border border-white/[0.08] bg-[#111827] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-purple-500/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg px-4 py-2.5 text-sm transition ${
                activeFilter === filter
                  ? "bg-purple-500/15 text-purple-300 ring-1 ring-purple-500/30"
                  : "border border-white/[0.06] text-slate-400 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Projects grid */}
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your projects</h2>
          <span className="text-sm text-slate-500">
            {filteredProjects.length} projects
          </span>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group relative rounded-2xl border border-white/[0.07] bg-[#111827] p-5 transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-950/10"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-300">
                    <FolderKanban size={21} />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setMenuProject(
                          menuProject === project.id ? null : project.id
                        )
                      }
                      aria-label={`Options for ${project.name}`}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {menuProject === project.id && (
                      <div className="absolute right-0 top-10 z-10 w-36 rounded-xl border border-white/10 bg-[#1a2233] p-1 shadow-xl">
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 transition hover:bg-red-500/10"
                        >
                          Delete project
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    {project.category}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-white transition group-hover:text-purple-300">
                    {project.name}
                  </h3>
                  <p className="mt-2 min-h-10 text-sm leading-5 text-slate-400">
                    {project.description}
                  </p>
                </div>

                <div className="mb-5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}
                  >
                    {project.status === "Completed" ? (
                      <CheckCircle2 size={13} />
                    ) : project.status === "Draft" ? (
                      <CircleDashed size={13} />
                    ) : (
                      <Clock3 size={13} />
                    )}
                    {project.status}
                  </span>
                </div>

                <div className="mb-5">
                  <div className="mb-2 flex justify-between text-xs">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-slate-300">{project.progress}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-purple-500 to-sky-400 transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-xs text-slate-500">
                    {project.updatedAt}
                  </span>
                  <button
                    aria-label={`Open ${project.name}`}
                    className="rounded-lg p-2 text-slate-500 transition hover:bg-purple-500/10 hover:text-purple-300"
                  >
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111827]/60 px-6 py-16 text-center">
            <FolderKanban className="mx-auto text-slate-500" size={34} />
            <h3 className="mt-4 text-lg font-medium text-white">
              No projects found
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search or create a new project.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
