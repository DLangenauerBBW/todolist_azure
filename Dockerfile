FROM node:20-alpine

WORKDIR /app
COPY . .
RUN npm ci --omit=dev
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start"]