"use client";

import { RUSSIAN_ALPHABET, countByLetter, getLatinLetters } from "./alphabet-utils";

interface AlphabetProps {
  activeLetter: string | null;
  onSelect: (letter: string | null) => void;
}

export function Alphabet({ activeLetter, onSelect }: AlphabetProps) {
  const latinLetters = getLatinLetters();
  const cyrillicCounts = countByLetter();

  const letterButton = (letter: string, isLatin = false) => {
    const count = cyrillicCounts.get(letter) ?? 0;
    const available = count > 0;
    const isActive = activeLetter === letter;

    return (
      <button
        key={letter}
        type="button"
        disabled={!available}
        aria-label={
          available
            ? `Буква ${letter}, статей: ${count}`
            : `Буква ${letter} не представлена в словаре`
        }
        aria-pressed={isActive}
        onClick={() => onSelect(isActive ? null : letter)}
        className={[
          "group relative flex h-11 w-11 items-center justify-center rounded-lg border font-serif text-lg transition",
          isActive
            ? "border-primary bg-primary font-bold text-primary-foreground shadow-sm"
            : available
              ? "border-border bg-card text-foreground hover:border-primary/60 hover:bg-secondary"
              : "cursor-not-allowed border-border/60 bg-transparent text-muted-foreground/40",
          isLatin ? "italic" : "",
        ].join(" ")}
      >
        {letter}
        {available && !isActive && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-secondary px-1 text-[10px] font-semibold leading-none text-secondary-foreground">
            {count}
          </span>
        )}
      </button>
    );
  };

  return (
    <section
      id="alphabet"
      aria-labelledby="alphabet-heading"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-14 sm:px-6"
    >
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b pb-3">
        <div>
          <h2
            id="alphabet-heading"
            className="font-serif text-2xl font-bold sm:text-3xl"
          >
            Алфавитный указатель
          </h2>
        </div>
        {activeLetter && (
          <button
            type="button"
            onClick={() => onSelect(null)}
            className="rounded-lg border bg-card px-3 py-1.5 text-sm transition hover:bg-secondary"
          >
            Сбросить: буква «{activeLetter}» ✕
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {RUSSIAN_ALPHABET.map((letter) => letterButton(letter))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs uppercase tracking-wider text-muted-foreground">
          Латиница:
        </span>
        {latinLetters.map((letter) => letterButton(letter, true))}
      </div>
    </section>
  );
}
