// Importaciones usando ES Modules
import express from "express"
import Point from "../models/point.model.js" // Corregido el error en la extensión

// Creación del router
const router = express.Router()

router.get("/points", async (req, res) => {
  try {
    const points = await Point.find()
    res.json(points)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/point/:id", async (req, res) => {
  try {
    const point = await Point.findById(req.params.id)
    if (!point) return res.status(404).json({ message: "Point not found" })
    res.json(point)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get("/points/trail/:trailId", async (req, res) => {
  try {
    const points = await Point.find({ trailId: req.params.trailId })
    if (points.length === 0)
      return res.status(404).json({ message: "No points found for this trail" })
    res.json(points)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Exportación del router usando export default
export default router
