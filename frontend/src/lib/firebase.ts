// firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Configuración de Firebase desde variables de entorno
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_FIREBASE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_FIREBASE_MEASUREMENT_ID}`,
}

// Inicializa Firebase
const app = initializeApp(firebaseConfig)

// Inicializa Firebase Authentication y obtén una referencia al servicio
const auth = getAuth(app)

// Exporta la referencia de autenticación
export { auth }