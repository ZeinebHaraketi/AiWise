"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Sparkles, Mail } from "lucide-react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSocialSignIn(provider: "google" | "github") {
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/dashboard",
      });

      if (error) {
        setErrorMessage(error.message || "Social authentication failed.");
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setErrorMessage("Please accept the Terms of Service.");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        callbackURL: "/dashboard",
      });

      if (error) {
        setErrorMessage(error.message || "Registration failed.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen bg-[#080b16] text-[#f8fafc] lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] p-12 lg:flex">
        <div className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <Link
          href="/"
          className="relative z-10 flex items-center gap-2 text-xl font-bold"
        >
          <Sparkles size={24} />
          AIWISE
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="text-sm font-medium text-purple-100">
            YOUR INTELLIGENT WORKSPACE
          </span>

          <h1 className="mt-5 text-5xl font-semibold leading-tight">
            Your AI journey starts here.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-purple-100">
            Create your account and bring your favorite AI tools, projects and
            ideas together in one intelligent workspace.
          </p>
        </div>

        <p className="relative z-10 text-sm text-purple-200">
          © 2026 AIWISE. All rights reserved.
        </p>
      </section>

      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 flex items-center gap-2 text-lg font-bold lg:hidden"
          >
            <Sparkles className="text-[#8b5cf6]" />
            AIWISE
          </Link>

          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Create your account
            </h2>
            <p className="mt-3 text-sm text-[#94a3b8]">
              Get started with your personal AI workspace.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleSocialSignIn("google")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-[#111827] px-3 py-3 text-sm font-medium transition hover:border-[#8b5cf6]/50 hover:bg-white/[0.04]"
            >
              <Mail size={17} />
              Google
            </button>

            <button
              type="button"
              onClick={() => handleSocialSignIn("github")}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-[#111827] px-3 py-3 text-sm font-medium transition hover:border-[#8b5cf6]/50 hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="text-base font-bold">GH</span>
              GitHub
            </button>
          </div>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/[0.08]" />
            <span className="text-xs text-[#64748b]">
              OR CONTINUE WITH EMAIL
            </span>
            <div className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-[#cbd5e1]"
              >
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your full name"
                className="mt-2 w-full rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-3 text-sm outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#cbd5e1]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-3 text-sm outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#cbd5e1]"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-[#64748b]">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-[#cbd5e1]"
              >
                Confirm password
              </label>
              <div className="relative mt-2">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-lg border border-white/[0.08] bg-[#111827] px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-3 pt-1 text-sm text-[#94a3b8]">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1 accent-[#8b5cf6]"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#a78bfa] hover:text-[#c4b5fd]"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#a78bfa] hover:text-[#c4b5fd]"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {errorMessage && (
              <p className="text-sm text-red-400" role="alert">
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
              {!isLoading && <ArrowRight size={17} />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#94a3b8]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-[#a78bfa] hover:text-[#c4b5fd]"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
