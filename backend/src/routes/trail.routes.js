// Importaciones usando ES Modules
import express from "express"
import getTrailModel from "../models/trail.model.js"

// Creación del router
const router = express.Router()

router.get("/trails", async (req, res) => {
  const language = req.query.lang || "es"
  const Trail = getTrailModel(language)

  try {
    const trails = await Trail.find()
    res.json(trails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/trail/:id", async (req, res) => {
  const language = req.query.lang || "es"
  const Trail = getTrailModel(language)

  try {
    const trail = await Trail.findById(req.params.id)
    if (!trail) return res.status(404).json({ message: "Trail not found" })
    res.json(trail)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Exportación del router usando export default
export default router
