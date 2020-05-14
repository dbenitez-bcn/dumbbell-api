import { Request, Response } from "express";

export const methodNotFound = (req: Request, res: Response) => {
  res.status(404).send("Method not found.")
}