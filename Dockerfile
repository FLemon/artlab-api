FROM node:10.7.0-alpine

WORKDIR /usr/src

COPY package*.json ./

RUN npm install --only=production

COPY . .
