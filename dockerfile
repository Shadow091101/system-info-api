FROM node:18

WORKDIR /app

COPY backend/package*.json ./
RUN npm install

COPY backend/ .

EXPOSE 9009

CMD ["node", "index.js"]