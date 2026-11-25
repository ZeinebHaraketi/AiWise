
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type HistoryItem = {
  id: string;
  title: string;
  description: string;
  tool: string;
  category: string;
  type: "assistant" | "tool" | "project";
  createdAt: string;
};

type HistoryContextType = {
  history: HistoryItem[];
  addHistoryItem: (
    item: Omit<HistoryItem, "id" | "createdAt">
  ) => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(
  undefined
);

const STORAGE_KEY = "aiwise-history";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: unknown = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    }
  }, [history, isLoaded]);

  const addHistoryItem = useCallback(
    (item: Omit<HistoryItem, "id" | "createdAt">) => {
      const newItem: HistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };

      setHistory((current) => [newItem, ...current]);
    },
    []
  );

  const removeHistoryItem = useCallback((id: string) => {
    setHistory((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <HistoryContext.Provider
      value={{ history, addHistoryItem, removeHistoryItem, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);

  if (!context) {
    throw new Error("useHistory must be used inside HistoryProvider");
  }

  return context;
}
