// images.routes.js
import { Router } from "express"
import { getImage } from "../controllers/images.controller.js"

const router = Router()

router.get("/images", getImage)

export default router
