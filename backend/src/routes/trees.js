const Tree = require('../models/trees');
const express = require('express');
const router = express.Router();

router.get('/trees', async (req, res) => {
    try {
        const trees = await Tree.find();
        res.json(trees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/tree/:id', async (req, res) => {
    try {
        const tree = await Tree.findById(req.params.id);
        if (!tree) return res.status(404).json({ message: "Tree not found" });
        res.json(tree);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/trees/enabled', async (req, res) => {
    try {
        const enabledTrees = await Tree.find({ habilitado: true });
        res.json(enabledTrees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
