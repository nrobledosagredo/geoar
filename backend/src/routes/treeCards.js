const TreeCard = require('../models/treeCards');
const express = require('express');
const router = express.Router();

// Get all tree cards
router.get('/treecards', async (req, res) => {
    try {
        const treeCards = await TreeCard.find();
        res.json(treeCards);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single tree card by ID
router.get('/treecard/:id', async (req, res) => {
    try {
        const treeCard = await TreeCard.findById(req.params.id);
        if (!treeCard) return res.status(404).json({ message: "TreeCard not found" });
        res.json(treeCard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Additional routes can be defined as needed, for example:
// - Routes to handle creating, updating, or deleting tree cards
// - Routes to find tree cards by specific criteria (like binomial name, conservation status, etc.)

module.exports = router;
