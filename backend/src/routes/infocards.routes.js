// infocards.routes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/check-auth.js";
import { getInfoCards, getInfoCard } from "../controllers/infocards.controller.js";

const router = Router();

router.get("/infocards", verifyToken, getInfoCards);
router.get("/infocards/:id", verifyToken, getInfoCard);

export default router;