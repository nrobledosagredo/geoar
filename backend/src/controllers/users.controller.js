// controllers/user.controller.js
import User from "../models/users.model.js"

export async function createUser(req, res) {
  try {
    // Extrae la información del usuario desde el cuerpo de la solicitud
    const { userId, dob, ageRange, disabilities, language } = req.body

    // Crea un nuevo documento de usuario con el modelo User
    const newUser = new User({
      userId,
      dob,
      ageRange,
      disabilities,
      language,
    })

    // Guarda el nuevo usuario en la base de datos
    await newUser.save()

    // Envía una respuesta exitosa al cliente con el usuario recién creado
    res.status(201).json(newUser)
  } catch (error) {
    console.error("Error al crear el usuario:", error)
    // Envía una respuesta de error al cliente si algo sale mal
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message })
  }
}
