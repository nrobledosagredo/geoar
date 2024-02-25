// user.controller.js
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
    console.error("Error creating user:", error)
    // Envía una respuesta de error al cliente si algo sale mal
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message })
  }
}

// Obtiene los datos de un usuario específico
export async function getUser(req, res) {
  try {
    const { userId } = req.params

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    console.error("Error getting user:", error)
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message })
  }
}

// Actualiza los datos de un usuario existente
export async function updateUser(req, res) {
  try {
    const { userId } = req.params
    const updateData = req.body

    const updatedUser = await User.findOneAndUpdate({ userId }, updateData, {
      new: true,
    })

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message })
  }
}
