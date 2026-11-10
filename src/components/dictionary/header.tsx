"use client";

import { BookMarked, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";

interface HeaderProps {
  favoritesCount: number;
  onFavoritesClick: () => void;
}

export function Header({ favoritesCount, onFavoritesClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookMarked className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-lg font-bold leading-tight">
              ИТ-Лексикон
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              словарь-справочник профессиональной лексики
            </span>
          </span>
        </a>

        <nav className="flex items-center gap-1.5" aria-label="Основные действия">
          <Button
            variant="ghost"
            onClick={onFavoritesClick}
            className="gap-2"
            aria-label="Избранные статьи"
          >
            <Heart
              className="h-4 w-4"
              aria-hidden
              fill={favoritesCount > 0 ? "currentColor" : "none"}
            />
            <span className="hidden sm:inline">Избранное</span>
            {favoritesCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
                {favoritesCount}
              </span>
            )}
          </Button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
