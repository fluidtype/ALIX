import Database from "better-sqlite3";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const candidateDirs = [
  process.env.AIRDROP_DATA_DIR
    ? path.resolve(process.env.AIRDROP_DATA_DIR)
    : undefined,
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
    // directory not writable, try next candidate
  }
}

if (!dataDir) {
  throw new Error("Unable to locate writable directory for the airdrop database");
}

const databasePath = path.join(dataDir, "airdrop.sqlite");

const db = new Database(databasePath);

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

type Row = {
  id: number;
  name: string | null;
  email: string;
  wallet_address: string;
  signature: string;
  created_at: string;
};

export type { Row };
export default db;
