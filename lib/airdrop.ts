import db, { type Row } from "./db";

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

export function createAirdropEntry(input: CreateAirdropInput) {
  const { name, email, walletAddress, signature } = input;

  const insert = db.prepare(`
    INSERT INTO airdrop_entries (name, email, wallet_address, signature)
    VALUES (?, ?, ?, ?)
  `);

  try {
    insert.run(name ?? null, email, walletAddress, signature);
  } catch (error) {
    if (error instanceof Error && "code" in error) {
      const code = (error as { code?: string }).code;
      if (code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (/email/.test(error.message)) {
          throw new Error("Questa email è già registrata all'airdrop");
        }
        if (/wallet_address/.test(error.message)) {
          throw new Error("Questo wallet ha già partecipato all'airdrop");
        }
        throw new Error("Partecipazione già registrata");
      }
    }
    throw error;
  }
}

export function listAirdropEntries(options: ListOptions = {}) {
  const { from, to } = options;
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

  const select = db.prepare(
    `SELECT id, name, email, wallet_address, signature, created_at FROM airdrop_entries ${whereClause} ORDER BY datetime(created_at) DESC`
  );
  const rows = select.all(parameters) as Row[];

  const mapped: AirdropEntry[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    walletAddress: row.wallet_address,
    signature: row.signature,
    createdAt: row.created_at,
  }));

  const countRow = db
    .prepare(`SELECT COUNT(*) as total FROM airdrop_entries ${whereClause}`)
    .get(parameters) as { total: number } | undefined;

  return { entries: mapped, total: countRow?.total ?? 0 };
}

export function getAirdropStats() {
  const row = db.prepare("SELECT COUNT(*) as total FROM airdrop_entries").get() as { total: number } | undefined;
  return { totalParticipants: row?.total ?? 0 };
}
