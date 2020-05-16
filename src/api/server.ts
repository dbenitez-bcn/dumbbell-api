import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectionLoader } from "./loaders/connectionLoader";


process.on("uncaughtException", e => {
  console.log(e);
  process.exit(1);
});
process.on("unhandledRejection", e => {
  console.log(e);
  process.exit(1);
});

connectionLoader()
  .then(async con => {
    const app = express();
    const loader = require('./loaders');
    loader.init(app);
    const { PORT = 9000 } = process.env;

    app.listen(PORT, () =>
      console.log(`Server is running in ${process.env.APP_ENV} mode => http://localhost:${PORT}...`)
    );
  })
  .catch(error => console.log(error));