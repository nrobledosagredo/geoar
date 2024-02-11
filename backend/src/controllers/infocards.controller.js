// infocards.controller.js
import getInfoCardModel from "../models/infocards.model.js";

export async function getInfoCards(req, res) {
  const lang = req.query.lang || "es";
  const InfoCard = getInfoCardModel(lang);

  try {
    const infoCards = await InfoCard.find();
    res.json(infoCards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getInfoCard(req, res) {
  const lang = req.query.lang || "es";
  const InfoCard = getInfoCardModel(lang);

  try {
    const infoCard = await InfoCard.findById(req.params.id);
    if (!infoCard) return res.status(404).json({ message: "Not found" });
    res.json(infoCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}