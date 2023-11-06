import express, { Router } from "express";
import { userController } from "../controllers";
import { authorizedMiddleware } from "../middlewares";

const router: Router = express.Router();

router.get("/users", authorizedMiddleware, userController.getAllUsers);
router.get("/users/:id", authorizedMiddleware, userController.getUserByID);
router.post("/users/create", userController.createUser);

export default router;
