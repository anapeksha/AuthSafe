import { Request, Response } from "express";
import { constants } from "../config";
import { authService } from "../services";
import { logger } from "../utils";
import { verifyToken } from "../utils/jwt";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const token = await authService.login(req.body.user);
      if (!token) {
        return res.status(500).json({ error: "Malformed Token" });
      } else {
        res.cookie("token", token, {
          maxAge: 604800000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        logger.info(`User logged in: ${req.body.user.email}`);
        return res.status(200).json({ message: "Logged in" });
      }
    } catch (error: any) {
      logger.error(error);
      if (error.message === constants.errors.UnauthorizedError) {
        return res.status(401).json({ error: "Unauthorized" });
      } else if (error.message === constants.errors.SessionCreationError) {
        return res.status(500).json({ error: "Session not created" });
      } else if (error.message === constants.errors.TokenGenerationError) {
        return res.status(500).json({ error: "Token not generated" });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
  logout: async (req: Request, res: Response) => {
    try {
      const authCookie = req.cookies.token;
      if (authCookie) {
        const token = verifyToken(authCookie.token);
        if (token) {
          await authService.logout(authCookie.id);
          res.clearCookie("token");
        }
      }
      logger.info(`User logged out: ${authCookie.id}`);
      res.status(200).json({ message: "Logged out" });
    } catch (error) {
      logger.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default authController;
