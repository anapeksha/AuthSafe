import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { userService } from "../services";

const userController = {
  getUser: async (req: Request, res: Response, token: string | JwtPayload) => {
    try {
      const user = await userService.getUser(token.sub as string);
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.json(user);
    } catch (error) {
      console.error("Error fetching users:", error);
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
};

export default userController;
