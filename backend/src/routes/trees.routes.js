// trees.routes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/check-auth.js";
import { getTrees } from "../controllers/trees.controller.js";

const router = Router();

router.get("/trees", verifyToken, getTrees);

export default router;