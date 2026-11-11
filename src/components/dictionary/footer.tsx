"use client";

import { BookMarked } from "lucide-react";
import { CATEGORIES, countByCategory, DICTIONARY_STATS } from "@/data/dictionary";
import type { CategoryId } from "@/data/types";

interface FooterProps {
  onCategorySelect: (category: CategoryId | null) => void;
  /** Раскрыть список источников и прокрутиться к ним */
  onSourcesClick: () => void;
}

export function Footer({ onCategorySelect, onSourcesClick }: FooterProps) {
  return (
    <footer className="mt-auto border-t bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BookMarked className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-serif text-lg font-bold">ИТ-Лексикон</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Словарь-справочник профессиональной лексики и терминологии по
              специальности «Разработка и управление программным обеспечением».
              Составлен для изучения профессионального русского языка:{" "}
              {DICTIONARY_STATS.terms} статей, {DICTIONARY_STATS.categories}{" "}
              рубрик, ударения, пометы, примеры и этимологические справки.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Рубрикатор
            </h3>
            <ul className="mt-4 space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onCategorySelect(category.id);
                      document
                        .getElementById("catalog")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {category.name}{" "}
                    <span className="text-xs">
                      ({countByCategory(category.id)})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-muted-foreground">
              Структура словарной статьи
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>— заголовочное слово с&nbsp;ударением</li>
              <li>— английский эквивалент термина</li>
              <li>— грамматическая и стилистическая пометы</li>
              <li>— толкование значения</li>
              <li>— пример употребления в профессиональной речи</li>
              <li>— этимологическая справка</li>
              <li>— лингвистический комментарий</li>
              <li>— отсылки к смежным статьям</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} ИТ-Лексикон · учебный словарь-справочник
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Ярощук Егор Евгеньевич 11 РМП
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSourcesClick}
              className="text-xs text-muted-foreground transition hover:text-primary"
            >
              Источники
            </button>
            <a
              href="#top"
              className="text-xs text-muted-foreground transition hover:text-primary"
            >
              Наверх ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
