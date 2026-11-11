"use client";

import { forwardRef, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  query: string;
  onQueryChange: (value: string) => void;
  /* Переход к словарным статьям при отправке поиска (Enter или кнопка «Найти») */
  onSearchSubmit: () => void;
  /* Сколько статей нашлось при текущем запросе и сколько всего в словаре */
  resultsCount: number;
  totalCount: number;
  stats: {
    terms: number;
    categories: number;
    etymologies: number;
    notes: number;
  };
}

/* Слова-подсказки, которые по очереди «печатаются» в пустой поисковой строке */
const SEARCH_SUGGESTIONS = [
  "алгоритм",
  "backlog",
  "непрерывная интеграция",
  "технический долг",
  "спринт",
  "рефакторинг",
];

/* Эффект печатной машинки: слово набирается посимвольно, выдерживается пауза,
   стирается, затем начинается следующее слово из списка. */
function useTypewriter(words: string[], active: boolean) {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex += 1;
        setText(word.slice(0, charIndex));
        if (charIndex >= word.length) {
          deleting = true;
          timer = setTimeout(tick, 1600); /* пауза с набранным словом */
        } else {
          timer = setTimeout(tick, 80 + Math.random() * 70);
        }
      } else {
        charIndex -= 1;
        setText(word.slice(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(tick, 350);
        } else {
          timer = setTimeout(tick, 40);
        }
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [words, active]);

  return text;
}

export const Hero = forwardRef<HTMLInputElement, HeroProps>(function Hero(
  { query, onQueryChange, onSearchSubmit, resultsCount, totalCount, stats },
  searchRef
) {
  /* Анимация запускается только после гидрации — иначе React ругается на
     несовпадение текста с серверным HTML (ошибка #418) */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(timer);
  }, []);

  /* Подсказка печатается, только пока строка поиска пуста */
  const suggestion = useTypewriter(
    SEARCH_SUGGESTIONS,
    mounted && query.length === 0
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b bg-gradient-to-b from-secondary/70 to-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-bold leading-snug text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Словарь-справочник профессиональной лексики и&nbsp;терминологии
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            по специальности{" "}
            <span className="font-serif font-bold text-foreground">
              «Разработка и&nbsp;управление программным обеспечением»
            </span>
          </p>

          <div className="mx-auto mt-8 max-w-2xl">
            {/* Форма поиска: отправка по Enter или кнопке «Найти» */}
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                onSearchSubmit();
              }}
            >
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <input
                  ref={searchRef}
                  type="text"
                  role="searchbox"
                  aria-label="Поиск по словарю"
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  className="h-14 w-full rounded-2xl border bg-card pl-12 pr-12 text-base shadow-sm outline-none transition focus:ring-2 focus:ring-ring/60"
                />
                {query && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onQueryChange("")}
                    aria-label="Очистить поиск"
                    className="absolute right-2 top-1/2 h-9 w-9 -translate-y-1/2"
                  >
                    <X className="h-4 w-4" aria-hidden />
                  </Button>
                )}
                {/* Анимированная подсказка печатной машинкой поверх пустого поля */}
                {mounted && query.length === 0 && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-12 right-12 top-1/2 flex -translate-y-1/2 items-center overflow-hidden text-base text-muted-foreground"
                  >
                    <span className="min-w-0 truncate">{suggestion}</span>
                    <span className="ml-0.5 h-5 w-[2px] shrink-0 animate-pulse rounded-full bg-primary/70" />
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="h-14 shrink-0 gap-2 rounded-2xl px-5 text-base font-semibold shadow-sm"
              >
                <Search className="h-5 w-5" aria-hidden />
                Найти
              </Button>
            </form>

            {/* Живой счётчик результатов прямо под строкой поиска */}
            {query.length > 0 && (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "mt-2.5 text-left text-sm",
                  resultsCount === 0
                    ? "font-medium text-destructive"
                    : "text-muted-foreground"
                )}
              >
                {resultsCount === 0 ? (
                  "Ничего не найдено — попробуй изменить запрос"
                ) : (
                  <>
                    Найдено статей:{" "}
                    <span className="font-semibold text-foreground">
                      {resultsCount}
                    </span>{" "}
                    из {totalCount}
                  </>
                )}
              </p>
            )}
          </div>

          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: stats.terms, label: "словарных статей" },
              { value: stats.categories, label: "тематических рубрик" },
              { value: stats.etymologies, label: "этимологических справок" },
              { value: stats.notes, label: "лингвистических комментариев" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border bg-card px-3 py-3 shadow-sm"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd className="font-serif text-2xl font-bold text-primary">
                  {item.value}
                </dd>
                <dd
                  className="mt-0.5 text-[11px] leading-tight text-muted-foreground"
                  aria-label={item.label}
                >
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
});
