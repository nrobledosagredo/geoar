// interactions.controller.js
import Interaction from "../models/interactions.model.js"

export async function createInteraction(req, res) {
  try {
    // Extrae la información de la interacción desde el cuerpo de la solicitud
    const { userId, trailId, cardId, cardType, geometry} = req.body

    // Crea un nuevo documento de interacción con el modelo Interaction
    const newInteraction = new Interaction({
      userId,
      trailId,
      cardId,
      cardType,
      geometry,
    })

    // Guarda la nueva interacción en la base de datos
    await newInteraction.save()

    // Envía una respuesta exitosa al cliente con la interacción recién creada
    res.status(201).json(newInteraction)
  } catch (error) {
    console.error("Error creating interaction:", error)
    // Envía una respuesta de error al cliente si algo sale mal
    res
      .status(500)
      .json({ message: "Error creating interaction", error: error.message })
  }
}