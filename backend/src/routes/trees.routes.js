import express from "express"
import Tree from "../models/trees.model.js"

const router = express.Router()

// Obtiene todos los árboles
router.get("/trees", async (req, res) => {
  try {
    const trees = await Tree.find()
    res.json(trees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtiene un árbol por su id
router.get("/trees/:treeId", async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.treeId)
    if (!tree) return res.status(404).json({ message: "Tree not found" })
    res.json(tree)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Obtiene todos los árboles habilitados
router.get("/trees/enabled", async (req, res) => {
  try {
    const trees = await Tree.find({ habilitado: true })
    res.json(trees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
