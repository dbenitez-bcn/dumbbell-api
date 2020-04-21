FROM node:latest
WORKDIR /usr/src/app
COPY package-lock.json .
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD APP_ENV=alpha node dist/server.js