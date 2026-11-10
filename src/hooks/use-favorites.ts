"use client";

import { useCallback, useSyncExternalStore } from "react";

const FAVORITES_KEY = "it-lexicon-favorites";
const FAVORITES_EVENT = "it-lexicon-favorites-changed";
const EMPTY_SET: ReadonlySet<string> = new Set<string>();

let cachedRaw: string | null = null;
let cachedSet: ReadonlySet<string> = EMPTY_SET;

/** Считывает избранное из localStorage с кэшированием снимка */
function readFavorites(): ReadonlySet<string> {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(FAVORITES_KEY);
  } catch {
    /* приватный режим — считаем избранное пустым */
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedSet = new Set(raw ? (JSON.parse(raw) as string[]) : []);
    } catch {
      cachedSet = EMPTY_SET;
    }
  }
  return cachedSet;
}

function subscribeFavorites(callback: () => void): () => void {
  window.addEventListener(FAVORITES_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(FAVORITES_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getServerSnapshot(): ReadonlySet<string> {
  return EMPTY_SET;
}

/** Избранные словарные статьи: хранение в localStorage, SSR-совместимо */
export function useFavorites() {
  const favorites = useSyncExternalStore(
    subscribeFavorites,
    readFavorites,
    getServerSnapshot
  );

  const toggleFavorite = useCallback((id: string) => {
    const next = new Set(readFavorites());
    if (next.has(id)) next.delete(id);
    else next.add(id);
    try {
      window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...next]));
    } catch {
      /* приватный режим — молча пропускаем */
    }
    window.dispatchEvent(new Event(FAVORITES_EVENT));
  }, []);

  return { favorites, toggleFavorite } as const;
}
