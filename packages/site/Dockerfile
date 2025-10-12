FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.8.0 --activate

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy monorepo config files
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/site/package.json ./packages/site/package.json

RUN pnpm install --frozen-lockfile

# Build UI library and site
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/site/node_modules ./packages/site/node_modules

# Copy source code
COPY . .

# Build UI library first
RUN pnpm --filter @flora/ui build

# Build Next.js site
RUN pnpm --filter @flora/site build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/packages/site/public ./public

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/packages/site/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/site/.next/static ./packages/site/.next/static

USER nextjs

EXPOSE 8080

ENV PORT=8080
ENV HOSTNAME="0.0.0.0"

CMD ["node", "packages/site/server.js"]