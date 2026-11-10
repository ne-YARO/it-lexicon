import { NextResponse } from "next/server";

/* Статический экспорт (GitHub Pages) требует статического роута */
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}