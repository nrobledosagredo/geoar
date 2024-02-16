// treecards.routes.js
import { Router } from "express"
import {
  getTreeCard,
  getTreeCards,
} from "../controllers/treecards.controller.js"
import { verifyToken } from "../middlewares/check-auth.js"

const router = Router()

router.get("/treecards", verifyToken, getTreeCards)
router.get("/treecards/:id", verifyToken, getTreeCard)

export default router
