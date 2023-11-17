import express, { Router } from "express";
import { userController } from "../controllers";
import { authorizedMiddleware } from "../middlewares";

const router: Router = express.Router();

router.post("/user/create", userController.createUser);
router.get("/user/:id", authorizedMiddleware, userController.getUser);
router.put("/user/update", authorizedMiddleware);
router.delete("/user/delete", authorizedMiddleware);

export default router;
