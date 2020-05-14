import http from "http";
import express from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import dotenv from "dotenv";
dotenv.config();
import { createConnection } from "typeorm";
import routes from "./services";
import { methodNotFound } from "./middleware/errorHandlers";
import { getDatabaseHost } from "./utils/getDatabaseHost";


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
    const router = express();
    router.use(parser.urlencoded({ extended: true }));
    router.use(cors({ credentials: true, origin: true }));
    router.use(parser.json());
    router.use(compression());
    router.use(routes);
    router.use(methodNotFound);
    const { PORT = 9000 } = process.env;
    const server = http.createServer(router);

    server.listen(PORT, () =>
      console.log(`Server is running in ${process.env.APP_ENV} mode => http://localhost:${PORT}...`)
    );
  })
  .catch(error => console.log(error));