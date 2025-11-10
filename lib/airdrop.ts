import { Prisma } from "@prisma/client";

import prisma from "./prisma";

type CreateAirdropInput = {
  name: string | null;
  email: string;
  walletAddress: string;
  signature: string;
};

type ListOptions = {
  from?: string;
  to?: string;
};

export type AirdropEntry = {
  id: number;
  name: string | null;
  email: string;
  walletAddress: string;
  signature: string;
  createdAt: string;
};

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.npm_lifecycle_event === "build";

export async function createAirdropEntry(input: CreateAirdropInput) {
  const { name, email, walletAddress, signature } = input;

  if (isBuildTime) {
    throw new Error("Airdrop submissions are unavailable during build");
  }

  try {
    await prisma.subscription.create({
      data: {
        name,
        email,
        walletAddress,
        signature,
      },
    });
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function listAirdropEntries(options: ListOptions = {}) {
  const { from, to } = options;

  if (isBuildTime) {
    return { entries: [], total: 0 };
  }

  const where: Prisma.SubscriptionWhereInput = {};
  const fromDate = coerceDate(from, { startOfDay: true });
  const toDate = coerceDate(to, { endOfDay: true });

  if (fromDate || toDate) {
    where.createdAt = {
      ...(fromDate ? { gte: fromDate } : {}),
      ...(toDate ? { lte: toDate } : {}),
    };
  }

  const [records, total] = await Promise.all([
    prisma.subscription.findMany({
      where,
      orderBy: { createdAt: "desc" },
    }),
    prisma.subscription.count({ where }),
  ]);

  const entries: AirdropEntry[] = records.map((record) => ({
    id: record.id,
    name: record.name,
    email: record.email,
    walletAddress: record.walletAddress,
    signature: record.signature,
    createdAt: record.createdAt.toISOString(),
  }));

  return { entries, total };
}

export async function getAirdropStats() {
  if (isBuildTime) {
    return { totalParticipants: 0 };
  }

  const total = await prisma.subscription.count();
  return { totalParticipants: total };
}

function coerceDate(value: string | undefined, options?: { startOfDay?: boolean; endOfDay?: boolean }) {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  const parsed = new Date(trimmed);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  const result = new Date(parsed.getTime());

  if (options?.startOfDay) {
    result.setUTCHours(0, 0, 0, 0);
  } else if (options?.endOfDay) {
    result.setUTCHours(23, 59, 59, 999);
  }

  return result;
}

function handleDatabaseError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    const target = Array.isArray(error.meta?.target) ? (error.meta?.target as string[]) : [];
    if (target.includes("email")) {
      throw new Error("This email is already registered for the airdrop");
    }
    if (target.includes("walletAddress") || target.includes("wallet_address")) {
      throw new Error("This wallet has already joined the airdrop");
    }
    throw new Error("Participation already recorded");
  }

  throw error instanceof Error ? error : new Error("Internal error");
}
