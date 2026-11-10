import type { CategoryId, Term } from "./types";
import { CATEGORIES } from "./categories";
import { BASICS_TERMS } from "./terms/basics";
import { LANGUAGES_TERMS } from "./terms/languages";
import { ARCHITECTURE_TERMS } from "./terms/architecture";
import { DATABASES_TERMS } from "./terms/databases";
import { WEB_TERMS } from "./terms/web";
import { QA_TERMS } from "./terms/qa";
import { MANAGEMENT_TERMS } from "./terms/management";
import { DEVOPS_TERMS } from "./terms/devops";
import { SECURITY_TERMS } from "./terms/security";

/** Полный словарь: все словарные статьи */
export const TERMS: Term[] = [
  ...BASICS_TERMS,
  ...LANGUAGES_TERMS,
  ...ARCHITECTURE_TERMS,
  ...DATABASES_TERMS,
  ...WEB_TERMS,
  ...QA_TERMS,
  ...MANAGEMENT_TERMS,
  ...DEVOPS_TERMS,
  ...SECURITY_TERMS,
].sort((a, b) => normalize(a.term).localeCompare(normalize(b.term), "ru"));

/** Нормализация строки: удаление знаков ударения, ё → е, нижний регистр */
export function normalize(s: string): string {
  return s
    .replace(/\u0301/g, "")
    .replace(/ё/g, "е")
    .replace(/Ё/g, "Е")
    .toLowerCase()
    .trim();
}

/** Поиск по термину, английскому эквиваленту и толкованию */
export function searchTerms(query: string, terms: Term[] = TERMS): Term[] {
  const q = normalize(query);
  if (!q) return terms;
  return terms.filter((t) => {
    const haystack = [
      normalize(t.term),
      t.english.toLowerCase(),
      normalize(t.definition),
      t.note ? normalize(t.note) : "",
      t.etymology ? normalize(t.etymology) : "",
    ].join(" ");
    return q.split(/\s+/).every((word) => haystack.includes(word));
  });
}

/** Русский алфавит для алфавитного указателя */
export const RUSSIAN_ALPHABET = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЭЮЯ".split("");

/** Набор первых букв, реально представленных в словаре (кириллица и латиница) */
export function getAvailableLetters(terms: Term[] = TERMS): Set<string> {
  const set = new Set<string>();
  for (const t of terms) set.add(firstLetter(t));
  return set;
}

/** Первая буква термина (для алфавитного указателя) */
export function firstLetter(term: Term): string {
  const ch = normalize(term.term).charAt(0);
  return ch.toUpperCase();
}

/** Латинские буквы, представленные в словаре (аббревиатуры) */
export function getLatinLetters(terms: Term[] = TERMS): string[] {
  const set = new Set<string>();
  for (const t of terms) {
    const ch = firstLetter(t);
    if (/[A-Z]/.test(ch)) set.add(ch);
  }
  return [...set].sort();
}

/** Словарная статья по идентификатору */
export function getTerm(id: string): Term | undefined {
  return TERMS.find((t) => t.id === id);
}

/** Связанные статьи */
export function getRelatedTerms(term: Term): Term[] {
  return term.related
    .map((id) => getTerm(id))
    .filter((t): t is Term => Boolean(t));
}

/** Статьи одной рубрики */
export function termsByCategory(category: CategoryId, terms: Term[] = TERMS) {
  return terms.filter((t) => t.category === category);
}

/** Число статей рубрики */
export function countByCategory(category: CategoryId): number {
  return TERMS.reduce((acc, t) => acc + (t.category === category ? 1 : 0), 0);
}

/** Стабильный индекс «слова дня» — зависит от календарной даты */
export function getTermOfDay(): Term {
  const now = new Date();
  const key = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return TERMS[hash % TERMS.length];
}

/** Количественные показатели словаря */
export const DICTIONARY_STATS = {
  terms: TERMS.length,
  categories: CATEGORIES.length,
  examples: TERMS.length,
  etymologies: TERMS.reduce((acc, t) => acc + (t.etymology ? 1 : 0), 0),
  notes: TERMS.reduce((acc, t) => acc + (t.note ? 1 : 0), 0),
};

export { CATEGORIES };
