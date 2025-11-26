# syntax=docker/dockerfile:1

# Base stage with Bun (Debian-based for OpenSSL support)
FROM oven/bun:1-debian AS base
WORKDIR /app

# Install dependencies into a temp directory for better caching
FROM base AS deps
COPY package.json bun.lock ./
COPY prisma ./prisma/
COPY prisma.config.ts ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Production stage
FROM base AS production
WORKDIR /app

# Copy production dependencies and built assets
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/app/generated ./app/generated
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./
COPY package.json ./

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

USER bun
CMD ["bun", "run", "start"]
