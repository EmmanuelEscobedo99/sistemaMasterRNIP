const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = (req, res, next) => {
 
  const authHeader = req.headers.authorization; // en esta constante se almacena el token recibido en la cabecera de la petición
  console.log("*middleware:*token a verificar")
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) { // Verificar si el token no está presente o no comienza con 'Bearer'
    return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' }); // Enviar respuesta de error en caso de que no se cumpla la condición
  }

  const token = authHeader.split(' ')[1]; // Extraer el token después de 'Bearer' y almacenarlo en la constante token

   try {
    const decoded = jwt.verify(token, process.env.jwtSecret); // Verificar y decodificar el token
    req.user = decoded; // Almacenar los datos decodificados en req.user para que estén disponibles en los controladores
    next(); // Continuar al siguiente middleware/controlador si el token es válido
  } catch (error) {   
    return res.status(401).json({ message: 'Token inválido o expirado' }); // Enviar respuesta de error en caso de que el token sea inválido o haya expirado
  }
};

module.exports = authMiddleware;