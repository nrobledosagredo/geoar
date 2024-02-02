// get-error-message.ts
export const getErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/wrong-password":
      return "Contraseña incorrecta."
    case "auth/user-not-found":
      return "No se encontró una cuenta asociada a este correo electrónico."
    case "auth/too-many-requests":
      return "Error: Demasiados intentos. Inténtalo de nuevo más tarde."
    case "auth/email-already-in-use":
      return "La dirección de correo electrónico ya está en uso."
    case "auth/invalid-email":
      return "La dirección de correo electrónico no es válida."
    default:
      return "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."
  }
}
