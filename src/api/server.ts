import express from "express";
import Secrets from "./config/secrets";
import { connectionLoader } from "./loaders/connectionLoader";

export const startServer = async () => {
  process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
  });
  process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
  });

  const connection = await connectionLoader(Secrets.APP_ENV);
  const app = express();
  const loader = require('./loaders');
  loader.init(app);

  app.listen(Secrets.PORT, () =>
    console.log(`Server is running in ${Secrets.APP_ENV} mode => http://localhost:${Secrets.PORT}...`)
  );

  return app;
}
