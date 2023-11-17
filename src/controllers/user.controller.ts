import { Request, Response } from "express";
import { userService } from "../services";

const userController = {
  getUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUser(res.locals.userId);
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body.user);
      return res.json(user);
    } catch (error) {
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
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteUser: async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(res.locals.userId);
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default userController;
