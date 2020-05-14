import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { createConnection } from "typeorm";
import { routesLoader } from "./loaders/routesLoader";
import { getDatabaseHost } from "./utils/getDatabaseHost";
import { expressAppLoader } from "./loaders/expressAppLoader";


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});
const dbHost = getDatabaseHost();

createConnection({
  type: "postgres",
  host: dbHost,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/api/models/entities/**/*.js"]
})
  .then(async con => {
    const app = express();
    expressAppLoader(app);
    routesLoader(app);
    const { PORT = 9000 } = process.env;
    const server = http.createServer(app);

    server.listen(PORT, () =>
      console.log(`Server is running in ${process.env.APP_ENV} mode => http://localhost:${PORT}...`)
    );
  })
  .catch(error => console.log(error));