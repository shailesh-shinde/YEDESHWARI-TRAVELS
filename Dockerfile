# Multi-stage build for Yedeshwari Travels
FROM node:20-alpine AS builder

WORKDIR /app

# Build frontend
COPY client/package*.json ./client/
RUN cd client && npm ci

COPY client/ ./client/
RUN cd client && npm run build

# Setup backend
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/

# Copy built frontend into place
RUN mkdir -p /app/client/dist && cp -r /app/client/dist/* /app/client/dist/

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

# Expose port
EXPOSE 5000

CMD ["node", "server/src/index.js"]
