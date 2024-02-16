// treecards.controller.js
import TreeCard from "../models/treecards.model.js"

export async function getTreeCards(req, res) {
  try {
    const treeCards = await TreeCard.find()
    res.json(treeCards)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export async function getTreeCard(req, res) {
  try {
    const treeCard = await TreeCard.findById(req.params.id)
    if (!treeCard)
      return res.status(404).json({ message: "TreeCard not found" })
    res.json(treeCard)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
