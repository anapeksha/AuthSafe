import { Request, Response } from "express";
import { constants } from "../config";
import { authService } from "../services";

const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const token = await authService.login(req.body.user);
      if (!token) {
        return res.status(500).json({ error: "Internal Server Error" });
      } else {
        return res.json(token);
      }
    } catch (error: any) {
      if (error.message === constants.errors.UnauthorizedError) {
        return res.status(500).json({ error: "Unauthorized" });
      } else if (error.message === constants.errors.SessionCreationError) {
        return res.status(500).json({ error: "Session not created" });
      } else if (error.message === constants.errors.TokenGenerationError) {
        return res.status(500).json({ error: "Token not generated" });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    }
  },
};

export default authController;
