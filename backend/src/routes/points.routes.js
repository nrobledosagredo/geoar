// points.routes.js
import { Router } from "express"
import {
  getPoint,
  getPoints,
  getPointsByTrail,
} from "../controllers/points.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/points", verifyToken, getPoints)
router.get("/points/:id", verifyToken, getPoint)
router.get("/points/trails/:id", verifyToken, getPointsByTrail)

export default router
