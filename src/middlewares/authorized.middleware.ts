import { NextFunction, Request, Response } from "express";
import { prisma } from "../config";
import { logger } from "../utils";
import { verifyToken } from "../utils/jwt.util";

const isExpired = (now: Date, expires: Date) => {
  if (now >= expires) return true;
  else return false;
};

const authorizedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authCookie = req.cookies.token;
  if (authCookie) {
    const session = await prisma.session.findUnique({
      where: {
        token: authCookie.token,
      },
    });
    if (session) {
      const expired = isExpired(
        new Date(Date.now()),
        new Date(session?.expires!)
      );
      if (expired) {
        await prisma.session.delete({
          where: {
            id: session.id,
          },
        });
        logger.error("Session Expired");
        res.status(401).send({ error: "Session Expired" });
      } else {
        const token = verifyToken(authCookie.token);
        if (token) {
          res.locals.userId = token.sub;
          next();
        } else {
          logger.error("Malformed Token");
          res.status(401).send({ error: "Malformed token" });
        }
      }
    } else {
      logger.error("Session not found");
      res.status(401).send({ error: "Session not found" });
    }
  } else {
    logger.error("Unauthorised cookie");
    res.status(401).send({ error: "Unauthorised" });
  }
};

export { authorizedMiddleware };
