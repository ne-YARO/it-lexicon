"use client";

import { ArrowRight, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Term } from "@/data/types";
import { RegisterBadge } from "./register-badge";

interface TermOfDayProps {
  term: Term | null;
  onOpen: (term: Term) => void;
}

export function TermOfDay({ term, onOpen }: TermOfDayProps) {
  return (
    <section aria-labelledby="term-of-day-heading" className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border bg-card shadow-sm"
      >
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-primary to-chart-2"
        />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-4 w-4 text-chart-2" aria-hidden />
            <span id="term-of-day-heading">Слово дня</span>
          </div>

          {term ? (
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
              <div className="lg:w-2/3">
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">
                  {term.term}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  англ. <i>{term.english}</i> · {term.pos}
                </p>
                <p className="mt-3 leading-relaxed">{term.definition}</p>
                <figure className="mt-4 rounded-xl border-l-2 border-chart-2 bg-secondary/50 px-4 py-3">
                  <Quote className="mb-1 h-3.5 w-3.5 text-chart-2" aria-hidden />
                  <blockquote className="text-sm italic leading-relaxed">
                    {term.example}
                  </blockquote>
                </figure>
              </div>
              <div className="flex flex-col items-start gap-3 lg:ml-auto lg:items-end">
                <RegisterBadge register={term.register} />
                <Button onClick={() => onOpen(term)} className="gap-2">
                  Открыть статью
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-16 w-full" />
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
