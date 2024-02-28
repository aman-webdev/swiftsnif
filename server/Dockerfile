FROM node:20-alpine as base

WORKDIR /app
COPY package* .
RUN npm install

COPY . .

EXPOSE 3000

FROM base as development
CMD ["npm","run","dev"]

FROM base as production
CMD ["node","index.js"]