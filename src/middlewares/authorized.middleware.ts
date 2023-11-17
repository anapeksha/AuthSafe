import { NextFunction, Request, Response } from "express";
import { logger } from "../utils";
import { verifyToken } from "../utils/jwt";

const authorizedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authCookie = req.cookies.token;
  if (authCookie) {
    const token = verifyToken(authCookie.token);
    if (token) {
      res.locals.userId = token.sub;
      next();
    } else {
      logger.error("Unauthorised");
      res.status(401).send({ error: "Unauthorised" });
    }
  } else {
    logger.error("Unauthorised");
    res.status(401).send({ error: "Unauthorised" });
  }
};

export { authorizedMiddleware };
