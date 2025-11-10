import { NextResponse } from "next/server";

import { createAirdropEntry } from "@/lib/airdrop";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Payload non valido" }, { status: 400 });
  }

  const { name, email, walletAddress, signature } = payload as {
    name: string | null;
    email?: string;
    walletAddress?: string;
    signature?: string;
  };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Email non valida" }, { status: 422 });
  }

  if (!walletAddress || typeof walletAddress !== "string" || !walletAddress.startsWith("0x")) {
    return NextResponse.json({ error: "Wallet address non valida" }, { status: 422 });
  }

  if (!signature || typeof signature !== "string") {
    return NextResponse.json({ error: "Firma richiesta" }, { status: 422 });
  }

  try {
    await createAirdropEntry({
      name: name?.trim() ? name.trim() : null,
      email: email.trim().toLowerCase(),
      walletAddress: walletAddress.trim().toLowerCase(),
      signature,
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Errore interno" }, { status: 500 });
  }
}
