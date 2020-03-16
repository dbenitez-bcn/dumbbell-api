FROM node:latest
WORKDIR /usr/src/app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY dist .
COPY wait-for-it.sh .
CMD APP_ENV=alpha node server.js