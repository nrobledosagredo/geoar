// interactions.routes.js
import { Router } from "express";
import { createInteraction} from "../controllers/interactions.controller.js";
import { verifyToken } from "../middlewares/check-auth.js";

const router = Router();

router.post("/interactions", verifyToken, createInteraction);

export default router;
