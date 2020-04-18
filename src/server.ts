import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import dotenv from "dotenv";
import { createConnection } from "typeorm";

dotenv.config();

process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

createConnection({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/models/entities/**/*.js"]
})
  .then(async con => {
    const router = express();
    applyMiddleware(middleware, router);
    applyRoutes(routes, router);
    applyMiddleware(errorHandlers, router);

    const { PORT = 9000 } = process.env;
    const server = http.createServer(router);

    server.listen(PORT, () =>
      console.log(`Server is running in ${process.env.APP_ENV} mode => http://localhost:${PORT}...`)
    );
  })
  .catch(error => console.log(error));