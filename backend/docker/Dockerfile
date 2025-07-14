FROM node:20-alpine AS builder

WORKDIR /app
    
COPY package.json package-lock.json ./
    
RUN npm install
    
COPY . .
    
RUN npm run build
    
FROM node:20-alpine
    
WORKDIR /app
    
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/package.json ./
    
EXPOSE 5001
    
CMD ["node","-r","dotenv/config", "./dist/main.js"]
    