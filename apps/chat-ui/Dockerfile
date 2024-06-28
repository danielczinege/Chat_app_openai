# Build fáze
FROM node:20-slim as builder

# Nastavení pracovního adresáře v kontejneru
WORKDIR /app

# Kopírování souborů projektu do pracovního adresáře
COPY . .

# Instalace závislostí a build aplikace
RUN npm install

RUN npx nx build chat-ui

# Runner fáze
FROM nginx:1.17.5-alpine as runner

# Kopírování build output z builder fáze do nginx
COPY --from=builder /app/dist/apps/chat-ui /usr/share/nginx/html

# Exponování portu
EXPOSE 80

# Start nginx serveru
CMD ["nginx", "-g", "daemon off;"]
