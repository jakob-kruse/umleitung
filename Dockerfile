FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npx pnpm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/app.js"]