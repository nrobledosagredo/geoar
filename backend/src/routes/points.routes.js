import express from "express"
import Point from "../models/points.model.js"

const router = express.Router()

// Obtiene todos los puntos
router.get("/points", async (req, res) => {
  try {
    const points = await Point.find()
    res.json(points)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtiene un punto por su id
router.get("/points/:pointId", async (req, res) => {
  try {
    const point = await Point.findById(req.params.pointId)
    if (!point) return res.status(404).json({ message: "Point not found" })
    res.json(point)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Obtiene todos los puntos de un sendero
router.get("/points/trails/:trailId", async (req, res) => {
  try {
    const points = await Point.find({ trailId: req.params.trailId })
    if (points.length === 0)
      return res.status(404).json({ message: "No points found for this trail" })
    res.json(points)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
