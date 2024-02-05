// Importaciones usando ES Modules
import express from "express"
import TreeCard from "../models/tree-card.model.js"

// Creación del router
const router = express.Router()

// Obtener todas las tarjetas de árboles
router.get("/treecards", async (req, res) => {
  try {
    const treeCards = await TreeCard.find()
    res.json(treeCards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtener una sola tarjeta de árbol por ID
router.get("/treecard/:id", async (req, res) => {
  try {
    const treeCard = await TreeCard.findById(req.params.id)
    if (!treeCard)
      return res.status(404).json({ message: "TreeCard not found" })
    res.json(treeCard)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Exportación del router usando export default
export default router
