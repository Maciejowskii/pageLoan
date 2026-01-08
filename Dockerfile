FROM node:20-alpine AS base

# 1. Instalacja zależności
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci --legacy-peer-deps; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Budowanie aplikacji
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Coolify przekaże tutaj zmienne środowiskowe zdefiniowane w panelu
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 3. Obraz produkcyjny (runner)
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Poprawiona składnia dla Alpine Linux
RUN addgroup -S -g 1001 nodejs
RUN adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder /app/public ./public

# Ustawienie odpowiednich uprawnień dla cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Kopiowanie zbudowanych plików standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
