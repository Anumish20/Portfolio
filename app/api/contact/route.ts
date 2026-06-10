/**
 * app/api/contact/route.ts
 * -------------------------------------------------------------------------
 * POST /api/contact — validate a contact submission and persist it.
 *
 * This is the real trust boundary: the form validates in the browser for UX,
 * but anything reaching the database must be re-validated here. On success a
 * row is written to `contact_messages`; on bad input we return structured
 * per-field errors so the form can highlight the offending field.
 *
 * Runtime is pinned to Node.js because the Prisma `pg` adapter uses
 * node-postgres, which is not available on the Edge runtime.
 * -------------------------------------------------------------------------
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Please enter your email address.")
    .max(200, "That email address is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(5000, "Message is too long (5000 characters max)."),
});

export async function POST(request: Request) {
  // 1. Parse the body defensively — malformed JSON shouldn't 500.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // 2. Validate. Return field-level errors the UI can map to inputs.
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please fix the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // 3. Persist. Never leak internal error details to the client.
  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again." },
      { status: 500 }
    );
  }
}
