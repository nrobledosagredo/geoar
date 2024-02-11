// treecards.routes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/check-auth.js";
import { getTreeCards, getTreeCard } from "../controllers/treecards.controller.js";

const router = Router();

router.get("/treecards", verifyToken, getTreeCards);
router.get("/treecards/:id", verifyToken, getTreeCard);

export default router;