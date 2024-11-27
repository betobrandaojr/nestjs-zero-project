
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn global add @nestjs/cli && yarn install

COPY . .
RUN yarn build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./
RUN yarn install --production

ENV NODE_ENV=production
COPY .env.develop .env

EXPOSE ${PORT}

CMD ["node", "dist/main"]
