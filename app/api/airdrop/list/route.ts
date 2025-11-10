import { NextResponse } from "next/server";

import { listAirdropEntries } from "@/lib/airdrop";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  const { entries, total } = await listAirdropEntries({ from, to });

  return NextResponse.json({ entries, total });
}
