// routes/images.routes.js
import { Router } from "express";
import { verifyToken } from "../middlewares/check-auth.js";
import { getImages } from "../controllers/images.controller.js";

const router = Router();

router.get("/images", verifyToken, getImages);

export default router;