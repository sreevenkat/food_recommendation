FROM node:8.0

RUN mkdir /app

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

