const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de las cookies
  console.log("token midleware:", token);

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, 'jj'); // Verificar el token
    console.log("decoded:", decoded);
    req.user = decoded; // Guardar los datos del usuario en la solicitud
    next(); // Pasar al siguiente middleware o controlador
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;