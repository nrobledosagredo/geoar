import { Router } from "express";
import { createUser } from "../controllers/users.controller.js";
import { verifyToken } from "../middlewares/check-auth.js";

const router = Router();

router.post("/users", verifyToken, createUser);

export default router;