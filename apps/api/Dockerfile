FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/
COPY packages/db/prisma ./packages/db/prisma
COPY tsconfig.base.json ./

RUN npm install

COPY packages/db ./packages/db
COPY apps/api ./apps/api
COPY scripts ./scripts

RUN chmod +x /app/scripts/api-dev.sh && npm run db:generate

EXPOSE 4000

CMD ["sh", "/app/scripts/api-dev.sh"]
