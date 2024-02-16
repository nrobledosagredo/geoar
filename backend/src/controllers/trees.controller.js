// trees.controller.js
import Tree from "../models/trees.model.js"

export async function getTrees(req, res) {
  let query = {}
  if (req.query.enabled) {
    query.habilitado = req.query.enabled === "true"
  }
  try {
    const trees = await Tree.find(query)
    res.json(trees)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
