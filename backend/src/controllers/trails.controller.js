// trails.controller.js
import getTrailModel from "../models/trails.model.js"

export async function getTrails(req, res) {
  const lang = req.query.lang || "es"
  const Trail = getTrailModel(lang)

  try {
    const trails = await Trail.find()
    res.json(trails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getTrail(req, res) {
  const lang = req.query.lang || "es"
  const Trail = getTrailModel(lang)

  try {
    const trail = await Trail.findById(req.params.id)
    if (!trail) return res.status(404).json({ message: "Trail not found" })
    res.json(trail)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
