import { Request, Response } from "express";
import { userService } from "../services";
import { logger } from "../utils";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUser(res.locals.userId);
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      logger.info(`User fetched: ${user.email}`);
      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body.user);
      logger.info(`User created: ${user.email}`);
      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  updateUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(
        res.locals.userId,
        req.body.user
      );
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      logger.info(`User updated: ${user.email}`);
      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(res.locals.userId);
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      logger.info(`User deleted: ${user.email}`);
      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
