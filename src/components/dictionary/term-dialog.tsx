"use client";

import { useToast } from "@/hooks/use-toast";
import { History, Lightbulb, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES, getRelatedTerms } from "@/data/dictionary";
import type { Term } from "@/data/types";
import { cn } from "@/lib/utils";
import { RegisterBadge } from "./register-badge";

interface TermDialogProps {
  term: Term | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTerm: (term: Term) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function TermDialog({
  term,
  open,
  onOpenChange,
  onSelectTerm,
  isFavorite,
  onToggleFavorite,
}: TermDialogProps) {
  const { toast } = useToast();

  if (!term) return null;
  const category = CATEGORIES.find((c) => c.id === term.category);
  const related = getRelatedTerms(term);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-3 pr-6">
            <DialogTitle className="font-serif text-2xl font-bold leading-snug sm:text-3xl">
              {term.term}
            </DialogTitle>
          </div>
          <DialogDescription asChild>
            <div>
              <p className="text-sm text-muted-foreground">
                англ. <i>{term.english}</i> · {term.pos}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Badge
                  variant="secondary"
                  className="font-normal text-muted-foreground"
                >
                  {category?.name}
                </Badge>
                <RegisterBadge register={term.register} />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-5">
          <section aria-label="Толкование">
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Толкование
            </h4>
            <p className="leading-relaxed">{term.definition}</p>
          </section>

          <section aria-label="Пример употребления">
            <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Пример употребления
            </h4>
            <figure className="rounded-xl border-l-2 border-chart-2 bg-secondary/50 px-4 py-3">
              <Quote className="mb-1 h-3.5 w-3.5 text-chart-2" aria-hidden />
              <blockquote className="text-sm italic leading-relaxed">
                {term.example}
              </blockquote>
            </figure>
          </section>

          {term.etymology && (
            <section aria-label="Этимологическая справка">
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <History className="h-3.5 w-3.5" aria-hidden />
                Этимологическая справка
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {term.etymology}
              </p>
            </section>
          )}

          {term.note && (
            <section aria-label="Лингвистический комментарий">
              <h4 className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                <Lightbulb className="h-3.5 w-3.5" aria-hidden />
                Лингвистический комментарий
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {term.note}
              </p>
            </section>
          )}

          {related.length > 0 && (
            <section aria-label="Смежные статьи">
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Смежные статьи
              </h4>
              <div className="flex flex-wrap gap-2">
                {related.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => onSelectTerm(r)}
                    className="rounded-full border bg-secondary/60 px-3 py-1.5 font-serif text-sm transition hover:border-primary/60 hover:bg-secondary"
                  >
                    {r.term}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>

        <Separator className="my-1" />

        <div className="flex justify-end">
          <Button
            variant={isFavorite ? "secondary" : "outline"}
            onClick={() => {
              onToggleFavorite(term.id);
              toast({
                title: isFavorite
                  ? "Статья удалена из избранного"
                  : "Статья добавлена в избранное",
                description: term.term,
              });
            }}
            className="gap-2"
          >
            <Star
              className={cn("h-4 w-4", isFavorite && "text-chart-2")}
              fill={isFavorite ? "currentColor" : "none"}
              aria-hidden
            />
            {isFavorite ? "Убрать из избранного" : "В избранное"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
