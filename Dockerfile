FROM node:22 AS app

WORKDIR /app
COPY src .

RUN npm install --production

CMD ["node", "index.js"]
