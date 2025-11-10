import { NextResponse } from "next/server";

import { createAirdropEntry } from "@/lib/airdrop";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name, email, walletAddress, signature } = payload as {
    name: string | null;
    email?: string;
    walletAddress?: string;
    signature?: string;
  };

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  }

  if (!walletAddress || typeof walletAddress !== "string" || !walletAddress.startsWith("0x")) {
    return NextResponse.json({ error: "Invalid wallet address" }, { status: 422 });
  }

  if (!signature || typeof signature !== "string") {
    return NextResponse.json({ error: "Signature required" }, { status: 422 });
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
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}