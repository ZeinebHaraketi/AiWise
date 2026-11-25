
"use client";

import { useState, type FormEvent } from "react";
import {
  Sparkles,
  Send,
  Paperclip,
  ArrowRight,
  UserRound,
  Lightbulb,
} from "lucide-react";

const suggestions = [
  "Write the brand story",
  "Build a content calendar",
  "Explore visual directions",
];

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

export function AssistantWorkspace() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isDemo, setIsDemo] = useState(false);

  const initialPrompt =
    "Help me create a launch plan for a sustainable skincare brand.";

  function sendMessage(content: string) {
    const trimmed = content.trim();

    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        role: "user",
        content: trimmed,
      },
    ]);

    setInput("");
    setIsDemo(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function startConversation() {
    setMessages([
      {
        id: Date.now(),
        role: "user",
        content: initialPrompt,
      },
    ]);
    setIsDemo(true);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-120px)] w-full max-w-[1200px] flex-col">
      {/* Page heading */}
      <section className="mb-7">
        <div className="flex items-center gap-2 text-[#a78bfa]">
          <Sparkles size={16} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
            AIWISE Assistant
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Your ideas. An intelligent head start.
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          Creative thinking, without the blank page.
        </p>
      </section>

      {/* Conversation */}
      <section className="flex-1 rounded-2xl border border-[#202a3d] bg-[#0d1424] p-4 sm:p-6">
        {/* Conversation label */}
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            {messages.length > 0 ? "CURRENT CONVERSATION" : "TODAY · BRAND LAUNCH"}
          </span>

          <span className="flex items-center gap-2 text-[10px] text-slate-500">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Workspace
          </span>
        </div>

        {/* Initial example from Framer */}
        {messages.length === 0 && (
          <div className="space-y-6">
            <div className="rounded-xl border border-[#27304a] bg-[#151d30] p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[#a78bfa]">
                <UserRound size={15} />
                <span className="text-xs font-medium">Your idea</span>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-200">
                {initialPrompt}
              </p>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/15 text-[#a78bfa]">
                <Sparkles size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white">
                  Let&apos;s make your launch feel as thoughtful as your product.
                </p>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  Start with a story that connects your ingredients, your values,
                  and the everyday ritual you&apos;re creating.
                </p>

                <div className="mt-4 space-y-3">
                  {[
                    "Define the promise: effective skincare, with a lighter footprint.",
                    "Build anticipation with behind-the-scenes ingredient stories.",
                    "Launch a simple starter collection with a clear daily routine.",
                  ].map((item, index) => (
                    <div key={item} className="flex gap-3">
                      <span className="text-xs font-semibold text-[#a78bfa]">
                        0{index + 1}
                      </span>
                      <p className="text-xs leading-5 text-slate-300">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-xs font-semibold text-white">
                    Where would you like to start?
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-lg border border-[#27304a] bg-[#111827] px-3 py-2 text-[11px] text-slate-300 transition-colors hover:border-[#8b5cf6] hover:text-white"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User conversation */}
        {messages.length > 0 && (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/15 text-[#a78bfa]">
                    <Sparkles size={18} />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-xl p-4 ${
                    message.role === "user"
                      ? "bg-[#252044] text-white"
                      : "border border-[#27304a] bg-[#151d30] text-slate-200"
                  }`}
                >
                  <p className="text-sm leading-6">{message.content}</p>
                </div>
              </div>
            ))}

            {isDemo && (
              <div className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#8b5cf6]/15 text-[#a78bfa]">
                  <Sparkles size={18} />
                </div>

                <div className="max-w-[85%] rounded-xl border border-[#27304a] bg-[#151d30] p-4">
                  <p className="text-sm leading-6 text-slate-300">
                    Your message has been added to this conversation. Connect an
                    AI model to AIWISE to generate intelligent responses.
                  </p>
                  <span className="mt-3 block text-[10px] text-[#a78bfa]">
                    AI integration coming next
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Input area */}
      <div className="mt-4">
        {!messages.length && (
          <div className="mb-3 flex items-center gap-2 text-[10px] text-slate-500">
            <Lightbulb size={13} className="text-[#a78bfa]" />
            Not sure where to start? Choose a suggestion above.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 rounded-xl border border-[#27304a] bg-[#111827] p-3 transition-colors focus-within:border-[#8b5cf6]"
        >
          <button
            type="button"
            aria-label="Attach a file"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-[#202a3d] hover:text-white"
          >
            <Paperclip size={17} />
          </button>

          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything, or start with an idea..."
            aria-label="Message AIWISE"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />

          <button
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6] text-white transition-colors hover:bg-[#7c3aed] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={16} />
          </button>
        </form>

        <p className="mt-3 text-center text-[10px] text-slate-600">
          AI can make mistakes. Review important information.
        </p>
      </div>
    </div>
  );
}
