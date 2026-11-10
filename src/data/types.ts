export type Register = "нейтр." | "разг." | "офиц.";

export type CategoryId =
  | "basics"
  | "languages"
  | "architecture"
  | "databases"
  | "web"
  | "qa"
  | "management"
  | "devops"
  | "security";

export interface Term {
  /** Идентификатор статьи (латиница) */
  id: string;
  /** Термин со знаками ударения (сочетание U+0301) */
  term: string;
  /** Английский эквивалент */
  english: string;
  /** Грамматическая помета */
  pos: string;
  /** Стилистическая помета */
  register: Register;
  /** Толкование */
  definition: string;
  /** Пример употребления в профессиональной речи */
  example: string;
  /** Этимологическая справка (необязательно) */
  etymology?: string;
  /** Лингвистический комментарий (необязательно) */
  note?: string;
  /** Тематическая рубрика */
  category: CategoryId;
  /** Идентификаторы связанных статей */
  related: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  short: string;
  description: string;
  icon: string;
}
