# Spopi

Spotify Wrapped-style app from your data export ZIP. This repo contains the **project foundation** only (no analytics or full UI yet).

## Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Express, TypeScript
- **Database:** PostgreSQL, Prisma

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)
- Node.js 20+ (optional, for local development without Docker)

## How to run the app

### Option A: Docker (recommended)

From the project root:

```bash
cp .env.example .env
docker compose up --build
```

Then open:

- Web: http://localhost:3000
- API health: http://localhost:4000/health

To stop:

```bash
docker compose down
```

### Option B: Local (without Docker for web/api)

1. Install deps and prepare env:

```bash
cp .env.example .env
chmod +x scripts/dev.sh scripts/api-dev.sh
./scripts/dev.sh
```

2. Start PostgreSQL:

```bash
docker compose up postgres -d
```

3. In `.env`, set:

```bash
DATABASE_URL=postgresql://spopi:spopi@localhost:5432/spopi
```

4. Run migrations and start apps in separate terminals:

```bash
npm run db:migrate
npm run dev:api
npm run dev:web
```

## Quick start (Docker)

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Start everything (Postgres, API, web with hot reload):

   ```bash
   npm run docker:up
   ```

   Or:

   ```bash
   docker compose up --build
   ```

3. Open:

   - Web: http://localhost:3000
   - API health: http://localhost:4000/health

4. Stop:

   ```bash
   npm run docker:down
   ```

## Local development (without Docker)

1. Run the setup script:

   ```bash
   chmod +x scripts/dev.sh scripts/api-dev.sh
   ./scripts/dev.sh
   ```

2. Start PostgreSQL (or use only the `postgres` service from Compose):

   ```bash
   docker compose up postgres -d
   ```

3. Set `DATABASE_URL` in `.env` to use `localhost`:

   ```
   DATABASE_URL=postgresql://spopi:spopi@localhost:5432/spopi
   ```

4. Migrate and run apps in two terminals:

   ```bash
   npm run db:migrate
   npm run dev:api
   npm run dev:web
   ```

## Project structure

```
spopi-/
├── apps/
│   ├── api/          # Express API
│   └── web/          # Next.js frontend
├── packages/
│   └── db/           # Prisma schema and client
├── scripts/          # Dev and Docker entrypoints
├── docker-compose.yml
└── .env.example
```

## Environment variables

See [.env.example](.env.example). Key values:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Prisma connection string |
| `POSTGRES_*` | PostgreSQL credentials (Docker) |
| `API_PORT` | Express port (default 4000) |
| `WEB_PORT` | Next.js port (default 3000) |
| `NEXT_PUBLIC_API_URL` | API URL for the browser |

## Useful commands

| Command | Description |
|---------|-------------|
| `npm run docker:up` | Build and start all services |
| `npm run docker:down` | Stop all services |
| `npm run dev:api` | API with hot reload (tsx watch) |
| `npm run dev:web` | Next.js dev server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations (local dev) |
| `npm run db:push` | Push schema without migration files |

## Health check

`GET http://localhost:4000/health` returns JSON with API and database status.

## ZIP upload + parsing (foundation)

The API currently supports **raw ZIP uploads** (not multipart):

- **Endpoint**: `POST /v1/upload`
- **Content-Type**: `application/zip`
- **Response**: `eventCount`, `streamingHistoryFiles`, and up to 50 normalized `events`

Normalized event shape:

- `timestamp` (ISO string)
- `artist`
- `track`
- `album` (nullable)
- `msPlayed`
