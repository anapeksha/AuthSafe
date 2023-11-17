import express, { Router } from "express";
import { userController } from "../controllers";
import { authorizedMiddleware } from "../middlewares";

const router: Router = express.Router();

router.post("/user/create", userController.createUser);
router.get("/user", authorizedMiddleware, userController.getUser);
router.put("/user/update", authorizedMiddleware, userController.updateUser);
router.delete("/user/delete", authorizedMiddleware, userController.deleteUser);

export default router;
