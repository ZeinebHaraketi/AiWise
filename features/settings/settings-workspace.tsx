"use client";

import { useEffect, useState } from "react";

type SettingsData = {
  fullName: string;
  email: string;
  role: string;
  appearance: string;
  language: string;
  timezone: string;
  productUpdates: boolean;
  weeklyDigest: boolean;
  securityAlerts: boolean;
};

const defaultSettings: SettingsData = {
  fullName: "Alex Morgan",
  email: "alex@aiwise.workspace",
  role: "Product Designer",
  appearance: "Dark",
  language: "English",
  timezone: "UTC",
  productUpdates: true,
  weeklyDigest: false,
  securityAlerts: true,
};

const STORAGE_KEY = "aiwise-settings";

export function SettingsWorkspace({
  title = "Make yourself at home.",
  subtitle = "Your workspace, your preferences.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setSettings({
          ...defaultSettings,
          ...parsed,
        });
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  function updateSetting<K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K],
  ) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/[0.07] bg-[#171e30] px-4 py-3 text-sm text-[#f8fafc] outline-none transition-all placeholder:text-[#64748b] focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#8b5cf6]/20";

  const labelClass = "text-sm font-medium text-[#cbd5e1]";

  const sectionClass =
    "rounded-xl border border-white/[0.06] bg-[#111827] p-5 sm:p-6";

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 pb-10">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#f8fafc] sm:text-3xl">
          {title}
        </h1>

        <p className="mt-2 text-sm text-[#94a3b8]">
          {subtitle}
        </p>
      </div>

      {/* Personal information */}
      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-[#f8fafc]">
          Personal information
        </h2>

        <div className="mt-5 space-y-5">
          <div>
            <label className={labelClass} htmlFor="fullName">
              Full name
            </label>

            <input
              id="fullName"
              type="text"
              value={settings.fullName}
              onChange={(e) => updateSetting("fullName", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => updateSetting("email", e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="role">
              Role
            </label>

            <input
              id="role"
              type="text"
              value={settings.role}
              onChange={(e) => updateSetting("role", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Workspace preferences */}
      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-[#f8fafc]">
          Workspace preferences
        </h2>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <label className={labelClass} htmlFor="appearance">
              Appearance
            </label>

            <select
              id="appearance"
              value={settings.appearance}
              onChange={(e) => updateSetting("appearance", e.target.value)}
              className={inputClass}
            >
              <option value="Dark">Dark</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="language">
              Language
            </label>

            <select
              id="language"
              value={settings.language}
              onChange={(e) => updateSetting("language", e.target.value)}
              className={inputClass}
            >
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="timezone">
              Time zone
            </label>

            <select
              id="timezone"
              value={settings.timezone}
              onChange={(e) => updateSetting("timezone", e.target.value)}
              className={inputClass}
            >
              <option value="UTC">UTC</option>
              <option value="Europe/Paris">Europe/Paris</option>
              <option value="Africa/Tunis">Africa/Tunis</option>
              <option value="America/New_York">America/New_York</option>
            </select>
          </div>
        </div>

        <div className="mt-7 space-y-5">
          <PreferenceToggle
            title="Product updates"
            description="Receive news about new AIWISE features and improvements."
            checked={settings.productUpdates}
            onChange={(value) => updateSetting("productUpdates", value)}
          />

          <PreferenceToggle
            title="Weekly activity digest"
            description="Get a summary of your workspace activity every week."
            checked={settings.weeklyDigest}
            onChange={(value) => updateSetting("weeklyDigest", value)}
          />

          <PreferenceToggle
            title="Security alerts"
            description="Receive notifications about important security events."
            checked={settings.securityAlerts}
            onChange={(value) => updateSetting("securityAlerts", value)}
          />
        </div>
      </section>

      {/* Security */}
      <section className={sectionClass}>
        <h2 className="text-base font-semibold text-[#f8fafc]">Security</h2>

        <p className="mt-4 text-sm leading-6 text-[#94a3b8]">
          Password last updated November 18, 2026. Two-factor authentication is
          recommended to keep your account secure.
        </p>
      </section>
    </div>
  );
}

function PreferenceToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#e2e8f0]">{title}</p>

        <p className="mt-1 text-xs leading-5 text-[#94a3b8]">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={title}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
          checked ? "bg-[#8b5cf6]" : "bg-[#334155]"
        }`}
      >
        <span
          className={`h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-[3px]"
          }`}
        />
      </button>
    </div>
  );
}
