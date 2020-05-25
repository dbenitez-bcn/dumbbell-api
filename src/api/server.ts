import express from "express";
import Secrets from "../core/secrets";
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

  return app;
}
