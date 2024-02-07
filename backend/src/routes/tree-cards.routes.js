// Importaciones usando ES Modules
import express from "express"
import TreeCard from "../models/tree-cards.model.js"

const router = express.Router()

// Obtiene todas las treeCards
router.get("/treecards", async (req, res) => {
  try {
    const treeCards = await TreeCard.find()
    res.json(treeCards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtiene una treeCard por su id
router.get("/treecards/:treeCardId", async (req, res) => {
  try {
    const treeCard = await TreeCard.findById(req.params.treeCardId)
    if (!treeCard)
      return res.status(404).json({ message: "TreeCard not found" })
    res.json(treeCard)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
