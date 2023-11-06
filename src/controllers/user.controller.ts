import { Request, Response } from "express";
import { userService } from "../services";

const userController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getUserByID: async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
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
