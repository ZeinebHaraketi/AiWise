"use client";

import type { ReactNode } from "react";
import { FavoritesProvider } from "@/features/favorites/favorites-context";
import { HistoryProvider } from "@/features/history/history-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <FavoritesProvider>
      <HistoryProvider>{children}</HistoryProvider>
    </FavoritesProvider>
  );
}