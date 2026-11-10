import { TERMS } from "@/data/dictionary";

/** Русский алфавит в порядке буквенного указателя */
export const RUSSIAN_ALPHABET = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

/** Карта: первая буква → число статей */
export function countByLetter(): Map<string, number> {
  const map = new Map<string, number>();
  for (const t of TERMS) {
    const letter = firstLetter(t);
    map.set(letter, (map.get(letter) ?? 0) + 1);
  }
  return map;
}

export function firstLetter(term: { term: string }): string {
  const ch = term.term
    .replace(/\u0301/g, "")
    .charAt(0)
    .toUpperCase();
  return ch;
}

/** Латинские буквы, представленные в словаре (аббревиатуры) */
export function getLatinLetters(): string[] {
  const set = new Set<string>();
  for (const t of TERMS) {
    const ch = firstLetter(t);
    if (/[A-Z]/.test(ch)) set.add(ch);
  }
  return [...set].sort();
}
