"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownWideNarrow,
  Heart,
  RotateCcw,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  DICTIONARY_STATS,
  getTermOfDay,
  searchTerms,
} from "@/data/dictionary";
import type { CategoryId, Term } from "@/data/types";
import { Header } from "@/components/dictionary/header";
import { Hero } from "@/components/dictionary/hero";
import { TermOfDay } from "@/components/dictionary/term-of-day";
import { HowTo } from "@/components/dictionary/how-to";
import { Alphabet } from "@/components/dictionary/alphabet";
import { Rubrics } from "@/components/dictionary/rubrics";
import { TermCard } from "@/components/dictionary/term-card";
import { TermDialog } from "@/components/dictionary/term-dialog";
import { Footer } from "@/components/dictionary/footer";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

type SortOrder = "asc" | "desc";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [openTerm, setOpenTerm] = useState<Term | null>(null);
  /* Слово дня детерминировано от календарной даты — инициализация лениво, без эффекта */
  const [termOfDay] = useState(() => getTermOfDay());
  const { favorites, toggleFavorite } = useFavorites();
  const searchRef = useRef<HTMLInputElement>(null);

  /* Быстрый поиск по клавише «/» */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const scrollToCatalog = useCallback(() => {
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToTopCatalog = useCallback(() => {
    setFavoritesOnly(true);
    setLetter(null);
    setCategory(null);
    setQuery("");
    scrollToCatalog();
  }, [scrollToCatalog]);

  /* Фильтрация */
  const filtered = useMemo(() => {
    let list = searchTerms(query);
    if (category) list = list.filter((t) => t.category === category);
    if (letter) {
      list = list.filter((t) =>
        t.term
          .replace(/\u0301/g, "")
          .charAt(0)
          .toUpperCase()
          .startsWith(letter)
      );
    }
    if (favoritesOnly) list = list.filter((t) => favorites.has(t.id));
    const sorted = [...list].sort((a, b) =>
      a.term
        .replace(/\u0301/g, "")
        .localeCompare(b.term.replace(/\u0301/g, ""), "ru")
    );
    return sortOrder === "asc" ? sorted : sorted.reverse();
  }, [query, category, letter, favoritesOnly, favorites, sortOrder]);

  const hasActiveFilters = Boolean(
    query || letter || category || favoritesOnly
  );

  const resetFilters = () => {
    setQuery("");
    setLetter(null);
    setCategory(null);
    setFavoritesOnly(false);
  };

  const categoryName = (id: CategoryId) =>
    CATEGORIES.find((c) => c.id === id)?.name ?? "";

  const activeFilterBadges = [
    query ? { label: `Поиск: «${query}»`, clear: () => setQuery("") } : null,
    letter ? { label: `Буква: ${letter}`, clear: () => setLetter(null) } : null,
    category
      ? {
          label: `Рубрика: ${categoryName(category)}`,
          clear: () => setCategory(null),
        }
      : null,
    favoritesOnly
      ? { label: "Только избранное", clear: () => setFavoritesOnly(false) }
      : null,
  ].filter(Boolean) as { label: string; clear: () => void }[];

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        favoritesCount={favorites.size}
        onFavoritesClick={scrollToTopCatalog}
      />

      <main className="flex-1">
        <Hero
          ref={searchRef}
          query={query}
          onQueryChange={setQuery}
          onSearchSubmit={scrollToCatalog}
          resultsCount={filtered.length}
          totalCount={DICTIONARY_STATS.terms}
          stats={DICTIONARY_STATS}
        />

        <TermOfDay term={termOfDay} onOpen={setOpenTerm} />

        <HowTo />

        <Alphabet activeLetter={letter} onSelect={setLetter} />

        <Rubrics activeCategory={category} onSelect={setCategory} />

        {/* Каталог словарных статей */}
        <section
          id="catalog"
          aria-labelledby="catalog-heading"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
        >
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b pb-3">
            <div>
              <h2
                id="catalog-heading"
                className="font-serif text-2xl font-bold sm:text-3xl"
              >
                Словарные статьи
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Найдено: {filtered.length} из {DICTIONARY_STATS.terms}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={favoritesOnly ? "default" : "outline"}
                size="sm"
                onClick={() => setFavoritesOnly((v) => !v)}
                aria-pressed={favoritesOnly}
                className="gap-2"
              >
                <Heart
                  className="h-4 w-4"
                  fill={favoritesOnly ? "currentColor" : "none"}
                  aria-hidden
                />
                Избранное
                {favorites.size > 0 && (
                  <span className="font-semibold">{favorites.size}</span>
                )}
              </Button>

              <Select
                value={sortOrder}
                onValueChange={(v) => setSortOrder(v as SortOrder)}
              >
                <SelectTrigger
                  size="sm"
                  className="w-[11.5rem] gap-2"
                  aria-label="Порядок сортировки"
                >
                  <ArrowDownWideNarrow
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">А — Я</SelectItem>
                  <SelectItem value="desc">Я — А</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  className="gap-2 text-muted-foreground"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden />
                  Сбросить
                </Button>
              )}
            </div>
          </div>

          {activeFilterBadges.length > 0 && (
            <div
              className="mb-5 flex flex-wrap items-center gap-2"
              role="status"
              aria-label="Активные фильтры"
            >
              <SlidersHorizontal
                className="h-4 w-4 text-muted-foreground"
                aria-hidden
              />
              {activeFilterBadges.map((badge) => (
                <button
                  key={badge.label}
                  type="button"
                  onClick={badge.clear}
                  title="Убрать фильтр"
                  className="group"
                >
                  <Badge
                    variant="outline"
                    className="cursor-pointer gap-1.5 border-primary/40 bg-primary/5 py-1 pl-3 pr-2 font-normal transition group-hover:bg-primary/15"
                  >
                    {badge.label}
                    <span
                      className="text-xs text-muted-foreground"
                      aria-hidden
                    >
                      ✕
                    </span>
                  </Badge>
                </button>
              ))}
            </div>
          )}

          {filtered.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`${query}|${letter ?? ""}|${category ?? ""}|${favoritesOnly}|${sortOrder}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="grid gap-4 md:grid-cols-2"
              >
                {filtered.map((term) => (
                  <TermCard
                    key={term.id}
                    term={term}
                    categoryName={categoryName(term.category)}
                    isFavorite={favorites.has(term.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpen={setOpenTerm}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed px-6 py-16 text-center">
              <SearchX className="h-10 w-10 text-muted-foreground/60" aria-hidden />
              <div>
                <p className="font-serif text-lg font-bold">
                  По заданным условиям ничего не найдено
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Попробуйте изменить запрос или сбросить фильтры.
                </p>
              </div>
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <RotateCcw className="h-4 w-4" aria-hidden />
                Сбросить фильтры
              </Button>
            </div>
          )}
        </section>
      </main>

      <Footer onCategorySelect={setCategory} />

      <TermDialog
        term={openTerm}
        open={openTerm !== null}
        onOpenChange={(o) => {
          if (!o) setOpenTerm(null);
        }}
        onSelectTerm={setOpenTerm}
        isFavorite={openTerm ? favorites.has(openTerm.id) : false}
        onToggleFavorite={toggleFavorite}
      />

      {/* Кнопки прокрутки: «вниз» и «наверх» */}
      <ScrollDownButton />
      <ScrollTopButton />
    </div>
  );
}

function useScrollTopVisible() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => window.scrollY > 900,
    () => false
  );
}

/* Кнопка «вниз» видна, пока до конца страницы осталось больше 100 px */
function useScrollDownVisible() {
  return useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });
      window.addEventListener("resize", onStoreChange, { passive: true });
      return () => {
        window.removeEventListener("scroll", onStoreChange);
        window.removeEventListener("resize", onStoreChange);
      };
    },
    () =>
      document.documentElement.scrollHeight -
        window.innerHeight -
        window.scrollY >
      100,
    () => false
  );
}

function ScrollDownButton() {
  const visible = useScrollDownVisible();

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        })
      }
      aria-label="Прокрутить вниз"
      className={cn(
        "fixed bottom-6 right-[5.5rem] z-30 flex h-11 w-11 items-center justify-center rounded-full border bg-card text-foreground shadow-lg transition-all duration-300 hover:border-primary/60 hover:text-primary",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      ↓
    </button>
  );
}

function ScrollTopButton() {
  const visible = useScrollTopVisible();

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Вернуться наверх"
      className={cn(
        "fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border bg-card text-foreground shadow-lg transition-all duration-300 hover:border-primary/60 hover:text-primary",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      ↑
    </button>
  );
}
