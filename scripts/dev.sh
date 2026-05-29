#!/bin/sh
set -e

cd "$(dirname "$0")/.."

if [ ! -f .env ]; then
  echo "Creating .env from .env.example..."
  cp .env.example .env
  echo "Update DATABASE_URL in .env if not using Docker (use localhost instead of postgres)."
fi

echo "Installing dependencies..."
npm install

echo "Generating Prisma client..."
npm run db:generate

echo "Run 'docker compose up --build' for full stack,"
echo "or start Postgres separately and run:"
echo "  npm run db:migrate"
echo "  npm run dev:api   # terminal 1"
echo "  npm run dev:web   # terminal 2"
