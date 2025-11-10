import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.join(process.cwd(), "data");
const databasePath = path.join(dataDir, "airdrop.sqlite");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

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
