# DUMBBELL API

## Description
An API of workout exercises.

## Getting started
- Populate your .env file on the root project
- Run `npm install` to install all dependencies
- Run `npm db:start` to start the database
- Run `npm db:migration:run` to run all migrations
- Run `npm dev` to start the server

## npm scripts
- `npm run dev`: Runs the application
- `npm run build`: Builds application into dist
- `npm run docker`: Builds docker image
- `npm run test:unit`: Runs unit tests showing the coverage
- `npm run test:e2e`: Runs e2e tests showing the coverage
- `npm run test:e2e:ci`: Runs e2e tests for ci
- `npm run alpha:up`: Runs the whole application using docker-compose
- `npm run alpha:down`: Stops the whole application using docker-compose
- `npm run db:start`: Runs the database using docker-compose
- `npm run db:stop`: Stops the database using docker-compose
- `npm run db:drop`: Deletes the database information
- `npm run db:migration:run`: Runs all migrations
- `npm run db:migration:new`: Generates a new migration

## Postman library
- Use Dumbbell.postman_collection.json file to import the collection to your postman
- Use Dumbbell-environment.postman_environment.json file to import the environment variables to your postman
