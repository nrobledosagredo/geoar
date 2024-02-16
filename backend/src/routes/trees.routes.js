// trees.routes.js
import { Router } from "express"
import { getTrees } from "../controllers/trees.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/trees", verifyToken, getTrees)

export default router
