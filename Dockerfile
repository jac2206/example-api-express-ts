# =========================
# BUILD STAGE
# =========================
FROM node:24-alpine AS builder

WORKDIR /app

# Copiar package para aprovechar cache
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código
COPY . .

# Compilar TypeScript
RUN npm run build


# =========================
# PRODUCTION STAGE
# =========================
FROM node:24-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copiar package
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --omit=dev --ignore-scripts

# Copiar build
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main.js"]