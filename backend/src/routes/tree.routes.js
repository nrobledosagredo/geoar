// Importaciones usando ES Modules
import express from "express"
import Tree from "../models/tree.model.js"

// Creación del router
const router = express.Router()

// Obtener todos los árboles
router.get("/trees", async (req, res) => {
  try {
    const trees = await Tree.find()
    res.json(trees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Obtener un árbol por ID
router.get("/tree/:id", async (req, res) => {
  try {
    const tree = await Tree.findById(req.params.id)
    if (!tree) return res.status(404).json({ message: "Tree not found" })
    res.json(tree)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Obtener árboles habilitados
router.get("/trees/enabled", async (req, res) => {
  try {
    const enabledTrees = await Tree.find({ habilitado: true })
    res.json(enabledTrees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Exportación del router usando export default
export default router
