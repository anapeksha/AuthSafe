import express, { Router } from "express";
import { profileController } from "../controllers";
import { authorizedMiddleware } from "../middlewares";

const router: Router = express.Router();

router.put(
  "/profile/change-password",
  authorizedMiddleware,
  profileController.changePassword
);

export default router;
