// users.routes.js
import { Router } from "express";
import { createUser, updateUser, getUser } from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/check-auth.js";

const router = Router();

router.post("/users", verifyToken, createUser);
router.get("/users/:userId", verifyToken, getUser);
router.put("/users/:userId", verifyToken, updateUser);

export default router;
