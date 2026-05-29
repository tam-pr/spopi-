FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY packages/db/package.json ./packages/db/

COPY packages/db/prisma ./packages/db/prisma

RUN npm install

COPY apps/web ./apps/web

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

EXPOSE 3000

CMD ["npm", "run", "dev", "-w", "@spopi/web"]
