import express, { Router } from "express";
import { userController } from "../controllers";

const router: Router = express.Router();

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserByID);
router.post("/users/create", userController.createUser);

export default router;
