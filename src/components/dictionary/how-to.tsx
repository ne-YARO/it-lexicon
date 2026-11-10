import { BookMarked, Languages, LayoutGrid, Search } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    title: "Поиск",
    text: "Введите русский термин, английский эквивалент или слово из толкования — например, «сиквел» или «технический долг».",
  },
  {
    icon: Languages,
    title: "Алфавитный указатель",
    text: "Выберите первую букву термина, чтобы перейти к соответствующим статьям словаря, как в бумажном справочнике.",
  },
  {
    icon: LayoutGrid,
    title: "Рубрикатор",
    text: "Отберите лексику по тематической группе: от основ программирования до информационной безопасности.",
  },
];

export function HowTo() {
  return (
    <section
      aria-labelledby="how-to-heading"
      className="mx-auto max-w-6xl px-4 pt-12 sm:px-6"
    >
      <div className="mb-5 text-center">
        <h2
          id="how-to-heading"
          className="font-serif text-2xl font-bold sm:text-3xl"
        >
          Как пользоваться словарём
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.title}
            className="rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <step.icon className="h-5 w-5" aria-hidden />
            </span>
            <h3 className="font-serif text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.text}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-6 rounded-xl border bg-secondary/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        <BookMarked className="mr-2 inline h-4 w-4 align-[-2px] text-primary" aria-hidden />
        Каждая статья содержит: заголовочное слово с&nbsp;ударением, английский
        эквивалент, грамматическую и&nbsp;стилистическую пометы, толкование,
        пример употребления, этимологическую справку и&nbsp;лингвистический
        комментарий.
      </p>
    </section>
  );
}
