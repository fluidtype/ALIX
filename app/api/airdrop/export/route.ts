import { NextResponse } from "next/server";

import { listAirdropEntries } from "@/lib/airdrop";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || undefined;
  const to = searchParams.get("to") || undefined;

  const { entries } = listAirdropEntries({ from, to });

  const header = "id,name,email,wallet_address,signature,created_at";
  const csv = [
    header,
    ...entries.map((entry) =>
      [
        entry.id,
        escapeCsv(entry.name ?? ""),
        escapeCsv(entry.email),
        escapeCsv(entry.walletAddress),
        escapeCsv(entry.signature),
        escapeCsv(entry.createdAt),
      ].join(",")
    ),
  ].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename=alix-airdrop-${Date.now()}.csv`,
    },
  });
}

function escapeCsv(value: string | number) {
  const stringValue = String(value ?? "");
  if (stringValue.includes(",") || stringValue.includes("\"") || stringValue.includes("\n")) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  return stringValue;
}
