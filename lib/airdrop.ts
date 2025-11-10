import driver, { type SqliteRow } from "./db";

type PostgresRow = {
  id: number | string;
  name: string | null;
  email: string;
  wallet_address: string;
  signature: string;
  created_at: Date | string | null;
};

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

const ensureInitialized =
  driver.kind === "postgres"
    ? driver.ensureInitialized
    : () => Promise.resolve();

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.npm_lifecycle_event === "build";

export async function createAirdropEntry(input: CreateAirdropInput) {
  const { name, email, walletAddress, signature } = input;

  if (isBuildTime) {
    throw new Error("Airdrop submissions are unavailable during build");
  }

  if (driver.kind === "postgres") {
    await ensureInitialized();
    try {
      await driver.query(
        "INSERT INTO airdrop_entries (name, email, wallet_address, signature) VALUES ($1, $2, $3, $4)",
        [name ?? null, email, walletAddress, signature]
      );
    } catch (error) {
      handleDatabaseError(error);
    }
    return;
  }

  const insert = driver.db.prepare(`
    INSERT INTO airdrop_entries (name, email, wallet_address, signature)
    VALUES (?, ?, ?, ?)
  `);

  try {
    insert.run(name ?? null, email, walletAddress, signature);
  } catch (error) {
    handleDatabaseError(error);
  }
}

export async function listAirdropEntries(options: ListOptions = {}) {
  const { from, to } = options;

  if (isBuildTime) {
    return { entries: [], total: 0 };
  }

  if (driver.kind === "postgres") {
    await ensureInitialized();

    const whereFragments: string[] = [];
    const params: unknown[] = [];

    if (from) {
      params.push(from);
      whereFragments.push(`created_at >= $${params.length}`);
    }
    if (to) {
      params.push(to);
      whereFragments.push(`created_at <= $${params.length}`);
    }

    const whereClause = whereFragments.length ? `WHERE ${whereFragments.join(" AND ")}` : "";

    const listQuery = `SELECT id, name, email, wallet_address, signature, created_at FROM airdrop_entries ${whereClause} ORDER BY created_at DESC`;
    const countQuery = `SELECT COUNT(*)::int as total FROM airdrop_entries ${whereClause}`;

    const [listResult, countResult] = await Promise.all([
      driver.query<PostgresRow>(listQuery, params),
      driver.query<{ total: number | string }>(countQuery, params),
    ]);

    const mapped: AirdropEntry[] = (listResult.rows as PostgresRow[]).map((row) => ({
      id: Number(row.id),
      name: row.name,
      email: row.email,
      walletAddress: row.wallet_address,
      signature: row.signature,
      createdAt: normalizeDate(row.created_at),
    }));

    const totalRow = countResult.rows[0];
    const total = Number(totalRow?.total ?? 0);

    return { entries: mapped, total };
  }

  const conditions: string[] = [];
  const parameters: Record<string, string> = {};

  if (from) {
    conditions.push("datetime(created_at) >= datetime(@from)");
    parameters.from = from;
  }
  if (to) {
    conditions.push("datetime(created_at) <= datetime(@to)");
    parameters.to = to;
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  const select = driver.db.prepare(
    `SELECT id, name, email, wallet_address, signature, created_at FROM airdrop_entries ${whereClause} ORDER BY datetime(created_at) DESC`
  );
  const rows = select.all(parameters) as SqliteRow[];

  const mapped: AirdropEntry[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    walletAddress: row.wallet_address,
    signature: row.signature,
    createdAt: row.created_at,
  }));

  const countRow = driver.db
    .prepare(`SELECT COUNT(*) as total FROM airdrop_entries ${whereClause}`)
    .get(parameters) as { total: number } | undefined;

  return { entries: mapped, total: countRow?.total ?? 0 };
}

export async function getAirdropStats() {
  if (isBuildTime) {
    return { totalParticipants: 0 };
  }

  if (driver.kind === "postgres") {
    await ensureInitialized();
    const result = await driver.query<{ total: number | string }>(
      "SELECT COUNT(*)::int as total FROM airdrop_entries"
    );
    const total = Number(result.rows[0]?.total ?? 0);
    return { totalParticipants: total };
  }

  const row = driver.db.prepare("SELECT COUNT(*) as total FROM airdrop_entries").get() as
    | { total: number }
    | undefined;
  return { totalParticipants: row?.total ?? 0 };
}

function normalizeDate(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (typeof value === "string") {
    return value;
  }
  return new Date(String(value ?? "")).toISOString();
}

function handleDatabaseError(error: unknown): never {
  if (error instanceof Error && "code" in error) {
    const code = (error as { code?: string }).code;

    if (code === "SQLITE_CONSTRAINT_UNIQUE") {
      const message = error.message ?? "";
      if (/email/.test(message)) {
        throw new Error("This email is already registered for the airdrop");
      }
      if (/wallet_address/.test(message)) {
        throw new Error("This wallet has already joined the airdrop");
      }
      throw new Error("Participation already recorded");
    }

    if (code === "23505") {
      const constraint = (error as { constraint?: string }).constraint ?? "";
      if (constraint.includes("email")) {
        throw new Error("This email is already registered for the airdrop");
      }
      if (constraint.includes("wallet_address")) {
        throw new Error("This wallet has already joined the airdrop");
      }
      throw new Error("Participation already recorded");
    }
  }

  throw error instanceof Error ? error : new Error("Internal error");
}
