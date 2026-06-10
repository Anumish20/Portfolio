/**
 * lib/prisma.ts
 * -------------------------------------------------------------------------
 * The app's single Prisma Client instance (server-only).
 *
 * Prisma 7 generates an engine-less client, so it needs a driver adapter at
 * runtime — here `@prisma/adapter-pg` (node-postgres) pointed at the POOLED
 * Neon `DATABASE_URL`. Neon's PgBouncer then manages connections, which is
 * what you want for serverless / many short-lived invocations.
 *
 * The instance is cached on `globalThis` in development: Next.js hot-reload
 * re-imports modules on every change, and without this cache each reload
 * would spin up a new PrismaClient and quickly exhaust Neon's connection
 * limit. In production a fresh module scope is used per server instance.
 * -------------------------------------------------------------------------
 */

import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env before using the database."
  );
}

// connectionTimeoutMillis keeps requests from hanging ~20s when Neon's
// serverless compute is cold/suspended — fail fast and let the caller retry.
const adapter = new PrismaPg({ connectionString, connectionTimeoutMillis: 15000 });

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
