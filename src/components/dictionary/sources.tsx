"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BookMarked,
  ChevronDown,
  Globe,
  Library,
  ScrollText,
  type LucideIcon,
} from "lucide-react";
import { SOURCE_GROUPS } from "@/data/sources";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const GROUP_ICONS: Record<string, LucideIcon> = {
  book: BookMarked,
  library: Library,
  scroll: ScrollText,
  globe: Globe,
};

interface SourcesProps {
  /** Открыт ли список источников */
  open: boolean;
  /** Переключение видимости списка */
  onToggle: (open: boolean) => void;
}

/**
 * Раздел «Источники»: список литературы, стандартов и электронных ресурсов,
 * по которым составлен словарь. Сворачивается кнопкой у заголовка;
 * по умолчанию скрыт. Оформление описаний — по ГОСТ Р 7.0.100-2018.
 */
export function Sources({ open, onToggle }: SourcesProps) {
  return (
    <section
      id="sources"
      aria-labelledby="sources-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-14 sm:px-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3">
        <h2
          id="sources-heading"
          className="font-serif text-2xl font-bold sm:text-3xl"
        >
          Источники
        </h2>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onToggle(!open)}
          aria-expanded={open}
          aria-controls="sources-body"
          className="gap-1.5"
        >
          {open ? "Скрыть" : "Показать"}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              open && "rotate-180"
            )}
            aria-hidden
          />
        </Button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="sources-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 gap-4 pt-8 md:grid-cols-2">
              {SOURCE_GROUPS.map((group) => {
                const Icon = GROUP_ICONS[group.icon] ?? BookMarked;
                return (
                  <article
                    key={group.title}
                    className="rounded-2xl border bg-card p-6 shadow-sm"
                  >
                    <h3 className="flex items-center gap-2.5 font-serif text-lg font-bold">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                        <Icon className="h-4.5 w-4.5" aria-hidden />
                      </span>
                      {group.title}
                    </h3>
                    <ol className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <li
                          key={item.num}
                          className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span
                            aria-hidden
                            className="shrink-0 font-serif font-semibold text-foreground/80"
                          >
                            {item.num}.
                          </span>
                          <span className="min-w-0">
                            {item.url ? (
                              <>
                                {item.text} — URL:{" "}
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="break-all text-primary underline-offset-2 transition hover:underline"
                                >
                                  {item.url}
                                </a>{" "}
                                (дата обращения: {item.accessed}).
                              </>
                            ) : (
                              item.text
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </article>
                );
              })}
            </div>

            <p className="mt-6 rounded-xl border bg-secondary/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
              <ScrollText
                className="mr-2 inline h-4 w-4 align-[-2px] text-primary"
                aria-hidden
              />
              Библиографические описания оформлены по ГОСТ Р 7.0.100-2018
              «Библиографическая запись. Библиографическое описание». Дата
              обращения к электронным ресурсам — 10.11.2026.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
