import { NextResponse } from "next/server";

import { listAirdropEntries } from "@/lib/airdrop";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  const { entries, total } = await listAirdropEntries({ from, to });

  return NextResponse.json({ entries, total });
}