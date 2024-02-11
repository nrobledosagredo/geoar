// points.controller.js
import Point from "../models/points.model.js";

export async function getPoints(req, res) {
  try {
    const points = await Point.find();
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPoint(req, res) {
  try {
    const point = await Point.findById(req.params.id);
    if (!point) return res.status(404).json({ message: "Point not found" });
    res.json(point);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getPointsByTrail(req, res) {
  try {
    const points = await Point.find({ trailId: req.params.id });
    if (points.length === 0)
      return res.status(404).json({ message: "No points found for this trail" });
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}