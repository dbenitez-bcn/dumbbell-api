import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import { Wrapper } from "../models/types";
import { Endpoints } from "../config/constants";
import { exerciceValidator } from "../services/exercises/validators/exercisesValidator";

export const handleCors: Wrapper = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing: Wrapper = (router: Router) => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression: Wrapper = (router: Router) => {
  router.use(compression());
};

export const exercisesMiddleware: Wrapper = (router: Router) => {
  router.use(Endpoints.EXERCISE, exerciceValidator)
}