import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../interfaces/error";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = "Something went wrong!";
  const errorMessage: IGenericErrorMessage[] = [];

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    stack: config.env !== "production" ? err?.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
