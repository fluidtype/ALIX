import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const pooledUrl =
  process.env.POSTGRES_PRISMA_URL ??
  process.env.POSTGRES_URL ??
  process.env.DATABASE_URL;

if (!pooledUrl) {
  throw new Error(
    "Missing database connection string. Set POSTGRES_PRISMA_URL or DATABASE_URL in your environment."
  );
}

const shouldUseAccelerate =
  Boolean(process.env.POSTGRES_PRISMA_URL) || /pgbouncer=true/i.test(pooledUrl);

const createClient = () => {
  const client = new PrismaClient({
    datasourceUrl: pooledUrl,
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
