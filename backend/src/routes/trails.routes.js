// trails.routes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/check-auth.js";
import { getTrails, getTrail } from "../controllers/trails.controller.js";

const router = Router();

router.get("/trails", verifyToken, getTrails);
router.get("/trails/:id", verifyToken, getTrail);

export default router;