import type { NextConfig } from "next";

/*
 * Два режима сборки:
 *
 * 1) Обычная (песочница/сервер):  npm run build
 *    — output: "standalone", сайт работает как серверное приложение.
 *
 * 2) Статическая для GitHub Pages: STATIC_EXPORT=1 npm run build:static
 *    — output: "export", готовая папка out/ заливается на GitHub Pages.
 *
 * Имя репозитория задаёт basePath: по умолчанию /it-lexicon.
 * Если репозиторий называется иначе — задай NEXT_PUBLIC_BASE_PATH=/имя-репо.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const basePath = isStaticExport
  ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/it-lexicon")
  : undefined;

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        /* GitHub Pages отдаёт папки вида page/index.html — нужен слэш на конце */
        trailingSlash: true,
        /* Отдельная папка сборки, чтобы не мешать работающему dev-серверу */
        distDir: ".next-static",
      }
    : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
