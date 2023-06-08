import { NextFunction, Request, Response } from "express";
const globalErrorHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err });
    next();
  } else {
    res.status(500).json({ error: "something went wrong" });
  }
};

export default globalErrorHandler;
