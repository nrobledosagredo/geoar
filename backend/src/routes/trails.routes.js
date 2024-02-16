// trails.routes.js
import { Router } from "express"
import { getTrail, getTrails } from "../controllers/trails.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/trails", verifyToken, getTrails)
router.get("/trails/:id", verifyToken, getTrail)

export default router
