#!/bin/sh
set -e

cd /app

echo "Generating Prisma client..."
npm run db:generate -w @spopi/db

echo "Running database migrations..."
npx prisma migrate deploy --schema=packages/db/prisma/schema.prisma

echo "Starting API with hot reload..."
exec npm run dev -w @spopi/api
