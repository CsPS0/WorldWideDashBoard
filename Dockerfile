FROM oven/bun:1 as builder
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile
COPY . .
RUN bunx prisma generate
RUN bun run build

FROM oven/bun:1-alpine
WORKDIR /app
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/dev.db ./dev.db 
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["bun", "server.js"]
