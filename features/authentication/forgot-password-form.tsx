
"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Sparkles, CheckCircle2 } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="grid min-h-screen bg-[#080b16] text-[#f8fafc] lg:grid-cols-2">
      {/* Left promotional panel */}
      <section className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#4f46e5] p-12 lg:flex">
        <div className="absolute -left-32 top-40 h-96 w-96 rounded-full bg-purple-300/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <Link href="/" className="relative z-10 flex items-center gap-2 text-xl font-bold">
          <Sparkles size={24} />
          AIWISE
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="text-sm font-medium text-purple-100">
            YOUR INTELLIGENT WORKSPACE
          </span>

          <h1 className="mt-5 text-5xl font-semibold leading-tight">
            A fresh start is just one step away.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-purple-100">
            Regain access to your AI workspace and continue
            bringing your ideas to life.
          </p>
        </div>

        <p className="relative z-10 text-sm text-purple-200">
          © 2026 AIWISE. All rights reserved.
        </p>
      </section>

      {/* Right form panel */}
      <section className="flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-12 flex items-center gap-2 text-lg font-bold lg:hidden"
          >
            <Sparkles className="text-[#8b5cf6]" />
            AIWISE
          </Link>

          {!submitted ? (
            <>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#8b5cf6]/20 bg-[#8b5cf6]/10">
                <Mail size={25} className="text-[#a78bfa]" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Forgot your password?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                No worries. Enter your email address and we'll send you
                instructions to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="mt-9 space-y-5">
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-[#cbd5e1]">
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

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7c3aed]"
                >
                  Send reset instructions <ArrowRight size={17} />
                </button>
              </form>
            </>
          ) : (
            <div>
              <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                <CheckCircle2 size={26} className="text-emerald-400" />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight">
                Check your inbox
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#94a3b8]">
                If an account exists for <span className="font-medium text-white">{email}</span>,
                you'll receive instructions to reset your password.
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-7 text-sm font-medium text-[#a78bfa] hover:text-[#c4b5fd]"
              >
                Try another email address
              </button>
            </div>
          )}

          <div className="mt-9 border-t border-white/[0.08] pt-6">
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium text-[#94a3b8] transition hover:text-white"
            >
              <ArrowLeft size={16} />
              Back to sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
