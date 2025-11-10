import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const connectionString =
  process.env.POSTGRES_PRISMA_URL ??
  process.env.DATABASE_URL ??
  process.env.POSTGRES_URL;

const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.npm_lifecycle_event === "build";

const missingConnectionStringError = new Error(
  "Missing database connection string. Set POSTGRES_PRISMA_URL or DATABASE_URL in your environment."
);

const createNoopClient = (): PrismaClient =>
  new Proxy(
    {},
    {
      get() {
        throw missingConnectionStringError;
      },
    }
  ) as PrismaClient;

const isAccelerateUrl = connectionString ? /^prisma(\+|:\/)/i.test(connectionString) : false;
const shouldUseAccelerate = isAccelerateUrl;

const createClient = (): PrismaClient => {
  if (!connectionString) {
    if (isBuildTime) {
      return createNoopClient();
    }

    throw missingConnectionStringError;
  }

  const client = new PrismaClient({
    datasourceUrl: connectionString,
  });

  if (shouldUseAccelerate) {
    return client.$extends(withAccelerate()) as PrismaClient;
  }

  return client;
};

declare global {
  // eslint-disable-next-line no-var
  var __prisma__: PrismaClient | undefined;
}

const prisma = globalThis.__prisma__ ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma__ = prisma;
}

export default prisma;
