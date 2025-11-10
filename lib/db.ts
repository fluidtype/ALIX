import SQLiteDatabase from "better-sqlite3";
import type { Database as SqliteDatabase } from "better-sqlite3";
import { createPool } from "@vercel/postgres";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export type SqliteRow = {
  id: number;
  name: string | null;
  email: string;
  wallet_address: string;
  signature: string;
  created_at: string;
};

type SqliteDriver = {
  kind: "sqlite";
  db: SqliteDatabase;
};

type PostgresSql = ReturnType<typeof createPool>["sql"];
type PostgresQuery = ReturnType<typeof createPool>["query"];

type PostgresDriver = {
  kind: "postgres";
  sql: PostgresSql;
  query: PostgresQuery;
  ensureInitialized: () => Promise<void>;
};

export type DatabaseDriver = SqliteDriver | PostgresDriver;

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.npm_lifecycle_event === "build";
const runningOnVercel = Boolean(process.env.VERCEL);
const forcePostgres = (process.env.AIRDROP_DB_PROVIDER ?? "").toLowerCase() === "postgres";
const postgresConnectionString =
  process.env.POSTGRES_URL ?? process.env.POSTGRES_PRISMA_URL ?? process.env.POSTGRES_URL_NON_POOLING;
const hasPostgresConnection = Boolean(postgresConnectionString);

if (!isBuildTime && forcePostgres && !hasPostgresConnection) {
  throw new Error(
    "Postgres connection string missing. Set POSTGRES_URL (or POSTGRES_PRISMA_URL/POSTGRES_URL_NON_POOLING)."
  );
}

const shouldUsePostgres = !isBuildTime && (forcePostgres || hasPostgresConnection);

let driver: DatabaseDriver;

if (shouldUsePostgres) {
  let initialized = false;
  let initializationPromise: Promise<void> | null = null;
  const pool = createPool({ connectionString: postgresConnectionString! });

  const ensureInitialized = async () => {
    if (initialized) return;
    if (!initializationPromise) {
      initializationPromise = (async () => {
        await pool.sql`
          CREATE TABLE IF NOT EXISTS airdrop_entries (
            id SERIAL PRIMARY KEY,
            name TEXT NULL,
            email TEXT UNIQUE NOT NULL,
            wallet_address TEXT UNIQUE NOT NULL,
            signature TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )
        `;
        initialized = true;
      })().catch((error) => {
        initializationPromise = null;
        throw error;
      });
    }
    await initializationPromise;
  };

  driver = {
    kind: "postgres",
    sql: pool.sql,
    query: pool.query.bind(pool) as PostgresQuery,
    ensureInitialized,
  };
} else {
  if (runningOnVercel) {
    console.warn(
      "AIRDROP: falling back to the SQLite driver on Vercel without a Postgres connection string. Data will not persist between requests."
    );
  }

  const candidateDirs = [
    process.env.AIRDROP_DATA_DIR ? path.resolve(process.env.AIRDROP_DATA_DIR) : undefined,
    path.join(process.cwd(), "data"),
    path.join(os.tmpdir(), "alix-airdrop"),
  ].filter((dir): dir is string => Boolean(dir));

  let dataDir: string | undefined;

  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.accessSync(dir, fs.constants.W_OK);
      dataDir = dir;
      break;
    } catch {
      // try next candidate
    }
  }

  if (!dataDir) {
    throw new Error("Unable to locate writable directory for the airdrop database");
  }

  const databasePath = path.join(dataDir, "airdrop.sqlite");
  const db = new SQLiteDatabase(databasePath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS airdrop_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE NOT NULL,
      wallet_address TEXT UNIQUE NOT NULL,
      signature TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  driver = {
    kind: "sqlite",
    db,
  };
}

export default driver;