// infocards.routes.js
import { Router } from "express"
import {
  getInfoCard,
  getInfoCards,
} from "../controllers/infocards.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/infocards", verifyToken, getInfoCards)
router.get("/infocards/:id", verifyToken, getInfoCard)

export default router
