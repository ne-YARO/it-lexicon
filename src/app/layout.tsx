import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/dictionary/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ИТ-Лексикон — словарь-справочник профессиональной лексики",
  description:
    "Словарь-справочник профессиональной лексики и терминологии по специальности «Разработка и управление программным обеспечением»: 124 словарные статьи, девять тематических рубрик, этимология, примеры употребления и лингвистические комментарии.",
  keywords: [
    "словарь-справочник",
    "профессиональная лексика",
    "ИТ-терминология",
    "разработка программного обеспечения",
    "управление разработкой ПО",
    "русский язык",
  ],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "ИТ-Лексикон — словарь-справочник профессиональной лексики",
    description:
      "Профессиональная лексика и терминология по специальности «Разработка и управление программным обеспечением».",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ptSerif.variable} antialiased bg-background text-foreground font-sans`}
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
