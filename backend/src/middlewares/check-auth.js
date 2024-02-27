// check-auth.js
// import admin from "firebase-admin";
const admin = require('firebase-admin');
//import serviceAccount from '../lib/geoar-92b66-firebase-adminsdk-2zfdm-6c2c627e4b.json' assert { type: 'json' };
const serviceAccount = require('../lib/geoar-92b66-firebase-adminsdk-2zfdm-6c2c627e4b.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware para verificar el token de Firebase
export const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      console.error("No se proporcionó el encabezado Authorization");
      return res
        .status(401)
        .send("Unauthorized: No se proporcionó el encabezado Authorization");
    }
    const idToken = authorizationHeader.split(" ")[1];

    admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        const uid = decodedToken.uid;
        const email = decodedToken.email;
        req.body.uid = uid;
        req.body.email = email;

        next();
      })
      .catch((error) => {
        console.error("Error en verifyToken:", error);
        res.status(401).send("Unauthorized: Token no válido");
      });
  } catch (error) {
    console.error("Error en verifyToken:", error);
    res.status(401).send("Unauthorized: Error interno");
  }
};