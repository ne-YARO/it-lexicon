"use client";

import { ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Term } from "@/data/types";
import { cn } from "@/lib/utils";
import { RegisterBadge } from "./register-badge";

interface TermCardProps {
  term: Term;
  categoryName: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpen: (term: Term) => void;
}

export function TermCard({
  term,
  categoryName,
  isFavorite,
  onToggleFavorite,
  onOpen,
}: TermCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-2xl border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-serif text-xl font-bold leading-snug text-balance">
          {term.term}
        </h3>
        <button
          type="button"
          onClick={() => onToggleFavorite(term.id)}
          aria-label={
            isFavorite
              ? `Убрать «${term.term}» из избранного`
              : `Добавить «${term.term}» в избранное`
          }
          aria-pressed={isFavorite}
          className={cn(
            "-mr-1 -mt-1 rounded-lg p-2 transition",
            isFavorite
              ? "text-chart-2"
              : "text-muted-foreground/60 hover:text-chart-2"
          )}
        >
          <Star
            className="h-5 w-5"
            fill={isFavorite ? "currentColor" : "none"}
            aria-hidden
          />
        </button>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        англ. <i>{term.english}</i>
      </p>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        <Badge
          variant="outline"
          className="border-border font-normal text-muted-foreground"
        >
          {term.pos}
        </Badge>
        <RegisterBadge register={term.register} />
      </div>

      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed">
        {term.definition}
      </p>

      <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
        <Badge
          variant="secondary"
          className="max-w-[55%] truncate font-normal text-muted-foreground"
        >
          {categoryName}
        </Badge>
        <button
          type="button"
          onClick={() => onOpen(term)}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-primary transition hover:bg-secondary"
          aria-label={`Подробнее о термине «${term.term}»`}
        >
          Подробнее
          <ChevronRight
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </button>
      </div>
    </article>
  );
}
