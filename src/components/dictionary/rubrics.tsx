"use client";

import {
  Braces,
  Blocks,
  ClipboardList,
  Code2,
  Database,
  FlaskConical,
  Globe,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, countByCategory } from "@/data/dictionary";
import type { CategoryId } from "@/data/types";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Code2,
  Braces,
  Blocks,
  Database,
  Globe,
  FlaskConical,
  ClipboardList,
  Rocket,
  ShieldCheck,
};

interface RubricsProps {
  activeCategory: CategoryId | null;
  onSelect: (category: CategoryId | null) => void;
}

export function Rubrics({ activeCategory, onSelect }: RubricsProps) {
  return (
    <section
      id="rubrics"
      aria-labelledby="rubrics-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6"
    >
      <div className="mb-5 border-b pb-3">
        <h2
          id="rubrics-heading"
          className="font-serif text-2xl font-bold sm:text-3xl"
        >
          Рубрикатор
        </h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <button
          type="button"
          aria-pressed={activeCategory === null}
          onClick={() => onSelect(null)}
          className={cn(
            "flex items-center gap-3 rounded-xl border p-4 text-left transition",
            activeCategory === null
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
          )}
        >
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              activeCategory === null
                ? "bg-primary-foreground/15"
                : "bg-secondary text-primary"
            )}
          >
            <BookAll className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block font-medium">Все рубрики</span>
            <span
              className={cn(
                "block text-xs",
                activeCategory === null
                  ? "text-primary-foreground/80"
                  : "text-muted-foreground"
              )}
            >
              весь словарь целиком
            </span>
          </span>
        </button>

        {CATEGORIES.map((category) => {
          const Icon = ICONS[category.icon] ?? Code2;
          const isActive = activeCategory === category.id;
          const count = countByCategory(category.id);
          return (
            <button
              key={category.id}
              type="button"
              aria-pressed={isActive}
              title={category.description}
              onClick={() => onSelect(isActive ? null : category.id)}
              className={cn(
                "flex items-center gap-3 rounded-xl border p-4 text-left transition",
                isActive
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : "border-border bg-card hover:border-primary/50 hover:bg-secondary"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  isActive
                    ? "bg-primary-foreground/15"
                    : "bg-secondary text-primary"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{category.name}</span>
                <span
                  className={cn(
                    "block text-xs",
                    isActive
                      ? "text-primary-foreground/80"
                      : "text-muted-foreground"
                  )}
                >
                  {count} статей
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function BookAll({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  );
}
