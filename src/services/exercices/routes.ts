import { Request, Response } from "express";
import { getExercices } from "./exercicesController";

export default [
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hello world!");
    }
  },
  {
    path: "/exercices",
    method: "get",
    handler: async (req: Request, res: Response) => {
      const result = await getExercices();
      res.status(200).send(result);
    }
  }
];