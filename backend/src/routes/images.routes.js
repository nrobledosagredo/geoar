// routes/images.routes.js
import { Router } from "express"
import { getImages } from "../controllers/images.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/images", verifyToken, getImages)

export default router
