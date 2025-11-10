import SQLiteDatabase from "better-sqlite3";
import type { Database as SqliteDatabase } from "better-sqlite3";
import { createPool, createClient } from "@vercel/postgres";
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

type PostgresDriver = {
  kind: "postgres";
  query: <T = unknown>(query: string, params?: readonly unknown[]) => Promise<{ rows: T[] }>;
  ensureInitialized: () => Promise<void>;
};

type PrismaAccelerateClient = {
  $queryRawUnsafe: <T = unknown>(query: string, ...params: unknown[]) => Promise<T>;
  $executeRawUnsafe: (query: string, ...params: unknown[]) => Promise<unknown>;
};

declare global {
  // eslint-disable-next-line no-var
  var __airdropPrismaClient: PrismaAccelerateClient | undefined;
}

export type DatabaseDriver = SqliteDriver | PostgresDriver;

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" || process.env.npm_lifecycle_event === "build";
const runningOnVercel = Boolean(process.env.VERCEL);
const forcePostgres = (process.env.AIRDROP_DB_PROVIDER ?? "").toLowerCase() === "postgres";
const coerceStandardPostgresUrl = (value: string | undefined) => {
  if (!value) return undefined;
  return /^postgres(ql)?:\/\//i.test(value) ? value : undefined;
};

const coerceAccelerateUrl = (value: string | undefined) => {
  if (!value) return undefined;
  return value.startsWith("prisma+postgres://") ? value : undefined;
};

const isLikelyPooledConnectionString = (value: string | undefined) => {
  if (!value) return false;

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();

    return hostname.includes("pooler") || hostname.includes("pooling");
  } catch {
    return false;
  }
};

const rawPooledConnectionString = process.env.POSTGRES_URL;
const pooledConnectionString = coerceStandardPostgresUrl(rawPooledConnectionString);

const prismaConnectionString =
  coerceAccelerateUrl(process.env.POSTGRES_PRISMA_URL) ??
  coerceAccelerateUrl(process.env.DATABASE_URL) ??
  coerceAccelerateUrl(rawPooledConnectionString) ??
  coerceAccelerateUrl(process.env.POSTGRES_URL_NON_POOLING);

const candidateDirectStrings = [
  coerceStandardPostgresUrl(process.env.POSTGRES_URL_NON_POOLING),
  coerceStandardPostgresUrl(process.env.DATABASE_URL),
  coerceStandardPostgresUrl(rawPooledConnectionString),
]
  .filter((value): value is string => Boolean(value))
  .filter((value) => !isLikelyPooledConnectionString(value));

const pooledConnectionAvailable = Boolean(
  pooledConnectionString &&
    (isLikelyPooledConnectionString(pooledConnectionString) || Boolean(process.env.POSTGRES_URL_NON_POOLING))
);

const explicitDirectConnectionString = candidateDirectStrings[0];

const effectiveDirectConnectionString =
  explicitDirectConnectionString ?? (!pooledConnectionAvailable ? pooledConnectionString : undefined);

const hasPrismaAccelerateConnection = Boolean(prismaConnectionString);
const hasPostgresConnection = Boolean(
  pooledConnectionString ?? effectiveDirectConnectionString ?? (hasPrismaAccelerateConnection ? prismaConnectionString : undefined)
);

if (!isBuildTime && forcePostgres && !hasPostgresConnection) {
  throw new Error(
    "Postgres connection string missing. Set POSTGRES_URL (or POSTGRES_PRISMA_URL/POSTGRES_URL_NON_POOLING)."
  );
}

const shouldUsePrismaAccelerate = !isBuildTime && hasPrismaAccelerateConnection;
const shouldUsePostgres = !shouldUsePrismaAccelerate && !isBuildTime && (forcePostgres || hasPostgresConnection);

let driver: DatabaseDriver;

