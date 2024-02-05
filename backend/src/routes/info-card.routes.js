// Importaciones usando ES Modules
import express from "express"
import getInfoCardModel from "../models/info-card.model.js"

// Creación del router
const router = express.Router()

router.get("/infoCards", async (req, res) => {
  const language = req.query.lang || "es"
  const Model = getInfoCardModel(language)

  try {
    const data = await Model.find()
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get("/infoCard/:id", async (req, res) => {
  const language = req.query.lang || "es"
  const Model = getInfoCardModel(language)

  try {
    const data = await Model.findById(req.params.id)
    if (!data) return res.status(404).json({ message: "Not found" })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Exportación del router usando export default
export default router
