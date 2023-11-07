import { Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

const authorizedMiddleware = (req: Request, res: Response, next) => {
  const authCookie = req.cookies.token;
  const token = verifyToken(authCookie);
  if (!token) {
    res.status(403).send({ error: "Unauthorised" });
  } else {
    next();
  }
};

export { authorizedMiddleware };
