FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 9000

#RUN npm run db:migration:run

CMD [ "npm", "run", "dev" ]