if (shouldUsePrismaAccelerate && prismaConnectionString) {
  driver = createPrismaAccelerateDriver(prismaConnectionString);
} else if (shouldUsePostgres) {
  let initialized = false;
  let initializationPromise: Promise<void> | null = null;
  const connectionMode: "pool" | "direct" = pooledConnectionAvailable ? "pool" : "direct";
  const connectionString =
    connectionMode === "pool"
      ? pooledConnectionString
      : effectiveDirectConnectionString ?? pooledConnectionString;

  if (!connectionString) {
    throw new Error("Postgres connection string is not defined");
  }

  if (connectionMode === "pool") {
    const pool = createPool({ connectionString });

    const query: PostgresDriver["query"] = async <T = unknown>(
      text: string,
      params: readonly unknown[] = []
    ) => {
      const result = await pool.query(text, params as unknown[]);
      return { rows: result.rows as T[] };
    };

    const ensureInitialized = async () => {
      if (initialized) return;
      if (!initializationPromise) {
        initializationPromise = (async () => {
          await query(
            `CREATE TABLE IF NOT EXISTS airdrop_entries (
              id SERIAL PRIMARY KEY,
              name TEXT NULL,
              email TEXT UNIQUE NOT NULL,
              wallet_address TEXT UNIQUE NOT NULL,
              signature TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )`
          );
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
      query,
      ensureInitialized,
    };
  } else {
    const client = createClient({ connectionString });
    let connected = false;
    let connectPromise: Promise<void> | null = null;

    const getClient = async () => {
      if (connected) return client;
      if (!connectPromise) {
        connectPromise = client
          .connect()
          .then(() => {
            connected = true;
          })
          .catch((error) => {
            connectPromise = null;
            throw error;
          });
      }
      await connectPromise;
      return client;
    };

    const query: PostgresDriver["query"] = async <T = unknown>(
      text: string,
      params: readonly unknown[] = []
    ) => {
      const activeClient = await getClient();
      const result = await activeClient.query(text, params as unknown[]);
      return { rows: result.rows as T[] };
    };

    const ensureInitialized = async () => {
      if (initialized) return;
      if (!initializationPromise) {
        initializationPromise = (async () => {
          await query(
            `CREATE TABLE IF NOT EXISTS airdrop_entries (
              id SERIAL PRIMARY KEY,
              name TEXT NULL,
              email TEXT UNIQUE NOT NULL,
              wallet_address TEXT UNIQUE NOT NULL,
              signature TEXT NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            )`
          );
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
      query,
      ensureInitialized,
    };
  }
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

function createPrismaAccelerateDriver(connectionString: string): PostgresDriver {
  let initialized = false;
  let initializationPromise: Promise<void> | null = null;
  let prismaClientPromise: Promise<PrismaAccelerateClient> | null = null;

  const getClient = async () => {
    if (globalThis.__airdropPrismaClient) {
      return globalThis.__airdropPrismaClient;
    }

    if (!prismaClientPromise) {
      prismaClientPromise = (async () => {
        const [{ PrismaClient }, { withAccelerate }] = await Promise.all([
          import("@prisma/client/edge"),
          import("@prisma/extension-accelerate"),
        ]);

        const client = new PrismaClient({
          datasources: {
            db: {
              url: connectionString,
            },
          },
        }).$extends(withAccelerate()) as unknown as PrismaAccelerateClient;

        globalThis.__airdropPrismaClient = client;
        return client;
      })().catch((error) => {
        prismaClientPromise = null;
        throw error;
      });
    }

    return prismaClientPromise!;
  };

  const query: PostgresDriver["query"] = async <T = unknown>(
    text: string,
    params: readonly unknown[] = []
  ) => {
    const client = await getClient();
    const trimmed = text.trim();
    const shouldUseQueryRaw =
      /^(select|with|show|describe|explain)\b/i.test(trimmed) || /\breturning\b/i.test(trimmed);

    if (shouldUseQueryRaw) {
      const rows = (await client.$queryRawUnsafe<T[]>(text, ...(params as unknown[]))) ?? [];
      return { rows };
    }

    await client.$executeRawUnsafe(text, ...(params as unknown[]));
    return { rows: [] as T[] };
  };

  const ensureInitialized = async () => {
    if (initialized) return;
    if (!initializationPromise) {
      initializationPromise = (async () => {
        await query(
          `CREATE TABLE IF NOT EXISTS airdrop_entries (
            id SERIAL PRIMARY KEY,
            name TEXT NULL,
            email TEXT UNIQUE NOT NULL,
            wallet_address TEXT UNIQUE NOT NULL,
            signature TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          )`
        );
        initialized = true;
      })().catch((error) => {
        initializationPromise = null;
        throw error;
      });
    }
    await initializationPromise;
  };

  return {
    kind: "postgres",
    query,
    ensureInitialized,
  };
}

export default driver;