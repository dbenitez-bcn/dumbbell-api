import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";

export const expressAppLoader = (app: Router) => {
  app.use(parser.urlencoded({ extended: true }));
  app.use(cors({ credentials: true, origin: true }));
  app.use(parser.json());
  app.use(compression());
}