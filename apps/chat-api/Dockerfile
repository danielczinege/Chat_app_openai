# Build fáze
FROM node:20-slim as builder

# Nastavení pracovního adresáře v kontejneru
WORKDIR /app

# Kopírování souborů projektu do pracovního adresáře
COPY . .

# Instalace závislostí
RUN npm install

RUN npx nx build chat-api

# Runner fáze
FROM node:20-slim as runner

# Nastavení pracovního adresáře v kontejneru
WORKDIR /app

# Kopírování závislostí a kódu z builder fáze
COPY --from=builder /app/dist/apps/chat-api .

RUN npm ci --only=prod

# Exponování portu
EXPOSE 3000

# Start aplikace
CMD ["node", "main.js"]
