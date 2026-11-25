import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layers3, Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Layers3,
    title: "All your AI tools",
    description: "Discover and organize the tools you need in one workspace.",
  },
  {
    icon: Zap,
    title: "Work smarter",
    description: "Accelerate your workflow with intelligent AI assistance.",
  },
  {
    icon: ShieldCheck,
    title: "One unified space",
    description: "Keep your projects, tools and ideas connected.",
  },
];

export default function MarketingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-600/15 blur-[120px]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <a
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-white">
            <Sparkles size={20} />
          </span>
          AIWISE
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a
            href="#features"
            className="transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a href="#about" className="transition-colors hover:text-foreground">
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            render={<a href="/login" />}
            nativeButton={false}
          >
            Log in
          </Button>

          <Button render={<a href="/register" />} nativeButton={false}>
            Get started <ArrowRight size={16} />
          </Button>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-24 pt-28 text-center lg:pt-36">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-purple-300">
          <Sparkles size={15} />
          Your intelligent AI workspace
        </div>

        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Everything AI.
          <span className="block bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
            One workspace.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
          Discover AI tools, manage your projects and bring your ideas to life
          with one intelligent workspace designed around your workflow.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            className="h-12 px-7"
            render={<a href="/register" />}
            nativeButton={false}
          >
            Start exploring <ArrowRight size={17} />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="h-12 px-7"
            render={<a href="/login" />}
            nativeButton={false}
          >
            Explore your workspace
          </Button>
        </div>

        <div
          className="mt-20 grid w-full gap-5 text-left md:grid-cols-3"
          id="features"
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="rounded-2xl border border-border bg-card/80 p-6 transition-all hover:-translate-y-1 hover:border-primary/50"
              >
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-primary/15 text-purple-400">
                  <Icon size={22} />
                </div>

                <h2 className="text-lg font-semibold">{feature.title}</h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="relative z-10 border-t border-border px-6 py-7 text-center text-sm text-muted-foreground">
        © 2026 AIWISE. Your AI workspace.
      </footer>
    </main>
  );
}
