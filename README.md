# Anubhuti Mishra — Portfolio

A full-stack developer portfolio built with Next.js. More than a static page: it
ships a real database-backed contact form, a live DB health probe, and a
"behind the scenes" inspector that documents how each section is actually built.

**Live:** https://anubhuti-portfolio.vercel.app/

## Tech stack

- **Framework:** Next.js 16 (App Router) + React 19, TypeScript
- **Styling/animation:** Tailwind CSS v4, Framer Motion
- **Backend:** Next.js Route Handlers (Node runtime)
- **Database:** Neon PostgreSQL via Prisma 7 (`@prisma/adapter-pg`)
- **Validation:** Zod
- **Hosting:** Vercel

## Architecture notes

- All page content lives in `lib/data.ts` — a single source of truth, so editing
  the portfolio never means touching JSX.
- `POST /api/contact` re-validates every submission server-side with Zod before
  persisting to Postgres — the browser validation is only for UX.
- `GET /api/health` runs `SELECT 1` to prove the DB is reachable in real time.
- Prisma uses the **pooled** `DATABASE_URL` at runtime and the **direct**
  `DIRECT_URL` for migrations (see `prisma.config.ts`).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
```

Create a `.env` with your Neon connection strings:

```env
DATABASE_URL="postgresql://...-pooler.../neondb?sslmode=require"
DIRECT_URL="postgresql://.../neondb?sslmode=require"
```

## Deployment (Vercel)

The build command runs migrations then builds:

```
prisma generate && prisma migrate deploy && next build
```

Set both `DATABASE_URL` and `DIRECT_URL` as environment variables in the Vercel
project before the first build.
