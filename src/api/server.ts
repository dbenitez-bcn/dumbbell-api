import express from "express";
import Secrets from "../core/secrets";
import { connectionLoader } from "./loaders/connectionLoader";

export const startServer = async () => {
  const connection = await connectionLoader(Secrets.APP_ENV);
  const app = express();
  const loader = require('./loaders');
  loader.init(app);

  return app;
}
