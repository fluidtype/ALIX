import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const connectionString =
  process.env.POSTGRES_PRISMA_URL ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    "Missing database connection string. Set POSTGRES_PRISMA_URL or DATABASE_URL in your environment."
  );
}

const isAccelerateUrl = /^prisma(\+|:\/)/i.test(connectionString);
const shouldUseAccelerate = isAccelerateUrl;

const createClient = () => {
  const client = new PrismaClient({
    datasourceUrl: connectionString,
  });

  return shouldUseAccelerate ? client.$extends(withAccelerate()) : client;
};

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: ReturnType<typeof createClient> | undefined;
}

const prisma = globalThis.__prisma__ ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}

export default prisma;
