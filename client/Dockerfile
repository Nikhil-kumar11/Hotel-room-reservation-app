FROM node:20-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm config set proxy http://api-cont:3001
CMD [ "npm", "start" ]