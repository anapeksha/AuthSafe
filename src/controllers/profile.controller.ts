import { Request, Response } from "express";
import { profileService } from "../services";
import { logger } from "../utils";
const profileController = {
  changePassword: async (req: Request, res: Response) => {
    try {
      const { password } = req.body.user;
      const user = await profileService.changePassword(
        res.locals.userId,
        password
      );
      if (!user) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      logger.info(`Password updated: ${user.email}`);
      return res.json(user);
      return res.json(user);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default profileController;
