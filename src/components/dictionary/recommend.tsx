import Link from "next/link";
import { AppWindow, MonitorDown, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Раздел «Также рекомендую»: работа одногруппника — интерактивное
 * приложение-словарь «IT Лексика» с кнопками скачивания для Windows и Android.
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

      <article className="mt-8 flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:gap-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
          <AppWindow className="h-6 w-6" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-serif text-lg font-bold">
            IT Лексика — интерактивный словарь
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            Приложение-словарь профессиональной ИТ-лексики, подготовленное моим
            одногруппником. Выбирай версию для своего устройства — файл скачается
            автоматически.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <Button asChild className="gap-2">
              <Link href="/downloads/it-leksika.exe" download>
                <MonitorDown className="h-4 w-4" aria-hidden />
                Для Windows · EXE · 7,8 МБ
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link href="/downloads/it-leksika.apk" download>
                <Smartphone className="h-4 w-4" aria-hidden />
                Для Android · APK · 0,75 МБ
              </Link>
            </Button>
          </div>
        </div>
      </article>
    </section>
  );
}
