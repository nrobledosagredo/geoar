import express from "express"
import getInfoCardModel from "../models/info-cards.model.js"

const router = express.Router()

// Obtiene todas las infoCards
router.get("/infocards", async (req, res) => {
  const lang = req.query.lang || "es"
  const InfoCard = getInfoCardModel(lang)

  try {
    const infoCard = await InfoCard.find()
    res.json(infoCard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtiene una infoCard por su id
router.get("/infocards/:infoCardId", async (req, res) => {
  const lang = req.query.lang || "es"
  const InfoCard = getInfoCardModel(lang)

  try {
    const infoCard = await InfoCard.findById(req.params.infoCardId)
    if (!infoCard) return res.status(404).json({ message: "Not found" })
    res.json(infoCard)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
