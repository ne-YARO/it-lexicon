import { ExternalLink, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Сайт проекта «IT Лексика» одногруппника (NIX projects). */
const RECOMMEND_SITE_URL = "https://nix-projects-ru.github.io/IT-/";

/**
 * Раздел «Также рекомендую»: работа одногруппника — сайт «IT Лексика»,
 * где скачивается офлайн-приложение-справочник для Windows и Android.
 * Плашка выделена ярким свечением, чтобы сразу бросалась в глаза.
 */
export function Recommend() {
  return (
    <section
      id="recommend"
      aria-labelledby="recommend-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-14 sm:px-6"
    >
      <div className="border-b pb-3">
        <h2
          id="recommend-heading"
          className="font-serif text-2xl font-bold sm:text-3xl"
        >
          Также рекомендую
        </h2>
      </div>

      <article className="relative mt-8 overflow-hidden rounded-2xl border-2 border-primary/60 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-[0_0_22px_-4px_var(--primary),0_0_50px_-10px_var(--primary)] transition-shadow hover:shadow-[0_0_30px_-4px_var(--primary),0_0_70px_-8px_var(--primary)] sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-[0_0_18px_-2px_var(--primary)]">
            <Globe className="h-6 w-6" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="font-serif text-lg font-bold sm:text-xl">
                IT Лексика — интерактивный справочник
              </h3>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                <User className="h-3.5 w-3.5" aria-hidden />
                Автор: NIX projects
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              Проект моего одногруппника: 124 термина в 10 разделах, четыре
              режима учёбы — справочник с поиском, флешкарты, викторина и игра
              «Пары». Приложение для Windows и Android скачивается прямо с его
              сайта.
            </p>
            <div className="mt-4">
              <Button asChild className="gap-2">
                <a
                  href={RECOMMEND_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  Перейти на сайт
                </a>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
