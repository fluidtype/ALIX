import driver, { type SqliteRow } from "./db";

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

export async function createAirdropEntry(input: CreateAirdropInput) {
  const { name, email, walletAddress, signature } = input;

  if (driver.kind === "postgres") {
    await ensureInitialized();
    try {
      await driver.query`
        INSERT INTO airdrop_entries (name, email, wallet_address, signature)
        VALUES (${name}, ${email}, ${walletAddress}, ${signature})
      `;
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

  if (driver.kind === "postgres") {
    await ensureInitialized();

    const conditions: string[] = [];
    const values: Array<string> = [];

    if (from) {
      values.push(from);
      conditions.push(`created_at >= $${values.length}`);
    }
    if (to) {
      values.push(to);
      conditions.push(`created_at <= $${values.length}`);
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

    const listParams = [...values];
    const { rows } = await driver.query.query(
      `SELECT id, name, email, wallet_address, signature, created_at FROM airdrop_entries ${whereClause} ORDER BY created_at DESC`,
      listParams
    );

    const mapped: AirdropEntry[] = rows.map((row) => ({
      id: Number((row as { id: number | string }).id),
      name: (row as { name: string | null }).name,
      email: (row as { email: string }).email,
      walletAddress: (row as { wallet_address: string }).wallet_address,
      signature: (row as { signature: string }).signature,
      createdAt: normalizeDate((row as { created_at: unknown }).created_at),
    }));

    const countResult = await driver.query.query(
      `SELECT COUNT(*)::int as total FROM airdrop_entries ${whereClause}`,
      [...values]
    );

    const total = Number((countResult.rows[0] as { total?: number | string })?.total ?? 0);

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
  if (driver.kind === "postgres") {
    await ensureInitialized();
    const result = await driver.query`SELECT COUNT(*)::int as total FROM airdrop_entries`;
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
        throw new Error("Questa email è già registrata all'airdrop");
      }
      if (/wallet_address/.test(message)) {
        throw new Error("Questo wallet ha già partecipato all'airdrop");
      }
      throw new Error("Partecipazione già registrata");
    }

    if (code === "23505") {
      const constraint = (error as { constraint?: string }).constraint ?? "";
      if (constraint.includes("email")) {
        throw new Error("Questa email è già registrata all'airdrop");
      }
      if (constraint.includes("wallet_address")) {
        throw new Error("Questo wallet ha già partecipato all'airdrop");
      }
      throw new Error("Partecipazione già registrata");
    }
  }

  throw error instanceof Error ? error : new Error("Errore interno");
}
