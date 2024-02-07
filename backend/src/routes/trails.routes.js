import express from "express"
import getTrailModel from "../models/trails.model.js"

const router = express.Router()

// Obtiene todos los senderos
router.get("/trails", async (req, res) => {
  const lang = req.query.lang || "es"
  const Trail = getTrailModel(lang)

  try {
    const trails = await Trail.find()
    res.json(trails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtiene un sendero por su id
router.get("/trail/:trailId", async (req, res) => {
  const lang = req.query.lang || "es"
  const Trail = getTrailModel(lang)

  try {
    const trail = await Trail.findById(req.params.trailId)
    if (!trail) return res.status(404).json({ message: "Trail not found" })
    res.json(trail)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
