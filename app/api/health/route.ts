/**
 * app/api/health/route.ts
 * -------------------------------------------------------------------------
 * GET /api/health — a tiny liveness probe for the database.
 *
 * Runs the cheapest possible query (`SELECT 1`) through Prisma so the UI can
 * show, in real time, that the Postgres backend is actually reachable. Used
 * by the "Behind the scenes" inspector to prove the app is genuinely full-
 * stack — not a static mock.
 *
 * Never cached, and pinned to the Node.js runtime (node-postgres adapter).
 * -------------------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Reject if the DB hasn't answered within `ms` — keeps the probe snappy. */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("health-timeout")), ms)
    ),
  ]);
}

export async function GET() {
  const start = Date.now();
  try {
    await withTimeout(prisma.$queryRaw`SELECT 1`, 8000);
    return NextResponse.json(
      { status: "ok", db: "connected", latencyMs: Date.now() - start },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      { status: "error", db: "unreachable" },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
