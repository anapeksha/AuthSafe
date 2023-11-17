import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

const authorizedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authCookie = req.cookies.token;
  if (authCookie) {
    const token = verifyToken(authCookie);
    if (token) {
      next(token);
    } else {
      res.status(401).send({ error: "Unauthorised" });
    }
  } else {
    res.status(401).send({ error: "Unauthorised" });
  }
};

export { authorizedMiddleware };
